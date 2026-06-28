"use client";

import { Bell, MessageCircle, Phone, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CitizenShell } from "./_components/CitizenShell";
import { CitizenSectionCard } from "./_components/CitizenSectionCard";
import { api } from "@/lib/api";
import ImageCarousel from "@/components/ImageCarousel";
import {
  CitizenAlert,
  CitizenNewsItem,
  CitizenReport,
  CitizenStory,
  DashboardSlide,
  SAFETY_GUIDANCE,
  formatAlertTitle,
  normalizeArray,
  severityBadgeClass,
} from "./_lib/dashboard";

export default function CitizenDashboard() {
  const [stories, setStories] = useState<CitizenStory[]>([]);
  const [news, setNews] = useState<CitizenNewsItem[]>([]);
  const [alerts, setAlerts] = useState<CitizenAlert[]>([]);
  const [reports, setReports] = useState<CitizenReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredNewsId, setFeaturedNewsId] = useState<string | null>(null);

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

        const storyItems = normalizeArray<CitizenStory>(storiesData?.stories);
        const newsItems = normalizeArray<CitizenNewsItem>(newsData?.news);
        const alertItems = normalizeArray<CitizenAlert>(alertsData?.alerts);
        const reportItems = normalizeArray<CitizenReport>(reportsData?.items);

        setStories(storyItems.slice(0, 2));
        setNews(newsItems);
        setAlerts(alertItems.slice(0, 3));
        setReports(reportItems.slice(0, 5));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const carouselSlides: DashboardSlide[] = news.map((item) => ({
    id: item.id,
    image: item.image_url || "/sample-crisis.png",
    title: item.title,
    description: item.content,
    alertType: item.category,
    alertColor: "bg-tealGlow",
  }));

  const currentSlide = carouselSlides.find((slide) => slide.id === featuredNewsId) || carouselSlides[0] || {
    title: "Stay Informed",
    description:
      "Connect with your community and stay safe with real-time updates.",
    alertType: "Info",
    alertColor: "bg-tealGlow",
  };

  const safeAlerts = Array.isArray(alerts) ? alerts : [];
  const safeStories = Array.isArray(stories) ? stories : [];
  const safeReports = Array.isArray(reports) ? reports : [];

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
                setFeaturedNewsId(slide.id);
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
            {safeAlerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between rounded-md bg-card-bg border border-card-border px-4 py-3 shadow-sm hover:border-tealGlow/30 transition-colors"
              >
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-semibold text-text-primary truncate">
                    {alert.affectedArea}
                  </p>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider truncate">
                    {formatAlertTitle(alert.title)}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white whitespace-nowrap ml-2 ${severityBadgeClass(alert.severity).replace("bg-", "bg-opacity-90 bg-")}`}
                >
                  {alert.severity}
                </span>
              </div>
            ))}
            {safeAlerts.length === 0 && !loading && (
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
                      <div key={i} className="h-48 rounded-md bg-card-bg border border-card-border animate-pulse" />
                    ))
                : safeStories.map((story) => (
                    <article
                      key={story.id}
                      className="overflow-hidden rounded-md bg-card-bg border border-card-border shadow-sm hover:border-tealGlow/30 transition flex flex-col"
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
              {!loading && safeStories.length === 0 && (
                <div className="col-span-2 rounded-md border border-dashed border-card-border p-8 text-center">
                  <p className="text-xs text-text-muted italic">
                    No community stories shared yet.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Take action + safety */}
          <div className="space-y-4">
            <CitizenSectionCard
              title="Take Action"
              className="bg-tealGlow/10 border-tealGlow/20 text-text-primary"
            >
              <div className="px-5 py-4">
                <div className="space-y-2 text-sm">
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
            </CitizenSectionCard>

            <CitizenSectionCard title="Safety Guidance">
              <div className="px-5 py-4 text-sm text-text-secondary">
                <ul className="space-y-2">
                  {SAFETY_GUIDANCE.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between rounded-md bg-card-bg border border-card-border px-3 py-2"
                    >
                      <span className="text-xs">{item}</span>
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </li>
                  ))}
                </ul>
              </div>
            </CitizenSectionCard>
          </div>
        </div>

        {/* Crisis breakdown table */}
        <CitizenSectionCard title="Crisis Breakdown">
          <div className="px-4 sm:px-5 py-4 text-sm text-text-secondary overflow-hidden">
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
                  {safeReports.map((row) => (
                    <tr
                      key={row.id}
                      className="rounded-md bg-card-bg border border-card-border hover:bg-white/5 transition-colors group"
                    >
                      <td className="rounded-l-md px-3 py-4 text-text-primary font-bold">
                        {row.category
                          ? row.category.charAt(0).toUpperCase() + row.category.slice(1)
                          : "Unknown"}
                      </td>
                      <td className="px-3 py-4 text-text-secondary">
                        {row.address || "Kigali"}
                      </td>
                      <td className="px-3 py-4 text-text-muted text-xs">
                        {new Date(row.created_at).toLocaleString()}
                      </td>
                      <td className="rounded-r-md px-3 py-4">
                        <span
                          className={`inline-flex items-center rounded-md px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white ${severityBadgeClass(row.severity)}`}
                        >
                          {row.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!loading && safeReports.length === 0 && (
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
        </CitizenSectionCard>
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
