import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin/dashboard");

  return (
    <main className="min-h-screen bg-[#f4f7f5] px-6 py-12 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-lg items-center justify-center">
        <section className="w-full rounded-[36px] border border-slate-200 bg-white p-10 shadow-[0_24px_80px_rgba(15,23,42,0.10)] sm:p-12">
          <div className="mb-12 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-green-700 text-3xl font-black text-white shadow-[0_16px_32px_rgba(21,128,61,0.22)]">
              ST
            </div>
            <h1 className="mt-7 text-3xl font-black tracking-[-0.04em] text-slate-950">
              Admin Login
            </h1>
          </div>

          <LoginForm />
        </section>
      </div>
    </main>
  );
}
