"use client";

import Link from "next/link";

const participationPaths = [
  { title: "Invest", text: "Participate in eligible investment opportunities published across ACEPA.", icon: "↗" },
  { title: "Innovate", text: "Submit ideas, solutions, products, or expertise to opportunities that fit your company’s interests.", icon: "✦" },
  { title: "Market", text: "Participate in eligible marketing, referral, and performance-based opportunities.", icon: "◇" },
  { title: "Collaborate", text: "Join collaborations, partnerships, and business opportunities where your company can create value.", icon: "🤝" },
  { title: "Work & Hire", text: "Explore careers, engage experts, or find talent when it fits your company’s needs.", icon: "◎" },
  { title: "Choose Your Path", text: "Companies are not locked into one role. Choose the activities and opportunities you want to participate in — and skip the ones you do not.", icon: "▦" },
];

const companyPaths = [
  {
    title: "Raise Capital",
    text: "Present eligible investment opportunities and connect with people looking to deploy capital.",
    icon: "↗",
    href: "/discover/projects",
  },
  {
    title: "Build & Innovate",
    text: "Bring real business challenges, products, and ideas to a network of innovators and contributors.",
    icon: "✦",
    href: "/discover/innovation",
  },
  {
    title: "Grow Your Market",
    text: "Create eligible marketing opportunities that connect your products and services with the right audiences.",
    icon: "◇",
    href: "/discover/marketing",
  },
  {
    title: "Find Talent & Experts",
    text: "Reach professionals, experts, and potential team members who can help your business move forward.",
    icon: "◎",
    href: "/discover/careers",
  },
  {
    title: "Build Partnerships",
    text: "Discover strategic relationships, collaborations, resources, and commercial opportunities.",
    icon: "🤝",
    href: "/discover/collaboration",
  },
  {
    title: "Create Opportunities",
    text: "Turn your business needs into structured ACEPA opportunities people can discover and participate in.",
    icon: "▦",
    href: "/discover",
  },
];

const steps = [
  ["01", "Create your company presence", "Introduce your company, what you do, and the opportunities you want to develop."],
  ["02", "Publish an opportunity", "Structure an eligible investment, innovation, marketing, business, collaboration, or career opportunity."],
  ["03", "Connect with the right people", "Let ACEPA help put your opportunity in front of relevant participants across the ecosystem."],
  ["04", "Manage & report progress", "Track participation, communicate important updates, and move opportunities toward completion."],
];

export default function ForCompaniesPage() {
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
            <Link href="/companies" className="text-sm font-semibold text-purple-600">For Companies</Link>
            <Link href="/how-it-works" className="text-sm font-medium text-slate-700 transition hover:text-purple-600">How It Works</Link>
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
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=90"
          alt="Modern business team working together"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/88 to-slate-950/35" />
        <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="max-w-3xl text-white">
            <div className="inline-flex rounded-full border border-purple-300/30 bg-purple-500/15 px-4 py-2 text-xs font-bold tracking-[0.18em] text-purple-200">FOR COMPANIES</div>
            <h1 className="mt-7 text-5xl font-bold leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Turn your business into an opportunity.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              ACEPA connects companies with capital, innovators, marketers, experts, talent, partners, and customers — helping businesses create opportunities and build progress.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/get-started" className="rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-purple-950/30 transition hover:bg-purple-500">Get started as a company →</Link>
              <Link href="#opportunities" className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">Explore company opportunities</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-slate-300">
              <span>Capital</span><span>Innovation</span><span>Marketing</span><span>Talent</span><span>Partnerships</span>
            </div>
          </div>
        </div>
      </section>

      <section id="why-acepa" className="border-b border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.22em] text-purple-600">WHAT COMPANIES CAN DO</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">One ecosystem. Many ways to move your business forward.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">ACEPA is designed to help companies do more than raise money. Build relationships, solve problems, reach markets, find people, and create structured opportunities around your business.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {companyPaths.map((path) => (
              <Link key={path.title} href={path.href} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-xl font-bold text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">{path.icon}</div>
                <h3 className="mt-6 text-xl font-bold">{path.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{path.text}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-purple-600">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-purple-600">COMPANIES CAN PARTICIPATE TOO</p>
              <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Your company can participate in the ecosystem — on your own terms.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">ACEPA is not only a place for companies to publish opportunities. Companies can also participate in activities and opportunities created by other companies and participants. Choose what fits your goals, interests, resources, and strategy. Participate where you want, and leave what you do not want.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {participationPaths.map((path) => (
              <div key={path.title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-xl font-bold text-purple-600">{path.icon}</div>
                <h3 className="mt-6 text-xl font-bold">{path.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{path.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="opportunities" className="bg-purple-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-purple-600">YOUR OPPORTUNITIES</p>
              <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Bring a real opportunity to the ecosystem.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">Companies can structure eligible opportunities around real business needs — from funding and innovation to marketing, collaboration, products, projects, and careers.</p>
              <Link href="/discover" className="mt-8 inline-flex rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-700">See opportunity types →</Link>
            </div>
            <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl sm:p-10">
              <div className="grid gap-3 sm:grid-cols-2">
                {["Investment", "Innovation", "Marketing", "Business", "Collaboration", "Careers & Jobs"].map((item, index) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                    <span className="text-xs font-bold tracking-[0.15em] text-purple-300">0{index + 1}</span>
                    <p className="mt-3 font-semibold">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-purple-400/20 bg-purple-500/10 p-5">
                <p className="text-sm font-semibold text-purple-200">Built for meaningful participation</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Every opportunity should clearly communicate what the company needs, what participants can do, and the applicable value or earning arrangement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.22em] text-purple-600">HOW IT WORKS FOR COMPANIES</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">From business need to measurable progress.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">A simple path for companies to introduce opportunities, connect with participants, and manage progress.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([number, title, text]) => (
              <div key={number} className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <span className="text-sm font-bold text-purple-600">{number}</span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-purple-300">BUILT AROUND TRUST</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Make your company easier to discover, understand, and engage with.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Company profiles, verification, structured opportunities, participation, communication, and progress reporting are designed to create a clearer experience for both companies and participants.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Company presence", "Verification", "Structured opportunities", "Participant activity", "Progress reporting", "Ecosystem visibility"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sm font-semibold">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="text-xs font-bold tracking-[0.22em] text-purple-600">BUILD WITH ACEPA</p>
          <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-6xl">Your next opportunity could start here.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">Bring your business, challenge, product, project, or opportunity to a platform built around people, opportunities, and progress.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="rounded-xl bg-purple-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700">Get started as a company →</Link>
            <Link href="/discover" className="rounded-xl border border-slate-300 px-7 py-4 text-sm font-semibold text-slate-800 transition hover:border-purple-400 hover:text-purple-600">Explore ACEPA</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-purple-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link href="/" className="font-bold tracking-[0.12em] text-slate-900">ACEPA</Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <Link href="/discover" className="hover:text-purple-600">Discover</Link>
            <Link href="/companies" className="text-purple-600">For Companies</Link>
            <a href="#how-it-works" className="hover:text-purple-600">How It Works</a>
          </div>
          <p>PEOPLE • OPPORTUNITIES • PROGRESS</p>
        </div>
      </footer>
    </main>
  );
}
