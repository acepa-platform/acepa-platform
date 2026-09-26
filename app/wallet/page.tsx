"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

type Transaction = {
  id: string;
  type: "funding" | "investment" | "earning" | "withdrawal" | "refund";
  title: string;
  description: string;
  amount: number;
  date: string;
  status: "Completed" | "Pending";
};

const transactions: Transaction[] = [
  { id: "wallet-demo-1", type: "funding", title: "Wallet funding", description: "Demo payment account funding", amount: 2500, date: "26 Sep 2026", status: "Completed" },
  { id: "wallet-demo-2", type: "investment", title: "Investment request", description: "Solar Energy Expansion", amount: -750, date: "25 Sep 2026", status: "Completed" },
  { id: "wallet-demo-3", type: "earning", title: "Opportunity earning", description: "Product Launch Campaign", amount: 320, date: "22 Sep 2026", status: "Completed" },
  { id: "wallet-demo-4", type: "withdrawal", title: "Withdrawal request", description: "Bank payout", amount: -180, date: "18 Sep 2026", status: "Pending" },
];

const filters = [
  { key: "all", label: "All activity" },
  { key: "funding", label: "Funding" },
  { key: "investment", label: "Investments" },
  { key: "earning", label: "Earnings" },
  { key: "withdrawal", label: "Withdrawals" },
];

function formatAmount(amount: number) {
  return (amount >= 0 ? "+" : "−") + "$" + Math.abs(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function transactionIcon(type: Transaction["type"]) {
  if (type === "funding") return "↓";
  if (type === "investment") return "↗";
  if (type === "earning") return "↑";
  if (type === "withdrawal") return "↘";
  return "↺";
}

function transactionTone(type: Transaction["type"]) {
  if (type === "investment" || type === "withdrawal") return "bg-rose-50 text-rose-600";
  return "bg-emerald-50 text-emerald-600";
}

export default function WalletPage() {
  const [filter, setFilter] = useState("all");

  const filteredTransactions = useMemo(
    () => filter === "all" ? transactions : transactions.filter((transaction) => transaction.type === filter),
    [filter]
  );

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">My ACEPA</p>
              <h1 className="mt-1 text-lg font-black">Wallet</h1>
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 lg:py-10">
          <section className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-xl">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.35fr_0.65fr] lg:p-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">Available balance</p>
                <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <p className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">$2,500.00</p>
                  <span className="mb-1 rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/70">Demo wallet</span>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                  Use your ACEPA wallet balance for eligible participation flows. Real funding, payouts and financial settlement will connect here when those services are enabled.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-purple-50" onClick={() => alert("Funding is a demo interface for now.")}>Add funds</button>
                  <button type="button" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10" onClick={() => alert("Withdrawals are a demo interface for now.")}>Withdraw</button>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Wallet overview</p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="text-sm text-white/55">Available</span><span className="text-sm font-black">$2,500.00</span></div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="text-sm text-white/55">Reserved</span><span className="text-sm font-black">$0.00</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-white/55">Pending payout</span><span className="text-sm font-black">$180.00</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Total funded", "$2,500.00", "Money added to wallet"],
              ["Invested", "$750.00", "Wallet-funded participation"],
              ["Earned", "$320.00", "Recorded ACEPA earnings"],
              ["Pending", "$180.00", "Awaiting payout"],
            ].map(([label, value, detail]) => (
              <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
                <p className="mt-2 text-2xl font-black tracking-[-0.04em]">{value}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p>
              </div>
            ))}
          </section>

          <section className="mt-7 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Wallet activity</p>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Recent transactions</h2>
                  </div>
                  <Link href="/activity" className="text-sm font-bold text-slate-700 hover:text-purple-700">View opportunity activity →</Link>
                </div>

                <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                  {filters.map((item) => (
                    <button key={item.key} type="button" onClick={() => setFilter(item.key)} className={"shrink-0 rounded-full px-4 py-2 text-xs font-bold transition " + (filter === item.key ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-700")}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-4 px-6 py-5 sm:px-7">
                    <div className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black " + transactionTone(transaction.type)}>{transactionIcon(transaction.type)}</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black">{transaction.title}</p>
                      <p className="mt-1 truncate text-xs font-medium text-slate-500">{transaction.description}</p>
                      <p className="mt-2 text-[11px] font-semibold text-slate-400">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={"text-sm font-black " + (transaction.amount < 0 ? "text-rose-600" : "text-emerald-600")}>{formatAmount(transaction.amount)}</p>
                      <span className={"mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black " + (transaction.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>{transaction.status}</span>
                    </div>
                  </div>
                ))}
                {filteredTransactions.length === 0 && <div className="px-6 py-12 text-center text-sm font-semibold text-slate-500">No wallet activity matches this filter.</div>}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Wallet actions</p>
                <h2 className="mt-2 text-xl font-black">Manage your funds</h2>
                <div className="mt-5 grid gap-3">
                  {[
                    ["Add funds", "Fund your ACEPA wallet"],
                    ["Withdraw", "Send available funds to a payout method"],
                    ["Payment methods", "Manage linked payment accounts"],
                  ].map(([title, description]) => (
                    <button key={title} type="button" className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 text-left transition hover:border-purple-200 hover:bg-purple-50/40" onClick={() => alert(title + " is a demo interface for now.")}>
                      <span>
                        <span className="block text-sm font-black">{title}</span>
                        <span className="mt-1 block text-xs leading-5 text-slate-500">{description}</span>
                      </span>
                      <span className="text-sm font-black text-slate-400">→</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-purple-100 bg-purple-50 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-700">Important</p>
                <h3 className="mt-2 text-lg font-black text-slate-950">Wallet is not a bank account.</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This prototype shows the user experience only. Real-money funding, investment settlement and withdrawals require the appropriate payment, identity and regulatory integrations.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </UserAccountShell>
  );
}
