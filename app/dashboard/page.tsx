"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const mobileNavItems = [
  { label: "Home", href: "/dashboard", icon: "⌂" },
  { label: "Discover", href: "/discover", icon: "◈" },
  { label: "Feed", href: "#", icon: "◉" },
  { label: "Opportunities", href: "#", icon: "✦" },
  { label: "Wallet", href: "#", icon: "▣" },
  { label: "Activity", href: "#", icon: "◷" },
  { label: "Profile", href: "/profile", icon: "○" },
];

const desktopNavSections = [
  {
    title: "Main",
    items: [
      { label: "Home", href: "/dashboard", icon: "⌂" },
      { label: "Discover", href: "/discover", icon: "◈" },
      { label: "Feed", href: "#", icon: "◉" },
      { label: "Opportunities", href: "#", icon: "✦" },
    ],
  },
  {
    title: "My ACEPA",
    items: [
      { label: "My Activity", href: "#", icon: "◷" },
      { label: "My Wallet", href: "#", icon: "▣" },
      { label: "My Investments", href: "#", icon: "$" },
      { label: "My Earnings", href: "#", icon: "↗" },
      { label: "Saved", href: "#", icon: "♡" },
      { label: "Watchlist", href: "#", icon: "◉" },
      { label: "Upcoming Projects", href: "#", icon: "◫" },
    ],
  },
  {
    title: "Explore",
    items: [
      { label: "Investments", href: "#", icon: "$" },
      { label: "Campaigns", href: "#", icon: "✦" },
      { label: "Innovations", href: "#", icon: "✧" },
      { label: "Collaborations", href: "#", icon: "∞" },
      { label: "Careers & Jobs", href: "#", icon: "▤" },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Business Hub", href: "#", icon: "⌂" },
      { label: "Proposal Hub", href: "#", icon: "◇" },
    ],
  },
  {
    title: "Tools & Learning",
    items: [
      { label: "AI Assistant", href: "#", icon: "✦" },
      { label: "Learning Center", href: "#", icon: "▥" },
    ],
  },
  {
    title: "Account & Support",
    items: [
      { label: "Profile", href: "/profile", icon: "○" },
      { label: "Notifications", href: "#", icon: "♢" },
      { label: "Settings", href: "/settings", icon: "⚙" },
      { label: "Support", href: "#", icon: "?" },
    ],
  },
];

const opportunityCards = [
  { type: "Investment", title: "Solar Energy Expansion", company: "SunGrid Energy Ltd.", location: "Lagos", amount: "$5,000,000", detail: "Scale clean energy infrastructure across underserved communities." },
  { type: "Innovation", title: "Smart Retail Innovation Challenge", company: "Nexa Retail Group", location: "Abuja", amount: "$250,000", detail: "Build practical technology that improves the retail experience." },
  { type: "Marketing", title: "Product Launch Campaign", company: "Urbanova Consumer Brands", location: "Port Harcourt", amount: "$75,000", detail: "Help take a new consumer product to its next market." },
];

