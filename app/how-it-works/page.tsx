import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Discover",
    text: "Explore opportunities, companies, projects, products, innovation, marketing, careers, collaborations, and other ways to participate across ACEPA.",
  },
  {
    number: "02",
    title: "Explore",
    text: "Open an opportunity and understand what is being offered, what is needed, who is behind it, the participation terms, and the potential value or earning arrangement.",
  },
  {
    number: "03",
    title: "Decide",
    text: "Choose opportunities that fit your goals, interests, resources, skills, capital, or business strategy. Each eligible opportunity should make clear what you contribute and what you may receive in return. You are never required to participate in every opportunity.",
  },
  {
    number: "04",
    title: "Participate",
    text: "Invest, contribute an idea, provide expertise, market an opportunity, collaborate, work, support a business, or participate in another eligible activity — with the applicable return, revenue share, commission, payment, wage, or reward clearly defined where relevant.",
  },
  {
    number: "05",
    title: "Track",
    text: "Keep up with your activity, participation status, updates, progress, earnings, investments, payments, communications, and other relevant information so you can see what your participation is producing.",
  },
  {
    number: "06",
    title: "Complete",
    text: "Move opportunities through their defined stages, receive applicable outcomes or earnings, and maintain a clear record of what happened.",
  },
  {
    number: "07",
    title: "Progress",
    text: "Use what you have learned and earned to discover new opportunities, grow your business or career, build stronger relationships, reinvest where appropriate, and create further progress.",
  },
];

const paths = [
  ["Invest", "Deploy capital into eligible investment opportunities where the terms define the potential return, distribution, or other investment outcome, and track your participation and investment progress."],
  ["Create", "Bring ideas, products, solutions, or innovation to opportunities where your contribution can create value and, where applicable, earn revenue, fees, royalties, rewards, or another agreed benefit."],
  ["Market", "Promote eligible businesses and opportunities through marketing, referral, or performance-based activities where the applicable commission, fee, revenue share, or reward is defined."],
  ["Collaborate", "Bring skills, resources, relationships, or strategic partnerships to opportunities where your contribution can generate an agreed payment, revenue share, commercial benefit, or other eligible reward."],
  ["Work", "Find paid careers, jobs, expert engagements, and other professional opportunities where your work is connected to a defined payment or earning arrangement."],
  ["Build", "Companies can publish opportunities and also participate in opportunities created by other companies and participants — earning or gaining the applicable business, commercial, investment, or strategic value defined by each opportunity."],
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA — People, Opportunities, Progress" className="h-16 w-auto object-contain brightness-0" />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="text-sm font-medium text-slate-700 transition hover:text-purple-600">Home</Link>
            <Link href="/discover" className="text-sm font-medium text-slate-700 transition hover:text-purple-600">Discover</Link>
            <Link href="/companies" className="text-sm font-medium text-slate-700 transition hover:text-purple-600">For Companies</Link>
            <Link href="/how-it-works" className="text-sm font-semibold text-purple-600">How It Works</Link>
            <Link href="/about" className="text-sm font-medium text-slate-700 transition hover:text-purple-600">About Us</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/discover" className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:text-purple-600 sm:block">Explore</Link>
            <Link href="/get-started" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-700">Get started</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=90"
          alt="People collaborating in a modern workplace"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/35" />
        <div className="relative mx-auto flex min-h-[610px] max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="max-w-4xl text-white">
            <div className="inline-flex rounded-full border border-purple-300/30 bg-purple-500/15 px-4 py-2 text-xs font-bold tracking-[0.18em] text-purple-200">HOW ACEPA WORKS</div>
            <h1 className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-7xl">From possibility to progress.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              ACEPA connects people and companies to opportunities where what they bring can create value — and where eligible participants can earn revenue, returns, commissions, fees, wages, or other defined rewards for their contribution, investment, work, or participation.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/discover" className="rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-purple-950/30 transition hover:bg-purple-500">Explore opportunities →</Link>
              <Link href="/companies" className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">For companies</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.22em] text-purple-600">THE ACEPA LOOP</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Discover. Explore. Decide. Participate. Track. Complete. Progress.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">The platform is built around a simple journey, but the outcome is practical: you bring something of value, participate in the right opportunity, and receive the applicable financial or non-financial benefit defined by that opportunity.</p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.slice(0, 4).map((step) => (
              <div key={step.number} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <span className="text-sm font-bold text-purple-600">{step.number}</span>
                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {steps.slice(4).map((step) => (
              <div key={step.number} className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                <span className="text-sm font-bold text-purple-600">{step.number}</span>
                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-purple-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-purple-600">WAYS TO PARTICIPATE</p>
              <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">There is no single way to use ACEPA.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">Your path depends on what you want to achieve and what you can bring. ACEPA is built around exchange: you bring capital, ideas, skills, influence, work, relationships, or business value, and eligible opportunities can provide a defined way for you to earn or benefit from that contribution.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {paths.map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-purple-600">FOR COMPANIES</p>
              <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Companies are participants too.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                A company can publish opportunities, participate in activities created by others, or do both. Companies choose what fits their business goals, interests, resources, and strategy — and can skip opportunities they do not want. When a company participates, the applicable commercial, investment, service, or other benefit should be clear before it commits.
              </p>
              <Link href="/companies" className="mt-8 inline-flex rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-700">Explore the company experience →</Link>
            </div>
            <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl sm:p-10">
              <p className="text-sm font-bold tracking-[0.18em] text-purple-300">ONE ECOSYSTEM</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Capital", "Ideas", "Expertise", "Marketing", "Talent", "Partnerships"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sm font-semibold">{item}</div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-6 text-slate-300">Different participants bring different forms of value. ACEPA connects those forms of value around structured opportunities so value can move in both directions: participants contribute, and eligible participants receive the defined benefit for what they provide.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="text-xs font-bold tracking-[0.22em] text-purple-300">CLEAR PARTICIPATION</p>
          <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-6xl">Understand the opportunity before you participate.</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            ACEPA is designed so opportunities can communicate what is needed, who is involved, what participants can do, what they can earn or receive, the applicable terms, and the expected progress or outcome. The goal is not participation for free: eligible participants should understand the value exchange before they commit. For regulated activities such as investments, additional eligibility, verification, legal, and compliance requirements may apply.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/discover" className="rounded-xl bg-purple-600 px-7 py-4 text-sm font-semibold text-white transition hover:bg-purple-500">Start exploring →</Link>
            <Link href="/companies" className="rounded-xl border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10">Build with ACEPA</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-purple-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link href="/" className="font-bold tracking-[0.12em] text-slate-900">ACEPA</Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <Link href="/discover" className="hover:text-purple-600">Discover</Link>
            <Link href="/companies" className="hover:text-purple-600">For Companies</Link>
            <Link href="/how-it-works" className="text-purple-600">How It Works</Link>
            <Link href="/about" className="hover:text-purple-600">About Us</Link>
          </div>
          <p>PEOPLE • OPPORTUNITIES • PROGRESS</p>
        </div>
      </footer>
    </main>
  );
}
