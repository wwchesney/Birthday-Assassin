import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

type Sql = NeonQueryFunction<false, false>;

let client: Sql | undefined;

function getClient(): Sql {
  if (!client) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }
    client = neon(process.env.DATABASE_URL);
  }
  return client;
}

// Lazily creates the Neon client on first real query instead of at module
// import time, so `next build`'s page-data collection (which imports every
// route) doesn't crash in environments where DATABASE_URL isn't set yet.
export const sql: Sql = new Proxy((() => {}) as unknown as Sql, {
  apply(_target, _thisArg, args) {
    return (getClient() as (...a: unknown[]) => unknown)(...args);
  },
  get(_target, prop, receiver) {
    return Reflect.get(getClient(), prop, receiver);
  },
});

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
