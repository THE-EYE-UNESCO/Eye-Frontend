"use client";

import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CitizenShell } from "../_components/CitizenShell";

// React-Leaflet's types can lag behind React/Next versions; keep runtime behavior while avoiding TS noise.
const RLMapContainer = MapContainer as unknown as React.ComponentType<any>;
const RLTileLayer = TileLayer as unknown as React.ComponentType<any>;
const RLCircleMarker = CircleMarker as unknown as React.ComponentType<any>;
const RLTooltip = Tooltip as unknown as React.ComponentType<any>;

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

export default function CrisisMapPage() {
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
    <CitizenShell
      title="Live Crisis Map"
      subtitle="Real-time visualization of emergencies in your area"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Search + filter bar */}
          <div className="glass-panel p-4 shadow-card">
            <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Search className="h-4 w-4 text-slateSoft" />
                <input
                  className="w-full bg-transparent text-sm text-white placeholder:text-slateSoft focus:outline-none"
                  placeholder="Search incidents or locations..."
                />
              </div>
              <button className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10 transition">
                <span>All Types</span>
                <span className="text-slateSoft">▾</span>
              </button>
            </div>
          </div>

          {/* Map card */}
          <div className="glass-panel p-4 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Interactive Map</p>
              <div className="flex items-center gap-2 text-xs text-slateSoft">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span>Live Updates</span>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-night">
              <div className="relative h-[360px] w-full">
                <RLMapContainer
                  center={[-1.95, 30.06] as [number, number]}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                >
                  <RLTileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {incidents.map((incident) => {
                    const isSelected = selectedIncidentId === incident.id;
                    return (
                      <RLCircleMarker
                        key={incident.id}
                        center={incident.coords as [number, number]}
                        radius={isSelected ? 11 : 9}
                        pathOptions={{
                          color: isSelected ? "#0f172a" : incident.color,
                          weight: isSelected ? 3 : 1,
                          fillColor: incident.color,
                          fillOpacity: 0.9,
                        }}
                        eventHandlers={{
                          click: () => setSelectedIncidentId(incident.id),
                        }}
                      >
                        <RLTooltip direction="top" offset={[0, -8]} opacity={0.9}>
                          <span className="font-semibold">{incident.title}</span>
                          <br />
                          <span className="text-[11px] text-slate-600">{incident.category}</span>
                        </RLTooltip>
                      </RLCircleMarker>
                    );
                  })}
                </RLMapContainer>

                <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] text-slate-600 shadow-sm">
                  Your location • Current location
                </div>
              </div>
            </div>

            {/* legend */}
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-slateSoft">
              {legend.map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${l.color}`} />
                  <span>{l.label}</span>
                </div>
              ))}
            </div>

            {/* tip */}
            <div className="mt-4 rounded-2xl bg-white/5 border border-white/5 px-4 py-3 text-[11px] text-slateSoft">
              <span className="font-semibold text-tealGlow">Tip:</span> Click on any incident marker to view detailed information
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="glass-panel px-5 py-5 shadow-card">
            <p className="text-sm font-semibold text-white">
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
                  <p className="text-sm font-semibold text-white">{selectedIncident.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slateSoft">
                    {selectedIncident.description}
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slateSoft">Location</p>
                    <div className="mt-2 rounded-2xl bg-white/5 border border-white/5 px-4 py-3 text-[11px] text-white">
                      {selectedIncident.locationLabel}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/5 border border-white/5 px-4 py-3">
                      <p className="text-[10px] uppercase tracking-wide text-slateSoft">
                        Affected Radius
                      </p>
                      <p className="mt-1 text-[11px] text-white">
                        {selectedIncident.affectedRadiusKm} km
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/5 border border-white/5 px-4 py-3">
                      <p className="text-[10px] uppercase tracking-wide text-slateSoft">Status</p>
                      <p className="mt-1 text-[11px] text-white">{selectedIncident.status}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full rounded-2xl bg-tealGlow px-4 py-3 text-xs font-semibold text-night shadow-glow hover:shadow-lg transition">
                    Get Safety Instructions
                  </button>
                  <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-white hover:bg-white/10 transition">
                    Share This Alert
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-xs text-slateSoft">
                Click on any marker on the map to view incident details.
              </p>
            )}
          </div>

          <div className="glass-panel px-5 py-5 shadow-card">
            <p className="text-sm font-semibold text-white">Map Statistics</p>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/5 px-4 py-3 text-white">
                <span>Total Incidents</span>
                <span className="font-semibold">6</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-red-500 px-4 py-3 text-white">
                <span>Critical</span>
                <span className="font-semibold">2</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-amber-400 px-4 py-3 text-white">
                <span>Medium</span>
                <span className="font-semibold">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CitizenShell>
  );
}

