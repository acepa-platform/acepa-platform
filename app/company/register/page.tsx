"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const steps = ["Company details", "Password", "Admin access", "Authorized representative"];

export default function CompanyRegistrationPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminCount, setAdminCount] = useState("1");
  const [representativeName, setRepresentativeName] = useState("");
  const [representativeEmail, setRepresentativeEmail] = useState("");
  const [representativeRole, setRepresentativeRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function validateStep() {
    setError("");
    if (step === 0) {
      if (!companyName.trim() || !businessType || !industry.trim() || !country.trim() || !address.trim()) {
        setError("Please complete all company details before continuing.");
        return false;
      }
    }
    if (step === 1) {
      if (password.length < 8) {
        setError("Your company password must be at least 8 characters.");
        return false;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    }
    if (step === 3) {
      if (!representativeName.trim() || !representativeEmail.trim() || !representativeRole.trim()) {
        setError("Please complete the authorized representative details.");
        return false;
      }
    }
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!validateStep()) return;

    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: representativeEmail.trim().toLowerCase(),
        password,
        options: {
          data: {
            account_type: "company",
            full_name: representativeName.trim(),
            company_name: companyName.trim(),
            business_type: businessType,
            industry: industry.trim(),
            country: country.trim(),
            address: address.trim(),
            planned_admin_count: adminCount,
            authorized_representative_name: representativeName.trim(),
            authorized_representative_email: representativeEmail.trim().toLowerCase(),
            authorized_representative_role: representativeRole.trim(),
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session) {
        setSubmitted(true);
        setMessage("Your company account has been created and you are signed in.");
        window.setTimeout(() => router.push("/company/workspace"), 700);
      } else {
        setSubmitted(true);
        setMessage("Your company account has been created. Check the representative email to confirm the account before signing in.");
      }
    } catch {
      setError("We could not complete company registration right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center">
            <img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA" className="h-11 w-auto object-contain brightness-0" />
          </Link>
          <Link href="/companies" className="text-sm font-bold text-slate-600 hover:text-slate-950">Back to For Companies</Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-purple-600">Company registration</p>
          <h1 className="mt-2 text-3xl font-black tracking-[-.04em] sm:text-4xl">Create your company on ACEPA.</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Start with the essential information. After registration, your authorized team can complete verification, the full company profile, opportunities, marketplace, feed, team permissions, wallet and more.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-8 grid grid-cols-4 gap-2">
            {steps.map((label, index) => (
              <div key={label}>
                <div className={`h-1.5 rounded-full ${index <= step ? "bg-purple-600" : "bg-slate-200"}`} />
                <p className={`mt-2 text-[10px] font-bold ${index <= step ? "text-slate-900" : "text-slate-400"}`}>{label}</p>
              </div>
            ))}
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-purple-50 p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-xl font-black text-white">✓</div>
              <h2 className="mt-4 text-2xl font-black">Company account created</h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">{message}</p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/company/workspace" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">Continue to company workspace</Link>
                <Link href="/companies" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">Back to For Companies</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-bold">Company name</label>
                    <input required value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. SunGrid Energy Ltd." className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-bold">Business type</label>
                      <select required value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                        <option value="">Select business type</option>
                        <option>Limited company</option>
                        <option>Partnership</option>
                        <option>Sole proprietorship</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-bold">Industry</label>
                      <input required value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g. Energy & Infrastructure" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-bold">Country</label>
                      <input required value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. Nigeria" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" />
                    </div>
                    <div>
                      <label className="text-sm font-bold">Business address</label>
                      <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Company address" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" />
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-bold">Company account password</label>
                    <div className="relative mt-2">
                      <input required type={showPassword ? "text" : "password"} minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a secure password" className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-16 text-sm outline-none focus:border-purple-500" />
                      <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">{showPassword ? "Hide" : "Show"}</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold">Confirm password</label>
                    <div className="relative mt-2">
                      <input required type={showConfirmPassword ? "text" : "password"} minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter the password again" className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-16 text-sm outline-none focus:border-purple-500" />
                      <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">{showConfirmPassword ? "Hide" : "Show"}</button>
                    </div>
                  </div>
                  <p className="rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">Your password is handled by ACEPA authentication. It is never stored by this form.</p>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-bold">How many administrators should have access?</label>
                    <select value={adminCount} onChange={(e) => setAdminCount(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                      <option value="1">1 administrator</option>
                      <option value="2">2 administrators</option>
                      <option value="3">3 administrators</option>
                      <option value="4">4 administrators</option>
                      <option value="5">5 administrators</option>
                      <option value="10">More than 5 — up to 10</option>
                      <option value="25">Up to 25 administrators</option>
                      <option value="50">Up to 50 administrators</option>
                    </select>
                  </div>
                  <div className="rounded-xl bg-purple-50 p-4 text-xs leading-5 text-purple-800">
                    The person registering becomes the initial company owner. Additional administrators can be invited and assigned permissions after the company account is created.
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-bold">Authorized representative name</label>
                    <input required value={representativeName} onChange={(e) => setRepresentativeName(e.target.value)} placeholder="Full name" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="text-sm font-bold">Representative email</label>
                    <input required type="email" value={representativeEmail} onChange={(e) => setRepresentativeEmail(e.target.value)} placeholder="name@company.com" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" />
                    <p className="mt-2 text-xs text-slate-400">This email will be the initial sign-in email for the company owner.</p>
                  </div>
                  <div>
                    <label className="text-sm font-bold">Representative role</label>
                    <input required value={representativeRole} onChange={(e) => setRepresentativeRole(e.target.value)} placeholder="e.g. Director, Founder, CEO" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-purple-500" />
                  </div>
                </div>
              )}

              {error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">{error}</div>}

              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                <button type="button" onClick={() => { setError(""); setStep((current) => Math.max(0, current - 1)); }} disabled={step === 0 || loading} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Back</button>
                <button type="submit" disabled={loading} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Creating company..." : step === steps.length - 1 ? "Create company account" : "Continue"}</button>
              </div>
            </form>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">Already have a company account? <Link href="/sign-in" className="font-bold text-purple-700">Sign in</Link></p>
      </div>
    </main>
  );
}
