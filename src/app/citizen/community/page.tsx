'use client';
import React, { useEffect, useMemo, useState } from "react";
import { CitizenShell } from "../_components/CitizenShell";
import { api } from "@/lib/api";
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
  Loader2,
  Edit,
  Trash2
} from "lucide-react";
import Image from "next/image";

interface Story {
  id: string;
  citizen_id: string;
  author_name: string;
  title: string;
  body: string;
  image_url?: string;
  tag?: string;
  likes_count: number;
  comments_count: number;
  user_has_liked: boolean;
  created_at: string;
}

const stats = [
  { key: "activeMembers", label: "Active Members", color: "bg-violet-600", icon: <Users className="h-5 w-5 text-white" /> },
  { key: "storiesShared", label: "Stories Shared", color: "bg-fuchsia-500", icon: <HeartHandshake className="h-5 w-5 text-white" /> },
  { key: "commentsCount", label: "Comments", color: "bg-blue-600", icon: <MessagesSquare className="h-5 w-5 text-white" /> },
  { key: "sharesCount", label: "Shares", color: "bg-green-700", icon: <Share className="h-5 w-5 text-white" /> },
];

const topics = [
  "#CommunitySupport",
  "#ReliefEfforts",
  "#SafetyFirst",
  "#TogetherWeStand",
  "#EmergencyResponse",
];

