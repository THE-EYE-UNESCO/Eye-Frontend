"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Clock, Newspaper, Tag, User } from "lucide-react";
import Link from "next/link";
import { CitizenShell } from "../_components/CitizenShell";
import { api } from "@/lib/api";

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  author: string;
  source: string;
  tags: string[];
  readingTime: number; // minutes
  created_at: string;
  color: string; // hero banner gradient key
}

// ─── Rich mock data ───────────────────────────────────────────────────────────
export const MOCK_NEWS: NewsItem[] = [
  {
    id: "mock-1",
    title: "City-Wide Flash Flood Warning Issued for Downtown District",
    summary:
      "Authorities have issued an urgent flash flood warning for the central business district following 12 hours of continuous heavy rain.",
    content: `Authorities have issued an urgent flash flood warning for the central business district following 12 hours of continuous heavy rain that has overwhelmed the city's drainage infrastructure.\n\nResidents living within 500 metres of the Lianga River are urged to evacuate immediately to designated shelters. The National Meteorological Office forecasts an additional 60–80 mm of rainfall over the next six hours, raising the flood risk to the highest level on record for March.\n\nEmergency response teams have been pre-positioned at strategic points across the affected area. Rescue boats are already deployed along Riverside Drive and Bayshore Avenue. All non-essential vehicle traffic has been suspended on low-lying roads until further notice.\n\nThe city's Emergency Management Office has opened 14 evacuation centres; the nearest is at the Civic Arena on Mabalacat Street. Citizens requiring transport assistance should call the emergency hotline at 117 or send an SMS to 1177.\n\nAuthorities stressed that unlike routine seasonal flooding, the current conditions carry a genuine risk to life and urged all residents to act without delay.`,
    category: "Flash Flood",
    author: "Maria Santos",
    source: "City Emergency Management Office",
    tags: ["Flood", "Evacuation", "Downtown", "Urgent"],
    readingTime: 3,
    created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    color: "from-blue-700 to-blue-900",
  },
  {
    id: "mock-2",
    title: "Evacuation Centres Reach 80% Capacity — New Sites Activated",
    summary:
      "As displacement numbers climb, the city activates three additional evacuation sites to accommodate arriving residents.",
    content: `With overnight displacement figures continuing to climb, city officials announced Thursday that existing evacuation centres have collectively reached 80% capacity, prompting the activation of three additional overflow sites.\n\nThe overflow sites — the Barangay Maliwalo Gymnasium, the Northfield Trade Fair Grounds, and the St. Agatha Parish Hall — opened their doors at 06:00 this morning and can accommodate a combined 2,400 displaced persons.\n\nSocial welfare teams are on site distributing food packs, hygiene kits, and blankets. Medical professionals from the Department of Health have been deployed to each location, with paediatric and elderly care units given priority resourcing.\n\nOfficials have appealed to private businesses and civic organisations to provide additional supplies or volunteer services. Donations may be dropped off at any of the active evacuation centres or coordinated through the Social Welfare hotline.\n\nDisplaced residents with special needs — including persons with disabilities, pregnant women, and those requiring dialysis — are prioritised for accommodation at the General Hospital's dedicated emergency ward.`,
    category: "Public Safety",
    author: "James Reyes",
    source: "Department of Social Welfare",
    tags: ["Evacuation", "Relief", "Shelter", "Capacity"],
    readingTime: 2,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    color: "from-amber-600 to-orange-800",
  },
  {
    id: "mock-3",
    title: "Power Grid Partial Restoration Complete in Zones 4, 7 & 9",
    summary:
      "Meralco repair crews have restored electricity to three key residential zones after a 14-hour outage caused by storm damage.",
    content: `Electric utility crews have successfully restored power to residential zones 4, 7, and 9 following a 14-hour outage caused by downed transmission lines and substation flooding during yesterday's severe storm system.\n\nApproximately 34,000 households have been reconnected as of 09:45 this morning. The utility's incident commander stated that crews worked through the night, prioritising areas hosting evacuation centres and medical facilities.\n\nZones 1, 2, and 6 remain without power and are expected to be restored by 18:00 tonight, weather conditions permitting. Zone 3 requires more extensive substation repairs and restoration there is projected for tomorrow morning.\n\nResidents are advised to check all appliances before power-up to avoid fire hazards caused by surge. Utility crews will pass through streets with megaphone announcements 10 minutes before each zone's power is restored.\n\nCustomers experiencing issues after restoration may report outages via the utility's app or the 24-hour hotline. The utility has waived reconnection fees for all customers affected by this emergency event.`,
    category: "Infrastructure",
    author: "Lorna Diaz",
    source: "City Utilities & Power Authority",
    tags: ["Power", "Infrastructure", "Storm", "Restoration"],
    readingTime: 2,
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    color: "from-yellow-600 to-yellow-900",
  },
  {
    id: "mock-4",
    title:
      "Health Department Issues Reminder on Flood-Water Disease Prevention",
    summary:
      "The DOH is reminding the public of critical hygiene measures and warning signs of leptospirosis as floodwaters recede.",
    content: `As floodwaters slowly recede in parts of the city, the Department of Health (DOH) is issuing a public advisory on disease prevention measures, particularly focused on leptospirosis and gastrointestinal infections which historically spike in the aftermath of flooding events.\n\nLeptospirosis — a bacterial infection spread through water contaminated by animal urine — poses the highest immediate risk to residents wading through or cleaning up floodwaters. The DOH urges anyone who has come into contact with floodwater to wash thoroughly with clean water and soap, and to seek medical attention immediately if they develop fever, severe headache, or muscle pain in the days that follow.\n\nDrinking water must be boiled for at least one minute before consumption. Any food that has come into contact with floodwater should be discarded. The DOH has established five free mobile health clinics positioned at the major evacuation centres to provide examinations, medications (including doxycycline prophylaxis for high-risk individuals), and tetanus vaccinations.\n\nParents are advised to keep children away from residual floodwater regardless of apparent depth. Open wounds should be covered with waterproof dressings before any exposure to flood areas during clean-up activities.\n\nThe DOH 24-hour health information hotline is available at 1555 for medical questions and advice.`,
    category: "Public Health",
    author: "Dr. Ana Villanueva",
    source: "Department of Health",
    tags: ["Health", "Leptospirosis", "Prevention", "Post-Flood"],
    readingTime: 3,
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    color: "from-emerald-600 to-green-900",
  },
  {
    id: "mock-5",
    title: "Road Closures and Alternative Routes — Updated Traffic Advisory",
    summary:
      "MMDA has updated its list of closed roads and recommended detours following overnight infrastructure assessments.",
    content: `The Metropolitan Manila Development Authority (MMDA) has released an updated traffic advisory following overnight structural assessments of flood-affected roads and bridges across the metropolitan area.\n\nThe following roads remain closed until further notice: Riverside Drive (entire length), Bayshore Avenue between Km. 4 and Km. 11, Circumferential Road 5 northbound at the Marikina bridge, and all underpasses citywide.\n\nRecommended alternative routes have been published on the MMDA website and are updated every two hours. Motorists travelling north are advised to use EDSA via the flyover exits. Those heading towards the eastern zones should use the elevated highway which remains structurally sound.\n\nBuses and jeepneys are operating modified routes. Passengers should check fleet apps or physical advisories posted at major stops. Tricycles are temporarily permitted on previously restricted sections of major roads to ease access to evacuation-related destinations.\n\nResidents are asked not to attempt driving through flooded roads regardless of vehicle size; even a depth of 15cm can cause a standard vehicle to lose control. MMDA enforcement teams are stationed at known flood-prone road sections.`,
    category: "Traffic & Roads",
    author: "Carlos Mendoza",
    source: "MMDA Traffic Engineering Centre",
    tags: ["Traffic", "Roads", "Closure", "Detour"],
    readingTime: 2,
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    color: "from-slate-600 to-slate-900",
  },
  {
    id: "mock-6",
    title:
      "Rescue Operations Update: 243 Individuals Extracted Since Yesterday",
    summary:
      "Search and rescue teams continue operations in the northern barangays with over 240 people brought to safety in 24 hours.",
    content: `Search and rescue teams from the Bureau of Fire Protection, Philippine Coast Guard, and the Army's 7th Infantry Division have collectively extracted 243 individuals from flood-affected homes in the northern barangays since rescue operations began yesterday morning.\n\nOf those rescued, 38 required immediate medical attention and were transported to designated trauma centres. Water rescue teams report that the operation is ongoing, with an estimated 60–80 households still unreachable in the most severely inundated sections of Barangay Maliwalo.\n\nHelicopter reconnaissance conducted at 07:00 this morning identified 12 individuals stranded on rooftops; extraction operations for those individuals are currently underway using a Zodiac raft convoy supported by an NDRRMC helicopter.\n\nThe rescue coordinator emphasised that response teams are prioritising households with children, elderly, and persons with disabilities. Citizens with information about unreached households should contact the emergency operations centre at 912-RESCUE.\n\nAll rescued individuals are being transported to the nearest evacuation centre for health assessment and registration before being assigned accommodations.`,
    category: "Rescue Operations",
    author: "Lt. Col. Fernando Cruz",
    source: "NDRRMC Joint Task Force",
    tags: ["Rescue", "Operations", "NDRRMC", "Flooding"],
    readingTime: 3,
    created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    color: "from-red-700 to-red-900",
  },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(MOCK_NEWS.map((n) => n.category))),
];

