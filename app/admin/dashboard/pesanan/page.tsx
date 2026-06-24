import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { getAdminSession } from "@/lib/admin-auth";

export default async function AdminDashboardPesananPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return <AdminDashboard username={session.username} initialMenu="pesanan" />;
}
