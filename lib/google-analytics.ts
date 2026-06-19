import { BetaAnalyticsDataClient } from "@google-analytics/data";

export type AnalyticsSummary = {
  activeUsers: number;
  totalUsers: number;
  newUsers: number;
  screenPageViews: number;
  sessions: number;
  engagementRate: number;
  avgSessionDuration: number;
  topPages: Array<{ path: string; title: string; views: number }>;
  trafficSources: Array<{ source: string; sessions: number }>;
  dailyTrend: Array<{ date: string; pageViews: number; sessions: number }>;
  devices: Array<{ device: string; sessions: number }>;
  countries: Array<{ country: string; sessions: number }>;
  newVsReturning: Array<{ type: string; sessions: number }>;
  browsers: Array<{ browser: string; sessions: number }>;
  cities: Array<{ city: string; sessions: number }>;
  landingPages: Array<{ path: string; sessions: number }>;
};

let analyticsClient: BetaAnalyticsDataClient | null = null;

function getPrivateKey() {
  let key = process.env.GOOGLE_PRIVATE_KEY;
  if (!key) return undefined;
  // Handle double-escaped (\\n) first, then single-escaped (\n)
  // Coolify stores the value with \\n (two backslashes + n) instead of \n
  key = key.replace(/\\\\n/g, "\n").replace(/\\n/g, "\n");
  // Extract just the PEM block — strips any surrounding quotes, backslashes,
  // or other garbage added by Coolify/Docker env var handling
  const start = key.indexOf("-----BEGIN");
  const end = key.lastIndexOf("-----") + 5;
  if (start !== -1 && end > start) {
    key = key.slice(start, end);
  }
  return key;
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

  const [
    [summary],
    [realtime],
    [topPages],
    [trafficSources],
    [dailyTrend],
    [devices],
    [countries],
    [newVsReturning],
    [browsers],
    [cities],
    [landingPages],
  ] = await Promise.all([
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [
        { name: "totalUsers" },
        { name: "newUsers" },
        { name: "screenPageViews" },
        { name: "sessions" },
        { name: "engagementRate" },
        { name: "averageSessionDuration" },
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
      limit: 8,
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 8,
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "country" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 6,
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "newVsReturning" }],
      metrics: [{ name: "sessions" }],
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "browser" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 6,
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "city" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 6,
    }),
    client.runReport({
      property,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "landingPage" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 8,
    }),
  ]);

  const summaryRow = summary.rows?.[0];
  const realtimeRow = realtime.rows?.[0];

  return {
    activeUsers: toNumber(realtimeRow?.metricValues?.[0]?.value),
    totalUsers: toNumber(summaryRow?.metricValues?.[0]?.value),
    newUsers: toNumber(summaryRow?.metricValues?.[1]?.value),
    screenPageViews: toNumber(summaryRow?.metricValues?.[2]?.value),
    sessions: toNumber(summaryRow?.metricValues?.[3]?.value),
    engagementRate: toNumber(summaryRow?.metricValues?.[4]?.value),
    avgSessionDuration: toNumber(summaryRow?.metricValues?.[5]?.value),
    topPages:
      topPages.rows?.map((row) => ({
        path: row.dimensionValues?.[0]?.value || "/",
        title: row.dimensionValues?.[1]?.value || "Tanpa judul",
        views: toNumber(row.metricValues?.[0]?.value),
      })) || [],
    trafficSources:
      trafficSources.rows?.map((row) => ({
        source: row.dimensionValues?.[0]?.value || "Tidak Ditetapkan",
        sessions: toNumber(row.metricValues?.[0]?.value),
      })) || [],
    dailyTrend:
      dailyTrend.rows?.map((row) => {
        const d = row.dimensionValues?.[0]?.value || "";
        return {
          date: `${d.slice(6, 8)}/${d.slice(4, 6)}`,
          pageViews: toNumber(row.metricValues?.[0]?.value),
          sessions: toNumber(row.metricValues?.[1]?.value),
        };
      }) || [],
    devices:
      devices.rows?.map((row) => ({
        device: row.dimensionValues?.[0]?.value || "tidak diketahui",
        sessions: toNumber(row.metricValues?.[0]?.value),
      })) || [],
    countries:
      countries.rows?.map((row) => ({
        country: row.dimensionValues?.[0]?.value || "Tidak Diketahui",
        sessions: toNumber(row.metricValues?.[0]?.value),
      })) || [],
    newVsReturning:
      newVsReturning.rows?.map((row) => ({
        type: row.dimensionValues?.[0]?.value || "tidak diketahui",
        sessions: toNumber(row.metricValues?.[0]?.value),
      })) || [],
    browsers:
      browsers.rows?.map((row) => ({
        browser: row.dimensionValues?.[0]?.value || "Tidak Diketahui",
        sessions: toNumber(row.metricValues?.[0]?.value),
      })) || [],
    cities:
      cities.rows?.map((row) => ({
        city: row.dimensionValues?.[0]?.value || "Tidak Diketahui",
        sessions: toNumber(row.metricValues?.[0]?.value),
      })) || [],
    landingPages:
      landingPages.rows?.map((row) => ({
        path: row.dimensionValues?.[0]?.value || "/",
        sessions: toNumber(row.metricValues?.[0]?.value),
      })) || [],
  };
}
