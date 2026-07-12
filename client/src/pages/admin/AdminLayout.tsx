import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { CalendarDays, BookOpen, Home, LogOut, Loader2, MessageSquareHeart } from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: <Home size={18} /> },
  { href: "/admin/sessions", label: "Sessions", icon: <CalendarDays size={18} /> },
  { href: "/admin/bookings", label: "Bookings", icon: <BookOpen size={18} /> },
  { href: "/admin/feedback", label: "Feedback", icon: <MessageSquareHeart size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" style={{ color: "var(--teal-600)" }} size={32} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--cream-50)" }}>
        <div className="text-center p-8 bg-white rounded-xl border shadow-sm" style={{ borderColor: "var(--cream-300)" }}>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--teal-800)" }}>Admin Access</h2>
          <p className="text-gray-500 mb-6">Please sign in to access the admin panel.</p>
          <a
            href={getLoginUrl()}
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white no-underline"
            style={{ backgroundColor: "var(--teal-600)" }}
          >
            Sign In with Manus
          </a>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--cream-50)" }}>
        <div className="text-center p-8 bg-white rounded-xl border shadow-sm" style={{ borderColor: "var(--cream-300)" }}>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--teal-800)" }}>Access Denied</h2>
          <p className="text-gray-500 mb-6">You do not have permission to access the admin panel.</p>
          <Link href="/" className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white no-underline" style={{ backgroundColor: "var(--teal-600)" }}>
            Return to Site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--cream-50)" }}>
      {/* Sidebar */}
      <aside
        className="w-64 shrink-0 flex flex-col min-h-screen"
        style={{ backgroundColor: "var(--teal-800)" }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: "var(--teal-700)" }}>
          <Link href="/" className="no-underline">
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--gold-400)" }}>
              Admin Panel
            </p>
            <h2 className="text-base font-bold text-white font-serif leading-tight">
              Menichu Vesmichu
            </h2>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium no-underline transition-colors ${
                  isActive ? "text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                style={isActive ? { backgroundColor: "var(--teal-600)" } : undefined}
              >
                <span style={{ color: isActive ? "var(--gold-400)" : "inherit" }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t" style={{ borderColor: "var(--teal-700)" }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: "var(--teal-600)", color: "var(--gold-400)" }}
            >
              {user?.name?.[0] ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name ?? "Admin"}</p>
              <p className="text-xs text-white/50 truncate">{user?.email ?? ""}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
