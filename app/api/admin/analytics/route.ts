import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getAnalyticsSummary, hasAnalyticsConfig } from "@/lib/google-analytics";

const getCachedAnalytics = unstable_cache(
  getAnalyticsSummary,
  ["ga-analytics-summary"],
  { revalidate: 300 }, // cache 5 menit — 11 GA4 queries hanya fire sekali per 5 menit
);

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  if (!hasAnalyticsConfig()) {
    return NextResponse.json(
      {
        setupRequired: true,
        error:
          "Google Analytics credential belum lengkap. Set GA_PROPERTY_ID, GOOGLE_CLIENT_EMAIL, dan GOOGLE_PRIVATE_KEY.",
      },
      { status: 200 },
    );
  }

  try {
    const summary = await getCachedAnalytics();
    return NextResponse.json({ setupRequired: false, summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal mengambil data analytics.";
    return NextResponse.json({ setupRequired: false, error: message }, { status: 500 });
  }
}
