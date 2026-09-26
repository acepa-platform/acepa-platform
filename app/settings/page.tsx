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
  phone_number: string;
  date_of_birth: string;
  country: string;
  avatar_url: string;
  website: string;
};

type BusinessInfo = {
  business_name: string;
  business_type: string;
  registration_number: string;
  industry: string;
  business_email: string;
  business_phone: string;
  website: string;
  description: string;
};

type Address = {
  address_line: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
};

type SocialLinks = {
  x: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
  instagram: string;
  facebook: string;
};

type PaymentMethod = {
  id: string;
  method_type: "card" | "bank_account" | "wallet" | "other";
  provider: string | null;
  label: string;
  last4: string | null;
  external_reference: string | null;
  status: "active" | "inactive";
};

const emptyProfile: Profile = {
  full_name: "",
  username: "",
  bio: "",
  location: "",
  phone_number: "",
  date_of_birth: "",
  country: "Nigeria",
  avatar_url: "",
  website: "",
};

const emptyBusinessInfo: BusinessInfo = {
  business_name: "",
  business_type: "",
  registration_number: "",
  industry: "",
  business_email: "",
  business_phone: "",
  website: "",
  description: "",
};

const emptyAddress: Address = {
  address_line: "",
  city: "",
  state: "",
  country: "Nigeria",
  postal_code: "",
};

const emptySocialLinks: SocialLinks = {
  x: "",
  linkedin: "",
  youtube: "",
  tiktok: "",
  instagram: "",
  facebook: "",
};

