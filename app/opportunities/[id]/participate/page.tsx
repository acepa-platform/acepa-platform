"use client";

import { use, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

type OpportunityType =
  | "Investment"
  | "Innovation"
  | "Marketing"
  | "Business"
  | "Collaboration"
  | "Experts"
  | "Careers & Jobs";

const opportunities = {
  "solar-energy-expansion": {
    type: "Investment",
    title: "Solar Energy Expansion",
    company: "SunGrid Energy Ltd.",
    minimum: 500,
    maximum: 250000,
  },
  "smart-retail-challenge": {
    type: "Innovation",
    title: "Smart Retail Innovation Challenge",
    company: "Nexa Retail Group",
  },
  "product-launch-campaign": {
    type: "Marketing",
    title: "Product Launch Campaign",
    company: "Urbanova Consumer Brands",
  },
  "regional-distribution-partnership": {
    type: "Business",
    title: "Regional Distribution Partnership",
    company: "Atlas Supply Network",
  },
  "regional-collaboration-lab": {
    type: "Collaboration",
    title: "Regional Collaboration Lab",
    company: "Nexa Business Network",
  },
  "founder-advisory-network": {
    type: "Experts",
    title: "Founder Advisory Network",
    company: "Nexa Ventures",
  },
  "growth-marketing-fellowship": {
    type: "Careers & Jobs",
    title: "Growth Marketing Fellowship",
    company: "ACEPA Partner Network",
  },
} as const;

const actionLabels: Record<OpportunityType, string> = {
  Investment: "Invest",
  Innovation: "Apply / Participate",
  Marketing: "Apply",
  Business: "Partner",
  Collaboration: "Collaborate",
  Experts: "Apply",
  "Careers & Jobs": "Apply Now",
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-700">{label}{required ? " *" : ""}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-purple-500"
      />
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-700">{label} *</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        placeholder={placeholder}
        className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-purple-500"
      />
    </label>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-1 whitespace-pre-wrap text-sm font-black text-slate-800">{value}</p>
    </div>
  );
}

