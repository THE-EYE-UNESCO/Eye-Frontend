"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, ArrowRight, Newspaper } from "lucide-react";
import { CitizenShell } from "../_components/CitizenShell";
import { api } from "@/lib/api";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category?: string;
  created_at: string;
}

function getTimeAgo(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now.getTime() - then.getTime()) / 60000);
  if (diff < 60) return `${diff}m ago`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await api.get("/news?limit=20");
        setNews(data.news || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const heroArticle = news[0];
  const breakingNews = news.slice(1);

  return (
    <CitizenShell
      title="News & Updates"
      subtitle="Latest emergency updates and community news"
    >
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-tealGlow border-t-transparent" />
          </div>
        ) : news.length === 0 ? (
          <div className="glass-panel flex flex-col items-center justify-center py-20 text-center">
            <Newspaper className="h-12 w-12 text-tealGlow/30 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-text-primary">No news yet</h3>
            <p className="text-sm text-text-secondary mt-2">
              Emergency updates and alerts will appear here when published.
            </p>
          </div>
        ) : (
          <>
            {/* Hero article */}
            {heroArticle && (
              <div className="overflow-hidden glass-panel shadow-card">
                <div className="space-y-3 px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
                    {heroArticle.category || "Breaking Alert"}
                  </p>
                  <h2 className="text-lg font-semibold text-text-primary">
                    {heroArticle.title}
                  </h2>
                  <p className="text-xs text-text-secondary line-clamp-3">
                    {heroArticle.content}
                  </p>
                  <p className="text-[10px] text-text-muted">
                    {getTimeAgo(heroArticle.created_at)}
                  </p>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="glass-panel px-5 py-3 shadow-card">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="text-text-muted">Filter by category:</span>
                <button className="rounded-full bg-red-500 px-3 py-1 text-[11px] font-semibold text-white shadow-glow-red hover:opacity-90 transition">
                  All News
                </button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)]">
              {/* Left: Breaking news list */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-text-primary">
                  Latest Updates
                </p>

                {breakingNews.length === 0 ? (
                  <div className="glass-panel p-6 text-sm text-text-muted">
                    No additional articles.
                  </div>
                ) : (
                  breakingNews.map((item) => (
                    <article
                      key={item.id}
                      className="overflow-hidden glass-panel shadow-card"
                    >
                      <div className="space-y-3 px-5 py-4">
                        <div className="flex flex-wrap items-center gap-2 text-[10px]">
                          {item.category && (
                            <span className="rounded-full bg-red-500 text-white px-2 py-1 font-semibold uppercase">
                              {item.category}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-semibold text-text-primary">
                          {item.title}
                        </h3>
                        <p className="text-xs leading-relaxed text-text-secondary line-clamp-2">
                          {item.content}
                        </p>
                        <div className="flex flex-wrap gap-4 text-[10px] text-text-muted">
                          <span>{getTimeAgo(item.created_at)}</span>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>

              {/* Right sidebar */}
              <div className="space-y-5">
                {/* Summary */}
                <div className="glass-panel p-5 shadow-card">
                  <p className="text-sm font-semibold text-text-primary">
                    Today&apos;s Summary
                  </p>
                  <div className="mt-4 space-y-3 text-xs">
                    <div className="flex items-center justify-between rounded-2xl border border-card-border bg-card-bg px-4 py-3 shadow-sm transition">
                      <span className="text-text-secondary">
                        Articles Published
                      </span>
                      <span className="font-semibold text-text-primary">
                        {news.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-red-500 px-4 py-3 text-white shadow-glow-red">
                      <span className="font-medium">Breaking Alerts</span>
                      <span className="font-bold">
                        {news.filter(
                          (n) =>
                            n.category?.toLowerCase().includes("alert") ||
                            n.category?.toLowerCase().includes("breaking"),
                        ).length || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subscribe */}
                <div className="glass-panel p-5 shadow-card">
                  <p className="text-sm font-semibold text-text-primary">
                    Stay Updated
                  </p>
                  <p className="mt-2 text-xs text-text-muted">
                    Subscribe to get instant notifications for breaking news and
                    alerts.
                  </p>
                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-tealGlow px-4 py-3 text-sm font-semibold text-night shadow-glow-button hover:opacity-90 transition">
                    <Newspaper className="h-4 w-4" />
                    Subscribe To Alerts
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </CitizenShell>
  );
}