export default function DashboardPage() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/");
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <aside className={`fixed inset-y-0 left-0 z-40 hidden border-r border-slate-200 bg-white lg:flex lg:flex-col transition-all duration-300 ${desktopSidebarOpen ? "w-64" : "w-20"}`}>
        <div className={`flex h-20 items-center border-b border-slate-100 ${desktopSidebarOpen ? "justify-between px-5" : "justify-center px-3"}`}><Link href="/dashboard" className="flex min-w-0 items-center"><img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA — People, Opportunities, Progress" className={`object-contain brightness-0 dark:brightness-100 ${desktopSidebarOpen ? "h-12 w-auto" : "h-9 w-9"}`} /></Link><button onClick={() => setDesktopSidebarOpen((open) => !open)} aria-label={desktopSidebarOpen ? "Collapse sidebar" : "Expand sidebar"} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-950">{desktopSidebarOpen ? "‹" : "›"}</button></div>
        <div className={`flex-1 overflow-y-auto py-6 ${desktopSidebarOpen ? "px-4" : "px-2"}`}><nav className="space-y-7">{desktopNavSections.map((section, sectionIndex) => <div key={section.title}><p className={`text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ${desktopSidebarOpen ? "px-3" : "sr-only"}`}>{section.title}</p><div className={`mt-3 space-y-1 ${desktopSidebarOpen ? "" : "mt-0"}`}>{section.items.map((item, itemIndex) => <Link key={item.label} href={item.href} title={!desktopSidebarOpen ? item.label : undefined} className={`flex items-center rounded-xl py-2.5 text-sm font-semibold transition ${desktopSidebarOpen ? "gap-3 px-3" : "justify-center px-2"} ${sectionIndex === 0 && itemIndex === 0 ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-base">{item.icon}</span>{desktopSidebarOpen && <span className="truncate">{item.label}</span>}</Link>)}</div></div>)}</nav></div>
        {desktopSidebarOpen && <div className="mt-auto p-4"><div className="rounded-2xl bg-slate-950 p-5 text-white"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">Your ACEPA journey</p><p className="mt-3 text-sm font-semibold leading-6">Discover opportunities and turn participation into progress.</p><Link href="/discover" className="mt-4 inline-flex rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-purple-50">Explore now →</Link></div></div>}
      </aside>
      {mobileOpen && <div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Close menu" className="absolute inset-0 bg-slate-950/40" onClick={() => setMobileOpen(false)} /><aside className="relative flex h-full w-72 flex-col bg-white shadow-2xl"><div className="flex h-20 items-center justify-between border-b border-slate-100 px-6"><Link href="/dashboard" className="flex items-center"><img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA — People, Opportunities, Progress" className="h-12 w-auto object-contain brightness-0 dark:brightness-100" /></Link><button onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-bold text-slate-500">Close</button></div><nav className="space-y-1 p-4">{mobileNavItems.map((item, index) => <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${index === 0 ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-50"}`}><span className="w-7 text-center">{item.icon}</span>{item.label}</Link>)}</nav><div className="mt-auto p-4"><button onClick={handleSignOut} disabled={signingOut} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-60">{signingOut ? "Signing out..." : "Sign out"}</button></div></aside></div>}
      <div className={`transition-all duration-300 ${desktopSidebarOpen ? "lg:pl-64" : "lg:pl-20"}`}>
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"><div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10"><button onClick={() => setMobileOpen(true)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold lg:hidden" aria-label="Open menu">☰</button><div className="hidden lg:block"><p className="text-xs font-semibold text-slate-400">ACEPA WORKSPACE</p><p className="mt-1 text-black text-sm font-bold">Personal dashboard</p></div><div className="flex items-center gap-3"><button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-200"><span className="text-lg">♢</span><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-purple-600" /></button><Link href="/profile" className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:text-purple-600 sm:block">Profile</Link><button onClick={handleSignOut} disabled={signingOut} className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 pr-3 disabled:opacity-60"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-white">K</span><span className="hidden text-sm font-bold text-slate-700 sm:block">{signingOut ? "Signing out..." : "Sign out"}</span></button></div></div></header>
        <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-xl"><div className="grid min-h-[430px] lg:grid-cols-[1.15fr_0.85fr]"><div className="relative z-10 flex items-center p-7 sm:p-9 lg:p-11"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-purple-300">Welcome to ACEPA</p><h1 className="mt-4 text-3xl font-black tracking-[-0.05em] sm:text-4xl lg:text-5xl">Create value. Find opportunity. Make progress.</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">Your personal space for discovering opportunities, participating in meaningful projects, tracking your activities, and building your progress across ACEPA.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/discover" className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-purple-50">Discover opportunities →</Link><Link href="#opportunities" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">View recommendations</Link></div></div></div><div className="relative min-h-[260px] lg:min-h-0"><img src="/acepa-hero-3.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/45 to-transparent lg:from-slate-950 lg:via-slate-950/15 lg:to-transparent" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-slate-950/10" /></div></div></section>
          <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[["Portfolio", "$0.00", "Your active investment value"],["Opportunities", "0", "Active participations"],["Earnings", "$0.00", "Earnings through ACEPA"],["Activity", "0", "Items requiring attention"]].map(([label, value, description]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p><p className="mt-3 text-3xl font-black tracking-[-0.04em]">{value}</p><p className="mt-2 text-xs leading-5 text-slate-500">{description}</p></div>)}</section>
          <section className="mt-10 grid gap-7 xl:grid-cols-[1.5fr_0.75fr]"><div id="opportunities" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">For you</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Recommended opportunities</h2><p className="mt-2 text-sm text-slate-500">Explore ways to invest, create, collaborate, contribute, and earn.</p></div><Link href="/discover" className="hidden text-sm font-bold text-slate-700 hover:text-purple-600 sm:block">See all →</Link></div><div className="mt-6 grid gap-4">{opportunityCards.map((card) => <article key={card.title} className="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"><div className="flex flex-wrap items-start justify-between gap-4"><div><span className="inline-flex rounded-full bg-purple-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-purple-700">{card.type}</span><h3 className="mt-3 text-lg font-black tracking-[-0.025em]">{card.title}</h3><p className="mt-1 text-sm font-semibold text-slate-600">{card.company}</p></div><p className="text-sm font-black">{card.amount}</p></div><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">{card.detail}</p><div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-400"><span>{card.location}</span><button className="font-bold text-slate-800 transition group-hover:text-purple-600">Explore opportunity →</button></div></article>)}</div></div>
            <div className="space-y-7"><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Your journey</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">From discovery to progress</h2><div className="mt-6 space-y-4">{[["01","Discover","Find opportunities that match your interests."],["02","Participate","Invest, contribute, collaborate, create or work."],["03","Track","Follow activity, milestones and updates."],["04","Progress","Complete opportunities and build your record."]].map(([number,title,description]) => <div key={number} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-black text-slate-500">{number}</span><div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div></div>)}</div></div><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Recent activity</p><div className="mt-5 rounded-2xl bg-slate-50 p-5 text-center"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg shadow-sm">◷</div><p className="mt-3 text-sm font-bold">Your activity will appear here</p><p className="mt-1 text-xs leading-5 text-slate-500">Once you participate in opportunities, your latest actions and updates will be shown here.</p></div></div></div>
          </section>
          <section className="mt-7 rounded-3xl border border-purple-100 bg-purple-50/60 p-6 sm:p-7"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Keep exploring</p><h2 className="mt-2 text-xl font-black tracking-[-0.03em]">There is more to discover on ACEPA.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Browse investment, innovation, marketing, business, collaboration, expert and career opportunities.</p></div><Link href="/discover" className="shrink-0 rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-purple-700">Explore Discover →</Link></div></section>
        </div>
      </div>
    </main>
  );
}
