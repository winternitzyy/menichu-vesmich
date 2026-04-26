import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";

// ── Static stats (fixed per brief) ───────────────────────────────────────────
const STATS = [
  { value: "33", label: "Sessions" },
  { value: "20", label: "Volunteers" },
  { value: "200", label: "Women Supported" },
  { value: "18+", label: "Topics Discussed" },
];

const HIGHLIGHTS = [
  { icon: "🏠", title: "Weekly Sessions", desc: "Warm gathering covering health, wellbeing, and community topics tailored for mothers in Southend-on-Sea." },
  { icon: "🎓", title: "Expert Talks", desc: "Midwives, health visitors, nutritionists, and mental health professionals share knowledge in a welcoming and supportive setting." },
  { icon: "🤝", title: "Peer Support", desc: "Connect with other women at the same stage of life — share experiences, ask questions, and build lasting friendships." },
  { icon: "👶", title: "Volunteer Training", desc: "20 community volunteers trained to provide ongoing peer support and guidance for mothers beyond the programme sessions." },
  { icon: "🧸", title: "Crèche Provided", desc: "On-site crèche available at every session so mothers can attend and engage without worry." },
  { icon: "📌", title: "Guidance for Mothers", desc: "Personalised guidance and referrals to local statutory and voluntary services, ensuring every woman gets the support she needs." },
];

const GALLERY = [
  { src: "/manus-storage/final_poster_01_launch_efb6bb50.png", caption: "Programme Launch" },
  { src: "/manus-storage/final_poster_02_weekly_17dffeea.png", caption: "Weekly Sessions" },
  { src: "/manus-storage/final_poster_03_volunteer_845d1afd.png", caption: "Volunteer Training" },
  { src: "/manus-storage/final_poster_04_expert_talks_2ee588d4.png", caption: "Expert Talks" },
  { src: "/manus-storage/final_poster_05_mentalhealth_7d0518ae.png", caption: "Mental Wellbeing" },
  { src: "/manus-storage/final_poster_06_social_69b5f0e8.png", caption: "Social Gathering" },
  { src: "/manus-storage/final_poster_07_spring_af017f7a.png", caption: "Spring Sessions" },
  { src: "/manus-storage/final_poster_08_savedate_d77cc4f9.png", caption: "Save the Date" },
  { src: "/manus-storage/final_poster_09_peersupport_c3c91764.png", caption: "Peer Support" },
  { src: "/manus-storage/final_poster_10_celebration_837ffa5c.png", caption: "Community Celebration" },
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
              Supporting women in Southend-on-Sea through pregnancy,
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
              Menichu Vesmichu is a dedicated support programme for women in
              Southend-on-Sea navigating the journey of pregnancy, birth, and the postnatal
              period. Our weekly Monday sessions bring together women for peer support,
              expert-led talks, and warm social connection.
            </p>
            <p className="text-base leading-relaxed text-gray-600">
              The programme covers topics from antenatal health and nutrition to mental wellbeing, infant
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

      {/* ── Past Events Gallery ────────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "var(--cream-100)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--teal-600)" }}
            >
              Our Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--teal-800)" }}>
              Past Events
            </h2>
            <p className="mt-3 text-base" style={{ color: "var(--teal-600)" }}>
              A glimpse into the sessions, gatherings, and moments that have shaped our community.
            </p>
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {GALLERY.map((item, i) => (
              <div
                key={i}
                className="break-inside-avoid rounded-xl overflow-hidden shadow-sm group relative"
                style={{ border: "1px solid var(--cream-300)" }}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(0,40,35,0.75) 0%, transparent 60%)" }}
                >
                  <span className="text-white text-sm font-medium px-3 pb-3">{item.caption}</span>
                </div>
              </div>
            ))}
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
            Sessions run every Monday, 10:00am – 12:00pm at 127 North Road Community Hall,
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