export default function OpportunityParticipationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const opportunity = opportunities[id as keyof typeof opportunities];

  const [step, setStep] = useState<"form" | "review" | "confirm" | "complete">("form");
  const [notice, setNotice] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [investmentAmount, setInvestmentAmount] = useState("");
  const [fundingSource, setFundingSource] = useState("ACEPA Wallet Balance");
  const [acceptInvestmentTerms, setAcceptInvestmentTerms] = useState(false);

  const [solutionTitle, setSolutionTitle] = useState("");
  const [solution, setSolution] = useState("");
  const [innovationExperience, setInnovationExperience] = useState("");

  const [portfolio, setPortfolio] = useState("");
  const [channels, setChannels] = useState("");
  const [campaignExperience, setCampaignExperience] = useState("");

  const [organization, setOrganization] = useState("");
  const [territory, setTerritory] = useState("");
  const [businessContribution, setBusinessContribution] = useState("");

  const [proposedRole, setProposedRole] = useState("");
  const [collaborationContribution, setCollaborationContribution] = useState("");
  const [availability, setAvailability] = useState("");

  const [expertise, setExpertise] = useState("");
  const [professionalExperience, setProfessionalExperience] = useState("");
  const [qualifications, setQualifications] = useState("");

  const [education, setEducation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [coverNote, setCoverNote] = useState("");

  const type = opportunity?.type as OpportunityType | undefined;
  const actionLabel = type ? actionLabels[type] : "Participate";
  const numericAmount = Number(investmentAmount);
  const investmentMinimum = type === "Investment" ? 500 : 0;
  const investmentMaximum = type === "Investment" ? 250000 : Number.MAX_SAFE_INTEGER;

  const investmentAmountValid =
    type !== "Investment" ||
    (Number.isFinite(numericAmount) &&
      numericAmount >= investmentMinimum &&
      numericAmount <= investmentMaximum);

  const formValid = useMemo(() => {
    if (!opportunity || !fullName.trim() || !email.trim()) return false;

    switch (opportunity.type) {
      case "Investment":
        return investmentAmountValid && acceptInvestmentTerms;
      case "Innovation":
        return Boolean(solutionTitle.trim() && solution.trim() && innovationExperience.trim());
      case "Marketing":
        return Boolean(portfolio.trim() && channels.trim() && campaignExperience.trim());
      case "Business":
        return Boolean(organization.trim() && territory.trim() && businessContribution.trim());
      case "Collaboration":
        return Boolean(proposedRole.trim() && collaborationContribution.trim() && availability.trim());
      case "Experts":
        return Boolean(expertise.trim() && professionalExperience.trim() && qualifications.trim());
      case "Careers & Jobs":
        return Boolean(education.trim() && workExperience.trim() && coverNote.trim());
    }
  }, [
    opportunity,
    fullName,
    email,
    investmentAmountValid,
    acceptInvestmentTerms,
    solutionTitle,
    solution,
    innovationExperience,
    portfolio,
    channels,
    campaignExperience,
    organization,
    territory,
    businessContribution,
    proposedRole,
    collaborationContribution,
    availability,
    expertise,
    professionalExperience,
    qualifications,
    education,
    workExperience,
    coverNote,
  ]);

  function continueToReview(event: FormEvent) {
    event.preventDefault();
    setNotice("");

    if (!formValid) {
      setNotice(
        type === "Investment"
          ? "Complete the required investor details, choose an amount between the minimum and maximum, and accept the investment terms."
          : "Please complete all required fields before continuing."
      );
      return;
    }

    setStep("review");
  }

  function confirmSubmission() {
    setStep("complete");
    setNotice(
      type === "Investment"
        ? "Demo investment request recorded. No money was debited, transferred, or reserved."
        : "Demo submission recorded. The live company workflow will be connected later."
    );
  }

  if (!opportunity) {
    return (
      <UserAccountShell>
        <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
          <div className="mx-auto max-w-[800px] px-4 py-12 sm:px-6">
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="text-sm font-black">Participation page unavailable.</p>
              <Link href="/opportunities" className="mt-4 inline-flex rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-700">
                Back to opportunities
              </Link>
            </div>
          </div>
        </main>
      </UserAccountShell>
    );
  }

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div>
              <button onClick={() => router.push("/opportunities/" + id)} className="text-xs font-bold text-slate-500 hover:text-purple-700">
                ← Back to Opportunity
              </button>
              <p className="mt-1 text-sm font-black">{actionLabel}</p>
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto max-w-[960px] px-4 py-7 sm:px-6 lg:py-10">
          <div className="mb-6 flex items-center gap-2">
            {["form", "review", "confirm"].map((item, index) => (
              <div key={item} className="flex flex-1 items-center gap-2">
                <div className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black " + (step === item || (step === "complete" && index === 2) ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-400")}>
                  {index + 1}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-black">{item === "form" ? "Details" : item === "review" ? "Review" : "Confirm"}</p>
                </div>
                {index < 2 && <div className="h-px flex-1 bg-slate-200" />}
              </div>
            ))}
          </div>

          <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="bg-slate-950 p-6 text-white sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">{opportunity.type}</p>
              <h1 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">{actionLabel}: {opportunity.title}</h1>
              <p className="mt-2 text-sm text-white/60">{opportunity.company}</p>
            </div>

            {notice && (
              <div className="mx-6 mt-6 rounded-2xl border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-800 sm:mx-8">
                {notice}
              </div>
            )}

            {step === "form" && (
              <form onSubmit={continueToReview} className="p-6 sm:p-8">
                <section>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Applicant details</p>
                  <h2 className="mt-2 text-xl font-black">Tell us about yourself</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" value={fullName} onChange={setFullName} placeholder="Your full name" />
                    <Field label="Email address" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
                    <Field label="Phone number" value={phone} onChange={setPhone} placeholder="+234..." required={false} />
                  </div>
                </section>

                {opportunity.type === "Investment" && (
                  <section className="mt-8 rounded-3xl bg-slate-50 p-5 sm:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Investment details</p>
                    <h2 className="mt-2 text-xl font-black">Choose your investment amount and funding source</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <Field label="Investment amount (USD)" value={investmentAmount} onChange={setInvestmentAmount} type="number" placeholder="Minimum $500" />
                      <label className="block">
                        <span className="text-xs font-bold text-slate-700">Debit / funding source *</span>
                        <select value={fundingSource} onChange={(event) => setFundingSource(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500">
                          <option>ACEPA Wallet Balance — deduct from available balance</option>
                          <option>Linked payment account — automatic debit after approval</option>
                          <option>Manual bank transfer</option>
                        </select>
                      </label>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <ReviewItem label="Minimum contribution" value="$500" />
                      <ReviewItem label="Maximum contribution" value="$250,000" />
                      <ReviewItem label="Demo wallet balance" value="$2,500" />
                    </div>

                    <div className="mt-5 rounded-2xl border border-purple-100 bg-white p-4 text-xs leading-5 text-slate-600">
                      The selected funding source is shown during review. In this prototype, confirming the request does not debit or transfer money.
                    </div>

                    <label className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <input type="checkbox" checked={acceptInvestmentTerms} onChange={(event) => setAcceptInvestmentTerms(event.target.checked)} className="mt-1 h-4 w-4" />
                      <span className="text-xs leading-5 text-slate-600">
                        I confirm that I have reviewed the investment terms, contribution requirements and risk information before continuing. This is a demo flow and does not execute a real investment.
                      </span>
                    </label>
                  </section>
                )}

                {opportunity.type === "Innovation" && (
                  <section className="mt-8 space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Innovation application</p>
                      <h2 className="mt-2 text-xl font-black">Tell the company about your solution</h2>
                    </div>
                    <Field label="Solution title" value={solutionTitle} onChange={setSolutionTitle} placeholder="Name your solution or concept" />
                    <TextField label="Solution overview" value={solution} onChange={setSolution} placeholder="Explain the problem, your solution and how it would work." />
                    <TextField label="Relevant experience" value={innovationExperience} onChange={setInnovationExperience} placeholder="Describe your experience, team or previous work." />
                  </section>
                )}

                {opportunity.type === "Marketing" && (
                  <section className="mt-8 space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Marketing application</p>
                      <h2 className="mt-2 text-xl font-black">Show your campaign capability</h2>
                    </div>
                    <TextField label="Portfolio / work samples" value={portfolio} onChange={setPortfolio} placeholder="Share links or describe your strongest campaign work." />
                    <TextField label="Channels you can execute" value={channels} onChange={setChannels} placeholder="For example: creators, social media, events, digital ads..." />
                    <TextField label="Campaign experience" value={campaignExperience} onChange={setCampaignExperience} placeholder="Describe relevant audience, growth or campaign experience." />
                  </section>
                )}

                {opportunity.type === "Business" && (
                  <section className="mt-8 space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Business partnership</p>
                      <h2 className="mt-2 text-xl font-black">Describe your commercial fit</h2>
                    </div>
                    <Field label="Business / organization" value={organization} onChange={setOrganization} placeholder="Business name or organization" />
                    <Field label="Territory you can cover" value={territory} onChange={setTerritory} placeholder="Markets, cities or territories" />
                    <TextField label="Your contribution" value={businessContribution} onChange={setBusinessContribution} placeholder="Explain your distribution network, market access, capital, capability or other contribution." />
                  </section>
                )}

                {opportunity.type === "Collaboration" && (
                  <section className="mt-8 space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Collaboration application</p>
                      <h2 className="mt-2 text-xl font-black">Define how you want to contribute</h2>
                    </div>
                    <Field label="Proposed role" value={proposedRole} onChange={setProposedRole} placeholder="Your role in the collaboration" />
                    <TextField label="Contribution" value={collaborationContribution} onChange={setCollaborationContribution} placeholder="Skills, network, technology, resources or another contribution." />
                    <Field label="Availability / time commitment" value={availability} onChange={setAvailability} placeholder="For example: 5 hours/week" />
                  </section>
                )}

                {opportunity.type === "Experts" && (
                  <section className="mt-8 space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Expert application</p>
                      <h2 className="mt-2 text-xl font-black">Share your professional profile</h2>
                    </div>
                    <TextField label="Area of expertise" value={expertise} onChange={setExpertise} placeholder="Describe your strongest areas of expertise." />
                    <TextField label="Professional experience" value={professionalExperience} onChange={setProfessionalExperience} placeholder="Relevant roles, companies, projects and results." />
                    <TextField label="Qualifications / certifications" value={qualifications} onChange={setQualifications} placeholder="Degrees, certifications or other credentials." />
                  </section>
                )}

                {opportunity.type === "Careers & Jobs" && (
                  <section className="mt-8 space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Job application</p>
                      <h2 className="mt-2 text-xl font-black">Apply for the role</h2>
                    </div>
                    <Field label="Education / training" value={education} onChange={setEducation} placeholder="Your relevant education or training" />
                    <TextField label="Work experience" value={workExperience} onChange={setWorkExperience} placeholder="Describe relevant experience, responsibilities and results." />
                    <TextField label="Cover note" value={coverNote} onChange={setCoverNote} placeholder="Why are you interested in this role and why are you a fit?" />
                  </section>
                )}

                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
                  <button type="button" onClick={() => router.push("/opportunities/" + id)} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:border-purple-200 hover:text-purple-700">Cancel</button>
                  <button type="submit" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700">Review submission →</button>
                </div>
              </form>
            )}

            {step === "review" && (
              <section className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Review</p>
                <h2 className="mt-2 text-2xl font-black">Check everything before you continue</h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <ReviewItem label="Full name" value={fullName} />
                  <ReviewItem label="Email" value={email} />
                  {phone && <ReviewItem label="Phone" value={phone} />}

                  {opportunity.type === "Investment" && (
                    <>
                      <ReviewItem label="Investment amount" value={"$" + numericAmount.toLocaleString()} />
                      <ReviewItem label="Funding source" value={fundingSource} />
                    </>
                  )}

                  {opportunity.type === "Innovation" && (
                    <>
                      <ReviewItem label="Solution title" value={solutionTitle} />
                      <ReviewItem label="Relevant experience" value={innovationExperience} />
                      <div className="sm:col-span-2"><ReviewItem label="Solution overview" value={solution} /></div>
                    </>
                  )}

                  {opportunity.type === "Marketing" && (
                    <>
                      <div className="sm:col-span-2"><ReviewItem label="Portfolio / work samples" value={portfolio} /></div>
                      <ReviewItem label="Execution channels" value={channels} />
                      <ReviewItem label="Campaign experience" value={campaignExperience} />
                    </>
                  )}

                  {opportunity.type === "Business" && (
                    <>
                      <ReviewItem label="Business / organization" value={organization} />
                      <ReviewItem label="Territory" value={territory} />
                      <div className="sm:col-span-2"><ReviewItem label="Contribution" value={businessContribution} /></div>
                    </>
                  )}

                  {opportunity.type === "Collaboration" && (
                    <>
                      <ReviewItem label="Proposed role" value={proposedRole} />
                      <ReviewItem label="Availability" value={availability} />
                      <div className="sm:col-span-2"><ReviewItem label="Contribution" value={collaborationContribution} /></div>
                    </>
                  )}

                  {opportunity.type === "Experts" && (
                    <>
                      <div className="sm:col-span-2"><ReviewItem label="Expertise" value={expertise} /></div>
                      <ReviewItem label="Professional experience" value={professionalExperience} />
                      <ReviewItem label="Qualifications" value={qualifications} />
                    </>
                  )}

                  {opportunity.type === "Careers & Jobs" && (
                    <>
                      <ReviewItem label="Education / training" value={education} />
                      <ReviewItem label="Work experience" value={workExperience} />
                      <div className="sm:col-span-2"><ReviewItem label="Cover note" value={coverNote} /></div>
                    </>
                  )}
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
                  <button onClick={() => setStep("form")} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:border-purple-200 hover:text-purple-700">Edit details</button>
                  <button onClick={() => setStep("confirm")} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700">Continue to confirmation →</button>
                </div>
              </section>
            )}

            {step === "confirm" && (
              <section className="p-6 sm:p-8">
                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">Final confirmation</p>
                  <h2 className="mt-2 text-2xl font-black text-amber-950">
                    {opportunity.type === "Investment" ? "Confirm this investment request" : "Confirm your submission"}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-amber-900">
                    {opportunity.type === "Investment"
                      ? "You are about to confirm the investment request shown below. The prototype will not debit your wallet, linked account or bank account."
                      : "You are about to confirm the information above as a demo application or participation request."}
                  </p>
                </div>

                <div className="mt-6 rounded-3xl bg-slate-50 p-5 sm:p-6">
                  {opportunity.type === "Investment" ? (
                    <div className="grid gap-4 sm:grid-cols-3">
                      <ReviewItem label="Investment amount" value={"$" + numericAmount.toLocaleString()} />
                      <ReviewItem label="Funding source" value={fundingSource} />
                      <ReviewItem label="Payment status" value="Not executed" />
                    </div>
                  ) : (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Request</p>
                      <p className="mt-2 text-sm font-black">{actionLabel} · {opportunity.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{fullName} · {email}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
                  <button onClick={() => setStep("review")} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:border-purple-200 hover:text-purple-700">Back to review</button>
                  <button onClick={confirmSubmission} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700">
                    {opportunity.type === "Investment" ? "Confirm investment request" : "Confirm submission"}
                  </button>
                </div>
              </section>
            )}

            {step === "complete" && (
              <section className="p-6 sm:p-10">
                <div className="mx-auto max-w-2xl text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-2xl text-emerald-700">✓</div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Demo recorded</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">Your {actionLabel.toLowerCase()} request has been recorded.</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{notice}</p>

                  {opportunity.type === "Investment" && (
                    <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-left">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Investment request</p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <ReviewItem label="Amount" value={"$" + numericAmount.toLocaleString()} />
                        <ReviewItem label="Funding source" value={fundingSource} />
                        <ReviewItem label="Payment status" value="No payment made" />
                      </div>
                    </div>
                  )}

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button onClick={() => router.push("/opportunities/" + id)} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-purple-700">Back to opportunity</button>
                    <button onClick={() => router.push("/opportunities")} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:border-purple-200 hover:text-purple-700">Browse more opportunities</button>
                  </div>
                </div>
              </section>
            )}
          </section>
        </div>
      </main>
    </UserAccountShell>
  );
}
