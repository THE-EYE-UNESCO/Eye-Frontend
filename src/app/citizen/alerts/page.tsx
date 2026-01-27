"use client";

import React, { useMemo, useState } from "react";
import { Bell, CalendarDays, CheckCircle2, Share2 } from "lucide-react";
import { CitizenShell } from "../_components/CitizenShell";

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

const initialAlerts: AlertItem[] = [
  {
    id: "a1",
    title: "Wildfire spreading near Forest Park",
    message:
      "HIGH: Fire spread detected near Forest Park. Avoid the area and follow evacuation guidance if instructed.",
    severity: "Critical",
    createdAgo: "about 3 hours ago",
    delivery: ["App", "SMS", "WhatsApp", "IVR"],
    acknowledged: false,
  },
  {
    id: "a2",
    title: "Flash flood warning in River Valley",
    message:
      "HIGH: Flash flood warning in River Valley. Move to higher ground. Avoid basement areas.",
    severity: "Critical",
    createdAgo: "about 3 hours ago",
    delivery: ["App", "SMS"],
    acknowledged: true,
  },
  {
    id: "a3",
    title: "Flash flood warning in River Valley",
    message:
      "HIGH: Flash flood warning in River Valley. Move to higher ground. Avoid basement areas.",
    severity: "Critical",
    createdAgo: "about 3 hours ago",
    delivery: ["App", "WhatsApp"],
    acknowledged: true,
  },
  {
    id: "a4",
    title: "Flash flood warning in River Valley",
    message:
      "HIGH: Flash flood warning in River Valley. Move to higher ground. Avoid basement areas.",
    severity: "Critical",
    createdAgo: "about 3 hours ago",
    delivery: ["IVR"],
    acknowledged: true,
  },
];

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

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [severityFilter, setSeverityFilter] = useState<Severity | "All">("All");
  const [showAcknowledged, setShowAcknowledged] = useState(true);

  const counts = useMemo(() => {
    const total = alerts.length;
    const acknowledged = alerts.filter((a) => a.acknowledged).length;
    const active = total - acknowledged;
    return { total, acknowledged, active };
  }, [alerts]);

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      if (!showAcknowledged && a.acknowledged) return false;
      if (severityFilter !== "All" && a.severity !== severityFilter) return false;
      return true;
    });
  }, [alerts, showAcknowledged, severityFilter]);

  const activeAlerts = filtered.filter((a) => !a.acknowledged);
  const ackAlerts = filtered.filter((a) => a.acknowledged);

  const acknowledge = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
  };

  return (
    <CitizenShell
      title="Emergency Alerts"
      subtitle="Stay updated with real-time emergency notifications"
    >
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Active Alerts"
            value={counts.active}
            colorClass="bg-red-500"
            icon={<Bell className="h-5 w-5 text-white" />}
          />
          <SummaryCard
            title="Acknowledged"
            value={counts.acknowledged}
            colorClass="bg-green-600"
            icon={<CheckCircle2 className="h-5 w-5 text-white" />}
          />
          <SummaryCard
            title="Total Alerts"
            value={counts.total}
            colorClass="bg-blue-600"
            icon={<CalendarDays className="h-5 w-5 text-white" />}
          />
        </div>

        {/* Filters */}
        <div className="glass-panel p-4 shadow-card">
          <p className="text-[11px] font-semibold text-text-muted">Filter by Severity</p>
          <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-center justify-between rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-sm shadow-sm transition">
              <span className="text-text-secondary">
                {severityFilter === "All" ? "All Severities..." : severityFilter}
              </span>
              <select
                className="bg-transparent text-sm text-text-primary focus:outline-none"
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value as Severity | "All")}
              >
                <option value="All" className="text-night">All</option>
                <option value="Critical" className="text-night">Critical</option>
                <option value="High" className="text-night">High</option>
                <option value="Medium" className="text-night">Medium</option>
                <option value="Low" className="text-night">Low</option>
              </select>
            </div>

            <label className="flex items-center gap-2 justify-end text-xs text-text-muted cursor-pointer">
              <input
                type="checkbox"
                checked={showAcknowledged}
                onChange={(e) => setShowAcknowledged(e.target.checked)}
                className="accent-tealGlow"
              />
              Show Acknowledged
            </label>
          </div>
        </div>

        {/* Active Alerts */}
        <section className="space-y-3">
          <p className="text-xs font-semibold text-text-primary">Active Alerts</p>

          {activeAlerts.length === 0 ? (
            <div className="glass-panel p-6 text-sm text-text-muted shadow-sm">
              No active alerts.
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
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${severityBadge(a.severity)}`}>
                        {a.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-text-primary">{a.title}</p>

                    <div className="flex flex-wrap items-center gap-2 text-[10px] text-text-muted">
                      <span className="text-text-muted">Delivery:</span>
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
                  <p className="text-[10px] text-text-muted/70">{a.createdAgo}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => acknowledge(a.id)}
                    className="rounded-xl bg-tealGlow px-4 py-2 text-[11px] font-semibold text-night shadow-glow-button hover:opacity-90 transition"
                  >
                    Acknowledge Alert
                  </button>
                  <button className="rounded-xl border border-card-border bg-card-bg px-4 py-2 text-[11px] font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm">
                    View Details
                  </button>
                  <button className="rounded-xl border border-card-border bg-card-bg px-4 py-2 text-[11px] font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm inline-flex items-center gap-2">
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Acknowledged Alerts */}
        <section className="space-y-3">
          <p className="text-xs font-semibold text-text-primary">Acknowledged Alerts</p>

          {ackAlerts.length === 0 ? (
            <div className="glass-panel p-6 text-sm text-text-muted shadow-sm">
              No acknowledged alerts.
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
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${severityBadge(a.severity)}`}>
                        {a.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-text-primary">{a.message}</p>
                    <p className="inline-flex items-center gap-1 text-[11px] text-green-600 font-semibold">
                      <CheckCircle2 className="h-4 w-4" />
                      Acknowledged
                    </p>
                  </div>
                  <p className="text-[10px] text-text-muted/70">{a.createdAgo}</p>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </CitizenShell>
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