export default function CommunityHubPage() {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyBody, setStoryBody] = useState("");
  const [storyTag, setStoryTag] = useState("relief story");
  
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [activeCommentsStoryId, setActiveCommentsStoryId] = useState<string | null>(null);
  const [storyComments, setStoryComments] = useState<Record<string, any[]>>({});
  const [newComment, setNewComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [communityStats, setCommunityStats] = useState({
    activeMembers: "...",
    storiesShared: "...",
    commentsCount: "...",
    sharesCount: "..."
  });

  useEffect(() => {
    fetchStories();
    fetchStats();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserId(user.id);
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
  }, []);

  const fetchStories = async () => {
    try {
      const data = await api.get("/stories");
      setStories(data.stories);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await api.get("/stories/stats");
      setCommunityStats({
        activeMembers: data.activeMembers.toLocaleString(),
        storiesShared: data.storiesShared.toLocaleString(),
        commentsCount: data.commentsCount.toLocaleString(),
        sharesCount: data.sharesCount.toLocaleString()
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleShareStory = async () => {
    if (!canShare) return;
    setIsSharing(true);
    try {
      if (editingStoryId) {
        await api.put(`/stories/${editingStoryId}`, {
          title: storyTitle,
          body: storyBody,
          tag: storyTag,
          image_url: selectedImage
        });
        setEditingStoryId(null);
      } else {
        await api.post("/stories", {
          title: storyTitle,
          body: storyBody,
          tag: storyTag,
          image_url: selectedImage
        });
      }
      setIsComposerOpen(false);
      setStoryTitle("");
      setStoryBody("");
      setSelectedImage(null);
      fetchStories();
    } catch (error) {
      console.error("Error sharing/updating story:", error);
      alert("Failed to share story.");
    } finally {
      setIsSharing(false);
    }
  };

  const handleDeleteStory = async (storyId: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    try {
      await api.delete(`/stories/${storyId}`);
      fetchStories();
    } catch (error) {
      console.error("Error deleting story:", error);
      alert("Failed to delete story.");
    }
  };

  const handleEditStory = (story: Story) => {
    setEditingStoryId(story.id);
    setStoryTitle(story.title);
    setStoryBody(story.body);
    setStoryTag(story.tag || "relief story");
    setSelectedImage(story.image_url || null);
    setIsComposerOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchComments = async (storyId: string) => {
    try {
      const data = await api.get(`/stories/${storyId}/comments`);
      setStoryComments(prev => ({ ...prev, [storyId]: data.comments }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePostComment = async (storyId: string) => {
    if (!newComment.trim()) return;
    setIsPostingComment(true);
    try {
      await api.post(`/stories/${storyId}/comments`, { body: newComment });
      setNewComment("");
      fetchComments(storyId);
      // Update local count
      setStories(stories.map(s => s.id === storyId ? { ...s, comments_count: Number(s.comments_count) + 1 } : s));
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsPostingComment(false);
    }
  };

  const handleLike = async (storyId: string, hasLiked: boolean) => {
    try {
      if (hasLiked) {
        await api.delete(`/stories/${storyId}/like`);
      } else {
        await api.post(`/stories/${storyId}/like`, {});
      }
      // Optimistic update
      setStories(stories.map(s => {
        if (s.id === storyId) {
          return {
            ...s,
            user_has_liked: !hasLiked,
            likes_count: hasLiked ? s.likes_count - 1 : s.likes_count + 1
          };
        }
        return s;
      }));
    } catch (error) {
      console.error("Error liking story:", error);
    }
  };

  const handleShare = (storyTitle: string) => {
    if (navigator.share) {
      navigator.share({
        title: "The Eye Community Story",
        text: `Check out this story on The Eye: ${storyTitle}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const canShare = useMemo(() => storyTitle.trim() && storyBody.trim(), [storyTitle, storyBody]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
                  <p className="text-2xl font-semibold leading-tight">
                    {communityStats[s.key as keyof typeof communityStats]}
                  </p>
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
                  <p className="text-sm font-semibold text-text-primary">
                    {editingStoryId ? "Edit your Story" : "Share your Story"}
                  </p>
                  <button
                    className="rounded-full p-2 text-text-muted hover:bg-card-border/20 hover:text-text-primary transition"
                    onClick={() => {
                      setIsComposerOpen(false);
                      setEditingStoryId(null);
                      setStoryTitle("");
                      setStoryBody("");
                      setSelectedImage(null);
                    }}
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
                  
                  <div className="flex flex-wrap gap-2">
                    {["relief story", "community support", "safety tip", "hero story"].map(t => (
                      <button
                        key={t}
                        onClick={() => setStoryTag(t)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                          storyTag === t ? "bg-tealGlow text-night" : "bg-card-bg text-text-muted border border-card-border hover:border-tealGlow/30"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {selectedImage && (
                    <div className="relative h-40 w-full overflow-hidden rounded-xl border border-card-border shadow-sm">
                      <Image src={selectedImage} alt="Preview" fill className="object-cover" />
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute right-2 top-2 rounded-full bg-night/50 p-1.5 text-white backdrop-blur-sm transition hover:bg-night/70"
                        title="Remove photo"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <input
                      type="file"
                      accept="image/*"
                      id="community-photo-upload"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="community-photo-upload"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-card-bg border border-card-border px-3 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-card-border/10 transition shadow-sm"
                    >
                      <ImageIcon className="h-4 w-4 text-tealGlow" />
                      {selectedImage ? "Change Photo" : "Add Photo"}
                    </label>
                  </div>

                  <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold sm:flex-1 transition ${
                        canShare ? "bg-tealGlow text-night shadow-glow-button hover:opacity-90" : "bg-card-bg text-text-muted cursor-not-allowed border border-card-border"
                      }`}
                      disabled={!canShare || isSharing}
                      onClick={handleShareStory}
                    >
                      {isSharing ? <Loader2 className="h-4 w-4 animate-spin" /> : editingStoryId ? <Edit className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                      {editingStoryId ? "Update Story" : "Share Story"}
                    </button>
                    <button
                      className="w-full rounded-2xl border border-card-border bg-card-bg px-4 py-3 text-sm font-semibold text-text-secondary sm:w-40 hover:bg-card-border/10 transition shadow-sm"
                      onClick={() => {
                        setIsComposerOpen(false);
                        setEditingStoryId(null);
                        setStoryTitle("");
                        setStoryBody("");
                        setSelectedImage(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Feed */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-tealGlow" />
                <p className="mt-4 text-sm text-text-muted italic">Loading community stories...</p>
              </div>
            ) : stories.length === 0 ? (
              <div className="glass-panel text-center py-20 px-6">
                <MessagesSquare className="h-12 w-12 text-tealGlow/30 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-text-primary">No stories yet</h3>
                <p className="text-sm text-text-secondary mt-2">Become the first to share an inspiring story or experience with your community!</p>
              </div>
            ) : stories.map((p) => (
              <article key={p.id} className="overflow-hidden glass-panel shadow-card animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-tealGlow/10 flex items-center justify-center border border-tealGlow/20">
                      <span className="text-xs font-bold text-tealGlow">{p.author_name?.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{p.author_name}</p>
                      <p className="text-[11px] text-text-muted">{new Date(p.created_at).toLocaleDateString()} at {new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {userId === p.citizen_id && (
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleEditStory(p)}
                          className="p-1.5 rounded-lg hover:bg-card-border/20 text-text-muted hover:text-tealGlow transition"
                          title="Edit story"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteStory(p.id)}
                          className="p-1.5 rounded-lg hover:bg-card-border/20 text-text-muted hover:text-red-500 transition"
                          title="Delete story"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                    <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-[10px] font-semibold text-text-muted shadow-sm uppercase">
                      {p.tag}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 px-5 pb-4">
                  <h3 className="text-sm font-semibold text-text-primary">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-text-secondary">{p.body}</p>
                </div>

                {p.image_url && (
                  <div className="relative h-64 w-full bg-slate-900">
                    <Image src={p.image_url} alt={p.title} fill className="object-cover" />
                  </div>
                )}

                <div className="flex items-center gap-6 px-5 py-4 text-[11px] text-text-muted border-b border-card-border/50">
                  <span 
                    className={`inline-flex items-center gap-2 cursor-pointer transition ${p.user_has_liked ? 'text-red-500 font-bold' : 'hover:text-red-500'}`}
                    onClick={() => handleLike(p.id, p.user_has_liked)}
                  >
                    <Heart className={`h-4 w-4 ${p.user_has_liked ? 'fill-current' : ''}`} /> {p.likes_count}
                  </span>
                  <span 
                    className="inline-flex items-center gap-2 cursor-pointer hover:text-tealGlow transition"
                    onClick={() => {
                      if (activeCommentsStoryId === p.id) {
                        setActiveCommentsStoryId(null);
                      } else {
                        setActiveCommentsStoryId(p.id);
                        if (!storyComments[p.id]) fetchComments(p.id);
                      }
                    }}
                  >
                    <MessageCircle className="h-4 w-4" /> {p.comments_count}
                  </span>
                  <span 
                    className="inline-flex items-center gap-2 cursor-pointer hover:text-blue-500 transition"
                    onClick={() => handleShare(p.title)}
                  >
                    <Share2 className="h-4 w-4" /> Share
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-card-bg/30 px-5 py-2 text-xs border-b border-card-border/50">
                  <button 
                    className={`flex items-center justify-center gap-2 rounded-xl py-2 shadow-sm transition ${
                      p.user_has_liked ? 'bg-red-500 text-white shadow-glow' : 'bg-card-bg hover:bg-card-border/20 text-text-secondary'
                    }`}
                    onClick={() => handleLike(p.id, p.user_has_liked)}
                  >
                    <Heart className={`h-4 w-4 ${p.user_has_liked ? 'fill-current' : ''}`} /> {p.user_has_liked ? 'Liked' : 'Like'}
                  </button>
                  <button 
                    className={`flex items-center justify-center gap-2 rounded-xl py-2 shadow-sm transition ${
                      activeCommentsStoryId === p.id ? 'bg-tealGlow text-night shadow-glow' : 'bg-card-bg hover:bg-card-border/20 text-text-secondary'
                    }`}
                    onClick={() => {
                      if (activeCommentsStoryId === p.id) {
                        setActiveCommentsStoryId(null);
                      } else {
                        setActiveCommentsStoryId(p.id);
                        if (!storyComments[p.id]) fetchComments(p.id);
                      }
                    }}
                  >
                    <MessageCircle className="h-4 w-4" /> {activeCommentsStoryId === p.id ? 'Hide Comments' : 'Comment'}
                  </button>
                </div>

                {/* Comments Section */}
                {activeCommentsStoryId === p.id && (
                  <div className="bg-card-bg/20 px-5 py-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="space-y-3">
                      {storyComments[p.id]?.map((comment: any) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="h-8 w-8 rounded-full bg-tealGlow/10 flex items-center justify-center shrink-0 border border-tealGlow/20">
                            <span className="text-[10px] font-bold text-tealGlow">{comment.author_name?.charAt(0)}</span>
                          </div>
                          <div className="flex-grow space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-bold text-text-primary">{comment.author_name}</p>
                              <p className="text-[10px] text-text-muted">{new Date(comment.created_at).toLocaleDateString()}</p>
                            </div>
                            <p className="text-xs text-text-secondary">{comment.body}</p>
                          </div>
                        </div>
                      ))}
                      {storyComments[p.id]?.length === 0 && (
                        <p className="text-[11px] text-text-muted italic text-center py-2">No comments yet. Be the first to reply!</p>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <input 
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-grow bg-card-bg border border-card-border rounded-xl px-4 py-2 text-xs text-text-primary focus:outline-none focus:border-tealGlow/50"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handlePostComment(p.id);
                        }}
                      />
                      <button 
                        onClick={() => handlePostComment(p.id)}
                        disabled={!newComment.trim() || isPostingComment}
                        className="p-2 rounded-xl bg-tealGlow text-night disabled:opacity-50 transition"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
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

