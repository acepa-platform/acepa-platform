import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function OpportunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: opportunity } = await supabase.from("opportunities").select("id,title,slug,company_name,location,summary,description,primary_image_url,amount_text,published_at,opportunity_categories(name,slug)").eq("slug", slug).eq("status", "published").single();
  if (!opportunity) notFound();

  return <main className="min-h-screen bg-slate-50 text-slate-950">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 lg:px-8">
      <Link href="/discover"><img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA" className="h-12 w-auto object-contain brightness-0" /></Link>
      <Link href="/discover" className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:text-purple-600">← Discover</Link>
    </div></header>
    <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8 lg:py-12"><div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="relative h-72 bg-slate-950 sm:h-96">{opportunity.primary_image_url && <img src={opportunity.primary_image_url} alt="" className="h-full w-full object-cover" />}<div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" /><div className="absolute bottom-8 left-8 text-white sm:left-10"><span className="rounded-full bg-purple-600 px-3 py-1 text-[10px] font-bold uppercase">{opportunity.opportunity_categories?.name}</span><h1 className="mt-4 text-3xl font-black sm:text-5xl">{opportunity.title}</h1></div></div>
      <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_320px]"><article><p className="text-lg font-bold text-slate-700">{opportunity.company_name}{opportunity.location ? ` · ${opportunity.location}` : ""}</p><p className="mt-5 text-base leading-8 text-slate-600">{opportunity.description ?? opportunity.summary}</p><div className="mt-8 rounded-2xl bg-slate-50 p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Opportunity overview</p><p className="mt-3 text-sm leading-6 text-slate-600">{opportunity.summary}</p></div></article>
      <aside className="h-fit rounded-2xl border border-slate-200 p-6"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Opportunity</p>{opportunity.amount_text && <p className="mt-3 text-2xl font-black">{opportunity.amount_text}</p>}<p className="mt-2 text-sm text-slate-500">Published opportunity</p><button className="mt-6 w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white hover:bg-purple-600">Participate</button><p className="mt-3 text-center text-[11px] leading-5 text-slate-400">Participation will connect to the ACEPA activity system.</p></aside></div>
    </div></div>
  </main>;
}
