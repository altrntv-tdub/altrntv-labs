import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — altrntv labs",
  description:
    "Fixed-scope assessments for issuers launching tokenized financial products and allocators evaluating specific opportunities.",
};

const FIVE_QUESTIONS = [
  { n: "01", t: "Structure", q: "What is actually being underwritten?" },
  { n: "02", t: "Economics", q: "How does value move through the product?" },
  { n: "03", t: "Liquidity", q: "How does capital get in and out?" },
  { n: "04", t: "Operations", q: "Who makes the product work, and what happens if that process fails?" },
  { n: "05", t: "Distribution", q: "Where can the product actually be used, bought, held, or integrated?" },
];

type Deliverable = {
  title: string;
  description: string;
};

function OfferingBlock({
  title,
  duration,
  summary,
  deliverables,
  cta,
  ctaHref,
}: {
  title: string;
  duration: string;
  summary: string;
  deliverables: Deliverable[];
  cta: string;
  ctaHref: string;
}) {
  return (
    <article className="pb-10 grid md:grid-cols-[4fr_8fr] gap-6 md:gap-16 items-start">
      <div>
        <h3 className="display text-2xl md:text-[32px] leading-[1.15] tracking-[-0.015em]">
          {title}
        </h3>
        <div className="font-mono text-[11px] text-muted mt-4">/ {duration}</div>
      </div>
      <div>
        <p className="serif text-lg text-fg-2 leading-relaxed max-w-[620px]">
          {summary}
        </p>
        <div className="mt-7">
          <div className="eyebrow mb-4">/ deliverables</div>
          <ul className="space-y-2.5">
            {deliverables.map((d, i) => (
              <li key={i} className="grid grid-cols-[24px_1fr] gap-2 text-sm text-fg-2 leading-relaxed">
                <span className="font-mono text-[11px] text-muted pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong className="text-fg font-medium">{d.title}</strong>{" "}
                  {d.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <Link href={ctaHref} className="btn-primary">
            {cta}
          </Link>
        </div>
      </div>
    </article>
  );
}

const PROCESS_STEPS = [
  { n: "01", t: "Intake", b: "A short conversation about the product or the decision you are facing. We assess fit and whether the engagement makes sense before going further." },
  { n: "02", t: "Scope", b: "A structured first look at the product, followed by a written statement of work: scope, deliverables, timeline, and fee. Every engagement begins with this diagnostic step so the assessment is shaped to the product and the decision at hand." },
  { n: "03", t: "Assessment", b: "The work itself. Conducted independently, with structured check-ins where useful." },
  { n: "04", t: "Delivery", b: "The agreed deliverables, in writing, with a closing conversation. The work is what gets handed over; we do not place capital." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="eyebrow mb-6">/ services</div>
          <h1 className="display text-[40px] md:text-[64px] leading-[1.02] tracking-[-0.025em] max-w-[22ch]" style={{ textWrap: "balance" }}>
            Structured assessments for issuers and allocators.
          </h1>
          <p className="mt-5 max-w-[680px] text-base text-muted leading-relaxed">
            Fixed-scope reports for issuers preparing tokenized products for capital and allocators evaluating opportunities before commitment.
          </p>
          <div className="mt-8 flex flex-wrap gap-5 items-center">
            <a href="#issuer-assessment" className="link text-sm">
              ↓ for issuers
            </a>
            <a href="#product-assessment" className="link text-sm">
              ↓ for allocators
            </a>
          </div>
        </div>
      </section>

      {/* Framework Recap */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32">
          <div className="eyebrow mb-6">/ framework</div>
          <div className="grid md:grid-cols-[6fr_5fr] gap-8 md:gap-16 items-end mb-12">
            <h2 className="display text-3xl md:text-4xl max-w-[18ch]">
              Every assessment is organized around five questions.
            </h2>
            <p className="text-base text-muted leading-relaxed max-w-[460px]">
              The depth of each depends on the product and what the client needs to decide.
            </p>
          </div>
          <ol className="border-t border-border">
            {FIVE_QUESTIONS.map((q) => (
              <li key={q.n} className="py-6 border-b border-border grid md:grid-cols-[1fr_3fr_6fr] gap-2 md:gap-10 md:items-baseline">
                <div className="font-mono text-[11px] text-muted">{q.n}</div>
                <h3 className="display text-xl md:text-[26px] tracking-[-0.015em]">{q.t}</h3>
                <p className="serif text-[17px] text-fg-2 leading-[1.45] italic">{q.q}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Issuer Assessment */}
      <section id="issuer-assessment" className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32">
          <div className="eyebrow mb-6">/ for issuers</div>
          <OfferingBlock
            title="Issuer Assessment"
            duration="4-6 weeks"
            summary="A complete independent assessment before capital outreach. For teams launching tokenized financial products who need to understand whether the product can withstand serious allocator scrutiny."
            deliverables={[
              { title: "Issuer assessment report.", description: "A written assessment across structure, economics, liquidity, operations, and distribution." },
              { title: "Ranked blocker list.", description: "The issues most likely to damage allocator confidence or stall capital outreach." },
              { title: "Remediation roadmap.", description: "What needs to change before outreach, what can remain open, and what should be sequenced first." },
              { title: "Allocator-facing summary.", description: "A controlled outward-facing summary the team can use to frame the product without overstating readiness." },
            ]}
            cta="Inquire about an Issuer Assessment"
            ctaHref="/contact?role=issuer"
          />
        </div>
      </section>

      {/* Product Assessment */}
      <section id="product-assessment" className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32">
          <div className="eyebrow mb-6">/ for allocators</div>
          <OfferingBlock
            title="Product Assessment"
            duration="2-3 weeks"
            summary="A specific tokenized product, evaluated in context. For allocators that need an independent assessment of a tokenized opportunity before committing time or capital."
            deliverables={[
              { title: "Product assessment report.", description: "A written assessment of structure, economics, liquidity, operations, and distribution, with the product placed in context of its category." },
              { title: "Operating assumptions.", description: "The assumptions the product depends on, including what is documented, implied, or unresolved." },
              { title: "Sector context and comparable structures.", description: "How the product fits within its category, including alternatives, common risks, and where it appears stronger or weaker." },
              { title: "Issuer question set.", description: "The questions to take back before conviction increases or capital is committed." },
            ]}
            cta="Inquire about a Product Assessment"
            ctaHref="/contact?role=allocator"
          />
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32">
          <div className="eyebrow mb-6">/ process</div>
          <h2 className="display text-3xl md:text-4xl max-w-[20ch]">
            Four steps. Every engagement.
          </h2>
          <ol className="mt-12 border-t border-border">
            {PROCESS_STEPS.map((s) => (
              <li key={s.n} className="py-7 border-b border-border grid md:grid-cols-[1fr_3fr_8fr] gap-2 md:gap-10 md:items-baseline">
                <div className="font-mono text-[11px] text-muted">{s.n}</div>
                <h3 className="display text-xl md:text-[26px] tracking-[-0.015em]">{s.t}</h3>
                <p className="text-[15px] text-fg-2 leading-relaxed max-w-[620px]">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-40">
          <div className="eyebrow mb-6">/ get in touch</div>
          <h2 className="display text-[28px] md:text-[40px] leading-[1.1] max-w-[18ch]">
            Considering an assessment?
          </h2>
          <p className="mt-4 max-w-[620px] text-muted leading-relaxed">
            Tell us about the product. We&apos;ll be in touch.
          </p>
          <div className="mt-10">
            <Link href="/contact" className="btn-primary">
              Contact altrntv labs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
