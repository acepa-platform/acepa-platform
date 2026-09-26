"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserAccountShell from "@/components/user-account-shell";
import { UserAccountActions } from "@/components/user-account-top-nav";
import { createClient } from "@/lib/supabase/client";

type OpportunityType =
  | "Investment"
  | "Innovation"
  | "Marketing"
  | "Business"
  | "Collaboration"
  | "Experts"
  | "Careers & Jobs";

const opportunityMap = {
  "solar-energy-expansion": {
    type: "Investment",
    title: "Solar Energy Expansion",
    company: "SunGrid Energy Ltd.",
    location: "Lagos, Nigeria",
    value: "$5,000,000 funding target",
    closing: "October 30, 2026",
    summary: "Scale clean-energy infrastructure across underserved communities with a structured growth opportunity.",
    description:
      "SunGrid Energy Ltd. is expanding a clean-energy network across selected markets. This demo shows how an investment opportunity can present its funding structure, contribution requirements, investor information, projected outcomes and participation path.",
  },
  "smart-retail-challenge": {
    type: "Innovation",
    title: "Smart Retail Innovation Challenge",
    company: "Nexa Retail Group",
    location: "Abuja, Nigeria",
    value: "$250,000 innovation fund",
    closing: "November 14, 2026",
    summary: "Build practical technology that improves the retail experience, customer intelligence and operational efficiency.",
    description:
      "Nexa Retail Group is inviting innovators to propose practical technology concepts that can improve retail operations and customer experiences. This demo shows how an innovation opportunity can explain the challenge, eligibility, deliverables, evaluation and expected outcome.",
  },
  "product-launch-campaign": {
    type: "Marketing",
    title: "Product Launch Campaign",
    company: "Urbanova Consumer Brands",
    location: "Port Harcourt, Nigeria",
    value: "$75,000 campaign budget",
    closing: "October 18, 2026",
    summary: "Join a launch campaign designed to take a new consumer product into its next market.",
    description:
      "Urbanova Consumer Brands is looking for marketing contributors and campaign partners who can help execute a focused market-entry program for a new consumer product.",
  },
  "regional-distribution-partnership": {
    type: "Business",
    title: "Regional Distribution Partnership",
    company: "Atlas Supply Network",
    location: "Enugu, Nigeria",
    value: "Commercial partnership",
    closing: "December 2, 2026",
    summary: "Partner on distribution expansion across selected South-East markets with a defined commercial model.",
    description:
      "Atlas Supply Network is building a regional distribution network and is seeking commercial partners who can support market coverage, retail relationships and route-to-market execution.",
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
  },
  "regional-collaboration-lab": {
    type: "Collaboration",
    title: "Regional Collaboration Lab",
    company: "Nexa Business Network",
    location: "Lagos / Remote",
    value: "Strategic collaboration",
    closing: "November 21, 2026",
    summary: "Bring skills, networks and resources together to develop practical business initiatives across multiple markets.",
    description:
      "Nexa Business Network is inviting founders, operators and organizations to work together on market-entry, distribution and product-development initiatives.",
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

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-black text-slate-800">{value}</p>
    </div>
  );
}

