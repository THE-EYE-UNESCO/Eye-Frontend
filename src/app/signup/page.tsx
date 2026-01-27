"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ArrowRight } from "lucide-react";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Side: Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24">
        <div className="w-full max-w-md space-y-8">
          <header className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-[#0F172A] tracking-tight">Sign Up</h1>
          </header>

          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-2 px-1">Full Name</label>
                <input
                  type="text"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#0F172A] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-tealGlow/50 transition shadow-sm"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-2 px-1">Email Address</label>
                <input
                  type="email"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#0F172A] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-tealGlow/50 transition shadow-sm"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-2 px-1">Password</label>
                <input
                  type="password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#0F172A] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-tealGlow/50 transition shadow-sm"
                  placeholder=""
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#64748B] mb-2 px-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#0F172A] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-tealGlow/50 transition shadow-sm"
                  placeholder=""
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 rounded border-slate-300 text-tealGlow focus:ring-tealGlow"
              />
              <label htmlFor="terms" className="text-xs text-[#64748B]">
                I agree to the <span className="font-bold text-[#0F172A] cursor-pointer">Terms and Conditions</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#0F172A] py-4 text-sm font-bold text-white shadow-xl hover:opacity-95 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-[#64748B] font-medium tracking-wide">Or continue with</span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white py-3.5 text-sm font-bold text-[#0F172A] shadow-sm hover:bg-slate-50 transition">
            <Image src="/google.svg" alt="Google" width={20} height={20} className="w-5 h-5" />
            Google
          </button>

          <div className="text-center text-sm text-[#64748B]">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#0F172A] hover:underline underline-offset-4">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side: Visual decoration */}
      <div className="hidden md:flex flex-1 relative bg-[#020617] overflow-hidden">
        {/* Background Decorative Shapes */}
        <div className="absolute bottom-0 right-0 w-[120%] h-[120%] bg-[#cbd5e1] rounded-[150px] transform translate-x-[65%] translate-y-[15%] rotate-[-20deg]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-[#020617] transform -skew-x-[15deg] translate-x-12 translate-y-[-10%]" />
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center p-12 text-center">
          {/* Logo/Icon */}
          <div className="mb-12 relative">
             {/* Dots grid */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 grid grid-cols-5 gap-4 opacity-20">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
              ))}
            </div>
            
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-tealGlow/10 border border-tealGlow/30 backdrop-blur-xl shadow-2xl">
              <Eye className="h-10 w-10 text-tealGlow" />
            </div>
          </div>

          <h2 className="text-4xl font-extrabold tracking-[0.2em] text-white uppercase mb-6">
            Join <span className="text-white">THE EYE !</span>
          </h2>
          
          <p className="max-w-xs text-lg font-medium text-slate-400 leading-relaxed">
            Start monitoring global crisis with AI-powers insights.
          </p>
        </div>

        {/* Small Navigation/CTA icon in bottom right as seen in image */}
        <div className="absolute bottom-10 right-10 z-20">
           <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-tealGlow/40 text-tealGlow">
              <ArrowRight className="h-5 w-5" />
           </div>
        </div>
      </div>
    </main>
  );
}
