import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ParticipateButton from "@/components/opportunities/participate-button";
import { getDemoOpportunity, type DemoOpportunity } from "@/lib/demo-opportunities";

type DetailSection = {
  title: string;
  body: string;
  items?: string[];
};

type DetailOpportunity = {
  id: string;
  title: string;
  slug: string;
  company_name: string;
  location: string | null;
  summary: string;
  description: string;
  primary_image_url: string | null;
  video_urls: string[];
  amount_text: string | null;
  category: string;
  category_slug: string;
  company_verified: boolean;
  sections: DetailSection[];
  meta: string[];
  details: Array<[string, string | number | null]>;
};

function money(value: number | null | undefined) {
  return value == null || Number.isNaN(value)
    ? null
    : "$" + Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function dateLabel(value: string | null | undefined) {
  return value
    ? new Date(value).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;
}

function hasSection(sections: DetailSection[], title: string) {
  return sections.some((section) => section.title.toLowerCase().includes(title.toLowerCase()));
}

function ensureSections(sections: DetailSection[], categorySlug: string): DetailSection[] {
  const result = [...sections];

  const add = (title: string, body: string, items?: string[]) => {
    if (!hasSection(result, title)) result.push({ title, body, items });
  };

  if (categorySlug === "investment") {
    add("Terms & Conditions", "Participation terms, eligibility, payment conditions, cancellation or withdrawal rules, risks and other applicable conditions will be displayed here before participation.");
    add("Documents", "Company-provided and verified project, financial and legal documents will be listed here when available.");
    add("Updates", "Material project updates and changes published by the company will appear here.");
    add("Q&A", "Participant questions and official company responses will appear here.");
    add("Reviews", "Verified participant reviews and experiences will appear here after completed participation.");
  } else if (categorySlug === "innovation") {
    add("Terms & Conditions", "Challenge rules, eligibility, intellectual-property terms, submission conditions and other applicable terms will be displayed here.");
    add("Documents", "Challenge briefs, technical materials and supporting documents will be listed here when available.");
    add("Updates", "Challenge updates, clarifications and company announcements will appear here.");
    add("Q&A", "Questions from participants and official company responses will appear here.");
    add("Reviews", "Verified participant experiences will appear here after completed participation.");
  } else if (categorySlug === "marketing") {
    add("Terms & Conditions", "Campaign terms, eligibility, usage rights, payment conditions, deliverables and other applicable conditions will be displayed here.");
    add("Documents", "Campaign briefs, brand guidelines and supporting materials will be listed here when available.");
    add("Updates", "Campaign updates and material changes will appear here.");
    add("Q&A", "Questions from applicants and official company responses will appear here.");
    add("Reviews", "Verified participant reviews will appear here after completed campaign work.");
  } else if (categorySlug === "collaboration") {
    add("Terms & Conditions", "Collaboration terms, eligibility, responsibilities, payment conditions, confidentiality and other applicable conditions will be displayed here.");
    add("Documents", "Partnership briefs, agreements and supporting documents will be listed here when available.");
    add("Updates", "Collaboration updates and material changes will appear here.");
    add("Q&A", "Questions from potential partners and official company responses will appear here.");
    add("Reviews", "Verified partner reviews will appear here after completed collaboration.");
  } else if (categorySlug === "experts") {
    add("Terms & Conditions", "Engagement terms, scope boundaries, confidentiality, payment conditions and other applicable conditions will be displayed here.");
    add("Documents", "Engagement briefs and supporting documents will be listed here when available.");
    add("Updates", "Engagement updates and material changes will appear here.");
    add("Q&A", "Questions from applicants and official company responses will appear here.");
    add("Reviews", "Verified client reviews will appear here after completed engagements.");
  } else if (categorySlug === "careers-jobs") {
    add("Terms & Conditions", "Application, employment, eligibility, confidentiality and other applicable terms supplied by the company will be displayed here.");
    add("Documents", "Job descriptions, role documents and supporting materials will be listed here when available.");
    add("Updates", "Recruitment updates and material changes to the role will appear here.");
    add("Reviews", "Relevant verified workplace or applicant experiences may appear here subject to ACEPA review standards.");
  } else {
    add("Terms & Conditions", "The applicable opportunity terms, eligibility, payment conditions and requirements will be displayed here.");
    add("Documents", "Supporting documents will be listed here when available.");
    add("Updates", "Opportunity updates will appear here.");
    add("Q&A", "Questions and official responses will appear here.");
    add("Reviews", "Verified participant reviews will appear here after completed participation.");
  }

  return result;
}

function liveSections(live: any, categorySlug: string): DetailSection[] {
  const commonFinancialItems = [
    "Funding goal: " + (money(live.funding_goal) ?? "Not provided"),
    "Funding raised: " + (money(live.funding_raised) ?? "Not provided"),
    "Company contribution: " + (live.company_contribution_percent != null ? live.company_contribution_percent + "%" : "Not provided"),
    "Public contribution: " + (live.public_contribution_percent != null ? live.public_contribution_percent + "%" : "Not provided"),
    "Returns: " + (live.return_text ?? "Not provided"),
  ];

  const sections: DetailSection[] =
    categorySlug === "investment"
      ? [
          { title: "Financials", body: "Financial information supplied for this opportunity is shown below. Company-provided figures and projections will be clearly identified.", items: commonFinancialItems },
          { title: "Market & Project Information", body: "The company can provide the market, project stage, use of funds, timeline, objectives and other project information here." },
          { title: "Past Performance", body: "Historical performance is kept separate from projections. Verified or company-provided historical results will be identified by their source and status." },
          { title: "Risks", body: "Material risks and risk disclosures supplied for this opportunity will be displayed here before participation." },
        ]
      : categorySlug === "innovation"
        ? [
            { title: "Challenge Details", body: live.description ?? live.summary, items: ["Industry: " + (live.industry ?? "Not provided"), "Deadline: " + (dateLabel(live.deadline) ?? "Not provided"), "Reward: " + (live.reward_text ?? "Not provided")] },
            { title: "Requirements & Evaluation", body: "The company will publish the problem statement, submission requirements, evaluation criteria and selection process here." },
            { title: "Existing Solutions & Context", body: "Relevant market context, current process, previous attempts and known limitations can be provided here." },
          ]
        : categorySlug === "marketing"
          ? [
              { title: "Campaign Details", body: live.description ?? live.summary, items: ["Campaign budget: " + (live.amount_text ?? "Not provided"), "Payment: " + (live.payment_schedule ?? "Not provided"), "Deadline: " + (dateLabel(live.deadline) ?? "Not provided")] },
              { title: "Deliverables & Requirements", body: "The company will publish campaign objectives, target audience, deliverables, timelines, usage rights and applicant requirements here." },
              { title: "Past Campaign Performance", body: "Relevant historical campaign results will be displayed separately from future campaign targets and clearly identified by source." },
            ]
          : categorySlug === "collaboration"
            ? [
                { title: "Collaboration Objective", body: live.description ?? live.summary, items: ["Industry: " + (live.industry ?? "Not provided"), "Location: " + (live.location ?? "Global"), "Deadline: " + (dateLabel(live.deadline) ?? "Not provided")] },
                { title: "Requirements & Contribution", body: "The company will publish the partner requirements, expected contribution, responsibilities, milestones and desired outcomes here." },
                { title: "Commercial Terms", body: "Reward and payment information supplied by the company will be displayed here.", items: ["Reward: " + (live.reward_text ?? "Not provided"), "Payment schedule: " + (live.payment_schedule ?? "Not provided")] },
                { title: "Previous Collaborations", body: "Relevant previous partnerships and outcomes can be displayed here." },
              ]
            : categorySlug === "experts"
              ? [
                  { title: "Scope of Work", body: live.description ?? live.summary, items: ["Industry: " + (live.industry ?? "Not provided"), "Engagement value: " + (live.amount_text ?? "Not provided"), "Deadline: " + (dateLabel(live.deadline) ?? "Not provided")] },
                  { title: "Expert Requirements", body: "The company will publish required qualifications, experience, deliverables and selection criteria here." },
                  { title: "Compensation & Terms", body: "Compensation and payment information supplied by the company will be displayed here.", items: ["Payment: " + (live.payment_schedule ?? "Not provided"), "Value: " + (live.amount_text ?? "Not provided")] },
                  { title: "Previous Engagements", body: "Relevant previous expert engagements and outcomes can be displayed here." },
                ]
              : categorySlug === "careers-jobs"
                ? [
                    { title: "Role & Responsibilities", body: live.description ?? live.summary, items: ["Industry: " + (live.industry ?? "Not provided"), "Employment type: " + (live.employment_type ?? "Not provided"), "Location: " + (live.location ?? "Global")] },
                    { title: "Requirements", body: "The company will publish qualifications, experience, skills and role-specific requirements here." },
                    { title: "Salary & Benefits", body: "Compensation and benefits supplied by the company will be displayed here.", items: ["Salary: " + (live.amount_text ?? "Not provided"), "Employment type: " + (live.employment_type ?? "Not provided")] },
                    { title: "Hiring Process", body: "Application review, interviews, assessments and final selection steps will be displayed here." },
                    { title: "Company Information", body: "Relevant company profile and verification information will be displayed here." },
                  ]
                : [
                    { title: "Opportunity Details", body: live.description ?? live.summary },
                  ];

  return ensureSections(sections, categorySlug);
}

function demoToDetail(demo: DemoOpportunity): DetailOpportunity {
  const categorySlug = demo.category_slug;
  return {
    id: demo.id,
    title: demo.title,
    slug: demo.slug,
    company_name: demo.company_name,
    location: demo.location,
    summary: demo.summary,
    description: demo.description,
    primary_image_url: demo.primary_image_url,
    video_urls: [],
    amount_text: demo.amount_text,
    category: demo.category,
    category_slug: categorySlug,
    company_verified: false,
    sections: ensureSections(demo.sections, categorySlug),
    meta: demo.meta,
    details: [
      ["Industry", demo.subcategory],
      ["Opportunity Type", demo.category],
      ["Company", demo.company_name],
      ["Location", demo.location],
    ],
  };
}

export default async function OpportunityPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { slug } = await params;
  const { from } = await searchParams;
  const supabase = await createClient();

  const { data: live } = await supabase
    .from("opportunities")
    .select("id,title,slug,company_name,location,summary,description,primary_image_url,video_urls,amount_text,published_at,company_verified,industry,funding_goal,funding_raised,company_contribution_percent,public_contribution_percent,participant_count,proposal_count,reward_text,payment_schedule,deadline,return_text,employment_type,opportunity_categories(name,slug)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  const demo = !live ? getDemoOpportunity(slug) : null;
  if (!live && !demo) notFound();

  const opportunity: DetailOpportunity = live
    ? (() => {
        const categorySlug = live.opportunity_categories?.[0]?.slug ?? "other";
        const details: Array<[string, string | number | null]> = [
          ["Industry", live.industry],
          ["Funding Goal", money(live.funding_goal)],
          ["Funding Raised", money(live.funding_raised)],
          ["Company Contribution", live.company_contribution_percent != null ? live.company_contribution_percent + "%" : null],
          ["Public Contribution", live.public_contribution_percent != null ? live.public_contribution_percent + "%" : null],
          ["Participants", live.participant_count],
          ["Proposals / Submissions", live.proposal_count],
          ["Reward", live.reward_text],
          ["Payment", live.payment_schedule],
          ["Deadline", dateLabel(live.deadline)],
          ["Returns", live.return_text],
          ["Employment Type", live.employment_type],
          ["Company Verification", live.company_verified ? "Verified company" : "Not verified"],
        ];

        return {
          id: live.id,
          title: live.title,
          slug: live.slug,
          company_name: live.company_name,
          location: live.location,
          summary: live.summary,
          description: live.description ?? live.summary,
          primary_image_url: live.primary_image_url,
          video_urls: Array.isArray(live.video_urls) ? live.video_urls : [],
          amount_text: live.amount_text,
          category: live.opportunity_categories?.[0]?.name ?? "Opportunity",
          category_slug: categorySlug,
          company_verified: Boolean(live.company_verified),
          sections: liveSections(live, categorySlug),
          meta: [live.location ?? "Global", live.company_verified ? "Verified company" : "Company information"],
          details,
        };
      })()
    : demoToDetail(demo!);

  const isDemo = Boolean(demo);
  const backHref =
    from === "dashboard-discover"
      ? "/dashboard/discover"
      : "/discover/" + opportunity.category_slug;
  const backLabel =
    from === "dashboard-discover"
      ? "Back to Discover"
      : "Back to " + opportunity.category;

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/dashboard" className="flex items-center">
            <img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA" className="h-12 w-auto object-contain brightness-0" />
          </Link>
          <Link href={backHref} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-purple-200 hover:text-purple-600">
            ← {backLabel}
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        {isDemo && (
          <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
            Demo opportunity — this is a test listing so we can build the full ACEPA experience before real company listings are live.
          </div>
        )}

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="relative h-80 bg-slate-950 sm:h-[400px]">
            {opportunity.primary_image_url && (
              <img src={opportunity.primary_image_url} alt="" className="h-full w-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-7 left-6 right-6 text-white sm:bottom-10 sm:left-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-purple-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em]">
                  {opportunity.category}
                </span>
                {opportunity.company_verified && (
                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-bold backdrop-blur">
                    ✓ Verified company
                  </span>
                )}
                {opportunity.location && (
                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold backdrop-blur">
                    {opportunity.location}
                  </span>
                )}
              </div>
              <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.05em] sm:text-5xl">{opportunity.title}</h1>
              <p className="mt-3 text-sm font-semibold text-white/75">{opportunity.company_name}</p>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article>
              <section>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Overview</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">Everything you need to know</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{opportunity.description}</p>
              </section>

              <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Key information</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {opportunity.details.map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p>
                      <p className="mt-1.5 text-sm font-bold leading-5 text-slate-800">{value ?? "Not provided by the company"}</p>
                    </div>
                  ))}
                </div>
              </section>

              {opportunity.video_urls.length > 0 && (
                <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Videos</p>
                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    {opportunity.video_urls.map((url, index) => (
                      <div key={url} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
                        <video controls preload="metadata" className="aspect-video w-full" src={url}>
                          Your browser does not support video playback.
                        </video>
                        <p className="px-4 py-3 text-xs font-bold text-white">Opportunity video {index + 1}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="mt-7 space-y-5">
                {opportunity.sections.map((section) => (
                  <div key={section.title} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                    <h2 className="text-xl font-black tracking-tight text-slate-950">{section.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{section.body}</p>
                    {section.items && section.items.length > 0 && (
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {section.items.map((item) => (
                          <div key={item} className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            </article>

            <aside className="h-fit space-y-4 lg:sticky lg:top-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Opportunity</p>
                {opportunity.amount_text && <p className="mt-3 text-2xl font-black">{opportunity.amount_text}</p>}
                <div className="mt-4 space-y-2">
                  {opportunity.meta.map((meta) => (
                    <div key={meta} className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                      {meta}
                    </div>
                  ))}
                </div>
                <ParticipateButton
                  opportunityId={opportunity.id}
                  opportunitySlug={opportunity.slug}
                  opportunityTitle={opportunity.title}
                  companyName={opportunity.company_name}
                  category={opportunity.category}
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Before you participate</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>✓ Review all opportunity information.</li>
                  <li>✓ Read the Terms & Conditions.</li>
                  <li>✓ Review available documents and disclosures.</li>
                  <li>✓ Check past performance separately from projections where available.</li>
                  <li>✓ Review Q&A and verified reviews where available.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-300">Trust & verification</p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  ACEPA will distinguish company-provided information, verified information, historical results and projections.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
