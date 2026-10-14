import { createClient } from '@supabase/supabase-js';

// These are the PUBLIC (anon) credentials. The anon key is safe to ship in a
// browser bundle — it is NOT a secret. Real security comes from Row-Level
// Security on the tables (see supabase/schema.sql): anon can INSERT, only
// authenticated users can SELECT.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-key'
);

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
  storage_path: string;
  file_name: string | null;
  content_type: string | null;
  created_at: string;
}

export type ApplicationWithDocs = Application & {
  documents: ApplicationDocument[];
};
