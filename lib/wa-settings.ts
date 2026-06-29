import { Pool } from "pg";

export type WaSettings = {
  fonnteToken: string;
  targetNumber: string;
  autoNotify: boolean;
};

let pool: Pool | null = null;

function getPool() {
  if (!pool) {
    if (!process.env.DB_URL) throw new Error("DB_URL belum diset");
    pool = new Pool({ connectionString: process.env.DB_URL });
  }
  return pool;
}

async function ensureSchema() {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS wa_settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      fonnte_token TEXT NOT NULL DEFAULT '',
      target_number TEXT NOT NULL DEFAULT '',
      auto_notify BOOLEAN NOT NULL DEFAULT true,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT single_wa_settings_row CHECK (id = 1)
    )
  `);
}

export async function getWaSettings(): Promise<WaSettings | null> {
  await ensureSchema();
  const result = await getPool().query(
    "SELECT fonnte_token, target_number, auto_notify FROM wa_settings WHERE id = 1",
  );
  const row = result.rows[0];
  if (!row || !row.fonnte_token) return null;
  return {
    fonnteToken: row.fonnte_token,
    targetNumber: row.target_number,
    autoNotify: row.auto_notify,
  };
}

export async function upsertWaSettings(input: WaSettings): Promise<WaSettings> {
  await ensureSchema();
  const result = await getPool().query(
    `
      INSERT INTO wa_settings (id, fonnte_token, target_number, auto_notify, updated_at)
      VALUES (1, $1, $2, $3, NOW())
      ON CONFLICT (id)
      DO UPDATE SET
        fonnte_token = EXCLUDED.fonnte_token,
        target_number = EXCLUDED.target_number,
        auto_notify = EXCLUDED.auto_notify,
        updated_at = NOW()
      RETURNING fonnte_token, target_number, auto_notify
    `,
    [input.fonnteToken, input.targetNumber, input.autoNotify],
  );
  const row = result.rows[0];
  return {
    fonnteToken: row.fonnte_token,
    targetNumber: row.target_number,
    autoNotify: row.auto_notify,
  };
}
