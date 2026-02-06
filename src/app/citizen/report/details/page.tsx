"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { CitizenShell } from "../../_components/CitizenShell";
import { useRouter } from "next/navigation";

export default function ReportDetailsPage() {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [affectedPeople, setAffectedPeople] = React.useState("");

  React.useEffect(() => {
    const saved = localStorage.getItem("reportData");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.title) setTitle(data.title);
        if (data.description) setDescription(data.description);
        if (data.affectedPeople) setAffectedPeople(data.affectedPeople);
      } catch (e) {
        console.error("Error loading report data", e);
      }
    }
  }, []);

  const handleContinue = () => {
    const current = JSON.parse(localStorage.getItem("reportData") || "{}");
    localStorage.setItem("reportData", JSON.stringify({
      ...current,
      title,
      description,
      affectedPeople
    }));
    router.push("/citizen/report/location");
  };

  const canContinue = title.trim().length > 0 && description.trim().length > 0;

  return (
    <CitizenShell
      title="Report Incident"
      subtitle="Stay updated with real-time emergency notifications"
    >
      <div className="space-y-6">
        {/* Stepper with Details active */}
        <div className="glass-panel p-6 shadow-card">
          <div className="grid grid-cols-4 items-center gap-6">
            <StepItem label="Type & Severity" completed />
            <StepItem label="Details" active />
            <StepItem label="Location" />
            <StepItem label="Evidence" />
          </div>
        </div>

        {/* Main card */}
        <div className="glass-panel p-6 shadow-card space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Tell us what&apos;s happening</h2>
          </div>

          <div className="space-y-4 text-xs text-text-secondary">
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-text-muted">
                Brief Title *
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-xs text-text-primary placeholder:text-text-muted focus:border-tealGlow/50 focus:outline-none transition shadow-sm"
                placeholder="e.g Road blocked by fallen tree near Main Street..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-text-muted">
                Detailed Description *
              </label>
              <div className="rounded-xl border border-card-border bg-card-bg p-3 shadow-sm">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-28 w-full resize-none bg-transparent text-xs text-text-primary placeholder:text-text-muted focus:outline-none"
                  placeholder={`Describe what you're observing. Include details like:
- What exactly is happening?
- When did it start?
- Is anyone injured or in danger?
- Are there any immediate hazards?`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-text-muted">
                Number of people affected (if known)
              </label>
              <input
                value={affectedPeople}
                onChange={(e) => setAffectedPeople(e.target.value)}
                className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-xs text-text-primary placeholder:text-text-muted focus:border-tealGlow/50 focus:outline-none transition shadow-sm"
                placeholder="Approximate number"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              className="w-full rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-sm font-semibold text-text-secondary sm:w-40 hover:bg-card-border/20 transition"
              onClick={() => {
                // Save current state before going back
                const current = JSON.parse(localStorage.getItem("reportData") || "{}");
                localStorage.setItem("reportData", JSON.stringify({
                  ...current,
                  title,
                  description,
                  affectedPeople
                }));
                router.back();
              }}
            >
              Back
            </button>
            <button
              type="button"
              disabled={!canContinue}
              className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold transition sm:w-40 ${
                canContinue ? "bg-tealGlow text-night shadow-glow-button hover:opacity-90" : "bg-card-bg text-text-muted cursor-not-allowed border border-card-border"
              }`}
              onClick={handleContinue}
            >
              Continue
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

