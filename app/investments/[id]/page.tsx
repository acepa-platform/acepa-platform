"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";
import { demoInvestments } from "@/lib/demo-investments";

function DetailCard({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p><p className="mt-1 text-sm font-black text-slate-800">{value}</p></div>;
}

function paymentLabel(status: string) {
  if (status === "successful_demo") return "Successful (Demo)";
  if (status === "successful") return "Successful";
  return "Pending";
}

export default function InvestmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const investment = demoInvestments.find((item) => item.id === id);

  if (!investment) {
    return <UserAccountShell><main className="min-h-screen bg-[#f7f8fc] text-slate-950"><div className="mx-auto max-w-[800px] px-4 py-12"><div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"><h1 className="text-xl font-black">Investment not found</h1><p className="mt-2 text-sm text-slate-500">This demo investment record is not available.</p><Link href="/investments" className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700">Back to investments</Link></div></div></main></UserAccountShell>;
  }

  const gain = investment.currentValue - investment.amountInvested;
  const gainPercent = investment.amountInvested > 0 ? (gain / investment.amountInvested) * 100 : 0;
  const statusLabel = investment.status === "active" ? "Active" : investment.status === "completed" ? "Completed" : "Under Review";

  return <UserAccountShell><main className="min-h-screen bg-[#f7f8fc] text-slate-950">
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"><div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10"><div><button onClick={() => router.push("/investments")} className="text-xs font-bold text-slate-500 hover:text-purple-700">← Back to Investments</button><p className="mt-1 text-sm font-black">Investment details</p></div><UserAccountActions /></div></header>
    <div className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6 lg:py-10">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-purple-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-purple-200">{investment.category}</span><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/70">{statusLabel}</span><span className="rounded-full bg-amber-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-amber-200">Demo record</span></div><h1 className="mt-4 text-3xl font-black tracking-[-0.04em]">{investment.opportunityTitle}</h1><p className="mt-2 text-sm text-white/60">{investment.companyName}</p><p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">{investment.summary}</p></section>
      <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><DetailCard label="Amount invested" value={"$" + investment.amountInvested.toLocaleString()} /><DetailCard label="Current value" value={"$" + investment.currentValue.toLocaleString()} /><DetailCard label="Demo return" value={(gain >= 0 ? "+" : "-") + "$" + Math.abs(gain).toLocaleString() + " (" + (gain >= 0 ? "+" : "") + gainPercent.toFixed(1) + "%)"} /><DetailCard label="Payment status" value={paymentLabel(investment.paymentStatus)} /></section>
      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Investment progress</p><h2 className="mt-2 text-xl font-black">Track where this investment stands</h2><div className="mt-6 space-y-4">{investment.timeline.map((event) => <div key={event.title + event.date} className="flex gap-4"><div className={"mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black " + (event.state === "complete" ? "bg-slate-950 text-white" : event.state === "current" ? "bg-purple-100 text-purple-700" : "border border-slate-200 bg-white text-slate-400")}>{event.state === "complete" ? "✓" : event.state === "current" ? "•" : "○"}</div><div className="flex-1 rounded-2xl bg-slate-50 p-4"><div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm font-black text-slate-800">{event.title}</p><p className="text-xs font-semibold text-slate-400">{event.date}</p></div><p className="mt-1 text-sm leading-6 text-slate-500">{event.detail}</p></div></div>)}</div></section>
      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Investment record</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><DetailCard label="Units" value={investment.units} /><DetailCard label="Ownership / participation" value={investment.ownership} /><DetailCard label="Investment date" value={new Date(investment.investmentDate).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })} /><DetailCard label="Reference ID" value={investment.referenceId} /><DetailCard label="Last updated" value={new Date(investment.updatedAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })} /><DetailCard label="Currency" value={investment.currency} /></div></section>
      <section className="mt-6 grid gap-6 md:grid-cols-2"><div className="rounded-3xl border border-slate-200 bg-white p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Terms</p><div className="mt-4 space-y-3">{investment.terms.map((term) => <div key={term} className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">✓ {term}</div>)}</div></div><div className="rounded-3xl border border-slate-200 bg-white p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Documents</p><div className="mt-4 space-y-3">{investment.documents.map((document) => <div key={document} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4"><span className="text-sm font-semibold text-slate-700">{document}</span><span className="text-xs font-bold text-purple-700">Demo</span></div>)}</div></div></section>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href={"/opportunities/" + investment.opportunitySlug} className="rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-purple-700">View opportunity</Link><Link href="/activity" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-700 hover:border-purple-200 hover:text-purple-700">View activity</Link><Link href="/investments" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-700 hover:border-purple-200 hover:text-purple-700">Back to investments</Link></div>
    </div>
  </main></UserAccountShell>;
}