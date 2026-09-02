"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { normalizePhone } from "@/lib/phone";
import { generateDerangement } from "@/lib/pairing";
import {
  checkAdminPassword,
  createAdminSession,
  clearAdminSession,
  isAdminAuthenticated,
} from "@/lib/auth";

export type LoginState = { status: "idle" | "error"; message?: string };

export async function adminLogin(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") || "");
  if (!checkAdminPassword(password)) {
    return { status: "error", message: "Incorrect password." };
  }
  await createAdminSession();
  redirect("/admin");
}

export async function adminLogout() {
  await clearAdminSession();
  redirect("/admin");
}

export type ParticipantFormState = { status: "idle" | "error"; message?: string };

export async function addParticipant(
  _prev: ParticipantFormState,
  formData: FormData
): Promise<ParticipantFormState> {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  const name = String(formData.get("name") || "").trim();
  const phoneRaw = String(formData.get("phone") || "").trim();
  const birthday = String(formData.get("birthday") || "").trim();

  if (!name || !birthday) {
    return { status: "error", message: "Name and birthday are required." };
  }

  const phone = normalizePhone(phoneRaw);
  if (!phone) {
    return { status: "error", message: "Enter a valid phone number." };
  }

  try {
    await sql`
      insert into participants (name, phone, birthday)
      values (${name}, ${phone}, ${birthday})
    `;
  } catch (err: unknown) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "23505") {
      return { status: "error", message: "That phone number is already signed up." };
    }
    throw err;
  }

  revalidatePath("/admin");
  return { status: "idle" };
}

export async function removeParticipant(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  const id = String(formData.get("id") || "");
  if (!id) return;

  await sql`delete from participants where id = ${id}`;
  revalidatePath("/admin");
}

export type PairingState = {
  status: "idle" | "error" | "confirm-required" | "success";
  message?: string;
};

export async function generatePairings(
  _prev: PairingState,
  formData: FormData
): Promise<PairingState> {
  if (!(await isAdminAuthenticated())) redirect("/admin");

  const confirmed = formData.get("confirm") === "true";

  const participants = await sql`select id from participants`;
  if (participants.length < 2) {
    return {
      status: "error",
      message: "Need at least 2 people to generate pairings.",
    };
  }

  const existing = await sql`select count(*)::int as count from pairings`;
  const existingCount = (existing[0]?.count as number) ?? 0;

  if (existingCount > 0 && !confirmed) {
    return {
      status: "confirm-required",
      message:
        "Pairings already exist. Regenerating will replace them — this can't be undone.",
    };
  }

  const ids = participants.map((p) => p.id as string);
  const celebrants = generateDerangement(ids);

  await sql.transaction((tx) => [
    tx`delete from pairings`,
    ...ids.map(
      (assignerId, i) =>
        tx`insert into pairings (assigner_id, celebrant_id) values (${assignerId}, ${celebrants[i]})`
    ),
  ]);

  revalidatePath("/admin");
  return { status: "success", message: "Pairings generated!" };
}
