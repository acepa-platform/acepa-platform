"use client";
import { useState } from "react";
import UserAccountShell from "@/components/user-account-shell";
export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const code = "ACEPA-REFERRAL";
  async function copy() { await navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }
  return <UserAccountShell><main className="min-h-screen bg-[#f7f8fc] p-5 sm:p-8"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">My ACEPA</p><h1 className="mt-2 text-3xl font-black">Referrals</h1><p className="mt-2 text-sm text-slate-500">Track direct referrals, qualified activity, earnings and milestone rewards.</p>
  <div className="mt-7 grid gap-4 md:grid-cols-3">{[["Direct referrals","0"],["Qualified referrals","0"],["Referral earnings","$0.00"]].map(([t,v]) => <div key={t} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{t}</p><p className="mt-2 text-2xl font-black">{v}</p></div>)}</div>
  <section className="mt-6 rounded-3xl bg-slate-950 p-7 text-white"><p className="text-xs font-bold uppercase tracking-wider text-white/45">Your referral code</p><p className="mt-2 font-mono text-2xl font-black">{code}</p><p className="mt-2 text-sm text-white/60">Share your referral and earn when direct referrals create qualifying ACEPA activity.</p><button onClick={copy} className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950">{copied ? "Copied" : "Copy referral code"}</button></section>
  <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7"><p className="text-lg font-black">Progress & rewards</p><div className="mt-5 grid gap-4 sm:grid-cols-3">{["Performance levels","Milestone rewards","Reward history"].map(x => <div key={x} className="rounded-2xl border border-slate-200 p-5"><p className="font-bold">{x}</p><p className="mt-2 text-sm text-slate-500">Your qualifying referral data and rewards will appear here.</p></div>)}</div></section>
  </div></main></UserAccountShell>;
}