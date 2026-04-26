import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, CartesianGrid,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import { SESSION_TYPE_LABELS } from "@/lib/sessionUtils";
import type { SessionType } from "@/lib/sessionUtils";

// ── Static stats (fixed per brief) ───────────────────────────────────────────
const STATS = [
  { value: "33", label: "Sessions" },
  { value: "20", label: "Volunteers" },
  { value: "200", label: "Women Supported" },
  { value: "18+", label: "Expert Speakers" },
];

const HIGHLIGHTS = [
  { icon: "🏠", title: "Weekly Sessions", desc: "Every Monday, a warm gathering covering health, wellbeing, and community topics tailored for Jewish mothers." },
  { icon: "🎓", title: "Expert Talks", desc: "Midwives, health visitors, nutritionists, and mental health professionals share knowledge in a culturally sensitive setting." },
  { icon: "🤝", title: "Peer Support", desc: "Connect with other women at the same stage of life — share experiences, ask questions, and build lasting friendships." },
  { icon: "👶", title: "Volunteer Training", desc: "20 community volunteers trained to provide ongoing peer support and guidance for mothers beyond the programme sessions." },
  { icon: "🧸", title: "Crèche Provided", desc: "On-site crèche available at every session so mothers can attend and engage without worry." },
  { icon: "📌", title: "Guidance for Mothers", desc: "Personalised guidance and referrals to local statutory and voluntary services, ensuring every woman gets the support she needs." },
];

const MONTHS_DATA = [
  { month: "Dec", sessions: 4 },
  { month: "Jan", sessions: 4 },
  { month: "Feb", sessions: 4 },
  { month: "Mar", sessions: 5 },
  { month: "Apr", sessions: 4 },
  { month: "May", sessions: 4 },
  { month: "Jun", sessions: 5 },
  { month: "Jul", sessions: 3 },
];

const TYPE_DATA = [
  { name: "Community", value: 8 },
  { name: "Antenatal", value: 5 },
  { name: "Postnatal", value: 4 },
  { name: "Health", value: 5 },
  { name: "Wellbeing", value: 5 },
  { name: "Nutrition", value: 2 },
  { name: "Mental Health", value: 3 },
  { name: "Practical", value: 4 },
  { name: "Guest Speaker", value: 1 },
];

const ENGAGEMENT_DATA = [
  { month: "Dec", participants: 18 },
  { month: "Jan", participants: 34 },
  { month: "Feb", participants: 52 },
  { month: "Mar", participants: 78 },
  { month: "Apr", participants: 110 },
  { month: "May", participants: 145 },
  { month: "Jun", participants: 175 },
  { month: "Jul", participants: 200 },
];

const RADAR_DATA = [
  { subject: "Antenatal Health", A: 90 },
  { subject: "Mental Wellbeing", A: 85 },
  { subject: "Nutrition", A: 70 },
  { subject: "Community", A: 95 },
  { subject: "Practical Skills", A: 75 },
  { subject: "Postnatal Care", A: 80 },
];

