"use client";

import { use } from "react";
import Link from "next/link";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

type Notice = {
  id: string;
  type: "opportunity" | "status" | "payment" | "deadline" | "system";
  title: string;
  body: string;
  time: string;
  href?: string;
  relatedLabel?: string;
  details: string[];
};

const notifications: Notice[] = [
  {
    id: "n1",
    type: "status",
    title: "Your application is under review",
    body: "Your Smart Retail Innovation Challenge submission has moved to Under Review.",
    time: "15 min ago",
    href: "/activity/demo-activity-innovation",
    relatedLabel: "View activity record",
    details: [
      "Opportunity: Smart Retail Innovation Challenge",
      "Company: Nexa Retail Group",
      "Current status: Under Review",
      "Your submission has been received and is being evaluated.",
      "The next update will appear in your activity record when the participation status changes.",
    ],
  },
  {
    id: "n2",
    type: "opportunity",
    title: "A new opportunity matches your interests",
    body: "Solar Energy Expansion is now open for participation.",
    time: "1 hour ago",
    href: "/opportunities/demo-solar-energy-expansion",
    relatedLabel: "View opportunity",
    details: [
      "Opportunity: Solar Energy Expansion",
      "Type: Investment",
      "Status: Open",
      "This opportunity is currently available for eligible ACEPA members to review.",
      "Open the opportunity page to review the full terms, requirements and participation options.",
    ],
  },
  {
    id: "n3",
    type: "payment",
    title: "Payment status updated",
    body: "Your demo investment payment status has been recorded successfully.",
    time: "3 hours ago",
    href: "/investments/demo-investment-sungrid",
    relatedLabel: "View investment",
    details: [
      "Investment: Solar Energy Expansion",
      "Payment status: Successful (Demo)",
      "Amount: USD 2,500",
      "Reference: ACEPA-DEMO-INV-001",
      "This is a demo payment record. No real money was debited, transferred or reserved.",
    ],
  },
  {
    id: "n4",
    type: "deadline",
    title: "Opportunity deadline approaching",
    body: "Product Launch Campaign closes soon. Review the requirements before the deadline.",
    time: "Yesterday",
    href: "/opportunities/demo-product-launch-campaign",
    relatedLabel: "View opportunity",
    details: [
      "Opportunity: Product Launch Campaign",
      "Type: Marketing",
      "Notice type: Deadline reminder",
      "The opportunity is approaching its closing date.",
      "Review the opportunity details before deciding whether to participate.",
    ],
  },
  {
    id: "n5",
    type: "status",
    title: "Participation accepted",
    body: "Your Regional Collaboration Lab participation has been accepted.",
    time: "Yesterday",
    href: "/activity/demo-activity-collaboration",
    relatedLabel: "View activity record",
    details: [
      "Opportunity: Regional Collaboration Lab",
      "Current status: Accepted",
      "Your participation has moved beyond the review stage.",
      "Any next steps or engagement instructions will appear in the activity record.",
    ],
  },
  {
    id: "n6",
    type: "system",
    title: "Welcome to ACEPA",
    body: "Your account is ready. Complete your profile to make future opportunity applications easier.",
    time: "2 days ago",
    href: "/profile",
    relatedLabel: "View profile",
    details: [
      "Notification type: Account",
      "Your ACEPA account is active.",
      "Keeping your profile information current can make future opportunity applications easier.",
      "You can update your profile at any time.",
    ],
  },
];

const typeMeta: Record<Notice["type"], { label: string; symbol: string; className: string }> = {
  opportunity: { label: "Opportunity", symbol: "✦", className: "bg-purple-50 text-purple-700" },
  status: { label: "Status", symbol: "↗", className: "bg-amber-50 text-amber-700" },
  payment: { label: "Payment", symbol: "$", className: "bg-emerald-50 text-emerald-700" },
  deadline: { label: "Deadline", symbol: "!", className: "bg-rose-50 text-rose-700" },
  system: { label: "System", symbol: "•", className: "bg-slate-100 text-slate-600" },
};

export default function NotificationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const notice = notifications.find((item) => item.id === id);

  if (!notice) {
    return (
      <UserAccountShell>
        <main className="min-h-screen bg-[#f7f8fc] p-6 text-slate-950 sm:p-10">
          <div className="mx-auto max-w-[900px]">
            <Link href="/notifications" className="text-sm font-bold text-slate-600 hover:text-purple-700">
              ← Back to notifications
            </Link>
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8">
              <h1 className="text-2xl font-black">Notification not found</h1>
              <p className="mt-2 text-sm text-slate-500">This notification is no longer available.</p>
            </div>
          </div>
        </main>
      </UserAccountShell>
    );
  }

  const meta = typeMeta[notice.type];

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">My ACEPA</p>
              <h1 className="mt-1 text-lg font-black">Notification details</h1>
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-6 lg:py-10">
          <Link
            href="/notifications"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-purple-700"
          >
            ← Back to notifications
          </Link>

          <article className="mt-5 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className={"flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-base font-black " + meta.className}>
                  {meta.symbol}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={"rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] " + meta.className}>
                      {meta.label}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{notice.time}</span>
                  </div>
                  <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">{notice.title}</h2>
                  <p className="mt-3 text-base leading-7 text-slate-500">{notice.body}</p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Full details</p>
              <div className="mt-4 space-y-3">
                {notice.details.map((detail) => (
                  <div key={detail} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700">
                    {detail}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                {notice.href && (
                  <Link
                    href={notice.href}
                    className="rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-purple-700"
                  >
                    {notice.relatedLabel || "View related item"} →
                  </Link>
                )}
                <Link
                  href="/notifications"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-purple-200 hover:text-purple-700"
                >
                  Return to notifications
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>
    </UserAccountShell>
  );
}
