"use client";

import Link from "next/link";

const categories = [
  {
    title: "Investment",
    text: "Explore projects, products and businesses seeking eligible investment participation.",
    href: "/discover?category=investment",
  },
  {
    title: "Innovation",
    text: "Bring ideas and solutions to real business challenges and opportunities.",
    href: "/discover?category=innovation",
  },
  {
    title: "Marketing",
    text: "Find campaigns and promotional opportunities where eligible participants can earn.",
    href: "/discover?category=marketing",
  },
  {
    title: "Business",
    text: "Explore ventures, commercial opportunities and ways to build value.",
    href: "/discover?category=business",
  },
  {
    title: "Collaboration",
    text: "Connect skills, resources and relationships with opportunities that need them.",
    href: "/discover?category=collaboration",
  },
  {
    title: "Experts",
    text: "Put your professional knowledge and experience to work.",
    href: "/discover?category=experts",
  },
  {
    title: "Careers & Jobs",
    text: "Discover paid roles and career opportunities across the ACEPA ecosystem.",
    href: "/discover?category=careers-jobs",
  },
];

const featured = [
  ["Investment", "Solar Energy Expansion", "SunGrid Energy Ltd.", "Lagos", "$5,000,000"],
  ["Innovation", "Smart Retail Innovation Challenge", "Nexa Retail Group", "Abuja", "$250,000"],
  ["Marketing", "Product Launch Campaign", "Urbanova Consumer Brands", "Port Harcourt", "$75,000"],
];

export default function PublicDiscoverPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <img
              src="/acepa-logo-white-transparent-tagline-brighter.png"
              alt="ACEPA — People, Opportunities, Progress"
              className="h-14 w-auto object-contain brightness-0"
            />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            <Link href="/" className="text-sm font-medium text-slate-700 hover:text-purple-600">Home</Link>
            <Link href="/discover" className="text-sm font-semibold text-purple-600">Discover</Link>
            <Link href="/companies" className="text-sm font-medium text-slate-700 hover:text-purple-600">For Companies</Link>
            <Link href="/how-it-works" className="text-sm font-medium text-slate-700 hover:text-purple-600">How It Works</Link>
            <Link href="/about" className="text-sm font-medium text-slate-700 hover:text-purple-600">About Us</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 hover:text-purple-600 sm:block">Sign in</Link>
            <Link href="/get-started" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700">Get started</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950 px-6 py-20 text-white lg:px-8 lg:py-28">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.22em] text-purple-300">DISCOVER ACEPA</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">
            Find opportunities where you can create value.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Explore ways to invest, contribute ideas and skills, create, collaborate, work and participate in opportunities across the ACEPA ecosystem.
          </p>
          <Link href="/get-started" className="mt-8 inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-purple-50">
            Join ACEPA →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-purple-600">EXPLORE BY PATH</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Choose how you want to participate.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            ACEPA brings different types of opportunities together so you can find the path that matches what you bring.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.title} href={category.href} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-lg font-black text-purple-700">✦</div>
              <h3 className="mt-6 text-xl font-black tracking-[-0.03em] group-hover:text-purple-600">{category.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">{category.text}</p>
              <span className="mt-6 inline-flex text-sm font-bold text-slate-800 group-hover:text-purple-600">Explore {category.title} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-purple-600">FEATURED OPPORTUNITIES</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">A glimpse of what you can discover.</h2>
            </div>
            <Link href="/get-started" className="text-sm font-bold text-purple-600">Get started →</Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {featured.map(([type, title, company, location, amount]) => (
              <article key={title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="h-2 bg-purple-600" />
                <div className="p-6">
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-purple-700">{type}</span>
                  <h3 className="mt-4 text-xl font-black tracking-[-0.03em]">{title}</h3>
                  <p className="mt-2 text-sm font-semibold text-slate-600">{company}</p>
                  <div className="mt-5 flex items-center justify-between gap-4 text-xs text-slate-500">
                    <span>{location}</span>
                    <span className="font-black text-slate-950">{amount}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-8">
        <p className="text-xs font-bold tracking-[0.2em] text-purple-600">PEOPLE • OPPORTUNITIES • PROGRESS</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Ready to explore ACEPA?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500">
          Create an account to access the full authenticated Discover experience, participate in opportunities and track your progress.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/get-started" className="rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-purple-700">Get started →</Link>
          <Link href="/sign-in" className="rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-800 hover:border-purple-300 hover:text-purple-600">Sign in</Link>
        </div>
      </section>
    </main>
  );
}
