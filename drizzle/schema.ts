import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  date,
  time,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Sessions ────────────────────────────────────────────────────────────────

export const sessions = mysqlTable("sessions", {
  id: int("id").autoincrement().primaryKey(),
  sessionDate: date("sessionDate").notNull(),
  startTime: varchar("startTime", { length: 8 }).notNull().default("10:00"),
  endTime: varchar("endTime", { length: 8 }).notNull().default("12:00"),
  title: varchar("title", { length: 255 }).notNull(),
  topic: varchar("topic", { length: 255 }).notNull(),
  type: mysqlEnum("type", [
    "antenatal",
    "postnatal",
    "community",
    "health",
    "wellbeing",
    "nutrition",
    "mental_health",
    "practical",
    "guest_speaker",
  ])
    .notNull()
    .default("community"),
  description: text("description"),
  venue: varchar("venue", { length: 255 })
    .notNull()
    .default("Miriam Bineth Community Hall, Southend-on-Sea"),
  isPast: boolean("isPast").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  sessionId: int("sessionId").notNull(),
  stage: mysqlEnum("stage", [
    "trying_to_conceive",
    "pregnant",
    "postnatal_0_6m",
    "postnatal_6_12m",
    "postnatal_12m_plus",
    "other",
  ]).notNull(),
  creche: boolean("creche").notNull().default(false),
  consent: boolean("consent").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

