"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { UserAccountActions } from "@/components/user-account-top-nav";

const mobileNavItems = [
  { label: "Home", href: "/dashboard", icon: "home" },
  { label: "Discover", href: "/discover", icon: "discover" },
  { label: "Feed", href: "#", icon: "feed" },
  { label: "Opportunities", href: "#", icon: "spark" },
  { label: "Wallet", href: "#", icon: "wallet" },
  { label: "Activity", href: "#", icon: "activity" },
  { label: "Profile", href: "/profile", icon: "profile" },
];

const desktopNavSections = [
  {
    title: "Main",
    items: [
      { label: "Home", href: "/dashboard", icon: "home" },
      { label: "Discover", href: "/discover", icon: "discover" },
      { label: "Feed", href: "#", icon: "feed" },
      { label: "Opportunities", href: "#", icon: "spark" },
    ],
  },
  {
    title: "My ACEPA",
    items: [
      { label: "My Activity", href: "#", icon: "activity" },
      { label: "My Wallet", href: "#", icon: "wallet" },
      { label: "My Investments", href: "#", icon: "investment" },
      { label: "My Earnings", href: "#", icon: "earnings" },
      { label: "Saved", href: "#", icon: "saved" },
      { label: "Watchlist", href: "#", icon: "feed" },
      { label: "Upcoming Projects", href: "#", icon: "projects" },
    ],
  },
  {
    title: "Explore",
    items: [
      { label: "Investments", href: "#", icon: "investment" },
      { label: "Campaigns", href: "#", icon: "spark" },
      { label: "Innovations", href: "#", icon: "innovation" },
      { label: "Collaborations", href: "#", icon: "collaboration" },
      { label: "Careers & Jobs", href: "#", icon: "jobs" },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Business Hub", href: "#", icon: "home" },
      { label: "Proposal Hub", href: "#", icon: "proposal" },
    ],
  },
  {
    title: "Tools & Learning",
    items: [
      { label: "AI Assistant", href: "#", icon: "spark" },
      { label: "Learning Center", href: "#", icon: "learning" },
    ],
  },
  {
    title: "Account & Support",
    items: [
      { label: "Profile", href: "/profile", icon: "profile" },
      { label: "Notifications", href: "#", icon: "notifications" },
      { label: "Settings", href: "/settings", icon: "settings" },
      { label: "Support", href: "#", icon: "support" },
    ],
  },
];

function NavIcon({ name, active = false }: { name: string; active?: boolean }) {
  const common = "h-5 w-5 stroke-[2.5] transition-transform duration-200";
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9.5V21h13V9.5" /><path d="M9.5 21v-6h5v6" /></>,
    discover: <><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" /></>,
    feed: <><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8 9h8M8 13h6M8 17h4" /></>,
    spark: <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />,
    wallet: <><rect x="3" y="6" width="18" height="14" rx="3" /><path d="M3 9h15.5a2.5 2.5 0 0 1 0 5H17" /><circle cx="17" cy="11.5" r=".8" fill="currentColor" stroke="none" /></>,
    activity: <path d="M3 12h4l2-6 4.5 12 2-6H21" />,
    profile: <><circle cx="12" cy="8" r="3.5" /><path d="M5 21c.8-3.6 3.2-5.5 7-5.5s6.2 1.9 7 5.5" /></>,
    investment: <><path d="M5 19V9M12 19V5M19 19v-8" /><path d="M3 19h18" /></>,
    earnings: <><path d="M5 19 19 5" /><path d="M10 5h9v9" /></>,
    saved: <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V21l-6-3.8L6 21V4.5Z" />,
    projects: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
    innovation: <><path d="M9 18h6M10 21h4" /><path d="M8.5 15.5A6 6 0 1 1 15.5 15.5c-.9.8-1.5 1.7-1.5 2.5h-4c0-.8-.6-1.7-1.5-2.5Z" /></>,
    collaboration: <><circle cx="8" cy="12" r="4" /><circle cx="16" cy="12" r="4" /><path d="M10.5 9.5h3M10.5 14.5h3" /></>,
    jobs: <><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></>,
    proposal: <><path d="M5 4h14v16H5z" /><path d="M8 8h8M8 12h6M8 16h4" /></>,
    learning: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12Z" /><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" /></>,
    notifications: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" /><path d="M10 21h4" /></>,
    settings: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="4" /></>,
    support: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-1 .8-1.7 1.2-1.7 2.7M12 17h.01" /></>,
  };
  return <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${active ? "border-white/10 bg-white/10 text-white shadow-sm" : "border-transparent bg-slate-100 text-slate-500 group-hover:border-purple-100 group-hover:bg-purple-50 group-hover:text-purple-600"}`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={common} aria-hidden="true">{paths[name]}</svg></span>;
}

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
        <div className={`flex-1 overflow-y-auto py-6 ${desktopSidebarOpen ? "px-4" : "px-2"}`}><nav className="space-y-7">{desktopNavSections.map((section, sectionIndex) => <div key={section.title}><p className={`text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ${desktopSidebarOpen ? "px-3" : "sr-only"}`}>{section.title}</p><div className={`mt-3 space-y-1 ${desktopSidebarOpen ? "" : "mt-0"}`}>{section.items.map((item, itemIndex) => <Link key={item.label} href={item.href} title={!desktopSidebarOpen ? item.label : undefined} className={`flex items-center rounded-xl py-2.5 text-sm font-semibold transition ${desktopSidebarOpen ? "gap-3 px-3" : "justify-center px-2"} ${sectionIndex === 0 && itemIndex === 0 ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}><NavIcon name={item.icon} active={sectionIndex === 0 && itemIndex === 0} />{desktopSidebarOpen && <span className="truncate">{item.label}</span>}</Link>)}</div></div>)}</nav></div>
        {desktopSidebarOpen && <div className="mt-auto p-4"><div className="rounded-2xl bg-slate-950 p-5 text-white"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">Your ACEPA journey</p><p className="mt-3 text-sm font-semibold leading-6">Discover opportunities and turn participation into progress.</p><Link href="/discover" className="mt-4 inline-flex rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-purple-50">Explore now →</Link></div></div>}
      </aside>
      {mobileOpen && <div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Close menu" className="absolute inset-0 bg-slate-950/40" onClick={() => setMobileOpen(false)} /><aside className="relative flex h-full w-72 flex-col bg-white shadow-2xl"><div className="flex h-20 items-center justify-between border-b border-slate-100 px-6"><Link href="/dashboard" className="flex items-center"><img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA — People, Opportunities, Progress" className="h-12 w-auto object-contain brightness-0 dark:brightness-100" /></Link><button onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-bold text-slate-500">Close</button></div><nav className="space-y-1 p-4">{mobileNavItems.map((item, index) => <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${index === 0 ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-50"}`}><NavIcon name={item.icon} />{item.label}</Link>)}</nav><div className="mt-auto p-4"><button onClick={handleSignOut} disabled={signingOut} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 disabled:opacity-60">{signingOut ? "Signing out..." : "Sign out"}</button></div></aside></div>}
      <div className={`transition-all duration-300 ${desktopSidebarOpen ? "lg:pl-64" : "lg:pl-20"}`}>
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"><div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10"><button onClick={() => setMobileOpen(true)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold lg:hidden" aria-label="Open menu">☰</button><div className="hidden lg:block"><p className="text-xs font-semibold text-slate-400">ACEPA WORKSPACE</p><p className="mt-1 text-black text-sm font-bold">Personal dashboard</p></div><UserAccountActions /></div></header>
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
