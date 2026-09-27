import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ParticipateButton from "@/components/opportunities/participate-button";
import { getDemoOpportunity } from "@/lib/demo-opportunities";

export default async function OpportunityPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ from?: string }> }) {
  const { slug } = await params;
  const { from } = await searchParams;
  const supabase = await createClient();
  const { data: live } = await supabase
    .from("opportunities")
    .select("id,title,slug,company_name,location,summary,description,primary_image_url,amount_text,published_at,opportunity_categories(name,slug)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  const demo = !live ? getDemoOpportunity(slug) : null;
  if (!live && !demo) notFound();

  const opportunity = live
    ? {
        id: live.id,
        title: live.title,
        slug: live.slug,
        company_name: live.company_name,
        location: live.location,
        summary: live.summary,
        description: live.description ?? live.summary,
        primary_image_url: live.primary_image_url,
        amount_text: live.amount_text,
        category: live.opportunity_categories?.[0]?.name ?? "Opportunity",
        sections: [],
        meta: [live.location ?? "Global", "Published on ACEPA"],
      }
    : demo!;

  const isDemo = Boolean(demo);
  const backHref = from === "dashboard-discover" ? "/dashboard/discover" : "/discover/" + (live?.opportunity_categories?.[0]?.slug ?? demo?.category_slug ?? "");
  const backLabel = from === "dashboard-discover" ? "Back to Discover" : `Back to ${opportunity.category}`;

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/dashboard" className="flex items-center">
            <img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA" className="h-12 w-auto object-contain brightness-0" />
          </Link>
          <Link href={backHref} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-purple-200 hover:text-purple-600">
            ← {backLabel}
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-7">
        {isDemo && (
          <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
            Demo opportunity — this clickable listing is here so we can test the ACEPA experience before real company listings are live.
          </div>
        )}

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="relative h-72 bg-slate-950 sm:h-[340px]">
            {opportunity.primary_image_url && <img src={opportunity.primary_image_url} alt="" className="h-full w-full object-cover" />}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-7 left-6 right-6 text-white sm:bottom-10 sm:left-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-purple-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em]">{opportunity.category}</span>
                {opportunity.meta.slice(0, 2).map((m) => <span key={m} className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold backdrop-blur">{m}</span>)}
              </div>
              <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.05em] sm:text-5xl">{opportunity.title}</h1>
              <p className="mt-3 text-sm font-semibold text-white/75">{opportunity.company_name}{opportunity.location ? " · " + opportunity.location : ""}</p>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article>
              <section>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Overview</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">What this opportunity is about</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{opportunity.description}</p>
              </section>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {opportunity.sections.map((section) => (
                  <section key={section.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="text-sm font-black">{section.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{section.body}</p>
                    {section.items && <ul className="mt-3 space-y-2">{section.items.map((item) => <li key={item} className="text-xs font-semibold text-slate-600">• {item}</li>)}</ul>}
                  </section>
                ))}
              </div>

              {!isDemo && (
                <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Opportunity information</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Additional structured sections will appear here as the company publishes financials, market information, performance history, updates, documents, Q&A and verified participant reviews.</p>
                </section>
              )}
            </article>

            <aside className="h-fit space-y-4 lg:sticky lg:top-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Opportunity</p>
                {opportunity.amount_text && <p className="mt-3 text-2xl font-black">{opportunity.amount_text}</p>}
                <div className="mt-4 space-y-2">{opportunity.meta.map((m) => <div key={m} className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">{m}</div>)}</div>
                <ParticipateButton
                  opportunityId={opportunity.id}
                  opportunitySlug={opportunity.slug}
                  opportunityTitle={opportunity.title}
                  companyName={opportunity.company_name}
                  category={opportunity.category}
                />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-300">Trust & verification</p>
                <p className="mt-3 text-sm leading-6 text-white/70">ACEPA will clearly distinguish company-provided information, verified information, historical results and projections.</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
