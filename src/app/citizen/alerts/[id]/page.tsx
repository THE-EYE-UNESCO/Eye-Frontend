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
  Download,
  RefreshCw,
  Info,
  Home,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CitizenShell } from "../../_components/CitizenShell";
import { api } from "@/lib/api";

type Severity = "Critical" | "High" | "Medium" | "Low";

interface AlertDetail {
  id: string;
  title: string;
  message: string;
  severity: Severity;
  created_at: string;
  updated_at?: string;
  acknowledged: boolean;
  affectedArea?: string;
  safetyInstructions?: string[];
  deliveryChannels?: string[];
  reportedBy?: string;
  category?: string;
  estimatedDuration?: string;
  evacuationRoutes?: string[];
  emergencyContacts?: { name: string; number: string }[];
  affectedCount?: number;
}

// ─── Mock alert detail data ────────────────────────────────────────────────
const MOCK_ALERTS: AlertDetail[] = [
  {
    id: "alert-mock-1",
    title: "Flash Flood Warning — Downtown District",
    message:
      "Flash flood conditions are imminent in the central business district. All residents in low-lying areas must evacuate immediately. Flood levels are expected to reach 1.5 metres in the worst-affected streets.",
    severity: "Critical",
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    acknowledged: false,
    affectedArea: "Downtown District, Riverside Drive, Barangay Maliwalo",
    safetyInstructions: [
      "Evacuate immediately to the nearest elevated ground or designated shelter.",
      "Do NOT attempt to walk or drive through floodwaters — even 15 cm can knock you over.",
      "Disconnect all electrical appliances before leaving your home.",
      "Carry only essential items: identification, medications, phone, charger, and food/water.",
      "Keep tuned to emergency broadcasts — updates will be issued every 30 minutes.",
      "If trapped, move to the highest floor and signal rescuers from a window or rooftop.",
    ],
    deliveryChannels: ["App", "SMS", "IVR"],
    reportedBy: "Automated — Flood Monitoring Sensor Network",
    category: "Flash Flood",
    estimatedDuration: "6-8 hours",
    evacuationRoutes: [
      "Via Maharlika Highway to elevated ground at City Hall",
      "North through Jose Abad Santos Avenue to San Sebastian Heights",
      "Emergency shelter: Tarlac State University Gymnasium"
    ],
    emergencyContacts: [
      { name: "Emergency Hotline", number: "117" },
      { name: "City Disaster Office", number: "(045) 982-1234" },
      { name: "Red Cross Tarlac", number: "(045) 492-0149" }
    ],
    affectedCount: 2500,
  },
  {
    id: "alert-mock-2",
    title: "Earthquake — Magnitude 5.8 Detected",
    message:
      "A magnitude 5.8 earthquake was detected 12 km northeast of the city centre at a depth of 10 km. Aftershocks are expected over the next 48 hours. Inspect structures before re-entry.",
    severity: "High",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    acknowledged: false,
    affectedArea:
      "Northern Barangays, Eastern Hillside Estates, Industrial Zone",
    safetyInstructions: [
      "Stay calm. If indoors, take cover under a sturdy table away from windows.",
      "Do not use elevators — use staircases for evacuation.",
      "Check for gas leaks. If detected, leave immediately and call the gas company.",
      "Inspect your building for structural damage before re-entering after the shaking stops.",
      "Be prepared for aftershocks — these can be as strong as the initial quake.",
    ],
    deliveryChannels: ["App", "SMS", "WhatsApp"],
    reportedBy: "PHIVOLCS — Philippine Institute of Volcanology and Seismology",
    category: "Earthquake",
    estimatedDuration: "48 hours (aftershock period)",
    evacuationRoutes: [
      "Open areas: Tarlac Recreational Park",
      "Emergency assembly: Tarlac Provincial Capitol grounds",
      "Stadium evacuation: Benigno Aquino Memorial Stadium"
    ],
    emergencyContacts: [
      { name: "PHIVOLCS", number: "(02) 426-1468" },
      { name: "Emergency Hotline", number: "117" },
      { name: "City Engineering Office", number: "(045) 982-4321" }
    ],
    affectedCount: 1800,
  },
];

const SEVERITY_CONFIG: Record<
  Severity,
  { badge: string; border: string; banner: string; icon: string }
