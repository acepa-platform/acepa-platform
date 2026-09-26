"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage("If an account exists for that email, a password reset link has been sent.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="text-xl font-black tracking-[-0.05em]">ACEPA</Link>
          <Link href="/get-started" className="text-sm font-semibold text-slate-700 transition hover:text-purple-600">
            Create account →
          </Link>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-81px)] max-w-2xl items-center px-6 py-12 lg:px-10">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-10">
          <p className="text-xs font-bold tracking-[0.2em] text-purple-600">ACCOUNT RECOVERY</p>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Reset your password</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Enter your email and we’ll send you a secure link to create a new password.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="reset-email" className="text-sm font-semibold text-slate-800">Email address</label>
              <input
                id="reset-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">{error}</div>
            )}
            {message && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">{message}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending link..." : "Send reset link →"}
            </button>
          </form>

          <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
            Remember your password?{" "}
            <Link href="/sign-in" className="font-bold text-slate-950 hover:text-purple-600">Back to sign in</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
