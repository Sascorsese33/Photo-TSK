import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen bg-background px-6 py-8 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row">
        <DashboardSidebar />
        <section className="flex-1 rounded-2xl border border-white/10 bg-[#0D0D14] p-6">
          {children}
        </section>
      </div>
    </main>
  );
}