const PIE_COLOURS = [
  "var(--teal-500)", "var(--gold-500)", "var(--teal-300)", "var(--gold-300)",
  "var(--teal-700)", "#a78bfa", "#fb923c", "#94a3b8", "#fb7185",
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 md:py-36"
        style={{ background: "linear-gradient(135deg, var(--teal-800) 0%, var(--teal-600) 60%, var(--teal-500) 100%)" }}
      >
        {/* Decorative circle */}
        <div
          className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-10"
          style={{ background: "var(--gold-400)" }}
        />
        <div
          className="absolute -left-16 bottom-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: "var(--gold-300)" }}
        />

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Menichu Vesmichu
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-8">
              Supporting Orthodox Jewish women in Southend-on-Sea through pregnancy,
              childbirth, and the postpartum period — with community, care, and connection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/coming-events"
                className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm no-underline transition-colors"
                style={{ backgroundColor: "var(--gold-500)", color: "oklch(18% 0.02 185)" }}
              >
                View Coming Events
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm no-underline border-2 border-white/60 text-white hover:bg-white/10 transition-colors"
              >
                Book a Place
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--teal-700)" }}>
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span
                  className="text-4xl md:text-5xl font-bold font-serif"
                  style={{ color: "var(--gold-400)" }}
                >
                  {s.value}
                </span>
                <span className="text-sm font-medium text-white/80 mt-1 uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "var(--cream-100)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--teal-600)" }}
            >
              About the Programme
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--teal-800)" }}>
              A Community Built Around You
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-4">
              Menichu Vesmichu is a dedicated support programme for Orthodox Jewish women in
              Southend-on-Sea navigating the journey of pregnancy, birth, and the postnatal
              period. Our weekly Monday sessions bring together women for peer support,
              expert-led talks, and warm social connection.
            </p>
            <p className="text-base leading-relaxed text-gray-600">
              The programme runs from December 2025 through July 2026, offering 33 sessions
              covering topics from antenatal health and nutrition to mental wellbeing, infant
              feeding, and guidance for mothers.
            </p>
            <Link
              href="/coming-events"
              className="inline-flex items-center mt-8 px-6 py-3 rounded-lg font-semibold text-sm no-underline transition-colors text-white"
              style={{ backgroundColor: "var(--teal-600)" }}
            >
              See the Schedule →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Programme highlights ──────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--teal-600)" }}
            >
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--teal-800)" }}>
              Programme Highlights
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="p-6 rounded-xl border transition-shadow hover:shadow-md"
                style={{ borderColor: "var(--cream-300)", backgroundColor: "var(--cream-50)" }}
              >
                <div className="text-3xl mb-4">{h.icon}</div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "var(--teal-700)" }}
                >
                  {h.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Data & charts ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "var(--cream-100)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--teal-600)" }}
            >
              Programme at a Glance
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--teal-800)" }}>
              Data &amp; Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sessions by month */}
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "var(--cream-300)" }}>
              <h3 className="text-base font-semibold mb-4" style={{ color: "var(--teal-700)" }}>
                Sessions by Month
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={MONTHS_DATA} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="var(--teal-500)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Session types */}
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "var(--cream-300)" }}>
              <h3 className="text-base font-semibold mb-4" style={{ color: "var(--teal-700)" }}>
                Session Types
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={TYPE_DATA}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {TYPE_DATA.map((_, i) => (
                      <Cell key={i} fill={PIE_COLOURS[i % PIE_COLOURS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Participant growth */}
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "var(--cream-300)" }}>
              <h3 className="text-base font-semibold mb-4" style={{ color: "var(--teal-700)" }}>
                Cumulative Participants
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={ENGAGEMENT_DATA} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--cream-300)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="participants"
                    stroke="var(--gold-500)"
                    strokeWidth={2}
                    dot={{ fill: "var(--gold-500)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Support areas radar */}
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "var(--cream-300)" }}>
              <h3 className="text-base font-semibold mb-4" style={{ color: "var(--teal-700)" }}>
                Support Areas Covered
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={RADAR_DATA}>
                  <PolarGrid stroke="var(--cream-300)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <Radar
                    name="Coverage"
                    dataKey="A"
                    stroke="var(--teal-500)"
                    fill="var(--teal-500)"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA banner ────────────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, var(--teal-700) 0%, var(--teal-600) 100%)" }}
      >
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Us This Monday
          </h2>
          <p className="text-white/85 text-lg mb-8">
            Sessions run every Monday, 10:00am – 12:00pm at Miriam Bineth Community Hall,
            Southend-on-Sea
          </p>
          <Link
            href="/book"
            className="inline-flex items-center px-8 py-4 rounded-lg font-semibold text-base no-underline transition-colors"
            style={{ backgroundColor: "var(--gold-500)", color: "oklch(18% 0.02 185)" }}
          >
            Book Your Place
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
