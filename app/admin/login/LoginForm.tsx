"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-8">
      {state.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {state.error}
        </div>
      ) : null}

      <div className="space-y-6">
        <label className="block">
          <span className="mb-3 block text-sm font-bold text-slate-700">Username</span>
          <input
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Masukkan username"
            className="block h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
            required
          />
        </label>

        <label className="block">
          <span className="mb-3 block text-sm font-bold text-slate-700">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Masukkan password"
            className="block h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="h-14 w-full rounded-2xl bg-green-700 px-6 text-base font-black text-white shadow-[0_14px_28px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-green-800 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70"
      >
        {pending ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
