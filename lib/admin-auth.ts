import crypto from "crypto";
import { cookies } from "next/headers";
import { Pool } from "pg";

const COOKIE_NAME = "sentultrip_admin_session";
const SESSION_AGE_SECONDS = 60 * 60 * 24 * 7;

let pool: Pool | null = null;

function getPool() {
  if (!pool) {
    if (!process.env.DB_URL) {
      throw new Error("DB_URL belum diset");
    }

    pool = new Pool({ connectionString: process.env.DB_URL });
  }

  return pool;
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET belum diset");
  }

  return secret;
}

function sign(payload: string) {
  return crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) return false;
  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

function createPasswordHash(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");

  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [method, salt, hash] = storedHash.split(":");
  if (method !== "scrypt" || !salt || !hash) return false;

  const inputHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return safeEqual(inputHash, hash);
}

export async function ensureAdminSchema() {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function upsertAdminUser(username: string, password: string) {
  await ensureAdminSchema();
  const passwordHash = createPasswordHash(password);

  await getPool().query(
    `
      INSERT INTO admin_users (username, password_hash, updated_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (username)
      DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = NOW()
    `,
    [username, passwordHash],
  );
}

export async function validateAdminLogin(username: string, password: string) {
  await ensureAdminSchema();

  const result = await getPool().query<{
    id: number;
    username: string;
    password_hash: string;
  }>("SELECT id, username, password_hash FROM admin_users WHERE username = $1", [
    username,
  ]);

  const user = result.rows[0];
  if (!user || !verifyPassword(password, user.password_hash)) return null;

  return { id: user.id, username: user.username };
}

export function createSessionToken(user: { id: number; username: string }) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_AGE_SECONDS;
  const payload = Buffer.from(
    JSON.stringify({ id: user.id, username: user.username, exp: expiresAt }),
  ).toString("base64url");
  const signature = sign(payload);

  return `${payload}.${signature}`;
}

export function verifySessionToken(token?: string) {
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(sign(payload), signature)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      id: number;
      username: string;
      exp: number;
    };

    if (!session.id || !session.username || !session.exp) return null;
    if (session.exp < Math.floor(Date.now() / 1000)) return null;

    return session;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

export async function setAdminSession(user: { id: number; username: string }) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionToken(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_AGE_SECONDS,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
