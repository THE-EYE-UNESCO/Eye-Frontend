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
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <div className="grid grid-cols-4 items-center gap-6">
            <StepItem label="Type & Severity" active />
            <StepItem label="Details" />
            <StepItem label="Location" />
            <StepItem label="Evidence" />
          </div>
        </div>

        {/* Main card */}
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold text-slate-900">
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

          <h3 className="mt-10 text-sm font-semibold text-slate-900">
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
                ? "bg-[#0b1020] text-white hover:bg-[#0b1020]/95"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
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
          active ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
        }`}
      >
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className={`text-xs font-semibold ${active ? "text-blue-600" : "text-slate-500"}`}>
          {label}
        </p>
        <div className="mt-2 h-[2px] w-full rounded-full bg-slate-200" />
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
      className={`flex h-24 flex-col items-center justify-center gap-2 rounded-xl border bg-white text-xs shadow-sm transition ${
        selected
          ? "border-blue-600 ring-2 ring-blue-200 text-slate-900"
          : "border-slate-200 hover:border-slate-300 text-slate-700"
      }`}
    >
      {icon ? <span className={`${selected ? "text-blue-600" : "text-slate-500"}`}>{icon}</span> : null}
      <span className="font-medium">{label}</span>
    </button>
  );
}

