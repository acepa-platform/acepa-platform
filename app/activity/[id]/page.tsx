"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

type Participation = {
  id: string;
  opportunity_slug: string;
  opportunity_title: string;
  company_name: string;
  category: string;
  action: string;
  status: string;
  payment_status: string | null;
  amount: number | null;
  currency: string;
  funding_source: string | null;
  reference_id: string;
  details: Record<string, unknown>;
  submitted_at: string;
  updated_at: string;
};

const statusSteps = [
  ["submitted", "Submitted"],
  ["under_review", "Under Review"],
  ["shortlisted", "Shortlisted"],
  ["accepted", "Accepted"],
  ["in_progress", "In Progress"],
  ["completed", "Completed"],
] as const;

function formatLabel(value: string) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function paymentLabel(value: string | null) {
  if (value === "successful_demo") return "Successful (Demo)";
  if (value === "successful") return "Successful";
  if (value === "pending") return "Pending";
  if (value === "failed") return "Failed";
  if (value === "refunded") return "Refunded";
  return "Not required";
}

export default function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [item, setItem] = useState<Participation | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadRecord();
  }, [id]);

  async function loadRecord() {
    setLoading(true);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/sign-in?next=/activity/" + id);
      return;
    }

    const { data, error } = await supabase
      .from("opportunity_participations")
      .select("id,opportunity_slug,opportunity_title,company_name,category,action,status,payment_status,amount,currency,funding_source,reference_id,details,submitted_at,updated_at")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      setNotFound(true);
      setItem(null);
    } else {
      setItem(data as Participation);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <UserAccountShell>
        <main className="min-h-screen bg-[#f7f8fc]">
          <div className="mx-auto max-w-[960px] px-4 py-12 text-center text-sm font-semibold text-slate-500">Loading activity record...</div>
        </main>
      </UserAccountShell>
    );
  }

  if (notFound || !item) {
    return (
      <UserAccountShell>
        <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
          <div className="mx-auto max-w-[800px] px-4 py-12">
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h1 className="text-xl font-black">Activity record not found</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">This record may no longer be available on your account.</p>
              <Link href="/activity" className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700">Back to activity</Link>
            </div>
          </div>
        </main>
      </UserAccountShell>
    );
  }

  const currentIndex = statusSteps.findIndex(([value]) => value === item.status);

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div>
              <button onClick={() => router.push("/activity")} className="text-xs font-bold text-slate-500 hover:text-purple-700">← Back to Activity</button>
              <p className="mt-1 text-sm font-black">Participation record</p>
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto max-w-[960px] px-4 py-8 sm:px-6 lg:py-10">
          <section className="rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-purple-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-purple-200">{item.category}</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/70">{formatLabel(item.status)}</span>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-[-0.04em]">{item.opportunity_title}</h1>
            <p className="mt-2 text-sm text-white/60">{item.company_name} · {item.action}</p>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Progress</p>
            <h2 className="mt-2 text-xl font-black">Your participation journey</h2>

            <div className="mt-6 space-y-4">
              {statusSteps.map(([value, label], index) => {
                const reached = currentIndex >= 0 ? index <= currentIndex : value === item.status;
                return (
                  <div key={value} className="flex items-center gap-3">
                    <div className={"flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black " + (reached ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-400")}>
                      {reached ? "✓" : index + 1}
                    </div>
                    <div className={"h-1 flex-1 rounded-full " + (reached ? "bg-slate-950" : "bg-slate-100")} />
                    <p className={"w-28 text-right text-xs font-black " + (reached ? "text-slate-900" : "text-slate-400")}>{label}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Record</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Reference ID</p>
                <p className="mt-1 break-all text-sm font-black text-slate-800">{item.reference_id}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Submitted</p>
                <p className="mt-1 text-sm font-black text-slate-800">{new Date(item.submitted_at).toLocaleString()}</p>
              </div>
              {item.amount !== null && (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Amount</p>
                  <p className="mt-1 text-sm font-black text-slate-800">{item.currency} {Number(item.amount).toLocaleString()}</p>
                </div>
              )}
              {item.payment_status && (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Payment status</p>
                  <p className="mt-1 text-sm font-black text-slate-800">{paymentLabel(item.payment_status)}</p>
                </div>
              )}
              {item.funding_source && (
                <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Funding source</p>
                  <p className="mt-1 text-sm font-black text-slate-800">{item.funding_source}</p>
                </div>
              )}
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Your submission</p>
            <div className="mt-5 space-y-3">
              {Object.entries(item.details || {}).map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{key}</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-800">{String(value)}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={"/opportunities/" + item.opportunity_slug} className="rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white hover:bg-purple-700">View opportunity</Link>
            <Link href="/activity" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-700 hover:border-purple-200 hover:text-purple-700">Back to activity</Link>
          </div>
        </div>
      </main>
    </UserAccountShell>
  );
}
