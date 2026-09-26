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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center">
            <img
              src="/acepa-logo-white-transparent-tagline-brighter.png"
              alt="ACEPA — People, Opportunities, Progress"
              className="h-16 w-auto object-contain brightness-0"
            />
          </Link>
          <div className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/" className="font-bold text-slate-950 hover:text-purple-600">
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-10 lg:pt-10">
        <div className="relative h-[230px] overflow-hidden rounded-[30px] shadow-[0_24px_70px_rgba(15,23,42,0.14)] sm:h-[280px]">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=90"
            alt="People collaborating around opportunity in a modern workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-transparent" />
          <div className="relative flex h-full max-w-2xl items-end p-7 sm:p-10">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-white/75">YOUR NEXT STEP</p>
              <h1 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl">
                Start where your value meets opportunity.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                Create your ACEPA account and step into an ecosystem built around value, participation, and progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-start gap-12 px-6 py-10 lg:grid-cols-[1fr_520px] lg:px-10 lg:py-14">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.22em] text-purple-600">WELCOME TO ACEPA</p>
          <h2 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl">
            Your account opens the door.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Create your ACEPA account to discover opportunities, participate on your terms, track your progress, and access eligible ways to earn from the value you bring.
          </p>

          <div className="mt-9 grid max-w-xl gap-3 sm:grid-cols-3">
            {[
              ["01", "Discover", "Find opportunities that fit you."],
              ["02", "Participate", "Bring capital, ideas, skills, work, or business value."],
              ["03", "Progress", "Track outcomes, earnings, and growth where applicable."],
            ].map(([number, title, text]) => (
              <div key={number} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="text-xs font-bold text-purple-600">{number}</span>
                <h3 className="mt-4 text-sm font-bold">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-purple-100 bg-purple-50 px-5 py-4 text-sm leading-6 text-slate-600">
            Every opportunity can define its own requirements, terms, contribution, and applicable benefit. You choose what you want to participate in.
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
          <div className="relative h-36">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=90"
              alt="Professional workspace with people collaborating"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/35" />
            <div className="relative flex h-full items-end p-6">
              <p className="text-xs font-bold tracking-[0.2em] text-white">CREATE YOUR ACCOUNT</p>
            </div>
          </div>

          <div className="p-7 sm:p-9">
            <h2 className="text-3xl font-black tracking-[-0.04em]">Get started</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Set up your ACEPA account in a few simple steps.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label htmlFor="full-name" className="text-sm font-semibold text-slate-800">Full name</label>
                <input
                  id="full-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Your full name"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                />
              </div>

              <div>
                <label htmlFor="get-started-email" className="text-sm font-semibold text-slate-800">Email address</label>
                <input
                  id="get-started-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                />
              </div>

              <div>
                <label htmlFor="get-started-password" className="text-sm font-semibold text-slate-800">Password</label>
                <div className="relative mt-2">
                  <input
                    id="get-started-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="text-sm font-semibold text-slate-800">Confirm password</label>
                <div className="relative mt-2">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs leading-5 text-slate-500">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
                <span>
                  I agree to the ACEPA <Link href="/terms" className="font-semibold text-slate-800 hover:text-purple-600">Terms</Link> and <Link href="/privacy" className="font-semibold text-slate-800 hover:text-purple-600">Privacy Policy</Link>.
                </span>
              </label>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                  {error}
                </div>
              )}

              {message && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create my ACEPA account →"}
              </button>
            </form>

            <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">
              If email confirmation is enabled, you will need to confirm your email before signing in.
            </p>

            <div className="mt-5 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
              Already have an ACEPA account?{" "}
              <Link href="/" className="font-bold text-slate-950 hover:text-purple-600">Sign in</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
