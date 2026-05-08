"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  ok: boolean;
  message: string;
};

export async function submitInquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const role = String(formData.get("role") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const stage = String(formData.get("stage") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!["issuer", "allocator"].includes(role)) {
    return { ok: false, message: "Please select issuer or allocator." };
  }
  if (!name) return { ok: false, message: "Name is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "A valid email is required." };
  }
  if (message.length < 10) {
    return { ok: false, message: "Tell us a little more about the request." };
  }

  const { error } = await resend.emails.send({
    from: "altrntv labs <notifications@altrntv.io>",
    to: "tyler@altrntv.io",
    replyTo: email,
    subject: `New inquiry from ${name} (${role})`,
    text: [
      `Role: ${role}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Organization: ${organization}`,
      `Stage: ${stage}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("[altrntv labs inquiry error]", error);
    return { ok: false, message: "Something went wrong. Try again or email us directly." };
  }

  return {
    ok: true,
    message: "Thank you. We'll respond within one week.",
  };
}
