"use client";

import { Search } from "lucide-react";
import React, { useMemo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ResponderShell } from "../_components/ResponderShell";
import { api } from "@/lib/api";

const ClientSideMap = dynamic(() => import("@/components/ClientSideMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] w-full items-center justify-center bg-card-bg">
      <p className="text-sm text-text-muted">Loading Map...</p>
    </div>
  ),
});

type Incident = {
  id: string;
  title: string;
  description: string;
  severity: string;
  category: string;
  locationLabel: string;
  affectedRadiusKm: number;
  status: string;
  coords: [number, number];
  color: string;
};

const legend = [
  { label: "Landslide", color: "bg-red-500", dot: "#ef4444" },
  { label: "Flood", color: "bg-blue-500", dot: "#3b82f6" },
  { label: "Wildfire", color: "bg-orange-500", dot: "#f97316" },
  { label: "Earthquake", color: "bg-purple-500", dot: "#a855f7" },
  { label: "Pandemic", color: "bg-cyan-400", dot: "#22d3ee" },
  { label: "Infrastructure", color: "bg-amber-700", dot: "#b45309" },
];

export default function ResponderCrisisMapPage() {
  const [rawIncidents, setRawIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(
    null,
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const data = await api.get("/responder/incidents");
        setRawIncidents(data.incidents || []);
      } catch (error) {
        console.error("Failed to fetch incidents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  const mappedIncidents = useMemo(() => {
    return rawIncidents
      .filter((inc: any) => {
        const r = inc.report || {};
        return r.latitude != null && r.longitude != null;
      })
      .map((inc: any) => {
        const r = inc.report || {};
        const cat = r.category || "general";
        return {
          id: inc.id,
          incidentStatus: inc.status,
          title: r.title || "Incident",
          description: r.description || "",
          severity:
            (r.severity || "low").charAt(0).toUpperCase() +
            (r.severity || "low").slice(1).toLowerCase(),
          category: cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase(),
          locationLabel: r.landmark || r.address || "Unknown",
          affectedRadiusKm: 2.0,
          status: inc.status === "RESOLVED" ? "Resolved" : "Active",
          coords: [parseFloat(r.latitude), parseFloat(r.longitude)] as [
            number,
            number,
          ],
          color:
            legend.find((l) => l.label.toLowerCase() === cat.toLowerCase())
              ?.dot || "#94a3b8",
        };
      });
  }, [rawIncidents]);

  const selectedIncident = useMemo(
    () => mappedIncidents.find((i) => i.id === selectedIncidentId) ?? null,
    [mappedIncidents, selectedIncidentId],
  );

  const severityChipClass = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-amber-400 text-white";
      case "Low":
        return "bg-emerald-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const categoryChipClass = (category: string) => {
    const match = legend.find(
      (l) => l.label.toLowerCase() === category.toLowerCase(),
    );
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
              <p className="text-sm font-semibold text-text-primary">
                Interactive Map
              </p>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-glow-red" />
                <span>Live Updates</span>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-card-border bg-card-bg shadow-inner">
              <div className="relative h-[480px] w-full">
                {loading ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-tealGlow border-t-transparent" />
                  </div>
                ) : (
                  <ClientSideMap
                    center={
                      mappedIncidents.length > 0
                        ? mappedIncidents[0].coords
                        : [-1.95, 30.06]
                    }
                    zoom={13}
                    incidents={mappedIncidents}
                    selectedIncidentId={selectedIncidentId}
                    onIncidentClick={setSelectedIncidentId}
                    locationLabel="Responder Unit Alpha • Active Tracking"
                  />
                )}
              </div>
            </div>

            {/* legend */}
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
                      selectedIncident.severity,
                    )}`}
                  >
                    {selectedIncident.severity.toUpperCase()}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold text-white ${categoryChipClass(
                      selectedIncident.category,
                    )}`}
                  >
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
                        Affected Radius
                      </p>
                      <p className="mt-1 text-[11px] text-text-primary">
                        {selectedIncident.affectedRadiusKm} km
                      </p>
                    </div>
                    <div className="rounded-2xl bg-card-bg border border-card-border px-4 py-3 shadow-sm">
                      <p className="text-[10px] uppercase tracking-wide text-text-muted font-bold">
                        Status
                      </p>
                      <p className="mt-1 text-[11px] text-text-primary">
                        {selectedIncident.status}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    disabled={
                      updatingId === selectedIncident.id ||
                      selectedIncident.status === "Resolved"
                    }
                    onClick={async () => {
                      setUpdatingId(selectedIncident.id);
                      try {
                        await api.patch(
                          `/responder/incidents/${selectedIncident.id}/status`,
                          { status: "ON_THE_WAY" },
                        );
                        setRawIncidents((prev) =>
                          prev.map((i) =>
                            i.id === selectedIncident.id
                              ? { ...i, status: "ON_THE_WAY" }
                              : i,
                          ),
                        );
                      } catch (e) {
                        console.error(e);
                      } finally {
                        setUpdatingId(null);
                      }
                    }}
                    className="w-full rounded-2xl bg-tealGlow px-4 py-3 text-xs font-semibold text-night shadow-glow-button hover:opacity-90 transition disabled:opacity-50"
                  >
                    {updatingId === selectedIncident.id
                      ? "Updating..."
                      : "On The Way"}
                  </button>
                  <button
                    disabled={
                      updatingId === selectedIncident.id ||
                      selectedIncident.status === "Resolved"
                    }
                    onClick={async () => {
                      setUpdatingId(selectedIncident.id);
                      try {
                        await api.patch(
                          `/responder/incidents/${selectedIncident.id}/status`,
                          { status: "RESOLVED" },
                        );
                        setRawIncidents((prev) =>
                          prev.map((i) =>
                            i.id === selectedIncident.id
                              ? { ...i, status: "RESOLVED" }
                              : i,
                          ),
                        );
                      } catch (e) {
                        console.error(e);
                      } finally {
                        setUpdatingId(null);
                      }
                    }}
                    className="w-full rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-xs font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm disabled:opacity-50"
                  >
                    {updatingId === selectedIncident.id
                      ? "Updating..."
                      : "Mark Resolved"}
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
            <p className="text-sm font-semibold text-text-primary">
              Response Statistics
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-text-primary shadow-sm">
                <span>Assigned Incidents</span>
                <span className="font-bold">{rawIncidents.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-red-500 px-4 py-3 text-white shadow-glow-red">
                <span className="font-medium">Critical Ops</span>
                <span className="font-bold">
                  {
                    mappedIncidents.filter((i) => i.severity === "Critical")
                      .length
                  }
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-indigo-500 px-4 py-3 text-white shadow-sm">
                <span className="font-medium">On The Way</span>
                <span className="font-bold">
                  {
                    rawIncidents.filter(
                      (i) => i.incidentStatus === "ON_THE_WAY",
                    ).length
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponderShell>
  );
}
