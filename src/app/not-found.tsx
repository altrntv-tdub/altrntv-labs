import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-40">
      <div className="mx-auto max-w-[640px] px-6 md:px-10">
        <div className="eyebrow mb-6">/ 404</div>
        <h1 className="display text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em]">
          Not in scope.
        </h1>
        <p className="mt-6 text-base text-muted max-w-[480px]">
          That page does not exist. Return to the home page or contact altrntv
          labs.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="btn-primary">
            Home
          </Link>
          <Link href="/contact" className="btn-ghost">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
