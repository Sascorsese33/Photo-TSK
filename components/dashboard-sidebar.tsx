"use client";

import { cn } from "@/lib/utils";
import { FolderKanban, PlusSquare, Settings, WalletCards } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/dashboard", label: "Mes projets", icon: FolderKanban },
  { href: "/dashboard/nouveau", label: "Nouveau projet", icon: PlusSquare },
  { href: "/dashboard/parametres", label: "Paramètres", icon: Settings },
  { href: "/dashboard/abonnement", label: "Abonnement", icon: WalletCards },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-2xl border border-white/10 bg-card/60 p-4 lg:w-72">
      <Link href="/" className="font-display text-2xl">
        Studio <span className="text-gold">Virtuel</span>
      </Link>
      <nav className="mt-6 space-y-2">
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-300",
                pathname === link.href
                  ? "border border-gold/40 bg-gold/10 text-gold"
                  : "border border-transparent text-white/80 hover:border-white/10 hover:bg-white/5",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
