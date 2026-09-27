"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import UserAccountTopNav from "@/components/user-account-top-nav";
import UserAccountShell from "@/components/user-account-shell";

type Opportunity = {
  id: string;
  title: string;
  slug: string;
  company_name: string;
  location: string | null;
  summary: string;
  primary_image_url: string | null;
  amount_text: string | null;
  category_id: string;
  company_verified: boolean;
  industry: string | null;
  funding_goal: number | null;
  funding_raised: number | null;
  company_contribution_percent: number | null;
  public_contribution_percent: number | null;
  participant_count: number;
  proposal_count: number;
  reward_text: string | null;
  payment_schedule: string | null;
  deadline: string | null;
  return_text: string | null;
  employment_type: string | null;
  opportunity_categories?: { name: string; slug: string }[] | null;
};

const categories = [
  ["All", "all"],
  ["Investment", "investment"],
  ["Innovation", "innovation"],
  ["Marketing", "marketing"],
  ["Business", "business"],
  ["Collaboration", "collaboration"],
  ["Experts", "experts"],
  ["Careers & Jobs", "careers-jobs"],
];

function money(value: number | null) {
  if (value === null || Number.isNaN(value)) return null;
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function dateLabel(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Metric({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div className="min-w-0">
      <p className="text-[7px] font-bold uppercase tracking-[0.1em] text-slate-400">{label}</p>
      <p className="mt-0.5 truncate text-[9px] font-bold text-slate-800">{value ?? "Not provided"}</p>
    </div>
  );
}

function OpportunityCard({ item }: { item: Opportunity }) {
  const category = item.opportunity_categories?.[0]?.slug ?? "";
  const categoryName = item.opportunity_categories?.[0]?.name ?? "Opportunity";
  const progress =
    item.funding_goal && item.funding_raised !== null
      ? Math.min(100, Math.max(0, (item.funding_raised / item.funding_goal) * 100))
      : null;

  return (
    <Link
      href={`/discover/opportunities/${item.slug}?from=dashboard-discover`}
      className="group mx-auto flex aspect-square w-full max-w-[220px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"
    >
      <div className="relative h-[34%] shrink-0 overflow-hidden bg-slate-900">
        {item.primary_image_url && (
          <img
            src={item.primary_image_url}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-slate-900">
          {categoryName}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-2.5">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-[11px] font-black leading-3.5 tracking-tight text-slate-950">
            {item.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 truncate text-[9px] font-bold text-slate-600">
            <span className="truncate">{item.company_name}</span>
            {item.company_verified && (
              <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[8px] font-black text-white">
                ✓
              </span>
            )}
          </p>
          <p className="mt-0.5 truncate text-[8px] text-slate-400">
            {item.location ?? "Global"}{item.industry ? ` · ${item.industry}` : ""}
          </p>
        </div>

        {category === "investment" ? (
          <div className="mt-1.5 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <Metric label="Funding goal" value={money(item.funding_goal) ?? item.amount_text} />
              <Metric label="Participants" value={item.participant_count} />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-[8px] font-bold text-slate-500">
                <span>Funding progress</span>
                <span>{progress === null ? "Not provided" : `${progress.toFixed(0)}%`}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-purple-600" style={{ width: `${progress ?? 0}%` }} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Metric label="Company" value={item.company_contribution_percent === null ? null : `${item.company_contribution_percent}%`} />
              <Metric label="Public" value={item.public_contribution_percent === null ? null : `${item.public_contribution_percent}%`} />
              <Metric label="Returns" value={item.return_text} />
            </div>
          </div>
        ) : category === "collaboration" ? (
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            <Metric label="Industry" value={item.industry} />
            <Metric label="Reward" value={item.reward_text} />
            <Metric label="Payment" value={item.payment_schedule} />
            <Metric label="Deadline" value={dateLabel(item.deadline)} />
            <Metric label="Proposals" value={item.proposal_count} />
            <Metric label="Participants" value={item.participant_count} />
          </div>
        ) : category === "innovation" ? (
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Metric label="Industry" value={item.industry} />
            <Metric label="Reward" value={item.reward_text} />
            <Metric label="Deadline" value={dateLabel(item.deadline)} />
            <Metric label="Submissions" value={item.proposal_count} />
          </div>
        ) : category === "marketing" ? (
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Metric label="Industry" value={item.industry} />
            <Metric label="Budget" value={item.amount_text} />
            <Metric label="Payment" value={item.payment_schedule} />
            <Metric label="Deadline" value={dateLabel(item.deadline)} />
          </div>
        ) : category === "experts" ? (
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Metric label="Industry" value={item.industry} />
            <Metric label="Engagement" value={item.amount_text} />
            <Metric label="Payment" value={item.payment_schedule} />
            <Metric label="Applicants" value={item.proposal_count} />
          </div>
        ) : category === "careers-jobs" ? (
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Metric label="Industry" value={item.industry} />
            <Metric label="Salary" value={item.amount_text} />
            <Metric label="Employment" value={item.employment_type} />
            <Metric label="Applicants" value={item.proposal_count} />
          </div>
        ) : (
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Metric label="Industry" value={item.industry} />
            <Metric label="Reward" value={item.reward_text ?? item.amount_text} />
            <Metric label="Deadline" value={dateLabel(item.deadline)} />
            <Metric label="Participants" value={item.participant_count} />
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-1.5">
          <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-slate-400">
            ACEPA Opportunity
          </span>
          <span className="text-[8px] font-black text-purple-600">View details →</span>
        </div>
      </div>
    </Link>
  );
}

export default function DiscoverPage() {
  const supabase = createClient();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data } = await supabase
        .from("opportunities")
        .select(
          "id,title,slug,company_name,location,summary,primary_image_url,amount_text,category_id,company_verified,industry,funding_goal,funding_raised,company_contribution_percent,public_contribution_percent,participant_count,proposal_count,reward_text,payment_schedule,deadline,return_text,employment_type,opportunity_categories(name,slug)"
        )
        .eq("status", "published")
        .order("published_at", { ascending: false });

      setOpportunities((data ?? []) as Opportunity[]);
      setLoading(false);
    }

    load();
  }, [supabase]);

  const filtered = useMemo(
    () =>
      opportunities.filter((item) => {
        const categoryMatch =
          category === "all" ||
          item.opportunity_categories?.[0]?.slug === category;
        const q = search.trim().toLowerCase();
        const searchMatch =
          !q ||
          [item.title, item.company_name, item.location ?? "", item.summary].some(
            (value) => value.toLowerCase().includes(q)
          );

        return categoryMatch && searchMatch;
      }),
    [opportunities, category, search]
  );

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-slate-50 text-slate-950">
        <UserAccountTopNav searchValue={search} onSearchChange={setSearch} />

        <section className="relative overflow-hidden bg-slate-950 px-6 py-9 text-white lg:px-8 lg:py-11">
          <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-purple-600/15 blur-3xl" />
          <div className="relative mx-auto max-w-[1500px]">
            <p className="text-[10px] font-bold tracking-[0.22em] text-purple-300">DISCOVER ACEPA</p>
            <div className="mt-2">
              <h1 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                Find where you can <span className="text-purple-300">create value.</span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Explore opportunities to invest, innovate, market, build, collaborate, work, and contribute.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full px-5 py-8 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(([label, slug]) => (
              <button
                key={slug}
                onClick={() => setCategory(slug)}
                className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${
                  category === slug
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-purple-600">OPPORTUNITIES</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Explore what is available.</h2>
            </div>
            <p className="text-sm text-slate-500">{loading ? "Loading..." : `${filtered.length} opportunities`}</p>
          </div>

          {loading ? (
            <div className="py-20 text-center text-sm text-slate-500">Loading opportunities...</div>
          ) : filtered.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-lg font-bold">No opportunities found.</p>
              <p className="mt-2 text-sm text-slate-500">Try another search or category.</p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 justify-center gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((item) => (
                <OpportunityCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </main>
    </UserAccountShell>
  );
}
