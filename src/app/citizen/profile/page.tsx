"use client";

import React from "react";
import Image from "next/image";
import { CitizenShell } from "../_components/CitizenShell";

export default function ProfilePage() {
  return (
    <CitizenShell title="Profile">
      <div className="rounded-3xl bg-white shadow-md">
        {/* Gradient header */}
        <div className="h-24 rounded-t-3xl bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100" />

        <div className="px-8 pb-8 pt-6">
          {/* Top row: avatar + basic info + edit */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="-mt-10 h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-slate-200">
                <Image
                  src="/sample-avatar.jpg"
                  alt="Profile avatar"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-2">
                <p className="text-sm font-semibold text-slate-900">Dianah IRANZI</p>
                <p className="text-xs text-slate-500">iradianah5@gmail.com</p>
              </div>
            </div>

            <button className="self-end rounded-xl bg-[#0b1020] px-5 py-2 text-xs font-semibold text-white">
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
            <p className="font-semibold text-slate-900">My email Address</p>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-[10px] text-white">
                @
              </div>
              <div>
                <p className="text-xs text-slate-800">maxiwell@gmail.com</p>
                <p className="text-[11px] text-slate-400">1 month ago</p>
              </div>
            </div>
            <button className="mt-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-[11px] font-semibold text-slate-700">
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
      <p className="text-[11px] font-semibold text-slate-500">{label}</p>
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[11px] text-slate-800">
        {value}
      </div>
    </div>
  );
}

