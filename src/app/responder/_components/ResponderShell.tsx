"use client";

import {
  Bell,
  LayoutDashboard,
  Map,
  AlertTriangle,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import ThreeBackground from "@/components/ThreeBackground";

export function ResponderShell({
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
      href: "/responder",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      label: "Crisis Map",
      href: "/responder/crisis-map",
      icon: <Map className="h-4 w-4" />,
    },
    {
      label: "Alerts",
      href: "/responder/alerts",
      icon: <Bell className="h-4 w-4" />,
    },
    {
      label: "Reported incident",
      href: "/responder/reported-incident",
      icon: <FileText className="h-4 w-4" />,
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary responder-main relative">
      <ThreeBackground />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden fixed top-0 left-0 h-screen w-64 flex-col bg-bg-secondary text-text-primary sm:flex z-30 border-r border-card-border">
          <div className="flex items-center gap-2 border-b border-card-border px-6 py-6">
            <span className="text-base font-semibold uppercase tracking-[0.25em] text-tealGlow">
              THE EYE
            </span>
          </div>

          <nav className="mt-6 flex-1 space-y-2 px-4">
            {nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                    isActive
                      ? "bg-tealGlow text-night font-semibold shadow-glow"
                      : "text-text-secondary hover:bg-card-bg"
                  }`}
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${
                    isActive ? "bg-night/20" : "bg-card-bg"
                  }`}>
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4 px-4 pb-6 text-sm">
            <div className="rounded-2xl bg-card-bg border border-card-border px-4 py-4 text-center text-text-secondary">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-primary">
                Upgrade to PRO
              </p>
              <p className="mt-1 text-xs text-text-muted">
                Access advanced response tools.
              </p>
              <button className="mt-3 w-full rounded-full bg-tealGlow px-3 py-1.5 text-xs font-semibold text-night shadow-glow-button hover:opacity-90 transition">
                Get Pro Now!
              </button>
            </div>
            
            <div className="flex items-center gap-3 px-2">
              <div className="h-9 w-9 overflow-hidden rounded-full border border-card-border">
                <Image
                  src="/profile.png"
                  alt="Responder avatar"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-text-primary truncate">Chief Operative Elena</p>
                <p className="text-[10px] text-tealGlow font-medium truncate">ID: RESP-42901-EC</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="sm:ml-64 flex-1 flex flex-col">
          <section className="flex-1 px-8 pb-12 pt-8">
            {/* Page header */}
            {(title || subtitle) && (
              <div className="mb-10 space-y-2">
                {title && (
                  <h1 className="text-3xl font-bold text-text-primary tracking-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-base text-text-secondary">{subtitle}</p>
                )}
              </div>
            )}

            <div className="mt-8">{children}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
