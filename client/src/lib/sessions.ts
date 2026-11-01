import { SESSIONS, type ProgrammeSession } from "@/data/sessions";

export type { ProgrammeSession };

function todayStr(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Sessions after today, soonest first. */
export function getUpcomingSessions(): ProgrammeSession[] {
  const today = todayStr();
  return SESSIONS.filter((s) => s.sessionDate > today).sort((a, b) =>
    a.sessionDate.localeCompare(b.sessionDate)
  );
}

/** Sessions today or earlier, most recent first. */
export function getPastSessions(): ProgrammeSession[] {
  const today = todayStr();
  return SESSIONS.filter((s) => s.sessionDate <= today).sort((a, b) =>
    b.sessionDate.localeCompare(a.sessionDate)
  );
}

export function getSessionById(id: number): ProgrammeSession | undefined {
  return SESSIONS.find((s) => s.id === id);
}
