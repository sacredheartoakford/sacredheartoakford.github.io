// Neon client library — replaces src/lib/supabase.ts
// Uses:
//   - @neondatabase/serverless for Postgres (HTTP/443, browser-compatible)
//   - @neondatabase/auth for Neon Auth (Managed Better Auth)
//   - @aws-sdk/client-s3 for Neon Object Storage
//
// Client-only SPA on GitHub Pages. The pooled DATABASE_URL is exposed to the
// browser via VITE_ env vars. RLS on Neon Postgres is defense-in-depth; the
// app enforces access control in code (Neon Auth JWT gates the admin page).

// ── Env vars ─────────────────────────────────────────────────────────────────
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL as string | undefined;
const NEON_AUTH_BASE_URL = import.meta.env.VITE_NEON_AUTH_BASE_URL as string | undefined;
const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID as string | undefined;
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY as string | undefined;
const AWS_ENDPOINT_URL_S3 = import.meta.env.VITE_AWS_ENDPOINT_URL_S3 as string | undefined;
const AWS_REGION = import.meta.env.VITE_AWS_REGION as string | undefined;
const BUCKET_NAME = 'assets';

export const isNeonConfigured = Boolean(DATABASE_URL && NEON_AUTH_BASE_URL);

// ── Types ────────────────────────────────────────────────────────────────────
export interface Application {
  id: string;
  full_name: string;
  date_of_birth: string | null;
  gender: string | null;
  email: string | null;
  phone: string | null;
  previous_school: string | null;
  application_year: number | null;
  grade_applying_for: string | null;
  extracurricular: string | null;
  created_at: string;
}

export interface ApplicationDocument {
  id: string;
  application_id: string;
  kind: 'report' | 'parent_id' | 'birth_cert';
  storage_key: string;
  file_name: string | null;
  content_type: string | null;
  created_at: string;
}

export type ApplicationWithDocs = Application & {
  documents: ApplicationDocument[];
};

// ── Postgres via @neondatabase/serverless ────────────────────────────────────
let _sql: ReturnType<typeof import('@neondatabase/serverless')['neon']> | null = null;

async function getSql() {
  if (!_sql) {
    const { neon } = await import('@neondatabase/serverless');
    _sql = neon(DATABASE_URL!);
  }
  return _sql;
}

export async function insertApplication(data: {
  full_name: string;
  date_of_birth: string | null;
  gender: string | null;
  email: string;
  phone: string;
  previous_school: string;
  application_year: number | null;
  grade_applying_for: string;
  extracurricular: string;
}): Promise<Application> {
  const sql = await getSql();
  const rows = (await sql`
    INSERT INTO public.applications
      (full_name, date_of_birth, gender, email, phone, previous_school,
       application_year, grade_applying_for, extracurricular)
    VALUES
      (${data.full_name}, ${data.date_of_birth}, ${data.gender},
       ${data.email}, ${data.phone}, ${data.previous_school},
       ${data.application_year}, ${data.grade_applying_for}, ${data.extracurricular})
    RETURNING *
  `) as unknown as any[];
  if (!rows || rows.length === 0) throw new Error('Insert failed: no row returned');
  return rows[0] as Application;
}

export async function fetchApplications(): Promise<ApplicationWithDocs[]> {
  const sql = await getSql();
  const apps = (await sql`SELECT * FROM public.applications ORDER BY created_at DESC`) as unknown as Array<Record<string, unknown>>;
  if (!apps || apps.length === 0) return [];

  const appIds = apps.map((a) => a.id as string);
  const docs = (await sql`
    SELECT * FROM public.application_documents
    WHERE application_id = ANY(${appIds})
  `) as unknown as Array<Record<string, unknown>>;

  const docMap = new Map<string, ApplicationDocument[]>();
  for (const d of docs || []) {
    const arr = docMap.get(d.application_id as string) || [];
    arr.push(d as unknown as ApplicationDocument);
    docMap.set(d.application_id as string, arr);
  }

  return apps.map((a) => ({
    ...a,
    documents: docMap.get(a.id as string) || [],
  })) as unknown as ApplicationWithDocs[];
}

export async function insertDocument(data: {
  application_id: string;
  kind: 'report' | 'parent_id' | 'birth_cert';
  storage_key: string;
  file_name: string | null;
  content_type: string | null;
}): Promise<void> {
  const sql = await getSql();
  await sql`
    INSERT INTO public.application_documents
      (application_id, kind, storage_key, file_name, content_type)
    VALUES
      (${data.application_id}, ${data.kind}, ${data.storage_key},
       ${data.file_name}, ${data.content_type})
  `;
}

// ── S3 (Neon Object Storage) ─────────────────────────────────────────────────
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

let _s3: S3Client | null = null;

function getS3(): S3Client {
  if (!_s3) {
    // The S3 endpoint has a subdomain (assets.<id>.storage...) that doesn't
    // match the TLS cert (*.storage.c-6.us-east-2.aws.neon.tech).
    // Strip the subdomain and use forcePathStyle so the bucket goes in the path.
    let endpoint = AWS_ENDPOINT_URL_S3;
    if (endpoint) {
      const u = new URL(endpoint);
      u.hostname = u.hostname.replace(/^assets\.[^.]+\./, '');
      endpoint = u.toString().replace(/\/$/, '');
    }
    _s3 = new S3Client({
      region: AWS_REGION || 'us-east-2',
      endpoint,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID!,
        secretAccessKey: AWS_SECRET_ACCESS_KEY!,
      },
      forcePathStyle: true,
    });
  }
  return _s3;
}

export async function uploadDocument(
  key: string,
  file: File,
  contentType: string
): Promise<void> {
  const s3 = getS3();
  const body = await file.arrayBuffer();
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: new Uint8Array(body),
      ContentType: contentType,
    })
  );
}

export async function downloadDocument(key: string): Promise<Uint8Array> {
  const s3 = getS3();
  const res = await s3.send(
    new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key })
  );
  const bytes = await res.Body?.transformToByteArray();
  if (!bytes) throw new Error('No bytes returned from storage');
  return bytes;
}

export async function getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
  const s3 = getS3();
  return getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key }),
    { expiresIn }
  );
}

// ── Auth (re-export from neon-auth.ts) ──────────────────────────────────────
export { createAuth, getAuth } from './neon-auth';
export type { NeonAuth } from './neon-auth';
