import { Pool } from "pg";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: number;
  bookingCode: string;
  packageSlug: string;
  packageName: string;
  tripCode: string;
  startDate: string;
  endDate: string;
  adultCount: number;
  childCount: number;
  adultPrice: number;
  childPrice: number;
  nasiLiwetCount: number;
  nasiLiwetPrice: number;
  pickupCount: number;
  pickupPrice: number;
  totalAmount: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  paymentMethod: string;
  status: BookingStatus;
  createdAt: string;
};

export type CreateBookingInput = Omit<
  Booking,
  "id" | "bookingCode" | "status" | "createdAt"
>;

let pool: Pool | null = null;

function getPool() {
  if (!pool) {
    if (!process.env.DB_URL) throw new Error("DB_URL belum diset");
    pool = new Pool({ connectionString: process.env.DB_URL });
  }

  return pool;
}

export function createTripCode(packageSlug: string) {
  return `ST-${packageSlug.replace(/[^a-z0-9]/gi, "").slice(0, 6).toUpperCase()}`;
}

export async function ensureBookingSchema() {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      booking_code TEXT UNIQUE NOT NULL,
      package_slug TEXT NOT NULL,
      package_name TEXT NOT NULL,
      trip_code TEXT NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      adult_count INTEGER NOT NULL DEFAULT 0,
      child_count INTEGER NOT NULL DEFAULT 0,
      adult_price INTEGER NOT NULL DEFAULT 0,
      child_price INTEGER NOT NULL DEFAULT 0,
      total_amount INTEGER NOT NULL DEFAULT 0,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      country TEXT NOT NULL,
      payment_method TEXT NOT NULL DEFAULT 'bank_transfer',
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await getPool().query("ALTER TABLE bookings ADD COLUMN IF NOT EXISTS phone TEXT NOT NULL DEFAULT ''");
  await getPool().query("ALTER TABLE bookings ALTER COLUMN last_name SET DEFAULT ''");
  await getPool().query("ALTER TABLE bookings ADD COLUMN IF NOT EXISTS nasi_liwet_count INTEGER NOT NULL DEFAULT 0");
  await getPool().query("ALTER TABLE bookings ADD COLUMN IF NOT EXISTS nasi_liwet_price INTEGER NOT NULL DEFAULT 0");
  await getPool().query("ALTER TABLE bookings ADD COLUMN IF NOT EXISTS pickup_count INTEGER NOT NULL DEFAULT 0");
  await getPool().query("ALTER TABLE bookings ADD COLUMN IF NOT EXISTS pickup_price INTEGER NOT NULL DEFAULT 0");
}

function toWibDate(value: unknown): string {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) return String(value);
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Jakarta" }).format(d);
}

function rowToBooking(row: Record<string, unknown>): Booking {
  return {
    id: Number(row.id),
    bookingCode: String(row.booking_code),
    packageSlug: String(row.package_slug),
    packageName: String(row.package_name),
    tripCode: String(row.trip_code),
    startDate: toWibDate(row.start_date),
    endDate: toWibDate(row.end_date),
    adultCount: Number(row.adult_count),
    childCount: Number(row.child_count),
    adultPrice: Number(row.adult_price),
    childPrice: Number(row.child_price),
    nasiLiwetCount: Number(row.nasi_liwet_count ?? 0),
    nasiLiwetPrice: Number(row.nasi_liwet_price ?? 0),
    pickupCount: Number(row.pickup_count ?? 0),
    pickupPrice: Number(row.pickup_price ?? 0),
    totalAmount: Number(row.total_amount),
    firstName: String(row.first_name),
    lastName: String(row.last_name),
    email: String(row.email),
    phone: String(row.phone),
    address: String(row.address),
    city: String(row.city),
    country: String(row.country),
    paymentMethod: String(row.payment_method),
    status: String(row.status) as BookingStatus,
    createdAt: String(row.created_at),
  };
}

export async function createBooking(input: CreateBookingInput) {
  await ensureBookingSchema();
  const bookingCode = `STB-${Date.now().toString(36).toUpperCase()}`;

  const result = await getPool().query(
    `
      INSERT INTO bookings (
        booking_code, package_slug, package_name, trip_code, start_date, end_date,
        adult_count, child_count, adult_price, child_price,
        nasi_liwet_count, nasi_liwet_price, pickup_count, pickup_price,
        total_amount,
        first_name, last_name, email, phone, address, city, country, payment_method
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10,
        $11, $12, $13, $14,
        $15,
        $16, $17, $18, $19, $20, $21, $22, $23
      )
      RETURNING *
    `,
    [
      bookingCode,
      input.packageSlug,
      input.packageName,
      input.tripCode,
      input.startDate,
      input.endDate,
      input.adultCount,
      input.childCount,
      input.adultPrice,
      input.childPrice,
      input.nasiLiwetCount,
      input.nasiLiwetPrice,
      input.pickupCount,
      input.pickupPrice,
      input.totalAmount,
      input.firstName,
      input.lastName,
      input.email,
      input.phone,
      input.address,
      input.city,
      input.country,
      input.paymentMethod,
    ],
  );

  return rowToBooking(result.rows[0]);
}

export async function listBookings() {
  await ensureBookingSchema();
  const result = await getPool().query("SELECT * FROM bookings ORDER BY created_at DESC LIMIT 100");
  return result.rows.map(rowToBooking);
}
