import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Normalizes a user-entered phone number to E.164 (e.g. +16035551234).
 * Defaults to US when no country code is present. Returns null if invalid.
 */
export function normalizePhone(input: string): string | null {
  const parsed = parsePhoneNumberFromString(input, "US");
  if (!parsed || !parsed.isValid()) return null;
  return parsed.number; // E.164 format
}
