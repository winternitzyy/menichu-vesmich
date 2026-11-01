import { img } from "@/lib/asset";

// Continuously scrolling strip — 10 real event photos + 7 AI-generated scene images (19 total).
const IMAGES = [
  { src: img("event_real_02_d94a533a.webp"), alt: "Community gathering" },
  { src: img("photo_img4200_f927fb53.webp"), alt: "Mothers and babies at session" },
  { src: img("event_scene_01_482a5aad.png"), alt: "Mothers in community" },
  { src: img("event_real_03_9bbc84f1.webp"), alt: "Programme session" },
  { src: img("photo_img4205_0fcca610.webp"), alt: "Creative workshop" },
  { src: img("event_scene_02_d4f33690.png"), alt: "Workshop session" },
  { src: img("event_real_04_b5520abe.webp"), alt: "Volunteer training" },
  { src: img("photo_img4208_87cb15f1.webp"), alt: "Community celebration spread" },
  { src: img("event_real_01_90408138.webp"), alt: "Crèche & baby play" },
  { src: img("photo_img4225_d5c6a146.webp"), alt: "Group session with reading" },
  { src: img("event_scene_04_9c51a9e8.png"), alt: "Antenatal session" },
  { src: img("event_scene_05_7e02f167.png"), alt: "Community connection" },
  { src: img("photo_img4192_f202fc65.webp"), alt: "Welcome gift box" },
  { src: img("event_scene_06_f4e0ddee.png"), alt: "Expert talk" },
  { src: img("IMG_2653_5ac5e974.JPG"), alt: "Community event" },
  { src: img("event_scene_07_aee168eb.png"), alt: "Nutrition workshop" },
  { src: img("IMG_2656_429b8912.JPG"), alt: "Programme gathering" },
  { src: img("event_scene_08_c8e98eeb.png"), alt: "Celebration gathering" },
  { src: img("photo_img4215_234fc830.webp"), alt: "Outdoor art workshop" },
];

// Triple for a seamless infinite loop
const TRACK = [...IMAGES, ...IMAGES, ...IMAGES];

const ITEM_W = 360;
const GAP = 20;
const TOTAL_W = 19 * (ITEM_W + GAP); // 19 images total

export default function PhotoMarquee() {
  return (
    <section className="py-14 overflow-hidden" style={{ backgroundColor: "var(--teal-900)" }}>
      <div className="container mb-8 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--gold-400)" }}>
          Our Community in Action
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          The Program Atmosphere
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex"
          style={{
            gap: GAP,
            width: "max-content",
            animation: `marquee-photos 60s linear infinite`,
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
