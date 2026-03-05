"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  AlertTriangle,
  Bell,
  Clock,
  Share2,
  CheckCircle2,
  MapPin,
  ShieldAlert,
  Smartphone,
  MessageSquare,
  Phone,
  Radio,
  Navigation,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ResponderShell } from "../../_components/ResponderShell";
import { api } from "@/lib/api";

type Severity = "Critical" | "High" | "Medium" | "Low";
type IncidentStatus = "PENDING" | "ON_THE_WAY" | "ON_SITE" | "RESOLVED";

interface MissionDetail {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: IncidentStatus;
  created_at: string;
  updated_at?: string;
  location?: string;
  coordinates?: string;
  affectedCount?: number;
  assignedResponders?: string[];
  deliveryChannels?: string[];
  incidentType?: string;
  reportedBy?: string;
}

// ─── Mock mission data ──────────────────────────────────────────────────────
const MOCK_MISSIONS: MissionDetail[] = [
  {
    id: "mission-mock-1",
    title: "Structural Collapse — Barangay 14 Market Area",
    description:
      "A three-storey commercial building has partially collapsed following the M5.8 earthquake. Trapped survivors have been detected by acoustic sensors. Heavy rescue equipment and medical teams are needed on-site immediately.",
    severity: "Critical",
    status: "ON_THE_WAY",
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    location: "Barangay 14 Market, Narra Street corner Mahogany Ave",
    coordinates: "14.5995° N, 120.9842° E",
    affectedCount: 12,
    assignedResponders: ["Unit BFP-7", "Unit MDRRMO-3", "Medic Team Alpha"],
    deliveryChannels: ["App", "Radio", "SMS"],
    incidentType: "Structural Collapse",
    reportedBy: "Barangay Captain Juan Reyes via 117 hotline",
  },
  {
    id: "mission-mock-2",
    title: "Mass Casualty — Flood Rescue Zone C",
    description:
      "Multiple casualties reported in the flood surge zone. Water rescue teams report up to 8 individuals stranded on rooftops with no food or water for over 24 hours. At least two individuals require immediate medical attention.",
    severity: "High",
    status: "PENDING",
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    location: "Zone C — Riverside Drive, between Km 5 and Km 7",
    coordinates: "14.6018° N, 120.9799° E",
    affectedCount: 8,
    assignedResponders: ["Water Rescue Unit WR-2"],
    deliveryChannels: ["App", "Radio"],
    incidentType: "Flood / Water Rescue",
    reportedBy: "Aerial drone footage — confirmed by NDRRMC",
  },
];

const SEVERITY_CONFIG: Record<
  Severity,
  { badge: string; border: string; banner: string }
> = {
  Critical: {
    badge: "bg-red-500 text-white",
    border: "border-l-red-500",
    banner: "from-red-700 to-red-900",
  },
  High: {
    badge: "bg-orange-500 text-white",
    border: "border-l-orange-500",
    banner: "from-orange-600 to-orange-900",
  },
  Medium: {
    badge: "bg-amber-400 text-white",
    border: "border-l-amber-400",
    banner: "from-amber-600 to-yellow-900",
  },
  Low: {
    badge: "bg-emerald-500 text-white",
    border: "border-l-emerald-500",
    banner: "from-emerald-600 to-green-900",
  },
};

const STATUS_CONFIG: Record<IncidentStatus, { label: string; color: string }> =
  {
    PENDING: {
      label: "Pending Dispatch",
      color: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    },
    ON_THE_WAY: {
      label: "En Route",
      color: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    },
    ON_SITE: {
      label: "On Site",
      color: "text-tealGlow border-tealGlow/30 bg-tealGlow/10",
    },
    RESOLVED: {
      label: "Resolved",
      color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    },
  };

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  App: <Bell className="h-3.5 w-3.5" />,
  SMS: <MessageSquare className="h-3.5 w-3.5" />,
  WhatsApp: <Smartphone className="h-3.5 w-3.5" />,
  IVR: <Phone className="h-3.5 w-3.5" />,
  Radio: <Radio className="h-3.5 w-3.5" />,
};

function mapSeverity(raw: string): Severity {
  const u = raw?.toUpperCase() || "";
  if (u === "CRITICAL") return "Critical";
  if (u === "HIGH") return "High";
  if (u === "MEDIUM") return "Medium";
  return "Low";
}

