"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Heart, 
  MessageSquare, 
  Share2, 
  MapPin, 
  Clock, 
  ChevronDown,
  XCircle
} from "lucide-react";
import { ResponderShell } from "../_components/ResponderShell";

interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  timeAgo: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  status: "Verified" | "Pending" | "Active";
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Bridge structural failure risk",
    description: "Citizen report verified by structural sensors. Immediate closure recommended.",
    location: "Hill District, Sector 12",
    timeAgo: "21m ago",
    severity: "CRITICAL",
    status: "Verified",
  },
  {
    id: "2",
    title: "Bridge structural failure risk",
    description: "Citizen report verified by structural sensors. Immediate closure recommended.",
    location: "Hill District, Sector 17",
    timeAgo: "9m ago",
    severity: "CRITICAL",
    status: "Verified",
  },
  {
    id: "3",
    title: "Bridge structural failure risk",
    description: "Citizen report verified by structural sensors. Immediate closure recommended.",
    location: "Hill District, Sector 8",
    timeAgo: "11m ago",
    severity: "CRITICAL",
    status: "Verified",
  }
];

export default function ReportedIncidentsPage() {
  const [mounted, setMounted] = useState(false);
  const [reports] = useState<Report[]>(mockReports);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ResponderShell
      title="Citizens Reports"
      subtitle="Share your story, support others, and strengthen our community"
    >
      <div className="space-y-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Reports"
            value="12,456"
            icon={<Users className="h-6 w-6" />}
            color="bg-[#7C3AED]" // Purple
          />
          <StatCard
            label="Pending Review"
            value="3,829"
            icon={<Heart className="h-6 w-6" />}
            color="bg-[#C04ABB]" // Pink/Magenta
          />
          <StatCard
            label="Verified"
            value="8,945"
            icon={<MessageSquare className="h-6 w-6" />}
            color="bg-[#2563EB]" // Blue
          />
          <StatCard
            label="Active Response"
            value="5,234"
            icon={<Share2 className="h-6 w-6" />}
            color="bg-[#3F7D20]" // Green
          />
        </div>

        {/* Filter Bar */}
        <div className="glass-panel p-6 shadow-card">
          <p className="mb-4 text-xs font-semibold text-text-muted">Filter by Severity</p>
          <div className="flex flex-wrap items-center gap-4">
            <FilterSelect label="All Severities..." />
            <FilterSelect label="All Status" />
            <button className="ml-auto flex items-center gap-2 text-xs font-semibold text-text-muted transition hover:text-text-primary">
              Clear Filters
            </button>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </ResponderShell>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className={`${color} rounded-3xl p-6 text-white shadow-lg transition hover:scale-[1.02]`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 mb-4">
        {icon}
      </div>
      <p className="text-xs font-medium opacity-80">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function FilterSelect({ label }: { label: string }) {
  return (
    <button className="flex min-w-[180px] items-center justify-between rounded-xl border border-card-border bg-card-bg px-4 py-2.5 text-xs text-text-muted transition hover:border-text-muted/30">
      <span>{label}</span>
      <ChevronDown className="h-3.5 w-3.5 opacity-50" />
    </button>
  );
}

function ReportCard({ report }: { report: Report }) {
  return (
    <div className="group relative overflow-hidden rounded-[32px] border border-card-border bg-card-bg p-8 shadow-sm transition hover:shadow-md">
      {/* Red vertical bar for Critical */}
      {report.severity === "CRITICAL" && (
        <div className="absolute left-0 top-0 h-full w-1 bg-red-500" />
      )}
      
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-4 flex-1">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg bg-red-500 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
              {report.severity}
            </span>
            <span className="rounded-lg bg-red-100 dark:bg-red-900/40 px-3 py-1 text-[10px] font-bold text-red-600 dark:text-red-400 capitalize">
              {report.status}
            </span>
          </div>

          <h3 className="text-xl font-bold text-text-primary group-hover:underline cursor-pointer decoration-2 underline-offset-4">
            {report.title}
          </h3>
          
          <p className="text-sm leading-relaxed text-text-secondary max-w-2xl">
            {report.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-[11px] text-text-muted">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 opacity-50 text-tealGlow" />
              <span>{report.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 opacity-50" />
              <span>{report.timeAgo}</span>
            </div>
          </div>
        </div>

        <button className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-600 transition self-start md:self-center">
          Respond
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-card-border flex items-center gap-4">
        <span className="text-[11px] font-bold text-text-primary uppercase tracking-tight">Quick Actions:</span>
        <button className="rounded-lg bg-bg-secondary px-4 py-2 text-[11px] font-semibold text-text-primary border border-card-border hover:bg-card-border/10 transition">
          Mark Verified
        </button>
        <button className="rounded-lg bg-bg-secondary px-4 py-2 text-[11px] font-semibold text-text-primary border border-card-border hover:bg-card-border/10 transition">
          Start Response
        </button>
      </div>
    </div>
  );
}
