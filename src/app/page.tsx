"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Clock3,
  Database,
  Eye as EyeIcon,
  Map,
  MessageCircle,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import ThreeBackground from "@/components/ThreeBackground";

const stats = [
  { value: "150+", label: "Countries Monitored" },
  { value: "24/7", label: "Real-time Analysis" },
  { value: "<60s", label: "Alert Response" },
];

const focusAreas = [
  {
    title: "Natural Disasters",
    description:
      "Landslides, floods and wildfires detected via combined IoT & satellite analysis to trigger fast local alerts.",
  },
  {
    title: "Pandemic Monitoring",
    description:
      "Outbreak cluster mapping, vaccination gap detection and predictive alerts to assist health responders.",
  },
  {
    title: "Security & Defense",
    description:
      "Enhance defense workflows with real-time conflict detection, verification and secure distribution.",
  },
  {
    title: "Citizen Engagement",
    description:
      "Mobile reporting, verification workflows and community validation to reduce false positives.",
  },
];

const services = [
  {
    tag: "01",
    title: "Global Data Collection",
    description:
      "Aggregate IoT, satellite imagery, weather feeds and social signals for full situational awareness.",
    icon: Database,
  },
  {
    tag: "02",
    title: "Interactive Mapping",
    description:
      "Geo-targeted overlays keep responders aligned and help prioritize field operations.",
    icon: Map,
  },
  {
    tag: "03",
    title: "Real-Time Analysis",
    description:
      "Push, SMS, and radio alerts with geo-fenced delivery windows and severity tiers.",
    icon: Clock3,
  },
  {
    tag: "04",
    title: "Secure & Compliant",
    description:
      "GDPR-aligned data handling with RBAC, audit logs and consent-based sharing built-in.",
    icon: ShieldCheck,
  },
  {
    tag: "05",
    title: "AI Monitoring",
    description:
      "CV models across satellite, drone, and graph inputs detect anomalies and reduce false alarms.",
    icon: Brain,
  },
];

