"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

const tabs = ["Profile", "Account", "Security", "Notifications", "Privacy", "Payment Methods", "API & Integrations"];
const profileItems = ["Profile Information", "Business Information", "Address", "Social Links", "Identity Verification"];

type Profile = {
  full_name: string;
  username: string;
  bio: string;
  location: string;
  avatar_url: string;
  website: string;
};

const emptyProfile: Profile = {
  full_name: "",
  username: "",
  bio: "",
  location: "",
  avatar_url: "",
  website: "",
};

function MiniIcon({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-sm text-purple-600 dark:bg-purple-950/40">{children}</span>;
}

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [appearance, setAppearance] = useState("system");
  const [activeTab, setActiveTab] = useState("Profile");
  const [activeProfile, setActiveProfile] = useState("Profile Information");
  const [systemDark, setSystemDark] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

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

    const [{ data: profileData }, { data: preferenceData }] = await Promise.all([
      supabase.from("profiles").select("full_name,username,bio,location,avatar_url,website").eq("id", user.id).maybeSingle(),
      supabase.from("user_preferences").select("appearance").eq("user_id", user.id).maybeSingle(),
    ]);

    setProfile({
      full_name: profileData?.full_name ?? "",
      username: profileData?.username ?? "",
      bio: profileData?.bio ?? "",
      location: profileData?.location ?? "",
      avatar_url: profileData?.avatar_url ?? "",
      website: profileData?.website ?? "",
    });

    const savedAppearance = localStorage.getItem("acepa-appearance");
    const nextAppearance = savedAppearance || preferenceData?.appearance || "system";
    setAppearance(nextAppearance);
    localStorage.setItem("acepa-appearance", nextAppearance);
    window.dispatchEvent(new CustomEvent("acepa-appearance-change", { detail: nextAppearance }));
  }

  const dark = appearance === "dark" || (appearance === "system" && systemDark);
  const surface = dark ? "bg-slate-950 text-slate-100" : "bg-[#f7f8fc] text-slate-950";
  const card = dark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white";
  const muted = dark ? "text-slate-400" : "text-slate-500";
  const soft = dark ? "border-slate-800 bg-slate-950/60" : "border-slate-200 bg-white";
  const field = dark ? "border-slate-700 bg-slate-950 text-slate-100" : "border-slate-200 bg-white text-slate-800";

  const completionItems = [
    ["Profile Information", Boolean(profile.full_name && profile.username && profile.bio)],
    ["Business Information", false],
    ["Identity Verification", false],
    ["Payment Method", false],
    ["Security Setup", false],
  ];
  const completion = Math.round((completionItems.filter(([, done]) => done).length / completionItems.length) * 100);

  const filteredTabs = useMemo(
    () => tabs.filter((tab) => tab.toLowerCase().includes(search.toLowerCase().trim())),
    [search],
  );

  async function saveProfile() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        username: profile.username || null,
        bio: profile.bio,
        location: profile.location,
        avatar_url: profile.avatar_url || null,
        website: profile.website || null,
      })
      .eq("id", user.id);

    setMessage(error ? error.message : "Profile changes saved successfully.");
    setSaving(false);
  }

  async function saveAppearance() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("user_preferences").upsert({
      user_id: user.id,
      appearance,
    });

    if (!error) {
      localStorage.setItem("acepa-appearance", appearance);
      window.dispatchEvent(new CustomEvent("acepa-appearance-change", { detail: appearance }));
    }

    setMessage(error ? error.message : "Appearance preference saved successfully.");
    setSaving(false);
  }

  function chooseAppearance(value: string) {
    setAppearance(value);
    localStorage.setItem("acepa-appearance", value);
    window.dispatchEvent(new CustomEvent("acepa-appearance-change", { detail: value }));
  }

  const avatarInitials = (profile.full_name || email || "A")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const profileContent = (
    <div className="space-y-6">
      <div className={"flex flex-wrap items-start justify-between gap-4 border-b pb-5 " + (dark ? "border-slate-800" : "border-slate-200")}>
        <div>
          <p className="text-lg font-black">Profile Information</p>
          <p className={"mt-1 text-sm " + muted}>Manage your personal information and how it appears on ACEPA.</p>
        </div>
        <button className="rounded-xl border border-purple-300 px-4 py-2 text-sm font-bold text-purple-700 hover:bg-purple-50">View Profile ↗</button>
      </div>

      <div>
        <p className="text-sm font-black">Profile Photo</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-purple-100 text-xl font-black text-purple-700">
            {profile.avatar_url ? <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover" /> : avatarInitials}
          </div>
          <div>
            <p className="text-sm font-bold">Upload a profile photo</p>
            <p className={"mt-1 text-xs " + muted}>JPG, PNG or GIF. Max size 5MB.</p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-xl border border-purple-300 px-4 py-2 text-sm font-bold text-purple-700">Change Photo</button>
              <button className="rounded-xl px-4 py-2 text-sm font-bold text-red-500">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {[
          ["Full Name", "full_name", profile.full_name],
          ["Username", "username", profile.username],
          ["Email Address", "email", email],
          ["Phone Number", "phone", "Add your phone number"],
          ["Date of Birth", "dob", "Add your date of birth"],
          ["Country", "location", profile.location || "Nigeria"],
        ].map(([label, key, value]) => (
          <div key={label}>
            <label className="text-sm font-bold">{label}</label>
            <input
              value={String(value)}
              disabled={key === "email" || key === "phone" || key === "dob"}
              onChange={(event) => {
                if (key === "full_name" || key === "username" || key === "location") {
                  setProfile((current) => ({ ...current, [key]: event.target.value }));
                }
              }}
              className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-purple-500 " + field + (key !== "email" && key !== "phone" && key !== "dob" ? "" : " opacity-80")}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="text-sm font-bold">Bio</label>
        <textarea
          value={profile.bio}
          onChange={(event) => setProfile((current) => ({ ...current, bio: event.target.value }))}
          rows={4}
          maxLength={200}
          className={"mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none focus:border-purple-500 " + field}
        />
        <p className={"mt-1 text-right text-xs " + muted}>{profile.bio.length}/200</p>
      </div>

      <div className="flex justify-end">
        <button onClick={saveProfile} disabled={saving} className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white hover:bg-purple-700 disabled:opacity-60">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );

  const profilePlaceholder = (
    <div className="space-y-5">
      <div>
        <p className="text-lg font-black">{activeProfile}</p>
        <p className={"mt-1 text-sm " + muted}>Manage your {activeProfile.toLowerCase()} settings.</p>
      </div>
      <div className={"rounded-2xl border p-6 " + soft}>
        <p className="font-bold">{activeProfile}</p>
        <p className={"mt-2 text-sm leading-6 " + muted}>This section is ready for its detailed ACEPA controls and workflows.</p>
        <button className="mt-5 rounded-xl border border-purple-300 px-4 py-2.5 text-sm font-bold text-purple-700">Continue →</button>
      </div>
    </div>
  );

  const accountContent = (
    <div className="space-y-6">
      <div>
        <p className="text-lg font-black">Account</p>
        <p className={"mt-1 text-sm " + muted}>Manage your account information and preferences.</p>
      </div>
      <div className={"rounded-2xl border p-5 " + soft}>
        <p className="text-sm font-black">Account Email</p>
        <p className={"mt-2 text-sm " + muted}>{email}</p>
      </div>
      <div className={"rounded-2xl border p-5 " + soft}>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-600">Appearance</p>
        <h3 className="mt-2 text-xl font-black">Choose your appearance</h3>
        <p className={"mt-1 text-sm " + muted}>Choose how ACEPA should look across your devices.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            ["light", "☀️", "Light", "Bright and clean"],
            ["dark", "🌙", "Dark", "Dark interface"],
            ["system", "🖥️", "Automatic / System", "Follow your device"],
          ].map(([value, icon, label, description]) => (
            <button key={value} onClick={() => chooseAppearance(value)} className={"rounded-2xl border p-4 text-left transition " + (appearance === value ? "border-purple-500 bg-purple-50 text-purple-700" : soft)}>
              <span className="text-xl">{icon}</span>
              <p className="mt-2 text-sm font-black">{label}</p>
              <p className={"mt-1 text-xs " + muted}>{description}</p>
            </button>
          ))}
        </div>
        <button onClick={saveAppearance} disabled={saving} className="mt-5 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700 disabled:opacity-60">
          {saving ? "Saving..." : "Save Appearance"}
        </button>
      </div>
    </div>
  );

  const genericTabContent = (
    <div className="space-y-6">
      <div>
        <p className="text-lg font-black">{activeTab}</p>
        <p className={"mt-1 text-sm " + muted}>Manage your {activeTab.toLowerCase()} preferences and controls.</p>
      </div>
      <div className={"grid gap-3 sm:grid-cols-2 " + soft}>
        {(activeTab === "Security"
          ? ["Change Password", "Two-Factor Authentication", "Login Sessions", "Download My Data"]
          : activeTab === "Notifications"
            ? ["Email Notifications", "Opportunity Notifications", "Activity Notifications", "Marketing Notifications"]
            : activeTab === "Privacy"
              ? ["Profile Visibility", "Data & Privacy", "Blocked Accounts", "Download Your Data"]
              : activeTab === "Payment Methods"
                ? ["Payment Methods", "Payout Preferences", "Billing Information", "Transaction History"]
                : ["API Keys", "Connected Integrations"]).map((item) => (
                  <button key={item} className={"rounded-2xl border p-5 text-left text-sm font-bold " + card}>
                    <MiniIcon>›</MiniIcon>
                    <span className="ml-3">{item}</span>
                  </button>
                ))}
      </div>
    </div>
  );

  const leftItems = activeTab === "Profile"
    ? profileItems
    : activeTab === "Account"
      ? ["Account Information", "Appearance", "Login & Sessions"]
      : activeTab === "Security"
        ? ["Password & Login", "Two-Factor Authentication", "Sessions"]
        : activeTab === "Notifications"
          ? ["Email Notifications", "Opportunity Notifications", "Activity Notifications"]
          : activeTab === "Privacy"
            ? ["Privacy Controls", "Data & Privacy"]
            : activeTab === "Payment Methods"
              ? ["Payment Methods", "Payout Preferences"]
              : ["API Keys", "Connected Integrations"];

  const selectedLeft = activeTab === "Profile" ? activeProfile : leftItems[0];

  const middleContent = activeTab === "Profile"
    ? (activeProfile === "Profile Information" ? profileContent : profilePlaceholder)
    : activeTab === "Account"
      ? accountContent
      : genericTabContent;

  return (
    <UserAccountShell>
      <main className={"min-h-screen " + surface}>
        <header className={"sticky top-0 z-30 border-b " + (dark ? "border-slate-800 bg-slate-950/95" : "border-slate-200 bg-white/95") + " backdrop-blur-md"}>
          <div className="mx-auto flex min-h-20 max-w-[1500px] items-center gap-5 px-5 lg:px-8">
            <Link href="/dashboard" className="flex shrink-0 items-center">
              <img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA" className={"h-11 w-auto object-contain " + (dark ? "" : "brightness-0")} />
            </Link>
            <div className="min-w-0">
              <p className="text-xl font-black">Settings</p>
              <p className={"hidden text-xs sm:block " + muted}>Manage your account, preferences and security settings.</p>
            </div>
            <div className={"ml-auto hidden h-11 w-72 items-center gap-2 rounded-xl border px-3 md:flex " + soft}>
              <span className="text-base text-slate-400">⌕</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search anything..." className={"w-full bg-transparent text-sm outline-none placeholder:text-slate-400 " + (dark ? "text-slate-100" : "text-slate-700")} />
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-5 py-6 lg:px-8">
          <div className={"overflow-x-auto border-b " + (dark ? "border-slate-800" : "border-slate-200")}>
            <nav className="flex min-w-max items-center gap-1">
              {filteredTabs.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={"border-b-2 px-4 py-3 text-sm font-bold transition " + (activeTab === tab ? "border-purple-600 text-purple-600" : "border-transparent " + muted)}>
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[230px_minmax(0,1fr)_320px]">
            <aside className="space-y-5">
              <section className={"rounded-3xl border p-3 shadow-sm " + card}>
                <p className="px-3 py-3 text-xs font-black uppercase tracking-[0.16em] text-purple-600">{activeTab === "Profile" ? "Profile contents" : activeTab}</p>
                <div className="space-y-1">
                  {leftItems.map((item, index) => {
                    const selected = item === selectedLeft;
                    return (
                      <button
                        key={item}
                        onClick={() => activeTab === "Profile" && setActiveProfile(item)}
                        className={"flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition " + (selected ? "bg-purple-50 text-purple-700 dark:bg-purple-950/40" : muted)}
                      >
                        <span className="text-base">{["♙", "▣", "⌖", "↗", "✓", "◉"][index % 6]}</span>
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className={"rounded-3xl border p-5 shadow-sm " + card}>
                <p className="text-sm font-black">Profile Completion</p>
                <div className="mx-auto mt-5 flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-purple-500/80">
                  <div className="text-center">
                    <p className="text-2xl font-black">{completion}%</p>
                    <p className={"text-[10px] " + muted}>Complete</p>
                  </div>
                </div>
                <p className={"mt-4 text-center text-xs leading-5 " + muted}>{completion >= 80 ? "Great job! You’re almost there." : "Complete your profile to get the most from ACEPA."}</p>
                <div className="mt-4 space-y-2">
                  {completionItems.map(([label, done]) => (
                    <div key={String(label)} className="flex items-center gap-2 text-xs">
                      <span className={done ? "text-emerald-500" : "text-slate-400"}>{done ? "●" : "○"}</span>
                      <span className={muted}>{String(label)}</span>
                      {done && <span className="ml-auto text-emerald-500">✓</span>}
                    </div>
                  ))}
                </div>
              </section>

              <section className={"rounded-3xl border p-5 shadow-sm " + card}>
                <MiniIcon>?</MiniIcon>
                <p className="mt-3 text-sm font-black">Need Help?</p>
                <p className={"mt-1 text-xs leading-5 " + muted}>Visit our Help Center or contact our support team.</p>
                <Link href="/support" className="mt-4 inline-flex rounded-xl border border-purple-300 px-4 py-2 text-xs font-bold text-purple-700">Go to Help Center</Link>
              </section>
            </aside>

            <section className={"min-w-0 rounded-3xl border p-6 shadow-sm sm:p-8 " + card}>
              {middleContent}
            </section>

            <aside className="space-y-5">
              <section className={"rounded-3xl border p-6 shadow-sm " + card}>
                <p className="text-sm font-black">Account Overview</p>
                <div className="mt-5 flex justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-purple-50 text-4xl text-purple-600 dark:bg-purple-950/40">✓</div>
                </div>
                <p className="mt-4 text-center text-sm font-black text-emerald-500">Your account is secure</p>
                <div className={"mt-3 space-y-1 text-center text-xs " + muted}>
                  <p>Last login: Current session</p>
                  <p>Web browser</p>
                </div>
                <button className="mt-5 w-full rounded-xl border border-purple-300 px-4 py-2.5 text-sm font-bold text-purple-700">View Security Activity</button>
              </section>

              <section className={"rounded-3xl border p-6 shadow-sm " + card}>
                <p className="text-sm font-black">Quick Actions</p>
                <div className="mt-4 space-y-2">
                  {[
                    ["🔒", "Change Password", "/forgot-password"],
                    ["◉", "Enable Two-Factor Auth", "#"],
                    ["↔", "Login Sessions", "#"],
                    ["⇩", "Download My Data", "#"],
                    ["▣", "Delete Account", "#"],
                  ].map(([icon, label, href]) => (
                    <Link key={label} href={href} className={"flex items-center gap-3 rounded-xl px-2 py-3 text-sm font-semibold transition hover:bg-purple-50 dark:hover:bg-purple-950/30 " + (label === "Delete Account" ? "text-red-500" : "")}>
                      <MiniIcon>{icon}</MiniIcon>
                      <span>{label}</span>
                      <span className="ml-auto">›</span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className={"rounded-3xl border p-6 shadow-sm " + card}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black">Device Sessions</p>
                  <button className="text-xs font-bold text-purple-600">View All</button>
                </div>
                <div className="mt-4 space-y-4">
                  {[
                    ["▣", "Current Web Session", "Browser · Active now", true],
                    ["▯", "Mobile Session", "Mobile device", false],
                    ["▤", "Desktop Session", "Desktop browser", false],
                  ].map(([icon, name, detail, current]) => (
                    <div key={String(name)} className="flex items-center gap-3">
                      <MiniIcon>{icon}</MiniIcon>
                      <div className="min-w-0">
                        <p className="text-xs font-bold">{name}</p>
                        <p className={"mt-1 text-[11px] " + muted}>{detail}</p>
                      </div>
                      {current && <span className="ml-auto rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">Current</span>}
                    </div>
                  ))}
                </div>
                <button className="mt-5 w-full rounded-xl border border-purple-300 px-4 py-2.5 text-sm font-bold text-purple-700">Manage Sessions</button>
              </section>
            </aside>
          </div>

          <section className={"mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border p-6 shadow-sm sm:p-7 " + (dark ? "border-purple-950/60 bg-purple-950/20" : "border-purple-100 bg-purple-50/70")}>
            <div>
              <p className="text-lg font-black">Your Security Matters</p>
              <p className={"mt-1 max-w-2xl text-sm leading-6 " + muted}>We use industry-standard security practices to help keep your account and data safe.</p>
            </div>
            <button className="rounded-xl border border-purple-300 px-5 py-2.5 text-sm font-bold text-purple-700">Learn More</button>
          </section>

          {message && <p className={"mt-4 rounded-2xl border p-4 text-sm font-semibold " + card}>{message}</p>}
        </div>
      </main>
    </UserAccountShell>
  );
}
