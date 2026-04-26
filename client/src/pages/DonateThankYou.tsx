import { Link } from "wouter";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { Heart, CheckCircle } from "lucide-react";

export default function DonateThankYou() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />
      <section
        className="flex-1 flex items-center justify-center py-20"
        style={{ backgroundColor: "var(--cream-50)" }}
      >
        <div className="container max-w-lg text-center">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ backgroundColor: "var(--teal-100)" }}
          >
            <CheckCircle size={40} style={{ color: "var(--teal-600)" }} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--teal-800)" }}>
            Thank You!
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Your generous donation means the world to us and to the mothers we support.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            A receipt has been sent to your email address by Stripe.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white no-underline"
              style={{ backgroundColor: "var(--teal-600)" }}
            >
              Back to Home
            </Link>
            <Link
              href="/donate"
              className="px-6 py-3 rounded-xl text-sm font-semibold no-underline flex items-center gap-2 justify-center"
              style={{ border: "1.5px solid var(--teal-300)", color: "var(--teal-700)" }}
            >
              <Heart size={15} /> Donate Again
            </Link>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
