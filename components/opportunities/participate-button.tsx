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

  async function participate() {
    setLoading(true);
    setMessage("");

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
      .eq("opportunity_id", opportunityId)
      .in("status", ["submitted", "under_review", "shortlisted", "accepted", "in_progress"])
      .limit(1)
      .maybeSingle();

    if (existing) {
      setMessage("You have already participated in this opportunity.");
      setLoading(false);
      return;
    }

    const referenceId = `ACEPA-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const { error } = await supabase.from("opportunity_participations").insert({
      user_id: user.id,
      opportunity_id: opportunityId,
      opportunity_slug: opportunitySlug,
      opportunity_title: opportunityTitle,
      company_name: companyName,
      category,
      action: "participate",
      status: "submitted",
      payment_status: "not_required",
      currency: "USD",
      reference_id: referenceId,
      details: {
        source: "opportunity_detail",
        participation_type: category.toLowerCase(),
      },
    });

    if (error) {
      setMessage("We could not record your participation. Please try again.");
      setLoading(false);
      return;
    }

    setMessage("Participation submitted successfully.");
    setLoading(false);
    router.refresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={participate}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Participate"}
      </button>
      {message && (
        <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2.5 text-center text-xs font-semibold leading-5 text-slate-600">
          {message}
        </p>
      )}
      <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
        Your participation will be recorded in your ACEPA Activity.
      </p>
    </div>
  );
}
