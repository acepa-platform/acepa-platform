export type DemoInvestment = {
  id: string;
  opportunitySlug: string;
  opportunityTitle: string;
  companyName: string;
  category: "Energy" | "Consumer" | "Technology" | "Real Estate";
  status: "active" | "under_review" | "completed";
  amountInvested: number;
  currentValue: number;
  currency: "USD";
  units: string;
  ownership: string;
  paymentStatus: "successful_demo" | "pending" | "successful";
  investmentDate: string;
  updatedAt: string;
  referenceId: string;
  summary: string;
  timeline: Array<{ title: string; detail: string; date: string; state: "complete" | "current" | "upcoming" }>;
  terms: string[];
  documents: string[];
};

export const demoInvestments: DemoInvestment[] = [
  {
    id: "demo-investment-sungrid", opportunitySlug: "solar-energy-expansion", opportunityTitle: "Solar Energy Expansion", companyName: "SunGrid Energy Ltd.", category: "Energy", status: "active",
    amountInvested: 2500, currentValue: 2675, currency: "USD", units: "50 project units", ownership: "0.05% project participation", paymentStatus: "successful_demo",
    investmentDate: "2026-09-22T10:15:00+01:00", updatedAt: "2026-09-24T16:30:00+01:00", referenceId: "ACEPA-DEMO-INV-001",
    summary: "Demo active investment in clean-energy infrastructure expansion.",
    timeline: [
      { title: "Investment submitted", detail: "Investment request recorded.", date: "22 Sep 2026", state: "complete" },
      { title: "Payment successful", detail: "Demo payment marked successful.", date: "22 Sep 2026", state: "complete" },
      { title: "Investment active", detail: "Participation is currently active.", date: "24 Sep 2026", state: "current" },
      { title: "Project completion", detail: "Completion reporting will appear here.", date: "Upcoming", state: "upcoming" },
    ],
    terms: ["Minimum contribution: $500", "Maximum contribution: $250,000", "Illustrative ownership subject to final investment terms", "Financial outcomes depend on actual project performance"],
    documents: ["Investment confirmation", "Demo payment receipt", "Illustrative investment terms"],
  },
  {
    id: "demo-investment-nexa", opportunitySlug: "smart-retail-challenge", opportunityTitle: "Smart Retail Innovation Challenge", companyName: "Nexa Retail Group", category: "Technology", status: "under_review",
    amountInvested: 5000, currentValue: 5000, currency: "USD", units: "10 innovation units", ownership: "Pending final allocation", paymentStatus: "pending",
    investmentDate: "2026-09-20T14:20:00+01:00", updatedAt: "2026-09-23T09:10:00+01:00", referenceId: "ACEPA-DEMO-INV-002",
    summary: "Demo investment request awaiting review and allocation.",
    timeline: [
      { title: "Investment submitted", detail: "Request submitted for review.", date: "20 Sep 2026", state: "complete" },
      { title: "Under review", detail: "Eligibility and investment terms are being reviewed.", date: "23 Sep 2026", state: "current" },
      { title: "Decision", detail: "Approval or decline will be recorded here.", date: "Upcoming", state: "upcoming" },
      { title: "Investment active", detail: "Will appear after approval and completion.", date: "Upcoming", state: "upcoming" },
    ],
    terms: ["Allocation is subject to review", "Payment is not confirmed in this demo record", "Final terms will determine units and participation"],
    documents: ["Application record", "Illustrative opportunity terms"],
  },
  {
    id: "demo-investment-urbanova", opportunitySlug: "product-launch-campaign", opportunityTitle: "Product Launch Campaign", companyName: "Urbanova Consumer Brands", category: "Consumer", status: "completed",
    amountInvested: 1000, currentValue: 1200, currency: "USD", units: "100 campaign participation units", ownership: "Completed participation", paymentStatus: "successful",
    investmentDate: "2026-08-12T11:05:00+01:00", updatedAt: "2026-09-18T13:40:00+01:00", referenceId: "ACEPA-DEMO-INV-003",
    summary: "Demo completed participation with a recorded final value.",
    timeline: [
      { title: "Investment submitted", detail: "Participation recorded.", date: "12 Aug 2026", state: "complete" },
      { title: "Payment successful", detail: "Payment completed.", date: "12 Aug 2026", state: "complete" },
      { title: "Investment active", detail: "Participation completed its active period.", date: "30 Aug 2026", state: "complete" },
      { title: "Completed", detail: "Final outcome recorded.", date: "18 Sep 2026", state: "current" },
    ],
    terms: ["Demo completed investment record", "Final value shown for interface demonstration", "Actual returns would depend on the applicable investment structure"],
    documents: ["Investment confirmation", "Payment receipt", "Completion statement"],
  },
  {
    id: "demo-investment-atlas", opportunitySlug: "regional-distribution-partnership", opportunityTitle: "Regional Distribution Partnership", companyName: "Atlas Supply Network", category: "Real Estate", status: "active",
    amountInvested: 7500, currentValue: 7280, currency: "USD", units: "75 commercial units", ownership: "0.08% participation", paymentStatus: "successful_demo",
    investmentDate: "2026-09-05T13:10:00+01:00", updatedAt: "2026-09-21T17:25:00+01:00", referenceId: "ACEPA-DEMO-INV-004",
    summary: "Demo active investment showing that portfolio values can move in either direction.",
    timeline: [
      { title: "Investment submitted", detail: "Investment request recorded.", date: "5 Sep 2026", state: "complete" },
      { title: "Payment successful", detail: "Demo payment marked successful.", date: "5 Sep 2026", state: "complete" },
      { title: "Investment active", detail: "Participation is currently active.", date: "21 Sep 2026", state: "current" },
      { title: "Completion", detail: "Future reporting will appear here.", date: "Upcoming", state: "upcoming" },
    ],
    terms: ["Demo portfolio record", "Current value may move above or below the original investment", "Final outcome depends on the actual opportunity terms and performance"],
    documents: ["Investment confirmation", "Demo payment receipt"],
  },
];