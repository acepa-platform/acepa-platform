"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

type Tab = "overview" | "transfer" | "transactions";

type Transaction = {
  id: string;
  type: "funding" | "investment" | "earning" | "withdrawal" | "transfer-received" | "transfer-sent";
  title: string;
  description: string;
  amount: number;
  date: string;
  status: "Completed" | "Pending" | "Successful (Demo)";
};

const transactions: Transaction[] = [
  { id: "wallet-demo-1", type: "funding", title: "Wallet funding", description: "Demo payment account funding", amount: 2500, date: "26 Sep 2026", status: "Completed" },
  { id: "wallet-demo-2", type: "investment", title: "Investment request", description: "Solar Energy Expansion", amount: -750, date: "25 Sep 2026", status: "Successful (Demo)" },
  { id: "wallet-demo-3", type: "transfer-received", title: "Transfer received", description: "From Nina Okafor", amount: 250, date: "24 Sep 2026", status: "Completed" },
  { id: "wallet-demo-4", type: "earning", title: "Opportunity earning", description: "Product Launch Campaign", amount: 320, date: "22 Sep 2026", status: "Completed" },
  { id: "wallet-demo-5", type: "transfer-sent", title: "Transfer sent", description: "To Daniel Eze", amount: -120, date: "21 Sep 2026", status: "Completed" },
  { id: "wallet-demo-6", type: "withdrawal", title: "Withdrawal request", description: "Bank payout", amount: -180, date: "18 Sep 2026", status: "Pending" },
];

const filters = [
  { key: "all", label: "All activity" },
  { key: "transfer-received", label: "Received" },
  { key: "transfer-sent", label: "Sent" },
  { key: "funding", label: "Funding" },
  { key: "investment", label: "Investments" },
  { key: "earning", label: "Earnings" },
  { key: "withdrawal", label: "Withdrawals" },
];

const demoMembers = [
  { name: "Nina Okafor", handle: "@ninaokafor", initials: "NO" },
  { name: "Daniel Eze", handle: "@danieleze", initials: "DE" },
  { name: "Amaka Nwosu", handle: "@amakanwosu", initials: "AN" },
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
  if (type === "earning" || type === "transfer-received") return "↑";
  if (type === "withdrawal" || type === "transfer-sent") return "↘";
  return "↺";
}

function transactionTone(type: Transaction["type"]) {
  if (type === "investment" || type === "withdrawal" || type === "transfer-sent") return "bg-rose-50 text-rose-600";
  return "bg-emerald-50 text-emerald-600";
}

