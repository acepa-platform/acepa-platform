"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";
import { createClient } from "@/lib/supabase/client";

type Opportunity = {
  id: string;
  title: string;
  slug: string;
  company_name: string;
  location: string | null;
  summary: string;
  primary_image_url: string | null;
  amount_text: string | null;
  opportunity_categories?: { name: string; slug: string }[] | null;
};

const categories = [
  ["All", "all"], ["Investment", "investment"], ["Innovation", "innovation"],
  ["Marketing", "marketing"], ["Business", "business"], ["Collaboration", "collaboration"],
  ["Experts", "experts"], ["Careers & Jobs", "careers-jobs"],
];

export default function OpportunitiesPage() {
  const supabase = createClient();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("opportunities")
        .select("id,title,slug,company_name,location,summary,primary_image_url,amount_text,opportunity_categories(name,slug)")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      setOpportunities((data ?? []) as Opportunity[]);
      setLoading(false);
    }
    load();
  }, [supabase]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return opportunities.filter((item) => {
      const categoryMatch = category === "all" || item.opportunity_categories?.[0]?.slug === category;
      const searchMatch = !q || [item.title, item.company_name, item.location ?? "", item.summary].join(" ").toLowerCase().includes(q);
      return categoryMatch && searchMatch;
    });
  }, [opportunities, category, query]);

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div><p className="text-xs font-semibold text-slate-400">ACEPA OPPORTUNITIES</p><p className="mt-1 text-sm font-bold">Discover ways to participate and progress</p></div>
            <UserAccountActions />
          </div>
        </header>
        <div className="mx-auto w-full px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
          <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl sm:p-8 lg:p-10">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-purple-500/25 blur-3xl" />
            <div className="relative max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-purple-300">DISCOVER → PARTICIPATE → PROGRESS</p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-4xl lg:text-5xl">Opportunities built around action.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">Explore live opportunities from companies across investment, innovation, marketing, business, collaboration, experts and careers.</p>
            </div>
          </section>
          <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search opportunities, companies, categories..." aria-label="Search opportunities" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white" />
              <div className="flex flex-wrap gap-2">
                {categories.map(([label, slug]) => <button key={slug} onClick={() => setCategory(slug)} className={"rounded-full px-3.5 py-2 text-xs font-bold transition " + (category === slug ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-700")}>{label}</button>)}
              </div>
            </div>
          </section>
          <div className="mt-7 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Browse opportunities</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Available now</h2></div><p className="text-xs font-semibold text-slate-400">{loading ? "Loading..." : visible.length + " opportunities"}</p></div>
          {loading ? <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-500">Loading opportunities...</div> : visible.length === 0 ? <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"><p className="text-sm font-black">No opportunities match your search.</p><p className="mt-2 text-sm text-slate-500">Try another keyword or category.</p></div> : (
            <section className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {visible.map((opportunity) => <Link key={opportunity.id} href={"/discover/opportunities/" + opportunity.slug} className="group block aspect-square overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg">
                <div className="flex h-full flex-col">
                  <div className="relative h-[45%] overflow-hidden bg-slate-950">
                    {opportunity.primary_image_url ? <img src={opportunity.primary_image_url} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="h-full w-full bg-gradient-to-br from-purple-700 via-indigo-700 to-slate-950" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-900">{opportunity.opportunity_categories?.[0]?.name ?? "Opportunity"}</span>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col p-4">
                    <h3 className="line-clamp-2 text-sm font-black leading-5 tracking-[-0.02em]">{opportunity.title}</h3>
                    <p className="mt-1 truncate text-[11px] font-semibold text-slate-500">{opportunity.company_name}</p>
                    <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-slate-500">{opportunity.summary}</p>
                    <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3"><span className="truncate text-[9px] text-slate-400">{opportunity.location ?? "Global"}</span><span className="shrink-0 text-[10px] font-black text-purple-700">Open →</span></div>
                  </div>
                </div>
              </Link>)}
            </section>
          )}
        </div>
      </main>
    </UserAccountShell>
  );
}
