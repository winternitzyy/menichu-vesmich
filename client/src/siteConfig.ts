/**
 * Site-wide settings for the static (GitHub Pages) build.
 *
 * Each value can be set either here, or as a GitHub repository variable
 * (Settings → Secrets and variables → Actions → Variables) with the
 * VITE_… name shown. A repository variable wins over the value here.
 */

/** Where booking and feedback notifications are sent / people can write to. */
export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || "menichu@khwestcliff.org";

/**
 * Free form-to-email service used for bookings and feedback.
 * Get a free access key at https://web3forms.com (enter CONTACT_EMAIL above);
 * submissions are emailed to that address. The key is safe to publish.
 * Leave empty to fall back to asking people to email CONTACT_EMAIL.
 */
export const WEB3FORMS_ACCESS_KEY: string =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

/**
 * Stripe Payment Link used by the Donate page.
 * Create one in the Stripe dashboard (Payment Links → New → "Customers choose
 * what to pay"), and set its after-payment redirect to
 * <your site>/donate/thank-you. Leave empty to hide online card payments.
 */
export const STRIPE_DONATION_LINK: string =
  import.meta.env.VITE_STRIPE_DONATION_LINK || "";
