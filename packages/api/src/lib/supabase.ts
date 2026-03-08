import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.warn(
    "⚠️ Supabase URL or Service Role Key missing. API will run with limited DB access."
  );
}

export const supabase = createClient(url ?? "", serviceKey ?? "", {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
