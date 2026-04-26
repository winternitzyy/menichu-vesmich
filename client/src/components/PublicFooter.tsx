import { Link } from "wouter";

export default function PublicFooter() {
  return (
    <footer
      className="mt-auto py-12"
      style={{ backgroundColor: "var(--teal-900)", color: "oklch(80% 0.04 185)" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b" style={{ borderColor: "var(--teal-700)" }}>
          {/* Brand */}
          <div>
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-white font-serif">
                Menichu Vesmichu
              </h3>
            </div>
            <p className="text-sm leading-relaxed">
              Supporting women in Southend-on-Sea through pregnancy,
              childbirth, and the postpartum period.
            </p>
            <div className="mt-4">
              <div className="bg-white rounded-lg px-3 py-2 inline-flex items-center">
                <img
                  src="/manus-storage/community-fund-logo_ac6fc928.png"
                  alt="Funded by the National Lottery Community Fund"
                  className="h-8 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/coming-events", label: "Coming Events" },
                { href: "/past-events", label: "Past Events" },
                { href: "/book", label: "Book a Place" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm hover:text-white transition-colors no-underline"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <address className="not-italic text-sm leading-relaxed">
              <p>Menichu Vesmichu</p>
              <p>127 North Road</p>
              <p>Southend-on-Sea, SS0 8AA</p>
              <p className="mt-3">
                <a
                  href="mailto:info@menichuvesmich.org"
                  className="hover:text-white transition-colors"
                >
                  info@menichuvesmich.org
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>© {new Date().getFullYear()} Menichu Vesmichu. All rights reserved.</p>
          <p>Registered in England &amp; Wales</p>
        </div>
      </div>
    </footer>
  );
}
