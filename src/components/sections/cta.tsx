import Link from "next/link";

export function ClosingCTA() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="eyebrow mb-6">/ get in touch</div>
        <h2
          className="display text-[40px] md:text-[72px] leading-[1.04] tracking-[-0.025em] max-w-[18ch]"
        >
          Need an independent read on a tokenized product?
        </h2>
        <div className="mt-10">
          <Link href="/contact" className="btn-primary">
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
