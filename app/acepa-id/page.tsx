"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import UserAccountShell from "@/components/user-account-shell";

export default function AcepaIdPage() {
  const [id, setId] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => { (async () => { const { data: { user } } = await createClient().auth.getUser(); if (user) setId("ACEPA-" + user.id.replace(/-/g, "").slice(0, 12).toUpperCase()); })(); }, []);
  async function copy() { if (!id) return; await navigator.clipboard?.writeText(id); setCopied(true); setTimeout(() => setCopied(false), 1800); }
  async function share() { if (!id) return; if (navigator.share) await navigator.share({ title: "My ACEPA ID", text: "My ACEPA ID is " + id }); else copy(); }
  return <UserAccountShell><main className="min-h-screen bg-[#f7f8fc] p-5 text-slate-950 sm:p-8"><div className="mx-auto max-w-5xl">
    <Link href="/profile" className="text-sm font-bold text-purple-600">← Back to Profile</Link>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <section className="rounded-3xl bg-slate-950 p-7 text-white shadow-sm sm:p-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-purple-300">Your ACEPA identity</p><h1 className="mt-3 text-3xl font-black sm:text-4xl">ACEPA ID</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/65">Your unique identity reference inside ACEPA. Use it when you need to identify your account, receive transfers, referrals or support.</p>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-xs font-bold uppercase tracking-wider text-white/45">Your ID</p><p className="mt-2 break-all font-mono text-2xl font-black tracking-wider">{id || "Loading…"}</p></div>
      <div className="mt-5 flex flex-wrap gap-3"><button onClick={copy} className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950">{copied ? "Copied" : "Copy ID"}</button><button onClick={share} className="rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white">Share ID</button></div></section>
      <section className="rounded-3xl border border-slate-200 bg-white p-7"><p className="text-lg font-black">What your ACEPA ID is for</p><div className="mt-5 space-y-4">{["Identifying your ACEPA account","Receiving or sending ACEPA transfers","Referral attribution","Support and dispute references","Future ACEPA services and verification"].map((x, i) => <div key={x} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-50 text-xs font-black text-purple-700">{i + 1}</span><p className="text-sm leading-6 text-slate-600">{x}</p></div>)}</div><div className="mt-7 rounded-2xl bg-purple-50 p-4"><p className="text-sm font-bold text-purple-800">Keep your ACEPA ID private when you are not sure who is requesting it.</p></div></section>
    </div>
  </div></main></UserAccountShell>;
}