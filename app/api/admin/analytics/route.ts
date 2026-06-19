import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getAnalyticsSummary, hasAnalyticsConfig } from "@/lib/google-analytics";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    const summary = await getAnalyticsSummary();
    return NextResponse.json({ setupRequired: false, summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal mengambil data analytics.";
    return NextResponse.json({ setupRequired: false, error: message }, { status: 500 });
  }
}
