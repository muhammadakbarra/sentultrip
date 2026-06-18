"use server";

import { redirect } from "next/navigation";
import { clearAdminSession, setAdminSession, validateAdminLogin } from "@/lib/admin-auth";

export type LoginState = {
  error?: string;
};

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (!username || !password) {
    return { error: "Username dan password wajib diisi." };
  }

  const user = await validateAdminLogin(username, password);
  if (!user) {
    return { error: "Username atau password salah." };
  }

  await setAdminSession(user);
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
