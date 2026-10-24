import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BhuB Business | Commerce and Business Operations, Connected",
  description:
    "Discover the connected BhuB ecosystem: a simpler experience for individuals to shop, book and explore, alongside BhuB Business tools for organizations to operate, manage and grow.",
};

const consumerFeatures = [
  {
    number: "01",
    title: "Products and shopping",
    text: "Discover products, explore sellers, compare useful details and keep orders connected to the businesses fulfilling them.",
  },
  {
    number: "02",
    title: "Services and bookings",
    text: "Find services and make bookings for experiences such as travel, accommodation and activities through connected booking journeys.",
  },
  {
    number: "03",
    title: "Orders in one place",
    text: "Keep relevant order and booking information easier to find, follow and understand instead of treating every purchase as a separate journey.",
  },
  {
    number: "04",
    title: "Discover businesses",
    text: "Explore businesses and what they offer, then move from discovery to a product, service or booking when it fits your needs.",
  },
];

const businessFeatures = [
  ["Products and services", "Organize catalogues, descriptions, pricing and the offerings customers can discover or purchase."],
  ["Inventory and warehouses", "Track stock, movements, transfers, available and reserved quantities, and damaged or missing goods."],
  ["Sales, purchases and orders", "Connect commercial activity to the products, customers, suppliers, payments and records involved."],
  ["Customers and suppliers", "Keep business relationships and relevant activity organized in a permission-aware workspace."],
  ["Invoices, payments and receipts", "Create and track invoices, record confirmed payments, follow outstanding balances and connect receipts to transactions."],
  ["People, branches and attendance", "Organize staff, departments, locations, schedules, attendance and role-specific responsibilities."],
  ["Income, expenses and documents", "Keep financial activity, supporting documents and operational records connected and searchable."],
  ["Reports, goals and performance", "Review business activity, monitor measurable goals and understand performance using recorded information."],
];

const workflowSteps = [
  ["01", "Set up the business", "Record the organization, its locations, people, products, services and operating structure."],
  ["02", "Run daily operations", "Manage stock, sales, purchases, orders, bookings, invoices and the work assigned to your team."],
  ["03", "Keep records connected", "Link business activity to the relevant customer, supplier, payment, receipt, document or location."],
  ["04", "Understand and improve", "Use reports, goals, the Business Journal and BhuB AI to review what happened and plan next steps."],
];

function Arrow() {
  return <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">↗</span>;
}

