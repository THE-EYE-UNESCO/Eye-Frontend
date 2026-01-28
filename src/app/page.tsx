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
  Menu,
  X,
  ArrowDown,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <main className="relative overflow-x-hidden bg-bg-primary text-text-primary" id="top">
      <ThreeBackground />
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyanGlow/40 blur-[140px] animate-pulseGlow" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-tealGlow/30 blur-[160px] animate-pulseGlow" />
      </div>

      <div className="relative flex w-full flex-col gap-6 pb-8 pt-6">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-10 flex flex-col gap-6">
        {/* HEADER */}
        <div className={`fixed left-1/2 z-[100] transition-all duration-700 ease-out-expo -translate-x-1/2 ${
          isScrolled && !isManualExpand 
            ? "top-6 h-14 w-48 rounded-full shadow-glow-teal" 
            : "top-6 w-[calc(100%-2rem)] max-w-7xl px-0"
        }`}>
          <div 
            className={`gradient-border h-full transition-all duration-500 ${isScrolled && !isManualExpand ? "rounded-full" : "rounded-3xl"}`}
            onClick={() => isScrolled && setIsManualExpand(!isManualExpand)}
          >
            <header className={`relative flex h-full flex-row items-center gap-4 border border-white/10 bg-transparent backdrop-blur-2xl p-4 md:gap-6 transition-all duration-500 border-inner ${
              isScrolled && !isManualExpand 
                ? "justify-center rounded-full cursor-pointer hover:bg-tealGlow/10 group/header overflow-hidden" 
                : "rounded-3xl"
            }`}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className={`flex flex-shrink-0 items-center justify-center rounded-full bg-tealGlow text-night transition-all duration-500 ${
                    isScrolled && !isManualExpand ? "h-8 w-8 p-0" : "h-10 w-10 md:h-12 md:w-12"
                  }`}>
                    <EyeIcon className={`${isScrolled && !isManualExpand ? "h-4 w-4" : "h-5 w-5 md:h-6 md:w-6"}`} />
                  </span>
                  {(isScrolled && !isManualExpand) && (
                    <p className="text-sm font-bold tracking-widest text-tealGlow uppercase transition-all duration-500 opacity-60 group-hover/header:opacity-100">
                      EYE
                    </p>
                  )}
                  {(!isScrolled || isManualExpand) && (
                    <p className="text-xl md:text-2xl font-semibold tracking-[0.2em] md:tracking-[0.35em] text-tealGlow whitespace-nowrap">
                      THE EYE
                    </p>
                  )}
                </div>

                {/* Mobile Menu Toggle - Only visible on mobile */}
                {(!isScrolled || isManualExpand) && (
                  <button 
                    className="md:hidden ml-auto text-text-primary p-2 hover:bg-white/10 rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                )}
                
                {isScrolled && !isManualExpand && (
                  <button 
                    className="md:hidden ml-auto text-tealGlow/40 group-hover/header:text-tealGlow transition-colors"
                    aria-label="Expand menu"
                  >
                    <ArrowDown className="h-4 w-4 animate-bounce" />
                  </button>
                )}
              </div>

              {(!isScrolled || isManualExpand) && (
                <>
                  <nav className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-card-border/50 px-4 py-1.5 text-sm text-text-secondary">
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
                        className={`relative rounded-full px-5 py-2 text-sm font-medium transition cursor-pointer hover:text-white ${
                          activeSection === link ? "text-tealGlow bg-tealGlow/5 shadow-sm" : ""
                        }`}
                      >
                        {link}
                        {activeSection === link && (
                          <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-tealGlow" />
                        )}
                      </span>
                    ))}
                  </nav>

                  <div className="hidden md:flex items-center gap-3 ml-auto">
                    <Link href="/login">
                      <button className="rounded-full border border-card-border px-6 py-2.5 text-sm font-semibold text-text-primary transition hover:bg-tealGlow/5 active:scale-95">
                        Log In
                      </button>
                    </Link>
                    <Link href="/signup">
                      <button className="rounded-full bg-tealGlow px-6 py-2.5 text-sm font-bold text-night shadow-glow-teal hover:shadow-lg transition active:scale-95">
                        Join Now
                      </button>
                    </Link>
                    {mounted && (
                      <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-card-bg text-text-primary transition hover:bg-card-border"
                        aria-label="Toggle theme"
                      >
                        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      </button>
                    )}
                  </div>
                </>
              )}
            </header>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`fixed inset-0 z-[110] md:hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
          <div 
            className={`absolute inset-0 bg-night/80 backdrop-blur-md transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-night border-l border-card-border transition-transform duration-500 ease-out-expo ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="flex flex-col h-full p-8 pt-20">
              <button 
                className="absolute top-6 right-6 h-12 w-12 flex items-center justify-center rounded-full bg-card-bg border border-card-border text-text-primary active:scale-90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex items-center gap-3 mb-12">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tealGlow text-night shadow-glow-teal">
                  <EyeIcon className="h-6 w-6" />
                </span>
                <p className="text-2xl font-bold tracking-wider text-tealGlow">THE EYE</p>
              </div>

              <nav className="flex flex-col gap-4">
                {["Home", "About", "Services", "Quick Help"].map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
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
                    className={`flex items-center justify-between rounded-2xl p-5 text-lg font-semibold transition-all ${
                      activeSection === link 
                        ? "bg-tealGlow text-night shadow-glow-teal translate-x-2" 
                        : "text-text-secondary hover:bg-white/5"
                    }`}
                  >
                    {link}
                    <ArrowUp className="h-5 w-5 rotate-45 opacity-40" />
                  </button>
                ))}
              </nav>

              <div className="mt-auto space-y-4">
                  <Link href="/login" className="block w-full">
                    <button className="w-full rounded-2xl border border-card-border bg-card-bg py-4 font-bold text-text-primary">
                      Log In
                    </button>
                  </Link>
                  <Link href="/signup" className="block w-full">
                    <button className="w-full rounded-2xl bg-tealGlow py-4 font-bold text-night shadow-glow-teal">
                      Create Account
                    </button>
                  </Link>
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="flex w-full items-center justify-between rounded-2xl bg-card-bg p-5 font-semibold text-text-primary"
                    >
                      <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                  )}
              </div>
            </div>
          </aside>
        </div>

        {/* HERO */}
        <section id="home" className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 px-2 lg:px-0 pt-32 md:pt-40 pb-8 overflow-visible">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left justify-center max-w-xl lg:pr-8">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-tealGlow mb-3">
              Welcome
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-text-primary mb-6">
              AI-Powered <span className="text-tealGlow">Crisis Response</span>
            </h1>
            <p className="text-base md:text-lg text-text-secondary mb-10 leading-relaxed md:leading-loose max-w-lg md:max-w-none">
              The Eye is an AI-powered, real-time crisis detection and alert platform designed to provide governments, responders, and citizens instant situational awareness during emergencies — from landslides, floods, wildfires, and earthquakes to pandemics and public-security threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-tealGlow text-tealGlow font-semibold hover:bg-tealGlow hover:text-night transition group">
                Start Monitoring Crisis
                <span className="flex items-center justify-center h-5 w-5 bg-tealGlow rounded-full transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4 text-night" />
                </span>
              </button>
            </div>
          </div>
          {/* Right: Hero Eye */}
          <div className="flex-1 flex items-center justify-center relative w-full lg:w-auto mt-12 lg:mt-0">
            <div className="relative flex items-center justify-center w-full max-w-[300px] md:max-w-[400px] lg:max-w-none">
              {/* Eye Illustration */}
              <div
                className="rounded-full bg-card-bg p-8 md:p-12 shadow-xl flex items-center justify-center border border-card-border relative z-10"
                style={{ 
                  boxShadow: theme === "dark" 
                    ? "0 0 60px 10px var(--color-tealGlow), 0 0 0 10px var(--color-bg-secondary)" 
                    : "0 0 40px 5px var(--color-tealGlow), 0 0 0 8px var(--color-bg-secondary)" 
                }}
              >
                <EyeIcon className="h-40 w-40 md:h-[260px] md:w-[260px] text-tealGlow" strokeWidth={1.5} />
              </div>
              {/* Dynamic Scaling Glow */}
              <div className="absolute inset-0 rounded-full bg-tealGlow/10 blur-[60px] md:blur-[100px] animate-pulse" />
              
              {/* Side Dots - Hidden on very small mobile if too cluttered */}
              <span className="absolute -left-4 md:-left-8 top-8 h-5 w-5 md:h-7 md:w-7 rounded-full bg-tealGlow/20 animate-bounce" />
              <span className="absolute -right-4 md:-right-6 bottom-10 h-7 w-7 md:h-9 md:w-9 rounded-full bg-tealGlow/15 animate-pulse" />
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="flex justify-center -mt-6 md:-mt-12 relative z-10">
          <div className="w-full max-w-5xl px-4">
            <div className="rounded-[32px] md:rounded-[40px] border border-card-border bg-card-bg backdrop-blur-xl p-1 shadow-glow-button">
              <div className="flex flex-col gap-6 md:gap-8 rounded-[28px] md:rounded-[36px] bg-bg-primary/40 px-8 py-8 md:px-12 md:py-10 text-center sm:flex-row sm:items-center sm:justify-between">
                {stats.map((stat, idx) => (
                  <div key={stat.label} className={`flex-1 space-y-2 md:space-y-3 ${idx !== stats.length - 1 ? "pb-6 md:pb-0 border-b border-card-border md:border-b-0 sm:border-r" : ""}`}>
                    <p className="text-4xl md:text-5xl font-extrabold tracking-tight text-tealGlow">
                      {stat.value}
                    </p>
                    <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-text-primary opacity-80">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
          </div>
        {/* ABOUT US */}
        <section id="about" className="border-y border-card-border bg-bg-secondary pb-12 pt-16 md:pt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 space-y-12 md:space-y-20">
            <div className="relative text-center">
              <h2 className="text-4xl md:text-5xl font-semibold text-text-primary">About Us</h2>
              <span className="mt-4 inline-block h-1 w-16 bg-tealGlow" />
            </div>
            <div className="relative grid gap-6 md:grid-cols-2 md:gap-x-12">
              {/* Plus divider between the 4 cards - hidden on mobile */}
              <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-card-border md:block" />
              <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-card-border md:block" />
              {focusAreas.map((area) => (
                <div
                  key={area.title}
                  className="relative z-10 max-w-xs mx-auto bg-transparent px-4 py-4 text-center md:text-left md:px-5 md:py-5 group"
                >
                  {/* Point marker */}
                  <div className="mb-4 flex items-center justify-center md:justify-start gap-3 text-tealGlow">
                    <span className="h-2.5 w-2.5 rounded-full bg-tealGlow shadow-glow group-hover:scale-150 transition-transform" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-tealGlow mb-2">{area.title}</h3>
                  <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                    {area.description}
                  </p>
                  {/* Glass decorative corners - subtle scaling */}
                  <span className="pointer-events-none absolute -right-1 top-4 h-6 w-6 md:h-9 md:w-9 rounded-tr-[16px] md:rounded-tr-[22px] border-r-2 md:border-r-4 border-t-2 md:border-t-4 border-tealGlow/40" />
                  <span className="pointer-events-none absolute -left-1 bottom-4 h-6 w-6 md:h-9 md:w-9 rounded-bl-[16px] md:rounded-bl-[22px] border-b-2 md:border-b-4 border-l-2 md:border-l-4 border-tealGlow/40" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-10 flex flex-col gap-20">

        {/* SERVICES */}
        <section className="space-y-12" id="services">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-6 text-center lg:text-left">
              <p className="text-sm md:text-base uppercase tracking-[0.4em] text-text-secondary">
                Explore Our
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold text-text-primary">
                Best <span className="text-tealGlow">Services</span>
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-text-secondary mx-auto lg:mx-0 max-w-md">
                Advanced AI algorithms analyze multiple data sources to provide
                actionable insights for humanitarian response.
              </p>
              <Link href="#services-grid" className="inline-flex items-center gap-2 text-sm text-tealGlow hover:underline">
                Read More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2" id="services-grid">
              {services.slice(0, 2).map(({ tag, title, description, icon: Icon }) => (
                <div key={title} className="flex flex-col items-center gap-4 rounded-3xl border border-card-border bg-card-bg p-6 md:p-8 text-center shadow-card hover:border-tealGlow/30 transition-colors group">
                  <p className="w-full text-left text-lg font-semibold text-tealGlow opacity-60">{tag}</p>
                  <div className="h-14 w-14 rounded-2xl bg-tealGlow/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-tealGlow" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-text-primary mt-2">{title}</h3>
                  <p className="text-sm md:text-base leading-relaxed text-text-secondary">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {services.slice(2).map(({ tag, title, description, icon: Icon }) => (
              <div key={title} className="flex flex-col items-center gap-4 rounded-3xl border border-card-border bg-card-bg p-6 md:p-8 text-center shadow-card hover:border-tealGlow/30 transition-colors group">
                <p className="w-full text-left text-lg font-semibold text-tealGlow opacity-60">{tag}</p>
                <div className="h-14 w-14 rounded-2xl bg-tealGlow/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8 text-tealGlow" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-text-primary mt-2">{title}</h3>
                <p className="text-sm md:text-base leading-relaxed text-text-secondary">{description}</p>
              </div>
            ))}
          </div>
        </section>
          </div>
        {/* CTA */}
        <section className="border-y border-card-border bg-bg-secondary py-16 md:py-24 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: Glass Card */}
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10 overflow-hidden rounded-3xl border border-card-border bg-card-bg p-8 md:p-12 shadow-2xl backdrop-blur-xl">
                {/* Decorative Blocks */}
                <span className="pointer-events-none absolute -left-4 -top-4 h-20 w-20 md:h-24 md:w-24 rounded-[28px] md:rounded-[32px] bg-tealGlow/20 animate-pulse" />
                <span className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 md:h-28 md:w-28 rounded-[32px] md:rounded-[40px] bg-tealGlow/30 animate-pulse delay-700" />
                
                <p className="relative z-20 text-base md:text-lg leading-relaxed text-text-primary text-center lg:text-left">
                  Join humanitarian organizations worldwide using The Eye to save
                  lives through data-driven decision making.
                </p>
                <form className="relative z-20 mt-8 space-y-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <input
                      type="email"
                      placeholder="Email Address..."
                      className="flex-1 rounded-xl border border-card-border bg-bg-primary px-5 py-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-tealGlow shadow-sm"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-tealGlow px-8 py-4 text-sm font-bold text-night transition hover:scale-[1.02] shadow-glow"
                    >
                      Get Started
                    </button>
                  </div>
                </form>
                <p className="relative z-20 mt-6 text-xs text-text-muted italic text-center lg:text-left">No credit card required. Free for verified humanitarian NGOs.</p>
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="order-1 lg:order-2 space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight text-text-primary text-balance">
                Ready To Transform <br className="hidden md:block" />
                <span className="text-tealGlow">Crisis Response ?</span>
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-text-secondary mx-auto lg:mx-0 max-w-xl">
                Experience the future of humanitarian aid. Real-time data, predictive AI, and seamless community coordination in one platform.
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
        <footer className="mt-12 pt-12 pb-12 text-sm text-text-muted">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between border-b border-card-border pb-12">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tealGlow text-night">
                  <EyeIcon className="h-6 w-6" />
                </span>
                <p className="text-xl font-bold tracking-widest text-tealGlow uppercase">THE EYE</p>
              </div>
              
              <p className="text-xs text-text-secondary/70 max-w-xs text-center md:text-left leading-relaxed">
                Protecting communities through advanced AI <br className="hidden md:block"/> and real-time data analysis.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <button className="rounded-full bg-tealGlow px-8 py-2.5 text-sm font-bold text-night shadow-glow hover:opacity-90 transition">
                  Join Now
                </button>
              </Link>
              <Link href="/login">
                <button className="rounded-full border border-card-border px-8 py-2.5 text-sm font-bold text-text-primary hover:bg-card-bg transition">
                  Sign In
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="flex flex-col space-y-4">
                <p className="text-base font-bold text-text-primary uppercase tracking-wider">{section}</p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-text-secondary hover:text-tealGlow transition-colors text-sm">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-card-border pt-8">
            <p className="text-[9px] uppercase tracking-[0.2em] text-text-muted text-center md:text-left">
              © {year} THE EYE . Global Crisis Management. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <Link href="#" className="text-[9px] uppercase tracking-[0.2em] font-medium text-text-secondary hover:text-tealGlow transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-[9px] uppercase tracking-[0.2em] font-medium text-text-secondary hover:text-tealGlow transition-colors">Terms of Service</Link>
              <Link href="#top" className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] text-text-primary hover:border-tealGlow transition-all">
                <span>Back to top</span>
                <ArrowUp className="h-3 w-3" />
              </Link>
            </div>
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