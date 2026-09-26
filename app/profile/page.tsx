"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Profile = { full_name: string; username: string; bio: string; location: string; website: string; interests: string[]; skills: string[]; avatar_url: string };
const emptyProfile: Profile = { full_name:"", username:"", bio:"", location:"", website:"", interests:[], skills:[], avatar_url:"" };

export default function ProfilePage() {
  const router = useRouter();
  const [profile,setProfile] = useState<Profile>(emptyProfile);
  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [message,setMessage] = useState("");

  useEffect(() => { loadProfile(); }, []);

  async function loadProfile() {
    const supabase=createClient();
    const {data:{user}}=await supabase.auth.getUser();
    if(!user){router.replace("/sign-in?next=/profile");return;}
    setEmail(user.email ?? "");
    const {data}=await supabase.from("profiles").select("full_name, username, bio, location, website, interests, skills, avatar_url").eq("id",user.id).maybeSingle();
    if(data) setProfile({full_name:data.full_name??"",username:data.username??"",bio:data.bio??"",location:data.location??"",website:data.website??"",interests:data.interests??[],skills:data.skills??[],avatar_url:data.avatar_url??""});
    setLoading(false);
  }

  async function saveProfile() {
    setSaving(true); setMessage("");
    const supabase=createClient();
    const {data:{user}}=await supabase.auth.getUser();
    if(!user){router.replace("/sign-in?next=/profile");return;}
    const username=profile.username.trim().toLowerCase();
    if(username && !/^[a-z0-9_]{3,30}$/.test(username)){setMessage("Username must be 3–30 characters using lowercase letters, numbers, or underscores.");setSaving(false);return;}
    const {error}=await supabase.from("profiles").upsert({id:user.id,full_name:profile.full_name.trim(),username:username||null,bio:profile.bio.trim(),location:profile.location.trim(),website:profile.website.trim(),interests:profile.interests,skills:profile.skills,avatar_url:profile.avatar_url.trim()});
    setMessage(error ? (error.code==="23505" ? "That username is already in use." : error.message) : "Profile saved successfully.");
    setSaving(false);
  }

  function update(key:keyof Profile,value:string){setProfile(current=>({...current,[key]:value}));}

  if(loading) return <main className="min-h-screen bg-[#f7f8fc] p-8 text-slate-500">Loading your profile...</main>;

  return <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
      <Link href="/dashboard" className="flex items-center"><img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA — People, Opportunities, Progress" className="h-12 w-auto object-contain brightness-0"/></Link>
      <div className="flex items-center gap-3"><Link href="/settings" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Settings</Link><Link href="/dashboard" className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700">Dashboard</Link></div>
    </div></header>
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Your account</p><h1 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Your ACEPA profile</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Tell ACEPA who you are, what you do, and what kinds of opportunities you want to discover.</p>
      <div className="mt-8 grid gap-7 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-950 text-3xl font-black text-white">{(profile.full_name||email||"A").charAt(0).toUpperCase()}</div><h2 className="mt-5 text-xl font-black">{profile.full_name||"Complete your profile"}</h2><p className="mt-1 text-sm text-slate-500">{email}</p><div className="mt-6 rounded-2xl bg-purple-50 p-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-700">Profile completion</p><div className="mt-3 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-purple-600" style={{width:Math.min(100,[profile.full_name,profile.username,profile.bio,profile.location].filter(Boolean).length*25)+"%"}}/></div><p className="mt-3 text-xs leading-5 text-slate-600">A complete profile helps personalize your ACEPA experience as the platform grows.</p></div></aside>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" value={profile.full_name} onChange={v=>update("full_name",v)} placeholder="Your full name"/><Field label="Username" value={profile.username} onChange={v=>update("username",v)} placeholder="your_username"/><Field label="Location" value={profile.location} onChange={v=>update("location",v)} placeholder="City, Country"/><Field label="Website" value={profile.website} onChange={v=>update("website",v)} placeholder="https://..."/>
        </div>
        <label className="mt-5 block"><span className="text-sm font-bold text-slate-700">Bio</span><textarea value={profile.bio} onChange={e=>update("bio",e.target.value)} rows={5} maxLength={500} placeholder="Tell people a little about yourself..." className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"/><span className="mt-1 block text-right text-xs text-slate-400">{profile.bio.length}/500</span></label>
        <div className="mt-5 grid gap-5 sm:grid-cols-2"><TagField label="Interests" value={profile.interests} placeholder="e.g. Investment" onChange={items=>setProfile(p=>({...p,interests:items}))}/><TagField label="Skills" value={profile.skills} placeholder="e.g. Marketing" onChange={items=>setProfile(p=>({...p,skills:items}))}/></div>
        {message&&<p className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">{message}</p>}<div className="mt-7 flex justify-end"><button onClick={saveProfile} disabled={saving} className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-purple-700 disabled:opacity-60">{saving?"Saving...":"Save profile"}</button></div>
        </section>
      </div>
    </div>
  </main>;
}
function Field({label,value,onChange,placeholder}:{label:string;value:string;onChange:(value:string)=>void;placeholder:string}){return <label className="block"><span className="text-sm font-bold text-slate-700">{label}</span><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"/></label>}
function TagField({label,value,placeholder,onChange}:{label:string;value:string[];placeholder:string;onChange:(items:string[])=>void}){const[draft,setDraft]=useState("");function add(){const item=draft.trim();if(!item||value.some(v=>v.toLowerCase()===item.toLowerCase()))return;onChange([...value,item]);setDraft("")}return <div><span className="text-sm font-bold text-slate-700">{label}</span><div className="mt-2 rounded-2xl border border-slate-200 p-3"><div className="flex flex-wrap gap-2">{value.map(item=><button key={item} type="button" onClick={()=>onChange(value.filter(v=>v!==item))} className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">{item} ×</button>)}</div><div className="mt-2 flex gap-2"><input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();add()}}} placeholder={placeholder} className="min-w-0 flex-1 border-0 px-1 py-2 text-sm outline-none"/><button type="button" onClick={add} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">Add</button></div></div></div>}
