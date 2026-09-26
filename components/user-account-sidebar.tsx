"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sections = [
  {
    title: "Main",
    items: [
      { label: "Home", href: "/dashboard", icon: "home" },
      { label: "Discover", href: "/discover", icon: "discover" },
      { label: "Feed", href: "/feed", icon: "feed" },
      { label: "Opportunities", href: "/opportunities", icon: "spark" },
    ],
  },
  {
    title: "My ACEPA",
    items: [
      { label: "My Activity", href: "/activity", icon: "activity" },
      { label: "My Wallet", href: "/wallet", icon: "wallet" },
      { label: "My Investments", href: "/investments", icon: "investment" },
      { label: "My Earnings", href: "/earnings", icon: "earnings" },
      { label: "Saved", href: "/saved", icon: "saved" },
      { label: "Watchlist", href: "/watchlist", icon: "feed" },
      { label: "Upcoming Projects", href: "/projects", icon: "projects" },
    ],
  },
  {
    title: "Explore",
    items: [
      { label: "Investments", href: "/discover?category=investment", icon: "investment" },
      { label: "Campaigns", href: "/discover?category=marketing", icon: "spark" },
      { label: "Innovations", href: "/discover?category=innovation", icon: "innovation" },
      { label: "Collaborations", href: "/discover?category=collaboration", icon: "collaboration" },
      { label: "Careers & Jobs", href: "/discover?category=careers-jobs", icon: "jobs" },
    ],
  },
  {
    title: "Business",
    items: [
      { label: "Business Hub", href: "/business", icon: "home" },
      { label: "Proposal Hub", href: "/proposals", icon: "proposal" },
    ],
  },
  {
    title: "Tools & Learning",
    items: [
      { label: "AI Assistant", href: "/ai-assistant", icon: "spark" },
      { label: "Learning Center", href: "/learning", icon: "learning" },
    ],
  },
  {
    title: "Account & Support",
    items: [
      { label: "Notifications", href: "/notifications", icon: "notifications" },
      { label: "Settings", href: "/settings", icon: "settings" },
      { label: "Support", href: "/support", icon: "support" },
    ],
  },
];

function NavIcon({ name, active = false }: { name: string; active?: boolean }) {
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

  return (
    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all ${
      active
        ? "border-white/10 bg-white/10 text-white shadow-sm"
        : "border-transparent bg-slate-100 text-slate-500 group-hover:border-purple-100 group-hover:bg-purple-50 group-hover:text-purple-600"
    }`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        {paths[name]}
      </svg>
    </span>
  );
}

type UserAccountSidebarProps = {
  open: boolean;
  onToggle: () => void;
};

export default function UserAccountSidebar({ open, onToggle }: UserAccountSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    const path = href.split("?")[0];
    return pathname === path || (path !== "/dashboard" && pathname.startsWith(`${path}/`));
  };

  const sidebar = (
    <aside className={`fixed inset-y-0 left-0 z-50 hidden border-r border-slate-200 bg-white lg:flex lg:flex-col transition-all duration-300 ${
      open ? "w-64" : "w-20"
    }`}>
      <div className={`flex h-20 items-center border-b border-slate-100 ${
        open ? "justify-between px-5" : "justify-center px-3"
      }`}>
        <Link href="/dashboard" className="flex min-w-0 items-center">
          <img
            src="/acepa-logo-white-transparent-tagline-brighter.png"
            alt="ACEPA — People, Opportunities, Progress"
            className={`object-contain brightness-0 dark:brightness-100 ${
              open ? "h-12 w-auto" : "h-9 w-9"
            }`}
          />
        </Link>
        <button
          onClick={onToggle}
          aria-label={open ? "Hide sidebar" : "Show sidebar"}
          title={open ? "Hide sidebar" : "Show sidebar"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
        >
          {open ? "‹" : "›"}
        </button>
      </div>

      <div className={`flex-1 overflow-y-auto py-6 ${open ? "px-4" : "px-2"}`}>
        <nav className="space-y-7">
          {sections.map((section) => (
            <div key={section.title}>
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ${
                open ? "px-3" : "sr-only"
              }`}>
                {section.title}
              </p>
              <div className={`mt-3 space-y-1 ${open ? "" : "mt-0"}`}>
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      title={!open ? item.label : undefined}
                      className={`group flex items-center rounded-xl py-2.5 text-sm font-semibold transition ${
                        open ? "gap-3 px-3" : "justify-center px-2"
                      } ${active ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}
                    >
                      <NavIcon name={item.icon} active={active} />
                      {open && <span className="truncate">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {open && (
          <div className="mt-8 rounded-2xl bg-slate-950 p-5 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">Your ACEPA journey</p>
            <p className="mt-3 text-sm font-semibold leading-6">Discover opportunities and turn participation into progress.</p>
            <Link href="/discover" className="mt-4 inline-flex rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-purple-50">
              Explore now →
            </Link>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {sidebar}

      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open ACEPA navigation"
        className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-white shadow-xl lg:hidden"
      >
        ☰
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-slate-950/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-72 flex-col bg-white shadow-2xl">
            <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
              <Link href="/dashboard" className="flex items-center" onClick={() => setMobileOpen(false)}>
                <img
                  src="/acepa-logo-white-transparent-tagline-brighter.png"
                  alt="ACEPA — People, Opportunities, Progress"
                  className="h-12 w-auto object-contain brightness-0 dark:brightness-100"
                />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-bold text-slate-500">
                Close
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              {sections.flatMap((section) => section.items).map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${
                      active ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <NavIcon name={item.icon} active={active} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
