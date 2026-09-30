"use client";
import { useEffect, useState } from "react";
import UserAccountShell from "@/components/user-account-shell";
export default function LanguagePage() {
  const [language, setLanguage] = useState("English");
  useEffect(() => setLanguage(localStorage.getItem("acepa-language") || "English"), []);
  function save(value: string) { setLanguage(value); localStorage.setItem("acepa-language", value); }
  return <UserAccountShell><main className="min-h-screen bg-[#f7f8fc] p-5 sm:p-8"><div className="mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-600">Preferences</p><h1 className="mt-2 text-3xl font-black">Language</h1><p className="mt-2 text-sm leading-6 text-slate-500">Choose the language ACEPA should use when translations are available.</p><section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">{["English","French","Portuguese","Spanish"].map(x => <button key={x} onClick={() => save(x)} className={"mb-3 flex w-full items-center justify-between rounded-2xl border p-4 text-left " + (language === x ? "border-purple-500 bg-purple-50" : "border-slate-200")}><span className="font-bold">{x}</span><span className="text-sm">{language === x ? "✓" : "Select"}</span></button>)}<p className="mt-3 text-xs text-slate-400">Additional translations can be connected by the technology team through ACEPA's localization system.</p></section></div></main></UserAccountShell>;
}