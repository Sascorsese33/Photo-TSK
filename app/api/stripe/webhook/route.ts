import { createServiceRoleClient } from "@/lib/supabase/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new Response("Webhook non configuré", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const body = await request.text();
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return new Response(`Signature invalide: ${String(error)}`, { status: 400 });
  }

  const admin = createServiceRoleClient();

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (userId) {
        await admin.from("profiles").upsert({
          id: userId,
          stripe_customer_id: session.customer,
          subscription_status: "active",
        });
      }
    }

    if (
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = String(subscription.customer);
      const periodEndUnix = (subscription as unknown as { current_period_end?: number })
        .current_period_end;

      await admin
        .from("profiles")
        .update({
          subscription_status: subscription.status,
          stripe_subscription_id: subscription.id,
          current_period_end: periodEndUnix
            ? new Date(periodEndUnix * 1000).toISOString()
            : null,
        })
        .eq("stripe_customer_id", customerId);
    }

    return new Response("ok", { status: 200 });
  } catch (error) {
    return new Response(`Erreur webhook: ${String(error)}`, { status: 500 });
  }
}
