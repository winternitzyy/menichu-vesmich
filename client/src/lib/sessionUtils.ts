export type SessionType =
  | "antenatal"
  | "postnatal"
  | "community"
  | "health"
  | "wellbeing"
  | "nutrition"
  | "mental_health"
  | "practical"
  | "guest_speaker";

export const SESSION_TYPE_LABELS: Record<SessionType, string> = {
  antenatal: "Antenatal",
  postnatal: "Postnatal",
  community: "Community",
  health: "Health",
  wellbeing: "Wellbeing",
  nutrition: "Nutrition",
  mental_health: "Mental Health",
  practical: "Practical",
  guest_speaker: "Guest Speaker",
};

export const SESSION_TYPE_COLOURS: Record<SessionType, string> = {
  antenatal:    "bg-teal-100 text-teal-800 border border-teal-200",
  postnatal:    "bg-purple-100 text-purple-800 border border-purple-200",
  community:    "bg-amber-100 text-amber-800 border border-amber-200",
  health:       "bg-green-100 text-green-800 border border-green-200",
  wellbeing:    "bg-pink-100 text-pink-800 border border-pink-200",
  nutrition:    "bg-orange-100 text-orange-800 border border-orange-200",
  mental_health:"bg-blue-100 text-blue-800 border border-blue-200",
  practical:    "bg-slate-100 text-slate-800 border border-slate-200",
  guest_speaker:"bg-rose-100 text-rose-800 border border-rose-200",
};

export const STAGE_LABELS: Record<string, string> = {
  trying_to_conceive: "Trying to conceive",
  pregnant: "Pregnant",
  postnatal_0_6m: "Postnatal (0–6 months)",
  postnatal_6_12m: "Postnatal (6–12 months)",
  postnatal_12m_plus: "Postnatal (12+ months)",
  other: "Other",
};

export function formatSessionDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function groupByMonth<T extends { sessionDate: string | Date }>(
  items: T[]
): { month: string; sessions: T[] }[] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const raw = item.sessionDate;
    const d = raw instanceof Date ? raw : new Date(String(raw) + "T00:00:00");
    const key = d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }
  return Array.from(map.entries()).map(([month, sessions]) => ({ month, sessions }));
}
