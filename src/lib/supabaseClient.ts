import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined;
const supabaseAnon = (import.meta as any).env?.VITE_SUPABASE_PUBLIC_KEY as string | undefined;

// HMR-safe singleton: cache on globalThis to avoid multiple clients in dev
const g = globalThis as unknown as { __supabase?: SupabaseClient | null };

let client: SupabaseClient | null = g.__supabase ?? null;
if (!client && supabaseUrl && supabaseAnon) {
  client = createClient(supabaseUrl, supabaseAnon);
  g.__supabase = client;
}

export default client;
