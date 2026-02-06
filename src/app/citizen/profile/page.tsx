"use client";

import React from "react";
import Image from "next/image";
import { CitizenShell } from "../_components/CitizenShell";
import { useTheme } from "next-themes";
import { Users, Camera } from "lucide-react";

export default function ProfilePage() {
  const { theme } = useTheme();
  const [user, setUser] = React.useState<{
    name: string;
    email: string;
    nickname?: string;
    country?: string;
    address?: string;
    language?: string;
    timezone?: string;
    avatar?: string;
  } | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);

  const handleSave = () => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsEditing(false);
      // Force a re-render or notify components that user data changed
      window.dispatchEvent(new Event("storage"));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateField = (field: string, value: string) => {
    if (user) {
      setUser({ ...user, [field]: value });
    }
  };

  return (
    <CitizenShell title="Profile">
      <div className="glass-panel shadow-card">
        {/* Gradient header */}
        <div className="h-24 rounded-t-3xl bg-gradient-to-r from-tealGlow/20 via-cyanGlow/20 to-blue-600/20" />

        <div className="px-8 pb-8 pt-6">
          {/* Top row: avatar + basic info + edit */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div 
                className={`relative -mt-10 h-20 w-20 overflow-hidden rounded-full border-4 shadow-lg ${theme === 'dark' ? 'border-night' : 'border-bg-primary'} bg-card-bg flex items-center justify-center group cursor-pointer`}
                onClick={() => isEditing && fileInputRef.current?.click()}
              >
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="Profile avatar"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Users className="h-10 w-10 text-tealGlow/30" />
                )}
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-night/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="mt-2">
                <p className="text-sm font-semibold text-text-primary">{user?.name || "Citizen"}</p>
                <p className="text-xs text-text-muted">{user?.email || "No email provided"}</p>
              </div>
            </div>

            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="self-end rounded-xl bg-tealGlow px-5 py-2 text-xs font-semibold text-night shadow-glow-button hover:opacity-90 transition"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          {/* Info grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 text-xs">
            <InfoField
              label="Full Name"
              value={user?.name || ""}
              isEditing={isEditing}
              onUpdate={(val) => updateField("name", val)}
            />
            <InfoField
              label="Nick Name"
              value={user?.nickname || ""}
              placeholder="Not provided"
              isEditing={isEditing}
              onUpdate={(val) => updateField("nickname", val)}
            />
            <InfoField
              label="Country"
              value={user?.country || "Rwanda"}
              isEditing={isEditing}
              onUpdate={(val) => updateField("country", val)}
            />
            <InfoField
              label="Address"
              value={user?.address || "Kigali"}
              isEditing={isEditing}
              onUpdate={(val) => updateField("address", val)}
            />
            <InfoField
              label="Language"
              value={user?.language || "English"}
              isEditing={isEditing}
              onUpdate={(val) => updateField("language", val)}
            />
            <InfoField
              label="Time Zone"
              value={user?.timezone || "CAT"}
              isEditing={isEditing}
              onUpdate={(val) => updateField("timezone", val)}
            />
          </div>

          <div className="mt-8 space-y-3 text-xs">
            <p className="font-semibold text-text-primary">My email Address</p>
            <div className="flex items-center gap-3 rounded-2xl border border-card-border bg-card-bg px-4 py-3 shadow-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-tealGlow/20 text-[10px] text-tealGlow font-bold">
                @
              </div>
              <div>
                <p className="text-xs text-text-primary">{user?.email || "No email"}</p>
                <p className="text-[11px] text-text-muted">Registered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CitizenShell>
  );
}

function InfoField({
  label,
  value,
  placeholder = "Not provided",
  isEditing,
  onUpdate
}: {
  label: string;
  value: string;
  placeholder?: string;
  isEditing: boolean;
  onUpdate: (val: string) => void;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-semibold text-text-muted">{label}</p>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-tealGlow/30 bg-card-bg px-4 py-3 text-[11px] text-text-primary shadow-sm focus:outline-none focus:ring-1 focus:ring-tealGlow transition"
        />
      ) : (
        <div className="rounded-xl border border-card-border bg-card-bg px-4 py-3 text-[11px] text-text-primary shadow-sm min-h-[42px] flex items-center">
          {value || placeholder}
        </div>
      )}
    </div>
  );
}

