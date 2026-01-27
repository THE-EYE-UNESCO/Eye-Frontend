"use client";

import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ResponderShell } from "../_components/ResponderShell";

const ClientSideMap = dynamic(() => import("@/components/ClientSideMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] w-full items-center justify-center bg-card-bg">
      <p className="text-sm text-text-muted">Loading Map...</p>
    </div>
  ),
});

const legend = [
  { label: "Landslide", color: "bg-red-500", dot: "#ef4444" },
  { label: "Flood", color: "bg-blue-500", dot: "#3b82f6" },
  { label: "Wildfire", color: "bg-orange-500", dot: "#f97316" },
  { label: "Earthquake", color: "bg-purple-500", dot: "#a855f7" },
  { label: "pandemic", color: "bg-cyan-400", dot: "#22d3ee" },
  { label: "Infrastructure", color: "bg-amber-700", dot: "#b45309" },
];

type Incident = {
  id: string;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  category: (typeof legend)[number]["label"];
  locationLabel: string;
  affectedRadiusKm: number;
  status: "Active" | "Resolved";
  coords: [number, number];
  color: string;
};

const incidents: Incident[] = [
  {
    id: "pandemic-1",
    title: "Disease cluster detected – North Sector",
    description:
      "AI analysis detected unusual pattern of respiratory illness reports. Vaccination gap identified.",
    severity: "Medium",
    category: "pandemic",
    locationLabel: "North Sector, Districts 8-12",
    affectedRadiusKm: 3.6,
    status: "Active",
    coords: [-1.955, 30.065],
    color: "#22d3ee",
  },
  {
    id: "landslide-1",
    title: "Slope failure reported – Hill District",
    description:
      "Multiple reports of ground movement and blocked roadways. Avoid Route 12 and follow evacuation guidance.",
    severity: "Critical",
    category: "Landslide",
    locationLabel: "Hill District, Sector 3",
    affectedRadiusKm: 2.5,
    status: "Active",
    coords: [-1.941, 30.059],
    color: "#ef4444",
  },
  {
    id: "flood-1",
    title: "Rising water levels – Riverbank Zone",
    description:
      "Water levels increasing rapidly after heavy rainfall. Low-lying homes at risk of flooding.",
    severity: "High",
    category: "Flood",
    locationLabel: "Riverbank Zone, Block A",
    affectedRadiusKm: 1.8,
    status: "Active",
    coords: [-1.94, 30.07],
    color: "#3b82f6",
  },
  {
    id: "wildfire-1",
    title: "Brush fire detected – East Park",
    description:
      "Thermal anomaly detected. Smoke reported by nearby residents. Keep distance and report spread.",
    severity: "Medium",
    category: "Wildfire",
    locationLabel: "East Park, Ridge Line",
    affectedRadiusKm: 4.2,
    status: "Active",
    coords: [-1.95, 30.05],
    color: "#f97316",
  },
  {
    id: "quake-1",
    title: "Minor seismic activity – Central Ward",
    description:
      "Sensors recorded light tremors. Inspect structures and follow official updates if aftershocks occur.",
    severity: "Low",
    category: "Earthquake",
    locationLabel: "Central Ward",
    affectedRadiusKm: 6.0,
    status: "Active",
    coords: [-1.96, 30.08],
    color: "#a855f7",
  },
  {
    id: "infra-1",
    title: "Bridge damage reported – South Crossing",
    description:
      "Structural damage suspected. Avoid heavy vehicles and use alternate crossings until inspected.",
    severity: "Medium",
    category: "Infrastructure",
    locationLabel: "South Crossing, Route 4",
    affectedRadiusKm: 1.2,
    status: "Active",
    coords: [-1.948, 30.048],
    color: "#b45309",
  },
];

