"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Profile = { full_name:string|null; username:string|null; avatar_url:string|null };

function TopIcon({ type }: { type: "wallet"|"message"|"notification" }) {
  const paths = {
    wallet:<><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 9h15.5a2.5 2.5 0 0 1 0 5H17"/><circle cx="17" cy="11.5" r=".8" fill="currentColor" stroke="none"/></>,
    message:<><path d="M5 5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H10l-5 3v-5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><path d="M7 9h10M7 13h6"/></>,
    notification:<><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/></>
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">{paths[type]}</svg>;
}

export function UserAccountActions() {
  const supabase = createClient();
  const router = useRouter();
  const [profile,setProfile]=useState<Profile|null>(null);
  const [profileOpen,setProfileOpen]=useState(false);

  useEffect(()=>{ async function load(){ const {data:{user}}=await supabase.auth.getUser(); if(user){ const {data}=await supabase.from("profiles").select("full_name,username,avatar_url").eq("id",user.id).maybeSingle(); setProfile(data as Profile|null); } } load(); },[supabase]);

  const displayName=profile?.full_name||profile?.username||"Profile";
  const initials=displayName.trim().split(/\s+/).map(part=>part[0]).join("").slice(0,2).toUpperCase()||"K";

  async function signOut(){ await supabase.auth.signOut(); router.push("/"); router.refresh(); }

  return <div className="flex shrink-0 items-center gap-2">
    <Link href="/messages" title="Messages" aria-label="Messages" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"><TopIcon type="message"/></Link>
    <Link href="/notifications" title="Notifications" aria-label="Notifications" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"><TopIcon type="notification"/></Link>
    <Link href="/wallet" title="Wallet" aria-label="Wallet" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"><TopIcon type="wallet"/></Link>
    <div className="relative">
      <button type="button" title="Profile menu" aria-label="Profile menu" onClick={()=>setProfileOpen(v=>!v)} className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 text-slate-700 transition hover:border-purple-200 hover:bg-purple-50">
        {profile?.avatar_url?<img src={profile.avatar_url} alt="" className="h-8 w-8 rounded-lg object-cover"/>:<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-xs font-black text-purple-700">{initials}</span>}
        <span className="hidden max-w-24 truncate text-sm font-bold xl:block">{displayName}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 transition-transform ${profileOpen?"rotate-180":""}`} aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      {profileOpen&&<div className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
        <Link href="/profile" onClick={()=>setProfileOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-slate-50">Profile</Link>
        <Link href="/settings" onClick={()=>setProfileOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-slate-50">Settings</Link>
        <button type="button" onClick={signOut} className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50">Logout</button>
      </div>}
    </div>
  </div>;
}

export default function UserAccountTopNav({ searchValue="", onSearchChange }: { searchValue?: string; onSearchChange?: (value:string)=>void }) {
  return <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
    <div className="mx-auto flex min-h-20 max-w-[1500px] items-center gap-5 px-5 lg:px-8">
      <Link href="/dashboard" className="flex shrink-0 items-center"><img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA — People, Opportunities, Progress" className="h-11 w-auto object-contain brightness-0"/></Link>
      <div className="ml-auto flex min-w-0 flex-1 items-center gap-2 lg:gap-4">
        <div className="min-w-0 max-w-md flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4"><input aria-label="Search opportunities" value={searchValue} onChange={e=>onSearchChange?.(e.target.value)} placeholder="Search opportunities, companies or locations" className="h-10 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"/></div>
        <nav className="ml-auto flex items-center gap-4">
          <Link href="/dashboard" className="whitespace-nowrap text-sm font-bold text-slate-950 transition hover:text-purple-600">Dashboard</Link>
          <Link href="/activity" className="whitespace-nowrap text-sm font-bold text-slate-950 transition hover:text-purple-600">Activities</Link>
        </nav>
        <UserAccountActions/>
      </div>
    </div>
  </header>;
}
