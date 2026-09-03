import { sql, type Participant } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { adminLogout, removeParticipant } from "./actions";
import LoginForm from "./LoginForm";
import AddParticipantForm from "./AddParticipantForm";
import GeneratePairingsButton from "./GeneratePairingsButton";

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-canvas px-6 py-16">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight text-ink">
          Admin
        </h1>
        <LoginForm />
      </div>
    );
  }

  const [participantRows, pairingCountResult] = await Promise.all([
    sql`
      select id, name, phone,
        to_char(birthday, 'YYYY-MM-DD') as birthday,
        to_char(created_at, 'YYYY-MM-DD') as created_at
      from participants
      order by participants.created_at asc
    `,
    sql`select count(*)::int as count from pairings`,
  ]);
  const participants = participantRows as unknown as Participant[];

  const pairingsExist = ((pairingCountResult[0]?.count as number) ?? 0) > 0;

  return (
    <div className="flex flex-1 flex-col items-center bg-canvas px-6 py-12">
      <div className="w-full max-w-3xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            Admin
          </h1>
          <form action={adminLogout}>
            <button
              type="submit"
              className="text-sm font-medium text-muted hover:text-ink"
            >
              Log out
            </button>
          </form>
        </div>

        <section className="rounded-2xl border border-rule bg-panel p-6">
          <h2 className="mb-4 text-lg font-medium text-ink">
            Participants ({participants.length})
          </h2>

          <AddParticipantForm />

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-rule text-muted">
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Phone</th>
                  <th className="py-2 pr-4 font-medium">Birthday</th>
                  <th className="py-2 pr-4 font-medium">Joined</th>
                  <th className="py-2 pr-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {participants.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-muted">
                      No participants yet.
                    </td>
                  </tr>
                )}
                {participants.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-rule/60 last:border-0"
                  >
                    <td className="py-2 pr-4 text-ink">{p.name}</td>
                    <td className="py-2 pr-4 text-muted">{p.phone}</td>
                    <td className="py-2 pr-4 text-muted">
                      {formatDate(p.birthday)}
                    </td>
                    <td className="py-2 pr-4 text-muted">
                      {formatDate(p.created_at)}
                    </td>
                    <td className="py-2 pr-0 text-right">
                      <form action={removeParticipant}>
                        <input type="hidden" name="id" value={p.id} />
                        <button
                          type="submit"
                          className="text-sm font-medium text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-rule bg-panel p-6">
          <h2 className="mb-1 text-lg font-medium text-ink">
            Pairings
          </h2>
          <p className="mb-4 text-sm text-muted">
            Once everyone has joined, generate pairings. The results are
            never shown here — only participants can look up their own
            assignment.
          </p>
          <GeneratePairingsButton
            pairingsExist={pairingsExist}
            participantCount={participants.length}
          />
        </section>
      </div>
    </div>
  );
}
