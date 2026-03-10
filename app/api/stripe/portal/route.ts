import { createServiceRoleClient, createServerSupabaseClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const admin = createServiceRoleClient();
    const { data: profile } = await admin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.redirect(new URL("/dashboard/abonnement", request.url));
    }

    const flow = request.nextUrl.searchParams.get("flow");
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin;

    const session = await getStripe().billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${baseUrl}/dashboard/abonnement`,
      flow_data:
        flow === "cancel"
          ? {
              type: "subscription_cancel",
            }
          : undefined,
    });

    return NextResponse.redirect(session.url);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible d'ouvrir le portail client.", details: String(error) },
      { status: 500 },
    );
  }
}
