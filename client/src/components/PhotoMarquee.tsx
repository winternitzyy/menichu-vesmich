// Continuously scrolling strip — real event photos only, no generated materials.
const IMAGES = [
  { src: "/manus-storage/event_real_02_d94a533a.webp", alt: "Community gathering" },
  { src: "/manus-storage/event_real_03_9bbc84f1.webp", alt: "Programme session" },
  { src: "/manus-storage/event_real_04_b5520abe.webp", alt: "Volunteer training" },
  { src: "/manus-storage/event_real_01_90408138.webp", alt: "Crèche & baby play" },
];

// Quadruple for a seamless infinite loop
const TRACK = [...IMAGES, ...IMAGES, ...IMAGES, ...IMAGES];

const ITEM_W = 380;
const GAP = 20;
const TOTAL_W = IMAGES.length * (ITEM_W + GAP);

export default function PhotoMarquee() {
  return (
    <section className="py-14 overflow-hidden" style={{ backgroundColor: "var(--teal-900)" }}>
      <div className="container mb-8 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--gold-400)" }}>
          Our Community in Action
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Moments From the Programme
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex"
          style={{
            gap: GAP,
            width: "max-content",
            animation: `marquee-photos 30s linear infinite`,
          }}
        >
          {TRACK.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
              style={{ width: ITEM_W, height: 260 }}
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
        @keyframes marquee-photos {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${TOTAL_W}px); }
        }
      `}</style>
    </section>
  );
}
