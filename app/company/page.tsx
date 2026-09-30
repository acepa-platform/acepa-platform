import Link from "next/link";

const companies = [
  { name:"SunGrid Energy Ltd.", slug:"sungrid-energy", category:"Energy & Infrastructure", summary:"Clean-energy infrastructure and distributed solar solutions for businesses and communities.", status:"Verified", opportunities:2 },
  { name:"Nova Commerce", slug:"nova-commerce", category:"Technology & Commerce", summary:"Building practical commerce technology, customer experience systems and AI-enabled business solutions.", status:"Verified", opportunities:3 },
  { name:"Velo Mobility", slug:"velo-mobility", category:"Mobility & Automotive", summary:"Mobility products, services and growth programmes connecting transport businesses with new markets.", status:"Verified", opportunities:2 },
];

export default function CompaniesPage() {
  return <main className="min-h-screen bg-[#f7f8fc] text-slate-950">
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center"><img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA" className="h-12 w-auto object-contain brightness-0 dark:brightness-100"/></Link>
        <div className="flex items-center gap-3"><Link href="/sign-in" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">Sign in</Link><Link href="/sign-up" className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700">Get Started</Link></div>
      </div>
    </header>
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-purple-600">ACEPA Companies</p>
      <h1 className="mt-2 text-4xl font-black tracking-[-.05em] sm:text-5xl">Discover companies on ACEPA.</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">Explore public company profiles, their activities, opportunities, products and services. The ACEPA Marketplace remains one shared platform for all participating companies.</p>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {companies.map(c=><Link key={c.slug} href={`/company/${c.slug}`} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg">
          <div className="flex items-start justify-between gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white">{c.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div><span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">{c.status}</span></div>
          <h2 className="mt-5 text-xl font-black">{c.name}</h2><p className="mt-1 text-xs font-bold text-purple-600">{c.category}</p><p className="mt-3 text-sm leading-6 text-slate-500">{c.summary}</p>
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-xs font-bold text-slate-500">{c.opportunities} active/demo opportunities</span><span className="text-xs font-black text-purple-700">View company →</span></div>
        </Link>)}
      </div>
      <section className="mt-10 rounded-3xl bg-slate-950 p-7 text-white sm:p-9"><p className="text-xs font-bold uppercase tracking-[.18em] text-purple-300">For businesses</p><div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="text-2xl font-black">Build your company presence on ACEPA.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">Create a public company profile, publish opportunities and participate across ACEPA's shared platform systems.</p></div><Link href="/company/workspace" className="rounded-xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950">Company workspace demo →</Link></div></section>
    </div>
  </main>;
}
