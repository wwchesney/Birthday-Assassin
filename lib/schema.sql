create extension if not exists pgcrypto;

create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null unique,
  birthday date not null,
  created_at timestamptz not null default now()
);

create table if not exists pairings (
  id uuid primary key default gen_random_uuid(),
  assigner_id uuid not null references participants(id) on delete cascade,
  celebrant_id uuid not null references participants(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- each assigner is responsible for exactly one celebrant
create unique index if not exists pairings_assigner_unique on pairings(assigner_id);
