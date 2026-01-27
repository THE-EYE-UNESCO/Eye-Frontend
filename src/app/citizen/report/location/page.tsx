"use client";

import React, { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { CitizenShell } from "../../_components/CitizenShell";

export default function ReportLocationPage() {
  const router = useRouter();
  const [preciseLocation, setPreciseLocation] = useState("");
  const [landmark, setLandmark] = useState("");

  const canSubmit = useMemo(() => Boolean(preciseLocation.trim()), [preciseLocation]);

  return (
    <CitizenShell
      title="Report Incident"
      subtitle="Stay updated with real-time emergency notifications"
    >
      <div className="space-y-6">
        {/* Stepper with Location active */}
        <div className="glass-panel p-6 shadow-card">
          <div className="grid grid-cols-4 items-center gap-6">
            <StepItem label="Type & Severity" completed />
            <StepItem label="Details" completed />
            <StepItem label="Location" active />
            <StepItem label="Evidence" />
          </div>
        </div>

        <div className="glass-panel p-6 shadow-card space-y-6">
          <h2 className="text-xl font-semibold text-text-primary">Where is this happening ?</h2>

          <div className="space-y-5">
            {/* Precise location row */}
            <div className="grid gap-3 md:grid-cols-[1fr_160px] md:items-end">
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-text-muted">
                  Precise Location <span className="text-red-600">*</span>
                </label>
                <input
                  value={preciseLocation}
                  onChange={(e) => setPreciseLocation(e.target.value)}
                  className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-xs text-text-primary placeholder:text-text-muted focus:border-tealGlow/50 focus:outline-none transition shadow-sm"
                  placeholder="street address or coordinates"
                />
              </div>

              <button
                type="button"
                className="h-[44px] w-full rounded-xl bg-tealGlow/10 border border-tealGlow/20 px-4 text-xs font-semibold text-tealGlow hover:bg-tealGlow/20 transition shadow-sm"
                onClick={() => {
                  // Placeholder – could use navigator.geolocation in a later step
                  setPreciseLocation("Current location (auto)");
                }}
              >
                Use My Location
              </button>
            </div>

            {/* Landmark */}
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-text-muted">
                Nearby Landmark (Optional)
              </label>
              <input
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-xs text-text-primary placeholder:text-text-muted focus:border-tealGlow/50 focus:outline-none transition shadow-sm"
                placeholder="eg: Near Central Park, behind City Hall"
              />
            </div>

            {/* Map preview */}
            <div className="h-64 w-full rounded-2xl border border-card-border bg-bg-secondary/50 flex flex-col items-center justify-center text-center backdrop-blur-sm shadow-inner">
              <p className="text-sm font-semibold text-text-primary">Map preview will appear here</p>
              <p className="mt-1 text-xs text-text-muted max-w-xs">
                Showing approximate location based on your input
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              className="w-full rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-sm font-semibold text-text-muted sm:w-40 hover:bg-card-border/10 transition"
              onClick={() => router.back()}
            >
              Back
            </button>
            <button
              type="button"
              className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold sm:w-[420px] transition ${
                canSubmit ? "bg-tealGlow text-night shadow-glow-button hover:opacity-90" : "bg-card-bg text-text-muted cursor-not-allowed border border-card-border"
              }`}
              disabled={!canSubmit}
              onClick={() => {
                if (!canSubmit) return;
                router.push("/citizen/report/evidence");
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </CitizenShell>
  );
}

function StepItem({
  label,
  active,
  completed,
}: {
  label: string;
  active?: boolean;
  completed?: boolean;
}) {
  const primary = active || completed;
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
          primary ? "bg-tealGlow text-night shadow-glow-button font-bold" : "bg-card-bg text-text-muted border border-card-border"
        }`}
      >
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p
          className={`text-xs font-semibold transition ${
            active ? "text-tealGlow" : completed ? "text-text-primary" : "text-text-muted"
          }`}
        >
          {label}
        </p>
        <div
          className={`mt-2 h-[2px] w-full rounded-full transition ${
            completed ? "bg-tealGlow" : "bg-card-border"
          }`}
        />
      </div>
    </div>
  );
}

