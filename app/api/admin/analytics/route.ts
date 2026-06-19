import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getAnalyticsSummary, hasAnalyticsConfig, debugPrivateKey } from "@/lib/google-analytics";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const isDebug = searchParams.get("debug") === "1";

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
    const debug = isDebug ? debugPrivateKey() : undefined;
    return NextResponse.json({ setupRequired: false, error: message, debug }, { status: 500 });
  }
}
