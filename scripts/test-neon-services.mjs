// End-to-end test of all three Neon services
// Uses serverless driver for Postgres (HTTP/443) to avoid network issues
import { readFileSync } from 'fs';

const env = {};
for (const line of readFileSync('.env', 'utf-8').split('\n')) {
  if (line.startsWith('#') || !line.includes('=')) continue;
  const [k, ...v] = line.split('=');
  let val = v.join('=');
  if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
  env[k.trim()] = val;
}

let passed = 0, failed = 0;
function ok(name, condition, detail = '') {
  if (condition) { passed++; console.log(`  ✅ ${name}`); }
  else { failed++; console.log(`  ❌ ${name} ${detail}`); }
}

console.log('═'.repeat(50));
console.log('Neon Services End-to-End Test');
console.log('═'.repeat(50));

// ── 1. Postgres (via serverless driver — uses HTTP/443) ─────────────────────
console.log('\n[1] Neon Postgres (serverless driver)');
try {
  const { neon } = await import('@neondatabase/serverless');
  
  // Strip channel_binding (not supported by serverless driver)
  const dbUrl = env.DATABASE_URL.replace('&channel_binding=require', '');
  const sql = neon(dbUrl, { fetch: (url, opts) => fetch(url, { ...opts, signal: AbortSignal.timeout(15000) }) });
  
  // Test schema
  const tables = await sql`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema='public' ORDER BY table_name
  `;
  const tableNames = tables.map(r => r.table_name);
  ok('applications table exists', tableNames.includes('applications'));
  ok('application_documents table exists', tableNames.includes('application_documents'));

  // Test INSERT
  const insertResult = await sql`
    INSERT INTO public.applications
      (full_name, email, phone, previous_school, application_year, grade_applying_for)
     VALUES ('E2E Test', 'e2e@test.com', '0700000000', 'Test School', 2027, '8')
     RETURNING id, full_name, email
  `;
  const newApp = insertResult[0];
  ok('INSERT application', newApp.id !== undefined && newApp.full_name === 'E2E Test',
     JSON.stringify(newApp));

  // Test SELECT
  const selectResult = await sql`
    SELECT id, full_name, email FROM public.applications WHERE id = ${newApp.id}
  `;
  ok('SELECT application', selectResult[0]?.full_name === 'E2E Test');

  // Test INSERT document
  const docResult = await sql`
    INSERT INTO public.application_documents
      (application_id, kind, storage_key, file_name, content_type)
     VALUES (${newApp.id}, 'report', ${newApp.id + '/report'}, 'test.pdf', 'application/pdf')
     RETURNING id
  `;
  ok('INSERT document', docResult[0]?.id !== undefined);

  // Cleanup
  await sql`DELETE FROM public.application_documents WHERE application_id = ${newApp.id}`;
  await sql`DELETE FROM public.applications WHERE id = ${newApp.id}`;
  ok('cleanup', true);

} catch (e) {
  ok('Postgres connect', false, e.message);
}

// ── 2. Neon Auth ────────────────────────────────────────────────────────────
console.log('\n[2] Neon Auth (Managed Better Auth)');
const authBase = env.NEON_AUTH_BASE_URL || '';
try {
  const res = await fetch(authBase + '/get-session', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  ok('auth endpoint reachable', res.status === 200 || res.status === 401,
     `status: ${res.status}`);
  const statusText = await res.text();
  console.log(`  (auth response: ${statusText.substring(0, 100)})`);
} catch (e) {
  ok('auth endpoint reachable', false, e.message);
}

// ── 3. Object Storage ───────────────────────────────────────────────────────
console.log('\n[3] Neon Object Storage');
const s3Endpoint = env.AWS_ENDPOINT_URL_S3 || '';
const region = env.AWS_REGION || 'us-east-2';
const accessKey = env.AWS_ACCESS_KEY_ID || '';
const secretKey = env.AWS_SECRET_ACCESS_KEY || '';

try {
  const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } =
    await import('@aws-sdk/client-s3');

  const s3EndpointUrl = new URL(s3Endpoint);
  const s3BaseHost = s3EndpointUrl.hostname.replace(/^assets\.[^.]+\./, '');

  const s3 = new S3Client({
    endpoint: `https://${s3BaseHost}`,
    region,
    credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
    forcePathStyle: true,
  });

  const testKey = `e2e-test-${Date.now()}.txt`;
  const testBody = 'Hello from Neon Object Storage E2E test';

  await s3.send(new PutObjectCommand({
    Bucket: 'assets', Key: testKey, Body: testBody, ContentType: 'text/plain',
  }));
  ok('S3 upload', true);

  const getResult = await s3.send(new GetObjectCommand({ Bucket: 'assets', Key: testKey }));
  const downloaded = await getResult.Body.transformToString();
  ok('S3 download', downloaded === testBody);

  await s3.send(new DeleteObjectCommand({ Bucket: 'assets', Key: testKey }));
  ok('S3 delete', true);

} catch (e) {
  ok('S3 upload', false, e.message);
}

// ── Summary ─────────────────────────────────────────────────────────────────
console.log('\n' + '═'.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('═'.repeat(50));
process.exit(failed > 0 ? 1 : 0);
