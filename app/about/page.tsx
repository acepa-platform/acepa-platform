import Link from "next/link";

const pillars = [
  ["People", "Give people access to opportunities where they can invest, create, work, contribute, collaborate, and earn from eligible participation."],
  ["Opportunities", "Bring capital, businesses, ideas, products, expertise, jobs, partnerships, and other opportunities into one structured ecosystem."],
  ["Progress", "Help participants and companies move from discovery to measurable action, outcomes, earnings, growth, and new opportunities."],
];

const principles = [
  ["Value exchange", "ACEPA is built around contribution and defined benefit. What a participant brings and what they may receive should be clear before participation."],
  ["Choice", "People and companies decide which opportunities fit their goals, resources, interests, and strategy. Participation is not one-size-fits-all."],
  ["Clarity", "Opportunities should communicate the important details participants need to understand what they are joining, contributing, and receiving."],
  ["Progress", "Participation should lead somewhere: a completed project, investment outcome, paid work, commercial result, new relationship, or another defined outcome."],
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center"><img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA — People, Opportunities, Progress" className="h-16 w-auto object-contain brightness-0" /></Link>
          <nav className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="text-sm font-medium text-slate-700 hover:text-purple-600">Home</Link>
            <Link href="/discover" className="text-sm font-medium text-slate-700 hover:text-purple-600">Discover</Link>
            <Link href="/companies" className="text-sm font-medium text-slate-700 hover:text-purple-600">For Companies</Link>
            <Link href="/how-it-works" className="text-sm font-medium text-slate-700 hover:text-purple-600">How It Works</Link>
            <Link href="/about" className="text-sm font-semibold text-purple-600">About Us</Link>
          </nav>
          <div className="flex items-center gap-3"><Link href="/discover" className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 hover:text-purple-600 sm:block">Explore</Link><Link href="/get-started" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700">Get started</Link></div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950">
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=90" alt="People working together" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/88 to-slate-950/35" />
        <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="max-w-4xl text-white">
            <div className="inline-flex rounded-full border border-purple-300/30 bg-purple-500/15 px-4 py-2 text-xs font-bold tracking-[0.18em] text-purple-200">ABOUT ACEPA</div>
            <h1 className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-7xl">People. Opportunities. Progress.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">ACEPA is building a connected investment and business-development ecosystem where people and companies can discover opportunities, bring value, participate on their own terms, and earn or benefit through clearly defined opportunities.</p>
            <div className="mt-9 flex flex-wrap gap-4"><Link href="/discover" className="rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-purple-500">Explore ACEPA →</Link><Link href="/how-it-works" className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20">How it works</Link></div>
          </div>
        </div>
      </section>

      <section className="py-20"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><div><p className="text-xs font-bold tracking-[0.22em] text-purple-600">WHY ACEPA EXISTS</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Turning disconnected possibilities into structured opportunities.</h2></div><div className="space-y-5 text-lg leading-8 text-slate-600"><p>Capital, ideas, expertise, businesses, talent, partnerships, and customers can all create value — but they are often separated across different networks, platforms, and processes.</p><p>ACEPA is designed to bring these possibilities closer together. It gives people and companies a place to discover what is available, understand the opportunity, decide whether it fits, participate, track progress, and move toward a defined outcome.</p><p>The result is an ecosystem focused not simply on activity, but on <span className="font-semibold text-slate-950">value, participation, and progress.</span></p></div></div></div></section>

      <section className="bg-purple-50 py-20"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="max-w-3xl"><p className="text-xs font-bold tracking-[0.22em] text-purple-600">OUR FOUNDATION</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Three ideas at the center of ACEPA.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-3">{pillars.map(([title, text]) => <div key={title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-white">{title[0]}</div><h3 className="mt-7 text-2xl font-bold">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-600">{text}</p></div>)}</div></div></section>

      <section className="py-20"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-2 lg:items-center"><div className="overflow-hidden rounded-[32px]"><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=90" alt="Business team collaborating around a table" className="h-[500px] w-full object-cover" /></div><div><p className="text-xs font-bold tracking-[0.22em] text-purple-600">HOW WE THINK</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Participation should create value on both sides.</h2><p className="mt-5 text-lg leading-8 text-slate-600">ACEPA is not built around participation for participation's sake. A person may bring capital, an idea, expertise, influence, work, a product, or a relationship. A company may bring a business, project, market, job, service, or commercial opportunity. The opportunity defines the exchange.</p><div className="mt-8 space-y-3">{principles.map(([title, text]) => <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>)}</div></div></div></div></section>

      <section className="bg-slate-950 py-20 text-white"><div className="mx-auto max-w-5xl px-6 text-center lg:px-8"><p className="text-xs font-bold tracking-[0.22em] text-purple-300">OUR VISION</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-6xl">A world where valuable opportunities are easier to find, understand, and act on.</h2><p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">We are building toward a borderless ecosystem where people and companies can connect around meaningful opportunities, exchange value transparently, create economic activity, and keep progressing.</p><Link href="/discover" className="mt-9 inline-flex rounded-xl bg-purple-600 px-7 py-4 text-sm font-semibold text-white hover:bg-purple-500">Discover what is possible →</Link></div></section>

      <footer className="border-t border-slate-200 bg-purple-50"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><Link href="/" className="font-bold tracking-[0.12em] text-slate-900">ACEPA</Link><div className="flex flex-wrap gap-x-6 gap-y-2"><Link href="/">Home</Link><Link href="/discover">Discover</Link><Link href="/companies">For Companies</Link><Link href="/how-it-works">How It Works</Link><Link href="/about" className="text-purple-600">About Us</Link></div><p>PEOPLE • OPPORTUNITIES • PROGRESS</p></div></footer>
    </main>
  );
}