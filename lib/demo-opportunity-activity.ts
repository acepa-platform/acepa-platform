export type DemoOpportunityActivity = {
  id: string;
  opportunity_slug: string;
  opportunity_title: string;
  company_name: string;
  category: string;
  action: string;
  status: string;
  payment_status: string | null;
  amount: number | null;
  currency: string;
  funding_source: string | null;
  reference_id: string;
  submitted_at: string;
  updated_at: string;
  details: Record<string, string>;
};

export const demoOpportunityActivity: DemoOpportunityActivity[] = [
  {
    id: "demo-activity-investment",
    opportunity_slug: "solar-energy-expansion",
    opportunity_title: "Solar Energy Expansion",
    company_name: "SunGrid Energy Ltd.",
    category: "Investment",
    action: "Invest",
    status: "accepted",
    payment_status: "successful_demo",
    amount: 2500,
    currency: "USD",
    funding_source: "ACEPA Wallet Balance",
    reference_id: "ACEPA-DEMO-INV-001",
    submitted_at: "2026-09-22T10:15:00+01:00",
    updated_at: "2026-09-24T16:30:00+01:00",
    details: {
      "Investment amount": "$2,500",
      "Funding source": "ACEPA Wallet Balance",
      "Terms accepted": "Yes",
    },
  },
  {
    id: "demo-activity-innovation",
    opportunity_slug: "smart-retail-challenge",
    opportunity_title: "Smart Retail Innovation Challenge",
    company_name: "Nexa Retail Group",
    category: "Innovation",
    action: "Apply / Participate",
    status: "under_review",
    payment_status: "not_required",
    amount: null,
    currency: "USD",
    funding_source: null,
    reference_id: "ACEPA-DEMO-INN-002",
    submitted_at: "2026-09-20T14:20:00+01:00",
    updated_at: "2026-09-23T09:10:00+01:00",
    details: {
      "Solution title": "Smart Retail Companion",
      "Solution overview": "A practical customer-intelligence and store-operations platform.",
      "Relevant experience": "Product design and retail technology projects.",
    },
  },
  {
    id: "demo-activity-marketing",
    opportunity_slug: "product-launch-campaign",
    opportunity_title: "Product Launch Campaign",
    company_name: "Urbanova Consumer Brands",
    category: "Marketing",
    action: "Apply",
    status: "shortlisted",
    payment_status: "not_required",
    amount: null,
    currency: "USD",
    funding_source: null,
    reference_id: "ACEPA-DEMO-MKT-003",
    submitted_at: "2026-09-18T11:05:00+01:00",
    updated_at: "2026-09-22T13:40:00+01:00",
    details: {
      "Portfolio / work samples": "Campaign portfolio and creator activation examples.",
      "Execution channels": "Social media, creators, events and digital.",
      "Campaign experience": "Growth campaigns focused on awareness and qualified leads.",
    },
  },
  {
    id: "demo-activity-business",
    opportunity_slug: "regional-distribution-partnership",
    opportunity_title: "Regional Distribution Partnership",
    company_name: "Atlas Supply Network",
    category: "Business",
    action: "Partner",
    status: "accepted",
    payment_status: "not_required",
    amount: null,
    currency: "USD",
    funding_source: null,
    reference_id: "ACEPA-DEMO-BIZ-004",
    submitted_at: "2026-09-15T09:35:00+01:00",
    updated_at: "2026-09-21T17:25:00+01:00",
    details: {
      "Business / organization": "Kingsley Distribution Services",
      "Territory": "Enugu and nearby South-East markets",
      "Contribution": "Retail relationships, field execution and market coverage.",
    },
  },
  {
    id: "demo-activity-collaboration",
    opportunity_slug: "regional-collaboration-lab",
    opportunity_title: "Regional Collaboration Lab",
    company_name: "Nexa Business Network",
    category: "Collaboration",
    action: "Collaborate",
    status: "in_progress",
    payment_status: "not_required",
    amount: null,
    currency: "USD",
    funding_source: null,
    reference_id: "ACEPA-DEMO-COL-005",
    submitted_at: "2026-09-12T15:45:00+01:00",
    updated_at: "2026-09-23T12:15:00+01:00",
    details: {
      "Proposed role": "Market-development contributor",
      "Contribution": "Business network, market research and execution support.",
      "Availability": "6 hours per week",
    },
  },
  {
    id: "demo-activity-expert",
    opportunity_slug: "founder-advisory-network",
    opportunity_title: "Founder Advisory Network",
    company_name: "Nexa Ventures",
    category: "Experts",
    action: "Apply",
    status: "submitted",
    payment_status: "not_required",
    amount: null,
    currency: "USD",
    funding_source: null,
    reference_id: "ACEPA-DEMO-EXP-006",
    submitted_at: "2026-09-10T08:25:00+01:00",
    updated_at: "2026-09-10T08:25:00+01:00",
    details: {
      "Area of expertise": "Business strategy, growth and operations",
      "Professional experience": "Advisory and operating experience across growing businesses.",
      "Qualifications / certifications": "Business and professional development certifications.",
    },
  },
  {
    id: "demo-activity-career",
    opportunity_slug: "growth-marketing-fellowship",
    opportunity_title: "Growth Marketing Fellowship",
    company_name: "ACEPA Partner Network",
    category: "Careers & Jobs",
    action: "Apply Now",
    status: "completed",
    payment_status: "not_required",
    amount: null,
    currency: "USD",
    funding_source: null,
    reference_id: "ACEPA-DEMO-JOB-007",
    submitted_at: "2026-09-05T13:10:00+01:00",
    updated_at: "2026-09-19T18:00:00+01:00",
    details: {
      "Education / training": "Marketing and business development training.",
      "Work experience": "Digital marketing, partnerships and campaign execution.",
      "Cover note": "Interested in building practical growth experience across the ACEPA network.",
    },
  },
];
