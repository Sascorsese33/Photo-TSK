import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-14 text-white">
      <AuthForm mode="login" />
    </main>
  );
}
