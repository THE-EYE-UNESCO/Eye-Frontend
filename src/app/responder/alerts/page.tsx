"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Bell, CalendarDays, CheckCircle2, Share2 } from "lucide-react";
import Link from "next/link";
import { ResponderShell } from "../_components/ResponderShell";
import { api } from "@/lib/api";

type Severity = "Critical" | "High" | "Medium" | "Low";

type AlertItem = {
  id: string;
  title: string;
  message: string;
  severity: Severity;
  createdAgo: string;
  delivery: Array<"App" | "SMS" | "WhatsApp" | "IVR">;
  acknowledged: boolean;
};

function severityBadge(severity: Severity) {
  switch (severity) {
    case "Critical":
      return "bg-red-500 text-white";
    case "High":
      return "bg-orange-500 text-white";
    case "Medium":
      return "bg-amber-400 text-white";
    case "Low":
      return "bg-emerald-500 text-white";
  }
}

export default function ResponderAlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [severityFilter, setSeverityFilter] = useState<Severity | "All">("All");
  const [showAcknowledged, setShowAcknowledged] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchIncidents = async () => {
      try {
        // /responder/incidents returns incidents that wrap the citizen report
        const data = await api.get("/responder/incidents");
        const incidents: {
          id: string;
          status: string;
          created_at?: string;
          report?: {
            title?: string;
            description?: string;
            severity?: string;
            created_at?: string;
          };
        }[] = data.incidents || [];
        const mappedAlerts: AlertItem[] = incidents.map((inc) => {
          const r = inc.report || {}; // handle both nested and flat shapes
          const rawSeverity: string = r.severity || "Low";
          const capitalized = (rawSeverity.charAt(0).toUpperCase() +
            rawSeverity.slice(1).toLowerCase()) as Severity;
          return {
            id: inc.id,
            title: r.title || "Incident",
            message: r.description || "",
            severity: capitalized,
            createdAgo: getTimeAgo(
              r.created_at || inc.created_at || new Date().toISOString(),
            ),
            delivery: ["App", "SMS"],
            acknowledged: inc.status === "RESOLVED" || inc.status === "ON_SITE",
          };
        });
        setAlerts(mappedAlerts);
      } catch (error) {
        console.error("Failed to fetch incidents for alerts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diff = Math.floor((now.getTime() - then.getTime()) / 60000);
    if (diff < 60) return `${diff}m ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const counts = useMemo(() => {
    const total = alerts.length;
    const acknowledged = alerts.filter((a) => a.acknowledged).length;
    const active = total - acknowledged;
    return { total, acknowledged, active };
  }, [alerts]);

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      if (!showAcknowledged && a.acknowledged) return false;
      if (severityFilter !== "All" && a.severity !== severityFilter)
        return false;
      return true;
    });
  }, [alerts, showAcknowledged, severityFilter]);

  const activeAlerts = filtered.filter((a) => !a.acknowledged);
  const ackAlerts = filtered.filter((a) => a.acknowledged);

  const acknowledge = async (id: string) => {
    // Optimistically update UI
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)),
    );
    try {
      await api.patch(`/responder/incidents/${id}/status`, {
        status: "ON_THE_WAY",
      });
    } catch (error) {
      console.error("Failed to update incident status:", error);
      // Revert on error
      setAlerts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, acknowledged: false } : a)),
      );
    }
  };

  if (!mounted) return null;

  return (
    <ResponderShell
      title="Deployment Alerts"
      subtitle="Critical notifications for field response units"
    >
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Active Dispatches"
            value={counts.active}
            colorClass="bg-red-500/90"
            icon={<Bell className="h-5 w-5 text-white" />}
          />
          <SummaryCard
            title="Resolved / Acknowledged"
            value={counts.acknowledged}
            colorClass="bg-emerald-600/90"
            icon={<CheckCircle2 className="h-5 w-5 text-white" />}
          />
          <SummaryCard
            title="Total Missions"
            value={counts.total}
            colorClass="bg-indigo-600/90"
            icon={<CalendarDays className="h-5 w-5 text-white" />}
          />
        </div>

        {/* Filters */}
        <div className="glass-panel p-4 shadow-card">
          <p className="text-[11px] font-semibold text-text-muted">
            Filter by Priority
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-center justify-between rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-sm shadow-sm transition">
              <span className="text-text-secondary">
                {severityFilter === "All"
                  ? "All Severities..."
                  : severityFilter}
              </span>
              <select
                className="bg-transparent text-sm text-text-primary focus:outline-none"
                value={severityFilter}
                onChange={(e) =>
                  setSeverityFilter(e.target.value as Severity | "All")
                }
              >
                <option value="All" className="bg-bg-primary text-text-primary">
                  All
                </option>
                <option
                  value="Critical"
                  className="bg-bg-primary text-text-primary"
                >
                  Critical
                </option>
                <option
                  value="High"
                  className="bg-bg-primary text-text-primary"
                >
                  High
                </option>
                <option
                  value="Medium"
                  className="bg-bg-primary text-text-primary"
                >
                  Medium
                </option>
                <option value="Low" className="bg-bg-primary text-text-primary">
                  Low
                </option>
              </select>
            </div>

            <label className="flex items-center gap-2 justify-end text-xs text-text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={showAcknowledged}
                onChange={(e) => setShowAcknowledged(e.target.checked)}
                className="accent-tealGlow"
              />
              Show Resolved
            </label>
          </div>
        </div>

        {/* Active Alerts */}
        <section className="space-y-3">
          <p className="text-xs font-semibold text-text-primary">
            High Priority Tasks
          </p>

          {activeAlerts.length === 0 ? (
            <div className="glass-panel p-6 text-sm text-text-muted shadow-sm">
              No active mission alerts.
            </div>
          ) : (
            activeAlerts.map((a) => (
              <div
                key={a.id}
                className="glass-panel shadow-card border-l-4 border-l-red-500 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${severityBadge(a.severity)}`}
                      >
                        {a.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-text-primary">
                      {a.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-[10px] text-text-muted">
                      <span className="text-text-muted">Channels:</span>
                      {a.delivery.map((d) => (
                        <span
                          key={d}
                          className="rounded-md border border-card-border bg-card-bg px-2 py-0.5 shadow-sm transition"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-text-muted/70">
                    {a.createdAgo}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => acknowledge(a.id)}
                    className="rounded-xl bg-tealGlow px-4 py-2 text-[11px] font-semibold text-night shadow-glow-button hover:opacity-90 transition"
                  >
                    Confirm Response
                  </button>
                  <Link
                    href={`/responder/alerts/${a.id}`}
                    className="rounded-xl border border-card-border bg-card-bg px-4 py-2 text-[11px] font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm"
                  >
                    Operational Details
                  </Link>
                  <button className="rounded-xl border border-card-border bg-card-bg px-4 py-2 text-[11px] font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm inline-flex items-center gap-2">
                    <Share2 className="h-3.5 w-3.5" />
                    Broadcast
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Acknowledged Alerts */}
        <section className="space-y-3">
          <p className="text-xs font-semibold text-text-primary">
            History / Resolved
          </p>

          {ackAlerts.length === 0 ? (
            <div className="glass-panel p-6 text-sm text-text-muted shadow-sm">
              No resolved alerts.
            </div>
          ) : (
            ackAlerts.map((a) => (
              <div
                key={a.id}
                className="glass-panel shadow-card border-l-4 border-green-600 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${severityBadge(a.severity)}`}
                      >
                        {a.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-text-primary">{a.message}</p>
                    <p className="inline-flex items-center gap-1 text-[11px] text-green-600 font-semibold">
                      <CheckCircle2 className="h-4 w-4" />
                      Resolved
                    </p>
                  </div>
                  <p className="text-[10px] text-text-muted/70">
                    {a.createdAgo}
                  </p>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </ResponderShell>
  );
}

function SummaryCard({
  title,
  value,
  colorClass,
  icon,
}: {
  title: string;
  value: number;
  colorClass: string;
  icon: React.ReactNode;
}) {
  return (
    <div className={`rounded-3xl ${colorClass} px-5 py-5 text-white shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/15">
            {icon}
          </div>
          <p className="text-xs font-semibold text-white/90">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}
