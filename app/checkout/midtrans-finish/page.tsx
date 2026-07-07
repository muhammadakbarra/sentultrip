import { redirect } from "next/navigation";

export default async function MidtransFinish({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const orderId = typeof params.order_id === "string" ? params.order_id : "";
  const transactionStatus = typeof params.transaction_status === "string" ? params.transaction_status : "";

  const isSuccess =
    transactionStatus === "settlement" ||
    transactionStatus === "capture" ||
    transactionStatus === "pending";

  if (orderId && isSuccess) {
    redirect(`/checkout?success=${orderId}&payment=midtrans`);
  }

  redirect("/");
}
