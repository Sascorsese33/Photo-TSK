# Studio Virtuel

Plateforme SaaS B2B pour professionnels de l'automobile afin de transformer des photos de
véhicules en visuels studio premium.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (auth + données)
- Stripe (abonnement 150€/mois)
- Replicate (pipeline IA)
- Cloudinary/S3 (stockage)

## Démarrage local

```bash
npm install
npm run dev
```

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=
REPLICATE_API_KEY=
CLOUDINARY_URL=
```

## Routes principales

- `/` landing page premium
- `/login` et `/signup`
- `/dashboard`
- `/dashboard/nouveau`
- `/dashboard/abonnement`

## Stripe

- Checkout: `/api/stripe/checkout`
- Customer Portal: `/api/stripe/portal`
- Webhook: `/api/stripe/webhook`

## Middleware

`middleware.ts` protège les routes `/dashboard/*` et redirige vers `/dashboard/abonnement` si
l'utilisateur n'a pas d'abonnement actif (`active` ou `trialing`).
