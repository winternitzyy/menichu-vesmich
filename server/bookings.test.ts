import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Mock the DB helpers ────────────────────────────────────────────────────────
vi.mock("./db", () => ({
  getAllSessions: vi.fn(async () => []),
  getUpcomingSessions: vi.fn(async () => []),
  getPastSessions: vi.fn(async () => []),
  getSessionById: vi.fn(async (id: number) =>
    id === 1
      ? {
          id: 1,
          sessionDate: new Date("2026-05-04"),
          startTime: "10:00",
          endTime: "12:00",
          title: "Test Session",
          topic: "Test Topic",
          type: "community",
          description: null,
          venue: "Test Venue",
          isPast: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      : undefined
  ),
  createSession: vi.fn(async () => {}),
  updateSession: vi.fn(async () => {}),
  deleteSession: vi.fn(async () => {}),
  getSessionCount: vi.fn(async () => 34),
  createBooking: vi.fn(async () => {}),
  getAllBookings: vi.fn(async () => []),
  getAllBookingsWithSession: vi.fn(async () => []),
  getBookingsBySession: vi.fn(async () => []),
}));

// ── Mock notifyOwner ───────────────────────────────────────────────────────────
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async () => true),
}));

// ── Helpers ────────────────────────────────────────────────────────────────────
function makeCtx(overrides?: Partial<TrpcContext>): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
    ...overrides,
  };
}

function makeAdminCtx(): TrpcContext {
  return makeCtx({
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
  });
}

// ── Tests ──────────────────────────────────────────────────────────────────────
describe("bookings.submit", () => {
  it("successfully submits a valid booking and notifies owner", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.bookings.submit({
      firstName: "Sarah",
      lastName: "Cohen",
      email: "sarah@example.com",
      phone: "07700900000",
      sessionId: 1,
      stage: "pregnant",
      creche: false,
      consent: true,
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects a booking without consent", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(
      caller.bookings.submit({
        firstName: "Sarah",
        lastName: "Cohen",
        email: "sarah@example.com",
        sessionId: 1,
        stage: "pregnant",
        creche: false,
        consent: false,
      })
    ).rejects.toThrow("Consent is required");
  });

  it("rejects a booking for a non-existent session", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(
      caller.bookings.submit({
        firstName: "Sarah",
        lastName: "Cohen",
        email: "sarah@example.com",
        sessionId: 999,
        stage: "pregnant",
        creche: false,
        consent: true,
      })
    ).rejects.toThrow("Session not found");
  });
});

describe("bookings.list (admin only)", () => {
  it("returns bookings list for admin user", async () => {
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.bookings.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws FORBIDDEN for non-admin user", async () => {
    const caller = appRouter.createCaller(
      makeCtx({
        user: {
          id: 2,
          openId: "regular-user",
          email: "user@example.com",
          name: "Regular User",
          loginMethod: "manus",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        },
      })
    );
    await expect(caller.bookings.list()).rejects.toThrow("Admin access required");
  });
});

describe("sessions.count", () => {
  it("returns the session count", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const count = await caller.sessions.count();
    expect(typeof count).toBe("number");
    expect(count).toBeGreaterThan(0);
  });
});

describe("auth.logout", () => {
  it("clears the session cookie and returns success", async () => {
    const { COOKIE_NAME } = await import("../shared/const");
    const clearedCookies: { name: string; options: Record<string, unknown> }[] = [];
    const ctx = makeCtx({
      res: {
        clearCookie: (name: string, options: Record<string, unknown>) => {
          clearedCookies.push({ name, options });
        },
      } as unknown as TrpcContext["res"],
    });
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
  });
});
