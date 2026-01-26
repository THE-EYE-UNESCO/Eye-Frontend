"use client";

import React, { useMemo, useState } from "react";
import { AlertTriangle, Paperclip, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { CitizenShell } from "../../_components/CitizenShell";

export default function ReportEvidencePage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);

  const canSubmit = useMemo(() => files.length > 0, [files.length]);

  return (
    <CitizenShell
      title="Report Incident"
      subtitle="Stay updated with real-time emergency notifications"
    >
      <div className="space-y-6">
        {/* Stepper with Evidence active */}
        <div className="glass-panel p-6 shadow-card">
          <div className="grid grid-cols-4 items-center gap-6">
            <StepItem label="Type & Severity" completed />
            <StepItem label="Details" completed />
            <StepItem label="Location" completed />
            <StepItem label="Evidence" active />
          </div>
        </div>

        <div className="glass-panel p-6 shadow-card space-y-6">
          <h2 className="text-lg font-semibold text-white">Add evidence</h2>

          <label className="block">
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 px-6 py-10 text-center hover:border-tealGlow/50 transition cursor-pointer">
              <UploadCloud className="h-6 w-6 text-slateSoft" />
              <p className="text-sm font-semibold text-white">Upload photos or videos</p>
              <p className="text-xs text-slateSoft">Click to select files</p>
            </div>
            <input
              type="file"
              multiple
              className="hidden"
              accept="image/*,video/*"
              onChange={(e) => {
                const next = Array.from(e.target.files ?? []);
                setFiles(next);
              }}
            />
          </label>

          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-white">Selected files</p>
              <div className="space-y-2">
                {files.map((f) => (
                  <div
                    key={f.name}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs"
                  >
                    <span className="flex items-center gap-2 text-white">
                      <Paperclip className="h-4 w-4 text-slateSoft" />
                      {f.name}
                    </span>
                    <span className="text-slateSoft">{Math.ceil(f.size / 1024)} KB</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slateSoft sm:w-40 hover:bg-white/10 transition"
              onClick={() => router.back()}
            >
              Back
            </button>
            <button
              type="button"
              className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold sm:w-56 transition ${
                canSubmit
                  ? "bg-tealGlow text-night shadow-glow hover:bg-tealGlow/90"
                  : "bg-white/10 text-slateSoft cursor-not-allowed"
              }`}
              disabled={!canSubmit}
              onClick={() => {
                // submit -> success screen
                router.push("/citizen/report/success");
              }}
            >
              Submit Report
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
          primary ? "bg-tealGlow text-night shadow-glow" : "bg-white/10 text-slateSoft"
        }`}
      >
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p
          className={`text-xs font-semibold ${
            active ? "text-tealGlow" : completed ? "text-white" : "text-slateSoft"
          }`}
        >
          {label}
        </p>
        <div
          className={`mt-2 h-[2px] w-full rounded-full ${
            completed ? "bg-tealGlow" : "bg-white/10"
          }`}
        />
      </div>
    </div>
  );
}

