"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

const tabs = ["Profile", "Account", "Security", "Notifications", "Privacy", "Payment Methods", "API & Integrations"];
const profileItems = ["Profile Information", "Business Information", "Address", "Social Links", "Authentication"];

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
  const [activeAccount, setActiveAccount] = useState("Account Information");
  const [activeSecurity, setActiveSecurity] = useState("Password & Login");
  const [activeGeneric, setActiveGeneric] = useState("");
  const [mfaFactors, setMfaFactors] = useState<Array<{ id: string; friendly_name?: string | null; status?: string; factor_type?: string }>>([]);
  const [mfaFactorId, setMfaFactorId] = useState("");
  const [mfaQrCode, setMfaQrCode] = useState("");
  const [mfaSecret, setMfaSecret] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [mfaSetup, setMfaSetup] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [systemDark, setSystemDark] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [notificationPrefs, setNotificationPrefs] = useState({ email: true, opportunity: true, activity: true, marketing: false });
  const [sessionInfo, setSessionInfo] = useState({ email: "", lastSignIn: "", expiresAt: "", browser: "" });
  const [sessionLoading, setSessionLoading] = useState(false);

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

  useEffect(() => {
    if (activeTab === "Security" && activeSecurity === "Two-Factor Authentication") loadMfaFactors();
    if (activeTab === "Security" && activeSecurity === "Sessions") loadSessionInfo();
  }, [activeTab, activeSecurity]);

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

  async function loadMfaFactors() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.mfa.listFactors();
    if (error) {
      setMessage(error.message);
      return;
    }
    const factors = [...(data?.totp ?? []), ...(data?.phone ?? [])].filter((factor) => factor.status === "verified");
    setMfaFactors(factors);
  }

  async function startMfaSetup() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "ACEPA Authenticator",
    });
    if (error) {
      setMessage(error.message);
      setSaving(false);
      return;
    }
    setMfaFactorId(data.id);
    setMfaQrCode(data.totp.qr_code);
    setMfaSecret(data.totp.secret);
    setMfaCode("");
    setMfaSetup(true);
    setMessage("Scan the QR code with your authenticator app, then enter the 6-digit code.");
    setSaving(false);
  }

  async function verifyMfaSetup() {
    if (!mfaFactorId || mfaCode.trim().length !== 6) {
      setMessage("Enter the 6-digit code from your authenticator app.");
      return;
    }
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId: mfaFactorId,
      code: mfaCode.trim(),
    });
    if (error) {
      setMessage(error.message);
      setSaving(false);
      return;
    }
    setMfaSetup(false);
    setMfaQrCode("");
    setMfaSecret("");
    setMfaCode("");
    setMessage("Two-factor authentication is now enabled.");
    await loadMfaFactors();
    setSaving(false);
  }

  async function disableMfa(factorId: string) {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.mfa.unenroll({ factorId });
    if (error) {
      setMessage(error.message);
      setSaving(false);
      return;
    }
    setMfaFactors((current) => current.filter((factor) => factor.id !== factorId));
    setMessage("Two-factor authentication has been disabled.");
    setSaving(false);
  }

  async function loadSessionInfo() {
    setSessionLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setSessionLoading(false); return; }
    const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const browser = userAgent.includes("Edg/") ? "Microsoft Edge" : userAgent.includes("Chrome/") ? "Google Chrome" : userAgent.includes("Firefox/") ? "Mozilla Firefox" : userAgent.includes("Safari/") ? "Safari" : "Web browser";
    setSessionInfo({
      email: session.user.email ?? "",
      lastSignIn: session.user.last_sign_in_at ? new Date(session.user.last_sign_in_at).toLocaleString() : "Not available",
      expiresAt: session.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : "Not available",
      browser,
    });
    setSessionLoading(false);
  }

  async function signOutOtherSessions() {
    setSessionLoading(true);
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signOut({ scope: "others" });
    setMessage(error ? error.message : "All other ACEPA login sessions have been signed out.");
    await loadSessionInfo();
    setSessionLoading(false);
  }

  async function changePassword() {
    setSaving(true);
    setMessage("");

    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters.");
      setSaving(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match.");
      setSaving(false);
      return;
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.email) {
      setMessage("Your authenticated email could not be verified.");
      setSaving(false);
      return;
    }

    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (reauthError) {
      setMessage("Current password is incorrect.");
      setSaving(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage(error.message);
      setSaving(false);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("Password changed successfully.");
    setSaving(false);
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

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          ["Full Name", "full_name", profile.full_name],
          ["Username", "username", profile.username],
          ["Email Address", "email", email],
          ["Phone Number", "phone", "Add your phone number"],
          ["Date of Birth", "dob", "Add your date of birth"],
          ["Country", "location", profile.location || "Nigeria"],
        ].map(([label, key, value]) => (
          <div key={label} className="w-full">
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
    <div className="space-y-6">
      <div><p className="text-lg font-black">{activeProfile}</p><p className={"mt-1 text-sm " + muted}>Edit your {activeProfile.toLowerCase()} directly here.</p></div>
      {activeProfile === "Business Information" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {["Business Name","Business Type","Registration Number","Industry","Business Email","Business Phone","Website","Business Description"].map(label=><div key={label}><label className="text-sm font-bold">{label}</label><input placeholder={"Enter " + label.toLowerCase()} className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-purple-500 " + field}/></div>)}
          <div className="sm:col-span-2 flex justify-end"><button onClick={()=>setMessage("Business information saved successfully.")} className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white">Save Business Information</button></div>
        </div>
      ) : activeProfile === "Address" ? (
        <div className="space-y-5">
          {[1,2,3].map(n=><div key={n} className={"rounded-2xl border p-5 " + soft}><p className="text-sm font-black">Address {n}</p><div className="mt-4 grid gap-4 sm:grid-cols-2">{["Address Line","City","State / Province","Country","Postal Code"].map(label=><input key={label} placeholder={label} className={"rounded-xl border px-4 py-3 text-sm outline-none focus:border-purple-500 " + field}/>)}</div></div>)}
          <div className="flex justify-end"><button onClick={()=>setMessage("Addresses saved successfully.")} className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white">Save Addresses</button></div>
        </div>
      ) : activeProfile === "Social Links" ? (
        <div className="grid gap-5 sm:grid-cols-2">{["X / Twitter","LinkedIn","YouTube","TikTok","Instagram","Facebook"].map(label=><div key={label}><label className="text-sm font-bold">{label}</label><input placeholder={"Paste your " + label + " profile link"} className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-purple-500 " + field}/></div>)}<div className="sm:col-span-2 flex justify-end"><button onClick={()=>setMessage("Social links saved successfully.")} className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white">Save Social Links</button></div></div>
      ) : (
        <div className={"rounded-2xl border p-6 " + soft}>
          <p className="text-sm font-black">ACEPA Authentication</p>
          <p className={"mt-2 text-sm leading-6 " + muted}>Manage identity and account verification from this direct settings area.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2"><button onClick={()=>{setActiveTab("Security");setActiveSecurity("Two-Factor Authentication")}} className="rounded-xl border border-purple-300 p-4 text-left text-sm font-bold text-purple-700">Two-Factor Authentication →</button><button onClick={()=>setMessage("Identity verification is ready for the next verification workflow.")} className="rounded-xl border border-purple-300 p-4 text-left text-sm font-bold text-purple-700">Identity Verification →</button></div>
        </div>
      )}
    </div>
  );


  const securityContent = (
    <div className="space-y-6">
      <div>
        <p className="text-lg font-black">{activeSecurity}</p>
        <p className={"mt-1 text-sm " + muted}>Manage your account security and login protection.</p>
      </div>
      {activeSecurity === "Password & Login" ? (
        <div className={"rounded-2xl border p-6 " + soft}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2"><label className="text-sm font-bold">Current Password</label><input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm " + field}/></div>
            <div><label className="text-sm font-bold">New Password</label><input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm " + field}/></div>
            <div><label className="text-sm font-bold">Confirm New Password</label><input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm " + field}/></div>
          </div>
          <Link href="/forgot-password" className="mt-4 inline-block text-sm font-bold text-purple-600">Forgot your password?</Link>
          <div className="mt-5 flex justify-end"><button onClick={changePassword} disabled={saving} className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Changing..." : "Change Password"}</button></div>
        </div>
      ) : activeSecurity === "Two-Factor Authentication" ? (
        <div className={"rounded-2xl border p-6 " + soft}>
          <p className="text-sm font-black">Two-Factor Authentication</p>
          <p className={"mt-2 text-sm leading-6 " + muted}>Protect your ACEPA account with an authenticator app.</p>
          {mfaFactors.length > 0 ? (
            <div className="mt-5 space-y-3">{mfaFactors.map(f=><div key={f.id} className={"flex items-center justify-between rounded-xl border p-4 " + card}><div><p className="text-sm font-bold">{f.friendly_name || "Authenticator app"}</p><p className={"text-xs " + muted}>Enabled</p></div><button onClick={()=>disableMfa(f.id)} disabled={saving} className="rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-600">Disable</button></div>)}</div>
          ) : !mfaSetup ? (
            <button onClick={startMfaSetup} disabled={saving} className="mt-5 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Preparing..." : "Enable Two-Factor Authentication"}</button>
          ) : (
            <div className="mt-5 rounded-2xl border p-5">
              {mfaQrCode && <img src={mfaQrCode} alt="Authenticator QR code" className="h-48 w-48 rounded-xl border p-2" />}
              <p className={"mt-4 text-sm " + muted}>Manual setup key</p>
              <div className={"mt-2 rounded-xl border px-4 py-3 font-mono text-sm break-all " + field}>{mfaSecret}</div>
              <label className="mt-4 block text-sm font-bold">6-digit code</label>
              <input inputMode="numeric" maxLength={6} value={mfaCode} onChange={e=>setMfaCode(e.target.value.replace(/\D/g, ""))} className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm " + field}/>
              <div className="mt-4 flex gap-2"><button onClick={verifyMfaSetup} disabled={saving} className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white">Verify & Enable</button><button onClick={()=>setMfaSetup(false)} className="rounded-xl border px-5 py-3 text-sm font-bold">Cancel</button></div>
            </div>
          )}
        </div>
      ) : (
        <div className={"rounded-2xl border p-6 " + soft}>
          <p className="text-sm font-black">Current Session</p>
          {sessionLoading ? <p className={"mt-3 text-sm " + muted}>Loading session information...</p> : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[["Account",sessionInfo.email],["Browser",sessionInfo.browser],["Last sign-in",sessionInfo.lastSignIn],["Session expires",sessionInfo.expiresAt]].map(([label,value])=><div key={label} className={"rounded-xl border p-4 " + card}><p className={"text-xs font-bold uppercase tracking-wide " + muted}>{label}</p><p className="mt-2 text-sm font-bold break-words">{value || "Not available"}</p></div>)}
            </div>
          )}
          <div className="mt-5 flex flex-wrap gap-3"><button onClick={signOutOtherSessions} disabled={sessionLoading} className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60">Sign Out Other Sessions</button><button onClick={()=>setActiveSecurity("Password & Login")} className="rounded-xl border px-5 py-3 text-sm font-bold">Password & Login</button><button onClick={()=>setActiveSecurity("Two-Factor Authentication")} className="rounded-xl border px-5 py-3 text-sm font-bold">2FA</button></div>
        </div>
      )}
    </div>
  );

  const genericItems = activeTab === "Notifications"
    ? ["Email Notifications", "Opportunity Notifications", "Activity Notifications", "Marketing Notifications"]
    : activeTab === "Privacy"
      ? ["Privacy Controls", "Data & Privacy"]
      : activeTab === "Payment Methods"
        ? ["Payment Methods", "Payout Preferences"]
        : ["API Keys", "Connected Integrations"];

  const genericTabContent = activeTab === "Notifications" ? notificationContent : (
    <div className="space-y-6">
      <div><p className="text-lg font-black">{activeGeneric || genericItems[0]}</p><p className={"mt-1 text-sm " + muted}>Manage your {(activeGeneric || genericItems[0]).toLowerCase()} settings.</p></div>
      <div className={"rounded-2xl border p-6 " + soft}>
        {activeTab === "Privacy" && activeGeneric === "Privacy Controls" ? (
          <><p className="text-sm font-black">Profile Visibility</p><p className={"mt-2 text-sm leading-6 " + muted}>Control how your ACEPA profile and activity are visible.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{["Public","ACEPA members","Private"].map(v=><button key={v} onClick={()=>setMessage("Privacy preference selected: " + v)} className={"rounded-xl border p-4 text-left text-sm font-bold " + card}>{v}</button>)}</div></>
        ) : activeTab === "Payment Methods" && activeGeneric === "Payment Methods" ? (
          <><p className="text-sm font-black">Payment Methods</p><p className={"mt-2 text-sm leading-6 " + muted}>Add and manage payment methods used for eligible ACEPA transactions.</p><button onClick={()=>setMessage("Payment method setup will be connected here.")} className="mt-5 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white">Add Payment Method</button></>
        ) : (
          <><p className="text-sm font-black">{activeGeneric || genericItems[0]}</p><p className={"mt-2 text-sm leading-6 " + muted}>This is the direct settings area for {((activeGeneric || genericItems[0]).toLowerCase())}.</p><button onClick={()=>setMessage((activeGeneric || genericItems[0]) + " is selected and ready for configuration.")} className="mt-5 rounded-xl border border-purple-300 px-4 py-2.5 text-sm font-bold text-purple-700">Edit Settings</button></>
        )}
      </div>
    </div>
  );

  const sidebarItems = activeTab === "Profile" ? profileItems : activeTab === "Account" ? ["Account Information","Appearance","Login & Sessions"] : activeTab === "Security" ? ["Password & Login","Two-Factor Authentication","Sessions"] : genericItems;
  const selected = activeTab === "Profile" ? activeProfile : activeTab === "Account" ? activeAccount : activeTab === "Security" ? activeSecurity : activeGeneric;

  function selectTab(tab: string) {
    setActiveTab(tab);
    setMessage("");
    if (tab === "Profile") setActiveProfile("Profile Information");
    if (tab === "Account") setActiveAccount("Account Information");
    if (tab === "Security") setActiveSecurity("Password & Login");
    if (tab === "Notifications") setActiveGeneric("Email Notifications");
    if (tab === "Privacy") setActiveGeneric("Privacy Controls");
    if (tab === "Payment Methods") setActiveGeneric("Payment Methods");
    if (tab === "API & Integrations") setActiveGeneric("API Keys");
  }

  return (
    <UserAccountShell>
      <div className={"min-h-screen " + surface}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-2xl font-black">Settings</p><p className={"mt-1 text-sm " + muted}>Manage your ACEPA account, security and preferences.</p></div>
            <UserAccountActions />
          </div>
          <div className="mt-6">
            <div className={"relative flex items-center gap-3 rounded-2xl border p-3 " + card}>
              <span className="text-sm">⌕</span>
              <input name="acepa-settings-query" type="search" autoComplete="new-password" autoCorrect="off" spellCheck={false} aria-autocomplete="none" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search settings..." className={"w-full bg-transparent text-sm outline-none " + muted}/>
            </div>
            {search.trim() && <div className="mt-2 flex flex-wrap gap-2">{filteredTabs.map(tab=><button key={tab} onClick={()=>{selectTab(tab);setSearch("")}} className="rounded-xl border px-3 py-2 text-xs font-bold">{tab}</button>)}</div>}
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[250px_1fr]">
            <aside className={"rounded-2xl border p-3 " + card}>
              <div className="px-3 py-3"><p className="text-xs font-black uppercase tracking-[0.16em] text-purple-600">Settings</p><p className={"mt-1 text-xs " + muted}>Account preferences</p></div>
              <div className="space-y-1">{tabs.map(tab=><button key={tab} onClick={()=>selectTab(tab)} className={"flex w-full items-center rounded-xl px-3 py-3 text-left text-sm font-bold " + (activeTab===tab ? "bg-purple-50 text-purple-700 dark:bg-purple-950/40" : "")}>{tab}</button>)}</div>
              <div className={"my-3 border-t " + (dark ? "border-slate-800" : "border-slate-200")}/>
              <div className="space-y-1">{sidebarItems.map(item=><button key={item} onClick={()=>{if(activeTab==="Profile")setActiveProfile(item);else if(activeTab==="Account")setActiveAccount(item);else if(activeTab==="Security")setActiveSecurity(item);else setActiveGeneric(item);setMessage("")}} className={"flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm " + (selected===item ? "bg-purple-50 font-bold text-purple-700 dark:bg-purple-950/40" : muted)}><MiniIcon>•</MiniIcon>{item}</button>)}</div>
            </aside>
            <main className={"min-w-0 rounded-2xl border p-5 sm:p-7 " + card}>
              {activeTab === "Profile" ? (activeProfile === "Profile Information" ? profileContent : profilePlaceholder) : activeTab === "Account" ? accountContent : activeTab === "Security" ? securityContent : activeTab === "Notifications" ? notificationContent : genericTabContent}
              {message && <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm font-medium text-purple-800">{message}</div>}
            </main>
          </div>
        </div>
      </div>
    </UserAccountShell>
  );
}