function getTimeAgo(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now.getTime() - then.getTime()) / 60000);
  if (diff < 60) return `${diff}m ago`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function mergeMockWithApi(apiItems: NewsItem[], mock: NewsItem[]): NewsItem[] {
  if (!apiItems.length) return mock;
  return apiItems.map((item) => ({
    ...item,
    summary: item.summary || item.content?.slice(0, 140) + "…",
    author: item.author || "The Eye Editorial",
    source: item.source || "The Eye",
    tags: item.tags || [],
    readingTime: item.readingTime || 2,
    color: item.color || "from-teal-700 to-teal-900",
  }));
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await api.get("/news?limit=20");
        const apiItems: NewsItem[] = data.news || [];
        setNews(mergeMockWithApi(apiItems, MOCK_NEWS));
      } catch {
        // fall back to mock data silently
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? news
        : news.filter((n) => n.category === activeCategory),
    [news, activeCategory],
  );

  const heroArticle = filtered[0];
  const restArticles = filtered.slice(1);

  const breakingCount = news.filter(
    (n) =>
      n.category?.toLowerCase().includes("alert") ||
      n.category?.toLowerCase().includes("breaking") ||
      n.category?.toLowerCase().includes("flood") ||
      n.category?.toLowerCase().includes("rescue"),
  ).length;

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
        ) : (
          <>
            {/* Category Filter */}
            <div className="glass-panel px-5 py-3 shadow-card">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-text-muted mr-1">Category:</span>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                      activeCategory === cat
                        ? "bg-red-500 text-white shadow-glow-red"
                        : "border border-card-border bg-card-bg text-text-secondary hover:bg-card-border/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="glass-panel flex flex-col items-center justify-center py-20 text-center">
                <Newspaper className="h-12 w-12 text-tealGlow/30 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-text-primary">
                  No articles in this category
                </h3>
              </div>
            ) : (
              <>
                {/* Hero article */}
                {heroArticle && (
                  <Link
                    href={`/citizen/news/${heroArticle.id}`}
                    className="block group"
                  >
                    <div
                      className={`overflow-hidden rounded-3xl bg-gradient-to-br ${heroArticle.color} shadow-card`}
                    >
                      <div className="space-y-3 px-6 py-7">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                          {heroArticle.category}
                        </p>
                        <h2 className="text-xl font-bold text-white leading-snug group-hover:underline">
                          {heroArticle.title}
                        </h2>
                        <p className="text-sm text-white/80 line-clamp-2">
                          {heroArticle.summary}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/60 pt-1">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {heroArticle.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {heroArticle.readingTime} min read
                          </span>
                          <span>{getTimeAgo(heroArticle.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)]">
                  {/* Left: article list */}
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-text-primary">
                      Latest Updates
                    </p>

                    {restArticles.length === 0 ? (
                      <div className="glass-panel p-6 text-sm text-text-muted">
                        No additional articles.
                      </div>
                    ) : (
                      restArticles.map((item) => (
                        <Link
                          key={item.id}
                          href={`/citizen/news/${item.id}`}
                          className="block group"
                        >
                          <article className="overflow-hidden glass-panel shadow-card hover:border-tealGlow/40 transition-colors border border-transparent">
                            <div className="flex gap-0">
                              {/* colour strip */}
                              <div
                                className={`w-1.5 flex-shrink-0 rounded-l-3xl bg-gradient-to-b ${item.color}`}
                              />
                              <div className="space-y-2.5 px-5 py-4 w-full">
                                <div className="flex flex-wrap items-center gap-2 text-[10px]">
                                  <span className="rounded-full bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 font-semibold uppercase">
                                    {item.category}
                                  </span>
                                  <span className="flex items-center gap-1 text-text-muted">
                                    <Clock className="h-3 w-3" />
                                    {item.readingTime} min
                                  </span>
                                </div>
                                <h3 className="text-sm font-semibold text-text-primary group-hover:text-tealGlow transition-colors">
                                  {item.title}
                                </h3>
                                <p className="text-xs leading-relaxed text-text-secondary line-clamp-2">
                                  {item.summary}
                                </p>
                                <div className="flex flex-wrap items-center gap-3 text-[10px] text-text-muted">
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {item.author}
                                  </span>
                                  <span>{item.source}</span>
                                  <span className="ml-auto">
                                    {getTimeAgo(item.created_at)}
                                  </span>
                                </div>
                                {item.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                                    {item.tags.slice(0, 4).map((tag) => (
                                      <span
                                        key={tag}
                                        className="flex items-center gap-1 rounded-md border border-card-border bg-card-bg px-2 py-0.5 text-[10px] text-text-muted"
                                      >
                                        <Tag className="h-2.5 w-2.5" />
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </article>
                        </Link>
                      ))
                    )}
                  </div>

                  {/* Right sidebar */}
                  <div className="space-y-5">
                    <div className="glass-panel p-5 shadow-card">
                      <p className="text-sm font-semibold text-text-primary">
                        Today&apos;s Summary
                      </p>
                      <div className="mt-4 space-y-3 text-xs">
                        <div className="flex items-center justify-between rounded-2xl border border-card-border bg-card-bg px-4 py-3 shadow-sm">
                          <span className="text-text-secondary">
                            Articles Published
                          </span>
                          <span className="font-semibold text-text-primary">
                            {news.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl bg-red-500 px-4 py-3 text-white shadow-glow-red">
                          <span className="font-medium">
                            Breaking / Critical
                          </span>
                          <span className="font-bold">{breakingCount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="glass-panel p-5 shadow-card">
                      <p className="text-sm font-semibold text-text-primary">
                        Stay Updated
                      </p>
                      <p className="mt-2 text-xs text-text-muted">
                        Subscribe to get instant notifications for breaking news
                        and alerts.
                      </p>
                      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-tealGlow px-4 py-3 text-sm font-semibold text-night shadow-glow-button hover:opacity-90 transition">
                        <Newspaper className="h-4 w-4" />
                        Subscribe To Alerts
                      </button>
                    </div>

                    {/* Top Tags */}
                    <div className="glass-panel p-5 shadow-card">
                      <p className="text-sm font-semibold text-text-primary mb-3">
                        Trending Topics
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(news.flatMap((n) => n.tags)))
                          .slice(0, 12)
                          .map((tag) => (
                            <span
                              key={tag}
                              className="flex items-center gap-1 rounded-md border border-card-border bg-card-bg px-2.5 py-1 text-[11px] text-text-secondary hover:text-tealGlow hover:border-tealGlow/40 transition cursor-pointer"
                            >
                              <Tag className="h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </CitizenShell>
  );
}
