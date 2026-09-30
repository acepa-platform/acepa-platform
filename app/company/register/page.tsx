"use client";

import Link from "next/link";
import { useState } from "react";

const steps = ["Company details", "Password", "Admin access", "Authorized representative"];

export default function CompanyRegistrationPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center">
            <img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA" className="h-11 w-auto object-contain brightness-0" />
          </Link>
          <Link href="/company" className="text-sm font-bold text-slate-600 hover:text-slate-950">Back to Companies</Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-purple-600">Company registration</p>
          <h1 className="mt-2 text-3xl font-black tracking-[-.04em] sm:text-4xl">Create your company on ACEPA.</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Start with only the essential information. You can complete verification and your full company profile after you sign in.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-8 grid grid-cols-4 gap-2">
            {steps.map((label, index) => (
              <div key={label}>
                <div className={`h-1.5 rounded-full ${index <= step ? "bg-purple-600" : "bg-slate-200"}`} />
                <p className={`mt-2 text-[10px] font-bold ${index <= step ? "text-slate-900" : "text-slate-400"}`}>{label}</p>
              </div>
            ))}
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-purple-50 p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-xl font-black text-white">✓</div>
              <h2 className="mt-4 text-2xl font-black">Company registration prepared</h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
                The company account flow is ready for connection to ACEPA's production company authentication and database. After registration, the authorized team will sign in and complete verification, profile setup and the remaining business requirements.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/company/workspace" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">Open workspace demo</Link>
                <Link href="/company" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">Back to companies</Link>
              </div>
            </div>
          ) : (
            <>
              {step === 0 && (
                <div className="space-y-5">
                  <div><label className="text-sm font-bold">Company name</label><input placeholder="e.g. SunGrid Energy Ltd." className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" /></div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div><label className="text-sm font-bold">Business type</label><select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"><option>Select business type</option><option>Limited company</option><option>Partnership</option><option>Sole proprietorship</option><option>Other</option></select></div>
                    <div><label className="text-sm font-bold">Industry</label><input placeholder="e.g. Energy & Infrastructure" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" /></div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div><label className="text-sm font-bold">Country</label><input placeholder="e.g. Nigeria" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" /></div>
                    <div><label className="text-sm font-bold">Business address</label><input placeholder="Company address" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" /></div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div><label className="text-sm font-bold">Company password</label><input type="password" placeholder="Create a secure password" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm font-bold">Confirm password</label><input type="password" placeholder="Enter the password again" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" /></div>
                  <p className="rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">Use a strong password. In the production version, this will be securely handled by ACEPA authentication rather than stored in the browser.</p>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div><label className="text-sm font-bold">How many administrators should have access?</label><select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"><option>1 administrator</option><option>2 administrators</option><option>3 administrators</option><option>4 administrators</option><option>5 administrators</option><option>More than 5</option></select></div>
                  <p className="rounded-xl bg-purple-50 p-4 text-xs leading-5 text-purple-800">You can decide who receives company-dashboard access. Each administrator will have permissions controlled by their company role.</p>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div><label className="text-sm font-bold">Authorized representative name</label><input placeholder="Full name" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm font-bold">Representative email</label><input type="email" placeholder="name@company.com" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" /></div>
                  <div><label className="text-sm font-bold">Representative role</label><input placeholder="e.g. Director, Founder, CEO" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" /></div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Back</button>
                <button onClick={next} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700">{step === steps.length - 1 ? "Create company account" : "Continue"}</button>
              </div>
            </>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">Already have a company account? <Link href="/sign-in" className="font-bold text-purple-700">Sign in</Link></p>
      </div>
    </main>
  );
}
