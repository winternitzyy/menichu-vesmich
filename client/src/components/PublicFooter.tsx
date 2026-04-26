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
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gold-400)" }}>
                מניחו וסמיח
              </span>
              <h3 className="text-lg font-semibold text-white font-serif mt-1">
                Menichu Vesmich
              </h3>
            </div>
            <p className="text-sm leading-relaxed">
              Supporting Orthodox Jewish women in Southend-on-Sea through pregnancy,
              childbirth, and the postpartum period.
            </p>
            <p className="text-xs mt-3" style={{ color: "var(--gold-400)" }}>
              Funded by the National Lottery Community Fund
            </p>
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
              <p>Miriam Bineth Community Hall</p>
              <p>23 Cotswold Road</p>
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
          <p>© {new Date().getFullYear()} Menichu Vesmich. All rights reserved.</p>
          <p>Registered in England &amp; Wales</p>
        </div>
      </div>
    </footer>
  );
}
