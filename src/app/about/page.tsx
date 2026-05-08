import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — altrntv labs",
  description:
    "altrntv labs is built and operated by Tyler Wales. Fixed-scope assessments and applied work on the liquidity and infrastructure problems underneath tokenized assets.",
};

export default function AboutPage() {
  return (
    <section className="pt-20 pb-24 md:pt-28 md:pb-32">
      <div className="mx-auto max-w-[880px] px-6 md:px-10">
        <div className="eyebrow mb-6">/ about</div>
        <h1 className="display text-[40px] md:text-[64px] leading-[1.02] tracking-[-0.025em] max-w-[18ch]">
          Built from the inside
          <br />
          of tokenized finance.
        </h1>
        <div className="mt-8 font-mono text-xs text-muted pb-2 border-b border-border">
          / founded by Tyler Wales
        </div>

        <div className="mt-12 serif text-[19px] text-fg-2 leading-[1.65] max-w-[680px] space-y-6">
          <p>
            altrntv labs was founded by Tyler Wales to provide independent,
            fixed-scope assessments for issuers and allocators of tokenized
            financial products, and to build infrastructure for the liquidity
            problems underneath tokenized assets.
          </p>
          <p>
            Before starting the firm, Tyler led origination and diligence
            across tokenized private credit, commodities, carbon markets, and
            other yield-bearing assets at EMURGO, a cofounding entity of the
            Cardano ecosystem. The five-question framework he built for altrntv
            labs reflects the questions that consistently determined whether a
            tokenized product was ready for serious capital.
          </p>
        </div>

        <div className="mt-12">
          <Link href="/contact" className="btn-primary">
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
