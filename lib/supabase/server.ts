import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

export async function createServerSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient(supabaseUrl ?? "", supabaseAnonKey ?? "", {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: "", ...options });
      },
    },
  });
}

export function createServiceRoleClient() {
  return createClient(supabaseUrl ?? "", supabaseServiceKey ?? "", {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function hasActiveSubscription(userId: string) {
  const admin = createServiceRoleClient();
  const { data } = await admin
    .from("profiles")
    .select("subscription_status")
    .eq("id", userId)
    .single();

  return ["active", "trialing"].includes(data?.subscription_status ?? "");
}
