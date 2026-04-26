import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { src: "/manus-storage/poster_dec_2025_90de4329.png", label: "December 2025 — Programme Launch", type: "Poster" },
  { src: "/manus-storage/newsletter_dec_2025_c4b80992.png", label: "December 2025 — Newsletter", type: "Newsletter" },
  { src: "/manus-storage/poster_jan_2026_ee835a35.png", label: "January 2026 — Monthly Sessions", type: "Poster" },
  { src: "/manus-storage/newsletter_jan_2026_484e68d6.png", label: "January 2026 — Newsletter", type: "Newsletter" },
  { src: "/manus-storage/poster_feb_2026_5418b7ae.png", label: "February 2026 — Monthly Sessions", type: "Poster" },
  { src: "/manus-storage/newsletter_feb_2026_64ac5458.png", label: "February 2026 — Newsletter", type: "Newsletter" },
  { src: "/manus-storage/poster_mar_2026_9fe1c36b.png", label: "March 2026 — Monthly Sessions", type: "Poster" },
  { src: "/manus-storage/newsletter_mar_2026_2de0291d.png", label: "March 2026 — Newsletter", type: "Newsletter" },
  { src: "/manus-storage/poster_apr_2026_18267981.png", label: "April 2026 — Monthly Sessions", type: "Poster" },
  { src: "/manus-storage/newsletter_apr_2026_bab5c750.png", label: "April 2026 — Newsletter", type: "Newsletter" },
  { src: "/manus-storage/poster_may_2026_da2ed7be.png", label: "May 2026 — Coming Up", type: "Poster" },
  { src: "/manus-storage/newsletter_may_2026_9f9ae6af.png", label: "May 2026 — Newsletter", type: "Newsletter" },
];

const INTERVAL_MS = 2500; // fast rotation — 2.5 seconds per slide

export default function PromoSlideshow() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fade, setFade] = useState(true);

  const goTo = useCallback((index: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrent((index + SLIDES.length) % SLIDES.length);
      setFade(true);
    }, 200);
  }, []);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => goTo(current + 1), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [current, paused, goTo]);

  const slide = SLIDES[current];

  return (
    <section className="py-16" style={{ backgroundColor: "var(--teal-900)" }}>
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--gold-400)" }}>
            Programme Materials
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Monthly Posters &amp; Newsletters
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
            Each month we produced a poster and newsletter to keep our community informed and connected.
          </p>
        </div>

        {/* Slideshow */}
        <div
          className="relative mx-auto"
          style={{ maxWidth: 520 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Image */}
          <div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: "3/4", background: "var(--teal-800)" }}
          >
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.label}
              className="w-full h-full object-contain transition-opacity duration-200"
              style={{ opacity: fade ? 1 : 0 }}
            />
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors"
            style={{ backgroundColor: "var(--gold-400)", color: "var(--teal-900)" }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors"
            style={{ backgroundColor: "var(--gold-400)", color: "var(--teal-900)" }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Caption */}
          <div className="mt-4 text-center">
            <span
              className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold mb-1"
              style={{ backgroundColor: "var(--gold-400)", color: "var(--teal-900)" }}
            >
              {slide.type}
            </span>
            <p className="text-white/80 text-sm">{slide.label}</p>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-6 flex-wrap">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                backgroundColor: i === current ? "var(--gold-400)" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        {/* Pause hint */}
        <p className="text-center text-xs mt-3" style={{ color: "rgba(255,255,255,0.35)" }}>
          Hover to pause · {current + 1} / {SLIDES.length}
        </p>
      </div>
    </section>
  );
}
