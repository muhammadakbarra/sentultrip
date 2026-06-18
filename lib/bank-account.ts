import { Pool } from "pg";

export type BankAccount = {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  updatedAt?: string;
};

let pool: Pool | null = null;

function getPool() {
  if (!pool) {
    if (!process.env.DB_URL) throw new Error("DB_URL belum diset");
    pool = new Pool({ connectionString: process.env.DB_URL });
  }

  return pool;
}

export async function ensureBankAccountSchema() {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS bank_account_settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      bank_name TEXT NOT NULL DEFAULT '',
      account_number TEXT NOT NULL DEFAULT '',
      account_holder TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT single_bank_account_row CHECK (id = 1)
    )
  `);
}

export async function getBankAccount(): Promise<BankAccount | null> {
  await ensureBankAccountSchema();
  const result = await getPool().query(
    "SELECT bank_name, account_number, account_holder, updated_at FROM bank_account_settings WHERE id = 1",
  );

  const row = result.rows[0];
  if (!row || !row.bank_name || !row.account_number || !row.account_holder) return null;

  return {
    bankName: row.bank_name,
    accountNumber: row.account_number,
    accountHolder: row.account_holder,
    updatedAt: row.updated_at,
  };
}

export async function upsertBankAccount(input: BankAccount) {
  await ensureBankAccountSchema();

  const result = await getPool().query(
    `
      INSERT INTO bank_account_settings (id, bank_name, account_number, account_holder, updated_at)
      VALUES (1, $1, $2, $3, NOW())
      ON CONFLICT (id)
      DO UPDATE SET
        bank_name = EXCLUDED.bank_name,
        account_number = EXCLUDED.account_number,
        account_holder = EXCLUDED.account_holder,
        updated_at = NOW()
      RETURNING bank_name, account_number, account_holder, updated_at
    `,
    [input.bankName, input.accountNumber, input.accountHolder],
  );

  const row = result.rows[0];
  return {
    bankName: row.bank_name,
    accountNumber: row.account_number,
    accountHolder: row.account_holder,
    updatedAt: row.updated_at,
  };
}
