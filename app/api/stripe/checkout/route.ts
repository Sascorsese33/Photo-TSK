import { createServerSupabaseClient } from "@/lib/supabase/server";
import { STRIPE_PRICE_ID, getStripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    if (!STRIPE_PRICE_ID) {
      return NextResponse.json(
        { error: "STRIPE_PRICE_ID manquant dans l'environnement." },
        { status: 500 },
      );
    }

    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const emailFromQuery = request.nextUrl.searchParams.get("email");
    const userIdFromQuery = request.nextUrl.searchParams.get("userId");

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin;

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${baseUrl}/dashboard?checkout=success`,
      cancel_url: `${baseUrl}/dashboard/abonnement?checkout=cancel`,
      customer_email: user?.email ?? emailFromQuery ?? undefined,
      metadata: {
        userId: user?.id ?? userIdFromQuery ?? "",
      },
    });

    return NextResponse.redirect(session.url ?? `${baseUrl}/dashboard/abonnement`);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de créer la session Stripe Checkout.", details: String(error) },
      { status: 500 },
    );
  }
}
