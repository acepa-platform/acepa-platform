"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

type NoticeType = "opportunity" | "status" | "payment" | "deadline" | "system" | "mention";

type Notice = {
  id: string;
  type: NoticeType;
  title: string;
  body: string;
  time: string;
  group: "Today" | "Yesterday" | "Tomorrow";
  read: boolean;
  href?: string;
};

const demoNotifications: Notice[] = [
  { id: "n1", type: "status", title: "Your application is under review", body: "Smart Retail Innovation Challenge moved to Under Review.", time: "9:42 AM", group: "Today", read: false, href: "/notifications/n1" },
  { id: "n2", type: "opportunity", title: "A new opportunity matches your interests", body: "Solar Energy Expansion is now open for participation.", time: "8:15 AM", group: "Today", read: false, href: "/notifications/n2" },
  { id: "n3", type: "mention", title: "You were mentioned in an activity", body: "An update connected to your Regional Collaboration Lab participation.", time: "7:30 AM", group: "Today", read: false, href: "/notifications/n3" },
  { id: "n4", type: "payment", title: "Payment status updated", body: "Your demo investment payment status was recorded successfully.", time: "Yesterday", group: "Yesterday", read: true, href: "/notifications/n4" },
  { id: "n5", type: "deadline", title: "Opportunity deadline approaching", body: "Product Launch Campaign closes soon. Review the requirements.", time: "Yesterday", group: "Yesterday", read: true, href: "/notifications/n5" },
  { id: "n6", type: "status", title: "Participation accepted", body: "Your Regional Collaboration Lab participation has been accepted.", time: "Yesterday", group: "Yesterday", read: true, href: "/notifications/n6" },
  { id: "n7", type: "system", title: "Scheduled account reminder", body: "Review your profile and notification preferences tomorrow.", time: "Tomorrow", group: "Tomorrow", read: true, href: "/notifications/n7" },
];

const typeMeta: Record<NoticeType, { label: string; symbol: string; className: string }> = {
  opportunity: { label: "Opportunity", symbol: "✦", className: "bg-purple-50 text-purple-700" },
  status: { label: "Status", symbol: "↗", className: "bg-amber-50 text-amber-700" },
  payment: { label: "Payment", symbol: "$", className: "bg-emerald-50 text-emerald-700" },
  deadline: { label: "Deadline", symbol: "!", className: "bg-rose-50 text-rose-700" },
  system: { label: "System", symbol: "•", className: "bg-slate-100 text-slate-600" },
  mention: { label: "Mention", symbol: "@", className: "bg-blue-50 text-blue-700" },
};

export default function NotificationsPage() {
  const [items, setItems] = useState(demoNotifications);
  const [filter, setFilter] = useState<"All" | "Unread" | "Important" | "System" | "Mention">("All");
  const [search, setSearch] = useState("");

  const unreadCount = items.filter((item) => !item.read).length;

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Unread" && !item.read) ||
        (filter === "Important" && ["deadline", "payment", "status"].includes(item.type)) ||
        (filter === "System" && item.type === "system") ||
        (filter === "Mention" && item.type === "mention");

      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.body.toLowerCase().includes(query) ||
        typeMeta[item.type].label.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [items, filter, search]);

  function markRead(id: string) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, read: true } : item));
  }

  function markAllRead() {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
  }

  const groups = (["Today", "Yesterday", "Tomorrow"] as const).map((group) => ({
    group,
    items: filtered.filter((item) => item.group === group),
  }));

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-[1180px] items-center gap-4 px-4 sm:px-6 lg:px-8">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-600">My ACEPA</p>
              <h1 className="mt-1 text-base font-black sm:text-lg">Notifications</h1>
            </div>

            <div className="relative ml-auto hidden w-full max-w-md md:block">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search notifications..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm font-medium outline-none transition focus:border-purple-300 focus:bg-white"
              />
            </div>

            <UserAccountActions />
          </div>

          <div className="border-t border-slate-100 bg-white md:hidden">
            <div className="mx-auto max-w-[1180px] px-4 py-3 sm:px-6">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search notifications..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm font-medium outline-none focus:border-purple-300 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="w-full px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <section className="w-full">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-600">Notification center</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Stay informed.</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Everything happening on ACEPA that needs your attention, from opportunity updates to account activity.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="rounded-full bg-purple-50 px-3 py-2 text-xs font-black text-purple-700">{unreadCount} unread</span>
                <Link
                  href="/settings?section=notifications"
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:border-purple-200 hover:text-purple-700"
                >
                  Notification settings
                </Link>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {(["All", "Unread", "Important", "System", "Mention"] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={"shrink-0 rounded-full px-4 py-2 text-xs font-bold transition " + (
                      filter === item
                        ? "bg-slate-950 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-700"
                    )}
                  >
                    {item}{item === "Unread" ? " (" + unreadCount + ")" : ""}
                  </button>
                ))}
              </div>

              <button
                onClick={markAllRead}
                disabled={unreadCount === 0}
                className="hidden shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:border-purple-200 hover:text-purple-700 disabled:cursor-not-allowed disabled:opacity-50 sm:block"
              >
                Mark all as read
              </button>
            </div>

            <button
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 disabled:opacity-50 sm:hidden"
            >
              Mark all as read
            </button>

            <div className="mt-7 w-full space-y-8">
              {groups.map(({ group, items: groupItems }) => (
                <section key={group}>
                  <div className="mb-3 flex items-center gap-3">
                    <h3 className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{group}</h3>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    {groupItems.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {groupItems.map((item) => {
                          const meta = typeMeta[item.type];
                          return (
                            <Link
                              key={item.id}
                              href={item.href || "#"}
                              onClick={() => markRead(item.id)}
                              className={"group flex min-h-[82px] items-center gap-3 px-4 py-3 transition hover:bg-slate-50 sm:px-5 " + (!item.read ? "bg-purple-50/30" : "")}
                            >
                              <div className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black " + meta.className}>
                                {meta.symbol}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  {!item.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />}
                                  <p className={"truncate text-sm font-bold " + (!item.read ? "text-slate-950" : "text-slate-700")}>{item.title}</p>
                                </div>
                                <p className="mt-0.5 truncate text-xs text-slate-500">{item.body}</p>
                              </div>

                              <div className="flex shrink-0 items-center gap-2">
                                <span className="hidden rounded-full bg-slate-100 px-2 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-slate-500 sm:inline">
                                  {meta.label}
                                </span>
                                <span className="text-[11px] font-semibold text-slate-400">{item.time}</span>
                              </div>

                              {!item.read && (
                                <button
                                  onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    markRead(item.id);
                                  }}
                                  className="hidden text-[11px] font-bold text-slate-400 hover:text-slate-950 sm:block"
                                >
                                  Read
                                </button>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="px-5 py-8 text-center text-sm text-slate-400">No notifications here.</div>
                    )}
                  </div>
                </section>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-lg">✓</div>
                <h3 className="mt-3 text-base font-black">You’re all caught up</h3>
                <p className="mt-1 text-sm text-slate-500">No notifications match your search or filters.</p>
              </div>
            )}

            <div className="mt-6 border-t border-slate-200 pt-5 text-xs text-slate-400">
              Notification center preview · Live notifications will connect to ACEPA opportunity, participation, payment and account events.
            </div>
          </section>
        </div>
      </main>
    </UserAccountShell>
  );
}
