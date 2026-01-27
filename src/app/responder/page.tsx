import { ResponderShell } from "./_components/ResponderShell";
import React from "react";
import Link from "next/link";
import { 
  Bell, 
  CheckCircle, 
  Calendar,
  AlertOctagon,
  ArrowRight,
  MapPin,
  ChevronRight,
  Phone,
  LayoutDashboard
} from "lucide-react";

export default function ResponderDashboard() {
  return (
    <ResponderShell 
      title="Responder Dashboard" 
      subtitle="Real-time overview of your response operations"
    >
      <div className="space-y-8 sm:space-y-10">
        {/* Stat Overview Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3">
          <StatCard 
            title="Active Alerts" 
            value="1" 
            icon={<Bell className="h-5 w-5 sm:h-6 sm:w-6" />} 
            color="bg-[#FF5A5A]" 
          />
          <StatCard 
            title="Acknowledged" 
            value="2" 
            icon={<CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />} 
            color="bg-[#41843D]" 
          />
          <StatCard 
            title="Total Alerts" 
            value="3" 
            icon={<Calendar className="h-5 w-5 sm:h-6 sm:w-6" />} 
            color="bg-[#1D7AFC]" 
          />
        </div>

        <div className="grid gap-8 lg:gap-10 grid-cols-1 lg:grid-cols-[1.2fr_2fr]">
          {/* Left Column: Urgent Alert + Take Action */}
          <div className="space-y-8 sm:space-y-10 order-2 lg:order-1">
            {/* Urgent Alert Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-text-primary">
                <AlertOctagon className="h-5 w-5 text-[#FF5A5A]" />
                <h2 className="text-lg font-semibold">Urgent Alert</h2>
                <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#FF5A5A]/10 text-xs font-bold text-[#FF5A5A]">1</span>
              </div>
              
              <div className="rounded-2xl border border-[#FF5A5A]/20 bg-[#FF5A5A]/5 p-5 sm:p-6 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-text-primary text-sm">Verify structural damage at Hill District</h3>
                  <span className="rounded-full bg-[#FF5A5A] px-2 py-0.5 text-[9px] font-bold text-white uppercase whitespace-nowrap">Critical</span>
                </div>
                <p className="mt-3 text-xs text-text-secondary leading-relaxed">
                  Assess building stability in affected zone. Report immediate dangers.
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-text-muted font-medium">
                  <Calendar className="h-3 w-3" />
                  <span>Due in 24 Minutes</span>
                </div>
              </div>
            </div>

            {/* Take Action Section */}
            <div className="rounded-[32px] sm:rounded-[40px] bg-card-bg p-6 sm:p-10 shadow-xl border border-card-border overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <LayoutDashboard className="h-32 w-32" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-6 sm:mb-8 relative z-10">Take Action</h2>
              <div className="space-y-3 sm:space-y-4 relative z-10">
                <ActionItem 
                  icon={<MapPin className="h-4 w-4" />} 
                  label="Update Location" 
                  primary 
                />
                <Link href="/responder/alerts" className="block w-full group">
                  <ActionItem 
                    icon={<Bell className="h-4 w-4" />} 
                    label="Active Alerts" 
                  />
                </Link>
                <ActionItem 
                  icon={<Phone className="h-4 w-4" />} 
                  label="Request Backup" 
                />
              </div>
            </div>
          </div>

          {/* Right Column: Active Incidents */}
          <div className="space-y-4 order-1 lg:order-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Active Incidents</h2>
              <Link href="/responder/crisis-map">
                <button className="rounded-xl bg-[#1D7AFC] px-4 sm:px-5 py-2 text-xs font-bold text-white shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                  View Map
                </button>
              </Link>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {[1, 2, 3].map((id) => (
                <IncidentCard key={id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ResponderShell>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) {
  return (
    <div className={`${color} rounded-3xl sm:rounded-[32px] p-6 sm:p-8 text-white shadow-lg transition-transform hover:scale-[1.02] flex flex-col justify-between`}>
      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white/20">
        {icon}
      </div>
      <div className="mt-4 sm:mt-6">
        <p className="text-sm sm:text-base font-semibold opacity-90">{title}</p>
        <p className="mt-1 sm:mt-2 text-3xl sm:text-5xl font-black">{value}</p>
      </div>
    </div>
  );
}

function ActionItem({ icon, label, primary }: { icon: React.ReactNode, label: string, primary?: boolean }) {
  return (
    <button className={`flex w-full items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 transition-all hover:scale-[1.01] active:scale-[0.98] ${
      primary ? "bg-tealGlow text-night shadow-glow" : "bg-card-bg text-text-primary border border-card-border hover:bg-white/5"
    }`}>
      <div className={`flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full ${
        primary ? "bg-night/10 text-night/60" : "bg-card-bg text-text-muted"
      }`}>
        {icon}
      </div>
      <span className="flex-1 text-left text-xs sm:text-sm font-bold truncate">{label}</span>
      <ChevronRight className="h-4 w-4 opacity-40 flex-shrink-0" />
    </button>
  );
}

function IncidentCard() {
  return (
    <div className="rounded-3xl sm:rounded-[32px] border border-card-border bg-card-bg p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-tealGlow/30 transition-all group">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-[#FF5A5A] px-3 py-1 text-[8px] sm:text-[9px] font-bold text-white uppercase tracking-wider">Critical</span>
        <span className="rounded-full bg-[#FF5A5A]/20 border border-[#FF5A5A]/30 px-3 py-1 text-[8px] sm:text-[9px] font-bold text-[#FF5A5A] uppercase tracking-wider">Landslide</span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[8px] sm:text-[9px] font-bold text-text-muted uppercase tracking-wider">Breaking News</span>
      </div>
      
      <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-bold text-text-primary group-hover:text-tealGlow transition-colors line-clamp-2">Landslide detected in Hill District</h3>
      <p className="mt-3 sm:mt-4 text-xs sm:text-[13px] leading-relaxed text-text-secondary line-clamp-3">
        IoT sensors detected unusual ground movement. Satellite imagery confirms terrain shift in residential area.
      </p>
      
      <div className="mt-6 flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 text-[10px] sm:text-[11px] text-text-muted">
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3 text-tealGlow" />
          <span>Hill District, Sector 12</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          <span>11m ago</span>
        </div>
      </div>
      
      <div className="mt-6 border-t border-card-border pt-4 flex gap-6 text-[10px] sm:text-[11px]">
        <div className="text-text-muted">Evacuees: <span className="font-bold text-[#FF5A5A]">12</span></div>
        <div className="text-text-muted">Casualties: <span className="font-bold text-[#FF5A5A]">3</span></div>
      </div>
    </div>
  );
}
