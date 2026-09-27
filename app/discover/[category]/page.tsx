"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
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

type Opportunity = {
  id: string; title: string; slug: string; company_name: string; location: string | null;
  summary: string; description?: string | null; primary_image_url: string | null; amount_text: string | null;
  company_verified: boolean; industry: string | null; funding_goal: number | null; funding_raised: number | null;
  company_contribution_percent: number | null; public_contribution_percent: number | null;
  participant_count: number; proposal_count: number; reward_text: string | null;
  payment_schedule: string | null; deadline: string | null; return_text: string | null;
  employment_type: string | null; opportunity_categories?: { name: string; slug: string }[] | null;
  isDemo?: boolean;
};

function money(value: number | null | undefined) {
  return value == null || Number.isNaN(value) ? null : "$" + value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}
function dateLabel(value: string | null) {
  return value ? new Date(value).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }) : null;
}
function Metric({ label, value }: { label: string; value: string | number | null | undefined }) {
  return <div className="min-w-0"><p className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">{label}</p><p className="mt-0.5 truncate text-[10px] font-bold text-slate-800">{value ?? "Not provided"}</p></div>;
}

function OpportunityCard({ item, category }: { item: Opportunity; category: string }) {
  const progress = item.funding_goal && item.funding_raised !== null ? Math.min(100, Math.max(0, (item.funding_raised / item.funding_goal) * 100)) : null;
  const categoryName = item.opportunity_categories?.[0]?.name ?? category;

  return (
    <Link href={"/discover/opportunities/" + item.slug} className="group mx-auto flex aspect-[5/6] w-full max-w-[320px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl">
      <div className="relative h-[35%] shrink-0 overflow-hidden bg-slate-900">
        {item.primary_image_url && <img src={item.primary_image_url} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
        <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-slate-900">{categoryName}</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[13px] font-black leading-5 tracking-tight text-slate-950">{item.title}</h3>
        <p className="mt-1 flex items-center gap-1 truncate text-[10px] font-bold text-slate-600">
          <span className="truncate">{item.company_name}</span>
          {item.company_verified && <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[8px] font-black text-white">✓</span>}
        </p>
        <p className="mt-0.5 truncate text-[9px] text-slate-400">{item.location ?? "Global"}{item.industry ? " · " + item.industry : ""}</p>

        <div className="mt-3 min-h-0 space-y-2">
          {category === "investment" ? (
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-2"><Metric label="Funding Goal" value={money(item.funding_goal) ?? item.amount_text} /><Metric label="Participants" value={item.participant_count} /></div>
              <div><div className="mb-1 flex justify-between text-[8px] font-bold text-slate-500"><span>Funding Progress</span><span>{progress === null ? "Not provided" : progress.toFixed(0) + "%"}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-purple-600" style={{ width: (progress ?? 0) + "%" }} /></div></div>
              <div className="grid grid-cols-3 gap-x-3 gap-y-2"><Metric label="Company" value={item.company_contribution_percent === null ? null : item.company_contribution_percent + "%"} /><Metric label="Public" value={item.public_contribution_percent === null ? null : item.public_contribution_percent + "%"} /><Metric label="Returns" value={item.return_text} /></div>
            </div>
          ) : category === "collaboration" ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-2"><Metric label="Industry" value={item.industry} /><Metric label="Reward" value={item.reward_text} /><Metric label="Payment" value={item.payment_schedule} /><Metric label="Deadline" value={dateLabel(item.deadline)} /><Metric label="Proposals" value={item.proposal_count} /><Metric label="Participants" value={item.participant_count} /></div>
          ) : category === "innovation" ? (
            <div className="grid grid-cols-2 gap-1.5"><Metric label="Industry" value={item.industry} /><Metric label="Reward" value={item.reward_text} /><Metric label="Deadline" value={dateLabel(item.deadline)} /><Metric label="Submissions" value={item.proposal_count} /></div>
          ) : category === "marketing" ? (
            <div className="grid grid-cols-2 gap-1.5"><Metric label="Industry" value={item.industry} /><Metric label="Campaign Budget" value={item.amount_text} /><Metric label="Payment" value={item.payment_schedule} /><Metric label="Deadline" value={dateLabel(item.deadline)} /></div>
          ) : category === "experts" ? (
            <div className="grid grid-cols-2 gap-1.5"><Metric label="Industry" value={item.industry} /><Metric label="Engagement Value" value={item.amount_text} /><Metric label="Payment" value={item.payment_schedule} /><Metric label="Applicants" value={item.proposal_count} /></div>
          ) : (
            <div className="grid grid-cols-2 gap-1.5"><Metric label="Industry" value={item.industry} /><Metric label="Salary" value={item.amount_text} /><Metric label="Employment Type" value={item.employment_type} /><Metric label="Applicants" value={item.proposal_count} /></div>
          )}
        </div>

        <p className="mt-3 line-clamp-3 text-[9px] leading-4 text-slate-500">{item.summary || item.description || "Review the opportunity details, requirements and terms before participating."}</p>
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-2.5">
          <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">ACEPA Opportunity</span>
          <span className="text-[9px] font-black text-purple-600">{configAction(category)} →</span>
        </div>
      </div>
    </Link>
  );
}
function configAction(category: string) {
  return configs[category]?.action.replace("View ", "View ") ?? "View Details";
}

export default function CategoryDiscoveryPage() {
  const params = useParams<{ category: string }>();
  const category = params.category;
  const config = configs[category];
  const supabase = createClient();
  const [items, setItems] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    if (!config) return;
    async function load() {
      setLoading(true);
      const { data } = await supabase.from("opportunities").select("id,title,slug,company_name,location,summary,description,primary_image_url,amount_text,company_verified,industry,funding_goal,funding_raised,company_contribution_percent,public_contribution_percent,participant_count,proposal_count,reward_text,payment_schedule,deadline,return_text,employment_type,opportunity_categories(name,slug)").eq("status", "published").order("published_at", { ascending: false });
      const live = (data ?? []).filter((item: any) => item.opportunity_categories?.[0]?.slug === category).map((item: any) => ({ ...item, isDemo: false })) as Opportunity[];
      setItems(live.length ? live : demoOpportunities.filter((item) => item.category_slug === category).map((item) => ({ ...item, isDemo: true })) as Opportunity[]);
      setLoading(false);
    }
    load();
  }, [category, config, supabase]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = items.filter((item) => !q || [item.title, item.company_name, item.location ?? "", item.summary, item.industry ?? ""].join(" ").toLowerCase().includes(q));
    if (filter !== "All") result.splice(0, result.length, ...result.filter((item) => (item.industry ?? "").toLowerCase() === filter.toLowerCase()));
    if (sort === "name") result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [items, query, filter, sort]);

  if (!config) return null;

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"><div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10"><div><p className="text-xs font-semibold text-purple-600">ACEPA · {category === "careers-jobs" ? "CAREERS & JOBS" : category.toUpperCase()}</p><p className="mt-1 text-sm font-bold">Browse, filter and explore</p></div><UserAccountActions /></div></header>
        <div className="mx-auto w-full px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
          <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl sm:p-8 lg:p-10"><div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-purple-500/25 blur-3xl" /><div className="relative max-w-4xl"><Link href="/dashboard/discover" className="text-xs font-bold text-purple-300 hover:text-white">← Back to Discover</Link><h1 className="mt-4 text-3xl font-black tracking-[-0.05em] sm:text-4xl lg:text-5xl">{config.title}</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{config.description}</p></div></section>
          <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><div className="grid gap-3 lg:grid-cols-[1fr_auto]"><input value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder={"Search " + (category === "careers-jobs" ? "jobs, companies, roles..." : category + " opportunities...")} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:bg-white" /><select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none"><option value="newest">Newest</option><option value="name">A–Z</option></select></div><div className="mt-4 flex flex-wrap gap-2">{["All", ...config.filters].map((value) => <button key={value} onClick={() => setFilter(value)} className={"rounded-full px-3.5 py-2 text-xs font-bold transition " + (filter === value ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-700")}>{value}</button>)}</div></section>
          <div className="mt-7 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">ONLY {category === "careers-jobs" ? "CAREERS & JOBS" : category.toUpperCase()}</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">{visible.length} available</h2></div>{items.some((item) => item.isDemo) && <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-700">Demo listings for testing</span>}</div>
          {loading ? <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-500">Loading {category}...</div> : <section className="mt-5 grid grid-cols-2 justify-center gap-6 md:grid-cols-3 xl:grid-cols-4">{visible.map((item) => <OpportunityCard key={item.id} item={item} category={category} />)}</section>}
        </div>
      </main>
    </UserAccountShell>
  );
}
