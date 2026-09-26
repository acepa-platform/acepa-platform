"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";
import { demoOpportunityActivity } from "@/lib/demo-opportunity-activity";

const statusLabels: Record<string, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  shortlisted: "Shortlisted",
  accepted: "Accepted",
  rejected: "Rejected",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

function statusClasses(status: string) {
  if (status === "accepted" || status === "completed") return "bg-emerald-50 text-emerald-700";
  if (status === "rejected" || status === "cancelled") return "bg-rose-50 text-rose-700";
  if (status === "under_review" || status === "shortlisted" || status === "in_progress") return "bg-amber-50 text-amber-700";
  return "bg-purple-50 text-purple-700";
}

export default function ParticipationsPage() {
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const categories = ["All", ...Array.from(new Set(demoOpportunityActivity.map((item) => item.category)))];
  const statuses = ["All", ...Array.from(new Set(demoOpportunityActivity.map((item) => item.status)))];

  const filtered = useMemo(
    () => demoOpportunityActivity.filter((item) => {
      const categoryMatches = category === "All" || item.category === category;
      const statusMatches = status === "All" || item.status === status;
      return categoryMatches && statusMatches;
    }),
    [category, status]
  );

  const active = demoOpportunityActivity.filter((item) =>
    ["submitted", "under_review", "shortlisted", "accepted", "in_progress"].includes(item.status)
  ).length;
  const completed = demoOpportunityActivity.filter((item) => item.status === "completed").length;

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">My ACEPA</p>
              <h1 className="mt-1 text-lg font-black">My Participations</h1>
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 lg:py-10">
          <section className="rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">All opportunity participation</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">One place to track everything you join through ACEPA.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60">
              Investments are only one type of participation. Track innovation submissions, marketing opportunities, business partnerships, collaborations, expert engagements and Careers & Jobs applications here too.
            </p>
          </section>

          <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Total participations</p>
              <p className="mt-2 text-2xl font-black">{demoOpportunityActivity.length}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Active</p>
              <p className="mt-2 text-2xl font-black">{active}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Completed</p>
              <p className="mt-2 text-2xl font-black">{completed}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Opportunity types</p>
              <p className="mt-2 text-2xl font-black">{categories.length - 1}</p>
            </div>
          </section>

          <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto]">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((item) => (
                <button key={item} onClick={() => setCategory(item)} className={"shrink-0 rounded-full px-4 py-2 text-xs font-bold transition " + (category === item ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-700")}>
                  {item}
                </button>
              ))}
            </div>
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 outline-none focus:border-purple-500">
              {statuses.map((item) => <option key={item} value={item}>{item === "All" ? "All statuses" : statusLabels[item] || item}</option>)}
            </select>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[minmax(300px,1.8fr)_150px_150px_150px_110px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 lg:grid">
              <span>Opportunity</span><span>Type</span><span>Status</span><span>Submitted</span><span></span>
            </div>
            <div className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <Link key={item.id} href={"/activity/" + item.id} className="group block px-5 py-5 transition hover:bg-slate-50 sm:px-6">
                  <div className="grid gap-4 lg:grid-cols-[minmax(300px,1.8fr)_150px_150px_150px_110px] lg:items-center">
                    <div className="min-w-0">
                      <h3 className="text-base font-black tracking-[-0.02em] group-hover:text-purple-700">{item.opportunity_title}</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{item.company_name}</p>
                      <p className="mt-2 text-xs text-slate-400">{item.action} · Ref {item.reference_id}</p>
                    </div>
                    <div className="hidden lg:block">
                      <span className="rounded-full bg-purple-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-purple-700">{item.category}</span>
                    </div>
                    <div className="hidden lg:block">
                      <span className={"rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] " + statusClasses(item.status)}>{statusLabels[item.status] || item.status}</span>
                    </div>
                    <div className="hidden lg:block text-xs font-semibold text-slate-500">
                      {new Date(item.submitted_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <div className="flex justify-end text-xs font-black text-slate-700 group-hover:text-purple-700">Open →</div>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:hidden">
                    <div className="rounded-2xl bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Type</p><p className="mt-1 text-sm font-black">{item.category}</p></div>
                    <div className="rounded-2xl bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Status</p><p className="mt-1 text-sm font-black">{statusLabels[item.status] || item.status}</p></div>
                    <div className="rounded-2xl bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Submitted</p><p className="mt-1 text-sm font-black">{new Date(item.submitted_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</p></div>
                  </div>
                </Link>
              ))}
              {filtered.length === 0 && <div className="px-6 py-12 text-center text-sm font-semibold text-slate-500">No demo participations match these filters.</div>}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/activity" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-700 hover:border-purple-200 hover:text-purple-700">View full activity history</Link>
            <Link href="/investments" className="rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-purple-700">View investment portfolio</Link>
          </div>
        </div>
      </main>
    </UserAccountShell>
  );
}
