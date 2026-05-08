import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact — altrntv labs",
  description:
    "Start a conversation with altrntv labs about an assessment for an issuer or allocator engagement.",
};

type SearchParams = Promise<{ role?: string }>;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { role } = await searchParams;
  const initialRole =
    role === "issuer" || role === "allocator" ? role : undefined;
  return (
    <section>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-6">/ contact</div>
            <h1 className="display text-[40px] md:text-[64px] leading-[1.05]">
              Start a<br />
              conversation.
            </h1>
            <p className="mt-8 text-[17px] leading-relaxed text-muted max-w-md">
              Tell us about the product or the decision you are facing.
              We&apos;ll be in touch.
            </p>

          </div>

          <div className="lg:col-span-7">
            <ContactForm initialRole={initialRole} />
          </div>
        </div>
      </div>
    </section>
  );
}
