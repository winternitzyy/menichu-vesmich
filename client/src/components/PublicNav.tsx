import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/coming-events", label: "Coming Events" },
  { href: "/past-events", label: "Past Events" },
  { href: "/book", label: "Book a Place" },
];

export default function PublicNav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "var(--teal-800)", color: "oklch(95% 0.02 185)" }}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="flex flex-col leading-none">
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--gold-400)" }}
            >
              מניחו וסמיח
            </span>
            <span className="text-lg font-semibold text-white font-serif">
              Menichu Vesmich
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors no-underline ${
                  isActive
                    ? "text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                style={
                  isActive
                    ? { backgroundColor: "var(--teal-600)" }
                    : undefined
                }
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/book"
            className="ml-3 px-4 py-2 rounded-md text-sm font-semibold transition-colors no-underline"
            style={{
              backgroundColor: "var(--gold-500)",
              color: "oklch(18% 0.02 185)",
            }}
          >
            Book a Place
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: "var(--teal-900)",
            borderColor: "var(--teal-700)",
          }}
        >
          <nav className="container py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2.5 rounded-md text-sm font-medium no-underline ${
                    isActive ? "text-white" : "text-white/80"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: "var(--teal-700)" }
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
