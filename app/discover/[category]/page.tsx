"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";
import { createClient } from "@/lib/supabase/client";
import { demoOpportunities, type DemoOpportunity } from "@/lib/demo-opportunities";

const configs: Record<string, { title: string; description: string; filters: string[]; action: string }> = {
  investment: { title: "Explore Investment Opportunities", description: "Discover investment opportunities from verified companies and projects around the world.", filters: ["Production", "Manufacturing", "Real Estate", "Hospitality", "Transportation", "Agriculture", "Technology", "Energy", "Healthcare", "Consumer Products", "Other"], action: "View Investment" },
  innovation: { title: "Explore Innovation Opportunities", description: "Discover real problems and challenges posted by companies and contribute ideas that can create new solutions.", filters: ["Technology", "Product Development", "Business Operations", "Manufacturing", "Agriculture", "Healthcare", "Energy", "Logistics", "Marketing", "Sustainability", "Other"], action: "View Challenge" },
  marketing: { title: "Explore Marketing Opportunities", description: "Discover campaigns and marketing opportunities from companies around the world.", filters: ["Brand Campaigns", "Product Promotion", "Content Creation", "Social Media", "Events", "Influencer / Creator", "Advertising", "Market Research", "Other"], action: "View Campaign" },
  collaboration: { title: "Explore Collaboration Opportunities", description: "Discover companies and people looking for partners to build, create and grow together.", filters: ["Business Partnership", "Product Partnership", "Distribution", "Technology", "Research", "Joint Projects", "Strategic Partnership", "Other"], action: "View Collaboration" },
  experts: { title: "Explore Expert Opportunities", description: "Discover expert engagements from companies looking for specialized knowledge and practical support.", filters: ["Business Operations", "Finance", "Technology", "Legal", "Marketing", "Human Resources", "Strategy", "Other"], action: "View Engagement" },
  "careers-jobs": { title: "Explore Careers & Jobs", description: "Discover career opportunities from companies building the future.", filters: ["Full-time", "Part-time", "Contract", "Remote", "Hybrid", "On-site", "Entry-level", "Mid-level", "Senior", "Other"], action: "View Job" },
};

type LiveOpportunity = DemoOpportunity & { isDemo?: boolean };

export default function CategoryDiscoveryPage() {
  const params = useParams<{ category: string }>();
  const category = params.category;
  const config = configs[category];
  const supabase = createClient();
  const [items, setItems] = useState<LiveOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    if (!config) return;
    async function load() {
      setLoading(true);
      const { data } = await supabase
        .from("opportunities")
        .select("id,title,slug,company_name,location,summary,description,primary_image_url,amount_text,opportunity_categories(name,slug)")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      const live = (data ?? [])
        .filter((item: any) => item.opportunity_categories?.[0]?.slug === category)
        .map((item: any) => ({
          ...item,
          category: item.opportunity_categories?.[0]?.name ?? config.title.replace("Explore ", ""),
          category_slug: category,
          subcategory: item.opportunity_categories?.[0]?.name ?? "Other",
          meta: [item.location ?? "Global", "Published on ACEPA"],
          sections: [],
          isDemo: false,
        })) as LiveOpportunity[];

      setItems(live.length ? live : demoOpportunities.filter((item) => item.category_slug === category).map((item) => ({ ...item, isDemo: true })));
      setLoading(false);
    }
    load();
  }, [category, config, supabase]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = items.filter((item) => {
      const searchMatch = !q || [item.title, item.company_name, item.location, item.summary, item.subcategory].join(" ").toLowerCase().includes(q);
      const filterMatch = filter === "All" || item.subcategory.toLowerCase() === filter.toLowerCase() || item.meta.some((value) => value.toLowerCase().includes(filter.toLowerCase()));
      return searchMatch && filterMatch;
    });
    if (sort === "name") result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [items, query, filter, sort]);

  if (!config) notFound();

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div>
              <p className="text-xs font-semibold text-purple-600">ACEPA · {category === "careers-jobs" ? "CAREERS & JOBS" : category.toUpperCase()}</p>
              <p className="mt-1 text-sm font-bold">Browse, filter and explore</p>
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto w-full px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
          <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl sm:p-8 lg:p-10">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-purple-500/25 blur-3xl" />
            <div className="relative max-w-4xl">
              <Link href="/dashboard/discover" className="text-xs font-bold text-purple-300 hover:text-white">← Back to Discover</Link>
              <h1 className="mt-4 text-3xl font-black tracking-[-0.05em] sm:text-4xl lg:text-5xl">{config.title}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{config.description}</p>
            </div>
          </section>

          <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
              <input value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder={"Search " + (category === "careers-jobs" ? "jobs, companies, roles..." : category + " opportunities...")} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:bg-white" />
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none">
                <option value="newest">Newest</option>
                <option value="name">A–Z</option>
              </select>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["All", ...config.filters].map((value) => (
                <button key={value} onClick={() => setFilter(value)} className={"rounded-full px-3.5 py-2 text-xs font-bold transition " + (filter === value ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-700")}>{value}</button>
              ))}
            </div>
          </section>

          <div className="mt-7 flex items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Only {category === "careers-jobs" ? "Careers & Jobs" : config.title.replace("Explore ", "")}</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">{visible.length} available</h2></div>
            {items.some((item) => item.isDemo) && <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-700">Demo listings for testing</span>}
          </div>

          {loading ? <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-500">Loading {category}...</div> : (
            <section className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((item) => (
                <Link key={item.id} href={"/discover/opportunities/" + item.slug} className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img src={item.primary_image_url} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-900">{item.subcategory}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="line-clamp-2 text-lg font-black tracking-[-0.03em]">{item.title}</h3>
                    <p className="mt-1 text-xs font-semibold text-slate-500">{item.company_name}</p>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{item.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">{item.meta.slice(0, 2).map((m) => <span key={m} className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-500">{m}</span>)}</div>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-xs text-slate-400">{item.location}</span><span className="text-xs font-black text-purple-700">{config.action} →</span></div>
                  </div>
                </Link>
              ))}
            </section>
          )}
        </div>
      </main>
    </UserAccountShell>
  );
}
