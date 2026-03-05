"use client";

import {
  AlertTriangle,
  Bell,
  LayoutDashboard,
  Map,
  Newspaper,
  Users,
  Menu,
  X,
  Plus,
  ArrowUp,
  Eye,
  FileText,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
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
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsSidebarOpen(false);
    router.push("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing user data", e);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
      label: "My Reports",
      href: "/citizen/my-reports",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      label: "News",
      href: "/citizen/news",
      icon: <Newspaper className="h-4 w-4" />,
    },
    {
      label: "Community",
      href: "/citizen/community",
      icon: <Users className="h-4 w-4" />,
    },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tealGlow text-night">
          <Eye className="h-5 w-5" />
        </div>
        <span className="text-xl font-bold tracking-widest text-tealGlow uppercase">
          THE EYE
        </span>
      </div>

      <nav className="flex-1 space-y-2 px-4">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsSidebarOpen(false)}
            className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-300 ${
              pathname === item.href
                ? "bg-tealGlow text-night font-bold shadow-glow-teal"
                : "text-text-secondary hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`flex h-6 w-6 items-center justify-center transition-colors ${
                pathname === item.href ? "text-night" : "text-tealGlow/60 group-hover:text-tealGlow"
              }`}>
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </div>
            {pathname === item.href && <ArrowUp className="h-3 w-3 rotate-45" />}
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-4 space-y-4">
        <div className="rounded-[28px] bg-white/5 border-2 border-tealGlow/30 p-5 backdrop-blur-md">
          <p className="text-[10px] font-bold uppercase tracking-widest text-tealGlow mb-1">PRO Membership</p>
          <p className="text-sm font-bold text-text-primary mb-3">Early Warning AI</p>
          <button className="w-full rounded-xl bg-white/10 py-2.5 text-xs font-bold text-text-primary hover:bg-white/20 transition-colors border-2 border-tealGlow/40">
            Upgrade
          </button>
        </div>

        <Link
          href="/citizen/profile"
          onClick={() => setIsSidebarOpen(false)}
          className={`flex items-center gap-3 rounded-2xl p-3 transition-colors border-2 ${
            pathname === "/citizen/profile" ? "bg-white/10 border-tealGlow/50" : "hover:bg-white/5 border-white/20"
          }`}
        >
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-tealGlow/30 bg-card-bg flex items-center justify-center">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt="Avatar"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            ) : (
              <Users className="h-5 w-5 text-tealGlow/40" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-text-primary">{user?.name || "Citizen"}</p>
            <p className="truncate text-[10px] text-text-muted">{user?.email || "Citizen Level 4"}</p>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-2xl p-3 transition-colors border-2 hover:bg-red-500/10 border-red-500/30 hover:border-red-500/50 w-full text-left group"
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-red-500/30 bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
            <LogOut className="h-5 w-5 text-red-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-red-400">Logout</p>
            <p className="text-[10px] text-red-400/60">Sign out of your account</p>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary relative overflow-x-hidden selection:bg-tealGlow selection:text-night">
      <ThreeBackground />
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-transparent backdrop-blur-xl border-b border-card-border z-[60] px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-tealGlow text-night">
            <Eye className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-widest text-tealGlow">THE EYE</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/citizen/report">
            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-tealGlow text-night shadow-glow-teal active:scale-90">
              <Plus className="h-6 w-6" />
            </button>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-text-primary active:scale-90"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="flex min-h-screen lg:pt-0 pt-20">
        {/* Mobile Navigation Drawer */}
        <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ease-in-out ${isSidebarOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
          <div 
            className={`absolute inset-0 bg-night/80 backdrop-blur-md transition-opacity duration-500 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-bg-primary border-r border-white/10 transition-transform duration-500 ease-out-expo ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <button 
              className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-text-primary"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-72 flex-col bg-bg-primary border-r border-white/10 z-50">
          <SidebarContent />
        </aside>

        {/* Main Content Area */}
        <div className="lg:ml-72 flex-1 flex flex-col min-w-0">
          <section className="flex-1 px-4 sm:px-8 lg:px-12 pb-12 pt-8">
            {/* Elegant Header */}
            {(title || subtitle) && (
              <div className="mb-8 space-y-2">
                {title && (
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-sm sm:text-base text-text-secondary font-medium">{subtitle}</p>
                )}
              </div>
            )}

            <div className="relative group">
               {/* Decorative glow */}
               <div className="absolute -inset-4 bg-tealGlow/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
               <div className="relative z-10">{children}</div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
