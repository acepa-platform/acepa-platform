"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

const items = [
  { type: "Opportunity", title: "Solar Energy Expansion", detail: "Investment opportunity from SunGrid Energy Ltd.", href: "/discover" },
  { type: "Opportunity", title: "Smart Retail Innovation Challenge", detail: "Innovation opportunity from Nexa Retail Group.", href: "/discover" },
  { type: "Opportunity", title: "Product Launch Campaign", detail: "Marketing opportunity from Urbanova Consumer Brands.", href: "/discover" },
  { type: "Company", title: "Companies", detail: "Explore businesses and company opportunities across ACEPA.", href: "/companies" },
  { type: "Guide", title: "How It Works", detail: "Understand how discovery, participation, tracking, and progress work.", href: "/how-it-works" },
  { type: "Guide", title: "About ACEPA", detail: "Learn about People, Opportunities, Progress, and the ACEPA vision.", href: "/about" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");

  const results = useMemo(() => {
    const q = submitted.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => [item.type, item.title, item.detail].join(" ").toLowerCase().includes(q));
  }, [submitted]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(query);
  }

  const quickSearch = (value: string) => { setQuery(value); setSubmitted(value); };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8"><Link href="/" className="flex items-center"><img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA" className="h-16 w-auto object-contain brightness-0" /></Link><nav className="hidden items-center gap-8 lg:flex"><Link href="/" className="text-sm font-medium text-slate-700 hover:text-purple-600">Home</Link><Link href="/discover" className="text-sm font-medium text-slate-700 hover:text-purple-600">Discover</Link><Link href="/companies" className="text-sm font-medium text-slate-700 hover:text-purple-600">For Companies</Link><Link href="/how-it-works" className="text-sm font-medium text-slate-700 hover:text-purple-600">How It Works</Link><Link href="/about" className="text-sm font-medium text-slate-700 hover:text-purple-600">About Us</Link></nav><Link href="/get-started" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700">Get started</Link></div></header>

      <section className="bg-slate-950 px-6 py-20 text-white lg:px-8"><div className="mx-auto max-w-5xl"><p className="text-xs font-bold tracking-[0.22em] text-purple-300">SEARCH ACEPA</p><h1 className="mt-4 text-5xl font-bold tracking-[-0.05em] sm:text-6xl">Find what you are looking for.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Search opportunities, companies, and useful ACEPA information from one place.</p><form onSubmit={submit} className="mt-9 flex flex-col gap-3 sm:flex-row"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search opportunities, companies, guides..." aria-label="Search ACEPA" className="min-h-14 flex-1 rounded-2xl border border-white/15 bg-white px-5 text-slate-950 outline-none ring-purple-500 placeholder:text-slate-400 focus:ring-2" /><button type="submit" className="rounded-2xl bg-purple-600 px-7 py-4 font-semibold text-white hover:bg-purple-500">Search →</button></form><div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300"><span>Try:</span>{["Investment","Innovation","Careers"].map((value) => <button key={value} type="button" onClick={() => quickSearch(value)} className="rounded-full border border-white/15 px-3 py-1.5 hover:bg-white/10">{value}</button>)}</div></div></section>

      <section className="py-16"><div className="mx-auto max-w-5xl px-6 lg:px-8"><div className="flex items-end justify-between gap-5"><div><p className="text-xs font-bold tracking-[0.22em] text-purple-600">RESULTS</p><h2 className="mt-3 text-3xl font-bold">{submitted ? "Results for “" + submitted + "”" : "Explore ACEPA"}</h2></div><span className="text-sm text-slate-500">{results.length} result{results.length === 1 ? "" : "s"}</span></div>{results.length ? <div className="mt-8 grid gap-4 sm:grid-cols-2">{results.map((item) => <Link key={item.title} href={item.href} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-lg"><span className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">{item.type}</span><h3 className="mt-4 text-xl font-bold group-hover:text-purple-700">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p><span className="mt-5 inline-block text-sm font-semibold text-slate-900">Open →</span></Link>)}</div> : <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center"><h3 className="text-xl font-bold">No matching results yet.</h3><p className="mt-2 text-slate-600">Try a different search term or explore Discover.</p><Link href="/discover" className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Explore Discover →</Link></div>}</div></section>

      <footer className="border-t border-slate-200 bg-purple-50"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><Link href="/" className="font-bold tracking-[0.12em] text-slate-900">ACEPA</Link><div className="flex gap-6"><Link href="/discover">Discover</Link><Link href="/companies">For Companies</Link><Link href="/about">About Us</Link></div><p>PEOPLE • OPPORTUNITIES • PROGRESS</p></div></footer>
    </main>
  );
}