import { describe, it, expect, vi, beforeEach } from "vitest";

// vi.mock is hoisted above imports, so we cannot reference variables defined
// outside the factory. Use vi.hoisted() to create the spy first.
const mockSend = vi.hoisted(() => vi.fn().mockResolvedValue({ id: "test-email-id" }));

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}));

import { sendBookingNotificationEmail } from "./email";

describe("sendBookingNotificationEmail", () => {
  beforeEach(() => {
    mockSend.mockClear();
  });

  it("calls Resend with correct parameters", async () => {
    await sendBookingNotificationEmail({
      firstName: "Sarah",
      lastName: "Cohen",
      email: "sarah@example.com",
      phone: "07700 900000",
      stage: "pregnant",
      creche: true,
      sessionTitle: "Antenatal Health Essentials",
      sessionDate: "2026-05-04",
      sessionTime: "10:00 – 12:00",
      sessionVenue: "127 North Road Community Hall",
    });

    expect(mockSend).toHaveBeenCalledOnce();
    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.to).toContain("menichu@khwestcliff.org");
    expect(callArgs.subject).toContain("Sarah Cohen");
    expect(callArgs.subject).toContain("Antenatal Health Essentials");
    expect(callArgs.html).toContain("Sarah");
    expect(callArgs.html).toContain("menichu.khwestcliff.org");
  });

  it("includes creche request in email when requested", async () => {
    await sendBookingNotificationEmail({
      firstName: "Leah",
      lastName: "Miriam",
      email: "leah@example.com",
      stage: "postnatal_0_6m",
      creche: true,
      sessionTitle: "Baby Massage & Touch",
      sessionDate: "2026-05-11",
      sessionTime: "10:00 – 12:00",
      sessionVenue: "127 North Road Community Hall",
    });

    expect(mockSend).toHaveBeenCalledOnce();
    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.html).toContain("Yes");
  });

  it("sends to menichu@khwestcliff.org", async () => {
    await sendBookingNotificationEmail({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      stage: "other",
      creche: false,
      sessionTitle: "Test Session",
      sessionDate: "2026-05-18",
      sessionTime: "10:00 – 12:00",
      sessionVenue: "127 North Road Community Hall",
    });

    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.to).toEqual(["menichu@khwestcliff.org"]);
  });
});