function CategoryDetails({ type }: { type: OpportunityType }) {
  if (type === "Investment") {
    return (
      <>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Investment structure</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">How the investment works</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Illustrative demo figures below show the type of information an investor should see before deciding to participate.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard label="Funding target" value="$5,000,000" />
            <InfoCard label="Already raised" value="$2,850,000" />
            <InfoCard label="Minimum contribution" value="$500" />
            <InfoCard label="Maximum contribution" value="$250,000" />
            <InfoCard label="Units available" value="4,300 units" />
            <InfoCard label="Ownership offered" value="18% of project SPV" />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Contribution & outcome</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">What the participant contributes and receives</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 p-5">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Contribution</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>• Capital contribution within the published investment range.</li>
                <li>• Completion of required identity and eligibility checks.</li>
                <li>• Acceptance of the investment terms and risk disclosures.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-100 p-5">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Potential outcome</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>• Participation in the project according to the issued structure.</li>
                <li>• Access to project progress and company reporting.</li>
                <li>• Financial outcome determined by the final terms and actual performance.</li>
              </ul>
            </div>
          </div>
          <div className="mt-5 rounded-2xl bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            <p className="font-black">Illustrative return information</p>
            <p className="mt-1">A future live investment page can show target ownership, projected return percentages, dividend or distribution assumptions, risk information and other financial terms. Any projection must be clearly identified as a projection and is not a guarantee.</p>
          </div>
        </section>
      </>
    );
  }

  if (type === "Innovation") {
    return (
      <>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Challenge structure</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">What innovators are being asked to solve</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <InfoCard label="Problem" value="Modernize retail operations and customer insight" />
            <InfoCard label="Eligible participants" value="Individuals, startups and innovation teams" />
            <InfoCard label="Submission" value="Concept, prototype or working product" />
            <InfoCard label="Evaluation" value="Feasibility, impact, usability and scalability" />
            <InfoCard label="Selection" value="Shortlist → Demo → Final selection" />
            <InfoCard label="Outcome" value="Pilot, implementation or partnership" />
          </div>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Submission requirements</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">What to submit</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {["Solution overview", "Prototype or product demo", "Team profile and relevant experience", "Implementation approach", "Expected impact", "Commercial or scaling plan"].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">✓ {item}</div>
            ))}
          </div>
        </section>
      </>
    );
  }

  if (type === "Marketing") {
    return (
      <>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Campaign brief</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">How the campaign is structured</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard label="Audience" value="Young urban consumers, 18–35" />
            <InfoCard label="Market" value="South-South and South-West" />
            <InfoCard label="Channels" value="Social, creators, events and digital" />
            <InfoCard label="Deliverables" value="Content, activations and lead generation" />
            <InfoCard label="Budget" value="$75,000 demo campaign budget" />
            <InfoCard label="Outcome" value="Reach, leads, sales and market growth" />
          </div>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Performance</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Campaign expectations</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <InfoCard label="Primary KPI" value="Qualified customer acquisition" />
            <InfoCard label="Secondary KPIs" value="Reach, engagement, conversion and repeat purchase" />
            <InfoCard label="Compensation" value="Fixed, commission or performance-based" />
            <InfoCard label="Engagement" value="Campaign execution and reporting" />
          </div>
        </section>
      </>
    );
  }

  if (type === "Business") {
    return (
      <>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Business structure</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Commercial opportunity details</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard label="Partnership type" value="Regional distribution partnership" />
            <InfoCard label="Territory" value="Selected South-East markets" />
            <InfoCard label="Model" value="Wholesale and retail distribution" />
            <InfoCard label="Contribution" value="Market access, relationships and execution capacity" />
            <InfoCard label="Commercial term" value="12-month renewable agreement" />
            <InfoCard label="Outcome" value="Market expansion and distribution growth" />
          </div>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Partner requirements</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Who this is for</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {["Existing retail or distribution network", "Local market knowledge", "Operational capacity", "Commercial credibility", "Ability to execute agreed routes to market", "Commitment to reporting and growth targets"].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">✓ {item}</div>
            ))}
          </div>
        </section>
      </>
    );
  }

  if (type === "Collaboration") {
    return (
      <>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Collaboration structure</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">What each participant brings</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard label="Objective" value="Build multi-market business initiatives" />
            <InfoCard label="Participants" value="Founders, companies, operators and specialists" />
            <InfoCard label="Contribution" value="Skills, networks, technology or resources" />
            <InfoCard label="Format" value="Project team and strategic partnership" />
            <InfoCard label="Deliverable" value="Defined business initiative or market project" />
            <InfoCard label="Outcome" value="Partnership, project launch or commercial execution" />
          </div>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Participation</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Participant expectations</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {["Profile and capability review", "Defined role and responsibilities", "Agreed time commitment", "Project milestones", "Collaboration terms", "Completion and outcome review"].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">✓ {item}</div>
            ))}
          </div>
        </section>
      </>
    );
  }

  if (type === "Experts") {
    return (
      <>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Expert engagement</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Engagement details</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard label="Expertise" value="Strategy, growth, operations and market expansion" />
            <InfoCard label="Engagement" value="Remote advisory assignment" />
            <InfoCard label="Duration" value="8–12 weeks" />
            <InfoCard label="Responsibilities" value="Advisory sessions and strategic deliverables" />
            <InfoCard label="Compensation" value="Paid project engagement" />
            <InfoCard label="Outcome" value="Strategy, implementation guidance and measurable project progress" />
          </div>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Requirements</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Expert profile</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {["Relevant professional experience", "Demonstrable results", "Strong communication", "Applicable qualifications or certifications", "Availability for agreed sessions", "Ability to deliver the required assignment"].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">✓ {item}</div>
            ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Role overview</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">What the role includes</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard label="Department" value="Growth & Marketing" />
          <InfoCard label="Employment" value="Fellowship / hybrid" />
          <InfoCard label="Experience level" value="Early-career / growth-minded" />
          <InfoCard label="Responsibilities" value="Campaigns, partnerships and market expansion" />
          <InfoCard label="Location" value="Lagos / Hybrid" />
          <InfoCard label="Outcome" value="Professional experience and pathway opportunities" />
        </div>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Requirements & benefits</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">What applicants should expect</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <InfoCard label="Qualifications" value="Relevant education, skills or demonstrated ability" />
          <InfoCard label="Application" value="Profile, CV and short motivation" />
          <InfoCard label="Compensation" value="Fellowship package / role-specific terms" />
          <InfoCard label="Benefits" value="Practical experience, mentorship and network" />
          <InfoCard label="Selection" value="Application review → interview → final decision" />
          <InfoCard label="Deadline" value="November 7, 2026" />
        </div>
      </section>
    </>
  );
}

export default function OpportunityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const opportunity = opportunityMap[id as keyof typeof opportunityMap];
  const [notice, setNotice] = useState("");
  const [saved, setSaved] = useState(false);
  const [watchlisted, setWatchlisted] = useState(false);
  const [listLoading, setListLoading] = useState(true);

  const type = opportunity?.type as OpportunityType | undefined;
  const actionLabel = type ? actionLabels[type] : "Participate";

  useEffect(() => {
    loadUserLists();
  }, [id]);

  async function loadUserLists() {
    if (!opportunity) {
      setListLoading(false);
      return;
    }

    setListLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setListLoading(false);
      return;
    }

    const { data } = await supabase
      .from("user_opportunity_lists")
      .select("list_type")
      .eq("opportunity_slug", id);

    const types = new Set((data || []).map((item) => item.list_type));
    setSaved(types.has("saved"));
    setWatchlisted(types.has("watchlist"));
    setListLoading(false);
  }

  async function toggleList(listType: "saved" | "watchlist") {
    if (!opportunity) return;

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/sign-in?next=/opportunities/" + id);
      return;
    }

    const active = listType === "saved" ? saved : watchlisted;

    if (active) {
      const { error } = await supabase
        .from("user_opportunity_lists")
        .delete()
        .eq("opportunity_slug", id)
        .eq("list_type", listType);

      if (error) {
        setNotice("We could not update your " + (listType === "saved" ? "Saved" : "Watchlist") + " right now.");
        return;
      }

      if (listType === "saved") setSaved(false);
      else setWatchlisted(false);
      setNotice(listType === "saved" ? "Removed from Saved." : "Removed from Watchlist.");
      return;
    }

    const { error } = await supabase.from("user_opportunity_lists").insert({
      user_id: user.id,
      opportunity_slug: id,
      opportunity_title: opportunity.title,
      company_name: opportunity.company,
      category: opportunity.type,
      list_type: listType,
    });

    if (error && error.code !== "23505") {
      setNotice("We could not update your " + (listType === "saved" ? "Saved" : "Watchlist") + " right now.");
      return;
    }

    if (listType === "saved") setSaved(true);
    else setWatchlisted(true);
    setNotice(listType === "saved" ? "Opportunity saved." : "Added to Watchlist.");
  }

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
                <div className="relative min-h-[320px] overflow-hidden bg-slate-950 sm:min-h-[400px]">
                  <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/25 blur-3xl" />
                  <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />
                  <div className="relative flex min-h-[320px] flex-col justify-between bg-gradient-to-br from-purple-700 via-indigo-700 to-slate-950 p-6 sm:min-h-[400px] sm:p-10">
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
                  <InfoCard label={opportunity.type === "Investment" ? "Funding target" : opportunity.type === "Careers & Jobs" ? "Opportunity type" : "Opportunity value"} value={opportunity.value} />
                  <InfoCard label="Closing date" value={opportunity.closing} />
                  <InfoCard label="Company" value={opportunity.company} />
                </div>
              </section>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-6">
                  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Overview</p>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">About this opportunity</h2>
                    <p className="mt-5 text-sm leading-8 text-slate-700">{opportunity.description}</p>
                  </section>

                  <CategoryDetails type={type!} />

                  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Participation journey</p>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">What happens next</h2>
                    <div className="mt-6 grid gap-3">
                      {["Review the opportunity and requirements.", "Complete any required profile, verification or eligibility steps.", "Submit your application, investment or participation request.", "Track progress, updates and the final outcome through ACEPA."].map((step, index) => (
                        <div key={step} className="flex gap-4 rounded-2xl bg-slate-50 p-4">
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
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Your next step</p>
                    <h2 className="mt-2 text-xl font-black tracking-[-0.03em]">{actionLabel}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {type === "Investment"
                        ? "Review the investment structure, contribution requirements, risk information and applicable eligibility checks before investing."
                        : type === "Innovation"
                          ? "Submit your solution or join the challenge according to the published eligibility and submission requirements."
                          : type === "Marketing"
                            ? "Apply to contribute to the campaign and review the expected deliverables and performance terms."
                            : type === "Business"
                              ? "Connect with the company to discuss the commercial structure, territory and partnership requirements."
                              : type === "Collaboration"
                                ? "Express your capability and proposed contribution to the collaboration."
                                : type === "Experts"
                                  ? "Submit your expertise and relevant experience for matching and review."
                                  : "Submit your profile and application materials for the role."}
                    </p>
                    <button
                      onClick={() => router.push("/opportunities/" + id + "/participate")}
                      className="mt-5 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
                    >
                      {actionLabel} →
                    </button>
                    <button
                      disabled={listLoading}
                      onClick={() => toggleList("saved")}
                      className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm font-bold transition " + (saved ? "border-purple-200 bg-purple-50 text-purple-700" : "border-slate-200 text-slate-700 hover:border-purple-200 hover:text-purple-700") + " disabled:cursor-not-allowed disabled:opacity-60"}
                    >
                      {saved ? "Saved ✓" : "Save opportunity"}
                    </button>
                    <button
                      disabled={listLoading}
                      onClick={() => toggleList("watchlist")}
                      className={"mt-2 w-full rounded-xl border px-4 py-3 text-sm font-bold transition " + (watchlisted ? "border-amber-200 bg-amber-50 text-amber-700" : "border-slate-200 text-slate-700 hover:border-amber-200 hover:text-amber-700") + " disabled:cursor-not-allowed disabled:opacity-60"}
                    >
                      {watchlisted ? "On Watchlist ✓" : "Add to Watchlist"}
                    </button>
                  </div>

                  <div className="rounded-3xl border border-purple-100 bg-purple-50/70 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-700">ACEPA flow</p>
                    <p className="mt-3 text-sm font-semibold leading-6 text-purple-900">
                      Discover → Explore → Decide → Participate → Track → Complete → Progress
                    </p>
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
