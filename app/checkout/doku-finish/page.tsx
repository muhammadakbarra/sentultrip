import { redirect } from "next/navigation";

export default async function DokuFinish({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const invoiceNumber = typeof params.inv === "string" ? params.inv : "";
  const cancelled = params.cancelled === "1";

  // This page only decides which thank-you screen to show — it never marks a
  // booking as paid. The webhook is the sole source of truth for booking status.
  if (invoiceNumber && !cancelled) {
    redirect(`/checkout?success=${invoiceNumber}&payment=doku`);
  }

  redirect("/");
}
