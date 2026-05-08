"use client";

import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry, type ContactState } from "./actions";

const initial: ContactState = { ok: false, message: "" };

type Role = "issuer" | "allocator";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send inquiry"}
      <span aria-hidden>→</span>
    </button>
  );
}

const fieldClass =
  "w-full bg-transparent border border-border px-4 py-3 text-fg text-sm placeholder:text-muted/70 focus:outline-none focus:border-accent transition-colors";

const labelClass =
  "font-mono text-[10px] tracking-[0.14em] uppercase text-muted";

export function ContactForm({ initialRole }: { initialRole?: Role }) {
  const [role, setRole] = useState<Role>(initialRole ?? "issuer");
  const [state, formAction] = useActionState(submitInquiry, initial);

  if (state.ok) {
    return (
      <div className="border border-border bg-surface/60 p-10 md:p-14">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent">
          / received
        </div>
        <p className="mt-6 text-fg text-xl leading-relaxed max-w-md">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <fieldset>
        <legend className={labelClass}>I am inquiring as</legend>
        <div className="mt-3 inline-flex border border-border-2">
          {(["issuer", "allocator"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`px-5 py-2.5 text-sm transition-all ${
                role === r
                  ? "bg-fg text-bg"
                  : "bg-transparent text-fg-2"
              } ${r === "issuer" ? "border-r border-border-2" : ""}`}
            >
              {r === "issuer" ? "Issuer" : "Allocator"}
            </button>
          ))}
        </div>
        <input type="hidden" name="role" value={role} />
      </fieldset>

      <div className="grid md:grid-cols-2 gap-6">
        <label className="block">
          <span className={labelClass}>name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`mt-3 ${fieldClass}`}
          />
        </label>
        <label className="block">
          <span className={labelClass}>email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`mt-3 ${fieldClass}`}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>organization</span>
        <input
          name="organization"
          type="text"
          required
          autoComplete="organization"
          className={`mt-3 ${fieldClass}`}
        />
      </label>

      <label className="block">
        <span className={labelClass}>where are you in the process?</span>
        <select
          name="stage"
          required
          className={`mt-3 ${fieldClass} appearance-none cursor-pointer`}
          defaultValue=""
          key={role}
        >
          <option value="" disabled>
            Select one
          </option>
          {role === "issuer" ? (
            <>
              <option value="early">Early stage, still refining the product</option>
              <option value="pre-capital">Preparing to go to capital</option>
              <option value="live">Product is live, need an independent review</option>
            </>
          ) : (
            <>
              <option value="evaluating">Evaluating a specific opportunity</option>
              <option value="diligence">In diligence, need an independent read</option>
              <option value="comparing">Comparing across multiple opportunities</option>
            </>
          )}
          <option value="other">Other</option>
        </select>
      </label>

      <label className="block">
        <span className={labelClass}>
          tell us about the {role === "issuer" ? "product" : "opportunity"}
        </span>
        <textarea
          name="message"
          required
          rows={6}
          className={`mt-3 ${fieldClass} resize-none`}
        />
      </label>

      {state.message && !state.ok && (
        <p className="font-mono text-xs text-accent">! {state.message}</p>
      )}

      <div className="flex items-center justify-between gap-6 pt-2">
        <p className="text-xs text-muted max-w-xs">
          Inquiries are reviewed by altrntv labs directly. We respond within
          one week.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
