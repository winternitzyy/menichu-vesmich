import { z } from "zod";
import Stripe from "stripe";
import { publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Stripe not configured" });
  return new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
}

export const donationsRouter = router({
  createCheckout: publicProcedure
    .input(
      z.object({
        amountPence: z.number().int().min(100, "Minimum donation is £1"),
        donorName: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const stripe = getStripe();
      const origin = (ctx.req.headers.origin as string) || "https://menichu.khwestcliff.org";

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "gbp",
              unit_amount: input.amountPence,
              product_data: {
                name: "Donation to Menichu Vesmichu",
                description:
                  "Supporting mothers in Southend-on-Sea through pregnancy, childbirth, and the postpartum period.",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          donor_name: input.donorName ?? "Anonymous",
          donor_message: input.message ?? "",
        },
        allow_promotion_codes: true,
        success_url: `${origin}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/donate`,
      });

      if (!session.url) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout session" });
      }

      return { url: session.url };
    }),
});
