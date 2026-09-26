"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Opportunity = { id:string; title:string; slug:string; company_name:string; location:string|null; summary:string; primary_image_url:string|null; amount_text:string|null; category_id:string; opportunity_categories?:{name:string;slug:string}|null };

const categories = [["All","all"],["Investment","investment"],["Innovation","innovation"],["Marketing","marketing"],["Business","business"],["Collaboration","collaboration"],["Experts","experts"],["Careers & Jobs","careers-jobs"]];

function TopIcon({ type }: { type: "activity"|"wallet"|"investment"|"message"|"notification" }) {
  const paths = {
    activity:<path d="M3 12h4l2-6 4.5 12 2-6H21" />,
    wallet:<><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 9h15.5a2.5 2.5 0 0 1 0 5H17"/><circle cx="17" cy="11.5" r=".8" fill="currentColor" stroke="none"/></>,
    investment:<><path d="M5 19V9M12 19V5M19 19v-8M3 19h18"/></>,
    message:<><path d="M5 5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H10l-5 3v-5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><path d="M7 9h10M7 13h6"/></>,
    notification:<><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/></>
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">{paths[type]}</svg>;
}

export default function DiscoverPage() {
  const supabase = createClient();
  const [opportunities,setOpportunities]=useState<Opportunity[]>([]);
  const [category,setCategory]=useState("all");
  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(true);

  useEffect(()=>{ async function load(){ setLoading(true); const {data}=await supabase.from("opportunities").select("id,title,slug,company_name,location,summary,primary_image_url,amount_text,category_id,opportunity_categories(name,slug)").eq("status","published").order("published_at",{ascending:false}); setOpportunities((data??[]) as Opportunity[]); setLoading(false); } load(); },[supabase]);

  const filtered=useMemo(()=>opportunities.filter(item=>{const categoryMatch=category==="all"||item.opportunity_categories?.slug===category; const q=search.trim().toLowerCase(); const searchMatch=!q||[item.title,item.company_name,item.location??"",item.summary].some(v=>v.toLowerCase().includes(q)); return categoryMatch&&searchMatch;}),[opportunities,category,search]);

  return <main className="min-h-screen bg-slate-50 text-slate-950">
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-20 max-w-[1500px] items-center gap-5 px-5 lg:px-8">
        <Link href="/dashboard" className="flex shrink-0 items-center"><img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA — People, Opportunities, Progress" className="h-11 w-auto object-contain brightness-0" /></Link>
        <nav className="hidden items-center gap-5 xl:flex">
          {["Explore","Projects","Campaigns","Innovation","Collaboration","Dashboard"].map((label,i)=><Link key={label} href={label==="Dashboard"?"/dashboard":"#"} className="text-sm font-semibold text-slate-600 transition hover:text-purple-600">{label}</Link>)}
        </nav>
        <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 lg:gap-3">
          <div className="hidden max-w-md flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 md:flex"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search opportunities, companies or locations" className="h-10 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"/></div>
          {(["activity","wallet","investment","message","notification"] as const).map(type=><button key={type} title={type[0].toUpperCase()+type.slice(1)} className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600 lg:flex"><TopIcon type={type}/></button>)}
          <Link href="/profile" className="flex h-10 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 pr-3 text-sm font-bold text-slate-700 transition hover:border-purple-200 hover:text-purple-600"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-xs text-white">K</span><span className="hidden 2xl:block">Profile</span></Link>
        </div>
      </div>
    </header>

    <section className="relative overflow-hidden bg-slate-950 px-6 py-9 text-white lg:px-8 lg:py-11">
      <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-purple-600/15 blur-3xl"/>
      <div className="relative mx-auto max-w-[1500px]">
        <p className="text-[10px] font-bold tracking-[0.22em] text-purple-300">DISCOVER ACEPA</p>
        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div><h1 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl">Find where you can <span className="text-purple-300">create value.</span></h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Explore opportunities to invest, innovate, market, build, collaborate, work, and contribute.</p></div>
          <Link href="/get-started" className="w-fit rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-purple-50">Get started →</Link>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
      <div className="flex flex-wrap gap-2">{categories.map(([label,slug])=><button key={slug} onClick={()=>setCategory(slug)} className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${category===slug?"bg-slate-950 text-white":"border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-600"}`}>{label}</button>)}</div>
      <div className="mt-8 flex items-end justify-between gap-4 border-b border-slate-200 pb-5"><div><p className="text-xs font-bold tracking-[0.2em] text-purple-600">OPPORTUNITIES</p><h2 className="mt-2 text-3xl font-bold tracking-tight">Explore what is available.</h2></div><p className="text-sm text-slate-500">{loading?"Loading...":`${filtered.length} opportunities`}</p></div>
      {loading?<div className="py-20 text-center text-sm text-slate-500">Loading opportunities...</div>:filtered.length===0?<div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><p className="text-lg font-bold">No opportunities found.</p><p className="mt-2 text-sm text-slate-500">Try another search or category.</p></div>:<div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map(item=><Link key={item.id} href={`/discover/opportunities/${item.slug}`} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"><div className="relative h-48 overflow-hidden bg-slate-900">{item.primary_image_url&&<img src={item.primary_image_url} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>}<div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"/><span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-900">{item.opportunity_categories?.name??"Opportunity"}</span></div><div className="p-6"><div className="flex items-start justify-between gap-3"><h3 className="text-xl font-bold tracking-tight">{item.title}</h3>{item.amount_text&&<span className="shrink-0 text-sm font-black">{item.amount_text}</span>}</div><p className="mt-1 text-sm font-semibold text-slate-600">{item.company_name}</p><p className="mt-3 text-sm leading-6 text-slate-500">{item.summary}</p><div className="mt-5 flex items-center justify-between text-xs font-semibold text-slate-400"><span>{item.location??"Global"}</span><span className="text-purple-600">Explore →</span></div></div></Link>)}</div>}
    </section>
  </main>;
}
