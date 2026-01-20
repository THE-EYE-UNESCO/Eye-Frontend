"use client";

import { AlertTriangle, Bell, LayoutDashboard, Map, Newspaper, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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
    { label: "Dashboard", href: "/citizen", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "Crisis Map", href: "/citizen/crisis-map", icon: <Map className="h-4 w-4" /> },
    { label: "Alerts", href: "/citizen/alerts", icon: <Bell className="h-4 w-4" /> },
    { label: "Report Incident", href: "/citizen/report", icon: <AlertTriangle className="h-4 w-4" /> },
    { label: "News & Updates", href: "/citizen/news", icon: <Newspaper className="h-4 w-4" /> },
    { label: "Community hub", href: "/citizen/community", icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <main className="min-h-screen bg-[#f3f5fb] text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-60 flex-col bg-[#0b1020] text-slate-100 sm:flex">
          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-6">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white">THE EYE</span>
          </div>

          <nav className="mt-4 flex-1 space-y-1 px-2 text-sm">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs ${
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

          <div className="mt-auto space-y-4 px-4 pb-6 text-xs">
            <div className="rounded-2xl bg-[#151a2a] px-4 py-3 text-center text-slate-200">
              <p className="text-[11px] font-semibold uppercase tracking-wide">Upgrade to PRO</p>
              <p className="mt-1 text-[11px] text-slate-400">Get access to all features.</p>
              <button className="mt-3 w-full rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#0b1020]">
                Get Pro Now!
              </button>
            </div>
            <Link
              href="/citizen/profile"
              className="flex items-center gap-2 rounded-xl px-2 py-2 text-[11px] text-slate-400 hover:bg-white/5"
            >
              <div className="h-7 w-7 rounded-full bg-slate-600" />
              <div>
                <p className="font-medium text-slate-100">Dianah IRANZI</p>
                <p>iradianah5@gmail.com</p>
              </div>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 px-4 pb-8 pt-4 sm:px-8">
          {/* Critical banner */}
          <div className="rounded-3xl bg-gradient-to-r from-[#ff4b4b] to-[#ff7f50] px-6 py-4 text-white shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 shadow-sm">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-white/80">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 font-semibold uppercase tracking-[0.2em] text-white">
                      Breaking Alert
                    </span>
                    <span>Live Updates</span>
                  </div>
                  <p className="mt-1 text-base font-semibold">CRITICAL : Landslide in Hill District</p>
                  <p className="text-xs text-white/80">
                    Evacuate immediately if within 2.5km. Follow Route 12 to Central Shelter.
                  </p>
                </div>
              </div>
              <button className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#ff4b4b] shadow-sm">
                View Details
              </button>
            </div>
          </div>

          {/* Page header */}
          {(title || subtitle) && (
            <div className="mt-6 space-y-1">
              {title && <div className="text-2xl font-semibold text-slate-900">{title}</div>}
              {subtitle && <div className="text-sm text-slate-500">{subtitle}</div>}
            </div>
          )}

          <div className="mt-6">{children}</div>
        </section>
      </div>
    </main>
  );
}

