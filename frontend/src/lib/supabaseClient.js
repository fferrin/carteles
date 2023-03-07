import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

function getSupabaseBrowserClient() {
  return createBrowserSupabaseClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
}

export default getSupabaseBrowserClient;