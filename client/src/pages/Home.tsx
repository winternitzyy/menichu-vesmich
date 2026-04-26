import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import PhotoMarquee from "@/components/PhotoMarquee";

// ── Static stats (fixed per brief) ───────────────────────────────────────────
const STATS = [
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
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663377220004/9KyRemormJqYQvzKhcafTt/event_scene_01-LpixZkw2kduXbFm4mmsPHw.webp", caption: "Community Gathering" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663377220004/9KyRemormJqYQvzKhcafTt/event_scene_02-ivW9sH4vzEHbnhevsMyPuQ.webp", caption: "Health Workshop" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663377220004/9KyRemormJqYQvzKhcafTt/event_scene_03-e9RC7iiaYH7Vps78p8bcK7.webp", caption: "Mother & Baby Group" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663377220004/9KyRemormJqYQvzKhcafTt/event_scene_04-WnGQvWL6cr3ShcDmQnk3ZF.webp", caption: "Peer Support" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663377220004/9KyRemormJqYQvzKhcafTt/event_scene_05-9BN8rXXBPVENTxtW2mAk7Z.webp", caption: "Community Celebration" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663377220004/9KyRemormJqYQvzKhcafTt/event_scene_06-DDyd2EFEUUGe9c2aSWf68Q.webp", caption: "Mental Wellbeing Session" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663377220004/9KyRemormJqYQvzKhcafTt/event_scene_07-9YKdXCVik8sENkL3pAYt9H.webp", caption: "Volunteer Training" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663377220004/9KyRemormJqYQvzKhcafTt/event_scene_08-8FDtFMD8duhQaX7xEbd4XR.webp", caption: "Nutrition Workshop" },
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
          <div className="flex flex-wrap justify-center gap-12 text-center">
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

         {/* ── Testimonialss ────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "var(--teal-900)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--gold-400)" }}
            >
              Voices from Our Community
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              What Our Participants Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "Coming to these sessions was the best decision I made during my pregnancy. I felt so supported and never judged. The friendships I made here will last a lifetime.",
                name: "Rivka S.",
                detail: "First-time mother, attended since January 2026",
              },
              {
                quote: "The crèche meant I could actually sit and listen and take things in for the first time since having my baby. I left every Monday feeling calmer and more confident.",
                name: "Chana M.",
                detail: "Mother of two, joined February 2026",
              },
              {
                quote: "I was struggling with the transition to motherhood and didn't know where to turn. This programme gave me practical tools and a community that truly understands.",
                name: "Devorah L.",
                detail: "Attended from December 2025",
              },
              {
                quote: "The nutrition session completely changed how I think about feeding my family. The information was clear, relevant, and presented in a way that made sense for our lifestyle.",
                name: "Miriam K.",
                detail: "Mother of three, joined March 2026",
              },
              {
                quote: "I was nervous to come at first, but from the very first session I felt at home. The facilitators are warm, knowledgeable, and genuinely care about every woman in the room.",
                name: "Leah B.",
                detail: "First-time mother, attended since April 2026",
              },
              {
                quote: "The mental wellbeing session was exactly what I needed. It gave me permission to talk about the hard parts of motherhood in a safe, understanding space.",
                name: "Esther F.",
                detail: "Mother of two, joined January 2026",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ backgroundColor: "var(--teal-800)", border: "1px solid var(--teal-700)" }}
              >
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
                  <path d="M0 20V12.5C0 5.596 3.93 1.5 11.79 0l1.21 2C8.87 3.167 6.667 5.5 6 9h5V20H0Zm16 0V12.5C16 5.596 19.93 1.5 27.79 0L29 2c-4.13 1.167-6.333 3.5-7 7h5V20H16Z" fill="var(--gold-400)" opacity="0.6"/>
                </svg>
                <p className="text-white/90 text-sm leading-relaxed flex-1">{t.quote}</p>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--gold-400)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--teal-300)" }}>{t.detail}</p>
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
            Join Us For Our Sessions
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

      {/* ── Scrolling photo strip ─────────────────────────────────────────────────── */}
      <PhotoMarquee />

      <PublicFooter />
    </div>
  );
}
