"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type InvestmentFormProps = {
  opportunityId: string;
  opportunitySlug: string;
  opportunityTitle: string;
  companyName: string;
  category: string;
  amountText: string;
};

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export default function InvestmentForm(props: InvestmentFormProps) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"amount" | "review" | "success">("amount");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const numericAmount = Number(amount);

  function continueToReview() {
    setError("");
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Enter a valid investment amount in USD.");
      return;
    }
    setStep("review");
  }

  async function confirmInvestment() {
    setLoading(true);
    setError("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/sign-in?next=/discover/opportunities/${props.opportunitySlug}/invest`);
      return;
    }

    const { data: existing } = await supabase
      .from("opportunity_participations")
      .select("id,status")
      .eq("user_id", user.id)
      .eq("opportunity_slug", props.opportunitySlug)
      .eq("action", "invest")
      .in("status", ["submitted", "under_review", "shortlisted", "accepted", "in_progress"])
      .limit(1)
      .maybeSingle();

    if (existing) {
      setError("You already have an active investment request for this opportunity.");
      setLoading(false);
      return;
    }

    const referenceId = `ACEPA-INV-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const { error: insertError } = await supabase.from("opportunity_participations").insert({
      user_id: user.id,
      opportunity_id: isUuid(props.opportunityId) ? props.opportunityId : null,
      opportunity_slug: props.opportunitySlug,
      opportunity_title: props.opportunityTitle,
      company_name: props.companyName,
      category: props.category,
      action: "invest",
      status: "submitted",
      payment_status: "pending",
      amount: numericAmount,
      currency: "USD",
      reference_id: referenceId,
      details: {
        source: "investment_review_flow",
        investment_amount_usd: numericAmount,
        amount_text: props.amountText,
        payment_note: "Payment and settlement will be connected to Wallet in the investment/payment phase.",
      },
    });

    if (insertError) {
      setError("We could not record your investment request. Please try again.");
      setLoading(false);
      return;
    }

    setStep("success");
    setLoading(false);
  }

  if (step === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Investment request recorded</p>
        <h2 className="mt-2 text-xl font-black text-slate-950">Your investment request has been submitted.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Your request is now in ACEPA Activity. Payment and settlement are not processed yet; that will be connected to Wallet in the next investment phase.
        </p>
        <button type="button" onClick={() => router.push("/activity")} className="mt-5 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white hover:bg-purple-600">
          View Activity
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
        <span className={step === "amount" ? "text-purple-600" : ""}>1 Amount</span>
        <span>→</span>
        <span className={step === "review" ? "text-purple-600" : ""}>2 Review</span>
        <span>→</span>
        <span>3 Confirm</span>
      </div>

      {step === "amount" ? (
        <>
          <h2 className="mt-5 text-xl font-black">How much would you like to invest?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter the amount you want to review for this opportunity. ACEPA currently records the request only; payment is not processed on this screen.
          </p>
          <label className="mt-5 block text-xs font-bold text-slate-600">Investment amount (USD)</label>
          <div className="mt-2 flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:border-purple-500">
            <span className="flex items-center px-4 text-sm font-black">$</span>
            <input value={amount} onChange={(event) => setAmount(event.target.value.replace(/[^0-9.]/g, ""))} inputMode="decimal" placeholder="0.00" className="w-full bg-transparent px-3 py-3.5 text-sm font-bold outline-none" />
          </div>
          {error && <p className="mt-3 text-xs font-semibold text-red-600">{error}</p>}
          <button type="button" onClick={continueToReview} className="mt-5 w-full rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white hover:bg-purple-600">
            Continue to Review
          </button>
        </>
      ) : (
        <>
          <h2 className="mt-5 text-xl font-black">Review your investment</h2>
          <div className="mt-5 space-y-3">
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Opportunity</p><p className="mt-1 text-sm font-black">{props.opportunityTitle}</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Company</p><p className="mt-1 text-sm font-black">{props.companyName}</p></div>
            <div className="rounded-xl bg-purple-50 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-purple-500">Investment amount</p><p className="mt-1 text-2xl font-black text-slate-950">{`$${numericAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`}</p></div>
          </div>
          {error && <p className="mt-3 text-xs font-semibold text-red-600">{error}</p>}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setStep("amount")} disabled={loading} className="rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-bold text-slate-700 hover:border-purple-200 hover:text-purple-700">
              Change Amount
            </button>
            <button type="button" onClick={confirmInvestment} disabled={loading} className="rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white hover:bg-purple-600 disabled:opacity-60">
              {loading ? "Submitting..." : "Confirm Investment"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
