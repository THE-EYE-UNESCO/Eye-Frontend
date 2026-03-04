"use client";

import { ResponderShell } from "./_components/ResponderShell";
import React from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle,
  Calendar,
  AlertOctagon,
  ArrowRight,
  MapPin,
  ChevronRight,
  Phone,
  LayoutDashboard,
} from "lucide-react";
import { api } from "@/lib/api";

export default function ResponderDashboard() {
  const [reports, setReports] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Incidents returned by /responder/incidents wrap the citizen report:
  // { id, status, responder_id, report: { id, title, description, severity, category, address, landmark, created_at } }

  React.useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await api.get("/responder/incidents");
        setReports(data.incidents || []);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <ResponderShell
      title="Responder Dashboard"
      subtitle="Real-time overview of your response operations"
    >
      <div className="space-y-8 sm:space-y-10">
        {/* Stat Overview Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3">
          <StatCard
            title="Active Alerts"
            value={reports
              .filter((r) => r.severity === "CRITICAL" || r.severity === "HIGH")
              .length.toString()}
            icon={<Bell className="h-5 w-5 sm:h-6 sm:w-6" />}
            color="bg-[#FF5A5A]"
          />
          <StatCard
            title="Pending Reports"
            value={reports
              .filter((r) => r.status === "PENDING")
              .length.toString()}
            icon={<CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />}
            color="bg-[#41843D]"
          />
          <StatCard
            title="Total Reports"
            value={reports.length.toString()}
            icon={<Calendar className="h-5 w-5 sm:h-6 sm:w-6" />}
            color="bg-[#1D7AFC]"
          />
        </div>

        <div className="grid gap-8 lg:gap-10 grid-cols-1 lg:grid-cols-[1.2fr_2fr]">
          {/* Left Column: Urgent Alert + Take Action */}
          <div className="space-y-8 sm:space-y-10 order-2 lg:order-1">
            {/* Urgent Alert Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-text-primary">
                <AlertOctagon className="h-5 w-5 text-[#FF5A5A]" />
                <h2 className="text-lg font-semibold">Urgent Alert</h2>
                <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#FF5A5A]/10 text-xs font-bold text-[#FF5A5A]">
                  {
                    reports.filter(
                      (r: any) =>
                        r.report?.severity === "CRITICAL" ||
                        r.report?.severity === "HIGH",
                    ).length
                  }
                </span>
              </div>

              {(() => {
                const urgent =
                  reports.find((r: any) => r.report?.severity === "CRITICAL") ||
                  reports.find((r: any) => r.report?.severity === "HIGH");
                if (!urgent)
                  return (
                    <div className="rounded-2xl border border-card-border bg-card-bg p-5 text-sm text-text-muted">
                      No urgent incidents assigned.
                    </div>
                  );
                return (
                  <div className="rounded-2xl border border-[#FF5A5A]/20 bg-[#FF5A5A]/5 p-5 sm:p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-text-primary text-sm">
                        {urgent.report?.title || "Urgent Incident"}
                      </h3>
                      <span className="rounded-full bg-[#FF5A5A] px-2 py-0.5 text-[9px] font-bold text-white uppercase whitespace-nowrap">
                        {urgent.report?.severity}
                      </span>
                    </div>
                    <p className="mt-3 text-xs text-text-secondary leading-relaxed">
                      {urgent.report?.description ||
                        "Assess and report immediate dangers."}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-text-muted font-medium">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {urgent.report?.address ||
                          urgent.report?.landmark ||
                          "Location on file"}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Take Action Section */}
            <div className="rounded-[32px] sm:rounded-[40px] bg-card-bg p-6 sm:p-10 shadow-xl border border-card-border overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <LayoutDashboard className="h-32 w-32" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-6 sm:mb-8 relative z-10">
                Take Action
              </h2>
              <div className="space-y-3 sm:space-y-4 relative z-10">
                <ActionItem
                  icon={<MapPin className="h-4 w-4" />}
                  label="Update Location"
                  primary
                />
                <Link href="/responder/alerts" className="block w-full group">
                  <ActionItem
                    icon={<Bell className="h-4 w-4" />}
                    label="Active Alerts"
                  />
                </Link>
                <ActionItem
                  icon={<Phone className="h-4 w-4" />}
                  label="Request Backup"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Active Incidents */}
          <div className="space-y-4 order-1 lg:order-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">
                Active Incidents (from Citizen Reports)
              </h2>
              <Link href="/responder/crisis-map">
                <button className="rounded-xl bg-[#1D7AFC] px-4 sm:px-5 py-2 text-xs font-bold text-white shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                  View Map
                </button>
              </Link>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {loading ? (
                <div className="p-12 text-center text-text-secondary">
                  Loading reports...
                </div>
              ) : reports.length === 0 ? (
                <div className="p-12 text-center text-text-secondary">
                  No citizen reports found.
                </div>
              ) : (
                reports.map((report) => (
                  <IncidentCard key={report.id} report={report} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </ResponderShell>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div
      className={`${color} rounded-3xl sm:rounded-[32px] p-6 sm:p-8 text-white shadow-lg transition-transform hover:scale-[1.02] flex flex-col justify-between`}
    >
      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white/20">
        {icon}
      </div>
      <div className="mt-4 sm:mt-6">
        <p className="text-sm sm:text-base font-semibold opacity-90">{title}</p>
        <p className="mt-1 sm:mt-2 text-3xl sm:text-5xl font-black">{value}</p>
      </div>
    </div>
  );
}

function ActionItem({
  icon,
  label,
  primary,
}: {
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 transition-all hover:scale-[1.01] active:scale-[0.98] ${
        primary
          ? "bg-tealGlow text-night shadow-glow"
          : "bg-card-bg text-text-primary border border-card-border hover:bg-white/5"
      }`}
    >
      <div
        className={`flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full ${
          primary ? "bg-night/10 text-night/60" : "bg-card-bg text-text-muted"
        }`}
      >
        {icon}
      </div>
      <span className="flex-1 text-left text-xs sm:text-sm font-bold truncate">
        {label}
      </span>
      <ChevronRight className="h-4 w-4 opacity-40 flex-shrink-0" />
    </button>
  );
}

function IncidentCard({ report }: { report: any }) {
  const getSeverityColor = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case "CRITICAL":
        return "bg-[#FF3B3B]";
      case "HIGH":
        return "bg-orange-500";
      case "MEDIUM":
        return "bg-yellow-500";
      case "LOW":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diff = Math.floor((now.getTime() - then.getTime()) / 60000);
    if (diff < 60) return `${diff}m ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const isCritical = report.severity === "CRITICAL";

  return (
    <div className="group relative overflow-hidden rounded-[32px] border border-card-border bg-[#0A0F16] p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-tealGlow/30 transition-all">
      {/* Red vertical bar for Critical */}
      {isCritical && (
        <div className="absolute left-0 top-0 h-full w-1.5 bg-[#FF3B3B] shadow-[0_0_10px_rgba(255,59,59,0.3)]" />
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="space-y-4 flex-1">
          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full ${getSeverityColor(report.severity)} px-3 py-1 text-[8px] sm:text-[9px] font-bold text-white uppercase tracking-wider`}
            >
              {report.severity || "UNKNOWN"}
            </span>
            <span className="rounded-full bg-tealGlow/10 border border-tealGlow/20 px-3 py-1 text-[8px] sm:text-[9px] font-bold text-tealGlow uppercase tracking-wider">
              {report.category || "GENERAL"}
            </span>
            {report.status === "VERIFIED" && (
              <span className="rounded-full bg-[#2D1B1B] px-3 py-1 text-[8px] sm:text-[9px] font-bold text-[#FF4D4D] uppercase tracking-wider border border-[#FF3B3B]/10">
                Verified
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:underline decoration-2 underline-offset-4 cursor-pointer">
            {report.title}
          </h3>
          <p className="text-xs sm:text-[13px] leading-relaxed text-[#94A3B8] line-clamp-2">
            {report.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 text-[10px] sm:text-[11px] text-[#64748B] font-bold">
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-tealGlow" />
              <span>
                {report.landmark || report.address || "Unknown Location"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>{getTimeAgo(report.created_at)}</span>
            </div>
          </div>
        </div>

        <button className="rounded-xl bg-[#3B82F6] px-6 py-2.5 text-[11px] font-black text-white shadow-lg hover:bg-[#2563EB] transition-all self-start sm:self-center">
          Respond
        </button>
      </div>
    </div>
  );
}
