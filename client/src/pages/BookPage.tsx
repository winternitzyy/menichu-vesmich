import { useState } from "react";
import { trpc } from "@/lib/trpc";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const STAGE_OPTIONS = [
  { value: "trying_to_conceive", label: "Trying to conceive" },
  { value: "pregnant", label: "Pregnant" },
  { value: "postnatal_0_6m", label: "Postnatal (0–6 months)" },
  { value: "postnatal_6_12m", label: "Postnatal (6–12 months)" },
  { value: "postnatal_12m_plus", label: "Postnatal (12+ months)" },
  { value: "other", label: "Other" },
];

export default function BookPage() {
  const { data: sessions } = trpc.sessions.upcoming.useQuery();
  const submitBooking = trpc.bookings.submit.useMutation();

  const [selectedSessionId, setSelectedSessionId] = useState<string>("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    stage: "", creche: false, consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

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
            Reserve Your Seat
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Book a Place</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Complete the form below to reserve your place at an upcoming session.
            Sessions run every Monday, 10:00am – 12:00pm.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 flex-1" style={{ backgroundColor: "var(--cream-50)" }}>
        <div className="container max-w-2xl">
          {submitted ? (
            <div
              className="rounded-xl p-10 text-center border"
              style={{ backgroundColor: "white", borderColor: "var(--cream-300)" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
                style={{ backgroundColor: "var(--teal-100)", color: "var(--teal-700)" }}
              >
                ✓
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--teal-800)" }}>
                Booking Confirmed!
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you, {form.firstName}. We look forward to seeing you at the session.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ firstName: "", lastName: "", email: "", phone: "", stage: "", creche: false, consent: false });
                  setSelectedSessionId("");
                }}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: "var(--teal-600)" }}
              >
                Book Another Place
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border p-8" style={{ borderColor: "var(--cream-300)" }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--teal-800)" }}>
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:ring-2"
                      style={{ borderColor: "var(--cream-300)", "--tw-ring-color": "var(--teal-400)" } as any}
                      placeholder="Sarah"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--teal-800)" }}>
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:ring-2"
                      style={{ borderColor: "var(--cream-300)" } as any}
                      placeholder="Cohen"
                    />
                  </div>
                </div>

                {/* Contact row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--teal-800)" }}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:ring-2"
                      style={{ borderColor: "var(--cream-300)" } as any}
                      placeholder="sarah@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--teal-800)" }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:ring-2"
                      style={{ borderColor: "var(--cream-300)" } as any}
                      placeholder="07700 900000"
                    />
                  </div>
                </div>

                {/* Session selector */}
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--teal-800)" }}>
                    Session <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={selectedSessionId}
                    onChange={(e) => setSelectedSessionId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg text-sm border bg-white focus:outline-none focus:ring-2"
                    style={{ borderColor: "var(--cream-300)" } as any}
                  >
                    <option value="" disabled>Select a session…</option>
                    {sessions?.map((s) => {
                      const dateStr = s.sessionDate instanceof Date
                        ? s.sessionDate.toISOString().slice(0, 10)
                        : String(s.sessionDate);
                      return (
                        <option key={s.id} value={s.id}>
                          {dateStr} — {s.title}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Stage */}
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--teal-800)" }}>
                    Stage of Pregnancy / Motherhood <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={form.stage}
                    onChange={(e) => setForm({ ...form, stage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-sm border bg-white focus:outline-none focus:ring-2"
                    style={{ borderColor: "var(--cream-300)" } as any}
                  >
                    <option value="" disabled>Select your stage…</option>
                    {STAGE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* Crèche & consent */}
                <div
                  className="space-y-3 p-4 rounded-lg border"
                  style={{ borderColor: "var(--cream-300)", backgroundColor: "var(--cream-50)" }}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.creche}
                      onChange={(e) => setForm({ ...form, creche: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded"
                      style={{ accentColor: "var(--teal-600)" }}
                    />
                    <span className="text-sm text-gray-700">
                      I would like to request a <strong>crèche place</strong> for my child at this session.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded"
                      style={{ accentColor: "var(--teal-600)" }}
                    />
                    <span className="text-sm text-gray-700">
                      I consent to my details being used to process this booking and to contact me
                      about this programme. <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitBooking.isPending}
                  className="w-full py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-white"
                  style={{ backgroundColor: "var(--teal-600)" }}
                >
                  {submitBooking.isPending && <Loader2 size={16} className="animate-spin" />}
                  Confirm Booking
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
