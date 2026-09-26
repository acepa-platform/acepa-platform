"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";
import { demoInvestments } from "@/lib/demo-investments";

const statusLabels: Record<string, string> = { active: "Active", under_review: "Under Review", completed: "Completed" };
function statusClasses(status: string) {
  if (status === "active") return "bg-emerald-50 text-emerald-700";
  if (status === "completed") return "bg-slate-100 text-slate-700";
  return "bg-amber-50 text-amber-700";
}
function paymentLabel(status: string) {
  if (status === "successful_demo") return "Successful (Demo)";
  if (status === "successful") return "Successful";
  return "Pending";
}
export default function InvestmentsPage() {
  const [filter, setFilter] = useState("All");
  const totalInvested = demoInvestments.reduce((sum, item) => sum + item.amountInvested, 0);
  const currentValue = demoInvestments.reduce((sum, item) => sum + item.currentValue, 0);
  const totalReturn = currentValue - totalInvested;
  const activeCount = demoInvestments.filter((item) => item.status === "active").length;
  const filtered = useMemo(() => filter === "All" ? demoInvestments : demoInvestments.filter((item) => statusLabels[item.status] === filter), [filter]);
  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"><div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">My ACEPA</p><h1 className="mt-1 text-lg font-black">My Investments</h1></div><UserAccountActions /></div></header>
        <div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 lg:py-10">
          <section className="rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">Demo portfolio</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">See your investments, value and progress in one place.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">These sample investments are here to let you test the user portfolio experience. Real investment records will appear here when connected to live investment data.</p>
          </section>
          <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Total invested</p><p className="mt-2 text-2xl font-black">{"$" + totalInvested.toLocaleString()}</p></div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Current value</p><p className="mt-2 text-2xl font-black">{"$" + currentValue.toLocaleString()}</p></div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Demo return</p><p className={"mt-2 text-2xl font-black " + (totalReturn >= 0 ? "text-emerald-700" : "text-rose-700")}>{totalReturn >= 0 ? "+" : "-"}{"$" + Math.abs(totalReturn).toLocaleString()}</p></div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Active investments</p><p className="mt-2 text-2xl font-black">{activeCount}</p></div>
          </section>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {["All", "Active", "Under Review", "Completed"].map((item) => <button key={item} onClick={() => setFilter(item)} className={"shrink-0 rounded-full px-4 py-2 text-xs font-bold transition " + (filter === item ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-700")}>{item}</button>)}
          </div>
          <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[minmax(280px,1.7fr)_130px_140px_140px_140px_100px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 lg:grid"><span>Investment</span><span>Status</span><span>Invested</span><span>Current value</span><span>Payment</span><span></span></div>
            <div className="divide-y divide-slate-100">
              {filtered.map((item) => { const change = item.currentValue - item.amountInvested; return <Link key={item.id} href={"/investments/" + item.id} className="group block px-5 py-5 transition hover:bg-slate-50 sm:px-6"><div className="grid gap-4 lg:grid-cols-[minmax(280px,1.7fr)_130px_140px_140px_140px_100px] lg:items-center"><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-purple-600">{item.category}</p><h3 className="mt-2 text-base font-black tracking-[-0.02em] group-hover:text-purple-700">{item.opportunityTitle}</h3><p className="mt-1 text-sm font-semibold text-slate-500">{item.companyName}</p><p className="mt-2 text-xs text-slate-400">Ref {item.referenceId}</p></div><div><span className={"rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] " + statusClasses(item.status)}>{statusLabels[item.status]}</span></div><div className="text-sm font-black text-slate-800">{"$" + item.amountInvested.toLocaleString()}</div><div><p className="text-sm font-black text-slate-800">{"$" + item.currentValue.toLocaleString()}</p><p className={"mt-1 text-[11px] font-bold " + (change >= 0 ? "text-emerald-700" : "text-rose-700")}>{change >= 0 ? "+" : "-"}{"$" + Math.abs(change).toLocaleString()}</p></div><div className="text-xs font-semibold text-slate-500">{paymentLabel(item.paymentStatus)}</div><div className="flex justify-end text-xs font-black text-slate-700 group-hover:text-purple-700">Open →</div></div><div className="mt-4 grid gap-2 sm:grid-cols-3 lg:hidden"><div className="rounded-2xl bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Status</p><p className="mt-1 text-sm font-black">{statusLabels[item.status]}</p></div><div className="rounded-2xl bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Invested</p><p className="mt-1 text-sm font-black">{"$" + item.amountInvested.toLocaleString()}</p></div><div className="rounded-2xl bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Current value</p><p className="mt-1 text-sm font-black">{"$" + item.currentValue.toLocaleString()}</p></div></div></Link>; })}
            </div>
          </section>
        </div>
      </main>
    </UserAccountShell>
  );
}