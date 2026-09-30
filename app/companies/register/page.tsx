"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CompanyRegistrationPage() {
  const router=useRouter();
  const [companyName,setCompanyName]=useState("");
  const [businessType,setBusinessType]=useState("");
  const [industry,setIndustry]=useState("");
  const [country,setCountry]=useState("");
  const [address,setAddress]=useState("");
  const [adminCount,setAdminCount]=useState("1");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [role,setRole]=useState("");
  const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [error,setError]=useState("");
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);

  async function submit(e:FormEvent){
    e.preventDefault(); setError(""); setMessage("");
    if(password.length<8){setError("Password must be at least 8 characters.");return;}
    if(password!==confirm){setError("Passwords do not match.");return;}
    setLoading(true);
    const supabase=createClient();
    const {data,error:signUpError}=await supabase.auth.signUp({
      email:email.trim().toLowerCase(),password,
      options:{data:{account_type:"company",full_name:name.trim(),company_name:companyName.trim(),business_type:businessType,industry:industry.trim(),country:country.trim(),address:address.trim(),planned_admin_count:adminCount,authorized_representative_name:name.trim(),authorized_representative_email:email.trim().toLowerCase(),authorized_representative_role:role.trim()}}
    });
    setLoading(false);
    if(signUpError){setError(signUpError.message);return;}
    if(data.session) router.push("/company/workspace");
    else setMessage("Company account created. Check the authorized representative email to confirm the account, then sign in.");
  }

  const input="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10";
  return <main className="min-h-screen bg-slate-50 text-slate-950">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
      <Link href="/" className="font-black tracking-[.12em]">ACEPA</Link>
      <Link href="/companies" className="text-sm font-semibold text-slate-600 hover:text-purple-600">Back to For Companies</Link>
    </div></header>
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <div className="text-center"><p className="text-xs font-bold tracking-[.2em] text-purple-600">FOR COMPANIES</p><h1 className="mt-3 text-4xl font-black tracking-[-.05em]">Create your company account.</h1><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">Start with the essential company and representative information. Complete verification, your profile, opportunities, team and other company features after registration.</p></div>
      <form onSubmit={submit} className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label className="text-sm font-bold">Company name</label><input required value={companyName} onChange={e=>setCompanyName(e.target.value)} className={input} placeholder="Company name"/></div>
          <div><label className="text-sm font-bold">Business type</label><select required value={businessType} onChange={e=>setBusinessType(e.target.value)} className={input}><option value="">Select type</option><option>Limited company</option><option>Partnership</option><option>Sole proprietorship</option><option>Other</option></select></div>
          <div><label className="text-sm font-bold">Industry</label><input required value={industry} onChange={e=>setIndustry(e.target.value)} className={input} placeholder="e.g. Energy"/></div>
          <div><label className="text-sm font-bold">Country</label><input required value={country} onChange={e=>setCountry(e.target.value)} className={input} placeholder="Country"/></div>
        </div>
        <div><label className="text-sm font-bold">Business address</label><input required value={address} onChange={e=>setAddress(e.target.value)} className={input} placeholder="Company address"/></div>
        <div className="border-t border-slate-100 pt-5"><h2 className="text-lg font-black">Account access</h2><p className="mt-1 text-sm text-slate-500">The registering person becomes the initial company owner.</p></div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label className="text-sm font-bold">Administrators</label><select value={adminCount} onChange={e=>setAdminCount(e.target.value)} className={input}><option value="1">1 administrator</option><option value="2">2 administrators</option><option value="3">3 administrators</option><option value="5">5 administrators</option><option value="10">Up to 10 administrators</option><option value="25">Up to 25 administrators</option><option value="50">Up to 50 administrators</option></select></div>
          <div><label className="text-sm font-bold">Authorized representative role</label><input required value={role} onChange={e=>setRole(e.target.value)} className={input} placeholder="CEO, Director, Founder..."/></div>
          <div><label className="text-sm font-bold">Authorized representative</label><input required value={name} onChange={e=>setName(e.target.value)} className={input} placeholder="Full name"/></div>
          <div><label className="text-sm font-bold">Representative email</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className={input} placeholder="name@company.com"/></div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label className="text-sm font-bold">Password</label><input required minLength={8} type="password" value={password} onChange={e=>setPassword(e.target.value)} className={input} placeholder="At least 8 characters"/></div>
          <div><label className="text-sm font-bold">Confirm password</label><input required minLength={8} type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} className={input} placeholder="Confirm password"/></div>
        </div>
        {error&&<div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
        {message&&<div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-700">{message}</div>}
        <button disabled={loading} className="w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white hover:bg-purple-700 disabled:opacity-60">{loading?"Creating company...":"Create company account →"}</button>
        <p className="text-center text-sm text-slate-500">Already registered? <Link href="/company/sign-in" className="font-bold text-purple-700">Sign in as a company</Link></p>
      </form>
    </div>
  </main>;
}