import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import InvestmentForm from "@/components/opportunities/investment-form";
import { getDemoOpportunity } from "@/lib/demo-opportunities";

export default async function InvestmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: live } = await supabase
    .from("opportunities")
    .select("id,title,slug,company_name,location,summary,description,primary_image_url,amount_text,opportunity_categories(name,slug)")
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
        description: live.description ?? live.summary,
        amount_text: live.amount_text ?? "Investment opportunity",
        category: live.opportunity_categories?.[0]?.name ?? "Investment",
      }
    : {
        id: demo!.id,
        title: demo!.title,
        slug: demo!.slug,
        company_name: demo!.company_name,
        location: demo!.location,
        description: demo!.description,
        amount_text: demo!.amount_text,
        category: demo!.category,
      };

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link href="/dashboard" className="flex items-center">
            <img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA" className="h-11 w-auto object-contain brightness-0" />
          </Link>
          <Link href={`/discover/opportunities/${opportunity.slug}`} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-purple-200 hover:text-purple-600">
            ← Back to Opportunity
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 lg:py-10">
        <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold leading-5 text-amber-800">
          {demo ? "Demo investment flow — no money is moved. This is for testing the ACEPA investment experience." : "Review the opportunity and confirm your investment request. Payment and settlement will be handled through Wallet when that phase is connected."}
        </div>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Investment</p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em]">{opportunity.title}</h1>
          <p className="mt-2 text-sm font-semibold text-slate-500">{opportunity.company_name}{opportunity.location ? " · " + opportunity.location : ""}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Opportunity summary</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{opportunity.description}</p>
            </div>
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-300">Funding information</p>
              <p className="mt-3 text-2xl font-black">{opportunity.amount_text}</p>
              <p className="mt-2 text-xs leading-5 text-white/60">All ACEPA investment values are displayed in USD.</p>
            </div>
          </div>
          <div className="mt-7">
            <InvestmentForm opportunityId={opportunity.id} opportunitySlug={opportunity.slug} opportunityTitle={opportunity.title} companyName={opportunity.company_name} category={opportunity.category} amountText={opportunity.amount_text} />
          </div>
        </section>
      </div>
    </main>
  );
}
