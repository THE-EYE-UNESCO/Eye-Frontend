"use client";

import {
  AlertTriangle,
  Bell,
  LayoutDashboard,
  Map,
  Newspaper,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import ThreeBackground from "@/components/ThreeBackground";

export function CitizenShell({
  title,
  subtitle,
  children,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const nav = [
    {
      label: "Dashboard",
      href: "/citizen",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      label: "Crisis Map",
      href: "/citizen/crisis-map",
      icon: <Map className="h-4 w-4" />,
    },
    {
      label: "Alerts",
      href: "/citizen/alerts",
      icon: <Bell className="h-4 w-4" />,
    },
    {
      label: "Report Incident",
      href: "/citizen/report",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    {
      label: "News & Updates",
      href: "/citizen/news",
      icon: <Newspaper className="h-4 w-4" />,
    },
    {
      label: "Community hub",
      href: "/citizen/community",
      icon: <Users className="h-4 w-4" />,
    },
  ];

  return (
    <main className="min-h-screen bg-night text-white citizen-main relative">
      <ThreeBackground />
      <div className="flex min-h-screen">
        {/* Add left margin to compensate for fixed sidebar on desktop */}
        <div className="sm:ml-60 flex-1 flex flex-col">
        {/* Sidebar */}
        <aside className="hidden fixed top-0 left-0 h-screen w-60 flex-col bg-ocean text-slate-100 sm:flex z-30 citizen-sidebar border-r border-white/5">
          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-6">
            <span className="text-base font-semibold uppercase tracking-[0.25em] text-white">
              THE EYE
            </span>
          </div>

          <nav className="mt-4 flex-1 space-y-1 px-2 text-base">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm ${
                  pathname === item.href
                    ? "bg-white text-[#0b1020] font-semibold"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/20 text-[10px]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto space-y-4 px-4 pb-6 text-sm">
            <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-center text-slate-200 sidebar-upgrade">
              <p className="text-xs font-semibold uppercase tracking-wide">
                Upgrade to PRO
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Get access to all features.
              </p>
              <button className="mt-3 w-full rounded-full bg-tealGlow px-3 py-1.5 text-xs font-semibold text-night shadow-glow hover:shadow-lg transition">
                Get Pro Now!
              </button>
            </div>
            <Link
              href="/citizen/profile"
              className={`flex items-center gap-2 rounded-xl px-2 py-1.5 text-xs sidebar-profile transition ${
                pathname === "/citizen/profile"
                  ? "bg-white/10 text-white border border-white/5 shadow-sm"
                  : "text-slate-400 hover:bg-white/5"
              }`}
            >
              <Image
                src="/profile.png"
                alt="Profile avatar"
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p
                  className={`font-medium text-[11px] truncate ${
                    pathname === "/citizen/profile" ? "text-white" : "text-slate-100"
                  }`}
                >
                  Dianah IRANZI
                </p>
                <p
                  className={`text-[10px] truncate ${
                    pathname === "/citizen/profile" ? "text-slate-200" : "text-slate-500"
                  }`}
                >
                  iradianah5@gmail.com
                </p>
              </div>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 px-4 pb-8 pt-4 sm:px-8">
          {/* Page header */}
          {(title || subtitle) && (
            <div className="mt-6 space-y-1">
              {title && (
                <div className="text-2xl font-semibold text-white">
                  {title}
                </div>
              )}
              {subtitle && (
                <div className="text-sm text-slateSoft">{subtitle}</div>
              )}
            </div>
          )}

          <div className="mt-6">{children}</div>
        </section>
        </div>
      </div>
    </main>
  );
}
