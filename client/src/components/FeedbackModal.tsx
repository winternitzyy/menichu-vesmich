import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquareHeart, CheckCircle2 } from "lucide-react";

const MODAL_KEY = "mv_feedback_shown";
const BANNER_KEY = "mv_feedback_banner_dismissed";

export default function FeedbackModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    overallExperience: "" as "excellent" | "good" | "okay" | "poor" | "",
    mostValuable: "",
    improvements: "",
    nextProjectWhen: "" as "asap" | "3_months" | "6_months" | "12_months" | "not_sure" | "",
    nextProjectHow: "",
    recommend: "" as "yes" | "maybe" | "no" | "",
  });

  const submitFeedback = trpc.feedback.submit.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(MODAL_KEY);
    if (!alreadyShown) {
      setOpen(true);
      sessionStorage.setItem(MODAL_KEY, "1");
    }
  }, []);

  useEffect(() => {
    const openModal = () => {
      setSubmitted(false);
      setOpen(true);
    };
    window.addEventListener("mv_open_feedback", openModal);
    return () => window.removeEventListener("mv_open_feedback", openModal);
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (!submitted) {
      // Signal PublicNav to show the banner
      window.dispatchEvent(new Event("mv_banner_update"));
    }
  };

  const handleBannerDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem(BANNER_KEY, "1");
  };

  const handleBannerClick = () => {
    setShowBanner(false);
    setOpen(true);
  };

  const handleSubmitClose = () => {
    setOpen(false);
    setShowBanner(false);
    sessionStorage.setItem(BANNER_KEY, "1");
    window.dispatchEvent(new Event("mv_banner_update"));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.overallExperience || !form.nextProjectWhen || !form.recommend) return;
    submitFeedback.mutate({
      name: form.name || undefined,
      email: form.email || undefined,
      overallExperience: form.overallExperience,
      mostValuable: form.mostValuable || undefined,
      improvements: form.improvements || undefined,
      nextProjectWhen: form.nextProjectWhen,
      nextProjectHow: form.nextProjectHow || undefined,
      recommend: form.recommend,
    });
  };

  const set = (field: keyof typeof form) => (val: string) =>
    setForm((f) => ({ ...f, [field]: val }));

  return (
    <>
      {showBanner && (
        <div
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-white text-sm font-medium shadow-sm"
          style={{ backgroundColor: "var(--teal-700)" }}
        >
          <MessageSquareHeart size={16} style={{ color: "var(--gold-400)" }} />
          <span>
            The project is finished —{" "}
            <button
              onClick={handleBannerClick}
              className="underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity cursor-pointer"
              style={{ color: "var(--gold-300)" }}
            >
              please leave feedback
            </button>
            {" "}to help shape what comes next.
          </span>
        </div>
      )}

      <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
            <h2 className="text-xl font-bold text-foreground">Thank you for your feedback!</h2>
            <p className="text-muted-foreground text-sm">
              Your thoughts help us shape the future of Menichu Vesmichu. We really appreciate you taking the time.
            </p>
            <Button onClick={handleSubmitClose} className="mt-2">Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <MessageSquareHeart className="w-5 h-5 text-primary" />
                <DialogTitle className="text-lg">Share Your Feedback</DialogTitle>
              </div>
              <DialogDescription>
                Help us improve Menichu Vesmichu and shape what comes next. This takes about 2 minutes.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
              {/* Name & Email */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="fb-name">Your name <span className="text-muted-foreground text-xs">(optional)</span></Label>
                  <Input id="fb-name" placeholder="e.g. Sarah" value={form.name} onChange={(e) => set("name")(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="fb-email">Email <span className="text-muted-foreground text-xs">(optional)</span></Label>
                  <Input id="fb-email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email")(e.target.value)} />
                </div>
              </div>

              {/* Overall experience */}
              <div className="flex flex-col gap-2">
                <Label>Overall experience <span className="text-destructive">*</span></Label>
                <RadioGroup
                  value={form.overallExperience}
                  onValueChange={set("overallExperience")}
                  className="flex gap-3 flex-wrap"
                >
                  {(["excellent", "good", "okay", "poor"] as const).map((v) => (
                    <div key={v} className="flex items-center gap-1.5">
                      <RadioGroupItem value={v} id={`exp-${v}`} />
                      <Label htmlFor={`exp-${v}`} className="capitalize cursor-pointer font-normal">{v}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Most valuable */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fb-valuable">What did you find most valuable?</Label>
                <Textarea
                  id="fb-valuable"
                  placeholder="e.g. The peer support sessions, the expert talks..."
                  rows={2}
                  value={form.mostValuable}
                  onChange={(e) => set("mostValuable")(e.target.value)}
                />
              </div>

              {/* Improvements */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fb-improve">What could we improve?</Label>
                <Textarea
                  id="fb-improve"
                  placeholder="Any suggestions are welcome..."
                  rows={2}
                  value={form.improvements}
                  onChange={(e) => set("improvements")(e.target.value)}
                />
              </div>

              {/* Next project — when */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fb-when">When should the next project start? <span className="text-destructive">*</span></Label>
                <Select value={form.nextProjectWhen} onValueChange={set("nextProjectWhen")}>
                  <SelectTrigger id="fb-when">
                    <SelectValue placeholder="Select a timeframe..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">As soon as possible</SelectItem>
                    <SelectItem value="3_months">In about 3 months</SelectItem>
                    <SelectItem value="6_months">In about 6 months</SelectItem>
                    <SelectItem value="12_months">In about a year</SelectItem>
                    <SelectItem value="not_sure">Not sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Next project — how */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fb-how">How should the next project be run?</Label>
                <Textarea
                  id="fb-how"
                  placeholder="e.g. More sessions per month, different topics, online options, different venue..."
                  rows={2}
                  value={form.nextProjectHow}
                  onChange={(e) => set("nextProjectHow")(e.target.value)}
                />
              </div>

              {/* Recommend */}
              <div className="flex flex-col gap-2">
                <Label>Would you recommend Menichu Vesmichu to a friend? <span className="text-destructive">*</span></Label>
                <RadioGroup
                  value={form.recommend}
                  onValueChange={set("recommend")}
                  className="flex gap-4"
                >
                  {(["yes", "maybe", "no"] as const).map((v) => (
                    <div key={v} className="flex items-center gap-1.5">
                      <RadioGroupItem value={v} id={`rec-${v}`} />
                      <Label htmlFor={`rec-${v}`} className="capitalize cursor-pointer font-normal">{v}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-1">
                <Button type="button" variant="ghost" onClick={handleClose}>
                  Maybe later
                </Button>
                <Button
                  type="submit"
                  disabled={!form.overallExperience || !form.nextProjectWhen || !form.recommend || submitFeedback.isPending}
                >
                  {submitFeedback.isPending ? "Submitting..." : "Submit Feedback"}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
      </Dialog>
    </>
  );
}
