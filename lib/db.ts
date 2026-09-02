import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export const sql = neon(process.env.DATABASE_URL);

export type Participant = {
  id: string;
  name: string;
  phone: string;
  birthday: string; // ISO date (YYYY-MM-DD)
  created_at: string;
};

export type Pairing = {
  id: string;
  assigner_id: string;
  celebrant_id: string;
  created_at: string;
};