export default function ResponderCrisisMapPage() {
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const selectedIncident = useMemo(
    () => incidents.find((i) => i.id === selectedIncidentId) ?? null,
    [selectedIncidentId]
  );

  const severityChipClass = (severity: Incident["severity"]) => {
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
  };

  const categoryChipClass = (category: Incident["category"]) => {
    const match = legend.find((l) => l.label === category);
    return match?.color ?? "bg-slate-200 text-slate-700";
  };

  return (
    <ResponderShell
      title="Live Crisis Map"
      subtitle="Real-time visualization of emergencies in your area"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Search + filter bar */}
          <div className="glass-panel p-4 shadow-card">
            <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
              <div className="flex items-center gap-2 rounded-2xl border border-card-border bg-card-bg px-4 py-3 shadow-sm transition">
                <Search className="h-4 w-4 text-tealGlow" />
                <input
                  className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                  placeholder="Search incidents or locations..."
                />
              </div>
              <button className="flex items-center justify-between rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-sm text-text-primary hover:bg-card-border/10 transition shadow-sm">
                <span>All Types</span>
                <span className="text-text-muted text-[10px]">▼</span>
              </button>
            </div>
          </div>

          {/* Map card */}
          <div className="glass-panel p-4 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text-primary">Interactive Map</p>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-glow-red" />
                <span>Live Updates</span>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-card-border bg-card-bg shadow-inner">
              <div className="relative h-[480px] w-full">
                <ClientSideMap
                  center={[-1.95, 30.06]}
                  zoom={13}
                  incidents={incidents}
                  selectedIncidentId={selectedIncidentId}
                  onIncidentClick={setSelectedIncidentId}
                  locationLabel="Responder Unit Alpha • Active Tracking"
                />
              </div>
            </div>

            {/* legend */}
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-text-muted">
              {legend.map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full shadow-sm ${l.color}`} />
                  <span className="capitalize">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="glass-panel px-5 py-5 shadow-card transition-all">
            <p className="text-sm font-semibold text-text-primary">
              {selectedIncident ? "Incident Details" : "No Incident Selected"}
            </p>

            {selectedIncident ? (
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold ${severityChipClass(
                      selectedIncident.severity
                    )}`}
                  >
                    {selectedIncident.severity.toUpperCase()}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold text-white ${categoryChipClass(
                      selectedIncident.category
                    )}`}
                  >
                    {selectedIncident.category.toUpperCase()}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-text-primary">{selectedIncident.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {selectedIncident.description}
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-text-muted font-bold">Location</p>
                    <div className="mt-2 rounded-2xl bg-card-bg border border-card-border px-4 py-3 text-[11px] text-text-primary shadow-sm">
                      {selectedIncident.locationLabel}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-card-bg border border-card-border px-4 py-3 shadow-sm">
                      <p className="text-[10px] uppercase tracking-wide text-text-muted font-bold">
                        Affected Radius
                      </p>
                      <p className="mt-1 text-[11px] text-text-primary">
                        {selectedIncident.affectedRadiusKm} km
                      </p>
                    </div>
                    <div className="rounded-2xl bg-card-bg border border-card-border px-4 py-3 shadow-sm">
                      <p className="text-[10px] uppercase tracking-wide text-text-muted font-bold">Status</p>
                      <p className="mt-1 text-[11px] text-text-primary">{selectedIncident.status}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full rounded-2xl bg-tealGlow px-4 py-3 text-xs font-semibold text-night shadow-glow-button hover:opacity-90 transition">
                    Dispatch Unit
                  </button>
                  <button className="w-full rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-xs font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm">
                    View Impact Report
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-xs text-text-muted">
                Click on any marker on the map to view detailed deployment data.
              </p>
            )}
          </div>

          <div className="glass-panel px-5 py-5 shadow-card">
            <p className="text-sm font-semibold text-text-primary">Response Statistics</p>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-text-primary shadow-sm">
                <span>Active Units</span>
                <span className="font-bold">14</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-red-500 px-4 py-3 text-white shadow-glow-red">
                <span className="font-medium">Critical Ops</span>
                <span className="font-bold">3</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-indigo-500 px-4 py-3 text-white shadow-sm">
                <span className="font-medium">Standby</span>
                <span className="font-bold">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponderShell>
  );
}
