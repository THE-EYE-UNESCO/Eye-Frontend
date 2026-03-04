"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Shield,
  MessageSquare,
  Share2,
  MapPin,
  Clock,
  ChevronDown,
} from "lucide-react";
import { ResponderShell } from "../_components/ResponderShell";
import { api } from "@/lib/api";

interface Incident {
  id: string;
  status: string;
  report: {
    title: string;
    description: string;
    landmark?: string;
    address?: string;
    created_at: string;
    severity: string;
    category: string;
    status: string;
  };
}

export default function ReportedIncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await api.get("/responder/incidents");
        setIncidents(data.incidents || []);
      } catch (error) {
        console.error("Failed to fetch incidents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  const updateStatus = async (incidentId: string, status: string) => {
    setUpdatingId(incidentId);
    try {
      await api.patch(`/responder/incidents/${incidentId}/status`, { status });
      setIncidents((prev) =>
        prev.map((inc) => (inc.id === incidentId ? { ...inc, status } : inc)),
      );
    } catch (error) {
      console.error("Failed to update incident status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return (
      <ResponderShell title="Assigned Incidents" subtitle="Loading...">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tealGlow"></div>
        </div>
      </ResponderShell>
    );

  return (
    <ResponderShell
      title="Assigned Incidents"
      subtitle="Real-time incidents assigned to you"
    >
      <div className="space-y-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Assigned"
            value={incidents.length.toString()}
            icon={<Users className="h-6 w-6" />}
            color="bg-[#7C3AED]"
          />
          <StatCard
            label="Critical"
            value={incidents
              .filter((i) => i.report?.severity === "CRITICAL")
              .length.toString()}
            icon={<Shield className="h-6 w-6" />}
            color="bg-[#C04ABB]"
          />
          <StatCard
            label="On The Way"
            value={incidents
              .filter((i) => i.status === "ON_THE_WAY")
              .length.toString()}
            icon={<MessageSquare className="h-6 w-6" />}
            color="bg-[#2563EB]"
          />
          <StatCard
            label="Resolved"
            value={incidents
              .filter((i) => i.status === "RESOLVED")
              .length.toString()}
            icon={<Share2 className="h-6 w-6" />}
            color="bg-[#3F7D20]"
          />
        </div>

        {/* Filter Bar */}
        <div className="glass-panel p-6 shadow-card">
          <p className="mb-4 text-xs font-semibold text-text-muted">
            Filter by Severity
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <FilterSelect label="All Severities..." />
            <FilterSelect label="All Status" />
            <button className="ml-auto flex items-center gap-2 text-xs font-semibold text-text-muted transition hover:text-text-primary">
              Clear Filters
            </button>
          </div>
        </div>

        {/* Incidents List */}
        <div className="space-y-6">
          {incidents.length === 0 ? (
            <div className="glass-panel p-12 text-center text-text-secondary">
              No incidents assigned to you yet.
            </div>
          ) : (
            incidents.map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                onStatusUpdate={updateStatus}
                updatingId={updatingId}
              />
            ))
          )}
        </div>
      </div>
    </ResponderShell>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div
      className={`${color} rounded-3xl p-6 text-white shadow-lg transition hover:scale-[1.02]`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 mb-4">
        {icon}
      </div>
      <p className="text-xs font-medium opacity-80">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function FilterSelect({ label }: { label: string }) {
  return (
    <button className="flex min-w-[180px] items-center justify-between rounded-xl border border-card-border bg-card-bg px-4 py-2.5 text-xs text-text-muted transition hover:border-text-muted/30">
      <span>{label}</span>
      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
    </button>
  );
}

function IncidentCard({
  incident,
  onStatusUpdate,
  updatingId,
}: {
  incident: Incident;
  onStatusUpdate: (id: string, status: string) => void;
  updatingId: string | null;
}) {
  const report = incident.report || ({} as Incident["report"]);

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
  const isUpdating = updatingId === incident.id;
  const isResolved = incident.status === "RESOLVED";

  return (
    <div className="group relative overflow-hidden rounded-[40px] border border-card-border bg-[#0A0F16] p-8 sm:p-10 shadow-xl transition-all hover:shadow-2xl hover:border-tealGlow/20">
      {isCritical && (
        <div className="absolute left-0 top-0 h-full w-1.5 bg-[#FF3B3B] shadow-[0_0_15px_rgba(255,59,59,0.5)]" />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-5 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-xl px-4 py-1.5 text-[10px] font-black tracking-widest text-white uppercase ${
                isCritical ? "bg-[#FF3B3B]" : "bg-orange-500"
              }`}
            >
              {report.severity || "UNKNOWN"}
            </span>
            <span className="rounded-xl bg-[#2D1B1B] px-4 py-1.5 text-[10px] font-black tracking-widest text-[#FF4D4D] uppercase border border-[#FF3B3B]/10">
              {incident.status}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            {report.title || "Incident"}
          </h3>

          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8] max-w-3xl">
            {report.description}
          </p>

          <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold text-[#64748B] tracking-tight">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-tealGlow" />
              <span>{report.landmark || report.address || "Location N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{getTimeAgo(report.created_at)}</span>
            </div>
          </div>
        </div>

        <button className="rounded-2xl bg-[#3B82F6] px-10 py-4 text-sm font-black text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:bg-[#2563EB] hover:scale-105 active:scale-95 transition-all self-start md:self-center">
          View Details
        </button>
      </div>

      <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap items-center gap-6">
        <span className="text-[12px] font-black text-text-primary uppercase tracking-widest">
          Quick Actions:
        </span>
        <div className="flex flex-wrap gap-3">
          <button
            disabled={isUpdating || isResolved}
            onClick={() => onStatusUpdate(incident.id, "ON_THE_WAY")}
            className="rounded-xl bg-[#0F1721] px-6 py-2.5 text-[11px] font-bold text-text-primary border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? "Updating..." : "On The Way"}
          </button>
          <button
            disabled={isUpdating || isResolved}
            onClick={() => onStatusUpdate(incident.id, "ON_SITE")}
            className="rounded-xl bg-[#0F1721] px-6 py-2.5 text-[11px] font-bold text-text-primary border border-white/10 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? "Updating..." : "On Site"}
          </button>
          <button
            disabled={isUpdating || isResolved}
            onClick={() => onStatusUpdate(incident.id, "RESOLVED")}
            className="rounded-xl bg-green-700/20 px-6 py-2.5 text-[11px] font-bold text-green-400 border border-green-700/30 hover:bg-green-700/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? "Updating..." : "Mark Resolved"}
          </button>
        </div>
      </div>
    </div>
  );
}
