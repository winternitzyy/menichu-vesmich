// Continuously scrolling photo strip — no pauses, no controls, pure CSS animation.
const PHOTOS = [
  { src: "/manus-storage/event_real_02_d94a533a.webp", alt: "Community gathering" },
  { src: "/manus-storage/event_real_03_9bbc84f1.webp", alt: "Programme session" },
  { src: "/manus-storage/event_real_04_b5520abe.webp", alt: "Volunteer training" },
  { src: "/manus-storage/event_real_01_90408138.webp", alt: "Crèche & baby play" },
];

// Duplicate the array so the loop is seamless
const TRACK = [...PHOTOS, ...PHOTOS, ...PHOTOS];

export default function PhotoMarquee() {
  return (
    <section className="py-12 overflow-hidden" style={{ backgroundColor: "var(--teal-900)" }}>
      {/* Section label */}
      <div className="container mb-6 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--gold-400)" }}>
          From Our Sessions
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
          Moments From the Programme
        </h2>
      </div>

      {/* Scrolling track */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-4"
          style={{
            width: "max-content",
            animation: "marquee 28s linear infinite",
          }}
        >
          {TRACK.map((photo, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
              style={{ width: 320, height: 240 }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Keyframe injected inline so it works without a separate CSS file */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-320px * ${PHOTOS.length} - 1rem * ${PHOTOS.length})); }
        }
      `}</style>
    </section>
  );
}
