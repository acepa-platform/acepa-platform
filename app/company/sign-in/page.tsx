"use client";

import Link from "next/link";
import { FormEvent,useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const DEMO_EMAIL = "demo@novagrid.acepa.test";
const DEMO_PASSWORD = "Demo@2026!";

export default function CompanySignIn(){
 const router=useRouter();
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [error,setError]=useState("");
 const [loading,setLoading]=useState(false);

 function enterDemo(){
   setError("");
   sessionStorage.setItem("acepa-company-demo","true");
   router.push("/company/workspace");
 }

 async function submit(e:FormEvent){
   e.preventDefault();
   setLoading(true);
   setError("");

   if(email.trim().toLowerCase()===DEMO_EMAIL && password===DEMO_PASSWORD){
     sessionStorage.setItem("acepa-company-demo","true");
     router.push("/company/workspace");
     return;
   }

   const supabase=createClient();
   const {data,error:authError}=await supabase.auth.signInWithPassword({
     email:email.trim().toLowerCase(),
     password
   });

   if(authError){
     setError(authError.message);
     setLoading(false);
     return;
   }

   const {data:company}=await supabase
     .from("companies")
     .select("id")
     .eq("owner_user_id",data.user.id)
     .maybeSingle();

   if(!company){
     await supabase.auth.signOut();
     setError("This account is not registered as a company account.");
     setLoading(false);
     return;
   }

   router.push("/company/workspace");
 }

 return <main className="min-h-screen bg-slate-50 text-slate-950">
  <header className="border-b border-slate-200 bg-white">
   <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
    <Link href="/" className="font-black tracking-[.12em]">ACEPA</Link>
    <Link href="/companies" className="text-sm font-semibold text-slate-600 hover:text-purple-600">For Companies</Link>
   </div>
  </header>

  <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-md items-center px-5 py-12">
   <div className="w-full">
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
     <p className="text-xs font-bold tracking-[.2em] text-purple-600">COMPANY ACCOUNT</p>
     <h1 className="mt-3 text-3xl font-black">Sign in</h1>
     <p className="mt-2 text-sm leading-6 text-slate-500">Access your company workspace.</p>

     <label className="mt-7 block text-sm font-bold">Email
      <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm"/>
     </label>

     <label className="mt-5 block text-sm font-bold">Password
      <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm"/>
     </label>

     {error&&<div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

     <button disabled={loading} className="mt-6 w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white hover:bg-purple-700 disabled:opacity-60">
      {loading?"Signing in...":"Sign in as company →"}
     </button>

     <div className="my-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-slate-200"/>
      <span className="text-[10px] font-black uppercase tracking-[.16em] text-slate-400">Preview</span>
      <div className="h-px flex-1 bg-slate-200"/>
     </div>

     <button type="button" onClick={enterDemo} className="w-full rounded-xl border border-purple-200 bg-purple-50 px-5 py-3.5 text-sm font-bold text-purple-800 hover:bg-purple-100">
      Preview Demo Company Dashboard
     </button>

     <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-600">
      <p className="font-black text-slate-800">Demo access</p>
      <p className="mt-1">Email: <span className="font-semibold">demo@novagrid.acepa.test</span></p>
      <p>Password: <span className="font-semibold">Demo@2026!</span></p>
      <p className="mt-2 text-slate-500">This preview uses sample company data and does not create a real account.</p>
     </div>

     <p className="mt-5 text-center text-sm text-slate-500">New company? <Link href="/companies/register" className="font-bold text-purple-700">Get started</Link></p>
    </form>
   </div>
  </div>
 </main>;
}
