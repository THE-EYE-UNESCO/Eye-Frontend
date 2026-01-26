"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { CitizenShell } from "../../_components/CitizenShell";

export default function ReportSuccessPage() {
  const router = useRouter();

  return (
    <CitizenShell
      title="Emergency Alerts"
      subtitle="Stay updated with real-time emergency notifications"
    >
      <div className="space-y-6">
        {/* Stepper (all done) */}
        <div className="glass-panel p-6 shadow-card">
          <div className="grid grid-cols-4 items-center gap-6">
            <StepDot label="Type & Severity" done />
            <StepDot label="Details" done />
            <StepDot label="Location" done />
            <StepDot label="Evidence" done />
          </div>
        </div>

        {/* Success card */}
        <div className="glass-panel p-8 shadow-card">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-tealGlow/20 text-tealGlow shadow-glow">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              Report Submitted Successfully !
            </h2>
            <p className="mt-3 max-w-xl text-xs leading-relaxed text-slateSoft">
              Thank you for helping your community. Your report has been received and is being
              verified by our AI system and field responders
            </p>

            <div className="mt-10 w-full rounded-2xl bg-white/5 border border-white/5 px-6 py-5 text-left text-xs text-white">
              <p className="text-[11px] font-semibold text-tealGlow">What happens next?</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-[11px] text-slateSoft">
                <li>AI analysis and verification (2–5 minutes)</li>
                <li>Field responder review and confirmation</li>
                <li>Alert sent to affected area if verified</li>
                <li>Emergency response team deployed if needed</li>
              </ol>
            </div>

            <div className="mt-10 w-full space-y-3">
              <button
                type="button"
                className="w-full rounded-2xl bg-tealGlow px-4 py-3 text-sm font-semibold text-night shadow-glow hover:bg-tealGlow/90 transition"
                onClick={() => router.push("/citizen/report")}
              >
                Submit Another Report
              </button>
              <button
                type="button"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slateSoft hover:bg-white/10 transition"
                onClick={() => router.push("/citizen")}
              >
                View My Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </CitizenShell>
  );
}

function StepDot({ label, done }: { label: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-10 w-10 rounded-full flex items-center justify-center ${
          done ? "bg-tealGlow shadow-glow" : "bg-white/10"
        }`}
      />
      <div className="min-w-0">
        <p className={`text-xs font-semibold ${done ? "text-tealGlow" : "text-slateSoft"}`}>
          {label}
        </p>
        <div className="mt-2 h-[2px] w-full rounded-full bg-white/10" />
      </div>
    </div>
  );
}

