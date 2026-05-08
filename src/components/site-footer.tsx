import Link from "next/link";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-12 grid gap-8 md:grid-cols-4 items-start">
        <div>
          <Wordmark className="text-lg" />
          <p className="mt-3.5 text-[13px] text-muted max-w-[360px] leading-relaxed">
            Independent assessments for tokenized financial products.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="eyebrow mb-1">/ services</div>
          <Link href="/services#issuer-assessment" className="link-quiet text-[13px]">
            Issuer Assessment
          </Link>
          <Link href="/services#product-assessment" className="link-quiet text-[13px]">
            Product Assessment
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="eyebrow mb-1">/ contact</div>
          <Link href="/contact" className="link-quiet text-[13px]">
            Start a conversation
          </Link>
          <Link href="/about" className="link-quiet text-[13px]">
            About
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex justify-between items-center py-6 border-t border-border text-xs text-muted-2">
          <span>&copy; {new Date().getFullYear()} altrntv labs</span>
          <span>altrntv.io</span>
        </div>
      </div>
    </footer>
  );
}
