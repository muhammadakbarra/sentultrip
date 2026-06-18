"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="admin-login-form">
      {state.error ? <div className="admin-login-error">{state.error}</div> : null}

      <div className="admin-login-fields">
        <label className="admin-login-label">
          Username
          <input
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Masukkan username"
            className="admin-login-input"
            required
          />
        </label>

        <label className="admin-login-label">
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Masukkan password"
            className="admin-login-input"
            required
          />
        </label>
      </div>

      <button type="submit" disabled={pending} className="admin-login-button">
        {pending ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
