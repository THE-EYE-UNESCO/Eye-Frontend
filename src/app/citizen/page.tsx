"use client";

import { Bell, MessageCircle, Phone, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CitizenShell } from "./_components/CitizenShell";
import { api } from "@/lib/api";
import ImageCarousel from "@/components/ImageCarousel";

const safety = [
  "Keep emergency kit ready",
  "Stay away from affected area",
  "Monitor official updates",
  "Help elderly and disabled neighbors",
];

interface Story {
  id: string;
  author_name: string;
  title: string;
  body: string;
  image_url?: string;
  tag?: string;
  created_at: string;
}

interface Report {
  id: string;
  title: string;
  category: string;
  address: string;
  created_at: string;
  severity: string;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url?: string;
}

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: string;
  affectedArea: string;
}

interface Report {
  id: string;
  title: string;
  category: string;
  address: string;
  created_at: string;
  severity: string;
}

export default function CitizenDashboard() {
  const [stories, setStories] = useState<Story[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storiesData, newsData, alertsData, reportsData] =
          await Promise.all([
            api.get("/stories"),
            api.get("/news"),
            api.get("/alerts"),
            api.get("/reports"),
          ]);

        setStories(storiesData.stories.slice(0, 2));
        setNews(newsData.news || []);
        setAlerts(alertsData.alerts.slice(0, 3) || []);
        setReports(reportsData.items.slice(0, 5) || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const carouselSlides = news.map((item) => ({
    id: item.id,
    image: item.image_url || "/sample-crisis.png",
    title: item.title,
    description: item.content,
    alertType: item.category,
    alertColor: "bg-tealGlow",
  }));

  const currentSlide = carouselSlides[currentSlideIndex] || {
    title: "Stay Informed",
    description:
      "Connect with your community and stay safe with real-time updates.",
    alertType: "Info",
    alertColor: "bg-tealGlow",
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toUpperCase()) {
      case "CRITICAL":
        return "bg-red-500";
      case "HIGH":
        return "bg-orange-500";
      case "MEDIUM":
        return "bg-amber-400";
      case "LOW":
        return "bg-emerald-400";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <CitizenShell
      title={
        <span>
          Welcome To <span className="font-bold">The Eye</span>
        </span>
      }
      subtitle={
        <span className="text-slateSoft">
          Stay informed, stay safe. Real-time crisis updates for your community.
        </span>
      }
    >
      <div className="space-y-6">
        <div className="overflow-hidden glass-panel shadow-card">
          {news.length > 0 ? (
            <ImageCarousel
              slides={carouselSlides}
              autoPlay={true}
              interval={5000}
              onSlideChange={(slide) => {
                const index = carouselSlides.findIndex(
                  (s) => s.id === slide.id,
                );
                if (index !== -1) setCurrentSlideIndex(index);
              }}
            />
          ) : (
            <div className="h-64 bg-card-bg flex items-center justify-center animate-pulse">
              <p className="text-text-muted">Loading latest news...</p>
            </div>
          )}

          <div className="space-y-3 px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
              LATEST UPDATE
            </p>
            <h2 className="text-xl font-semibold text-text-primary">
              {currentSlide.title}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
              {currentSlide.description}
            </p>
          </div>

          {/* Alert tags row */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 border-t border-card-border bg-bg-secondary px-4 sm:px-6 py-4 text-sm">
            {alerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between rounded-2xl bg-card-bg border border-card-border px-4 py-3 shadow-sm hover:border-tealGlow/30 transition-colors"
              >
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-semibold text-text-primary truncate">
                    {alert.affectedArea}
                  </p>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider truncate">
                    {alert.title.split(":")[1]?.trim() || alert.title}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white whitespace-nowrap ml-2 ${getSeverityColor(alert.severity).replace("bg-", "bg-opacity-90 bg-")}`}
                >
                  {alert.severity}
                </span>
              </div>
            ))}
            {alerts.length === 0 && !loading && (
              <div className="col-span-3 text-center py-2">
                <p className="text-[10px] text-text-muted italic">
                  No active AI alerts at this time.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Middle row: stories + side actions */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(260px,0.9fr)]">
          {/* Community stories */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <p className="font-semibold text-text-primary">
                Community Stories
              </p>
              <Link
                href="/citizen/community"
                className="text-sm text-tealGlow hover:opacity-80 transition font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {loading
                ? Array(2)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="h-48 rounded-2xl bg-card-bg border border-card-border animate-pulse"
                      />
                    ))
                : stories.map((story) => (
                    <article
                      key={story.id}
                      className="overflow-hidden rounded-2xl bg-card-bg border border-card-border shadow-sm hover:border-tealGlow/30 transition flex flex-col"
                    >
                      <div className="relative h-32 w-full bg-card-border/10">
                        {story.image_url ? (
                          <Image
                            src={story.image_url}
                            alt={story.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-text-muted">
                            <MessageCircle className="h-8 w-8 opacity-20" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-1.5 px-4 py-3 flex-grow">
                        <div className="flex items-center justify-between text-[10px] text-tealGlow font-bold uppercase tracking-wider mb-1">
                          <span>{story.tag || "Community"}</span>
                          <span className="text-text-muted font-medium">
                            {new Date(story.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-text-primary leading-snug line-clamp-1">
                          {story.title}
                        </h3>
                        <p className="text-xs text-text-secondary line-clamp-2">
                          {story.body}
                        </p>
                      </div>
                    </article>
                  ))}
              {!loading && stories.length === 0 && (
                <div className="col-span-2 rounded-2xl border border-dashed border-card-border p-8 text-center">
                  <p className="text-xs text-text-muted italic">
                    No community stories shared yet.
                  </p>
                </div>
              )}
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
                  href="/citizen/report"
                />
                <ActionButton
                  icon={<FileText className="h-4 w-4" />}
                  label="View My Reports"
                  href="/citizen/my-reports"
                />
                <ActionButton
                  icon={<Phone className="h-4 w-4" />}
                  label="Emergency Contacts"
                  href="/citizen/emergency"
                />
                <ActionButton
                  icon={<Bell className="h-4 w-4" />}
                  label="IVR"
                  href="/citizen/ivr"
                />
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
        <div className="glass-panel px-4 sm:px-5 py-4 text-sm text-text-secondary shadow-card overflow-hidden">
          <p className="text-sm font-semibold text-text-primary mb-4">
            Crisis Breakdown
          </p>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="min-w-[600px] w-full border-separate border-spacing-y-2 text-sm">
              <thead className="text-[10px] text-text-muted uppercase tracking-wider">
                <tr>
                  <th className="text-left font-semibold px-3">Crisis</th>
                  <th className="text-left font-semibold px-3">Location</th>
                  <th className="text-left font-semibold px-3">Date – Time</th>
                  <th className="text-left font-semibold px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((row) => (
                  <tr
                    key={row.id}
                    className="rounded-xl bg-card-bg border border-card-border hover:bg-white/5 transition-colors group"
                  >
                    <td className="rounded-l-2xl px-3 py-4 text-text-primary font-bold">
                      {row.category.charAt(0).toUpperCase() +
                        row.category.slice(1)}
                    </td>
                    <td className="px-3 py-4 text-text-secondary">
                      {row.address || "Kigali"}
                    </td>
                    <td className="px-3 py-4 text-text-muted text-xs">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="rounded-r-2xl px-3 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white ${getSeverityColor(row.severity)}`}
                      >
                        {row.severity}
                      </span>
                    </td>
                  </tr>
                ))}
                {!loading && reports.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-8 text-text-muted italic"
                    >
                      No crisis data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 md:hidden text-[10px] text-center text-text-muted italic flex items-center justify-center gap-2">
            <span>← Swipe to see more →</span>
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
  href,
}: {
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex items-center gap-2 text-xs">
        {icon}
        <span>{label}</span>
      </span>
      <span
        className={`text-[10px] ${primary ? "text-night/70" : "text-text-muted"}`}
      >
        →
      </span>
    </>
  );

  const className = `flex w-full items-center justify-between rounded-2xl px-3 py-3 transition hover:scale-[1.02] ${
    primary
      ? "bg-tealGlow text-night font-semibold shadow-glow-button"
      : "bg-card-bg hover:bg-card-border/20 text-text-primary border border-card-border"
  }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <button className={className}>{content}</button>;
}
