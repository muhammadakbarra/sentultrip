import { BetaAnalyticsDataClient } from "@google-analytics/data";

export type AnalyticsSummary = {
  activeUsers: number;
  totalUsers: number;
  screenPageViews: number;
  sessions: number;
  topPages: Array<{
    path: string;
    title: string;
    views: number;
  }>;
  trafficSources: Array<{
    source: string;
    sessions: number;
  }>;
};

let analyticsClient: BetaAnalyticsDataClient | null = null;

function getPrivateKey() {
  let key = process.env.GOOGLE_PRIVATE_KEY;
  if (!key) return undefined;
  // Convert escaped newlines to real newlines first
  key = key.replace(/\\n/g, "\n");
  // Extract just the PEM block — strips any surrounding quotes, backslashes,
  // or other garbage added by Coolify/Docker env var handling
  const start = key.indexOf("-----BEGIN");
  const end = key.lastIndexOf("-----") + 5;
  if (start !== -1 && end > start) {
    key = key.slice(start, end);
  }
  return key;
}

export function debugPrivateKey() {
  const raw = process.env.GOOGLE_PRIVATE_KEY ?? "";
  const processed = getPrivateKey() ?? "";
  return {
    rawLength: raw.length,
    rawFirstChars: raw.slice(0, 30),
    rawLastChars: raw.slice(-20),
    processedLength: processed.length,
    processedFirstChars: processed.slice(0, 40),
    startsWithHeader: processed.startsWith("-----BEGIN PRIVATE KEY-----"),
    endsWithFooter: processed.trimEnd().endsWith("-----END PRIVATE KEY-----"),
    newlineCount: (processed.match(/\n/g) ?? []).length,
    hasEscapedNewlines: raw.includes("\\n"),
  };
}

function getAnalyticsClient() {
  if (!analyticsClient) {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = getPrivateKey();

    if (!clientEmail || !privateKey) {
      throw new Error("Google Analytics credential belum lengkap.");
    }

    analyticsClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    });
  }

  return analyticsClient;
}

export function hasAnalyticsConfig() {
  return Boolean(
    process.env.GA_PROPERTY_ID && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY,
  );
}

function toNumber(value?: string | null) {
  return Number(value || 0);
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const propertyId = process.env.GA_PROPERTY_ID;
  if (!propertyId) {
    throw new Error("GA_PROPERTY_ID belum diset.");
  }

  const client = getAnalyticsClient();
  const property = `properties/${propertyId}`;

  const [[summary], [realtime], [topPages], [trafficSources]] = await Promise.all([
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [
        { name: "totalUsers" },
        { name: "screenPageViews" },
        { name: "sessions" },
      ],
    }),
    client.runRealtimeReport({
      property,
      metrics: [{ name: "activeUsers" }],
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 6,
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 6,
    }),
  ]);

  const summaryRow = summary.rows?.[0];
  const realtimeRow = realtime.rows?.[0];

  return {
    activeUsers: toNumber(realtimeRow?.metricValues?.[0]?.value),
    totalUsers: toNumber(summaryRow?.metricValues?.[0]?.value),
    screenPageViews: toNumber(summaryRow?.metricValues?.[1]?.value),
    sessions: toNumber(summaryRow?.metricValues?.[2]?.value),
    topPages:
      topPages.rows?.map((row) => ({
        path: row.dimensionValues?.[0]?.value || "/",
        title: row.dimensionValues?.[1]?.value || "Tanpa judul",
        views: toNumber(row.metricValues?.[0]?.value),
      })) || [],
    trafficSources:
      trafficSources.rows?.map((row) => ({
        source: row.dimensionValues?.[0]?.value || "Unassigned",
        sessions: toNumber(row.metricValues?.[0]?.value),
      })) || [],
  };
}
