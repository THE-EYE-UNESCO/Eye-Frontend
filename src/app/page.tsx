"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  Brain,
  Clock3,
  Database,
  Eye as EyeIcon,
  Map,
  MessageCircle,
  Moon,
  Send,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useTheme } from "next-themes";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isManualExpand, setIsManualExpand] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Handle navbar minimize/expand
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsManualExpand(false);
      }

      // Handle active section highlight
      const sections = ["home", "about", "services"];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            // Capitalize first letter to match nav array labels
            const label = section.charAt(0).toUpperCase() + section.slice(1);
            setActiveSection(label);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative overflow-hidden bg-bg-primary text-text-primary" id="top">
      <ThreeBackground />
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyanGlow/40 blur-[140px] animate-pulseGlow" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-tealGlow/30 blur-[160px] animate-pulseGlow" />
      </div>

      <div className="relative flex w-full flex-col gap-6 pb-8 pt-6">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-10 flex flex-col gap-6">
        {/* HEADER */}
        <div className={`fixed left-1/2 z-40 transition-all duration-500 ease-in-out -translate-x-1/2 ${
          isScrolled && !isManualExpand 
            ? "top-6 h-14 w-14 overflow-hidden rounded-full shadow-glow" 
            : "top-6 w-[calc(100%-2rem)] max-w-7xl px-0"
        }`}>
          <div 
            className={`gradient-border h-full transition-all duration-500 ${isScrolled && !isManualExpand ? "rounded-full" : "rounded-3xl"}`}
            onClick={() => isScrolled && setIsManualExpand(!isManualExpand)}
          >
            <header className={`flex h-full flex-col gap-4 border border-card-border bg-card-bg backdrop-blur-md p-4 md:flex-row md:items-center md:gap-6 transition-all duration-500 ${
              isScrolled && !isManualExpand 
                ? "justify-center rounded-full cursor-pointer hover:bg-tealGlow/20" 
                : "rounded-3xl"
            }`}>
              <div className={`flex items-center gap-2 ${isScrolled && !isManualExpand ? "contents" : ""}`}>
                <span className={`flex flex-shrink-0 items-center justify-center rounded-full bg-tealGlow/80 text-night transition-all duration-500 ${
                  isScrolled && !isManualExpand ? "h-10 w-10 p-0" : "h-12 w-12"
                }`}>
                  <EyeIcon className={`${isScrolled && !isManualExpand ? "h-5 w-5" : "h-6 w-6"}`} />
                </span>
                {(!isScrolled || isManualExpand) && (
                  <p className="text-2xl font-semibold tracking-[0.35em] text-tealGlow whitespace-nowrap">
                    THE EYE
                  </p>
                )}
              </div>

              {(!isScrolled || isManualExpand) && (
                <>
                  <div className="order-3 flex w-full justify-center md:order-none md:flex-1">
                    <nav className="inline-flex items-center gap-3 rounded-full border border-card-border bg-card-bg px-4 py-1.5 text-sm text-text-secondary shadow-inner">
                      {["Home", "About", "Services", "Quick Help"].map((link) => (
                        <span
                          key={link}
                          onClick={() => {
                            if (link === "Quick Help") {
                              setIsChatOpen(true);
                            } else {
                              const id = link.toLowerCase().replace(" ", "");
                              const element = document.getElementById(id);
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                              }
                            }
                          }}
                          className={`relative rounded-full px-5 py-2 text-lg transition cursor-pointer ${
                            activeSection === link ? "text-tealGlow" : "hover:text-white"
                          }`}
                        >
                          {link}
                          {activeSection === link && (
                            <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-tealGlow" />
                          )}
                        </span>
                      ))}
                    </nav>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="rounded-full border border-card-border px-6 py-3 text-base font-semibold text-text-primary transition hover:bg-card-bg">
                      Sign In
                    </button>
                    <button className="rounded-full bg-tealGlow px-6 py-3 text-base font-semibold text-night shadow-glow transition hover:shadow-lg">
                      Get Started
                    </button>
                    {/* Theme Toggle Button */}
                    {mounted && (
                      <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-card-border bg-card-bg text-text-primary transition hover:bg-card-border"
                        aria-label="Toggle theme"
                      >
                        {theme === "dark" ? (
                          <Sun className="h-6 w-6" />
                        ) : (
                          <Moon className="h-6 w-6" />
                        )}
                      </button>
                    )}
                  </div>
                </>
              )}
            </header>
          </div>
        </div>

        {/* HERO */}
        <section id="home" className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-0 px-2 lg:px-0 pt-32 pb-8">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl lg:pr-8">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-tealGlow mb-2">
              Welcome
            </p>
            <h1 className="text-5xl font-extrabold leading-tight text-text-primary mb-4">
              AI-Powered <span className="text-tealGlow">Crisis Response</span>
            </h1>
            <p className="text-base text-text-secondary mb-7 leading-loose">
              The Eye is an AI-powered, real-time crisis detection and alert platform designed to provide governments, responders, and citizens instant situational awareness during emergencies — from landslides, floods, wildfires, and earthquakes to pandemics and public-security threats.
            </p>
            <button className="flex items-center gap-2 px-7 py-3 rounded-full border-2 border-tealGlow text-tealGlow font-semibold hover:bg-tealGlow hover:text-night transition">
              Start Monitoring Crisis
              <span className="inline-block w-5 h-5 bg-tealGlow rounded-full flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-night" />
              </span>
            </button>
          </div>
          {/* Right: Hero Eye */}
          <div className="flex-1 flex items-center justify-center min-h-[340px]">
            <div className="relative flex items-center justify-center">
              {/* Eye Illustration */}
              <div
                className="rounded-full bg-card-bg p-8 shadow-xl flex items-center justify-center border border-card-border"
                style={{ 
                  boxShadow: theme === "dark" 
                    ? "0 0 60px 10px var(--color-tealGlow), 0 0 0 10px var(--color-bg-secondary)" 
                    : "0 0 40px 5px var(--color-tealGlow), 0 0 0 8px var(--color-bg-secondary)" 
                }}
              >
                <EyeIcon className="h-[260px] w-[260px] text-tealGlow" strokeWidth={1.5} />
              </div>
              {/* Side Dots */}
              <span className="absolute -left-8 top-8 h-7 w-7 rounded-full bg-tealGlow/20" />
              <span className="absolute -right-6 bottom-10 h-9 w-9 rounded-full bg-tealGlow/15" />
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="flex justify-center">
          <div className="gradient-border rounded-[32px]">
            <div className="glass-panel flex w-full max-w-4xl flex-col gap-6 rounded-[32px] border border-card-border bg-card-bg px-12 py-10 text-center text-2xl sm:flex-row sm:items-center sm:justify-between">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <p className="text-5xl font-semibold text-tealGlow">
                    {stat.value}
                  </p>
                  <p className="text-sm uppercase tracking-[0.4em] text-text-primary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
          </div>
        {/* ABOUT US */}
        <section id="about" className="border-y border-card-border bg-bg-secondary pb-12 pt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 space-y-20">
            <div className="relative text-center">
              <h2 className="text-5xl font-semibold text-text-primary">About Us</h2>
              <span className="mt-4 inline-block h-1 w-16 bg-tealGlow" />
            </div>
            <div className="relative grid gap-10 md:grid-cols-2 md:gap-x-12">
              {/* Plus divider between the 4 cards */}
              <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-card-border md:block" />
              <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-card-border md:block" />
              {focusAreas.map((area) => (
                <div
                  key={area.title}
                  className="relative z-10 max-w-xs mx-auto bg-transparent px-4 py-4 text-left md:px-5 md:py-5"
                >
                  {/* Point marker */}
                  <div className="mb-2 flex items-center gap-3 text-tealGlow">
                    <span className="h-2.5 w-2.5 rounded-full bg-tealGlow shadow-glow" />
                  </div>
                  <h3 className="text-2xl font-semibold text-tealGlow">{area.title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-text-secondary">
                    {area.description}
                  </p>
                  <span className="pointer-events-none absolute -right-1 top-4 h-9 w-9 rounded-tr-[22px] border-r-4 border-t-4 border-tealGlow/80" />
                  <span className="pointer-events-none absolute -left-1 bottom-4 h-9 w-9 rounded-bl-[22px] border-b-4 border-l-4 border-tealGlow/80" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-10 flex flex-col gap-20">

        {/* SERVICES */}
        <section className="space-y-12" id="services">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <p className="text-base uppercase tracking-[0.4em] text-text-secondary">
                Explore Our
              </p>
              <h2 className="text-5xl font-semibold text-text-primary">
                Best <span className="text-tealGlow">Services</span>
              </h2>
              <p className="text-lg leading-relaxed text-text-secondary max-w-sm">
                Advanced AI algorithms analyze multiple data sources to provide
                actionable insights for humanitarian response.
              </p>
              <Link href="#services-grid" className="flex items-center gap-2 text-sm text-tealGlow">
                Read More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2" id="services-grid">
              {services.slice(0, 2).map(({ tag, title, description, icon: Icon }) => (
                <div key={title} className="flex flex-col items-center gap-5 rounded-2xl border border-card-border bg-card-bg p-8 text-center shadow-card">
                  <p className="w-full text-left text-xl font-semibold text-tealGlow">{tag}</p>
                  <Icon className="h-12 w-12 text-tealGlow" />
                  <h3 className="text-2xl font-semibold text-text-primary">{title}</h3>
                  <p className="text-lg leading-relaxed text-text-secondary">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.slice(2).map(({ tag, title, description, icon: Icon }) => (
              <div key={title} className="flex flex-col items-center gap-5 rounded-2xl border border-card-border bg-card-bg p-8 text-center shadow-card">
                <p className="w-full text-left text-xl font-semibold text-tealGlow">{tag}</p>
                <Icon className="h-12 w-12 text-tealGlow" />
                <h3 className="text-2xl font-semibold text-text-primary">{title}</h3>
                <p className="text-lg leading-relaxed text-text-secondary">{description}</p>
              </div>
            ))}
          </div>
        </section>
          </div>
        {/* CTA */}
        <section className="border-y border-card-border bg-bg-secondary py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: Glass Card */}
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10 overflow-hidden rounded-3xl border border-card-border bg-card-bg p-10 shadow-2xl backdrop-blur-xl">
                {/* Decorative Blocks */}
                <span className="pointer-events-none absolute -left-4 -top-4 h-24 w-24 rounded-[32px] bg-tealGlow/20" />
                <span className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rounded-[40px] bg-tealGlow/30" />
                
                <p className="relative z-20 text-base leading-relaxed text-text-primary">
                  Join humanitarian organizations worldwide using The Eye to save
                  lives through data-driven decision making.
                </p>
                <form className="relative z-20 mt-6 space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                      type="email"
                      placeholder="Email Address..."
                      className="flex-1 rounded-lg border border-card-border bg-bg-primary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-tealGlow shadow-sm"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-tealGlow px-8 py-4 text-sm font-bold text-night transition hover:opacity-90 shadow-glow"
                    >
                      Get Started
                    </button>
                  </div>
                </form>
                <p className="relative z-20 mt-4 text-sm text-text-muted italic">Join to experience more.</p>
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-6xl font-extrabold leading-tight text-text-primary">
                Ready To Transform <br />
                <span className="text-tealGlow">Crisis Response ?</span>
              </h2>
              <p className="text-xl leading-relaxed text-text-secondary max-w-lg">
                Join humanitarian organizations worldwide using The Eye to save
                lives through data-driven decision making.
              </p>
            </div>
          </div>

          {/* Back to Top */}
          <div className="mt-20 flex justify-center">
            <button 
              onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-card-border text-text-primary transition hover:border-tealGlow hover:text-tealGlow"
            >
              <ArrowUp className="h-6 w-6" />
            </button>
          </div>
        </section>

        <div className="mx-auto w-full max-w-7xl px-0 flex flex-col gap-2">

        {/* FOOTER */}
        <footer className="mt-0 pt-2 text-sm text-text-muted">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-card-border pb-8">
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
                <div key={section} className="flex flex-col px-2">
                  <p className="text-lg font-semibold text-text-primary">{section}</p>
                  <ul className="mt-3 space-y-2 text-text-secondary text-sm">
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

          <div className="mt-10 flex flex-col gap-4 border-t border-card-border pt-6 text-xs uppercase tracking-[0.3em] text-text-muted md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-center md:text-left">
              © {year} THE EYE . All rights reserved. Built for humanitarian impact.
            </p>
            <Link href="#top" className="flex items-center gap-2 self-center rounded-full border border-card-border px-4 py-2 text-text-primary hover:border-tealGlow/50 md:self-auto">
              Back to top
            </Link>
          </div>
        </footer>
        </div>
      </div>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* Chat Window */}
        {isChatOpen && (
          <div className="mb-4 w-96 max-w-[92vw] rounded-2xl border border-card-border bg-card-bg backdrop-blur-2xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-card-border bg-tealGlow/8 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-tealGlow/20">
                  <MessageCircle className="h-5 w-5 text-tealGlow" />
                </div>
                <div>
                  <p className="text-xs font-medium text-text-primary">The Eye Assistant</p>
                  <p className="text-[10px] text-tealGlow/80">Ask anything</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-xl text-text-muted hover:text-text-primary transition"
              >
                ×
              </button>
            </div>

            {/* Messages – Tiny & Elegant */}
            <div className="max-h-96 space-y-3 overflow-y-auto p-4 text-xs">
              <div className="rounded-lg bg-tealGlow/8 p-3 text-text-secondary">
                <p className="leading-snug">
                  Hi! I'm here to help you understand <strong className="text-text-primary">The Eye</strong>.
                </p>
                <p className="mt-2 text-[11px] font-medium text-tealGlow/90">Try asking:</p>
                <ul className="mt-1.5 space-y-1 text-[11px] text-text-muted">
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
                <p className="mt-2 text-[10px] text-text-muted">Just type below</p>
              </div>
            </div>

            {/* Input + Send – Super Compact */}
            <div className="border-t border-card-border p-3">
              <div className="flex items-center gap-2 rounded-full bg-card-bg px-3 py-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && (e.preventDefault(), setMessage(""))
                  }
                  placeholder="Ask..."
                  className="flex-1 bg-transparent text-xs text-text-primary placeholder:text-text-muted focus:outline-none"
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
          <span className="absolute -left-28 bottom-full mb-3 whitespace-nowrap rounded-lg bg-bg-secondary px-3 py-1.5 text-xs text-tealGlow opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm border border-card-border">
            Need help? Ask me anything!
          </span>
        </button>
      </div>
    </main>
  );
}