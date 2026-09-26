"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

const tabs = ["Profile", "Account", "Security", "Notifications", "Privacy", "Payment Methods", "API & Integrations"];
const profileItems = ["Profile Information", "Business Information", "Address", "Social Links", "Identity Verification", "Profile Completion"];

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [appearance, setAppearance] = useState("system");
  const [activeTab, setActiveTab] = useState("Profile");
  const [activeProfile, setActiveProfile] = useState("Profile Information");
  const [systemDark, setSystemDark] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setSystemDark(media.matches);
    sync();
    media.addEventListener("change", sync);
    loadSettings();
    return () => media.removeEventListener("change", sync);
  }, []);

  async function loadSettings() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.replace("/sign-in?next=/settings");
      return;
    }
    setEmail(user.email ?? "");
    const savedAppearance = localStorage.getItem("acepa-appearance");
    const { data } = await supabase.from("user_preferences").select("appearance").eq("user_id", user.id).maybeSingle();
    const nextAppearance = savedAppearance || data?.appearance || "system";
    setAppearance(nextAppearance);
    localStorage.setItem("acepa-appearance", nextAppearance);
    window.dispatchEvent(new CustomEvent("acepa-appearance-change", { detail: nextAppearance }));
  }

  const dark = appearance === "dark" || (appearance === "system" && systemDark);
  const surface = dark ? "bg-slate-950 text-slate-100" : "bg-[#f7f8fc] text-slate-950";
  const card = dark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white";
  const muted = dark ? "text-slate-400" : "text-slate-500";
  const soft = dark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white";

  async function saveAppearance() {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("user_preferences").upsert({ user_id: user.id, appearance });
    if (!error) {
      localStorage.setItem("acepa-appearance", appearance);
      window.dispatchEvent(new CustomEvent("acepa-appearance-change", { detail: appearance }));
    }
    setMessage(error ? error.message : "Settings saved successfully.");
    setSaving(false);
  }

  const profileContent = (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600">Profile</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight">{activeProfile}</h2>
        <p className={"mt-2 text-sm " + muted}>Manage your {activeProfile.toLowerCase()} settings.</p>
      </div>
      {activeProfile === "Profile Information" ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["Full name", "Your full name"],
              ["Username", "Your ACEPA username"],
              ["Bio", "Tell people about yourself"],
              ["Date of birth", "Your date of birth"],
              ["Email", email || "Your account email"],
              ["Phone number", "Add your phone number"]
            ].map(([label, value]) => (
              <div key={label}>
                <label className="text-sm font-bold">{label}</label>
                <div className={"mt-2 rounded-xl border px-4 py-3 text-sm " + soft + " " + muted}>{value}</div>
              </div>
            ))}
          </div>
          <div className={"rounded-2xl border p-5 " + soft}>
            <p className="font-bold">Profile photo</p>
            <p className={"mt-1 text-sm " + muted}>Change or remove the image used on your ACEPA profile.</p>
            <button className="mt-4 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-purple-700">Change image</button>
          </div>
          <button className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700">Save changes</button>
        </>
      ) : (
        <div className={"rounded-2xl border p-6 " + soft}>
          <p className="font-bold">{activeProfile}</p>
          <p className={"mt-2 text-sm " + muted}>This section is ready for its detailed controls and verification workflows.</p>
        </div>
      )}
    </div>
  );

  const genericContent = (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600">Settings</p>
      <h2 className="mt-2 text-2xl font-black tracking-tight">{activeTab}</h2>
      <p className={"mt-2 text-sm " + muted}>Manage your {activeTab.toLowerCase()} preferences and controls.</p>
      <div className={"mt-6 rounded-2xl border p-6 " + soft}>
        {activeTab === "Account" && <><p className="font-bold">Account email</p><p className={"mt-2 text-sm " + muted}>{email}</p><div className={"mt-6 rounded-2xl border p-5 " + soft}><p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600">Appearance</p><h3 className="mt-2 text-xl font-black">Choose your appearance</h3><p className={"mt-2 text-sm " + muted}>Choose Light, Dark, or Automatic / System.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{[["light","☀️","Light"],["dark","🌙","Dark"],["system","🖥️","Automatic / System"]].map(([value,icon,label]) => <button key={value} onClick={() => { setAppearance(value); localStorage.setItem("acepa-appearance", value); window.dispatchEvent(new CustomEvent("acepa-appearance-change", { detail: value })); }} className={"rounded-2xl border p-4 text-left transition " + (appearance === value ? "border-purple-500 bg-purple-50 text-purple-700" : soft)}><span className="text-xl">{icon}</span><p className="mt-2 text-sm font-black">{label}</p></button>)}</div><button onClick={saveAppearance} disabled={saving} className="mt-4 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save appearance"}</button></div></>}
        {activeTab === "Security" && <div className="grid gap-3 sm:grid-cols-2"><Link href="/forgot-password" className={"rounded-xl border p-4 text-sm font-bold " + soft}>Change password</Link><button className={"rounded-xl border p-4 text-left text-sm font-bold " + soft}>Two-factor authentication</button><button className={"rounded-xl border p-4 text-left text-sm font-bold " + soft}>Login sessions</button><button className={"rounded-xl border p-4 text-left text-sm font-bold " + soft}>Download my data</button></div>}
        {activeTab === "Notifications" && <p className="font-bold">Notification preferences</p>}
        {activeTab === "Privacy" && <p className="font-bold">Privacy and data controls</p>}
        {activeTab === "Payment Methods" && <p className="font-bold">Payment methods and preferences</p>}
        {activeTab === "API & Integrations" && <p className="font-bold">API keys and connected integrations</p>}
      </div>
    </div>
  );

  return (
    <UserAccountShell>
      <main className={"min-h-screen " + surface}>
        <header className={"sticky top-0 z-30 border-b " + (dark ? "border-slate-800 bg-slate-950/95" : "border-slate-200 bg-white/95") + " backdrop-blur-md"}>
          <div className="mx-auto flex min-h-20 max-w-[1500px] items-center gap-5 px-5 lg:px-8">
            <Link href="/dashboard" className="flex shrink-0 items-center"><img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA" className={"h-11 w-auto object-contain " + (dark ? "" : "brightness-0")} /></Link>
            <div className="min-w-0"><p className="text-lg font-black">Settings</p><p className={"hidden text-xs sm:block " + muted}>Manage your account, preferences and security settings</p></div>
            <div className="ml-auto"><UserAccountActions /></div>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-5 py-6 lg:px-8">
          <div className={"overflow-x-auto border-b " + (dark ? "border-slate-800" : "border-slate-200")}>
            <nav className="flex min-w-max items-center gap-1">
              {tabs.map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={"border-b-2 px-4 py-3 text-sm font-bold transition " + (activeTab === tab ? "border-purple-600 text-purple-600" : "border-transparent " + muted)}>{tab}</button>)}
            </nav>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)_310px]">
            <aside className={"rounded-3xl border p-3 " + card}>
              <p className="px-3 py-3 text-xs font-black uppercase tracking-[0.16em] text-purple-600">{activeTab === "Profile" ? "Profile contents" : "Settings"}</p>
              {activeTab === "Profile" ? profileItems.map(item => <button key={item} onClick={() => setActiveProfile(item)} className={"w-full rounded-xl px-3 py-3 text-left text-sm font-semibold transition " + (activeProfile === item ? "bg-slate-950 text-white" : muted)}>{item}</button>) : <p className={"px-3 py-3 text-sm " + muted}>Use the controls in the middle panel.</p>}
            </aside>

            <section className={"rounded-3xl border p-6 shadow-sm sm:p-8 " + card}>{activeTab === "Profile" ? profileContent : genericContent}</section>

            <aside className="space-y-6">
              <section className={"rounded-3xl border p-6 shadow-sm " + card}>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600">Account overview</p>
                <h3 className="mt-2 text-lg font-black">Your account</h3>
                <div className="mt-5 space-y-4 text-sm"><div><p className={muted}>Security</p><p className="font-bold">Account protected</p></div><div><p className={muted}>Last login</p><p className="font-bold">Current session</p></div><div><p className={muted}>Access</p><p className="font-bold">Web browser</p></div></div>
                <button className="mt-5 text-sm font-bold text-purple-600">View security activities →</button>
              </section>
              <section className={"rounded-3xl border p-6 shadow-sm " + card}><p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600">Quick actions</p><div className="mt-4 space-y-2">{["Change password","Enable two-factor authentication","Login sessions","Download my data","Delete account"].map(action => <button key={action} className={"w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold " + soft}>{action}</button>)}</div></section>
              <section className={"rounded-3xl border p-6 shadow-sm " + card}><p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600">Your devices</p><div className={"mt-4 rounded-2xl border p-4 text-sm " + soft}><p className="font-bold">Current web session</p><p className={"mt-1 " + muted}>Browser · Active now</p></div><button className="mt-4 text-sm font-bold text-purple-600">Manage sessions →</button></section>
            </aside>
          </div>

          <section className={"mt-8 rounded-3xl border p-6 shadow-sm sm:p-8 " + card}><h2 className="text-lg font-black">Your security matters</h2><p className={"mt-2 max-w-2xl text-sm leading-6 " + muted}>We use industry-standard security practices to help keep your account and data safe.</p><button className="mt-4 rounded-xl border border-purple-200 px-4 py-2.5 text-sm font-bold text-purple-700 hover:bg-purple-50">Learn more →</button></section>
          {message && <p className={"mt-5 rounded-2xl border p-4 text-sm font-semibold " + card}>{message}</p>}
        </div>
      </main>
    </UserAccountShell>
  );
}
