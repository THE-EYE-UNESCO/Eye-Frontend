"use client";

import React from "react";
import Image from "next/image";
import { AlertTriangle, ArrowRight, Flame, Newspaper } from "lucide-react";
import { CitizenShell } from "../_components/CitizenShell";

const heroArticle = {
  title: "Firefighters Contain Forest Park Wildfire",
  body:
    "Fire crews working around the clock have successfully established firebreaks. Evacuation orders remain in effect for zone MN-65.",
  badge: "WILDFIRE ALERT",
  image: "/sample-crisis.png",
};

const breakingNews = [
  {
    id: "b1",
    title: "Landslide detected in Hill District",
    tags: ["CRITICAL", "LANDSLIDE", "BREAKING NEWS"],
    body:
      "IoT sensors detected unusual ground movement. Satellite imagery confirms terrain shift in residential areas.",
    location: "Hill District",
    time: "12 min ago",
    image: "/sample-crisis.png",
  },
  {
    id: "b2",
    title: "Flash flood warning – River Valley",
    tags: ["MEDIUM", "FLOOD"],
    body:
      "Heavy rainfall detected upstream. Water levels rising rapidly. Predicted to affect low‑lying areas.",
    location: "River Valley",
    time: "36 min ago",
    image: "/sample-crisis-ex.png",
  },
  {
    id: "b3",
    title: "Wildfire spreading near Forest Park",
    tags: ["CRITICAL", "WILDFIRE"],
    body:
      "Fire detected by thermal imaging. Wind conditions causing rapid spread towards residential zones.",
    location: "Forest Park",
    time: "58 min ago",
    image: "/sample-crisis.png",
  },
];

const trendingNow = [
 "Emergency Response Teams Mobilized in residential area.",
 "Shelter Capacity Increased by 40%.",
 "Weather Alert: Heavy Rainfall Expected.",
];

const summary = {
  articles: 24,
  breaking: 3,
  updates: 12,
};

export default function NewsPage() {
  return (
    <CitizenShell
      title="News & Updates"
      subtitle="Latest emergency updates and community news"
    >
      <div className="space-y-6">
        {/* Hero banner */}
        <div className="overflow-hidden glass-panel shadow-card">
          <div className="relative h-64 w-full">
            <Image
              src={heroArticle.image}
              alt={heroArticle.title}
              fill
              className="object-cover"
            />
            <div className="absolute left-5 top-5 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              {heroArticle.badge}
            </div>
            <button className="absolute right-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow">
              &gt;
            </button>
            <button className="absolute left-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow">
              &lt;
            </button>
          </div>
          <div className="space-y-3 px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
              Breaking Alert
            </p>
            <h2 className="text-lg font-semibold text-white">{heroArticle.title}</h2>
            <p className="text-xs text-slateSoft">{heroArticle.body}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-panel px-5 py-3 shadow-card">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="text-slateSoft">Filter by category :</span>
            <button className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white hover:bg-white/20 transition">
              All News
            </button>
            <button className="rounded-full bg-red-500 px-3 py-1 text-[11px] font-semibold text-white shadow-glow">
              Breaking News
            </button>
            <button className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white hover:bg-white/20 transition">
              Updates
            </button>
            <button className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white hover:bg-white/20 transition">
              Safety Tips
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)]">
          {/* Left: Breaking news list */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-white">Breaking News</p>

            {breakingNews.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden glass-panel shadow-card"
              >
                <div className="grid gap-0 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                  {/* Text */}
                  <div className="space-y-3 px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2 text-[10px]">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className={`rounded-full px-2 py-1 font-semibold ${
                            t === "CRITICAL"
                              ? "bg-red-500 text-white"
                              : t === "MEDIUM"
                              ? "bg-amber-400 text-white"
                              : t === "FLOOD"
                              ? "bg-blue-500 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-slateSoft">{item.body}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-[10px] text-slateSoft">
                      <span>Location: {item.location}</span>
                      <span>{item.time}</span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-40 w-full bg-slate-100 md:h-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Trending now */}
            <div className="glass-panel p-5 shadow-card">
              <p className="text-sm font-semibold text-white">Trending Now</p>
              <div className="mt-4 space-y-2 text-xs text-slateSoft">
                {trendingNow.map((t, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white/5 border border-white/5 px-4 py-3 text-slate-200"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="glass-panel p-5 shadow-card">
              <p className="text-sm font-semibold text-white">Today&apos;s Summary</p>
              <div className="mt-4 space-y-3 text-xs text-slate-100">
                <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 border border-white/5">
                  <span>Articles Published</span>
                  <span className="font-semibold">{summary.articles}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-red-500 px-4 py-3">
                  <span>Breaking Alerts</span>
                  <span className="font-semibold">{summary.breaking}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-indigo-500 px-4 py-3">
                  <span>Community Updates</span>
                  <span className="font-semibold">{summary.updates}</span>
                </div>
              </div>
            </div>

            {/* Subscribe */}
            <div className="glass-panel p-5 shadow-card">
              <p className="text-sm font-semibold text-white">Stay Updated</p>
              <p className="mt-2 text-xs text-slateSoft">
                Subscribe to get instant notifications for breaking news and alerts.
              </p>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-tealGlow px-4 py-3 text-sm font-semibold text-night shadow-glow hover:bg-tealGlow/90 transition">
                <Newspaper className="h-4 w-4" />
                Subscribe To Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </CitizenShell>
  );
}