export default function BhuBBusinessPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8f4] text-[#17231e]">
      <header className="sticky top-0 z-50 border-b border-[#17231e]/10 bg-[#f7f8f4]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="BhuB home">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#183e32] text-xl font-black text-[#d7f66a]">B</span>
            <span className="leading-tight">
              <span className="block text-xl font-black tracking-[-0.06em]">BhuB</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#557065]">Business</span>
            </span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-semibold text-[#506159] lg:flex">
            <a className="transition hover:text-[#183e32]" href="#for-everyone">For everyone</a>
            <a className="transition hover:text-[#183e32]" href="#for-business">For business</a>
            <a className="transition hover:text-[#183e32]" href="#how-it-works">How it works</a>
            <a className="transition hover:text-[#183e32]" href="#intelligence">Business intelligence</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#for-everyone" className="hidden rounded-full px-4 py-2.5 text-sm font-bold text-[#183e32] transition hover:bg-[#183e32]/5 sm:inline-flex">Explore BhuB</a>
            <a href="#get-started" className="rounded-full bg-[#183e32] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#183e32]/10 transition hover:bg-[#245442] sm:px-5">Get started <Arrow /></a>
          </div>
        </div>
      </header>

      <section id="top" className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute -right-36 -top-32 h-[34rem] w-[34rem] rounded-full bg-[#d7f66a]/35 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-64 h-[28rem] w-[28rem] rounded-full bg-[#c9ded0]/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16 lg:pt-28">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#183e32]/15 bg-white/70 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#315c49] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#9abd3b]" />
              One connected ecosystem
            </div>
            <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.075em] sm:text-6xl lg:text-[4.7rem]">
              Everyday commerce.
              <span className="mt-2 block text-[#4e755d]">Business, in better view.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#58675f] sm:text-lg">
              BhuB brings people closer to products, services, bookings and businesses. BhuB Business gives organizations a connected place to run operations, manage records, follow performance and coordinate their teams.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#for-everyone" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#183e32] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-[#183e32]/15 transition hover:-translate-y-0.5 hover:bg-[#245442]">Explore BhuB for individuals <Arrow /></a>
              <a href="#for-business" className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#183e32]/20 bg-white/70 px-6 py-4 text-sm font-bold text-[#183e32] transition hover:-translate-y-0.5 hover:bg-white">Explore BhuB Business <Arrow /></a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-[#65746b]">
              <span className="flex items-center gap-2"><span className="text-[#6c8c39]">✓</span> For individuals and organizations</span>
              <span className="flex items-center gap-2"><span className="text-[#6c8c39]">✓</span> Connected business records</span>
              <span className="flex items-center gap-2"><span className="text-[#6c8c39]">✓</span> Access based on permissions</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[590px]">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-[#dce8d8]/70 blur-xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#183e32]/10 bg-white p-4 shadow-2xl shadow-[#1c3327]/10 sm:p-5">
              <div className="flex items-center justify-between border-b border-[#e8eee8] px-2 pb-4">
                <div>
                  <p className="text-xs font-bold text-[#183e32]">BhuB Business</p>
                  <p className="mt-1 text-[11px] text-[#7b8980]">Illustrative workspace preview</p>
                </div>
                <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-[#d4ded4]" /><span className="h-2 w-2 rounded-full bg-[#d4ded4]" /><span className="h-2 w-2 rounded-full bg-[#d4ded4]" /></div>
              </div>
              <div className="grid grid-cols-[68px_1fr] gap-4 pt-4 sm:grid-cols-[82px_1fr] sm:gap-5">
                <aside className="space-y-3 rounded-2xl bg-[#f4f7f1] p-2">
                  {["⌂", "▦", "⇄", "▤", "◎", "⌘"].map((item, index) => (
                    <div key={item + index} className={`flex aspect-square items-center justify-center rounded-xl text-lg ${index === 0 ? "bg-[#183e32] text-[#d7f66a]" : "text-[#748279]"}`}>{item}</div>
                  ))}
                </aside>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7b8980]">Business overview</p><p className="mt-1 text-lg font-bold tracking-tight text-[#1d2c24] sm:text-xl">Your business, connected.</p></div>
                    <span className="rounded-full bg-[#edf5d9] px-2.5 py-1.5 text-[9px] font-bold text-[#4f702c] sm:text-[10px]">Live workspace concept</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
                    {[
                      ["Sales activity", "Transactions", "↗"],
                      ["Stock position", "Inventory", "▦"],
                      ["Money owed", "Invoices", "▤"],
                      ["Team activity", "People & branches", "◎"],
                    ].map(([title, label, icon]) => (
                      <div key={title} className="rounded-2xl border border-[#e7ece5] bg-white p-3 sm:p-4">
                        <div className="flex items-center justify-between"><span className="text-base text-[#6a8a52]">{icon}</span><span className="h-1.5 w-1.5 rounded-full bg-[#9abd3b]" /></div>
                        <p className="mt-4 text-sm font-bold text-[#23352a]">{title}</p>
                        <p className="mt-1 text-[10px] text-[#849087]">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-2xl bg-[#183e32] p-4 text-white sm:p-5">
                    <div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">Business Journal</p><p className="mt-1 text-sm font-semibold">Understand what happened next</p></div><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#d7f66a]">✳</span></div>
                    <div className="mt-4 flex gap-2"><span className="h-1.5 w-[42%] rounded-full bg-[#d7f66a]" /><span className="h-1.5 w-[28%] rounded-full bg-white/30" /><span className="h-1.5 flex-1 rounded-full bg-white/15" /></div>
                    <p className="mt-3 text-[10px] leading-5 text-white/65">Example interface only. Actual information depends on recorded business activity and your access permissions.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-4 flex items-center gap-3 rounded-2xl border border-[#183e32]/10 bg-white/90 p-4 shadow-lg shadow-[#1c3327]/5 sm:absolute sm:-bottom-7 sm:-left-8 sm:mt-0 sm:max-w-[270px]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#edf5d9] text-xl text-[#4f702c]">↔</span>
              <div><p className="text-sm font-bold text-[#23352a]">Consumer to commerce</p><p className="mt-1 text-xs leading-5 text-[#78867d]">A connected journey from discovery to business activity.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#183e32]/10 bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 text-center text-xs font-bold uppercase tracking-[0.13em] text-[#6d7d72] sm:gap-x-12 sm:px-8">
          <span>Discover</span><span className="text-[#b7c4b7]">•</span><span>Shop</span><span className="text-[#b7c4b7]">•</span><span>Book</span><span className="text-[#b7c4b7]">•</span><span>Operate</span><span className="text-[#b7c4b7]">•</span><span>Understand</span><span className="text-[#b7c4b7]">•</span><span>Grow</span>
        </div>
      </section>

      <section id="for-everyone" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#6c8c39]">01 / The individual experience</p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl">More ways to find what you need.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#647269] sm:text-lg">BhuB is the consumer-facing gateway for exploring products, services, businesses and bookings. It is designed to make the path from discovering something to acting on it feel more connected.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {consumerFeatures.map((feature) => (
              <article key={feature.number} className="group rounded-[1.5rem] border border-[#dfe7dc] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#a7bd9e] hover:shadow-xl hover:shadow-[#1c3327]/5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff5e7] text-xs font-extrabold text-[#4e755d]">{feature.number}</span>
                <h3 className="mt-7 text-lg font-bold tracking-tight">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#69776e]">{feature.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 rounded-[1.75rem] bg-[#e9f0e4] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#55734e]">A more connected journey</p><p className="mt-2 max-w-3xl text-lg font-semibold leading-7 tracking-tight text-[#233b2d] sm:text-xl">Discover a business. Explore its offer. Place an order or make a booking. Keep the relevant details together.</p></div>
            <a href="#how-it-works" className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#183e32]/20 bg-white px-5 py-3 text-sm font-bold text-[#183e32] transition hover:bg-[#183e32] hover:text-white">See the connection <Arrow /></a>
          </div>
        </div>
      </section>

      <section id="for-business" className="scroll-mt-24 bg-[#183e32] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#d7f66a]">02 / The business experience</p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl">Run the business. See how it connects.</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">BhuB Business is the operating, management, tracking, control and intelligence environment for organizations inside BhuB. It is designed to connect everyday work with the records and outcomes that matter.</p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {businessFeatures.map(([title, text]) => (
              <article key={title} className="rounded-[1.4rem] border border-white/12 bg-white/[0.055] p-5 transition hover:border-[#d7f66a]/45 hover:bg-white/[0.09] sm:p-6">
                <span className="text-xl text-[#d7f66a]">✳</span>
                <h3 className="mt-5 text-base font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/65">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[1.5rem] bg-[#d7f66a] p-6 text-[#183e32] sm:p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.17em]">For the owner</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">A clearer view of the whole business.</h3>
              <p className="mt-3 text-sm leading-7 text-[#35513a]">Review business performance, goals, branch activity, records and areas that may need attention.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.055] p-6 sm:p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-white/50">For managers</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">The right work and information.</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">Coordinate teams, follow assigned responsibilities and access the records permitted for each role.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.055] p-6 sm:p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-white/50">For frontline teams</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">Tools for daily operations.</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">Find products, check stock, record movements, process permitted activities and keep work traceable.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#6c8c39]">03 / One connected flow</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl">Business activity should not disappear into separate tools.</h2>
            <p className="mt-5 text-base leading-8 text-[#647269] sm:text-lg">The same event can affect stock, sales, payments, receipts and reports. BhuB Business is planned around keeping those relationships visible and traceable.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map(([number, title, text], index) => (
              <div key={number} className="relative rounded-[1.5rem] border border-[#dfe7dc] bg-white p-6">
                <div className="flex items-center justify-between"><span className="text-sm font-black text-[#6c8c39]">{number}</span>{index < workflowSteps.length - 1 && <span className="hidden text-lg text-[#a5b3a7] lg:inline">→</span>}</div>
                <h3 className="mt-7 text-lg font-bold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#69776e]">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-[#dfe7dc] bg-white p-5 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#6c8c39]">Example: from stock to record</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {["Goods received", "Inventory updated", "Item sold", "Payment confirmed", "Receipt generated", "Reports updated"].map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-xl bg-[#f0f5ec] px-3 py-2.5 text-xs font-bold text-[#294a36] sm:text-sm">{step}</span>
                  {index < 5 && <span aria-hidden="true" className="text-[#90a68d]">→</span>}
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#7c8980]">Illustrative workflow. A record should reflect the underlying event, and payments should only be shown as successful when confirmation is available.</p>
          </div>
        </div>
      </section>

      <section id="intelligence" className="scroll-mt-24 border-y border-[#183e32]/10 bg-[#edf2e9] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#6c8c39]">04 / Intelligence and collaboration</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl">From keeping records to learning from them.</h2>
            <p className="mt-5 text-base leading-8 text-[#647269] sm:text-lg">BhuB Business brings business information into context, so authorized people can understand activity, coordinate work and make more informed decisions.</p>
          </div>
          <div className="space-y-3">
            {[
              ["Business Journal", "A searchable timeline of activity, trends, decisions, follow-ups and performance insights connected to underlying records."],
              ["BhuB AI", "An assistant for finding records, explaining reports, summarizing activity and suggesting next steps using information the user is authorized to access."],
              ["Boardroom", "A collaboration workspace concept for meetings, video, team conversations, direct messages, file sharing and controlled presentation across branches."],
              ["Role-based access", "Keep business, branch, team and financial information available to the right people according to their assigned permissions."],
            ].map(([title, text]) => (
              <article key={title} className="flex gap-4 rounded-2xl border border-[#dbe5d8] bg-white/80 p-5 sm:p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#183e32] text-[#d7f66a]">✳</span>
                <div><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-7 text-[#69776e]">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-[#dfe7dc] bg-white p-7 sm:p-9">
              <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-[#6c8c39]">Designed for different businesses</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">Your workflows, your context.</h2>
              <p className="mt-4 text-sm leading-7 text-[#69776e]">Retail, wholesale, manufacturing, hospitality, real estate, logistics, technology, professional services and other organizations have different needs. BhuB Business is intended to adapt its workflows and priorities to the business rather than force every team into one generic dashboard.</p>
              <div className="mt-6 flex flex-wrap gap-2">{["Retail", "Wholesale", "Manufacturing", "Hospitality", "Real estate", "Logistics", "Technology", "Professional services"].map((label) => <span key={label} className="rounded-full border border-[#dfe7dc] bg-[#f7f8f4] px-3 py-2 text-xs font-semibold text-[#506159]">{label}</span>)}</div>
            </div>
            <div className="rounded-[1.75rem] bg-[#e9f0e4] p-7 sm:p-9">
              <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-[#55734e]">Connected, not careless</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#233b2d]">Useful information. Appropriate access.</h2>
              <p className="mt-4 text-sm leading-7 text-[#5e7162]">Business information should remain separated by business and protected by role-based permissions. Reports and AI insights should be traceable to records, distinguish fact from interpretation, and make uncertainty clear when data is incomplete.</p>
              <ul className="mt-6 space-y-3 text-sm font-semibold text-[#34513c]">
                <li className="flex gap-3"><span>✓</span> Permission-aware access to records</li>
                <li className="flex gap-3"><span>✓</span> Traceable transactions and business activity</li>
                <li className="flex gap-3"><span>✓</span> Clear distinction between records and AI suggestions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="get-started" className="scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#183e32] px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
          <div aria-hidden="true" className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[44px] border-white/5" />
          <div aria-hidden="true" className="absolute -bottom-32 right-48 h-64 w-64 rounded-full bg-[#d7f66a]/10 blur-2xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#d7f66a]">Start with what you need</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl">One ecosystem. Two connected experiences.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">Explore BhuB as an individual, or prepare your organization to manage its work with BhuB Business.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href="#for-everyone" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d7f66a] px-6 py-4 text-sm font-extrabold text-[#183e32] transition hover:bg-[#e4ff88]">Explore BhuB <Arrow /></a>
              <a href="#for-business" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10">Explore business tools <Arrow /></a>
            </div>
          </div>
          <p className="relative mt-8 max-w-3xl text-xs leading-6 text-white/45">BhuB Business capabilities are described as product scope and intended workflows. Availability of specific integrations, payment methods, regulatory functions and communication channels depends on implementation, supported providers, business configuration and applicable requirements.</p>
        </div>
      </section>

      <footer className="border-t border-[#183e32]/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-[#6a786f] sm:px-8 md:flex-row md:items-center md:justify-between">
          <a href="#top" className="flex items-center gap-2 font-black tracking-tight text-[#183e32]"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#183e32] text-sm text-[#d7f66a]">B</span> BhuB <span className="font-medium text-[#6a786f]">Business</span></a>
          <p>Commerce for people. Connected operations for business.</p>
          <div className="flex flex-wrap gap-5 font-semibold"><a href="#for-everyone" className="hover:text-[#183e32]">For individuals</a><a href="#for-business" className="hover:text-[#183e32]">For businesses</a><a href="#get-started" className="hover:text-[#183e32]">Get started</a></div>
        </div>
      </footer>
    </main>
  );
}