> = {
  Critical: {
    badge: "bg-red-500 text-white",
    border: "border-l-red-500",
    banner: "bg-gradient-to-br from-red-700 to-red-900",
    icon: "text-red-400",
  },
  High: {
    badge: "bg-orange-500 text-white",
    border: "border-l-orange-500",
    banner: "bg-gradient-to-br from-orange-600 to-orange-900",
    icon: "text-orange-400",
  },
  Medium: {
    badge: "bg-amber-400 text-white",
    border: "border-l-amber-400",
    banner: "bg-gradient-to-br from-amber-600 to-yellow-900",
    icon: "text-amber-400",
  },
  Low: {
    badge: "bg-emerald-500 text-white",
    border: "border-l-emerald-500",
    banner: "bg-gradient-to-br from-emerald-600 to-green-900",
    icon: "text-emerald-400",
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

export default function CitizenAlertDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [alert, setAlert] = useState<AlertDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [acknowledged, setAcknowledged] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const load = async () => {
      // Try mock first
      const mock = MOCK_ALERTS.find((a) => a.id === id);
      if (mock) {
        setAlert(mock);
        setAcknowledged(mock.acknowledged);
        setLoading(false);
        return;
      }
      // Fall back to API
      try {
        const response = await api.get(`/alerts/${id}`);
        const data = response.alert || response; // Handle both response formats
        const item: AlertDetail = {
          id: data.id,
          title: data.title,
          message: data.message,
          severity: mapSeverity(data.severity),
          created_at: data.created_at,
          updated_at: data.updated_at,
          acknowledged: data.acknowledged,
          affectedArea: data.affectedArea || data.affected_area,
          safetyInstructions: data.safetyInstructions || data.safety_instructions || [],
          deliveryChannels: data.deliveryChannels || ["App", "SMS"],
          reportedBy: data.source || data.reportedBy || "The Eye System",
          category: data.category,
          estimatedDuration: data.estimatedDuration,
          evacuationRoutes: data.evacuationRoutes || [],
          emergencyContacts: data.emergencyContacts || [],
          affectedCount: data.affectedCount,
        };
        setAlert(item);
        setAcknowledged(item.acknowledged);
      } catch {
        // not found
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAcknowledge = async () => {
    setAcknowledged(true);
    setLastUpdated(new Date());
    // TODO: Call API to persist acknowledgment
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // TODO: Call API to refresh alert data
  };

  const handleDownloadAlert = () => {
    if (alert) {
      const alertData = {
        title: alert.title,
        message: alert.message,
        severity: alert.severity,
        affectedArea: alert.affectedArea,
        safetyInstructions: alert.safetyInstructions,
        emergencyContacts: alert.emergencyContacts,
        evacuationRoutes: alert.evacuationRoutes,
        lastUpdated: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(alertData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `alert-${alert.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const cfg = alert ? SEVERITY_CONFIG[alert.severity] : SEVERITY_CONFIG.Low;

  return (
    <CitizenShell title="Alert Detail" subtitle="Emergency alert information">
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-tealGlow border-t-transparent" />
        </div>
      ) : !alert ? (
        <div className="glass-panel flex flex-col items-center justify-center py-24 text-center">
          <AlertTriangle className="h-12 w-12 text-tealGlow/30 mb-4" />
          <h3 className="text-lg font-bold text-text-primary">
            Alert not found
          </h3>
          <Link
            href="/citizen/alerts"
            className="mt-4 text-sm text-tealGlow hover:underline"
          >
            ← Back to Alerts
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Back */}
          <div className="flex items-center justify-between">
            <Link
              href="/citizen/alerts"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-tealGlow transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Alerts
            </Link>
            <div className="flex items-center gap-2 text-[11px] text-text-muted">
              <RefreshCw className="h-3 w-3" />
              Last updated: {getTimeAgo(lastUpdated.toISOString())}
            </div>
          </div>

          {/* Hero severity banner */}
          <div className={`rounded-3xl ${cfg.banner} px-7 py-8 shadow-card`}>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${cfg.badge}`}
                  >
                    {alert.severity}
                  </span>
                  {alert.category && (
                    <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">
                      {alert.category}
                    </span>
                  )}
                </div>
                <h1 className="text-xl font-bold text-white leading-snug">
                  {alert.title}
                </h1>
                <p className="text-sm text-white/80 leading-relaxed">
                  {alert.message}
                </p>
              </div>
              <ShieldAlert className="h-10 w-10 text-white/30 flex-shrink-0" />
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(260px,0.85fr)]">
            {/* Left column */}
            <div className="space-y-5">
              {/* Affected area & Stats */}
              {alert.affectedArea && (
                <div className="glass-panel p-5 shadow-card">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className={`h-4 w-4 ${cfg.icon}`} />
                    <p className="text-sm font-semibold text-text-primary">
                      Affected Area
                    </p>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    {alert.affectedArea}
                  </p>
                  {alert.affectedCount && (
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        ~{alert.affectedCount.toLocaleString()} people affected
                      </span>
                      {alert.estimatedDuration && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Duration: {alert.estimatedDuration}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Safety instructions */}
              {alert.safetyInstructions &&
                alert.safetyInstructions.length > 0 && (
                  <div className="glass-panel p-5 shadow-card">
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldAlert className={`h-4 w-4 ${cfg.icon}`} />
                      <p className="text-sm font-semibold text-text-primary">
                        Safety Instructions
                      </p>
                    </div>
                    <ol className="space-y-3">
                      {(alert.safetyInstructions || []).map((instruction, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm text-text-secondary leading-relaxed"
                        >
                          <span
                            className={`flex-shrink-0 w-5 h-5 rounded-full ${cfg.badge} text-[10px] font-bold flex items-center justify-center mt-0.5`}
                          >
                            {i + 1}
                          </span>
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

              {/* Evacuation Routes */}
              {alert.evacuationRoutes && alert.evacuationRoutes.length > 0 && (
                <div className="glass-panel p-5 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Navigation className={`h-4 w-4 ${cfg.icon}`} />
                    <p className="text-sm font-semibold text-text-primary">
                      Evacuation Routes & Shelters
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {(alert.evacuationRoutes || []).map((route, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-text-secondary leading-relaxed"
                      >
                        <span
                          className={`flex-shrink-0 w-5 h-5 rounded-full ${cfg.badge} text-[10px] font-bold flex items-center justify-center mt-0.5`}
                        >
                          {i + 1}
                        </span>
                        {route}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Emergency Contacts */}
              {alert.emergencyContacts && alert.emergencyContacts.length > 0 && (
                <div className="glass-panel p-5 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Phone className={`h-4 w-4 ${cfg.icon}`} />
                    <p className="text-sm font-semibold text-text-primary">
                      Emergency Contacts
                    </p>
                  </div>
                  <div className="space-y-3">
                    {(alert.emergencyContacts || []).map((contact, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl border border-card-border bg-card-bg"
                      >
                        <div>
                          <p className="text-sm font-medium text-text-primary">{contact.name}</p>
                          <p className="text-xs text-text-muted">{contact.number}</p>
                        </div>
                        <button
                          onClick={() => window.open(`tel:${contact.number}`)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-tealGlow/30 bg-tealGlow/10 px-2 py-1 text-[11px] font-semibold text-tealGlow hover:bg-tealGlow/20 transition"
                        >
                          <Phone className="h-3 w-3" />
                          Call
                        </button>
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
                    Timeline
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-text-primary">
                        Alert Issued
                      </p>
                      <p className="text-[11px] text-text-muted">
                        {formatDate(alert.created_at)}
                      </p>
                    </div>
                  </div>
                  {alert.updated_at &&
                    alert.updated_at !== alert.created_at && (
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-amber-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-text-primary">
                            Last Updated
                          </p>
                          <p className="text-[11px] text-text-muted">
                            {formatDate(alert.updated_at)}
                          </p>
                        </div>
                      </div>
                    )}
                  {acknowledged && (
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Acknowledged
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
                {!acknowledged ? (
                  <button
                    onClick={handleAcknowledge}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-tealGlow px-4 py-3 text-sm font-semibold text-night shadow-glow-button hover:opacity-90 transition"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Acknowledge Alert
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-500">
                    <CheckCircle2 className="h-4 w-4" />
                    Alert Acknowledged
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleRefresh}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-3 py-2.5 text-[12px] font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </button>
                  <button
                    onClick={handleDownloadAlert}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-3 py-2.5 text-[12px] font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
                
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({ title: alert.title, text: alert.message })
                        .catch(() => {});
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-4 py-2.5 text-[12px] font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm"
                >
                  <Share2 className="h-4 w-4" />
                  Share This Alert
                </button>
              </div>

              {/* Delivery channels */}
              {alert.deliveryChannels && alert.deliveryChannels.length > 0 && (
                <div className="glass-panel p-5 shadow-card">
                  <p className="text-sm font-semibold text-text-primary mb-3">
                    Delivery Channels
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(alert.deliveryChannels || []).map((ch) => (
                      <span
                        key={ch}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-card-border bg-card-bg px-3 py-1.5 text-[11px] font-medium text-text-secondary"
                      >
                        {CHANNEL_ICONS[ch] || <Bell className="h-3.5 w-3.5" />}
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Source */}
              <div className="glass-panel p-5 shadow-card space-y-2">
                <p className="text-sm font-semibold text-text-primary">
                  Source
                </p>
                <p className="text-xs text-text-secondary">
                  {alert.reportedBy || "The Eye System"}
                </p>
                <p className="text-[11px] text-text-muted">
                  Issued {getTimeAgo(alert.created_at)}
                </p>
              </div>

              {/* Share */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator
                      .share({ title: alert.title, text: alert.message })
                      .catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-4 py-2.5 text-[12px] font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm"
              >
                <Share2 className="h-4 w-4" />
                Share This Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </CitizenShell>
  );
}
