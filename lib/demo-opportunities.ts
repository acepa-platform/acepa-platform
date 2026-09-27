export type DemoOpportunity = {
  id: string;
  title: string;
  slug: string;
  company_name: string;
  location: string;
  summary: string;
  description: string;
  primary_image_url: string;
  amount_text: string;
  category: string;
  category_slug: string;
  subcategory: string;
  meta: string[];
  sections: { title: string; body: string; items?: string[] }[];
};

export const demoOpportunities: DemoOpportunity[] = [
  {
    id: "demo-investment-1",
    title: "GreenHarvest Processing Project",
    slug: "demo-greenharvest-processing-project",
    company_name: "GreenHarvest Foods",
    location: "Lagos, Nigeria",
    summary: "A food-processing expansion seeking capital to increase production capacity and distribution.",
    description: "GreenHarvest Foods is expanding a food-processing operation with a focus on locally sourced agricultural products, improved production capacity and wider distribution.",
    primary_image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
    amount_text: "$250,000 funding requirement",
    category: "Investment",
    category_slug: "investment",
    subcategory: "Agriculture",
    meta: ["Company contribution: 35%", "Stage: Growth", "Timeline: 18 months"],
    sections: [
      { title: "Financials", body: "Demo financial information is shown for product testing. Real companies will provide the underlying financial records and supporting documents.", items: ["Funding requirement: $250,000", "Company contribution: 35%", "Use of funds: equipment, processing and distribution"] },
      { title: "Market Analysis", body: "The company serves growing demand for packaged agricultural products across regional retail and wholesale channels." },
      { title: "Past Performance", body: "Historical figures in a real listing will be clearly separated from projections and labelled according to their verification status.", items: ["Historical revenue: company-provided demo figure", "Production growth: company-provided demo figure"] },
      { title: "Production & Delivery", body: "The project plan covers equipment installation, production ramp-up, quality control and distribution." },
      { title: "Previous Projects", body: "Companies can show relevant previous projects and outcomes here." },
      { title: "Updates", body: "Project updates will appear here as the company publishes progress." },
      { title: "Documents", body: "Verified and company-provided documents will be listed here." },
      { title: "Q&A", body: "Participants can ask questions and see company responses here." },
      { title: "Reviews", body: "Verified participants will be able to share their experience after participation." }
    ]
  },
  {
    id: "demo-innovation-1",
    title: "Smart Cold-Chain Challenge",
    slug: "demo-smart-cold-chain-challenge",
    company_name: "NexusFresh Logistics",
    location: "Accra, Ghana",
    summary: "Help solve a real cold-chain monitoring problem affecting food delivery and storage.",
    description: "NexusFresh is looking for practical ideas that can improve temperature monitoring, alerts and operational visibility across its cold-chain network.",
    primary_image_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80",
    amount_text: "Innovation challenge",
    category: "Innovation",
    category_slug: "innovation",
    subcategory: "Logistics",
    meta: ["Challenge stage: Open", "Evaluation: Practicality + impact", "Response window: 30 days"],
    sections: [
      { title: "Challenge", body: "Reduce product loss caused by temperature changes that are detected too late." },
      { title: "What the Company Is Looking For", body: "Solutions should be practical, measurable and suitable for deployment across multiple delivery routes.", items: ["Low-cost monitoring", "Reliable alerts", "Simple operational dashboard"] },
      { title: "Evaluation Criteria", body: "Submissions will be assessed against the published requirements and evaluation criteria." },
      { title: "Existing Solutions", body: "The company will document its current process and known limitations here." },
      { title: "Updates", body: "Challenge updates and clarifications will appear here." },
      { title: "Documents", body: "Briefs and supporting documents will appear here." },
      { title: "Q&A", body: "Participants can ask questions before submitting an idea." },
      { title: "Reviews", body: "Verified participants can review their experience after the challenge." }
    ]
  },
  {
    id: "demo-marketing-1",
    title: "NextWave Product Launch Campaign",
    slug: "demo-nextwave-product-launch",
    company_name: "NextWave Consumer",
    location: "Nairobi, Kenya",
    summary: "A multi-channel product launch campaign seeking creators and marketing partners.",
    description: "NextWave is preparing a product launch campaign and is looking for creative partners who can help reach a defined target audience.",
    primary_image_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80",
    amount_text: "$15,000 campaign budget",
    category: "Marketing",
    category_slug: "marketing",
    subcategory: "Brand Campaigns",
    meta: ["Campaign stage: Open", "Audience: 18–34", "Duration: 8 weeks"],
    sections: [
      { title: "Campaign Goals", body: "Build awareness, generate qualified traffic and support the product launch." },
      { title: "Target Audience", body: "The campaign is aimed at digitally active consumers aged 18–34." },
      { title: "Market Data", body: "Market research and audience information supplied by the company will appear here." },
      { title: "Previous Campaign Performance", body: "Relevant historical campaign results can be displayed here and labelled as company-provided or verified." },
      { title: "Deliverables", body: "Applicants will see the exact deliverables, timelines and submission requirements here." },
      { title: "Compensation & Terms", body: "Budget, compensation model and campaign terms will appear here." },
      { title: "Updates", body: "Campaign updates will appear here." },
      { title: "Documents", body: "Briefs and brand assets will appear here." },
      { title: "Q&A", body: "Questions and official responses will appear here." },
      { title: "Reviews", body: "Verified participants can review completed campaign engagements." }
    ]
  },
  {
    id: "demo-collaboration-1",
    title: "Regional Distribution Partnership",
    slug: "demo-regional-distribution-partnership",
    company_name: "Atlas Home Products",
    location: "Kigali, Rwanda",
    summary: "A company is seeking distribution partners to expand a consumer-products network.",
    description: "Atlas Home Products is looking for reliable distribution partners with established retail relationships and regional market knowledge.",
    primary_image_url: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80",
    amount_text: "Partnership opportunity",
    category: "Collaboration",
    category_slug: "collaboration",
    subcategory: "Distribution",
    meta: ["Partnership stage: Open", "Regions: East Africa", "Model: Strategic partnership"],
    sections: [
      { title: "Collaboration Objective", body: "Expand product availability through qualified regional distribution partners." },
      { title: "Requirements", body: "Partners should demonstrate relevant market access, operational capability and compliance." },
      { title: "Expected Contribution", body: "Partners may contribute distribution capacity, market relationships and local execution." },
      { title: "Previous Collaborations", body: "Relevant previous partnerships can be displayed here." },
      { title: "Expected Outcomes", body: "The company will define measurable collaboration outcomes and milestones here." },
      { title: "Updates", body: "Partnership updates will appear here." },
      { title: "Documents", body: "Partnership briefs and supporting documents will appear here." },
      { title: "Q&A", body: "Questions and official responses will appear here." },
      { title: "Reviews", body: "Verified partners can share their experience after a completed engagement." }
    ]
  },
  {
    id: "demo-expert-1",
    title: "Operations Strategy Advisor",
    slug: "demo-operations-strategy-advisor",
    company_name: "Vertex Manufacturing",
    location: "Remote · Global",
    summary: "An expert engagement for improving operations planning and performance reporting.",
    description: "Vertex Manufacturing is seeking an experienced operations professional for a defined advisory engagement.",
    primary_image_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80",
    amount_text: "$4,000 engagement",
    category: "Experts",
    category_slug: "experts",
    subcategory: "Business Operations",
    meta: ["Engagement: 6 weeks", "Work mode: Remote", "Status: Open"],
    sections: [
      { title: "Expert Requirements", body: "Relevant operations strategy experience and evidence of comparable work are required." },
      { title: "Scope of Work", body: "The engagement covers operational review, recommendations and implementation planning." },
      { title: "Expected Deliverables", body: "The selected expert will provide an assessment, recommendations and a final action plan." },
      { title: "Terms", body: "Compensation, milestones and engagement terms will be displayed here." },
      { title: "Previous Engagements", body: "Relevant company engagements can be displayed here." },
      { title: "Reviews", body: "Verified clients can review completed engagements." },
      { title: "Q&A", body: "Questions and official responses will appear here." }
    ]
  },
  {
    id: "demo-career-1",
    title: "Product Operations Manager",
    slug: "demo-product-operations-manager",
    company_name: "BrightGrid Technologies",
    location: "Lagos, Nigeria · Hybrid",
    summary: "Join a growing product team and help coordinate operations across product delivery.",
    description: "BrightGrid Technologies is hiring a Product Operations Manager to coordinate cross-functional product operations and improve delivery processes.",
    primary_image_url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80",
    amount_text: "$35,000–$45,000 / year",
    category: "Careers & Jobs",
    category_slug: "careers-jobs",
    subcategory: "Technology",
    meta: ["Full-time", "Hybrid", "Mid-level"],
    sections: [
      { title: "Role", body: "Product Operations Manager" },
      { title: "Responsibilities", body: "Coordinate product operations, improve workflows, support launches and maintain cross-functional reporting." },
      { title: "Requirements", body: "Relevant experience in product, operations, project management or a related field." },
      { title: "Salary & Compensation", body: "The published salary range is shown above. Final compensation and benefits are confirmed during the hiring process." },
      { title: "Benefits", body: "Benefits supplied by the company will appear here." },
      { title: "Company Information", body: "Company profile and verification information will appear here." },
      { title: "Hiring Process", body: "Application review, interviews and final selection steps will be shown here." },
      { title: "Reviews", body: "Where appropriate, verified workplace or applicant experiences can be shown subject to ACEPA review standards." }
    ]
  }
];

export function getDemoOpportunity(slug: string) {
  return demoOpportunities.find((item) => item.slug === slug) ?? null;
}
