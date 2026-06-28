export interface CitizenStory {
  id: string;
  author_name: string;
  title: string;
  body: string;
  image_url?: string;
  tag?: string;
  created_at: string;
}

export interface CitizenReport {
  id: string;
  title: string;
  category: string;
  address: string;
  created_at: string;
  severity: string;
}

export interface CitizenNewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url?: string;
}

export interface CitizenAlert {
  id: string;
  title: string;
  message: string;
  severity: string;
  affectedArea: string;
}

export interface DashboardSlide {
  id: string;
  image: string;
  title: string;
  description: string;
  alertType: string;
  alertColor: string;
}

export const SAFETY_GUIDANCE = [
  "Keep emergency kit ready",
  "Stay away from affected area",
  "Monitor official updates",
  "Help elderly and disabled neighbors",
];

export const SEVERITY_BADGE_CLASSES: Record<string, string> = {
  CRITICAL: "bg-red-500",
  HIGH: "bg-orange-500",
  MEDIUM: "bg-amber-400",
  LOW: "bg-emerald-400",
  DEFAULT: "bg-blue-500",
};

export function severityBadgeClass(severity: string): string {
  return SEVERITY_BADGE_CLASSES[severity?.toUpperCase()] ?? SEVERITY_BADGE_CLASSES.DEFAULT;
}

export function normalizeArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? value : [];
}

export function formatAlertTitle(title?: string): string {
  if (!title) return "Alert";
  return title.split(":")[1]?.trim() || title;
}
