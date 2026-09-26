"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

type Notice = {
  id: string;
  type: "opportunity" | "status" | "payment" | "deadline" | "system";
  title: string;
  body: string;
  time: string;
  read: boolean;
  href?: string;
};

const demoNotifications: Notice[] = [
  {
    id: "n1",
    type: "status",
    title: "Your application is under review",
    body: "Your Smart Retail Innovation Challenge submission has moved to Under Review.",
    time: "15 min ago",
    read: false,
    href: "/activity/demo-activity-innovation",
  },
  {
    id: "n2",
    type: "opportunity",
    title: "A new opportunity matches your interests",
    body: "Solar Energy Expansion is now open for participation.",
    time: "1 hour ago",
    read: false,
    href: "/opportunities/demo-solar-energy-expansion",
  },
  {
    id: "n3",
    type: "payment",
    title: "Payment status updated",
    body: "Your demo investment payment status has been recorded successfully.",
    time: "3 hours ago",
    read: true,
    href: "/investments/demo-investment-sungrid",
  },
  {
    id: "n4",
    type: "deadline",
    title: "Opportunity deadline approaching",
    body: "Product Launch Campaign closes soon. Review the requirements before the deadline.",
    time: "Yesterday",
    read: true,
    href: "/opportunities/demo-product-launch-campaign",
  },
  {
    id: "n5",
    type: "status",
    title: "Participation accepted",
    body: "Your Regional Collaboration Lab participation has been accepted.",
    time: "Yesterday",
    read: true,
    href: "/activity/demo-activity-collaboration",
  },
  {
    id: "n6",
    type: "system",
    title: "Welcome to ACEPA",
    body: "Your account is ready. Complete your profile to make future opportunity applications easier.",
    time: "2 days ago",
    read: true,
    href: "/profile",
  },
];

const typeMeta: Record<Notice["type"], { label: string; symbol: string; className: string }> = {
  opportunity: { label: "Opportunity", symbol: "✦", className: "bg-purple-50 text-purple-700" },
  status: { label: "Status", symbol: "↗", className: "bg-amber-50 text-amber-700" },
  payment: { label: "Payment", symbol: "$", className: "bg-emerald-50 text-emerald-700" },
  deadline: { label: "Deadline", symbol: "!", className: "bg-rose-50 text-rose-700" },
  system: { label: "System", symbol: "•", className: "bg-slate-100 text-slate-600" },
};

export default function NotificationsPage() {
  const [items, setItems] = useState(demoNotifications);
  const [filter, setFilter] = useState<"All" | "Unread">("All");
  const [type, setType] = useState<"All" | Notice["type"]>("All");

  const unreadCount = items.filter((item) => !item.read).length;

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const matchesRead = filter === "All" || !item.read;
        const matchesType = type === "All" || item.type === type;
        return matchesRead && matchesType;
      }),
    [items, filter, type]
  );

  function markRead(id: string) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, read: true } : item));
  }

  function markAllRead() {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
  }

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">My ACEPA</p>
              <h1 className="mt-1 text-lg font-black">Notifications</h1>
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6 lg:py-10">
          <section className="rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">Stay informed</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Everything that needs your attention.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
                  Opportunity updates, submission status changes, payment updates, deadlines and important ACEPA account notices.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">Unread</p>
                <p className="mt-1 text-2xl font-black">{unreadCount}</p>
              </div>
            </div>
          </section>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {(["All", "Unread"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={"shrink-0 rounded-full px-4 py-2 text-xs font-bold " + (filter === item ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600")}
                >
                  {item}{item === "Unread" ? " (" + unreadCount + ")" : ""}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <select
                value={type}
                onChange={(event) => setType(event.target.value as "All" | Notice["type"])}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 outline-none focus:border-purple-500"
              >
                <option value="All">All types</option>
                <option value="opportunity">Opportunities</option>
                <option value="status">Status updates</option>
                <option value="payment">Payments</option>
                <option value="deadline">Deadlines</option>
                <option value="system">System</option>
              </select>
              <button
                onClick={markAllRead}
                disabled={unreadCount === 0}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-purple-200 hover:text-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Mark all read
              </button>
            </div>
          </div>

          <section className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="divide-y divide-slate-100">
              {filtered.map((item) => {
                const meta = typeMeta[item.type];
                const content = (
                  <>
                    <div className="flex gap-4">
                      <div className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black " + meta.className}>{meta.symbol}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className={"text-sm font-black " + (!item.read ? "text-slate-950" : "text-slate-700")}>{item.title}</h3>
                            {!item.read && <span className="h-2 w-2 rounded-full bg-purple-600" aria-label="Unread" />}
                          </div>
                          <span className="shrink-0 text-xs font-semibold text-slate-400">{item.time}</span>
                        </div>
                        <span className={"mt-2 inline-flex rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] " + meta.className}>{meta.label}</span>
                        <p className="mt-2 text-sm leading-6 text-slate-500">{item.body}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-purple-700">{item.href ? "Open related item →" : ""}</span>
                      {!item.read && (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            markRead(item.id);
                          }}
                          className="text-xs font-bold text-slate-500 hover:text-slate-950"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </>
                );

                return item.href ? (
                  <Link key={item.id} href={item.href} onClick={() => markRead(item.id)} className={"group block p-5 transition hover:bg-slate-50 sm:p-6 " + (!item.read ? "bg-purple-50/30" : "")}>
                    {content}
                  </Link>
                ) : (
                  <div key={item.id} className={"p-5 sm:p-6 " + (!item.read ? "bg-purple-50/30" : "")}>{content}</div>
                );
              })}

              {filtered.length === 0 && (
                <div className="px-6 py-14 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl">✓</div>
                  <h3 className="mt-4 text-lg font-black">You’re all caught up</h3>
                  <p className="mt-2 text-sm text-slate-500">There are no notifications matching these filters.</p>
                </div>
              )}
            </div>
          </section>

          <div className="mt-6 rounded-3xl border border-purple-100 bg-purple-50 p-5 text-sm leading-6 text-purple-900">
            <span className="font-black">Demo notification center.</span> These sample notifications are here for the user interface. Live notifications will later connect to ACEPA opportunity, activity, payment and account events.
          </div>
        </div>
      </main>
    </UserAccountShell>
  );
}
