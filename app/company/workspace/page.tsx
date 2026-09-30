"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const stats=[["Active opportunities","6"],["Applications","128"],["Marketplace offerings","4"],["Company followers","2,480"]];
const opportunities=[["Investment","Solar Energy Expansion","Live","142 participants"],["Innovation","AI Customer Support Challenge","Under review","38 proposals"],["Marketing","New Product Launch Campaign","Draft","—"],["Careers & Jobs","Regional Operations Manager","Live","19 applications"]];
const activity=[["Today","3 new applications received"],["Yesterday","Company post published"],["Sep 27","Marketplace offering updated"],["Sep 26","Verification documents reviewed"]];

export default function CompanyWorkspacePage(){
 const router = useRouter();
 const [notice,setNotice]=useState("");
 const [demoMode,setDemoMode]=useState(false);
 const [company,setCompany]=useState<{id:string;name:string;slug:string;verification_status:string;profile_status:string}|null>(null);
 const [loadingCompany,setLoadingCompany]=useState(true);

 useEffect(()=>{
   let active=true;
   async function loadCompany(){
     if(sessionStorage.getItem("acepa-company-demo")==="true"){
       if(active){
         setDemoMode(true);
         setCompany({
           id:"demo-novagrid",
           name:"NovaGrid Energy Solutions Ltd.",
           slug:"novagrid-energy-solutions-demo",
           verification_status:"verified",
           profile_status:"published"
         });
         setLoadingCompany(false);
       }
       return;
     }

     const supabase=createClient();
     const {data:{user}}=await supabase.auth.getUser();
     if(!user){ router.replace("/company/sign-in"); return; }
     const {data}=await supabase.from("companies").select("id,name,slug,verification_status,profile_status").eq("owner_user_id",user.id).maybeSingle();
     if(active){
       setCompany(data);
       setLoadingCompany(false);
     }
   }
   loadCompany();
   return ()=>{active=false};
 },[router]);
 return <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
  <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl"><div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10"><div className="flex items-center gap-4"><Link href="/" className="flex items-center"><img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA" className="h-11 w-auto object-contain brightness-0 dark:brightness-100"/></Link><span className="hidden h-6 w-px bg-slate-200 sm:block"/><div className="hidden sm:block"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Company workspace</p><p className="text-sm font-black">{loadingCompany ? "Loading company..." : company?.name ?? "Company workspace"}</p></div></div><div className="flex items-center gap-2">{demoMode&&<button onClick={()=>{sessionStorage.removeItem("acepa-company-demo");router.push("/company/sign-in")}} className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-800">Exit demo</button>}<Link href={company ? `/company/${company.slug}` : "/company"} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700">View public profile</Link><Link href="/company" className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white">Company directory</Link></div></div></header>
  <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
   <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-purple-600">Business workspace</p><h1 className="mt-2 text-3xl font-black tracking-[-.04em] sm:text-4xl">{company ? `Welcome, ${company.name}.` : "Company workspace"}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Manage your company&apos;s ACEPA presence, opportunities and activity from one workspace.</p></div><button onClick={()=>setNotice("Create opportunity is a demo action for now. The production form will connect to ACEPA opportunity management.")} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700">+ Create opportunity</button></div>
   {demoMode&&<div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-900">Demo Preview — You are viewing NovaGrid Energy Solutions Ltd. with sample company data. No real company account or financial account is connected.</div>}
   {notice&&<div className="mt-5 rounded-2xl border border-purple-100 bg-purple-50 px-5 py-4 text-sm font-semibold text-purple-800">{notice}</div>}
   <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([l,v])=><Link href={l==="Marketplace offerings"?"/marketplace":"/company/workspace"} key={l} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-purple-200"><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">{l}</p><p className="mt-3 text-3xl font-black">{v}</p><p className="mt-2 text-xs text-slate-500">Demo company data</p></Link>)}</section>
   <div className="mt-8 grid gap-7 lg:grid-cols-[250px_1fr]">
    <aside className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
      {[["Overview","#workspace"],["Opportunities","#opportunities"],["Applications","#applications"],["Feed & Posts","#feed"],["Marketplace","#marketplace"],["Analytics","#analytics"],["Wallet & Earnings","#wallet"],["Referrals","#referrals"],["Reputation","#reputation"],["Team","#team"],["Verification","#verification"],["Settings","#settings"]].map(([t,h],i)=><a key={t} href={h} className={`block rounded-xl px-4 py-3 text-sm font-semibold ${i===0?"bg-slate-950 text-white":"text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}>{t}</a>)}
    </aside>
    <div className="space-y-7">
      <section id="workspace" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">Overview</p><h2 className="mt-2 text-2xl font-black">Your company at a glance</h2><div className="mt-6 grid gap-5 md:grid-cols-3"><div className="rounded-2xl bg-slate-50 p-5"><p className="text-xs font-bold text-slate-400">Opportunity engagement</p><p className="mt-2 text-2xl font-black">84%</p><p className="mt-1 text-xs text-slate-500">Demo activity health</p></div><div className="rounded-2xl bg-slate-50 p-5"><p className="text-xs font-bold text-slate-400">Marketplace enquiries</p><p className="mt-2 text-2xl font-black">31</p><p className="mt-1 text-xs text-slate-500">Demo enquiries this month</p></div><div className="rounded-2xl bg-slate-50 p-5"><p className="text-xs font-bold text-slate-400">Profile completion</p><p className="mt-2 text-2xl font-black">92%</p><p className="mt-1 text-xs text-slate-500">Complete company information</p></div></div></section>
      <section id="opportunities" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><div className="flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">Opportunity management</p><h2 className="mt-2 text-2xl font-black">Your opportunities</h2></div><button onClick={()=>setNotice("New opportunity workflow is a demo action. Choose the opportunity type first, then complete the production form when backend management is connected.")} className="text-xs font-black text-purple-700">Create new →</button></div><div className="mt-5 divide-y divide-slate-200">{opportunities.map(([type,title,status,meta])=><button key={title} onClick={()=>setNotice(`Demo: opening management view for “${title}”.`)} className="flex w-full items-center justify-between gap-4 py-5 text-left hover:bg-slate-50"><div><span className="rounded-full bg-purple-50 px-3 py-1 text-[10px] font-black uppercase text-purple-700">{type}</span><h3 className="mt-2 font-black">{title}</h3><p className="mt-1 text-xs text-slate-500">{meta}</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase text-slate-600">{status}</span></button>)}</div></section>
      <section id="applications" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">Participants</p><h2 className="mt-2 text-2xl font-black">Applications & participants</h2><p className="mt-2 text-sm text-slate-500">Review people and companies participating in your active ACEPA opportunities.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{[["Amara Nwosu","Solar Energy Expansion","Under review"],["David Okoro","Solar Energy Expansion","Accepted"],["Chioma Eze","AI Customer Support Challenge","Submitted"]].map(([n,o,s])=><button key={n} onClick={()=>setNotice(`Demo participant: ${n} — ${s}`)} className="rounded-2xl border border-slate-200 p-4 text-left hover:border-purple-200"><p className="font-bold">{n}</p><p className="mt-1 text-xs text-slate-500">{o}</p><p className="mt-3 text-[10px] font-black uppercase text-purple-700">{s}</p></button>)}</div></section>
      <section id="feed" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">Feed & posts</p><h2 className="mt-2 text-2xl font-black">Company activity</h2><p className="mt-2 text-sm text-slate-500">Publish and manage the posts that appear on your company profile and the ACEPA Feed.</p><div className="mt-5 flex flex-wrap gap-3"><button onClick={()=>setNotice("Demo post composer opened. Production publishing will connect to the shared ACEPA Feed.")} className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white">Create post</button><Link href="/feed" className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700">View Feed</Link></div></section>
      <section id="marketplace" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">Shared ACEPA Marketplace</p><h2 className="mt-2 text-2xl font-black">Your marketplace offerings</h2><p className="mt-2 text-sm text-slate-500">ACEPA owns the marketplace. Your company manages its eligible listings inside the shared marketplace.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{["Commercial Solar Installation","Solar Maintenance Service","Energy Audit & Planning"].map(x=><button key={x} onClick={()=>setNotice(`Demo marketplace listing: ${x}`)} className="rounded-2xl border border-slate-200 p-4 text-left font-bold hover:border-purple-200">{x}<span className="mt-1 block text-xs font-normal text-slate-500">Manage listing →</span></button>)}</div></section>
      <section id="analytics" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">Analytics</p><h2 className="mt-2 text-2xl font-black">Company performance</h2><div className="mt-6 grid h-40 grid-cols-8 items-end gap-2">{[35,48,44,62,55,72,68,84].map((h,i)=><div key={i} className="h-full rounded-lg bg-slate-100"><div className="w-full rounded-lg bg-purple-600" style={{height:h+"%"}}/></div>)}</div></section>
      <section id="wallet" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">Wallet & earnings</p><h2 className="mt-2 text-2xl font-black">Company financial activity</h2><div className="mt-5 grid gap-4 sm:grid-cols-3">{[["Available","$18,400"],["Pending","$4,200"],["ACEPA fees","$1,160"]].map(([l,v])=><div key={l} className="rounded-2xl bg-slate-50 p-5"><p className="text-xs font-bold text-slate-400">{l}</p><p className="mt-2 text-2xl font-black">{v}</p><p className="mt-1 text-xs text-slate-500">Demo value</p></div>)}</div></section>
      <section id="referrals" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">Referrals</p><h2 className="mt-2 text-2xl font-black">Company referral activity</h2><p className="mt-2 text-sm text-slate-500">Track qualifying referrals connected to your company's ACEPA activity.</p></section>
      <section id="reputation" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">Reputation</p><h2 className="mt-2 text-2xl font-black">Trust & company reputation</h2><p className="mt-2 text-sm text-slate-500">Verification, reviews, participation history and trust signals will live here.</p></section>
      <section id="team" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">Team</p><h2 className="mt-2 text-2xl font-black">Authorized company team</h2><div className="mt-5 grid gap-3 sm:grid-cols-3">{["Founder / Owner","Operations Manager","Finance Manager"].map(x=><button key={x} onClick={()=>setNotice(`Demo team role: ${x}`)} className="rounded-2xl border border-slate-200 p-4 text-left hover:border-purple-200"><p className="font-bold">{x}</p><p className="mt-1 text-xs text-slate-500">Manage access →</p></button>)}</div></section>
      <section id="verification" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">Verification</p><h2 className="mt-2 text-2xl font-black">Business verification & W Badge</h2><p className="mt-2 text-sm leading-6 text-slate-500">Basic verification confirms company identity and submitted documents. The separate W Badge represents the platform's advanced business trust/premium status.</p><button onClick={()=>setNotice("Demo verification centre opened.")} className="mt-4 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white">Open verification centre</button></section>
      <section id="settings" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">Settings</p><h2 className="mt-2 text-2xl font-black">Company settings</h2><div className="mt-5 grid gap-3 sm:grid-cols-3">{["Company profile","Notifications","Security"].map(x=><button key={x} onClick={()=>setNotice(`Demo settings: ${x}`)} className="rounded-2xl border border-slate-200 p-4 text-left font-bold hover:border-purple-200">{x}<span className="mt-1 block text-xs font-normal text-slate-500">Open settings →</span></button>)}</div></section>
    </div>
   </div>
  </div>
 </main>;
}
