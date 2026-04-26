import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { CalendarDays, BookOpen, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const { data: sessions } = trpc.sessions.all.useQuery();
  const { data: bookings } = trpc.bookings.all.useQuery();

  const upcoming = sessions?.filter((s) => !s.isPast).length ?? 0;
  const past = sessions?.filter((s) => s.isPast).length ?? 0;
  const totalBookings = bookings?.length ?? 0;
  const creche = bookings?.filter((b: any) => b.creche).length ?? 0;

  const stats = [
    { label: "Upcoming Sessions", value: upcoming, icon: <CalendarDays size={20} />, href: "/admin/sessions", colour: "var(--teal-600)" },
    { label: "Past Sessions", value: past, icon: <CalendarDays size={20} />, href: "/admin/sessions", colour: "var(--teal-400)" },
    { label: "Total Bookings", value: totalBookings, icon: <BookOpen size={20} />, href: "/admin/bookings", colour: "var(--gold-600)" },
    { label: "Crèche Requests", value: creche, icon: <Users size={20} />, href: "/admin/bookings", colour: "var(--gold-400)" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--teal-800)" }}>Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome to the Menichu Vesmich admin panel.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-xl border p-5 no-underline hover:shadow-md transition-shadow block"
            style={{ borderColor: "var(--cream-300)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{s.label}</span>
              <span style={{ color: s.colour }}>{s.icon}</span>
            </div>
            <p className="text-3xl font-bold" style={{ color: "var(--teal-800)" }}>{s.value}</p>
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-xl border p-6" style={{ borderColor: "var(--cream-300)" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold" style={{ color: "var(--teal-700)" }}>Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-sm font-medium no-underline" style={{ color: "var(--teal-600)" }}>
            View all →
          </Link>
        </div>
        {!bookings || bookings.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center">No bookings yet.</p>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 5).map((b: any) => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--cream-200)" }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--teal-800)" }}>{b.firstName} {b.lastName}</p>
                  <p className="text-xs text-gray-400">{b.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{b.session?.title ?? "—"}</p>
                  <p className="text-xs text-gray-400">{new Date(b.createdAt).toLocaleDateString("en-GB")}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
