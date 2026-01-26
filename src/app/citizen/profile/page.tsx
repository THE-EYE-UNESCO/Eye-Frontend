"use client";

import React from "react";
import Image from "next/image";
import { CitizenShell } from "../_components/CitizenShell";

export default function ProfilePage() {
  return (
    <CitizenShell title="Profile">
      <div className="glass-panel shadow-card">
        {/* Gradient header */}
        <div className="h-24 rounded-t-3xl bg-gradient-to-r from-tealGlow/20 via-cyanGlow/20 to-blue-600/20" />

        <div className="px-8 pb-8 pt-6">
          {/* Top row: avatar + basic info + edit */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="-mt-10 h-20 w-20 overflow-hidden rounded-full border-4 border-night bg-white/5">
                <Image
                  src="/sample-avatar.jpg"
                  alt="Profile avatar"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-2">
                <p className="text-sm font-semibold text-white">Dianah IRANZI</p>
                <p className="text-xs text-slateSoft">iradianah5@gmail.com</p>
              </div>
            </div>

            <button className="self-end rounded-xl bg-tealGlow px-5 py-2 text-xs font-semibold text-night shadow-glow hover:shadow-lg transition">
              Edit
            </button>
          </div>

          {/* Info grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 text-xs">
            <InfoField label="Full Name" value="MAXIWELI Manzi" />
            <InfoField label="Nick Name" value="Maxi" />
            <InfoField label="Country" value="Rwanda" />
            <InfoField label="Address" value="Kigali" />
            <InfoField label="Language" value="English" />
            <InfoField label="Time Zone" value="AM" />
          </div>

          <div className="mt-8 space-y-3 text-xs">
            <p className="font-semibold text-white">My email Address</p>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-[10px] text-white">
                @
              </div>
              <div>
                <p className="text-xs text-white">maxiwell@gmail.com</p>
                <p className="text-[11px] text-slateSoft">1 month ago</p>
              </div>
            </div>
            <button className="mt-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold text-white hover:bg-white/10 transition">
              + Add Email Address
            </button>
          </div>
        </div>
      </div>
    </CitizenShell>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-semibold text-slateSoft">{label}</p>
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[11px] text-white">
        {value}
      </div>
    </div>
  );
}

