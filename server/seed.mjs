/**
 * Seed script — run once: node server/seed.mjs
 * Seeds all 33 Menichu Vesmich sessions (Dec 2025 – Jul 2026)
 */
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const VENUE = "127 North Road Community Hall";

const ALL_SESSIONS = [
  // ── December 2025 ──────────────────────────────────────────────────────────
  { sessionDate: "2025-12-01", title: "Welcome & Programme Launch", topic: "Introduction to Menichu Vesmich", type: "community", description: "An introductory session welcoming participants to the Menichu Vesmich programme. Meet the team, hear about what to expect, and connect with other women in the community.", isPast: true },
  { sessionDate: "2025-12-08", title: "Antenatal Health Essentials", topic: "Pregnancy health & nutrition", type: "antenatal", description: "A midwife-led session covering the essentials of staying healthy during pregnancy — nutrition, exercise, and what to expect at antenatal appointments.", isPast: true },
  { sessionDate: "2025-12-15", title: "Understanding Your Body in Pregnancy", topic: "Physical changes & self-care", type: "antenatal", description: "An open discussion about the physical and emotional changes of pregnancy, with practical self-care tips from a specialist health visitor.", isPast: true },
  { sessionDate: "2025-12-22", title: "Community Celebration & Chanukah", topic: "Festive community gathering", type: "community", description: "A festive gathering celebrating Chanukah and the spirit of community. Light refreshments, candle lighting, and time to connect.", isPast: true },

  // ── January 2026 ───────────────────────────────────────────────────────────
  { sessionDate: "2026-01-05", title: "Birth Preparation", topic: "Labour, birth options & birth plans", type: "antenatal", description: "A comprehensive session on preparing for labour and birth — covering birth options, pain relief, and how to write a birth plan that reflects your values.", isPast: true },
  { sessionDate: "2026-01-12", title: "Mental Wellbeing in Pregnancy", topic: "Perinatal mental health", type: "mental_health", description: "A specialist perinatal mental health practitioner discusses anxiety, low mood, and how to seek support during pregnancy and the postnatal period.", isPast: true },
  { sessionDate: "2026-01-19", title: "Infant Feeding: Breastfeeding & Beyond", topic: "Feeding choices & support", type: "postnatal", description: "An infant feeding specialist covers breastfeeding, formula feeding, and combination feeding — with space for questions in a non-judgmental setting.", isPast: true },
  { sessionDate: "2026-01-26", title: "Peer Support Circle", topic: "Sharing experiences & building connections", type: "community", description: "A facilitated peer support circle where women share their experiences, ask questions, and build lasting friendships within the community.", isPast: true },

  // ── February 2026 ──────────────────────────────────────────────────────────
  { sessionDate: "2026-02-02", title: "Newborn Care Basics", topic: "Caring for your newborn", type: "practical", description: "Practical guidance on newborn care — bathing, nappy changing, safe sleep, and recognising when your baby is unwell.", isPast: true },
  { sessionDate: "2026-02-09", title: "Postnatal Recovery", topic: "Physical recovery after birth", type: "postnatal", description: "A physiotherapist and midwife discuss postnatal physical recovery, pelvic floor health, and returning to activity safely.", isPast: true },
  { sessionDate: "2026-02-16", title: "Nutrition for New Mothers", topic: "Postnatal nutrition & energy", type: "nutrition", description: "A registered nutritionist shares practical advice on eating well in the postnatal period — including quick meals, energy-boosting foods, and practical dietary considerations.", isPast: true },
  { sessionDate: "2026-02-23", title: "Sleep & Settling", topic: "Infant sleep strategies", type: "practical", description: "Evidence-based strategies for helping your baby sleep, managing night wakings, and looking after your own sleep health as a new parent.", isPast: true },

  // ── March 2026 ─────────────────────────────────────────────────────────────
  { sessionDate: "2026-03-02", title: "Postnatal Mental Health", topic: "Baby blues, PND & anxiety", type: "mental_health", description: "A frank and supportive session on postnatal depression, anxiety, and the baby blues — with information on local support services and how to help a friend.", isPast: true },
  { sessionDate: "2026-03-09", title: "Relationships & Parenthood", topic: "Navigating relationships after baby", type: "wellbeing", description: "A relationship counsellor discusses how parenthood changes relationships — with partners, family, and friends — and practical ways to maintain connection.", isPast: true },
  { sessionDate: "2026-03-16", title: "Baby Development 0–6 Months", topic: "Developmental milestones", type: "health", description: "A health visitor explains developmental milestones in the first six months, how to support your baby's development through play, and what to look out for.", isPast: true },
  { sessionDate: "2026-03-23", title: "Returning to Work", topic: "Maternity leave, childcare & career", type: "practical", description: "An employment adviser and a local childcare coordinator discuss maternity rights, childcare options, and planning a return to work.", isPast: true },
  { sessionDate: "2026-03-30", title: "Guidance for Mothers", topic: "Local services & support networks", type: "community", description: "Personalised guidance for mothers on local statutory and voluntary services available in Southend-on-Sea, with representatives from key organisations attending.", isPast: true },

  // ── April 2026 ─────────────────────────────────────────────────────────────
  { sessionDate: "2026-04-06", title: "Weaning & Solid Foods", topic: "Introduction to solid foods", type: "nutrition", description: "A dietitian guides participants through baby-led weaning and traditional weaning approaches, with practical tips on first foods and allergy awareness.", isPast: true },
  { sessionDate: "2026-04-13", title: "Mindfulness for Mothers", topic: "Mindfulness & stress reduction", type: "wellbeing", description: "A mindfulness practitioner leads a practical session on using mindfulness techniques to manage stress, anxiety, and the demands of new parenthood.", isPast: true },
  { sessionDate: "2026-04-20", title: "Volunteer Celebration", topic: "Recognising our volunteers", type: "community", description: "A special session celebrating the 20 trained community volunteers who support the programme, with presentations and community recognition.", isPast: true },

  // ── April 2026 (upcoming) ──────────────────────────────────────────────────
  { sessionDate: "2026-04-27", title: "Baby Massage & Touch", topic: "Infant massage techniques", type: "health", description: "A certified infant massage instructor teaches gentle massage techniques to support bonding, digestion, and sleep.", isPast: false },

  // ── May 2026 ───────────────────────────────────────────────────────────────
  { sessionDate: "2026-05-04", title: "Dental Health in Pregnancy & Infancy", topic: "Oral health for mothers & babies", type: "health", description: "A dental hygienist covers the importance of oral health during pregnancy and how to care for your baby's first teeth.", isPast: false },
  { sessionDate: "2026-05-11", title: "Managing Anxiety", topic: "Practical anxiety management tools", type: "mental_health", description: "A cognitive behavioural therapist shares practical tools for managing anxiety in the perinatal period, including breathing techniques and thought challenging.", isPast: false },
  { sessionDate: "2026-05-18", title: "Immunisations & Child Health", topic: "Vaccination schedule & child health checks", type: "health", description: "A health visitor explains the childhood vaccination schedule, what to expect at health checks, and how to prepare your baby for appointments.", isPast: false },
  { sessionDate: "2026-05-25", title: "Identity & Motherhood", topic: "Raising children with confidence & identity", type: "community", description: "A community educator leads a discussion on raising confident, grounded children in a modern context.", isPast: false },

  // ── June 2026 ──────────────────────────────────────────────────────────────
  { sessionDate: "2026-06-01", title: "Physical Activity for Mothers", topic: "Safe exercise postnatally", type: "wellbeing", description: "A postnatal fitness instructor demonstrates safe and effective exercises for new mothers, including pelvic floor rehabilitation and gentle strength work.", isPast: false },
  { sessionDate: "2026-06-08", title: "Toddler Behaviour & Boundaries", topic: "Positive parenting strategies", type: "practical", description: "A child psychologist discusses toddler behaviour, setting loving boundaries, and positive parenting strategies that work.", isPast: false },
  { sessionDate: "2026-06-15", title: "Financial Wellbeing for Families", topic: "Benefits, budgeting & financial support", type: "practical", description: "A financial adviser covers benefits available to new families, budgeting tips, and local financial support services.", isPast: false },
  { sessionDate: "2026-06-22", title: "Guest Speaker: Maternal Health", topic: "Expert talk on maternal health outcomes", type: "guest_speaker", description: "A leading maternal health researcher presents findings on maternal health outcomes in minority communities and what can be done to improve them.", isPast: false },
  { sessionDate: "2026-06-29", title: "Creative Wellbeing", topic: "Art, craft & wellbeing", type: "wellbeing", description: "A creative wellbeing practitioner leads a hands-on session using art and craft as tools for emotional expression and stress relief.", isPast: false },

  // ── July 2026 ──────────────────────────────────────────────────────────────
  { sessionDate: "2026-07-06", title: "Preparing for Summer", topic: "Sun safety, travel & summer health", type: "health", description: "Practical advice on keeping babies and young children safe and healthy during summer — sun protection, travel tips, and managing heat.", isPast: false },
  { sessionDate: "2026-07-13", title: "Looking After Yourself", topic: "Self-care & personal wellbeing", type: "wellbeing", description: "A holistic wellbeing coach leads a session on the importance of self-care for mothers — practical strategies that fit into busy family life.", isPast: false },
  { sessionDate: "2026-07-20", title: "Programme Graduation & Celebration", topic: "Celebrating our community", type: "community", description: "The final session of the Menichu Vesmich 2025–2026 programme. A celebration of the community built, the journeys taken, and the friendships formed.", isPast: false },
  { sessionDate: "2026-07-27", title: "Guidance for Mothers & Next Steps", topic: "Ongoing support & community resources", type: "community", description: "A final guidance session connecting participants with ongoing support services, community groups, and resources to carry them forward.", isPast: false },
];

async function seed() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection);

  // Check if already seeded
  const existing = await connection.query("SELECT COUNT(*) as count FROM sessions");
  const count = existing[0][0].count;
  if (count > 0) {
    console.log(`[Seed] Already seeded (${count} sessions found). Skipping.`);
    await connection.end();
    return;
  }

  console.log(`[Seed] Inserting ${ALL_SESSIONS.length} sessions...`);
  for (const s of ALL_SESSIONS) {
    await connection.query(
      `INSERT INTO sessions (sessionDate, startTime, endTime, title, topic, type, description, venue, isPast) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [s.sessionDate, "10:00", "12:00", s.title, s.topic, s.type, s.description, VENUE, s.isPast ? 1 : 0]
    );
  }
  console.log(`[Seed] Done — ${ALL_SESSIONS.length} sessions inserted.`);
  await connection.end();
}

seed().catch((err) => {
  console.error("[Seed] Error:", err);
  process.exit(1);
});
