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
            <div key={s.label} className={`rounded-3xl ${s.color} px-5 py-5 text-white shadow-md`}>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/15">
                    {s.icon}
                  </div>
                  <p className="text-[11px] font-semibold text-white/90">{s.label}</p>
                  <p className="text-2xl font-semibold">{s.value}</p>
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
              <div className="rounded-3xl bg-white p-4 shadow-md">
                <button
                  className="w-full rounded-2xl bg-[#0b1020] px-4 py-3 text-sm font-semibold text-white"
                  onClick={() => setIsComposerOpen(true)}
                >
                  + Share your Story
                </button>
              </div>
            )}

            {/* Share your story (composer card like screenshot) */}
            {isComposerOpen && (
              <div className="rounded-3xl bg-white p-5 shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">Share your Story</p>
                  <button
                    className="rounded-full p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
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
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                    placeholder="Story title..."
                  />
                  <textarea
                    value={storyBody}
                    onChange={(e) => setStoryBody(e.target.value)}
                    className="h-24 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                    placeholder="Tell your story... How has the community helped you? What inspiring acts have you witnessed"
                  />

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600"
                    >
                      <ImageIcon className="h-4 w-4" />
                      Add Photo
                    </button>
                  </div>

                  <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold sm:flex-1 ${
                        canShare ? "bg-[#0b1020] text-white" : "bg-slate-200 text-slate-500 cursor-not-allowed"
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
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 sm:w-40"
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
              <article key={p.id} className="overflow-hidden rounded-3xl bg-white shadow-md">
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{p.author}</p>
                      <p className="text-[11px] text-slate-400">{p.time}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-500">
                    {p.tag}
                  </span>
                </div>

                <div className="space-y-3 px-5 pb-4">
                  <h3 className="text-sm font-semibold text-slate-900">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-600">{p.body}</p>
                </div>

                <div className="relative h-48 w-full bg-slate-100">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>

                <div className="flex items-center gap-6 px-5 py-4 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <Heart className="h-4 w-4" /> {p.likes}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> {p.comments}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Share2 className="h-4 w-4" /> {p.shares}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs">
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-slate-700 shadow-sm">
                    <Heart className="h-4 w-4" /> Like
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-slate-700 shadow-sm">
                    <MessageCircle className="h-4 w-4" /> Comment
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-slate-700 shadow-sm">
                    <Share2 className="h-4 w-4" /> Share
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-5 shadow-md">
              <p className="text-sm font-semibold text-slate-900">Popular Topics</p>
              <div className="mt-4 space-y-2">
                {topics.map((t) => (
                  <div
                    key={t}
                    className="rounded-2xl bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-md">
              <p className="text-sm font-semibold text-slate-900">Community Guidelines</p>
              <ul className="mt-4 space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                  Be respectful and supportive
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                  Share authentic experiences
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                  No misinformation
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
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

