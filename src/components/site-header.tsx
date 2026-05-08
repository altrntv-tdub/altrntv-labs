import Link from "next/link";
import { Wordmark } from "./wordmark";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-border"
      style={{
        background: "color-mix(in srgb, var(--bg) 85%, transparent)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-[18px] flex items-center justify-between">
        <Link
          href="/"
          className="transition-opacity hover:opacity-70"
        >
          <Wordmark className="text-xl" />
        </Link>
        <nav className="flex items-center gap-7 text-sm">
          <Link href="/services" className="nav-link">
            Services
          </Link>
<Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