function MiniIcon({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-sm text-purple-600 dark:bg-purple-950/40">{children}</span>;
}

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(emptyBusinessInfo);
  const [addresses, setAddresses] = useState<Address[]>([
    { ...emptyAddress },
    { ...emptyAddress },
    { ...emptyAddress },
  ]);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(emptySocialLinks);
  const [identityStatus, setIdentityStatus] = useState("not_started");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [paymentDraft, setPaymentDraft] = useState({
    method_type: "card" as PaymentMethod["method_type"],
    provider: "",
    label: "",
    last4: "",
    external_reference: "",
  });
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
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [sessionInfo, setSessionInfo] = useState({ email: "", lastSignIn: "", expiresAt: "", browser: "" });
  const [avatarUploading, setAvatarUploading] = useState(false);
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

    const [{ data: profileData, error: profileError }, { data: preferenceData, error: preferenceError }] = await Promise.all([
      supabase.from("profiles").select("full_name,username,bio,location,phone_number,date_of_birth,country,avatar_url,website,business_info,addresses,social_links,identity_status").eq("id", user.id).maybeSingle(),
      supabase.from("user_preferences").select("appearance,email_notifications,opportunity_notifications,activity_notifications,marketing_notifications,profile_visibility").eq("user_id", user.id).maybeSingle(),
    ]);

    if (profileError) setMessage(profileError.message);
    if (preferenceError) setMessage(preferenceError.message);

    setProfile({
      full_name: profileData?.full_name ?? "",
      username: profileData?.username ?? "",
      bio: profileData?.bio ?? "",
      location: profileData?.location ?? "",
      phone_number: profileData?.phone_number ?? "",
      date_of_birth: profileData?.date_of_birth ?? "",
      country: profileData?.country ?? "Nigeria",
      avatar_url: profileData?.avatar_url ?? "",
      website: profileData?.website ?? "",
    });

    setBusinessInfo({ ...emptyBusinessInfo, ...(profileData?.business_info ?? {}) });
    const savedAddresses = Array.isArray(profileData?.addresses) ? profileData.addresses.slice(0, 3) : [];
    setAddresses([0,1,2].map((index) => ({ ...emptyAddress, ...(savedAddresses[index] ?? {}) })));
    setSocialLinks({ ...emptySocialLinks, ...(profileData?.social_links ?? {}) });
    setIdentityStatus(profileData?.identity_status ?? "not_started");
    setNotificationPrefs({
      email: preferenceData?.email_notifications ?? true,
      opportunity: preferenceData?.opportunity_notifications ?? true,
      activity: preferenceData?.activity_notifications ?? true,
      marketing: preferenceData?.marketing_notifications ?? false,
    });
    setProfileVisibility(preferenceData?.profile_visibility ?? "public");
    const savedAppearance = localStorage.getItem("acepa-appearance");
    const nextAppearance = savedAppearance || preferenceData?.appearance || "system";
    setAppearance(nextAppearance);
    localStorage.setItem("acepa-appearance", nextAppearance);
    window.dispatchEvent(new CustomEvent("acepa-appearance-change", { detail: nextAppearance }));
    const { data: paymentData, error: paymentError } = await supabase
      .from("payment_methods")
      .select("id,method_type,provider,label,last4,external_reference,status")
      .order("created_at", { ascending: false });
    if (!paymentError) setPaymentMethods((paymentData ?? []) as PaymentMethod[]);
    else setMessage(paymentError.message);
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
        phone_number: profile.phone_number || null,
        date_of_birth: profile.date_of_birth || null,
        country: profile.country || null,
        avatar_url: profile.avatar_url || null,
        website: profile.website || null,
      })
      .eq("id", user.id);

    setMessage(error ? error.message : "Profile changes saved successfully.");
    setSaving(false);
  }

  async function saveBusinessInfo() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    const { error } = await supabase.from("profiles").update({ business_info: businessInfo }).eq("id", user.id);
    setMessage(error ? error.message : "Business information saved successfully.");
    setSaving(false);
  }

  async function saveAddresses() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    const cleaned = addresses
      .map((address) => ({
        address_line: address.address_line.trim(),
        city: address.city.trim(),
        state: address.state.trim(),
        country: address.country.trim(),
        postal_code: address.postal_code.trim(),
      }))
      .filter((address) => Object.values(address).some(Boolean))
      .slice(0, 3);

    const { error } = await supabase.from("profiles").update({ addresses: cleaned }).eq("id", user.id);
    if (!error) {
      setAddresses([0,1,2].map((index) => ({ ...emptyAddress, ...(cleaned[index] ?? {}) })));
    }
    setMessage(error ? error.message : "Addresses saved successfully.");
    setSaving(false);
  }

  async function saveSocialLinks() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    const cleaned = Object.fromEntries(
      Object.entries(socialLinks).map(([key, value]) => [key, value.trim()])
    ) as SocialLinks;

    const { error } = await supabase.from("profiles").update({ social_links: cleaned }).eq("id", user.id);
    setSocialLinks(cleaned);
    setMessage(error ? error.message : "Social links saved successfully.");
    setSaving(false);
  }

  async function saveNotificationPreferences() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    const { error } = await supabase.from("user_preferences").upsert({
      user_id: user.id,
      appearance,
      email_notifications: notificationPrefs.email,
      opportunity_notifications: notificationPrefs.opportunity,
      activity_notifications: notificationPrefs.activity,
      marketing_notifications: notificationPrefs.marketing,
      profile_visibility: profileVisibility,
    });

    setMessage(error ? error.message : "Notification preferences saved successfully.");
    setSaving(false);
  }

  async function savePrivacy() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    const { error } = await supabase.from("user_preferences").upsert({
      user_id: user.id,
      appearance,
      email_notifications: notificationPrefs.email,
      opportunity_notifications: notificationPrefs.opportunity,
      activity_notifications: notificationPrefs.activity,
      marketing_notifications: notificationPrefs.marketing,
      profile_visibility: profileVisibility,
    });

    setMessage(error ? error.message : "Privacy preference saved successfully.");
    setSaving(false);
  }

  async function addPaymentMethod() {
    setSaving(true);
    setMessage("");

    const label = paymentDraft.label.trim();
    const last4 = paymentDraft.last4.trim();
    if (!label) {
      setMessage("Add a name for this payment method.");
      setSaving(false);
      return;
    }
    if (last4 && !/^\d{4}$/.test(last4)) {
      setMessage("Last four digits must contain exactly 4 numbers.");
      setSaving(false);
      return;
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    const { data, error } = await supabase.from("payment_methods").insert({
      user_id: user.id,
      method_type: paymentDraft.method_type,
      provider: paymentDraft.provider.trim() || null,
      label,
      last4: last4 || null,
      external_reference: paymentDraft.external_reference.trim() || null,
      status: "active",
    }).select("id,method_type,provider,label,last4,external_reference,status").single();

    if (!error && data) {
      setPaymentMethods((current) => [data as PaymentMethod, ...current]);
      setPaymentDraft({ method_type: "card", provider: "", label: "", last4: "", external_reference: "" });
      setMessage("Payment method saved successfully.");
    } else {
      setMessage(error?.message ?? "Unable to save payment method.");
    }
    setSaving(false);
  }

  async function removePaymentMethod(id: string) {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.from("payment_methods").delete().eq("id", id);
    if (!error) {
      setPaymentMethods((current) => current.filter((method) => method.id !== id));
      setMessage("Payment method removed.");
    } else {
      setMessage(error.message);
    }
    setSaving(false);
  }

  async function changeAvatar(file: File | null) {
    if (!file) return;
    if (!["image/jpeg","image/png","image/gif","image/webp"].includes(file.type)) {
      setMessage("Use JPG, PNG, GIF or WebP for your profile photo.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Profile photo must be 5MB or smaller.");
      return;
    }

    setAvatarUploading(true);
    setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setAvatarUploading(false); return; }

    const path = user.id + "/avatar";
    const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, {
      upsert: true,
      cacheControl: "3600",
      contentType: file.type,
    });

    if (uploadError) {
      setMessage(uploadError.message);
      setAvatarUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage.from("avatars").getPublicUrl(path);
    const avatarUrl = publicData.publicUrl + "?v=" + Date.now();
    const { error: profileError } = await supabase.from("profiles").update({ avatar_url: avatarUrl }).eq("id", user.id);

    setMessage(profileError ? profileError.message : "Profile photo updated successfully.");
    if (!profileError) setProfile((current) => ({ ...current, avatar_url: avatarUrl }));
    setAvatarUploading(false);
  }

  async function removeAvatar() {
    if (!profile.avatar_url) return;

    setAvatarUploading(true);
    setMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setAvatarUploading(false);
      return;
    }

    const paths = new Set<string>([user.id + "/avatar"]);
    const marker = "/storage/v1/object/public/avatars/";
    const markerIndex = profile.avatar_url.indexOf(marker);
    if (markerIndex >= 0) {
      const storedPath = decodeURIComponent(profile.avatar_url.slice(markerIndex + marker.length).split("?")[0]);
      if (storedPath) paths.add(storedPath);
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ avatar_url: null })
      .eq("id", user.id);

    if (profileError) {
      setMessage(profileError.message);
      setAvatarUploading(false);
      return;
    }

    setProfile((current) => ({ ...current, avatar_url: "" }));

    const { error: storageError } = await supabase
      .storage
      .from("avatars")
      .remove(Array.from(paths));

    if (storageError) {
      setMessage("Profile photo removed from your profile. The old image file could not be cleaned up: " + storageError.message);
    } else {
      setMessage("Profile photo removed successfully.");
    }

    setAvatarUploading(false);
  }

  function updateAddress(index: number, key: keyof Address, value: string) {
    setAddresses((current) => current.map((address, addressIndex) => addressIndex === index ? { ...address, [key]: value } : address));
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
              <label className={"rounded-xl border border-purple-300 px-4 py-2 text-sm font-bold text-purple-700 cursor-pointer " + (avatarUploading ? "opacity-60 pointer-events-none" : "")}>
                {avatarUploading ? "Uploading..." : "Change Photo"}
                <input type="file" accept="image/jpeg,image/png,image/gif,image/webp" className="hidden" disabled={avatarUploading} onChange={(event) => changeAvatar(event.target.files?.[0] ?? null)} />
              </label>
              <button type="button" onClick={removeAvatar} disabled={avatarUploading || !profile.avatar_url} className="rounded-xl px-4 py-2 text-sm font-bold text-red-500 disabled:opacity-40">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          ["Full Name", "full_name", profile.full_name],
          ["Username", "username", profile.username],
          ["Email Address", "email", email],
          ["Phone Number", "phone_number", profile.phone_number],
          ["Date of Birth", "date_of_birth", profile.date_of_birth],
          ["Country", "country", profile.country],
        ].map(([label, key, value]) => (
          <div key={label} className="w-full">
            <label className="text-sm font-bold">{label}</label>
            <input
              type={key === "date_of_birth" ? "date" : "text"}
              value={String(value)}
              disabled={key === "email"}
              placeholder={
                key === "phone_number"
                  ? "+234 800 000 0000"
                  : key === "country"
                    ? "Nigeria"
                    : ""
              }
              onChange={(event) => {
                if (key === "full_name" || key === "username" || key === "location" || key === "phone_number" || key === "date_of_birth" || key === "country") {
                  setProfile((current) => ({ ...current, [key]: event.target.value }));
                }
              }}
              className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-purple-500 " + field + (key === "email" ? " opacity-80" : "")}
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
          {([
            ["business_name","Business Name"],
            ["business_type","Business Type"],
            ["registration_number","Registration Number"],
            ["industry","Industry"],
            ["business_email","Business Email"],
            ["business_phone","Business Phone"],
            ["website","Website"],
          ] as const).map(([key,label]) => (
            <div key={key}>
              <label className="text-sm font-bold">{label}</label>
              <input value={businessInfo[key]} onChange={(event) => setBusinessInfo((current) => ({ ...current, [key]: event.target.value }))} placeholder={"Enter " + label.toLowerCase()} className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-purple-500 " + field}/>
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="text-sm font-bold">Business Description</label>
            <textarea value={businessInfo.description} onChange={(event) => setBusinessInfo((current) => ({ ...current, description: event.target.value }))} rows={4} className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-purple-500 " + field}/>
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button onClick={saveBusinessInfo} disabled={saving} className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save Business Information"}</button>
          </div>
        </div>
      ) : activeProfile === "Address" ? (
        <div className="space-y-5">
          <p className={"text-sm " + muted}>You can save up to 3 addresses.</p>
          {addresses.map((address,index)=><div key={index} className={"rounded-2xl border p-5 " + soft}>
            <p className="text-sm font-black">Address {index + 1}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {([
                ["address_line","Address Line"],
                ["city","City"],
                ["state","State / Province"],
                ["country","Country"],
                ["postal_code","Postal Code"],
              ] as const).map(([key,label])=><input key={key} value={address[key]} onChange={(event)=>updateAddress(index,key,event.target.value)} placeholder={label} className={"rounded-xl border px-4 py-3 text-sm outline-none focus:border-purple-500 " + field}/>)}
            </div>
          </div>)}
          <div className="flex justify-end"><button onClick={saveAddresses} disabled={saving} className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save Addresses"}</button></div>
        </div>
      ) : activeProfile === "Social Links" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {([
            ["x","X / Twitter"],
            ["linkedin","LinkedIn"],
            ["youtube","YouTube"],
            ["tiktok","TikTok"],
            ["instagram","Instagram"],
            ["facebook","Facebook"],
          ] as const).map(([key,label])=><div key={key}><label className="text-sm font-bold">{label}</label><input value={socialLinks[key]} onChange={(event)=>setSocialLinks((current)=>({...current,[key]:event.target.value}))} placeholder={"Paste your " + label + " profile link"} className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-purple-500 " + field}/></div>)}
          <div className="sm:col-span-2 flex justify-end"><button onClick={saveSocialLinks} disabled={saving} className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save Social Links"}</button></div>
        </div>
      ) : (
        <div className={"rounded-2xl border p-6 " + soft}>
          <p className="text-sm font-black">ACEPA Authentication</p>
          <p className={"mt-2 text-sm leading-6 " + muted}>Use two-factor authentication to protect your account. Identity verification is a separate review process.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button onClick={()=>{setActiveTab("Security");setActiveSecurity("Two-Factor Authentication")}} className="rounded-xl border border-purple-300 p-4 text-left text-sm font-bold text-purple-700">Two-Factor Authentication →</button>
            <div className={"rounded-xl border p-4 " + card}>
              <p className="text-sm font-bold">Identity Verification</p>
              <p className={"mt-1 text-xs " + muted}>Status: {identityStatus === "not_started" ? "Not started" : identityStatus}</p>
              <p className={"mt-2 text-xs leading-5 " + muted}>Identity verification requires a dedicated verification workflow/provider before documents can be submitted securely.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const accountContent = (
    <div className="space-y-6">
      <div>
        <p className="text-lg font-black">{activeAccount}</p>
        <p className={"mt-1 text-sm " + muted}>Manage your account preferences and access settings.</p>
      </div>
      {activeAccount === "Account Information" ? (
        <div className={"rounded-2xl border p-6 " + soft}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div><label className="text-sm font-bold">Account Email</label><input value={email} disabled className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm opacity-80 " + field}/></div>
            <div><label className="text-sm font-bold">Username</label><input value={profile.username} onChange={e=>setProfile(v=>({...v,username:e.target.value}))} className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm " + field}/></div>
          </div>
          <div className="mt-5 flex justify-end"><button onClick={saveProfile} disabled={saving} className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save Account Information"}</button></div>
        </div>
      ) : activeAccount === "Appearance" ? (
        <div className={"rounded-2xl border p-6 " + soft}>
          <p className="text-sm font-black">Appearance</p>
          <p className={"mt-2 text-sm " + muted}>Choose how ACEPA looks on your device.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["light","dark","system"].map(value=><button key={value} onClick={()=>chooseAppearance(value)} className={"rounded-xl border p-4 text-left " + (appearance===value ? "border-purple-500 bg-purple-50 dark:bg-purple-950/40" : "")}><p className="text-sm font-bold">{value==="light"?"Light":value==="dark"?"Dark":"Automatic / System"}</p><p className={"mt-1 text-xs " + muted}>{appearance===value ? "Selected" : "Use this appearance"}</p></button>)}
          </div>
          <div className="mt-5 flex justify-end"><button onClick={saveAppearance} disabled={saving} className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save Appearance"}</button></div>
        </div>
      ) : (
        <div className={"rounded-2xl border p-6 " + soft}>
          <p className="text-sm font-black">Login & Sessions</p>
          <p className={"mt-2 text-sm leading-6 " + muted}>Review active sessions and account security.</p>
          <button onClick={()=>{setActiveTab("Security");setActiveSecurity("Sessions")}} className="mt-5 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white">Manage Sessions</button>
        </div>
      )}
    </div>
  );

  const notificationContent = (
    <div className="space-y-6">
      <div>
        <p className="text-lg font-black">{activeGeneric || "Email Notifications"}</p>
        <p className={"mt-1 text-sm " + muted}>Choose which ACEPA notifications you want to receive.</p>
      </div>
      <div className={"rounded-2xl border p-6 " + soft}>
        {([
          ["email","Email Notifications","Receive important account and platform emails."],
          ["opportunity","Opportunity Notifications","Get updates about opportunities relevant to you."],
          ["activity","Activity Notifications","Receive alerts about activity on your account and participation."],
          ["marketing","Marketing Notifications","Receive ACEPA news, product updates and promotional messages."]
        ] as const).map(([key,title,description])=>(
          <div key={key} className="flex items-center justify-between gap-4 border-b py-4 last:border-b-0">
            <div><p className="text-sm font-bold">{title}</p><p className={"mt-1 text-xs leading-5 " + muted}>{description}</p></div>
            <button type="button" aria-pressed={notificationPrefs[key]} onClick={()=>setNotificationPrefs(v=>({...v,[key]:!v[key]}))} className={"relative h-7 w-12 shrink-0 rounded-full transition " + (notificationPrefs[key] ? "bg-purple-600" : "bg-slate-300 dark:bg-slate-700")}><span className={"absolute top-1 h-5 w-5 rounded-full bg-white transition " + (notificationPrefs[key] ? "left-6" : "left-1")}/></button>
          </div>
        ))}
        <div className="mt-5 flex justify-end"><button onClick={saveNotificationPreferences} disabled={saving} className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save Notification Preferences"}</button></div>
      </div>
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

  const genericTabContent = (
    <div className="space-y-6">
      <div><p className="text-lg font-black">{activeGeneric || genericItems[0]}</p><p className={"mt-1 text-sm " + muted}>Manage your {(activeGeneric || genericItems[0]).toLowerCase()} settings.</p></div>
      <div className={"rounded-2xl border p-6 " + soft}>
        {activeTab === "Privacy" && activeGeneric === "Privacy Controls" ? (
          <>
            <p className="text-sm font-black">Profile Visibility</p>
            <p className={"mt-2 text-sm leading-6 " + muted}>Control how your ACEPA profile is visible.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["public","Public"],
                ["members","ACEPA members"],
                ["private","Private"],
              ].map(([value,label])=><button key={value} onClick={()=>setProfileVisibility(value)} className={"rounded-xl border p-4 text-left text-sm font-bold " + (profileVisibility===value ? "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-950/40" : card)}>{label}<p className={"mt-1 text-xs font-normal " + muted}>{profileVisibility===value ? "Selected" : "Choose this setting"}</p></button>)}
            </div>
            <div className="mt-5 flex justify-end"><button onClick={savePrivacy} disabled={saving} className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save Privacy Settings"}</button></div>
          </>
        ) : activeTab === "Privacy" && activeGeneric === "Data & Privacy" ? (
          <>
            <p className="text-sm font-black">Data & Privacy</p>
            <p className={"mt-2 text-sm leading-6 " + muted}>Your account profile and preference data is stored under your authenticated ACEPA account. Data export and account deletion workflows will be added before public launch.</p>
          </>
        ) : activeTab === "Payment Methods" && activeGeneric === "Payment Methods" ? (
          <>
            <p className="text-sm font-black">Saved Payment Methods</p>
            <p className={"mt-2 text-sm leading-6 " + muted}>You can save non-sensitive payment method details here. ACEPA does not store full card numbers, CVV, PINs or bank passwords.</p>
            <div className="mt-5 space-y-3">
              {paymentMethods.length === 0 ? <p className={"rounded-xl border border-dashed p-4 text-sm " + muted}>No payment methods saved yet.</p> : paymentMethods.map((method)=><div key={method.id} className={"flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 " + card}><div><p className="text-sm font-bold">{method.label}</p><p className={"mt-1 text-xs " + muted}>{method.method_type.replace("_"," ")}{method.provider ? " • " + method.provider : ""}{method.last4 ? " •••• " + method.last4 : ""}</p></div><button onClick={()=>removePaymentMethod(method.id)} disabled={saving} className="rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-600 disabled:opacity-50">Remove</button></div>)}
            </div>
            <div className={"mt-6 rounded-2xl border p-5 " + card}>
              <p className="text-sm font-black">Add a payment method</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <select value={paymentDraft.method_type} onChange={(event)=>setPaymentDraft((current)=>({...current,method_type:event.target.value as PaymentMethod["method_type"]}))} className={"rounded-xl border px-4 py-3 text-sm " + field}>
                  <option value="card">Card</option><option value="bank_account">Bank Account</option><option value="wallet">Wallet</option><option value="other">Other</option>
                </select>
                <input value={paymentDraft.label} onChange={(event)=>setPaymentDraft((current)=>({...current,label:event.target.value}))} placeholder="Name (e.g. Main Card)" className={"rounded-xl border px-4 py-3 text-sm " + field}/>
                <input value={paymentDraft.provider} onChange={(event)=>setPaymentDraft((current)=>({...current,provider:event.target.value}))} placeholder="Provider (e.g. Stripe)" className={"rounded-xl border px-4 py-3 text-sm " + field}/>
                <input value={paymentDraft.last4} onChange={(event)=>setPaymentDraft((current)=>({...current,last4:event.target.value.replace(/\D/g, "").slice(0,4)}))} inputMode="numeric" maxLength={4} placeholder="Last 4 digits (optional)" className={"rounded-xl border px-4 py-3 text-sm " + field}/>
                <input value={paymentDraft.external_reference} onChange={(event)=>setPaymentDraft((current)=>({...current,external_reference:event.target.value}))} placeholder="Provider reference (optional)" className={"sm:col-span-2 rounded-xl border px-4 py-3 text-sm " + field}/>
              </div>
              <div className="mt-5 flex justify-end"><button onClick={addPaymentMethod} disabled={saving} className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save Payment Method"}</button></div>
            </div>
            <p className={"mt-3 text-xs " + muted}>Actual card/bank credential linking will be handled by a connected payment provider when ACEPA enables live payment processing.</p>
          </>
        ) : activeTab === "Payment Methods" && activeGeneric === "Payout Preferences" ? (
          <>
            <p className="text-sm font-black">Payout Preferences</p>
            <p className={"mt-2 text-sm leading-6 " + muted}>Choose payout rules and a default payout method after a live payout provider is connected. Your saved payment methods will be available here later.</p>
          </>
        ) : activeTab === "API & Integrations" && activeGeneric === "API Keys" ? (
          <>
            <p className="text-sm font-black">API Keys</p>
            <p className={"mt-2 text-sm leading-6 " + muted}>API key issuance is not enabled yet because the public ACEPA API and server-side key validation layer are not live.</p>
          </>
        ) : (
          <>
            <p className="text-sm font-black">Connected Integrations</p>
            <p className={"mt-2 text-sm leading-6 " + muted}>No external integrations are connected yet. Connected providers will appear here once their OAuth/API connections are enabled.</p>
          </>
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