function mapStatus(raw: string): IncidentStatus {
  const map: Record<string, IncidentStatus> = {
    PENDING: "PENDING",
    ON_THE_WAY: "ON_THE_WAY",
    ON_SITE: "ON_SITE",
    RESOLVED: "RESOLVED",
  };
  return map[raw?.toUpperCase()] || "PENDING";
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-PH", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getTimeAgo(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now.getTime() - then.getTime()) / 60000);
  if (diff < 60) return `${diff}m ago`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function ResponderAlertDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [mission, setMission] = useState<MissionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<IncidentStatus>("PENDING");

  useEffect(() => {
    const load = async () => {
      // Try mock first
      const mock = MOCK_MISSIONS.find((m) => m.id === id);
      if (mock) {
        setMission(mock);
        setStatus(mock.status);
        setLoading(false);
        return;
      }
      // Fall back to API
      try {
        const response = await api.get(`/responder/incidents/${id}`);
        const data = response.incident || response.report || response; // Handle different response formats
        const r = data.report || data;
        const item: MissionDetail = {
          id: data.id,
          title: r.title || "Incident",
          description: r.description || "",
          severity: mapSeverity(r.severity),
          status: mapStatus(data.status),
          created_at: r.created_at || data.created_at,
          updated_at: data.updated_at,
          location: r.location || r.address,
          affectedCount: r.affected_count,
          assignedResponders: data.assignedResponders || [],
          deliveryChannels: ["App", "Radio"],
          incidentType: r.incident_type,
          reportedBy: r.reported_by,
        };
        setMission(item);
        setStatus(item.status);
      } catch {
        // not found
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleConfirmResponse = async () => {
    if (!mission) return;
    const next: IncidentStatus =
      status === "PENDING"
        ? "ON_THE_WAY"
        : status === "ON_THE_WAY"
          ? "ON_SITE"
          : "RESOLVED";
    setStatus(next);
    try {
      await api.patch(`/responder/incidents/${mission.id}/status`, {
        status: next,
      });
    } catch {
      // revert
      setStatus(status);
    }
  };

  const cfg = mission ? SEVERITY_CONFIG[mission.severity] : SEVERITY_CONFIG.Low;
  const statusCfg = STATUS_CONFIG[status];

  return (
    <ResponderShell
      title="Mission Detail"
      subtitle="Operational incident information"
    >
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-tealGlow border-t-transparent" />
        </div>
      ) : !mission ? (
        <div className="glass-panel flex flex-col items-center justify-center py-24 text-center">
          <AlertTriangle className="h-12 w-12 text-tealGlow/30 mb-4" />
          <h3 className="text-lg font-bold text-text-primary">
            Mission not found
          </h3>
          <Link
            href="/responder/alerts"
            className="mt-4 text-sm text-tealGlow hover:underline"
          >
            ← Back to Alerts
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Back */}
          <Link
            href="/responder/alerts"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-tealGlow transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Deployment Alerts
          </Link>

          {/* Hero banner */}
          <div
            className={`rounded-3xl bg-gradient-to-br ${cfg.banner} px-7 py-8 shadow-card`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${cfg.badge}`}
                  >
                    {mission.severity}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${statusCfg.color}`}
                  >
                    {statusCfg.label}
                  </span>
                  {mission.incidentType && (
                    <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">
                      {mission.incidentType}
                    </span>
                  )}
                </div>
                <h1 className="text-xl font-bold text-white leading-snug">
                  {mission.title}
                </h1>
                <p className="text-sm text-white/80 leading-relaxed">
                  {mission.description}
                </p>
              </div>
              <ShieldAlert className="h-10 w-10 text-white/30 flex-shrink-0" />
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(260px,0.85fr)]">
            {/* Left */}
            <div className="space-y-5">
              {/* Location */}
              {(mission.location || mission.coordinates) && (
                <div className="glass-panel p-5 shadow-card">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-tealGlow" />
                    <p className="text-sm font-semibold text-text-primary">
                      Incident Location
                    </p>
                  </div>
                  {mission.location && (
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {mission.location}
                    </p>
                  )}
                  {mission.coordinates && (
                    <p className="mt-1 text-[11px] text-text-muted font-mono">
                      {mission.coordinates}
                    </p>
                  )}
                  <button className="mt-3 inline-flex items-center gap-2 rounded-xl border border-card-border bg-card-bg px-3 py-1.5 text-[11px] font-semibold text-text-secondary hover:text-tealGlow hover:border-tealGlow/30 transition">
                    <Navigation className="h-3.5 w-3.5" />
                    Open in Maps
                  </button>
                </div>
              )}

              {/* Affected count */}
              {mission.affectedCount != null && (
                <div className="glass-panel p-5 shadow-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-tealGlow" />
                    <p className="text-sm font-semibold text-text-primary">
                      Persons Affected
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-text-primary">
                    {mission.affectedCount}
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    Confirmed / estimated affected individuals
                  </p>
                </div>
              )}

              {/* Assigned responders */}
              {mission.assignedResponders &&
                mission.assignedResponders.length > 0 && (
                  <div className="glass-panel p-5 shadow-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-4 w-4 text-tealGlow" />
                      <p className="text-sm font-semibold text-text-primary">
                        Assigned Units
                      </p>
                    </div>
                    <div className="space-y-2">
                      {(mission.assignedResponders || []).map((r, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 rounded-2xl border border-card-border bg-card-bg px-4 py-2.5 text-xs text-text-secondary"
                        >
                          <div className="h-2 w-2 rounded-full bg-tealGlow" />
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Timeline */}
              <div className="glass-panel p-5 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-tealGlow" />
                  <p className="text-sm font-semibold text-text-primary">
                    Incident Timeline
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-text-primary">
                        Incident Reported
                      </p>
                      <p className="text-[11px] text-text-muted">
                        {formatDate(mission.created_at)}
                      </p>
                    </div>
                  </div>
                  {mission.updated_at &&
                    mission.updated_at !== mission.created_at && (
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-amber-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-text-primary">
                            Last Updated
                          </p>
                          <p className="text-[11px] text-text-muted">
                            {formatDate(mission.updated_at)}
                          </p>
                        </div>
                      </div>
                    )}
                  {status !== "PENDING" && (
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-tealGlow flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-text-primary">
                          {statusCfg.label}
                        </p>
                        <p className="text-[11px] text-text-muted">
                          Status updated
                        </p>
                      </div>
                    </div>
                  )}
                  {status === "RESOLVED" && (
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Mission Resolved
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-5">
              {/* Action buttons */}
              <div className="space-y-3">
                {status !== "RESOLVED" ? (
                  <button
                    onClick={handleConfirmResponse}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-tealGlow px-4 py-3 text-sm font-semibold text-night shadow-glow-button hover:opacity-90 transition"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {status === "PENDING"
                      ? "Confirm Response (En Route)"
                      : status === "ON_THE_WAY"
                        ? "Mark On Site"
                        : "Mark Resolved"}
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Mission Resolved
                  </div>
                )}
                <button
                  onClick={() => {
                    if (navigator.share && mission) {
                      navigator
                        .share({
                          title: mission.title,
                          text: mission.description,
                        })
                        .catch(() => {});
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-4 py-2.5 text-[12px] font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm"
                >
                  <Share2 className="h-4 w-4" />
                  Broadcast Mission
                </button>
              </div>

              {/* Current status */}
              <div className="glass-panel p-5 shadow-card">
                <p className="text-sm font-semibold text-text-primary mb-2">
                  Current Status
                </p>
                <span
                  className={`inline-flex items-center rounded-xl border px-3 py-1.5 text-xs font-semibold ${statusCfg.color}`}
                >
                  {statusCfg.label}
                </span>
              </div>

              {/* Delivery channels */}
              {mission.deliveryChannels &&
                mission.deliveryChannels.length > 0 && (
                  <div className="glass-panel p-5 shadow-card">
                    <p className="text-sm font-semibold text-text-primary mb-3">
                      Notification Channels
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(mission.deliveryChannels || []).map((ch) => (
                        <span
                          key={ch}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-card-border bg-card-bg px-3 py-1.5 text-[11px] font-medium text-text-secondary"
                        >
                          {CHANNEL_ICONS[ch] || (
                            <Bell className="h-3.5 w-3.5" />
                          )}
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Source */}
              <div className="glass-panel p-5 shadow-card space-y-2">
                <p className="text-sm font-semibold text-text-primary">
                  Reported By
                </p>
                <p className="text-xs text-text-secondary">
                  {mission.reportedBy || "The Eye System"}
                </p>
                <p className="text-[11px] text-text-muted">
                  Logged {getTimeAgo(mission.created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </ResponderShell>
  );
}
