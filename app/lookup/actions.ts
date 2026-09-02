"use server";

import { sql } from "@/lib/db";
import { normalizePhone } from "@/lib/phone";

export type LookupState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "not-paired" }
  | {
      status: "paired";
      celebrantName: string;
      celebrantBirthday: string;
      groupNumbers: string[];
    };

export async function lookupParticipant(
  _prev: LookupState,
  formData: FormData
): Promise<LookupState> {
  const name = String(formData.get("name") || "").trim();
  const phoneRaw = String(formData.get("phone") || "").trim();

  if (!name || !phoneRaw) {
    return { status: "error", message: "Enter your name and phone number." };
  }

  const phone = normalizePhone(phoneRaw);
  if (!phone) {
    return { status: "error", message: "Enter a valid phone number." };
  }

  const matches = await sql`
    select id from participants
    where phone = ${phone} and lower(name) = lower(${name})
  `;

  if (matches.length === 0) {
    return {
      status: "error",
      message:
        "No match found. Double-check your name and phone number, or make sure you've signed up.",
    };
  }

  const selfId = matches[0].id as string;

  const pairingRows = await sql`
    select pr.celebrant_id, p.name as celebrant_name, p.birthday as celebrant_birthday
    from pairings pr
    join participants p on p.id = pr.celebrant_id
    where pr.assigner_id = ${selfId}
  `;

  if (pairingRows.length === 0) {
    return { status: "not-paired" };
  }

  const celebrantId = pairingRows[0].celebrant_id as string;
  const celebrantName = pairingRows[0].celebrant_name as string;
  const celebrantBirthday = pairingRows[0].celebrant_birthday as string;

  const groupRows = await sql`
    select phone from participants
    where id != ${selfId} and id != ${celebrantId}
  `;

  return {
    status: "paired",
    celebrantName,
    celebrantBirthday,
    groupNumbers: groupRows.map((r) => r.phone as string),
  };
}
