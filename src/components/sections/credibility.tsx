export function Credibility() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32">
        <div className="eyebrow mb-6">/ operating principle</div>
        <h2 className="display text-3xl md:text-4xl">
          No placement. No success fee. No mandate to sell.
        </h2>

        <div className="mt-14 grid md:grid-cols-[5fr_7fr] gap-8 md:gap-16">
          <div>
            <p className="serif text-[22px] text-fg-2 italic leading-[1.45] max-w-[20ch]">
              The work is better when the assessor has nothing else for sale.
            </p>
          </div>
          <div className="serif text-[18px] text-fg-2 leading-[1.65] max-w-[620px] space-y-6">
            <p>
              Inside both issuers and allocators, incentives can quietly shape
              decisions. Products get pushed toward launch dates. Capital
              processes move toward allocation targets. The assessment step
              should sit outside that pressure.
            </p>
            <p>
              Every engagement has a{" "}
              <strong className="text-fg font-medium">fixed scope</strong>. The
              questions, deliverables, timeline, and fee are agreed before work
              begins. There are no distribution mandates, and no revenue tied
              to whether the product launches, raises, or receives an
              allocation.
            </p>
            <p>
              The result is work built to hold up in the room where a view has
              to be defended: an investment committee pressing on an allocation,
              a board reviewing a product structure, or a team deciding whether
              to pause before going to capital.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
