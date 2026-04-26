import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface BookingEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  stage: string;
  creche: boolean;
  sessionTitle: string;
  sessionDate: string | Date;
  sessionTime: string;
  sessionVenue: string;
}

const stageLabels: Record<string, string> = {
  trying_to_conceive: "Trying to conceive",
  pregnant: "Pregnant",
  postnatal_0_6m: "Postnatal (0–6 months)",
  postnatal_6_12m: "Postnatal (6–12 months)",
  postnatal_12m_plus: "Postnatal (12+ months)",
  other: "Other",
};

/**
 * Sends a booking notification email to the programme coordinator.
 */
export async function sendBookingNotificationEmail(data: BookingEmailData): Promise<void> {
  const dateStr =
    data.sessionDate instanceof Date
      ? data.sessionDate.toISOString().slice(0, 10)
      : String(data.sessionDate);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #1a5c52; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #c9a84c; margin: 0; font-size: 22px;">New Booking — Menichu Vesmichu</h1>
        <p style="color: #ffffff; margin: 6px 0 0; font-size: 14px;">A new place has been reserved for an upcoming session.</p>
      </div>
      <div style="background: #fdf8f0; padding: 28px 32px; border: 1px solid #e8dfc8; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; font-weight: bold; color: #1a5c52; width: 40%;">Session</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8;">${data.sessionTitle}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; font-weight: bold; color: #1a5c52;">Date</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8;">${dateStr}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; font-weight: bold; color: #1a5c52;">Time</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8;">${data.sessionTime}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; font-weight: bold; color: #1a5c52;">Venue</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8;">${data.sessionVenue}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; font-weight: bold; color: #1a5c52;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8;">${data.firstName} ${data.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; font-weight: bold; color: #1a5c52;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8;"><a href="mailto:${data.email}" style="color: #1a5c52;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; font-weight: bold; color: #1a5c52;">Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8;">${data.phone ?? "—"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8; font-weight: bold; color: #1a5c52;">Stage</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8dfc8;">${stageLabels[data.stage] ?? data.stage}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #1a5c52;">Crèche Requested</td>
            <td style="padding: 10px 0;">${data.creche ? "✅ Yes" : "No"}</td>
          </tr>
        </table>
        <p style="margin: 24px 0 0; font-size: 12px; color: #888;">
          This notification was sent automatically by the Menichu Vesmichu booking system at menichu.khwestcliff.org
        </p>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: "Menichu Vesmichu Bookings <onboarding@resend.dev>",
    to: ["menichu@khwestcliff.org"],
    subject: `New booking: ${data.firstName} ${data.lastName} — ${data.sessionTitle} (${dateStr})`,
    html,
  });
}
