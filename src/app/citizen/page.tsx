"use client";

import { Bell, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";
import { CitizenShell } from "./_components/CitizenShell";

const alerts = [
  {
    label: "Flood Alert",
    level: "High",
    location: "Nyabihu - Rwanda",
    color: "bg-red-500",
  },
  {
    label: "Landslide Warning",
    level: "Critical",
    location: "Gakenke - Rwanda",
    color: "bg-orange-500",
  },
  {
    label: "Wildfire Detection",
    level: "Medium",
    location: "Musanze - Rwanda",
    color: "bg-yellow-400",
  },
];

const stories = [
  {
    title: "Community Comes Together In Crisis",
    subtitle:
      "Neighbors Helping Neighbors – The True Spirit Of Our Community Shines.",
    image: "/sample-crisis-ex.png",
  },
  {
    title: "Volunteers Coordinate Rapid Response",
    subtitle:
      "Local teams organize supplies and support within minutes of alerts.",
    image: "/sample-crisis-ex.png",
  },
];

const tableRows = [
  {
    crisis: "Floods",
    location: "Kigali",
    date: "12.08.2019 - 12:53 PM",
    status: "Low",
    color: "bg-emerald-400",
  },
  {
    crisis: "Floods",
    location: "Kigali",
    date: "12.08.2019 - 12:53 PM",
    status: "Medium",
    color: "bg-amber-400",
  },
  {
    crisis: "Floods",
    location: "Kigali",
    date: "12.08.2019 - 12:53 PM",
    status: "Critical",
    color: "bg-red-500",
  },
  {
    crisis: "Floods",
    location: "Kigali",
    date: "12.08.2019 - 12:53 PM",
    status: "High",
    color: "bg-orange-500",
  },
];

const safety = [
  "Keep emergency kit ready",
  "Stay away from affected area",
  "Monitor official updates",
  "Help elderly and disabled neighbors",
];

export default function CitizenDashboard() {
  return (
    <CitizenShell
      title={
        <span>
          Welcome To <span className="font-bold">The Eye</span>
        </span>
      }
      subtitle={<span className="text-slateSoft">Stay informed, stay safe. Real-time crisis updates for your community.</span>}
    >
      <div className="space-y-6">
        <div className="overflow-hidden glass-panel shadow-card">
          <div className="relative h-64 w-full">
            <Image
              src="/sample-crisis.png"
              alt="Firefighters contain forest park wildfire"
              fill
              className="object-cover"
            />
            <div className="absolute left-5 top-5 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-lg">
              Weather Alert
            </div>
            <button className="absolute right-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-bg-primary/90 text-text-primary shadow-lg backdrop-blur-sm">
              &gt;
            </button>
            <button className="absolute left-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-bg-primary/90 text-text-primary shadow-lg backdrop-blur-sm">
              &lt;
            </button>
          </div>

            <div className="space-y-3 px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
              VALIDATE ALERT
            </p>
            <h2 className="text-xl font-semibold text-text-primary">
              Firefighters Contain Forest Park Wildfire
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Fire crews working around the clock have successfully established
              firebreaks. Evacuation orders remain in effect for zone MN-65.
            </p>
          </div>

          {/* Alert tags row */}
          <div className="flex flex-wrap gap-3 border-t border-card-border bg-bg-secondary px-6 py-3 text-sm">
            {alerts.map((alert) => (
              <div
                key={alert.label}
                className="flex flex-1 min-w-[160px] items-center justify-between rounded-full bg-card-bg border border-card-border px-4 py-2 shadow-sm"
              >
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-text-primary">
                    {alert.location}
                  </p>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">{alert.label}</p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${alert.color.replace('bg-', 'bg-opacity-90 bg-')}`} 
                >
                  {alert.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Middle row: stories + side actions */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(260px,0.9fr)]">
          {/* Community stories */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <p className="font-semibold text-text-primary">Community Stories</p>
              <button className="text-sm text-tealGlow hover:opacity-80 transition font-medium">
                View all →
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {stories.map((story) => (
                <article
                  key={story.title}
                  className="overflow-hidden rounded-2xl bg-card-bg border border-card-border shadow-sm hover:border-tealGlow/30 transition"
                >
                  <div className="relative h-32 w-full">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2 px-4 py-3">
                    <h3 className="text-sm font-semibold text-text-primary leading-snug">
                      {story.title}
                    </h3>
                    <p className="text-xs text-text-secondary">{story.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Take action + safety */}
          <div className="space-y-4">
            <div className="rounded-3xl bg-tealGlow/10 border border-tealGlow/20 px-5 py-4 text-text-primary shadow-sm">
              <p className="text-sm font-semibold text-tealGlow">Take Action</p>
              <div className="mt-4 space-y-2 text-sm">
                <ActionButton
                  icon={<MessageCircle className="h-4 w-4" />}
                  label="Report Incident"
                  primary
                />
                <ActionButton
                  icon={<Phone className="h-4 w-4" />}
                  label="Emergency Contacts"
                />
                <ActionButton icon={<Bell className="h-4 w-4" />} label="IVR" />
              </div>
            </div>

            <div className="glass-panel px-5 py-4 text-sm text-text-secondary shadow-card">
              <p className="text-sm font-semibold text-text-primary">
                Safety Guidance
              </p>
              <ul className="mt-3 space-y-2">
                {safety.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between rounded-full bg-card-bg border border-card-border px-3 py-2"
                  >
                    <span className="text-xs">{item}</span>
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Crisis breakdown table */}
        <div className="glass-panel px-5 py-4 text-sm text-text-secondary shadow-card">
          <p className="text-sm font-semibold text-text-primary">
            Crisis Breakdown
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-sm">
              <thead className="text-xs text-text-muted uppercase tracking-wider">
                <tr>
                  <th className="text-left font-medium">Crisis</th>
                  <th className="text-left font-medium">Location</th>
                  <th className="text-left font-medium">Date – Time</th>
                  <th className="text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, idx) => (
                  <tr key={idx} className="rounded-xl bg-card-bg border border-card-border hover:bg-card-border/10 transition">
                    <td className="rounded-l-xl px-3 py-3 text-text-primary font-medium">
                      {row.crisis}
                    </td>
                    <td className="px-3 py-3 text-text-secondary">{row.location}</td>
                    <td className="px-3 py-3 text-text-muted">{row.date}</td>
                    <td className="rounded-r-xl px-3 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${row.color}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CitizenShell>
  );
}

function ActionButton({
  icon,
  label,
  primary,
}: {
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 transition hover:scale-[1.02] ${
        primary ? "bg-tealGlow text-night font-semibold shadow-glow-button" : "bg-card-bg hover:bg-card-border/20 text-text-primary border border-card-border"
      }`}
    >
      <span className="flex items-center gap-2 text-xs">
        {icon}
        <span>{label}</span>
      </span>
      <span className={`text-[10px] ${primary ? "text-night/70" : "text-text-muted"}`}>→</span>
    </button>
  );
}
