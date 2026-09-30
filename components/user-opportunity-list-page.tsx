"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

type ListType = "saved" | "watchlist";

type Item = {
  id: string;
  opportunity_slug: string;
  opportunity_title: string;
  company_name: string;
  category: string;
  created_at: string;
};

export default function UserOpportunityListPage({ listType }: { listType: ListType }) {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const demoItems: Item[] = isWatchlist ? [
    { id: "demo-watch-1", opportunity_slug: "solar-energy-expansion", opportunity_title: "Solar Energy Expansion", company_name: "SunGrid Energy Ltd.", category: "Investment", created_at: "2026-09-24T10:00:00Z" },
    { id: "demo-watch-2", opportunity_slug: "smart-retail-challenge", opportunity_title: "Smart Retail Innovation Challenge", company_name: "Nexa Retail Group", category: "Innovation", created_at: "2026-09-22T10:00:00Z" },
    { id: "demo-watch-3", opportunity_slug: "product-launch-campaign", opportunity_title: "Product Launch Campaign", company_name: "Velo Mobility", category: "Marketing", created_at: "2026-09-20T10:00:00Z" },
  ] : [
    { id: "demo-saved-1", opportunity_slug: "solar-energy-expansion", opportunity_title: "Solar Energy Expansion", company_name: "SunGrid Energy Ltd.", category: "Investment", created_at: "2026-09-24T10:00:00Z" },
    { id: "demo-saved-2", opportunity_slug: "ai-customer-support-challenge", opportunity_title: "AI Customer Support Challenge", company_name: "Nova Commerce", category: "Innovation", created_at: "2026-09-21T10:00:00Z" },
    { id: "demo-saved-3", opportunity_slug: "product-launch-campaign", opportunity_title: "New Product Launch Campaign", company_name: "Velo Mobility", category: "Marketing", created_at: "2026-09-19T10:00:00Z" },
  ];

  const isWatchlist = listType === "watchlist";
  const title = isWatchlist ? "Watchlist" : "Saved";
  const eyebrow = isWatchlist ? "Track opportunities" : "Your collection";
  const description = isWatchlist
    ? "Keep opportunities you want to monitor close at hand."
    : "Keep opportunities you want to revisit in one place.";

  useEffect(() => {
    loadItems();
  }, [listType]);

  async function loadItems() {
    setLoading(true);
    setError("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/sign-in?next=/" + listType);
      return;
    }

    const { data, error: queryError } = await supabase
      .from("user_opportunity_lists")
      .select("id,opportunity_slug,opportunity_title,company_name,category,created_at")
      .eq("list_type", listType)
      .order("created_at", { ascending: false });

    if (queryError) {
      setError("We could not load your " + title.toLowerCase() + " right now.");
      setItems(demoItems);
    } else {
      setItems(data && data.length > 0 ? (data as Item[]) : demoItems);
    }

    setLoading(false);
  }

  async function removeItem(itemId: string) {
    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from("user_opportunity_lists")
      .delete()
      .eq("id", itemId);

    if (deleteError) {
      setError("We could not remove that opportunity right now.");
      return;
    }

    setItems((current) => current.filter((item) => item.id !== itemId));
  }

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">{eyebrow}</p>
              <h1 className="mt-1 text-lg font-black">{title}</h1>
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 lg:py-10">
          <section className="rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">{title}</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{isWatchlist ? "Opportunities you want to keep watching." : "Opportunities you want to revisit."}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">{description}</p>
          </section>

          {!error && items.some((item) => item.id.startsWith("demo-")) && (
            <div className="mt-5 rounded-2xl border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-800">Demo examples · These sample {title.toLowerCase(){"}"} are shown so you can review the interface before live data is available.</div>
          )}

          {error && (
            <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</div>
          )}

          {loading ? (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-500">
              Loading your {title.toLowerCase()}...
            </div>
          ) : items.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl">{isWatchlist ? "◉" : "▮"}</div>
              <h3 className="mt-4 text-lg font-black">Nothing here yet</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {isWatchlist ? "Add an opportunity to your Watchlist from its detail page." : "Save an opportunity from its detail page to find it here later."}
              </p>
              <Link href="/opportunities" className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700">
                Explore opportunities →
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <article key={item.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-lg">
                  <div className="aspect-square bg-gradient-to-br from-slate-950 via-slate-800 to-purple-900 p-5 text-white">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em]">{item.category}</span>
                    <div className="mt-12">
                      <p className="text-xs font-semibold text-white/50">ACEPA opportunity</p>
                      <h3 className="mt-2 text-lg font-black leading-tight">{item.opportunity_title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-bold text-slate-800">{item.company_name}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      Added {new Date(item.created_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Link href={"/opportunities/" + item.opportunity_slug} className="flex-1 rounded-xl bg-slate-950 px-3 py-2.5 text-center text-xs font-bold text-white hover:bg-purple-700">Open</Link>
                      <button disabled={item.id.startsWith("demo-")} title={item.id.startsWith("demo-") ? "Demo example" : "Remove"} onClick={() => removeItem(item.id)} className="rounded-xl border border-slate-200 px-3 py-2.5 disabled:cursor-not-allowed disabled:opacity-40 text-xs font-bold text-slate-600 hover:border-rose-200 hover:text-rose-700">Remove</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </UserAccountShell>
  );
}
