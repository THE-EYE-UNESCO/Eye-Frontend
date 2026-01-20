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
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <div className="grid grid-cols-4 items-center gap-6">
            <StepItem label="Type & Severity" completed />
            <StepItem label="Details" completed />
            <StepItem label="Location" active />
            <StepItem label="Evidence" />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-md space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">Where is this happening ?</h2>

          <div className="space-y-5">
            {/* Precise location row */}
            <div className="grid gap-3 md:grid-cols-[1fr_160px] md:items-end">
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-slate-600">
                  Precise Location <span className="text-red-500">*</span>
                </label>
                <input
                  value={preciseLocation}
                  onChange={(e) => setPreciseLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                  placeholder="street address or coordinates"
                />
              </div>

              <button
                type="button"
                className="h-[44px] w-full rounded-xl bg-[#eaf2ff] px-4 text-xs font-semibold text-blue-700"
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
              <label className="block text-[11px] font-semibold text-slate-600">
                Nearby Landmark (Optional)
              </label>
              <input
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                placeholder="eg: Near Central Park, behind City Hall"
              />
            </div>

            {/* Map preview */}
            <div className="h-64 w-full rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center text-center">
              <p className="text-sm font-semibold text-slate-700">Map preview will appear here</p>
              <p className="mt-1 text-xs text-slate-500 max-w-xs">
                Showing approximate location based on your input
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 sm:w-40"
              onClick={() => router.back()}
            >
              Back
            </button>
            <button
              type="button"
              className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold sm:w-[420px] ${
                canSubmit ? "bg-[#0b1020] text-white" : "bg-slate-200 text-slate-500 cursor-not-allowed"
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
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          primary ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
        }`}
      >
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p
          className={`text-xs font-semibold ${
            active ? "text-blue-600" : completed ? "text-slate-800" : "text-slate-500"
          }`}
        >
          {label}
        </p>
        <div
          className={`mt-2 h-[2px] w-full rounded-full ${
            completed ? "bg-blue-500" : "bg-slate-200"
          }`}
        />
      </div>
    </div>
  );
}