const footerLinks = {
  Product: ["Dashboard", "Features", "API"],
  Company: ["Home", "About", "Services"],
  Support: ["Documentation", "Help Center", "Status"],
  "Contact Us": ["Send Message"],
};

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <main className="relative overflow-hidden bg-night text-white" id="top">
      <ThreeBackground />
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyanGlow/40 blur-[140px] animate-pulseGlow" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-tealGlow/30 blur-[160px] animate-pulseGlow" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-8 pt-6 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div className="sticky top-6 z-40">
          <div className="gradient-border rounded-3xl">
            <header className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-transparent p-4 md:flex-row md:items-center md:gap-6">
              <div className="flex items-center gap-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tealGlow/80 text-night">
                  <EyeIcon className="h-6 w-6" />
                </span>
                <p className="text-2xl font-semibold tracking-[0.35em] text-tealGlow">
                  THE EYE
                </p>
              </div>

              <div className="order-3 flex w-full justify-center md:order-none md:flex-1">
                <nav className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-ocean/70 px-4 py-1.5 text-sm text-slateSoft shadow-inner">
                  {["Home", "About", "Services"].map((link) => (
                    <span
                      key={link}
                      className={`relative rounded-full px-5 py-2 text-lg transition ${
                        link === "Home" ? "text-tealGlow" : "hover:text-white"
                      }`}
                    >
                      {link}
                      {link === "Home" && (
                        <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-tealGlow" />
                      )}
                    </span>
                  ))}
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <button className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10">
                  Sign In
                </button>
                <button className="rounded-full bg-tealGlow px-6 py-3 text-base font-semibold text-night shadow-glow transition hover:shadow-lg">
                  Get Started
                </button>
              </div>
            </header>
          </div>
        </div>

        {/* HERO */}
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-0 px-2 lg:px-0 pt-8 pb-8">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl lg:pr-8">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-400 mb-2">
              Welcome
            </p>
            <h1 className="text-5xl font-extrabold leading-tight text-white mb-2">
              AI-Powered
            </h1>
            <h2 className="text-5xl font-extrabold leading-tight text-cyan-400 mb-4">
              Crisis Response
            </h2>
            <p className="text-base text-slate-300 mb-7">
              The Eye is an AI-powered, real-time crisis detection and alert platform designed to provide governments, responders, and citizens instant situational awareness during emergencies — from landslides, floods, wildfires, and earthquakes to pandemics and public-security threats.
            </p>
            <button className="flex items-center gap-2 px-7 py-3 rounded-full border-2 border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-[#0A192F] transition">
              Start Monitoring Crisis
              <span className="inline-block w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                <svg fill="#0A192F" width="16" height="16" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="#0A192F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </button>
          </div>
          {/* Right: Hero Eye */}
          <div className="flex-1 flex items-center justify-center min-h-[340px]">
            <div className="relative flex items-center justify-center">
              {/* Eye Illustration */}
              <div
                className="rounded-full bg-[#101b2d] p-8 shadow-xl flex items-center justify-center"
                style={{ boxShadow: "0 0 60px 10px #1de9e6, 0 0 0 10px #101b2d" }}
              >
                <EyeIcon className="h-[260px] w-[260px] text-tealGlow" strokeWidth={1.5} />
              </div>
              {/* Side Dots */}
              <span className="absolute -left-8 top-8 h-7 w-7 rounded-full bg-cyan-400/20" />
              <span className="absolute -right-6 bottom-10 h-9 w-9 rounded-full bg-cyan-400/15" />
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="flex justify-center">
          <div className="gradient-border rounded-[32px]">
            <div className="glass-panel flex w-full max-w-4xl flex-col gap-6 rounded-[32px] border border-white/5 bg-black/50 px-12 py-10 text-center text-2xl sm:flex-row sm:items-center sm:justify-between">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <p className="text-5xl font-semibold text-tealGlow">
                    {stat.value}
                  </p>
                  <p className="text-sm uppercase tracking-[0.4em] text-white">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT US */}
        <section className="space-y-20 -mx-16 border border-white/5 bg-[#060F18] px-16 pb-12 pt-24 sm:-mx-20 sm:px-20 lg:-mx-28 lg:px-28">
          <div className="relative text-center">
            <h2 className="text-5xl font-semibold text-white">About Us</h2>
            <span className="mt-4 inline-block h-1 w-16 bg-tealGlow" />
          </div>
          <div className="relative grid gap-10 md:grid-cols-2 md:gap-x-12">
            {/* Plus divider between the 4 cards */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/15 md:block" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-white/15 md:block" />
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="relative z-10 max-w-xs mx-auto bg-transparent px-4 py-4 text-left md:px-5 md:py-5"
              >
                {/* Point marker */}
                <div className="mb-2 flex items-center gap-3 text-tealGlow">
                  <span className="h-2.5 w-2.5 rounded-full bg-tealGlow shadow-[0_0_18px_rgba(29,233,230,0.65)]" />
                </div>
                <h3 className="text-2xl font-semibold text-tealGlow">{area.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-slateSoft">
                  {area.description}
                </p>
                <span className="pointer-events-none absolute -right-1 top-4 h-9 w-9 rounded-tr-[22px] border-r-4 border-t-4 border-tealGlow/80" />
                <span className="pointer-events-none absolute -left-1 bottom-4 h-9 w-9 rounded-bl-[22px] border-b-4 border-l-4 border-tealGlow/80" />
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="space-y-12" id="services">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <p className="text-base uppercase tracking-[0.4em] text-slateSoft">
                Explore Our
              </p>
              <h2 className="text-5xl font-semibold text-white">
                Best <span className="text-tealGlow">Services</span>
              </h2>
              <p className="text-lg leading-relaxed text-slateSoft max-w-sm">
                Advanced AI algorithms analyze multiple data sources to provide
                actionable insights for humanitarian response.
              </p>
              <Link href="#services-grid" className="flex items-center gap-2 text-sm text-tealGlow">
                Read More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2" id="services-grid">
              {services.slice(0, 2).map(({ tag, title, description, icon: Icon }) => (
                <div key={title} className="flex flex-col items-center gap-5 rounded-2xl border border-white/15 bg-[#111b27] p-8 text-center shadow-card">
                  <p className="w-full text-left text-xl font-semibold text-tealGlow">{tag}</p>
                  <Icon className="h-12 w-12 text-white" />
                  <h3 className="text-2xl font-semibold text-white">{title}</h3>
                  <p className="text-lg leading-relaxed text-slateSoft">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.slice(2).map(({ tag, title, description, icon: Icon }) => (
              <div key={title} className="flex flex-col items-center gap-5 rounded-2xl border border-white/15 bg-[#111b27] p-8 text-center shadow-card">
                <p className="w-full text-left text-xl font-semibold text-tealGlow">{tag}</p>
                <Icon className="h-12 w-12 text-white" />
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
                <p className="text-lg leading-relaxed text-slateSoft">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative grid gap-10 -mx-16 border border-white/5 bg-[#060F18] px-16 py-12 sm:-mx-20 sm:px-20 lg:-mx-28 lg:px-28 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-lg">
            <span className="pointer-events-none absolute -left-10 bottom-0 h-24 w-24 rounded-[40px] bg-tealGlow/40" />
            <span className="pointer-events-none absolute -right-8 top-0 h-24 w-24 rounded-[32px] bg-tealGlow/30" />
            <p className="text-sm text-white/80">
              Join humanitarian organizations worldwide using The Eye to save
              lives through data-driven decision making.
            </p>
            <form className="mt-5 space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="email"
                  placeholder="Email Address..."
                  className="flex-1 rounded-full bg-white px-5 py-3 text-sm text-night placeholder:text-slate-400 shadow-inner"
                />
                <button
                  type="submit"
                  className="rounded-full bg-tealGlow px-6 py-3 text-sm font-semibold text-night shadow-glow"
                >
                  Get Started
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-white/80">Join to experience more.</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-semibold text-white">
              Ready To Transform <span className="text-tealGlow">Crisis Response ?</span>
            </h2>
            <p className="text-lg text-slateSoft max-w-md">
              Join humanitarian organizations worldwide using The Eye to save
              lives through data-driven decision making.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-10 pt-6 text-sm text-white/80">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-8">
            <div className="flex items-center gap-3">
              <Image
                src="/next.svg"
                alt="The Eye footer logo"
                width={32}
                height={32}
                className="brightness-200"
              />
              <p className="text-lg font-semibold text-tealGlow">THE EYE</p>
            </div>
            <button className="rounded-full bg-tealGlow px-6 py-2 text-sm font-semibold text-night">
              Sign Up
            </button>
          </div>

          <div className="mt-8 grid gap-8 text-base md:grid-cols-4">
            {Object.entries(footerLinks).map(([section, links]) => {
              const isRightColumn = section === "Contact Us";
              return (
                <div key={section} className={`flex flex-col ${isRightColumn ? "items-center text-center md:items-start md:text-left" : ""}`}>
                  <p className="text-lg font-semibold text-white">{section}</p>
                  <ul className={`mt-3 space-y-2 text-white/70 text-sm ${isRightColumn ? "text-center md:text-left" : ""}`}>
                    {links.map((link) => (
                      <li key={link}>
                        <Link href="#" className="hover:text-tealGlow text-sm">
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.3em] text-white/60 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-center md:text-left">
              © {year} THE EYE . All rights reserved. Built for humanitarian impact.
            </p>
            <Link href="#top" className="flex items-center gap-2 self-center rounded-full border border-white/20 px-4 py-2 text-white hover:border-tealGlow/50 md:self-auto">
              Back to top
            </Link>
          </div>
        </footer>
      </div>

            {/* FLOATING CHATBOT – ULTRA CLEAN & TINY FONT */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* Chat Window */}
        {isChatOpen && (
          <div className="mb-4 w-96 max-w-[92vw] rounded-2xl border border-white/10 bg-[#0c1824]/98 backdrop-blur-2xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/8 bg-tealGlow/8 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-tealGlow/20">
                  <MessageCircle className="h-5 w-5 text-tealGlow" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white">The Eye Assistant</p>
                  <p className="text-[10px] text-tealGlow/80">Ask anything</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-xl text-white/50 hover:text-white transition"
              >
                ×
              </button>
            </div>

            {/* Messages – Tiny & Elegant */}
            <div className="max-h-96 space-y-3 overflow-y-auto p-4 text-xs">
              <div className="rounded-lg bg-tealGlow/8 p-3 text-gray-300">
                <p className="leading-snug">
                  Hi! I'm here to help you understand <strong className="text-white">The Eye</strong>.
                </p>
                <p className="mt-2 text-[11px] font-medium text-tealGlow/90">Try asking:</p>
                <ul className="mt-1.5 space-y-1 text-[11px] text-gray-400">
                  {[
                    "How does crisis detection work?",
                    "What data sources do you use?",
                    "How fast are alerts delivered?",
                    "Who is this platform for?",
                  ].map((q) => (
                    <li key={q} className="flex items-start gap-1.5">
                      <span className="text-tealGlow mt-0.5">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[10px] text-gray-500">Just type below</p>
              </div>
            </div>

            {/* Input + Send – Super Compact */}
            <div className="border-t border-white/8 p-3">
              <div className="flex items-center gap-2 rounded-full bg-white/8 px-3 py-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && (e.preventDefault(), setMessage(""))
                  }
                  placeholder="Ask..."
                  className="flex-1 bg-transparent text-xs text-white placeholder:text-white/40 focus:outline-none"
                />
                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-tealGlow text-night transition hover:scale-105">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-tealGlow shadow-2xl transition-all hover:scale-110 hover:shadow-tealGlow/60"
        >
          <span className="absolute inset-0 rounded-full bg-tealGlow/50 animate-ping" />
          <span className="absolute inset-0 rounded-full bg-tealGlow/30 animate-ping delay-1000" />

          <MessageCircle className="h-8 w-8 text-night relative z-10" strokeWidth={2.5} />

          {/* Tiny Red Badge */}
          <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-tealGlow/50 text-[10px] font-bold text-white shadow-lg animate-bounce">
            1
          </span>

          {/* Tooltip */}
          <span className="absolute -left-28 bottom-full mb-3 whitespace-nowrap rounded-lg bg-night/95 px-3 py-1.5 text-xs text-tealGlow opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm border border-white/10">
            Need help? Ask me anything!
          </span>
        </button>
      </div>
    </main>
  );
}