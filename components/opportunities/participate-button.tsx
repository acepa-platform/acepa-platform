"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type ParticipateButtonProps = {
  opportunityId: string;
  opportunitySlug: string;
  opportunityTitle: string;
  companyName: string;
  category: string;
};

const actionByCategory: Record<string, { label: string; action: string }> = {
  Investment: { label: "Invest", action: "invest" },
  Innovation: { label: "Submit Idea", action: "submit_idea" },
  Marketing: { label: "Apply to Campaign", action: "apply_to_campaign" },
  Collaboration: { label: "Apply to Collaborate", action: "apply_to_collaborate" },
  Experts: { label: "Apply as Expert", action: "apply_as_expert" },
  "Careers & Jobs": { label: "Apply for Job", action: "apply_for_job" },
  Business: { label: "Apply", action: "apply" },
};

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export default function ParticipateButton({
  opportunityId,
  opportunitySlug,
  opportunityTitle,
  companyName,
  category,
}: ParticipateButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const action = actionByCategory[category] ?? { label: "Apply", action: "apply" };

  async function handleAction() {
    setLoading(true);
    setMessage("");

    if (category === "Investment") {
      router.push(`/discover/opportunities/${opportunitySlug}/invest`);
      return;
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/sign-in?next=/discover/opportunities/${opportunitySlug}`);
      return;
    }

    const { data: existing } = await supabase
      .from("opportunity_participations")
      .select("id,status")
      .eq("user_id", user.id)
      .eq("opportunity_slug", opportunitySlug)
      .in("status", ["submitted", "under_review", "shortlisted", "accepted", "in_progress"])
      .limit(1)
      .maybeSingle();

    if (existing) {
      setMessage("You already have an active request for this opportunity.");
      setLoading(false);
      return;
    }

    const referenceId = `ACEPA-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const { error } = await supabase.from("opportunity_participations").insert({
      user_id: user.id,
      opportunity_id: isUuid(opportunityId) ? opportunityId : null,
      opportunity_slug: opportunitySlug,
      opportunity_title: opportunityTitle,
      company_name: companyName,
      category,
      action: action.action,
      status: "submitted",
      payment_status: "not_required",
      currency: "USD",
      reference_id: referenceId,
      details: {
        source: "opportunity_detail",
        request_type: action.action,
      },
    });

    if (error) {
      setMessage("We could not submit your request. Please try again.");
      setLoading(false);
      return;
    }

    setMessage(`${action.label} request submitted successfully.`);
    setLoading(false);
    router.refresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleAction}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Opening..." : action.label}
      </button>
      {message && (
        <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2.5 text-center text-xs font-semibold leading-5 text-slate-600">
          {message}
        </p>
      )}
      <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
        Your request will be recorded in your ACEPA Activity.
      </p>
    </div>
  );
}
