"use client";

import React, { useMemo, useState } from "react";
import { CitizenShell } from "../_components/CitizenShell";
import {
  Heart,
  MessageCircle,
  Share2,
  Users,
  HeartHandshake,
  MessagesSquare,
  Share,
  Image as ImageIcon,
  Send,
  X,
} from "lucide-react";
import Image from "next/image";

const stats = [
  { label: "Active Members", value: "12,456", color: "bg-violet-600", icon: <Users className="h-5 w-5 text-white" /> },
  { label: "Stories Shared", value: "3,829", color: "bg-fuchsia-500", icon: <HeartHandshake className="h-5 w-5 text-white" /> },
  { label: "Comments", value: "8,945", color: "bg-blue-600", icon: <MessagesSquare className="h-5 w-5 text-white" /> },
  { label: "Shares", value: "5,234", color: "bg-green-700", icon: <Share className="h-5 w-5 text-white" /> },
];

const topics = [
  "#CommunitySupport",
  "#ReliefEfforts",
  "#SafetyFirst",
  "#TogetherWeStand",
  "#EmergencyResponse",
];

const posts = [
  {
    id: "p1",
    author: "Sarah Johnson",
    time: "1 hour ago",
    title: "Our Shelter Experience – A Story of Hope",
    body:
      "When the flood warning came, we were scared. But the emergency response team was incredible. They evacuated us safely and the shelter had everything we needed — food, medical care, and most importantly, human kindness. Thank you to all the volunteers! 🙏",
    image: "/community1.png",
    likes: 324,
    comments: 28,
    shares: 45,
    tag: "relief story",
  },
  {
    id: "p2",
    author: "Michael Chen",
    time: "3 hours ago",
    title: "Neighbors Helping Neighbors",
    body:
      "Yesterday, I witnessed something beautiful. When Ms. Rodriguez couldn’t evacuate on her own, three neighbors immediately stepped up to help. This is what community means. We look out for each other. ❤️",
    image: "/police.png",
    likes: 324,
    comments: 28,
    shares: 45,
    tag: "community support",
  },
];

