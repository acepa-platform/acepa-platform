"use client";

import { useEffect, useState } from "react";
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
  reference_id: string;
  submitted_at: string;
};

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

function paymentLabel(paymentStatus: string | null) {
  if (paymentStatus === "successful_demo") return "Successful (Demo)";
  if (paymentStatus === "successful") return "Successful";
  if (paymentStatus === "pending") return "Pending";
  if (paymentStatus === "failed") return "Failed";
  if (paymentStatus === "refunded") return "Refunded";
  return "Not required";
}

export default function ActivityPage() {
  const router = useRouter();
  const [items, setItems] = useState<Participation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    loadActivity();
  }, []);

  async function loadActivity() {
    setLoading(true);
    setError("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/sign-in?next=/activity");
      return;
    }

    const { data, error: queryError } = await supabase
      .from("opportunity_participations")
      .select("id,opportunity_slug,opportunity_title,company_name,category,action,status,payment_status,amount,currency,reference_id,submitted_at")
      .order("submitted_at", { ascending: false });

    if (queryError) {
      setError("We could not load your opportunity activity right now.");
      setItems([]);
    } else {
      setItems((data || []) as Participation[]);
    }

    setLoading(false);
  }

  const filteredItems = filter === "All"
    ? items
    : items.filter((item) => item.category === filter);

  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">My ACEPA</p>
              <h1 className="mt-1 text-lg font-black">Activity</h1>
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 lg:py-10">
          <section className="rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">Opportunity activity</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Track everything you have participated in.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
              Your applications, investment requests, collaborations, partnerships, expert applications and other opportunity activity will appear here.
            </p>
          </section>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={"shrink-0 rounded-full px-4 py-2 text-xs font-bold transition " + (
                  filter === category
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-700"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-500">
              Loading your activity...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl">↗</div>
              <h3 className="mt-4 text-lg font-black">No opportunity activity yet</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Participate in an opportunity and your submission record will appear here automatically.
              </p>
              <Link href="/opportunities" className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700">
                Explore opportunities →
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {filteredItems.map((item) => (
                <Link
                  key={item.id}
                  href={"/activity/" + item.id}
                  className="group block rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-lg sm:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-purple-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-purple-700">{item.category}</span>
                        <span className={"rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] " + statusClasses(item.status)}>
                          {statusLabels[item.status] || item.status}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-black tracking-[-0.02em] group-hover:text-purple-700">{item.opportunity_title}</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{item.company_name} · {item.action}</p>
                      <p className="mt-3 text-xs text-slate-400">
                        {new Date(item.submitted_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                        {" · "}
                        Ref {item.reference_id}
                      </p>
                    </div>

                    <div className="grid shrink-0 gap-2 sm:grid-cols-3 lg:min-w-[330px]">
                      {item.amount !== null && (
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Amount</p>
                          <p className="mt-1 text-sm font-black text-slate-800">{item.currency} {Number(item.amount).toLocaleString()}</p>
                        </div>
                      )}
                      <div className="rounded-2xl bg-slate-50 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Payment</p>
                        <p className="mt-1 text-sm font-black text-slate-800">{paymentLabel(item.payment_status)}</p>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-slate-950 p-3 text-white">
                        <span className="text-xs font-bold">View record</span>
                        <span aria-hidden="true">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </UserAccountShell>
  );
}
