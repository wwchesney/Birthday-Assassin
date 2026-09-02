"use server";

import { sql } from "@/lib/db";
import { normalizePhone } from "@/lib/phone";

export type SignupState = {
  status: "idle" | "error" | "success";
  message?: string;
};

export async function signup(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const name = String(formData.get("name") || "").trim();
  const phoneRaw = String(formData.get("phone") || "").trim();
  const birthday = String(formData.get("birthday") || "").trim();

  if (!name) {
    return { status: "error", message: "Name is required." };
  }
  if (!birthday) {
    return { status: "error", message: "Birthday is required." };
  }

  const phone = normalizePhone(phoneRaw);
  if (!phone) {
    return {
      status: "error",
      message: "Enter a valid phone number (e.g. 603-555-1234).",
    };
  }

  try {
    await sql`
      insert into participants (name, phone, birthday)
      values (${name}, ${phone}, ${birthday})
    `;
  } catch (err: unknown) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "23505") {
      return {
        status: "error",
        message: "That phone number is already signed up.",
      };
    }
    throw err;
  }

  return { status: "success" };
}
