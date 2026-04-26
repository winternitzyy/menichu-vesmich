import { trpc } from "@/lib/trpc";
import { Loader2, Mail, Phone, Baby, Users } from "lucide-react";
import { SESSION_TYPE_LABELS, SESSION_TYPE_COLOURS } from "@/lib/sessionUtils";
import type { SessionType } from "@/lib/sessionUtils";

const STAGE_LABELS: Record<string, string> = {
  trying_to_conceive: "Trying to conceive",
  pregnant: "Pregnant",
  postnatal_0_6m: "Postnatal (0–6 months)",
  postnatal_6_12m: "Postnatal (6–12 months)",
  postnatal_12m_plus: "Postnatal (12+ months)",
  other: "Other",
};

export default function AdminBookings() {
  const { data: bookings, isLoading } = trpc.bookings.list.useQuery();

  const total = bookings?.length ?? 0;
  const creche = (bookings as any[])?.filter((b) => b.creche).length ?? 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--teal-800)" }}>Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">{total} booking{total !== 1 ? "s" : ""} received</p>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <Users size={18} />, label: "Total Bookings", value: total },
          { icon: <Baby size={18} />, label: "Crèche Requests", value: creche },
          { icon: <Users size={18} />, label: "Unique Sessions", value: new Set(bookings?.map((b) => b.sessionId)).size },
          { icon: <Users size={18} />, label: "This Month", value: bookings?.filter((b) => {
            const d = new Date(b.createdAt);
            const now = new Date();
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
          }).length ?? 0 },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border p-4" style={{ borderColor: "var(--cream-300)" }}>
            <div className="flex items-center gap-2 mb-1" style={{ color: "var(--teal-600)" }}>
              {stat.icon}
              <span className="text-xs font-medium text-gray-500">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold" style={{ color: "var(--teal-800)" }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin" style={{ color: "var(--teal-600)" }} size={28} />
        </div>
      ) : bookings?.length === 0 ? (
        <div className="text-center py-16 text-gray-400">No bookings yet.</div>
      ) : (
        <div className="space-y-3">
          {bookings?.map((b) => (
            <div key={b.id} className="bg-white rounded-xl border p-5" style={{ borderColor: "var(--cream-300)" }}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                {/* Name & contact */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold" style={{ color: "var(--teal-800)" }}>
                    {b.firstName} {b.lastName}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Mail size={13} />
                      <a href={`mailto:${b.email}`} className="hover:underline">{b.email}</a>
                    </span>
                    {b.phone && (
                      <span className="flex items-center gap-1.5">
                        <Phone size={13} />
                        {b.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-2 items-center">
                  {b.creche && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                      <Baby size={11} /> Crèche
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {new Date(b.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Session & stage */}
              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                {b.session && (
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium ${SESSION_TYPE_COLOURS[b.session.type as SessionType]}`}>
                      {SESSION_TYPE_LABELS[b.session.type as SessionType]}
                    </span>
                    <span className="text-gray-600 font-medium">{b.session.title}</span>
                    <span className="text-gray-400">
                      ({b.session.sessionDate instanceof Date
                        ? b.session.sessionDate.toISOString().slice(0, 10)
                        : String(b.session.sessionDate)})
                    </span>
                  </div>
                )}
                {b.stage && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100 font-medium">
                    {STAGE_LABELS[b.stage] ?? b.stage}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
