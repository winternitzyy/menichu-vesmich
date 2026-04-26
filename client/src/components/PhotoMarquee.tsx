// One continuously scrolling strip combining real event photos + generated programme materials.
const IMAGES = [
  // Real event photos
  { src: "/manus-storage/event_real_02_d94a533a.webp", alt: "Community gathering" },
  { src: "/manus-storage/event_real_03_9bbc84f1.webp", alt: "Programme session" },
  { src: "/manus-storage/event_real_04_b5520abe.webp", alt: "Volunteer training" },
  { src: "/manus-storage/event_real_01_90408138.webp", alt: "Crèche & baby play" },
  // Generated posters
  { src: "/manus-storage/poster_dec_2025_90de4329.png", alt: "December 2025 poster" },
  { src: "/manus-storage/poster_jan_2026_ee835a35.png", alt: "January 2026 poster" },
  { src: "/manus-storage/poster_feb_2026_5418b7ae.png", alt: "February 2026 poster" },
  { src: "/manus-storage/poster_mar_2026_9fe1c36b.png", alt: "March 2026 poster" },
  { src: "/manus-storage/poster_apr_2026_18267981.png", alt: "April 2026 poster" },
  { src: "/manus-storage/poster_may_2026_da2ed7be.png", alt: "May 2026 poster" },
  // Generated newsletters
  { src: "/manus-storage/newsletter_dec_2025_c4b80992.png", alt: "December 2025 newsletter" },
  { src: "/manus-storage/newsletter_jan_2026_484e68d6.png", alt: "January 2026 newsletter" },
  { src: "/manus-storage/newsletter_feb_2026_64ac5458.png", alt: "February 2026 newsletter" },
  { src: "/manus-storage/newsletter_mar_2026_2de0291d.png", alt: "March 2026 newsletter" },
  { src: "/manus-storage/newsletter_apr_2026_bab5c750.png", alt: "April 2026 newsletter" },
  { src: "/manus-storage/newsletter_may_2026_9f9ae6af.png", alt: "May 2026 newsletter" },
];

// Triple the array for a seamless infinite loop
const TRACK = [...IMAGES, ...IMAGES, ...IMAGES];

const ITEM_W = 260; // px width of each card
const GAP = 16;     // px gap between cards
const TOTAL_W = IMAGES.length * (ITEM_W + GAP); // one full cycle width

export default function PhotoMarquee() {
  return (
    <section className="py-14 overflow-hidden" style={{ backgroundColor: "var(--teal-900)" }}>
      {/* Heading */}
      <div className="container mb-8 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--gold-400)" }}>
          Our Community in Action
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Moments &amp; Programme Materials
        </h2>
        <p className="mt-2 text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
          Real photos from our sessions alongside the monthly posters and newsletters we produced throughout the programme.
        </p>
      </div>

      {/* Scrolling strip */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex"
          style={{
            gap: GAP,
            width: "max-content",
            animation: `marquee-scroll 55s linear infinite`,
          }}
        >
          {TRACK.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
              style={{ width: ITEM_W, height: 200 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${TOTAL_W}px); }
        }
      `}</style>
    </section>
  );
}
