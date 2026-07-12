import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the DB helpers and notification so we don't hit a real database
vi.mock("./db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./db")>();
  return {
    ...actual,
    createFeedback: vi.fn().mockResolvedValue(undefined),
    getAllFeedback: vi.fn().mockResolvedValue([]),
  };
});

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
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
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

const validFeedback = {
  name: "Test User",
  email: "test@example.com",
  overallExperience: "excellent" as const,
  mostValuable: "The peer support",
  improvements: "More sessions",
  nextProjectWhen: "3_months" as const,
  nextProjectHow: "Online option too",
  recommend: "yes" as const,
};

describe("feedback.submit", () => {
  it("accepts a valid feedback submission as a public user", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.feedback.submit(validFeedback);
    expect(result).toEqual({ success: true });
  });

  it("accepts a submission with only required fields", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.feedback.submit({
      overallExperience: "good",
      nextProjectWhen: "not_sure",
      recommend: "maybe",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects an invalid overallExperience value", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.feedback.submit({
        ...validFeedback,
        overallExperience: "amazing" as any,
      })
    ).rejects.toThrow();
  });
});

describe("feedback.all", () => {
  it("returns an array for admin users", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.feedback.all();
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws FORBIDDEN for non-admin users", async () => {
    const nonAdminCtx: TrpcContext = {
      ...createAdminContext(),
      user: { ...createAdminContext().user!, role: "user" },
    };
    const caller = appRouter.createCaller(nonAdminCtx);
    await expect(caller.feedback.all()).rejects.toThrow("Admin access required");
  });

  it("throws UNAUTHORIZED for unauthenticated users", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.feedback.all()).rejects.toThrow();
  });
});
