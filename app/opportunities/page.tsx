"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

type Opportunity = {
  id: string;
  type: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  amount: string;
  status: string;
  closing: string;
  tags: string[];
};

const opportunities: Opportunity[] = [
  {
    id: "solar-energy-expansion",
    type: "Investment",
    title: "Solar Energy Expansion",
    company: "SunGrid Energy Ltd.",
    location: "Lagos, Nigeria",
    summary: "Scale clean-energy infrastructure across underserved communities with a structured growth opportunity.",
    amount: "$5,000,000",
    status: "Open",
    closing: "Oct 30, 2026",
    tags: ["Energy", "Infrastructure", "Investment"],
  },
  {
    id: "smart-retail-challenge",
    type: "Innovation",
    title: "Smart Retail Innovation Challenge",
    company: "Nexa Retail Group",
    location: "Abuja, Nigeria",
    summary: "Build practical technology that improves the retail experience, customer intelligence and operational efficiency.",
    amount: "$250,000",
    status: "Open",
    closing: "Nov 14, 2026",
    tags: ["Retail", "Technology", "Innovation"],
  },
  {
    id: "product-launch-campaign",
    type: "Marketing",
    title: "Product Launch Campaign",
    company: "Urbanova Consumer Brands",
    location: "Port Harcourt, Nigeria",
    summary: "Join a launch campaign designed to take a new consumer product into its next market.",
    amount: "$75,000",
    status: "Open",
    closing: "Oct 18, 2026",
    tags: ["Marketing", "Consumer", "Growth"],
  },
  {
    id: "regional-distribution-partnership",
    type: "Business",
    title: "Regional Distribution Partnership",
    company: "Atlas Supply Network",
    location: "Enugu, Nigeria",
    summary: "Partner on distribution expansion across selected South-East markets with a defined commercial model.",
    amount: "Partnership",
    status: "Open",
    closing: "Dec 2, 2026",
    tags: ["Distribution", "Partnership", "Commerce"],
  },
  {
    id: "regional-collaboration-lab",
    type: "Collaboration",
    title: "Regional Collaboration Lab",
    company: "Nexa Business Network",
    location: "Lagos / Remote",
    summary: "Bring skills, networks and resources together to develop practical business initiatives across multiple markets.",
    amount: "Strategic partnership",
    status: "Open",
    closing: "Nov 21, 2026",
    tags: ["Collaboration", "Strategy", "Growth"],
  },
  {
    id: "founder-advisory-network",
    type: "Experts",
    title: "Founder Advisory Network",
    company: "Nexa Ventures",
    location: "Remote / Africa",
    summary: "Experienced operators are invited to support selected businesses through strategic advisory engagements.",
    amount: "Paid engagement",
    status: "Open",
    closing: "Nov 28, 2026",
    tags: ["Advisory", "Experts", "Business"],
  },
  {
    id: "growth-marketing-fellowship",
    type: "Careers & Jobs",
    title: "Growth Marketing Fellowship",
    company: "ACEPA Partner Network",
    location: "Lagos / Hybrid",
    summary: "A practical role for growth-minded talent working across campaigns, partnerships and market expansion.",
    amount: "Career opportunity",
    status: "Open",
    closing: "Nov 7, 2026",
    tags: ["Careers", "Marketing", "Growth"],
  },
];

const categories = ["All", "Investment", "Innovation", "Marketing", "Business", "Collaboration", "Experts", "Careers & Jobs"];

export default function OpportunitiesPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return opportunities.filter((opportunity) => {
      const categoryMatch = category === "All" || opportunity.type === category;
      const queryMatch =
        !q ||
        [
          opportunity.title,
          opportunity.company,
          opportunity.type,
          opportunity.location,
          opportunity.summary,
          opportunity.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div>
              <p className="text-xs font-semibold text-slate-400">ACEPA OPPORTUNITIES</p>
              <p className="mt-1 text-sm font-bold">Discover ways to participate and progress</p>
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto w-full px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
          <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl sm:p-8 lg:p-10">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-purple-500/25 blur-3xl" />
            <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />
            <div className="relative max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-purple-300">DISCOVER → PARTICIPATE → PROGRESS</p>
                <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/70">Demo opportunities</span>
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                Opportunities built around action.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                Explore investment, innovation, marketing, business, collaboration, expert and career opportunities from companies on ACEPA.
              </p>
            </div>
          </section>

          <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative min-w-0 flex-1">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  name="opportunity-search"
                  type="search"
                  autoComplete="new-password"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="Search opportunities, companies, categories..."
                  aria-label="Search opportunities"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={
                      "rounded-full px-3.5 py-2 text-xs font-bold transition " +
                      (category === item
                        ? "bg-slate-950 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-700")
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Browse opportunities</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Available now</h2>
            </div>
            <p className="text-xs font-semibold text-slate-400">{visible.length} opportunities</p>
          </div>

          <section className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((opportunity) => (
              <Link
                key={opportunity.id}
                href={"/opportunities/" + opportunity.id}
                className="group block aspect-square overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
              >
                <div className="flex h-full flex-col">
                  <div className="relative h-[42%] min-h-0 overflow-hidden bg-slate-950">
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-500/25 blur-2xl" />
                    <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-fuchsia-500/15 blur-2xl" />
                    <div className="relative flex h-full flex-col justify-between bg-gradient-to-br from-purple-700 via-indigo-700 to-slate-950 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="max-w-[72%] truncate rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/80 backdrop-blur">
                          {opportunity.type}
                        </span>
                        <span className="rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-[8px] font-black text-white/65 backdrop-blur">
                          ACEPA
                        </span>
                      </div>
                      <p className="line-clamp-2 text-base font-black leading-5 tracking-[-0.03em] text-white">
                        {opportunity.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-[9px] font-black text-white">
                        {opportunity.company.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-black text-slate-800">{opportunity.company}</p>
                        <p className="truncate text-[9px] text-slate-400">{opportunity.location}</p>
                      </div>
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-slate-50 p-2.5">
                        <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">Value</p>
                        <p className="mt-1 line-clamp-1 text-[11px] font-black text-slate-800">{opportunity.amount}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-2.5">
                        <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">Closing</p>
                        <p className="mt-1 line-clamp-1 text-[11px] font-black text-slate-800">{opportunity.closing}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="text-[9px] font-semibold text-slate-400">{opportunity.status}</span>
                      <span className="text-[10px] font-black text-purple-700 transition group-hover:translate-x-0.5">
                        Open →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </section>

          {visible.length === 0 && (
            <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">✦</div>
              <p className="mt-4 text-sm font-black">No opportunities match your search.</p>
              <p className="mt-2 text-sm text-slate-500">Try another keyword or category.</p>
            </div>
          )}
        </div>
      </main>
    </UserAccountShell>
  );
}