export default function CommunityHubPage() {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyBody, setStoryBody] = useState("");

  const canShare = useMemo(() => storyTitle.trim() && storyBody.trim(), [storyTitle, storyBody]);

  return (
    <CitizenShell
      title="Community Hub"
      subtitle="Share your story, support others, and strengthen our community"
    >
      <div className="space-y-6">
        {/* Top stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className={`rounded-3xl ${s.color} px-5 py-5 text-white shadow-md transition-transform hover:scale-[1.02]`}>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    {s.icon}
                  </div>
                  <p className="text-[11px] font-semibold text-white/90">{s.label}</p>
                  <p className="text-2xl font-semibold leading-tight">{s.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)]">
          {/* Left column */}
          <div className="space-y-6">
            {/* Share your story (button) */}
            {!isComposerOpen && (
              <div className="glass-panel p-4 shadow-card">
                <button
                  className="w-full rounded-2xl bg-tealGlow px-4 py-3 text-sm font-semibold text-night shadow-glow-button hover:opacity-90 transition"
                  onClick={() => setIsComposerOpen(true)}
                >
                  + Share your Story
                </button>
              </div>
            )}

            {/* Share your story (composer card like screenshot) */}
            {isComposerOpen && (
              <div className="glass-panel p-5 shadow-card animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-text-primary">Share your Story</p>
                  <button
                    className="rounded-full p-2 text-text-muted hover:bg-card-border/20 hover:text-text-primary transition"
                    onClick={() => setIsComposerOpen(false)}
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  <input
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                    className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-xs text-text-primary placeholder:text-text-muted focus:border-tealGlow/50 focus:outline-none transition shadow-sm"
                    placeholder="Story title..."
                  />
                  <textarea
                    value={storyBody}
                    onChange={(e) => setStoryBody(e.target.value)}
                    className="h-24 w-full resize-none rounded-xl border border-card-border bg-card-bg px-4 py-3 text-xs text-text-primary placeholder:text-text-muted focus:border-tealGlow/50 focus:outline-none transition shadow-sm"
                    placeholder="Tell your story... How has the community helped you? What inspiring acts have you witnessed"
                  />

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl bg-card-bg border border-card-border px-3 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-card-border/10 transition shadow-sm"
                    >
                      <ImageIcon className="h-4 w-4 text-tealGlow" />
                      Add Photo
                    </button>
                  </div>

                  <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold sm:flex-1 transition ${
                        canShare ? "bg-tealGlow text-night shadow-glow-button hover:opacity-90" : "bg-card-bg text-text-muted cursor-not-allowed border border-card-border"
                      }`}
                      disabled={!canShare}
                      onClick={() => {
                        // For now just close; later we can add to feed state.
                        setIsComposerOpen(false);
                        setStoryTitle("");
                        setStoryBody("");
                      }}
                    >
                      <Send className="h-4 w-4" />
                      Share Story
                    </button>
                    <button
                      className="w-full rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-sm font-semibold text-text-secondary sm:w-40 hover:bg-card-border/10 transition shadow-sm"
                      onClick={() => {
                        setIsComposerOpen(false);
                        setStoryTitle("");
                        setStoryBody("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Feed */}
            {posts.map((p) => (
              <article key={p.id} className="overflow-hidden glass-panel shadow-card">
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-card-border" />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{p.author}</p>
                      <p className="text-[11px] text-text-muted">{p.time}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-[10px] font-semibold text-text-muted shadow-sm">
                    {p.tag}
                  </span>
                </div>

                <div className="space-y-3 px-5 pb-4">
                  <h3 className="text-sm font-semibold text-text-primary">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-text-secondary">{p.body}</p>
                </div>

                <div className="relative h-48 w-full bg-slate-100">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>

                <div className="flex items-center gap-6 px-5 py-4 text-[11px] text-text-muted">
                  <span className="inline-flex items-center gap-2 cursor-pointer hover:text-red-500 transition">
                    <Heart className="h-4 w-4" /> {p.likes}
                  </span>
                  <span className="inline-flex items-center gap-2 cursor-pointer hover:text-tealGlow transition">
                    <MessageCircle className="h-4 w-4" /> {p.comments}
                  </span>
                  <span className="inline-flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
                    <Share2 className="h-4 w-4" /> {p.shares}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-card-border bg-card-bg/50 px-5 py-3 text-xs">
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-card-bg hover:bg-card-border/20 px-3 py-2 text-text-secondary shadow-sm transition">
                    <Heart className="h-4 w-4 text-red-500" /> Like
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-card-bg hover:bg-card-border/20 px-3 py-2 text-text-secondary shadow-sm transition">
                    <MessageCircle className="h-4 w-4 text-tealGlow" /> Comment
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-card-bg hover:bg-card-border/20 px-3 py-2 text-text-secondary shadow-sm transition">
                    <Share2 className="h-4 w-4 text-blue-500" /> Share
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="glass-panel p-5 shadow-card">
              <p className="text-sm font-semibold text-text-primary">Popular Topics</p>
              <div className="mt-4 space-y-2">
                {topics.map((t) => (
                  <div
                    key={t}
                    className="rounded-2xl bg-card-bg border border-card-border px-4 py-3 text-xs font-semibold text-text-secondary hover:text-text-primary hover:border-tealGlow/50 hover:bg-card-border/10 transition cursor-pointer shadow-sm"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 shadow-card">
              <p className="text-sm font-semibold text-text-primary">Community Guidelines</p>
              <ul className="mt-4 space-y-3 text-xs text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-tealGlow shadow-glow" />
                  Be respectful and supportive
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-tealGlow shadow-glow" />
                  Share authentic experiences
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-tealGlow shadow-glow" />
                  No misinformation
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-tealGlow shadow-glow" />
                  Protect privacy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </CitizenShell>
  );
}

