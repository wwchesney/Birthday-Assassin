/**
 * Produces a random derangement of `ids`: a permutation where every
 * id maps to a different id (nobody is assigned themselves). Mutual
 * pairs (A->B and B->A) are allowed.
 */
export function generateDerangement(ids: string[]): string[] {
  if (ids.length < 2) {
    throw new Error("Need at least 2 participants to generate pairings");
  }

  const maxAttempts = 1000;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const shuffled = shuffle(ids);
    if (shuffled.every((id, i) => id !== ids[i])) {
      return shuffled;
    }
  }

  // Extremely unlikely fallback: build a guaranteed derangement via a
  // single random cycle through everyone, so no one lands on themselves.
  const shuffled = shuffle(ids);
  const n = shuffled.length;
  const cyclicNext = new Map<string, string>();
  for (let i = 0; i < n; i++) {
    cyclicNext.set(shuffled[i], shuffled[(i + 1) % n]);
  }
  return ids.map((id) => cyclicNext.get(id)!);
}

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
