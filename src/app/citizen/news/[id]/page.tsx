"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Tag,
  User,
  Newspaper,
  Share2,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Heart,
  MessageCircle,
  Eye,
  TrendingUp,
  Calendar,
  Link2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CitizenShell } from "../../_components/CitizenShell";
import { api } from "@/lib/api";
import { MOCK_NEWS, NewsItem } from "../page";

function getTimeAgo(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now.getTime() - then.getTime()) / 60000);
  if (diff < 60) return `${diff}m ago`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [related, setRelated] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      // 1. Try mock first (immediate)
      const mock = MOCK_NEWS.find((n) => n.id === id);
      if (mock) {
        setArticle(mock);
        setRelated(
          MOCK_NEWS.filter(
            (n) => n.id !== id && n.category === mock.category,
          ).slice(0, 3),
        );
        // Set mock engagement metrics
        setViewCount(Math.floor(Math.random() * 5000) + 100);
        setLikeCount(Math.floor(Math.random() * 200) + 10);
        setCommentCount(Math.floor(Math.random() * 50) + 2);
        setLoading(false);
        return;
      }
      // 2. Fall back to API
      try {
        const response = await api.get(`/news/${id}`);
        const data = response.news || response; // Handle both response formats
        const item: NewsItem = {
          ...data,
          summary: data.summary || data.content?.slice(0, 140) + "…",
          author: data.author || "The Eye Editorial",
          source: data.source || "The Eye",
          tags: data.tags || [],
          readingTime: data.readingTime || 2,
          color: data.color || "from-teal-700 to-teal-900",
        };
        setArticle(item);
        setRelated(
          MOCK_NEWS.filter((n) => n.category === item.category).slice(0, 3),
        );
      } catch {
        // nothing — show 404-ish state
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleShare = () => {
    if (navigator.share && article) {
      navigator
        .share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        })
        .catch(() => {});
    } else if (article) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // TODO: Call API to persist bookmark state
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    // TODO: Call API to persist like state
  };

  return (
    <CitizenShell title="Article" subtitle="Emergency news detail">
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-tealGlow border-t-transparent" />
        </div>
      ) : !article ? (
        <div className="glass-panel flex flex-col items-center justify-center py-24 text-center">
          <Newspaper className="h-12 w-12 text-tealGlow/30 mb-4" />
          <h3 className="text-lg font-bold text-text-primary">
            Article not found
          </h3>
          <Link
            href="/citizen/news"
            className="mt-4 text-sm text-tealGlow hover:underline"
          >
            ← Back to News
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Back nav */}
          <Link
            href="/citizen/news"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-tealGlow transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)]">
            {/* ── Main Article ── */}
            <div className="space-y-5">
              {/* Hero banner */}
              <div
                className={`rounded-3xl bg-gradient-to-br ${article.color} px-7 py-8 shadow-card`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  {article.category}
                </span>
                <h1 className="mt-2 text-2xl font-bold text-white leading-snug">
                  {article.title}
                </h1>
                <p className="mt-3 text-sm text-white/80">{article.summary}</p>
              </div>

              {/* Meta row */}
              <div className="glass-panel px-5 py-4 shadow-card">
                <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-tealGlow" />
                    <span className="font-medium text-text-primary">
                      {article.author}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                    {article.source}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readingTime} min read
                  </span>
                  <span className="ml-auto">
                    {formatDate(article.created_at)}
                  </span>
                </div>
              </div>

              {/* Article body */}
              <div className="glass-panel px-6 py-6 shadow-card">
                <div className="space-y-4">
                  {(article.content || '').split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-sm leading-7 text-text-secondary"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Tags + Engagement */}
              <div className="glass-panel px-5 py-4 shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {(article.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 rounded-md border border-card-border bg-card-bg px-2.5 py-1 text-[11px] text-text-muted"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleLike}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11px] font-semibold transition shadow-sm ${
                        liked 
                          ? 'border-red-500/30 bg-red-500/10 text-red-400' 
                          : 'border-card-border bg-card-bg text-text-primary hover:bg-card-border/20'
                      }`}
                    >
                      <Heart className={`h-3.5 w-3.5 ${liked ? 'fill-current' : ''}`} />
                      {likeCount}
                    </button>
                    <button
                      onClick={handleBookmark}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[11px] font-semibold transition shadow-sm ${
                        bookmarked 
                          ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' 
                          : 'border-card-border bg-card-bg text-text-primary hover:bg-card-border/20'
                      }`}
                    >
                      {bookmarked ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
                      {bookmarked ? 'Saved' : 'Save'}
                    </button>
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-card-border bg-card-bg px-3 py-1.5 text-[11px] font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      Share
                    </button>
                  </div>
                </div>
                
                {/* Engagement metrics */}
                <div className="mt-4 flex items-center gap-4 text-[11px] text-text-muted">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {viewCount.toLocaleString()} views
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {commentCount} comments
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Trending in {article.category || 'General'}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-5">
              {related.length > 0 && (
                <div className="glass-panel p-5 shadow-card">
                  <p className="text-sm font-semibold text-text-primary mb-4">
                    Related Articles
                  </p>
                  <div className="space-y-4">
                    {related.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/citizen/news/${rel.id}`}
                        className="block group"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-red-400">
                            {rel.category}
                          </span>
                          <p className="text-xs font-medium text-text-primary group-hover:text-tealGlow transition-colors leading-snug">
                            {rel.title}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-text-muted">
                            <Clock className="h-3 w-3" />
                            {rel.readingTime} min · {getTimeAgo(rel.created_at)}
                          </div>
                        </div>
                        {related.indexOf(rel) < related.length - 1 && (
                          <div className="mt-4 border-t border-card-border" />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="glass-panel p-5 shadow-card">
                <p className="text-sm font-semibold text-text-primary mb-4">
                  Quick Actions
                </p>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 rounded-2xl bg-tealGlow px-4 py-3 text-sm font-semibold text-night shadow-glow-button hover:opacity-90 transition">
                    <Newspaper className="h-4 w-4" />
                    Subscribe To Alerts
                  </button>
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-4 py-2.5 text-[12px] font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm">
                    <Link2 className="h-4 w-4" />
                    Copy Article Link
                  </button>
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-card-border bg-card-bg px-4 py-2.5 text-[12px] font-semibold text-text-primary hover:bg-card-border/20 transition shadow-sm">
                    <Calendar className="h-4 w-4" />
                    Add to Calendar
                  </button>
                </div>
              </div>

              <div className="glass-panel p-5 shadow-card">
                <p className="text-xs text-text-muted leading-relaxed">
                  Published {getTimeAgo(article.created_at)} · Source:{" "}
                  <span className="text-text-secondary font-medium">
                    {article.source || 'The Eye'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </CitizenShell>
  );
}
