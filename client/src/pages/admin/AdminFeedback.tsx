import { trpc } from "@/lib/trpc";
import { MessageSquareHeart, Loader2, Star, ThumbsUp, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const experienceColor: Record<string, string> = {
  excellent: "bg-green-100 text-green-800",
  good: "bg-teal-100 text-teal-800",
  okay: "bg-yellow-100 text-yellow-800",
  poor: "bg-red-100 text-red-800",
};

const recommendColor: Record<string, string> = {
  yes: "bg-green-100 text-green-800",
  maybe: "bg-yellow-100 text-yellow-800",
  no: "bg-red-100 text-red-800",
};

const whenLabel: Record<string, string> = {
  asap: "As soon as possible",
  "3_months": "~3 months",
  "6_months": "~6 months",
  "12_months": "~12 months",
  not_sure: "Not sure",
};

export default function AdminFeedback() {
  const { data: submissions, isLoading } = trpc.feedback.all.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin" style={{ color: "var(--teal-600)" }} size={28} />
      </div>
    );
  }

  const total = submissions?.length ?? 0;
  const excellent = submissions?.filter((s) => s.overallExperience === "excellent").length ?? 0;
  const wouldRecommend = submissions?.filter((s) => s.recommend === "yes").length ?? 0;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <MessageSquareHeart size={24} style={{ color: "var(--teal-600)" }} />
        <h1 className="text-2xl font-bold font-serif" style={{ color: "var(--teal-800)" }}>
          Feedback Submissions
        </h1>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users size={15} /> Total Responses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold" style={{ color: "var(--teal-700)" }}>{total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Star size={15} /> Rated Excellent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold" style={{ color: "var(--teal-700)" }}>
              {total > 0 ? Math.round((excellent / total) * 100) : 0}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ThumbsUp size={15} /> Would Recommend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold" style={{ color: "var(--teal-700)" }}>
              {total > 0 ? Math.round((wouldRecommend / total) * 100) : 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Submissions list */}
      {total === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <MessageSquareHeart size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No feedback submissions yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {submissions!.slice().reverse().map((s) => (
            <Card key={s.id} className="border" style={{ borderColor: "var(--cream-300)" }}>
              <CardContent className="pt-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--teal-800)" }}>
                      {s.name ?? "Anonymous"}
                      {s.email && (
                        <span className="font-normal text-muted-foreground ml-2 text-xs">
                          &lt;{s.email}&gt;
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(s.createdAt).toLocaleString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${experienceColor[s.overallExperience] ?? ""}`}>
                      {s.overallExperience}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${recommendColor[s.recommend] ?? ""}`}>
                      {s.recommend === "yes" ? "Recommends" : s.recommend === "maybe" ? "Maybe" : "Wouldn't recommend"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {s.mostValuable && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Most Valuable</p>
                      <p className="text-foreground">{s.mostValuable}</p>
                    </div>
                  )}
                  {s.improvements && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Improvements</p>
                      <p className="text-foreground">{s.improvements}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1 flex items-center gap-1">
                      <Clock size={11} /> Next Project — When
                    </p>
                    <p className="text-foreground">{whenLabel[s.nextProjectWhen] ?? s.nextProjectWhen}</p>
                  </div>
                  {s.nextProjectHow && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Next Project — How</p>
                      <p className="text-foreground">{s.nextProjectHow}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
