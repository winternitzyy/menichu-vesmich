import { trpc } from "@/lib/trpc";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { SESSION_TYPE_LABELS, SESSION_TYPE_COLOURS, formatSessionDate, groupByMonth } from "@/lib/sessionUtils";
import type { SessionType } from "@/lib/sessionUtils";
import { Loader2, CalendarDays, Clock, MapPin } from "lucide-react";
import { useState } from "react";

export default function PastEvents() {
  const { data: sessions, isLoading } = trpc.sessions.past.useQuery();
  const [activeMonth, setActiveMonth] = useState<string>("all");

  // Group in reverse chronological order (already sorted desc from server)
  const grouped = sessions ? groupByMonth(sessions) : [];
  const months = grouped.map((g) => g.month);

  const filteredGroups = activeMonth === "all"
    ? grouped
    : grouped.filter((g) => g.month === activeMonth);

  // Summary counts by type
  const typeCounts: Record<string, number> = {};
  sessions?.forEach((s) => {
    typeCounts[s.type] = (typeCounts[s.type] ?? 0) + 1;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />

      {/* Page header */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, var(--teal-800) 0%, var(--teal-600) 100%)" }}
      >
        <div className="container">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--gold-400)" }}>
            December 2025 – April 2026
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Past Events</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            A record of all completed Menichu Vesmichu sessions, most recent first.
          </p>
        </div>
      </section>

      {/* Summary strip */}
      {sessions && sessions.length > 0 && (
        <section style={{ backgroundColor: "var(--teal-700)" }}>
          <div className="container py-6">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-white font-semibold text-sm mr-2">
                {sessions.length} sessions completed:
              </span>
              {Object.entries(typeCounts).map(([type, count]) => (
                <span
                  key={type}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${SESSION_TYPE_COLOURS[type as SessionType]}`}
                >
                  {SESSION_TYPE_LABELS[type as SessionType]} ({count})
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Month filter */}
      <div className="sticky top-16 z-40 bg-white border-b" style={{ borderColor: "var(--cream-300)" }}>
        <div className="container py-3 flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveMonth("all")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeMonth === "all" ? "text-white" : "bg-transparent hover:bg-gray-100"}`}
            style={activeMonth === "all" ? { backgroundColor: "var(--teal-600)" } : { color: "var(--teal-700)" }}
          >
            All
          </button>
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setActiveMonth(m)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeMonth === m ? "text-white" : "bg-transparent hover:bg-gray-100"}`}
              style={activeMonth === m ? { backgroundColor: "var(--teal-600)" } : { color: "var(--teal-700)" }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions list */}
      <section className="py-12 flex-1" style={{ backgroundColor: "var(--cream-50)" }}>
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin" style={{ color: "var(--teal-600)" }} size={32} />
            </div>
          ) : filteredGroups.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No past sessions found.</p>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.month} className="mb-12">
                <h2
                  className="text-2xl font-bold mb-6 pb-3 border-b"
                  style={{ color: "var(--teal-800)", borderColor: "var(--gold-300)" }}
                >
                  {group.month}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {group.sessions.map((s) => {
                    const dateStr = s.sessionDate instanceof Date
                      ? s.sessionDate.toISOString().slice(0, 10)
                      : String(s.sessionDate);
                    return (
                      <div
                        key={s.id}
                        className="bg-white rounded-xl border p-6 flex flex-col gap-3 opacity-90"
                        style={{ borderColor: "var(--cream-300)", borderLeft: "4px solid var(--teal-400)" }}
                      >
                        {/* Type badge + date */}
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${SESSION_TYPE_COLOURS[s.type as SessionType]}`}
                          >
                            {SESSION_TYPE_LABELS[s.type as SessionType]}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <CalendarDays size={12} />
                            {formatSessionDate(dateStr)}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold" style={{ color: "var(--teal-800)" }}>
                          {s.title}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: "var(--gold-700)" }}>
                          {s.topic}
                        </p>
                        {s.description && (
                          <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
                        )}

                        <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {s.startTime} – {s.endTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {s.venue}
                          </span>
                        </div>

                        <div
                          className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full self-start"
                          style={{ backgroundColor: "var(--cream-200)", color: "var(--teal-700)" }}
                        >
                          ✓ Completed
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ── Photo Gallery ─────────────────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "var(--cream-100)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--teal-600)" }}>
              From Our Sessions
            </p>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--teal-800)" }}>
              Moments From the Programme
            </h2>
            <p className="mt-3 text-base text-gray-500 max-w-xl mx-auto">
              A glimpse into the warmth, connection, and community that has made Menichu Vesmichu so special.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { src: "/manus-storage/event_real_02_d94a533a.webp", caption: "Community Gathering" },
              { src: "/manus-storage/event_real_03_9bbc84f1.webp", caption: "Programme Session" },
              { src: "/manus-storage/event_real_04_b5520abe.webp", caption: "Volunteer Training" },
              { src: "/manus-storage/event_real_01_90408138.webp", caption: "Crèche & Baby Play" },
            ].map((photo) => (
              <div
                key={photo.src}
                className="group relative overflow-hidden rounded-xl shadow-sm"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium">{photo.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
