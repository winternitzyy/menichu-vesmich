import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY } from "@/siteConfig";

/**
 * Sends a form submission by email through Web3Forms (free, no server needed).
 * Throws an Error with a user-facing message on failure.
 */
export async function submitForm(
  subject: string,
  fields: Record<string, string>,
  replyTo?: string
): Promise<void> {
  if (!WEB3FORMS_ACCESS_KEY) {
    throw new Error(
      `Online submissions aren't set up yet — please email us at ${CONTACT_EMAIL}.`
    );
  }

  let res: Response;
  try {
    res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: "Menichu Vesmichu website",
        ...(replyTo ? { replyto: replyTo } : {}),
        ...fields,
      }),
    });
  } catch {
    throw new Error(
      `We couldn't reach the server. Please check your connection or email ${CONTACT_EMAIL}.`
    );
  }

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) {
    throw new Error(
      data?.message ?? `Something went wrong. Please try again or email ${CONTACT_EMAIL}.`
    );
  }
}

const STAGE_LABELS: Record<string, string> = {
  trying_to_conceive: "Trying to conceive",
  pregnant: "Pregnant",
  postnatal_0_6m: "Postnatal (0–6 months)",
  postnatal_6_12m: "Postnatal (6–12 months)",
  postnatal_12m_plus: "Postnatal (12+ months)",
  other: "Other",
};

export type BookingForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  stage: string;
  creche: boolean;
  consent: boolean;
};

export async function submitBooking(
  form: BookingForm,
  session: { title: string; sessionDate: string; startTime: string; endTime: string; venue: string }
): Promise<void> {
  if (!form.consent) throw new Error("Please confirm your consent to proceed.");
  await submitForm(
    `New booking: ${form.firstName} ${form.lastName} — ${session.title} (${session.sessionDate})`,
    {
      Session: session.title,
      Date: session.sessionDate,
      Time: `${session.startTime} – ${session.endTime}`,
      Venue: session.venue,
      Name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      Phone: form.phone || "—",
      Stage: STAGE_LABELS[form.stage] ?? form.stage,
      "Crèche requested": form.creche ? "Yes" : "No",
      Consent: "Yes",
    },
    form.email
  );
}
