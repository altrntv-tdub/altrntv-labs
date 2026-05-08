import Link from "next/link";

type Panel = {
  id: string;
  tag: string;
  headline: string;
  body: string;
  bullets: string[];
  cta: string;
  href: string;
};

const issuers: Panel = {
  id: "issuers",
  tag: "for issuers",
  headline: "Find the weak points before allocators do.",
  body: "An independent assessment of the questions serious allocators will raise about structure, economics, liquidity, operations, and distribution.",
  bullets: [
    "A clear picture of where the product is weakest",
    "The harder questions surfaced before the first serious allocator conversation",
    "A remediation path showing what to fix, what can remain open, and what should be sequenced first",
  ],
  cta: "See the Issuer Assessment",
  href: "/services#issuer-assessment",
};

const allocators: Panel = {
  id: "allocators",
  tag: "for allocators",
  headline: "Know what you are actually looking at.",
  body: "Independent analysis of tokenized products before the diligence process consumes your team's time or your committee's attention.",
  bullets: [
    "Coverage of structure, economics, liquidity, operations, and distribution",
    "Sector context and comparable structures so the product is not evaluated in isolation",
    "The issuer questions to ask before conviction increases or capital is committed",
  ],
  cta: "See the Product Assessment",
  href: "/services#product-assessment",
};

function PanelView({ panel }: { panel: Panel }) {
  return (
    <div id={panel.id} className="p-8 md:p-12 lg:p-16 flex flex-col">
      <div className="eyebrow text-accent">/ {panel.tag}</div>
      <h3 className="display mt-5 text-[28px] md:text-[34px] leading-[1.1] text-fg max-w-md">
        {panel.headline}
      </h3>
      <p className="mt-6 text-muted text-[16px] leading-relaxed max-w-md">
        {panel.body}
      </p>
      <ul className="mt-8 space-y-3 max-w-md">
        {panel.bullets.map((b) => (
          <li
            key={b}
            className="flex gap-3 text-sm text-fg/90 leading-relaxed"
          >
            <span className="mt-2 h-px w-4 bg-accent shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8 border-t border-border">
        <Link
          href={panel.href}
          className="inline-flex items-center gap-2 text-sm text-fg hover:text-accent transition-colors"
        >
          {panel.cta}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

export function WhoWeServe() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-24 md:pt-32 pb-8">
        <div className="eyebrow mb-4">/ who we serve</div>
        <h2 className="display text-3xl md:text-4xl max-w-2xl">
          The same product has to hold up from both sides.
        </h2>
      </div>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pb-24 md:pb-32">
        <div className="mt-12 grid md:grid-cols-2 border border-border divide-y md:divide-y-0 md:divide-x divide-border">
          <PanelView panel={issuers} />
          <PanelView panel={allocators} />
        </div>
      </div>
    </section>
  );
}
