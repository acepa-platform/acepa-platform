"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center"><img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA — People, Opportunities, Progress" className="h-14 w-auto object-contain brightness-0" /></Link>
          <Link href="/get-started" className="text-sm font-semibold text-slate-700 transition hover:text-purple-600">Create account →</Link>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[1fr_480px] lg:px-10 lg:py-16">
        <div className="relative hidden min-h-[620px] overflow-hidden rounded-[2rem] lg:block">
          <img src="https://images.unsplash.com/photo-1635766854982-fc151c6e9278?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=85&w=1600" alt="Professional using a laptop in a modern workspace" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 xl:p-10">
            <p className="text-xs font-bold tracking-[0.22em] text-white/75">WELCOME BACK</p>
            <h1 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-[-0.05em] text-white xl:text-5xl">Continue where opportunity meets progress.</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/80">Sign in to discover opportunities, manage your participation, track progress, and access the value you have created across ACEPA.</p>
            <div className="mt-7 flex flex-wrap gap-2">{["Discover", "Participate", "Track"].map((item) => <span key={item} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">{item}</span>)}</div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-9">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-purple-600">ACEPA ACCOUNT</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">Sign in</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Access your ACEPA account and continue your journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-slate-800">Email address</label>
              <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10" />
            </div>

            <div>
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="password" className="text-sm font-semibold text-slate-800">Password</label>
                <Link href="/forgot-password" className="text-xs font-semibold text-purple-600 hover:text-purple-700">Forgot password?</Link>
              </div>
              <div className="relative mt-2">
                <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900">{showPassword ? "Hide" : "Show"}</button>
              </div>
            </div>

            {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">{error}</div>}
            {message && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">{message}</div>}

            <button type="submit" disabled={loading} className="w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Signing in..." : "Sign in →"}</button>
          </form>

          <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">Don’t have an ACEPA account? <Link href="/get-started" className="font-bold text-slate-950 hover:text-purple-600">Get started</Link></div>
        </div>
      </section>
    </main>
  );
}
