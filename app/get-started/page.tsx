"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function GetStartedPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Your password must be at least 6 characters.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please agree to the ACEPA Terms and Privacy Policy to continue.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      setMessage("Your ACEPA account has been created successfully.");
    } else {
      setMessage("Your account has been created. Check your email to confirm your address before signing in.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="flex items-center">
            <img
              src="/acepa-logo-white-transparent-tagline-brighter.png"
              alt="ACEPA — People, Opportunities, Progress"
              className="h-14 w-auto object-contain brightness-0"
            />
          </Link>
          <div className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-bold text-slate-950 hover:text-purple-600">
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)] lg:min-h-[calc(100vh-150px)] lg:grid-cols-2">
          <div className="relative min-h-[620px] overflow-hidden lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=90"
              alt="People collaborating around opportunity in a modern workspace"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/45 to-slate-950/90" />
            <div className="relative flex h-full flex-col justify-between p-7 text-white sm:p-10 lg:p-12">
              <div className="max-w-xl">
                <p className="text-xs font-bold tracking-[0.22em] text-white/75">YOUR NEXT STEP</p>
                <h1 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl">
                  Start where your value meets opportunity.
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                  Create your ACEPA account and step into an ecosystem built around value, participation, and progress.
                </p>
              </div>

              <div className="mt-12 max-w-xl">
                <p className="text-xs font-bold tracking-[0.22em] text-purple-200">WELCOME TO ACEPA</p>
                <h2 className="mt-4 text-3xl font-black leading-[1] tracking-[-0.05em] sm:text-4xl">
                  Your account opens the door.
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
                  Create your ACEPA account to discover opportunities, participate on your terms, track your progress, and access eligible ways to earn from the value you bring.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[
                    ["01", "Discover", "Find opportunities that fit you."],
                    ["02", "Participate", "Bring capital, ideas, skills, work, or business value."],
                    ["03", "Progress", "Track outcomes, earnings, and growth where applicable."],
                  ].map(([number, title, text]) => (
                    <div key={number} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                      <span className="text-xs font-bold text-purple-200">{number}</span>
                      <h3 className="mt-3 text-sm font-bold">{title}</h3>
                      <p className="mt-2 text-[11px] leading-5 text-white/65">{text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-xs leading-6 text-white/70 backdrop-blur-md sm:text-sm">
                  Every opportunity can define its own requirements, terms, contribution, and applicable benefit. You choose what you want to participate in.
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-xl rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10 lg:mx-auto lg:pt-8">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-purple-600">CREATE YOUR ACCOUNT</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Get started</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Set up your ACEPA account in a few simple steps.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div>
                  <label htmlFor="full-name" className="text-sm font-semibold text-slate-800">Full name</label>
                  <input id="full-name" type="text" autoComplete="name" required value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Your full name" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10" />
                </div>

                <div>
                  <label htmlFor="get-started-email" className="text-sm font-semibold text-slate-800">Email address</label>
                  <input id="get-started-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10" />
                </div>

                <div>
                  <label htmlFor="get-started-password" className="text-sm font-semibold text-slate-800">Password</label>
                  <div className="relative mt-2">
                    <input id="get-started-password" type={showPassword ? "text" : "password"} autoComplete="new-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create a password" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10" />
                    <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900">{showPassword ? "Hide" : "Show"}</button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="text-sm font-semibold text-slate-800">Confirm password</label>
                  <div className="relative mt-2">
                    <input id="confirm-password" type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Re-enter your password" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10" />
                    <button type="button" onClick={() => setShowConfirmPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900">{showConfirmPassword ? "Hide" : "Show"}</button>
                  </div>
                </div>

                <label className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs leading-5 text-slate-500">
                  <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                  <span>
                    I agree to the ACEPA <Link href="/terms" className="font-semibold text-slate-800 hover:text-purple-600">Terms</Link> and <Link href="/privacy" className="font-semibold text-slate-800 hover:text-purple-600">Privacy Policy</Link>.
                  </span>
                </label>

                {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">{error}</div>}
                {message && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">{message}</div>}

                <button type="submit" disabled={loading} className="w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60">
                  {loading ? "Creating account..." : "Create my ACEPA account →"}
                </button>
              </form>

              <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">
                If email confirmation is enabled, you will need to confirm your email before signing in.
              </p>

              <div className="mt-5 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
                Already have an ACEPA account?{" "}
                <Link href="/sign-in" className="font-bold text-slate-950 hover:text-purple-600">Sign in</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
