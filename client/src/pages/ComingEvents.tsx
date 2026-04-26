import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { SESSION_TYPE_LABELS, SESSION_TYPE_COLOURS, formatSessionDate, groupByMonth } from "@/lib/sessionUtils";
import type { SessionType } from "@/lib/sessionUtils";
import { toast } from "sonner";
import { Loader2, CalendarDays, Clock, MapPin } from "lucide-react";

const STAGE_OPTIONS = [
  { value: "trying_to_conceive", label: "Trying to conceive" },
  { value: "pregnant", label: "Pregnant" },
  { value: "postnatal_0_6m", label: "Postnatal (0–6 months)" },
  { value: "postnatal_6_12m", label: "Postnatal (6–12 months)" },
  { value: "postnatal_12m_plus", label: "Postnatal (12+ months)" },
  { value: "other", label: "Other" },
];

export default function ComingEvents() {
  const { data: sessions, isLoading } = trpc.sessions.upcoming.useQuery();
  const submitBooking = trpc.bookings.submit.useMutation();
  const bookingRef = useRef<HTMLDivElement>(null);

  const [selectedSessionId, setSelectedSessionId] = useState<string>("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    stage: "", creche: false, consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeMonth, setActiveMonth] = useState<string>("all");

  const grouped = sessions ? groupByMonth(sessions) : [];
  const months = grouped.map((g) => g.month);

  const filteredGroups = activeMonth === "all"
    ? grouped
    : grouped.filter((g) => g.month === activeMonth);

  function handleBookClick(id: number) {
    setSelectedSessionId(String(id));
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent) { toast.error("Please confirm your consent to proceed."); return; }
    if (!selectedSessionId) { toast.error("Please select a session."); return; }
    try {
      await submitBooking.mutateAsync({
        ...form,
        sessionId: Number(selectedSessionId),
        stage: form.stage as any,
        phone: form.phone || undefined,
      });
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong. Please try again.");
    }
  }

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
            April – July 2026
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Coming Events</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Browse our upcoming sessions and book your place. All sessions run every Monday,
            10:00am – 12:00pm at 127 North Road Community Hall.
          </p>
        </div>
      </section>

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
            <p className="text-center text-gray-500 py-20">No upcoming sessions found.</p>
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
                  {group.sessions.map((s) => (
                    <div
                      key={s.id}
                      className="bg-white rounded-xl border p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
                      style={{ borderColor: "var(--cream-300)" }}
                    >
                      {/* Type badge */}
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${SESSION_TYPE_COLOURS[s.type as SessionType]}`}
                        >
                          {SESSION_TYPE_LABELS[s.type as SessionType]}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <CalendarDays size={12} />
                          {formatSessionDate(s.sessionDate instanceof Date ? s.sessionDate.toISOString().slice(0,10) : String(s.sessionDate))}
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

                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {s.startTime} – {s.endTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {s.venue}
                        </span>
                      </div>

                      <button
                        onClick={() => handleBookClick(s.id)}
                        className="mt-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
                        style={{ backgroundColor: "var(--teal-600)" }}
                      >
                        Book This Session
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ── Booking form ──────────────────────────────────────────────────── */}
      <section
        ref={bookingRef}
        id="book"
        className="py-16"
        style={{ backgroundColor: "var(--teal-900)" }}
      >
        <div className="container max-w-2xl">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--gold-400)" }}>
            Reserve Your Seat
          </p>
          <h2 className="text-3xl font-bold text-white mb-8">Book a Place</h2>

          {submitted ? (
            <div
              className="rounded-xl p-8 text-center"
              style={{ backgroundColor: "var(--teal-700)" }}
            >
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
              <p className="text-white/80">
                Thank you, {form.firstName}. We look forward to seeing you at the session.
                You will receive a confirmation email shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", phone: "", stage: "", creche: false, consent: false }); setSelectedSessionId(""); }}
                className="mt-6 px-6 py-2.5 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: "var(--gold-500)", color: "oklch(18% 0.02 185)" }}
              >
                Book Another Place
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1.5">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
                    placeholder="Sarah"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1.5">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
                    placeholder="Cohen"
                  />
                </div>
              </div>

              {/* Contact row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
                    placeholder="sarah@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40"
                    placeholder="07700 900000"
                  />
                </div>
              </div>

              {/* Session selector */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1.5">
                  Session <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={selectedSessionId}
                  onChange={(e) => setSelectedSessionId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-sm bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                  style={{ backgroundColor: "var(--teal-800)" }}
                >
                  <option value="" disabled>Select a session…</option>
                  {sessions?.map((s) => (
                    <option key={s.id} value={s.id} style={{ backgroundColor: "var(--teal-800)" }}>
                      {s.sessionDate instanceof Date ? s.sessionDate.toISOString().slice(0,10) : String(s.sessionDate)} — {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stage */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1.5">
                  Stage of Pregnancy / Motherhood <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={form.stage}
                  onChange={(e) => setForm({ ...form, stage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                  style={{ backgroundColor: "var(--teal-800)" }}
                >
                  <option value="" disabled>Select your stage…</option>
                  {STAGE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value} style={{ backgroundColor: "var(--teal-800)" }}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Crèche & consent */}
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.creche}
                    onChange={(e) => setForm({ ...form, creche: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-white/30 accent-gold-400"
                  />
                  <span className="text-sm text-white/85">
                    I would like to request a <strong>crèche place</strong> for my child at this session.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-white/30"
                  />
                  <span className="text-sm text-white/85">
                    I consent to my details being used to process this booking and to contact me
                    about this programme. <span className="text-red-400">*</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitBooking.isPending}
                className="w-full py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--gold-500)", color: "oklch(18% 0.02 185)" }}
              >
                {submitBooking.isPending && <Loader2 size={16} className="animate-spin" />}
                Confirm Booking
              </button>
            </form>
          )}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
