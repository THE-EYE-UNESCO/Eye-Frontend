"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Zap, TrendingUp, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import ThreeBackground from "@/components/ThreeBackground";
import { api } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const signupSuccess = searchParams.get("signup") === "success";

  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.login(formData);
      if (response.user.role === "RESPONDER") {
        router.push("/responder");
      } else {
        router.push("/citizen");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side: Engaging Visuals (50%) */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden p-12">
         {/* Particles */}
         <ThreeBackground className="absolute inset-0 z-0 pointer-events-none opacity-60" />

         {/* Animated background elements */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-tealGlow/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        {/* Bouncing/Pulsing Dots */}
        <span className="absolute left-10 top-20 h-8 w-8 rounded-full bg-tealGlow/30 animate-bounce z-10" />
        <span className="absolute right-12 bottom-24 h-12 w-12 rounded-full bg-tealGlow/20 animate-pulse delay-75 z-10" />

        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-8">
                <Eye className="h-24 w-24 text-tealGlow" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">THE EYE</h1>
            <p className="text-lg text-slate-400 max-w-md">
                Global Crisis Monitor. Real-time protection and analytics for a safer world.
            </p>
        </div>
      </div>

      {/* Right Side: Form (50%) */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-8 bg-white">
        <div className="w-full max-w-lg">
          {/* Mobile Branding - Visible only on small screens */}
          <div className="md:hidden flex flex-col items-center mb-8">
             <Eye className="h-12 w-12 text-tealGlow mb-2" />
             <h1 className="text-2xl font-bold text-slate-900">THE EYE</h1>
          </div>

          <header className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Sign in to continue monitoring</p>
          </header>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <label htmlFor="remember" className="text-sm text-slate-600">
                  Remember me
                </label>
              </div>
              <button type="button" className="text-sm font-semibold text-slate-900 hover:underline">
                Forgot password?
              </button>
            </div>

            {signupSuccess && (
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl text-sm font-medium border border-teal-100">
                Account created successfully! Please sign in.
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl bg-slate-900 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:shadow-slate-900/30 hover:scale-[1.02] transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="relative py-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-slate-400 font-medium">Or continue with</span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
            Google
          </button>

          <div className="text-center text-sm text-slate-500 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-slate-900 font-semibold hover:underline underline-offset-4">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-xl animate-pulse flex flex-col items-center">
          <Eye className="h-12 w-12 text-tealGlow mb-4 animate-bounce" />
          Loading...
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
