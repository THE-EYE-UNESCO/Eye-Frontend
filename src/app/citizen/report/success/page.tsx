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
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <div className="grid grid-cols-4 items-center gap-6">
            <StepDot label="Type & Severity" done />
            <StepDot label="Details" done />
            <StepDot label="Location" done />
            <StepDot label="Evidence" done />
          </div>
        </div>

        {/* Success card */}
        <div className="rounded-3xl bg-white p-8 shadow-md">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              Report Submitted Successfully !
            </h2>
            <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-500">
              Thank you for helping your community. Your report has been received and is being
              verified by our AI system and field responders
            </p>

            <div className="mt-10 w-full rounded-2xl bg-[#eef6ff] px-6 py-5 text-left text-xs text-slate-700">
              <p className="text-[11px] font-semibold text-slate-600">What happens next?</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-[11px] text-slate-600">
                <li>AI analysis and verification (2–5 minutes)</li>
                <li>Field responder review and confirmation</li>
                <li>Alert sent to affected area if verified</li>
                <li>Emergency response team deployed if needed</li>
              </ol>
            </div>

            <div className="mt-10 w-full space-y-3">
              <button
                type="button"
                className="w-full rounded-2xl bg-[#0b1020] px-4 py-3 text-sm font-semibold text-white"
                onClick={() => router.push("/citizen/report")}
              >
                Submit Another Report
              </button>
              <button
                type="button"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800"
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
          done ? "bg-blue-600" : "bg-slate-200"
        }`}
      />
      <div className="min-w-0">
        <p className={`text-xs font-semibold ${done ? "text-blue-600" : "text-slate-500"}`}>
          {label}
        </p>
        <div className="mt-2 h-[2px] w-full rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

