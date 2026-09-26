"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";

const opportunityMap = {
  "solar-energy-expansion": {
    type: "Investment",
    title: "Solar Energy Expansion",
    company: "SunGrid Energy Ltd.",
    location: "Lagos, Nigeria",
    value: "$5,000,000",
    closing: "October 30, 2026",
    summary: "Scale clean-energy infrastructure across underserved communities with a structured growth opportunity.",
    description:
      "SunGrid Energy Ltd. is expanding a clean-energy network across selected markets. The opportunity is designed for participants who want exposure to an infrastructure-focused growth project while the company executes its expansion plan.",
    highlights: [
      "Clean-energy infrastructure expansion",
      "Defined participation structure",
      "Company-led project execution",
      "Progress updates through ACEPA",
    ],
    steps: [
      "Review the opportunity details and participation terms.",
      "Complete any required verification for the opportunity.",
      "Choose your participation route and submit your interest.",
      "Track updates, milestones and completion through ACEPA.",
    ],
  },
  "smart-retail-challenge": {
    type: "Innovation",
    title: "Smart Retail Innovation Challenge",
    company: "Nexa Retail Group",
    location: "Abuja, Nigeria",
    value: "$250,000",
    closing: "November 14, 2026",
    summary: "Build practical technology that improves the retail experience, customer intelligence and operational efficiency.",
    description:
      "Nexa Retail Group is inviting innovators to propose practical technology concepts that can improve retail operations and customer experiences. Selected teams move into a structured development and evaluation process.",
    highlights: [
      "Retail technology challenge",
      "Practical, commercially focused ideas",
      "Company evaluation and selection",
      "Opportunity to progress into implementation",
    ],
    steps: [
      "Review the challenge brief.",
      "Prepare and submit your concept.",
      "Participate in the evaluation process.",
      "Track selection and implementation milestones.",
    ],
  },
  "product-launch-campaign": {
    type: "Marketing",
    title: "Product Launch Campaign",
    company: "Urbanova Consumer Brands",
    location: "Port Harcourt, Nigeria",
    value: "$75,000",
    closing: "October 18, 2026",
    summary: "Join a launch campaign designed to take a new consumer product into its next market.",
    description:
      "Urbanova Consumer Brands is looking for marketing contributors and campaign partners who can help execute a focused market-entry program for a new consumer product.",
    highlights: [
      "Market-entry campaign",
      "Brand and growth focus",
      "Defined campaign scope",
      "Performance and progress tracking",
    ],
    steps: [
      "Review the campaign scope.",
      "Select the participation route that fits you.",
      "Submit your profile or proposal.",
      "Track campaign milestones and updates.",
    ],
  },
  "regional-distribution-partnership": {
    type: "Business",
    title: "Regional Distribution Partnership",
    company: "Atlas Supply Network",
    location: "Enugu, Nigeria",
    value: "Partnership",
    closing: "December 2, 2026",
    summary: "Partner on distribution expansion across selected South-East markets with a defined commercial model.",
    description:
      "Atlas Supply Network is building a regional distribution network and is seeking commercial partners who can support market coverage, retail relationships and route-to-market execution.",
    highlights: [
      "Distribution partnership",
      "South-East market expansion",
      "Commercial partnership structure",
      "Shared business development goals",
    ],
    steps: [
      "Review the partnership scope.",
      "Confirm your commercial fit.",
      "Submit your interest or proposal.",
      "Continue discussions through the relevant ACEPA activity.",
    ],
  },
  "founder-advisory-network": {
    type: "Experts",
    title: "Founder Advisory Network",
    company: "Nexa Ventures",
    location: "Remote / Africa",
    value: "Paid engagement",
    closing: "November 28, 2026",
    summary: "Experienced operators are invited to support selected businesses through strategic advisory engagements.",
    description:
      "Nexa Ventures is building a network of experienced operators and specialists who can support selected businesses through focused advisory assignments and strategic working sessions.",
    highlights: [
      "Expert advisory opportunity",
      "Flexible remote participation",
      "Business-focused assignments",
      "Paid engagement model",
    ],
    steps: [
      "Review the expertise requirements.",
      "Submit your profile and relevant experience.",
      "Complete the matching process.",
      "Track assignment details and outcomes.",
    ],
  },
  "growth-marketing-fellowship": {
    type: "Careers & Jobs",
    title: "Growth Marketing Fellowship",
    company: "ACEPA Partner Network",
    location: "Lagos / Hybrid",
    value: "Career opportunity",
    closing: "November 7, 2026",
    summary: "A practical role for growth-minded talent working across campaigns, partnerships and market expansion.",
    description:
      "The fellowship is designed for people who want hands-on experience across growth marketing, campaigns, partnerships and market expansion while working with businesses connected to the ACEPA ecosystem.",
    highlights: [
      "Growth-focused role",
      "Practical campaign exposure",
      "Partnership and market work",
      "Structured professional experience",
    ],
    steps: [
      "Review the role requirements.",
      "Submit your profile and relevant experience.",
      "Complete the selection process.",
      "Track onboarding and role updates.",
    ],
  },
} as const;

