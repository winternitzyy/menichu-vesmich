import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { sendBookingNotificationEmail } from "./email";
import { donationsRouter } from "./routers/donations";
import {
  getAllSessions,
  getUpcomingSessions,
  getPastSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
  getSessionCount,
  createBooking,
  getAllBookings,
  getAllBookingsWithSession,
  getBookingsBySession,
} from "./db";

// ─── Admin guard ──────────────────────────────────────────────────────────────
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// ─── Session input schema ─────────────────────────────────────────────────────
const sessionTypeEnum = z.enum([
  "antenatal",
  "postnatal",
  "community",
  "health",
  "wellbeing",
  "nutrition",
  "mental_health",
  "practical",
  "guest_speaker",
]);

const sessionInput = z.object({
  sessionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().default("10:00"),
  endTime: z.string().default("12:00"),
  title: z.string().min(1),
  topic: z.string().min(1),
  type: sessionTypeEnum,
  description: z.string().optional(),
  venue: z.string().default("Miriam Bineth Community Hall, Southend-on-Sea"),
  isPast: z.boolean().default(false),
});

// ─── Booking input schema ─────────────────────────────────────────────────────
const stageEnum = z.enum([
  "trying_to_conceive",
  "pregnant",
  "postnatal_0_6m",
  "postnatal_6_12m",
  "postnatal_12m_plus",
  "other",
]);

const bookingInput = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  sessionId: z.number().int().positive(),
  stage: stageEnum,
  creche: z.boolean().default(false),
  consent: z.boolean(),
});

// ─── App router ───────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  donations: donationsRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Sessions ──────────────────────────────────────────────────────────────
  sessions: router({
    all: publicProcedure.query(() => getAllSessions()),
    upcoming: publicProcedure.query(() => getUpcomingSessions()),
    past: publicProcedure.query(() => getPastSessions()),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(({ input }) =>
      getSessionById(input.id)
    ),
    count: publicProcedure.query(() => getSessionCount()),
    create: adminProcedure.input(sessionInput).mutation(({ input }) =>
      createSession(input as any)
    ),
    update: adminProcedure
      .input(z.object({ id: z.number(), data: sessionInput.partial() }))
      .mutation(({ input }) => updateSession(input.id, input.data as any)),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) =>
      deleteSession(input.id)
    ),
  }),

  // ─── Bookings ──────────────────────────────────────────────────────────────
  bookings: router({
    submit: publicProcedure.input(bookingInput).mutation(async ({ input }) => {
      if (!input.consent) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Consent is required" });
      }
      const session = await getSessionById(input.sessionId);
      if (!session) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Session not found" });
      }
      await createBooking(input as any);
      const stageLabels: Record<string, string> = {
        trying_to_conceive: "Trying to conceive",
        pregnant: "Pregnant",
        postnatal_0_6m: "Postnatal (0–6 months)",
        postnatal_6_12m: "Postnatal (6–12 months)",
        postnatal_12m_plus: "Postnatal (12+ months)",
        other: "Other",
      };
      await notifyOwner({
        title: `New booking: ${input.firstName} ${input.lastName}`,
        content: `**Session:** ${session.title} (${session.sessionDate})\n**Name:** ${input.firstName} ${input.lastName}\n**Email:** ${input.email}\n**Phone:** ${input.phone ?? "—"}\n**Stage:** ${stageLabels[input.stage] ?? input.stage}\n**Crèche:** ${input.creche ? "Yes" : "No"}`,
      });
      // Send email notification to coordinator
      try {
        await sendBookingNotificationEmail({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          stage: input.stage,
          creche: input.creche,
          sessionTitle: session.title,
          sessionDate: session.sessionDate,
          sessionTime: `${session.startTime} – ${session.endTime}`,
          sessionVenue: session.venue,
        });
      } catch (emailErr) {
        console.warn("[Booking] Email notification failed:", emailErr);
      }
      return { success: true };
    }),
    // Admin queries
    all: adminProcedure.query(() => getAllBookings()),
    list: adminProcedure.query(() => getAllBookingsWithSession()),
    bySession: adminProcedure
      .input(z.object({ sessionId: z.number() }))
      .query(({ input }) => getBookingsBySession(input.sessionId)),
  }),
});

export type AppRouter = typeof appRouter;
