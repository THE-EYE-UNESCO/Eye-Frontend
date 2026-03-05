"use client";

import { Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { CitizenShell } from "../_components/CitizenShell";
import { api } from "@/lib/api";

const ClientSideMap = dynamic(() => import("@/components/ClientSideMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[360px] w-full items-center justify-center bg-card-bg">
      <p className="text-sm text-text-muted">Loading Map...</p>
    </div>
  ),
});

const legend = [
  { label: "Wildfire", color: "bg-orange-500", dot: "#f97316" },
  { label: "Flood", color: "bg-blue-500", dot: "#3b82f6" },
  { label: "Landslide", color: "bg-red-500", dot: "#ef4444" },
  { label: "Earthquake", color: "bg-purple-500", dot: "#a855f7" },
  { label: "Pandemic", color: "bg-cyan-400", dot: "#22d3ee" },
  { label: "Infrastructure", color: "bg-amber-700", dot: "#b45309" },
];

function getCategoryColor(category: string): string {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("wildfire") || cat.includes("fire")) return "#f97316";
  if (cat.includes("flood")) return "#3b82f6";
  if (cat.includes("landslide")) return "#ef4444";
  if (cat.includes("earthquake")) return "#a855f7";
  if (cat.includes("pandemic") || cat.includes("disease")) return "#22d3ee";
  return "#b45309";
}

type Incident = {
  id: string;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  category: string;
  locationLabel: string;
  affectedRadiusKm: number;
  status: "Active" | "Resolved";
  coords: [number, number];
  color: string;
};

function mapSeverity(raw: string): Incident["severity"] {
  const u = raw?.toUpperCase() || "";
  if (u === "CRITICAL") return "Critical";
  if (u === "HIGH") return "High";
  if (u === "MEDIUM") return "Medium";
  return "Low";
}

export default function CrisisMapPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(
    null,
  );
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationLabel, setLocationLabel] = useState("Detecting location...");

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setLocationLabel("Your location • Current location");
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationLabel("Location unavailable");
        }
      );
    } else {
      setLocationLabel("Geolocation not supported");
    }
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await api.get("/reports");
        const reports: any[] = data.reports || [];
        const mapped: Incident[] = reports
          .filter((r: any) => r.latitude != null && r.longitude != null)
          .map((r: any) => ({
            id: r.id,
            title: r.title,
            description: r.description,
            severity: mapSeverity(r.severity),
            category: r.category || "General",
            locationLabel: r.address || r.landmark || "Unknown location",
            affectedRadiusKm: 1.0,
            status: r.status === "RESOLVED" ? "Resolved" : "Active",
            coords: [parseFloat(r.latitude), parseFloat(r.longitude)] as [
              number,
              number,
            ],
            color: getCategoryColor(r.category || ""),
          }));
        setIncidents(mapped);
      } catch (error) {
        console.error("Error fetching reports for map:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const selectedIncident = useMemo(
    () => incidents.find((i) => i.id === selectedIncidentId) ?? null,
    [selectedIncidentId, incidents],
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

  // Default map center — use user location if available, otherwise Kigali, Rwanda
  const mapCenter: [number, number] = userLocation || 
    (incidents.length > 0 ? incidents[0].coords : [-1.95, 30.06]);

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
              <p className="text-sm font-semibold text-text-primary">
                Interactive Map
              </p>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-glow-red" />
                <span>Live Updates</span>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-card-border bg-card-bg shadow-inner">
              <div className="relative h-[360px] w-full">
                {loading ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-tealGlow border-t-transparent" />
                  </div>
                ) : (
                  <ClientSideMap
                    center={mapCenter}
                    zoom={13}
                    incidents={incidents}
                    selectedIncidentId={selectedIncidentId}
                    onIncidentClick={setSelectedIncidentId}
                    locationLabel={locationLabel}
                    userLocation={userLocation}
                  />
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-text-muted">
              {legend.map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full shadow-sm ${l.color}`}
                  />
                  <span className="capitalize">{l.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-card-bg border border-card-border px-4 py-3 text-[11px] text-text-muted shadow-sm">
              <span className="font-semibold text-tealGlow">Tip:</span> Click on
              any incident marker to view detailed information
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
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold ${severityChipClass(selectedIncident.severity)}`}
                  >
                    {selectedIncident.severity.toUpperCase()}
                  </span>
                  <span className="rounded-full bg-tealGlow/20 px-3 py-1 text-[10px] font-semibold text-tealGlow">
                    {selectedIncident.category.toUpperCase()}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {selectedIncident.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {selectedIncident.description}
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-text-muted font-bold">
                      Location
                    </p>
                    <div className="mt-2 rounded-2xl bg-card-bg border border-card-border px-4 py-3 text-[11px] text-text-primary shadow-sm">
                      {selectedIncident.locationLabel}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-card-bg border border-card-border px-4 py-3 shadow-sm">
                      <p className="text-[10px] uppercase tracking-wide text-text-muted font-bold">
                        Status
                      </p>
                      <p className="mt-1 text-[11px] text-text-primary">
                        {selectedIncident.status}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-card-bg border border-card-border px-4 py-3 shadow-sm">
                      <p className="text-[10px] uppercase tracking-wide text-text-muted font-bold">
                        Severity
                      </p>
                      <p className="mt-1 text-[11px] text-text-primary">
                        {selectedIncident.severity}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full rounded-2xl bg-tealGlow px-4 py-3 text-xs font-semibold text-night shadow-glow-button hover:opacity-90 transition">
                    Get Safety Instructions
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator
                          .share({
                            title: selectedIncident.title,
                            text: selectedIncident.description,
                          })
                          .catch(() => {});
                      } else {
                        navigator.clipboard.writeText(selectedIncident.title);
                      }
                    }}
                    className="w-full rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-xs font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm"
                  >
                    Share This Alert
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-xs text-text-muted">
                Click on any marker on the map to view incident details.
              </p>
            )}
          </div>

          <div className="glass-panel px-5 py-5 shadow-card">
            <p className="text-sm font-semibold text-text-primary">
              Map Statistics
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-text-primary shadow-sm">
                <span>Total Incidents</span>
                <span className="font-bold">{incidents.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-red-500 px-4 py-3 text-white shadow-glow-red">
                <span className="font-medium">Critical</span>
                <span className="font-bold">
                  {incidents.filter((i) => i.severity === "Critical").length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-amber-400 px-4 py-3 text-white shadow-sm">
                <span className="font-medium">Medium</span>
                <span className="font-bold">
                  {incidents.filter((i) => i.severity === "Medium").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CitizenShell>
  );
}
