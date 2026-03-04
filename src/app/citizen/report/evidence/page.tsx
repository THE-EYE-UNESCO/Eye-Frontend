"use client";

import React, { useMemo, useState } from "react";
import { AlertTriangle, Paperclip, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { CitizenShell } from "../../_components/CitizenShell";
import { api } from "@/lib/api";

export default function ReportEvidencePage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const saved = localStorage.getItem("reportData");
      if (!saved) throw new Error("No report data found");

      let reportData;
      let user;
      try {
        reportData = saved && saved !== "undefined" ? JSON.parse(saved) : {};
        const userStr = localStorage.getItem("user");
        user = userStr && userStr !== "undefined" ? JSON.parse(userStr) : {};
      } catch (e) {
        throw new Error("Invalid session data. Please sign in again.");
      }

      const payload = {
        citizen_id: user.id || null,
        title: reportData.title,
        description: reportData.description,
        category: reportData.category,
        severity: reportData.severity.toUpperCase(), // Backend expects uppercase enum values
        latitude: reportData.latitude || 0,
        longitude: reportData.longitude || 0,
        address: reportData.address,
        landmark: reportData.landmark,
        status: "PENDING",
      };

      await api.post("/reports", payload);

      // Clear data on success
      localStorage.removeItem("reportData");
      router.push("/citizen/report/success");
    } catch (e) {
      console.error("Failed to submit report", e);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = true; // Evidence is optional in this implementation for now to facilitate testing

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
          <h2 className="text-lg font-semibold text-text-primary">
            Add evidence
          </h2>

          <label className="block">
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-card-border bg-card-bg px-6 py-10 text-center hover:border-tealGlow/50 transition cursor-pointer shadow-sm">
              <UploadCloud className="h-6 w-6 text-tealGlow" />
              <p className="text-sm font-semibold text-text-primary">
                Upload photos or videos
              </p>
              <p className="text-xs text-text-muted">Click to select files</p>
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
              <p className="text-xs font-semibold text-text-primary">
                Selected files
              </p>
              <div className="space-y-2">
                {files.map((f) => (
                  <div
                    key={f.name}
                    className="flex items-center justify-between rounded-xl border border-card-border bg-card-bg px-4 py-3 text-xs shadow-sm"
                  >
                    <span className="flex items-center gap-2 text-text-primary">
                      <Paperclip className="h-4 w-4 text-tealGlow" />
                      {f.name}
                    </span>
                    <span className="text-text-muted">
                      {Math.ceil(f.size / 1024)} KB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              className="w-full rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-sm font-semibold text-text-secondary sm:w-40 hover:bg-card-border/20 transition"
              onClick={() => router.back()}
            >
              Back
            </button>
            <button
              type="button"
              className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold sm:w-56 transition ${
                canSubmit && !loading
                  ? "bg-tealGlow text-night shadow-glow-button hover:opacity-90"
                  : "bg-card-bg text-text-muted cursor-not-allowed border border-card-border"
              }`}
              disabled={!canSubmit || loading}
              onClick={handleSubmit}
            >
              {loading ? "Submitting..." : "Submit Report"}
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
          primary
            ? "bg-tealGlow text-night shadow-glow-button font-bold"
            : "bg-card-bg text-text-muted border border-card-border"
        }`}
      >
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p
          className={`text-xs font-semibold transition ${
            active
              ? "text-tealGlow"
              : completed
                ? "text-text-primary"
                : "text-text-muted"
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
