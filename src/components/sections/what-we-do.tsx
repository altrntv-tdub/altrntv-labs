const focus = [
  {
    n: "01",
    title: "Structure",
    question: "What is actually being underwritten?",
    body: "The asset exposure, wrapper, claim path, token rights, legal form, and economic reality behind the product narrative.",
  },
  {
    n: "02",
    title: "Economics",
    question: "How does value move through the product?",
    body: "Yield profile, fee stack, return path, distributions, spread, incentives, and whether the economics reach the holder the way the materials suggest.",
  },
  {
    n: "03",
    title: "Liquidity",
    question: "How does capital get in and out?",
    body: "Subscription or minting, redemption mechanics, secondary-market assumptions, NAV, settlement timing, gates, discounts, and practical exit paths.",
  },
  {
    n: "04",
    title: "Operations",
    question: "Who makes the product work, and what happens if that process fails?",
    body: "Counterparties, custody, administration, valuation, compliance, reporting, offchain dependencies, and the operational assumptions the product depends on.",
  },
  {
    n: "05",
    title: "Distribution",
    question: "Where can the product actually be used, bought, held, or integrated?",
    body: "Qualified buyer pathways, product partnerships, platform integrations, custodians, advisors, ecosystems, jurisdictions, DeFi compatibility, and composability constraints.",
  },
];

export function WhatWeDo() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5">
            <div className="eyebrow">/ framework</div>
            <h2 className="display mt-4 text-3xl md:text-4xl">
              What makes a product
              <br />
              underwritable.
            </h2>
          </div>
          <p className="md:col-span-6 md:col-start-7 text-muted text-[17px] leading-relaxed self-end">
            These are the questions that separate capital-ready products from ones that stall. Every assessment is built around them.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-t border-l border-border">
          {focus.map((f) => (
            <li
              key={f.n}
              className="border-r border-b border-border p-7 md:p-8 flex flex-col hover:bg-surface transition-colors"
            >
              <div className="font-mono text-xs text-accent">{f.n}</div>
              <div className="mt-6 text-fg text-base font-medium">
                {f.title}
              </div>
              <p className="mt-4 text-[15px] leading-snug text-fg-2 italic">
                {f.question}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {f.body}
              </p>
            </li>
          ))}
          <li className="border-r border-b border-border p-7 md:p-8 flex flex-col justify-between bg-surface">
            <div>
              <div className="font-mono text-xs text-accent">/ outcome</div>
              <div className="mt-6 text-fg text-base font-medium">
                Capital readiness.
              </div>
              <p className="mt-4 text-[15px] leading-snug text-fg">
                A product is capital-ready only when its structure, economics, liquidity, operations, and distribution path are clear enough for the capital it is trying to reach.
              </p>
            </div>
            <a
              href="/services"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80 transition-opacity"
            >
              View services
              <span aria-hidden>→</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
