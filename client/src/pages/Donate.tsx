import { useState } from "react";
import { trpc } from "@/lib/trpc";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { toast } from "sonner";
import { Heart, Loader2, Gift, Users, BookOpen, Baby } from "lucide-react";

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

const IMPACT_ITEMS = [
  { icon: Baby, amount: 5, label: "covers refreshments for one session" },
  { icon: BookOpen, amount: 10, label: "funds printed resources for a participant" },
  { icon: Users, amount: 25, label: "supports a full month of crèche provision" },
  { icon: Heart, amount: 50, label: "sponsors a mother's full programme journey" },
];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const createCheckout = trpc.donations.createCheckout.useMutation();

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  async function handleDonate() {
    if (!finalAmount || finalAmount < 1) {
      toast.error("Please enter a donation amount of at least £1.");
      return;
    }
    try {
      const { url } = await createCheckout.mutateAsync({
        amountPence: Math.round(finalAmount * 100),
        donorName: isAnonymous ? "Anonymous" : donorName || "Anonymous",
        message: message || undefined,
      });
      toast.success("Redirecting to secure payment…");
      window.open(url, "_blank");
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />

      {/* Hero */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, var(--teal-800) 0%, var(--teal-600) 100%)" }}
      >
        <div className="container text-center">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
            style={{ backgroundColor: "var(--gold-500)" }}
          >
            <Heart size={28} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Support Our Community</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Your donation helps us continue providing free, welcoming sessions for mothers in
            Southend-on-Sea. Every pound makes a real difference.
          </p>
        </div>
      </section>

      {/* Impact strip */}
      <section className="py-10 border-b" style={{ backgroundColor: "var(--cream-50)", borderColor: "var(--cream-300)" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {IMPACT_ITEMS.map(({ icon: Icon, amount, label }) => (
              <div key={amount} className="flex flex-col items-center text-center gap-2 p-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--teal-100)" }}
                >
                  <Icon size={18} style={{ color: "var(--teal-700)" }} />
                </div>
                <p className="text-2xl font-bold" style={{ color: "var(--gold-600)" }}>£{amount}</p>
                <p className="text-xs text-gray-500 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation form */}
      <section className="py-16 flex-1" style={{ backgroundColor: "var(--cream-50)" }}>
        <div className="container max-w-xl">
          <div className="bg-white rounded-2xl border p-8 shadow-sm" style={{ borderColor: "var(--cream-300)" }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--teal-800)" }}>
              Choose Your Amount
            </h2>

            {/* Preset amounts */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                  className="py-3 rounded-lg text-sm font-semibold border transition-all"
                  style={
                    selectedAmount === amt && !customAmount
                      ? { backgroundColor: "var(--teal-600)", color: "white", borderColor: "var(--teal-600)" }
                      : { backgroundColor: "white", color: "var(--teal-700)", borderColor: "var(--cream-300)" }
                  }
                >
                  £{amt}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--teal-800)" }}>
                Or enter a custom amount (£)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">£</span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Other amount"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
                  style={{ borderColor: "var(--cream-300)", "--tw-ring-color": "var(--teal-400)" } as any}
                />
              </div>
            </div>

            {/* Donor name */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium" style={{ color: "var(--teal-800)" }}>
                  Your Name (optional)
                </label>
                <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded"
                  />
                  Donate anonymously
                </label>
              </div>
              <input
                type="text"
                placeholder="Your name"
                value={donorName}
                disabled={isAnonymous}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 disabled:opacity-40"
                style={{ borderColor: "var(--cream-300)" }}
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--teal-800)" }}>
                Leave a message (optional)
              </label>
              <textarea
                rows={3}
                placeholder="A message of support for the community…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 resize-none"
                style={{ borderColor: "var(--cream-300)" }}
              />
            </div>

            {/* Donate button */}
            <button
              onClick={handleDonate}
              disabled={createCheckout.isPending || !finalAmount || finalAmount < 1}
              className="w-full py-3.5 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: "var(--gold-500)", color: "oklch(18% 0.02 185)" }}
            >
              {createCheckout.isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Heart size={18} />
              )}
              {createCheckout.isPending
                ? "Redirecting…"
                : `Donate ${finalAmount ? `£${finalAmount}` : ""} Securely`}
            </button>

            <p className="text-xs text-center text-gray-400 mt-3">
              Payments are processed securely by Stripe. Menichu Vesmichu never stores your card details.
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