export default function WalletPage() {
  const [filter, setFilter] = useState("all");
  const [tab, setTab] = useState<Tab>("overview");
  const [balance, setBalance] = useState(2500);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [transferStep, setTransferStep] = useState<"form" | "review" | "complete">("form");
  const [transferMessage, setTransferMessage] = useState("");

  const filteredTransactions = useMemo(
    () => filter === "all" ? transactions : transactions.filter((transaction) => transaction.type === filter),
    [filter]
  );

  const matchingMembers = useMemo(() => {
    const query = recipient.trim().toLowerCase();
    if (!query) return demoMembers;
    return demoMembers.filter((member) =>
      member.name.toLowerCase().includes(query) || member.handle.toLowerCase().includes(query)
    );
  }, [recipient]);

  const numericAmount = Number(amount);
  const canReview = Boolean(recipient.trim()) &&
    Number.isFinite(numericAmount) &&
    numericAmount >= 1 &&
    numericAmount <= balance;

  function reviewTransfer() {
    setTransferMessage("");
    if (!canReview) {
      setTransferMessage("Choose an ACEPA member and enter an amount within your available balance.");
      return;
    }
    setTransferStep("review");
  }

  function confirmDemoTransfer() {
    if (!canReview) return;
    setBalance((current) => current - numericAmount);
    setTransferStep("complete");
  }

  function resetTransfer() {
    setRecipient("");
    setAmount("");
    setNote("");
    setTransferStep("form");
    setTransferMessage("");
  }

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
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">ACEPA Wallet</p>
                <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <p className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <span className="mb-1 rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/70">Demo wallet</span>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                  Use your ACEPA wallet for eligible participation flows and transfers between ACEPA members.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setTab("transfer")} className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-purple-50">Transfer to member</button>
                  <button type="button" onClick={() => alert("Funding is a demo interface for now.")} className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Add funds</button>
                  <button type="button" onClick={() => alert("Withdrawals are a demo interface for now.")} className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Withdraw</button>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Wallet overview</p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="text-sm text-white/55">Available</span><span className="text-sm font-black">${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="text-sm text-white/55">Reserved</span><span className="text-sm font-black">$0.00</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-white/55">Pending payout</span><span className="text-sm font-black">$180.00</span></div>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {([
              ["overview", "Overview"],
              ["transfer", "Transfer"],
              ["transactions", "Transactions"],
            ] as const).map(([value, label]) => (
              <button key={value} type="button" onClick={() => setTab(value)} className={"shrink-0 rounded-xl px-4 py-2.5 text-xs font-black transition " + (tab === value ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-700")}>
                {label}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <>
              <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Available", "${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}", "Ready for eligible use"],
                  ["Reserved", "$0.00", "Currently reserved"],
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
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Wallet activity</p>
                        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Recent transactions</h2>
                      </div>
                      <button type="button" onClick={() => setTab("transactions")} className="text-sm font-bold text-slate-700 hover:text-purple-700">View all →</button>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {transactions.slice(0, 4).map((transaction) => (
                      <div key={transaction.id} className="flex items-center gap-4 px-6 py-5 sm:px-7">
                        <div className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black " + transactionTone(transaction.type)}>{transactionIcon(transaction.type)}</div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-black">{transaction.title}</p>
                          <p className="mt-1 truncate text-xs font-medium text-slate-500">{transaction.description} · {transaction.date}</p>
                        </div>
                        <p className={"text-sm font-black " + (transaction.amount < 0 ? "text-rose-600" : "text-emerald-600")}>{formatAmount(transaction.amount)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-purple-100 bg-purple-50 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-700">Member transfers</p>
                  <h2 className="mt-2 text-xl font-black">Send and receive inside ACEPA.</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    The user wallet is designed to support direct member-to-member transfers, separate from unrestricted messaging.
                  </p>
                  <button type="button" onClick={() => setTab("transfer")} className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-purple-700">Start a transfer →</button>
                </div>
              </section>
            </>
          )}

          {tab === "transfer" && (
            <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600">ACEPA member transfer</p>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">Send money to another user</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">Use a member name or username to select the recipient.</p>
                  </div>
                  {transferStep !== "form" && <button type="button" onClick={resetTransfer} className="text-xs font-black text-purple-700">Start over</button>}
                </div>

                {transferStep === "form" && (
                  <>
                    <label className="mt-6 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">Recipient</label>
                    <input value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder="Member name or @username" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-purple-500" />
                    <div className="mt-3 grid gap-2">
                      {matchingMembers.map((member) => (
                        <button key={member.handle} type="button" onClick={() => setRecipient(member.handle)} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-left transition hover:border-purple-100 hover:bg-purple-50">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-xs font-black text-purple-700">{member.initials}</span>
                          <span className="min-w-0">
                            <span className="block text-sm font-black">{member.name}</span>
                            <span className="block text-xs text-slate-400">{member.handle}</span>
                          </span>
                        </button>
                      ))}
                    </div>

                    <label className="mt-5 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">Amount</label>
                    <div className="mt-2 flex h-12 overflow-hidden rounded-xl border border-slate-200 focus-within:border-purple-500">
                      <span className="flex items-center bg-slate-50 px-4 text-sm font-black text-slate-500">USD</span>
                      <input value={amount} onChange={(event) => setAmount(event.target.value.replace(/[^0-9.]/g, ""))} inputMode="decimal" placeholder="0.00" className="min-w-0 flex-1 px-4 text-sm font-semibold outline-none" />
                    </div>

                    <label className="mt-5 block text-xs font-black uppercase tracking-[0.12em] text-slate-500">Note <span className="font-semibold normal-case tracking-normal text-slate-400">(optional)</span></label>
                    <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3} placeholder="Add a short transfer note" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-purple-500" />

                    {transferMessage && <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{transferMessage}</p>}

                    <button type="button" onClick={reviewTransfer} disabled={!canReview} className="mt-5 w-full rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40">Review transfer →</button>
                  </>
                )}

                {transferStep === "review" && (
                  <div className="mt-6">
                    <div className="rounded-2xl bg-slate-50 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Review transfer</p>
                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between gap-4"><span className="text-sm text-slate-500">Recipient</span><span className="text-sm font-black">{recipient}</span></div>
                        <div className="flex justify-between gap-4"><span className="text-sm text-slate-500">Amount</span><span className="text-sm font-black">USD {numericAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
                        <div className="flex justify-between gap-4"><span className="text-sm text-slate-500">Transfer fee</span><span className="text-sm font-black">USD 0.00</span></div>
                        {note && <div className="border-t border-slate-200 pt-3"><span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Note</span><p className="mt-1 text-sm font-semibold">{note}</p></div>}
                        <div className="flex justify-between gap-4 border-t border-slate-200 pt-3"><span className="text-sm font-black">Total</span><span className="text-sm font-black">USD {numericAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-800">
                      Prototype only. This confirmation does not move real money or credit a recipient.
                    </div>
                    <button type="button" onClick={confirmDemoTransfer} className="mt-4 w-full rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-purple-700">Confirm demo transfer</button>
                  </div>
                )}

                {transferStep === "complete" && (
                  <div className="mt-6 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-700">✓</div>
                    <h3 className="mt-5 text-2xl font-black">Transfer recorded</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">The prototype recorded a demo transfer of USD {numericAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} to {recipient}.</p>
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-amber-700">Demo · No real money moved</p>
                    <button type="button" onClick={resetTransfer} className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-purple-700">Make another transfer</button>
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Transfer design</p>
                <h2 className="mt-2 text-xl font-black">Member-to-member transfers</h2>
                <div className="mt-5 space-y-4">
                  {[
                    ["1", "Find the member", "Search for the verified ACEPA username or member name."],
                    ["2", "Enter the amount", "The transfer should be limited to available wallet balance."],
                    ["3", "Review before sending", "Show recipient, amount, fee and note before confirmation."],
                    ["4", "Authenticate", "The production transfer should require the appropriate authentication step."],
                  ].map(([number, title, description]) => (
                    <div key={number} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-white">{number}</span>
                      <div>
                        <p className="text-sm font-black">{title}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Separate from messaging</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Transfer is a wallet function. It does not create unrestricted user-to-user direct messaging.</p>
                </div>
              </div>
            </section>
          )}

          {tab === "transactions" && (
            <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Wallet activity</p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Transactions</h2>
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
                  <div key={transaction.id} className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                    <div className="flex items-center gap-3">
                      <div className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black " + transactionTone(transaction.type)}>{transactionIcon(transaction.type)}</div>
                      <div>
                        <p className="text-sm font-black">{transaction.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{transaction.description} · {transaction.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <span className={"rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] " + (transaction.status === "Completed" ? "bg-emerald-50 text-emerald-700" : transaction.status === "Successful (Demo)" ? "bg-amber-50 text-amber-700" : "bg-slate-50 text-slate-600")}>{transaction.status}</span>
                      <span className={"text-sm font-black " + (transaction.amount < 0 ? "text-rose-600" : "text-emerald-600")}>{formatAmount(transaction.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/settings" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-purple-200 hover:text-purple-700">Manage payment methods</Link>
            <Link href="/activity" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-purple-200 hover:text-purple-700">View opportunity activity</Link>
          </div>
        </div>
      </main>
    </UserAccountShell>
  );
}