export default function OpportunityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const opportunity = opportunityMap[id as keyof typeof opportunityMap];
  const [notice, setNotice] = useState("");
  const [saved, setSaved] = useState(false);
  const [interested, setInterested] = useState(false);

  return (
    <UserAccountShell>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">
            <div>
              <button onClick={() => router.push("/opportunities")} className="text-xs font-bold text-slate-500 transition hover:text-purple-700">
                ← Back to Opportunities
              </button>
              <p className="mt-1 text-sm font-black">Opportunity Details</p>
            </div>
            <UserAccountActions />
          </div>
        </header>

        <div className="mx-auto max-w-[1080px] px-4 py-6 sm:px-6 lg:py-9">
          {!opportunity ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="text-sm font-black">Opportunity unavailable.</p>
              <Link href="/opportunities" className="mt-4 inline-flex rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-700">
                Browse opportunities
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <div className="relative min-h-[320px] overflow-hidden bg-slate-950 sm:min-h-[430px]">
                  <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/25 blur-3xl" />
                  <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />
                  <div className="relative flex min-h-[320px] flex-col justify-between bg-gradient-to-br from-purple-700 via-indigo-700 to-slate-950 p-6 sm:min-h-[430px] sm:p-10">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur">{opportunity.type}</span>
                      <span className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-black tracking-[0.14em] text-white/70">ACEPA</span>
                    </div>
                    <div className="max-w-4xl">
                      <p className="text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">{opportunity.title}</p>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{opportunity.summary}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                      <span>{opportunity.company}</span><span>•</span><span>{opportunity.location}</span><span>•</span><span>Open</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 border-t border-slate-100 p-5 sm:grid-cols-3 sm:p-7">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Opportunity value</p>
                    <p className="mt-2 text-xl font-black">{opportunity.value}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Closing date</p>
                    <p className="mt-2 text-xl font-black">{opportunity.closing}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Company</p>
                    <p className="mt-2 text-xl font-black">{opportunity.company}</p>
                  </div>
                </div>
              </section>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-6">
                  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">About this opportunity</p>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">What you should know</h2>
                    <p className="mt-5 text-sm leading-8 text-slate-700">{opportunity.description}</p>

                    <div className="mt-7">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Highlights</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {opportunity.highlights.map((item) => (
                          <div key={item} className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm font-bold text-slate-700">✓ {item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">How participation works</p>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Your next steps</h2>
                    <div className="mt-6 space-y-4">
                      {opportunity.steps.map((step, index) => (
                        <div key={step} className="flex gap-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-[10px] font-black text-white">0{index + 1}</div>
                          <p className="pt-1 text-sm leading-6 text-slate-600">{step}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <aside className="space-y-5">
                  <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    {notice && (
                      <div className="mb-4 rounded-2xl border border-purple-100 bg-purple-50 px-4 py-3 text-xs font-semibold leading-5 text-purple-800">
                        {notice}
                      </div>
                    )}
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Ready to participate?</p>
                    <h2 className="mt-2 text-xl font-black tracking-[-0.03em]">Take the next step.</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-500">Participation flows will be connected to the relevant opportunity workflow when company-side publishing and eligibility are fully built.</p>
                    <button
                      onClick={() => {
                        setInterested((current) => !current);
                        setNotice(interested ? "Demo interest withdrawn. The live participation workflow will connect here later." : "Demo interest recorded. The live participation workflow will connect here later.");
                      }}
                      className="mt-5 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
                    >
                      {interested ? "Interest recorded ✓" : "Express interest"}
                    </button>
                    <button
                      onClick={() => {
                        setSaved((current) => !current);
                        setNotice(saved ? "Demo opportunity removed from Saved." : "Demo opportunity saved. Your Saved area will connect to live data later.");
                      }}
                      className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm font-bold transition " + (saved ? "border-purple-200 bg-purple-50 text-purple-700" : "border-slate-200 text-slate-700 hover:border-purple-200 hover:text-purple-700")}
                    >
                      {saved ? "Saved ✓" : "Save opportunity"}
                    </button>
                  </div>

                  <div className="rounded-3xl border border-purple-100 bg-purple-50/70 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-700">ACEPA flow</p>
                    <p className="mt-3 text-sm font-semibold leading-6 text-purple-900">Discover → Explore → Decide → Participate → Track → Complete → Progress</p>
                  </div>
                </aside>
              </div>
            </div>
          )}
        </div>
      </main>
    </UserAccountShell>
  );
}
