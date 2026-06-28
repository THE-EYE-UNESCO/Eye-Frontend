"use client";

import type { ReactNode } from "react";

export function CitizenSectionCard({
  title,
  children,
  className = "",
  eyebrow,
}: {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  eyebrow?: ReactNode;
}) {
  return (
    <section className={`glass-panel overflow-hidden shadow-card ${className}`}>
      {(title || eyebrow) && (
        <div className="border-b border-card-border px-5 py-4">
          {eyebrow && <div className="text-[10px] uppercase tracking-[0.24em] text-text-muted">{eyebrow}</div>}
          {title && <div className="mt-1 text-sm font-semibold text-text-primary">{title}</div>}
        </div>
      )}
      <div>{children}</div>
    </section>
  );
}
