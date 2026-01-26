"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  Flame,
  HeartPulse,
  Mountain,
  Tornado,
  Waves,
} from "lucide-react";
import { CitizenShell } from "../_components/CitizenShell";
import { useRouter } from "next/navigation";

type IncidentType =
  | "Wildfire"
  | "Landslide"
  | "Pandemic"
  | "Infrastructure"
  | "Floods"
  | "Earthquake";

type Severity = "Critical" | "High" | "Medium" | "Low";

const incidentTypes: Array<{
  type: IncidentType;
  icon: React.ReactNode;
}> = [
  { type: "Wildfire", icon: <Flame className="h-6 w-6" /> },
  { type: "Landslide", icon: <Mountain className="h-6 w-6" /> },
  { type: "Pandemic", icon: <HeartPulse className="h-6 w-6" /> },
  { type: "Infrastructure", icon: <Building2 className="h-6 w-6" /> },
  { type: "Floods", icon: <Waves className="h-6 w-6" /> },
  { type: "Earthquake", icon: <Tornado className="h-6 w-6" /> },
];

const severities: Severity[] = ["Critical", "High", "Medium", "Low"];

export default function ReportIncidentPage() {
  const router = useRouter();
  const [incidentType, setIncidentType] = useState<IncidentType | null>(null);
  const [severity, setSeverity] = useState<Severity | null>(null);

  const canContinue = useMemo(() => Boolean(incidentType && severity), [incidentType, severity]);

  return (
    <CitizenShell
      title="Report Incident"
      subtitle="Stay updated with real-time emergency notifications"
    >
      <div className="space-y-6">
        {/* Stepper */}
        <div className="glass-panel p-6 shadow-card">
          <div className="grid grid-cols-4 items-center gap-6">
            <StepItem label="Type & Severity" active />
            <StepItem label="Details" />
            <StepItem label="Location" />
            <StepItem label="Evidence" />
          </div>
        </div>

        {/* Main card */}
        <div className="glass-panel p-6 shadow-card">
          <h2 className="text-lg font-semibold text-white">
            What type of incident are you reporting ?
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {incidentTypes.map((it) => (
              <SelectableBox
                key={it.type}
                label={it.type}
                selected={incidentType === it.type}
                onClick={() => setIncidentType(it.type)}
                icon={it.icon}
              />
            ))}
            {/* Keep layout similar to screenshot (empty boxes) */}
            <div className="hidden sm:block" />
            <div className="hidden sm:block" />
          </div>

          <h3 className="mt-10 text-sm font-semibold text-white">
            How severe is the situation ?
          </h3>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {severities.map((s) => (
              <SelectableBox
                key={s}
                label={s}
                selected={severity === s}
                onClick={() => setSeverity(s)}
              />
            ))}
          </div>

          <button
            className={`mt-10 w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              canContinue
                ? "bg-tealGlow text-night shadow-glow hover:bg-tealGlow/90"
                : "bg-white/10 text-slate-500 cursor-not-allowed"
            }`}
            disabled={!canContinue}
            onClick={() => {
              if (!canContinue) return;
              // In a real app we would persist the selections (context, URL params, etc.).
              router.push("/citizen/report/details");
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </CitizenShell>
  );
}

function StepItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-10 w-10 rounded-full flex items-center justify-center ${
          active ? "bg-tealGlow text-night shadow-glow" : "bg-white/10 text-slate-500"
        }`}
      >
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className={`text-xs font-semibold ${active ? "text-tealGlow" : "text-slate-500"}`}>
          {label}
        </p>
        <div className="mt-2 h-[2px] w-full rounded-full bg-white/10" />
      </div>
    </div>
  );
}

function SelectableBox({
  label,
  selected,
  onClick,
  icon,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-24 flex-col items-center justify-center gap-2 rounded-xl border bg-white/5 text-xs shadow-sm transition ${
        selected
          ? "border-tealGlow ring-1 ring-tealGlow/50 text-white bg-tealGlow/10"
          : "border-white/10 hover:border-white/20 text-slateSoft hover:bg-white/10"
      }`}
    >
      {icon ? <span className={`${selected ? "text-tealGlow" : "text-slate-400"}`}>{icon}</span> : null}
      <span className="font-medium">{label}</span>
    </button>
  );
}

