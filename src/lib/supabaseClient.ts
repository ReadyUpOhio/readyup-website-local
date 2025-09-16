import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// HMR-safe singleton: cache on globalThis to avoid multiple clients in dev
const g = globalThis as unknown as { __supabase?: SupabaseClient };

const getSupabase = (): SupabaseClient => {
  if (g.__supabase) {
    return g.__supabase;
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || supabaseUrl.includes('YOUR_SUPABASE_URL')) {
    throw new Error('Supabase URL is not configured. Please check your .env file.');
  }

  if (!supabaseAnonKey || supabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY')) {
    throw new Error('Supabase Anon Key is not configured. Please check your .env file.');
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL or anonymous key is missing.");
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  g.__supabase = supabase;
  return supabase;
};

export default getSupabase;
