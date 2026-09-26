"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=90",
  "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1800&q=90",
];

const roles = [
  { title: "Investors", text: "Discover and support high-potential businesses and projects while earning returns from your investments.", icon: "▥" },
  { title: "Innovators", text: "Turn ideas and solutions into real-world opportunities with the right resources, support, and potential to earn.", icon: "✦" },
  { title: "Companies", text: "Find capital, talent, ideas, partnerships, and growth opportunities.", icon: "▦" },
  { title: "Experts", text: "Share your knowledge, skills, and experience with businesses that need them.", icon: "◎" },
  { title: "Careers", text: "Explore career opportunities within ACEPA and ecosystem companies.", icon: "▣" },
  { title: "Marketers", text: "Connect businesses and opportunities with the right audiences.", icon: "◇" },
];

const opportunities = [
  { type: "INVESTMENT", title: "Solar Energy Expansion", company: "SunGrid Energy Ltd.", location: "Lagos, Nigeria", amount: "$5,000,000", detail: "Eligible investment opportunity with potential investment returns.", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=85" },
  { type: "INNOVATION", title: "Smart Retail Innovation Challenge", company: "Nexa Retail Group", location: "Abuja, Nigeria", amount: "$250,000", detail: "Submit solutions for a real business challenge and earn from eligible innovation arrangements.", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=85" },
  { type: "MARKETING", title: "Product Launch Campaign", company: "Urbanova Consumer Brands", location: "Port Harcourt, Nigeria", amount: "$75,000", detail: "Promote a company product through an eligible performance-based campaign.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85" },
];

const impactMetrics = [
  { value: "$120M+", label: "Payments & earnings facilitated", icon: "↗" },
  { value: "850+", label: "Successful collaborations", icon: "◎" },
  { value: "320+", label: "Innovation success stories", icon: "✦" },
  { value: "42", label: "Countries reached", icon: "◌" },
  { value: "2.2K+", label: "Companies connected", icon: "▦" },
  { value: "5K+", label: "Opportunities created", icon: "◇" },
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setHeroIndex((current) => (current + 1) % heroImages.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setIsDiscoverOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-white/95"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#" className="-ml-2 flex flex-col leading-none">
            <img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA — People, Opportunities, Progress" className="h-20 w-auto object-contain brightness-0" />
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            <a href="#home" className="text-sm font-medium text-purple-600">Home</a>
            <div className="group relative" onMouseEnter={() => setIsDiscoverOpen(true)} onMouseLeave={() => setIsDiscoverOpen(false)}>
              <a href="/discover" className="flex items-center gap-1 text-sm font-medium text-slate-900 transition hover:text-purple-600">
                Discover
                <svg className={`h-4 w-4 transition-transform duration-200 ${isDiscoverOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" /></svg>
              </a>
              {isDiscoverOpen && (
                <div className="absolute left-1/2 top-full z-[100] w-[520px] -translate-x-1/2 pt-3">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-purple-600">Discover ACEPA</p>
                        <p className="mt-1 text-sm font-semibold text-slate-950">Explore opportunities and ways to earn across the ecosystem.</p>
                      </div>
                      <a href="/discover" className="text-xs font-semibold text-purple-600 hover:text-purple-700">View all →</a>
                    </div>
                    <div className="grid grid-cols-2 gap-1 p-2">
                      {[
                        ["Projects", "/discover/projects", "Invest in real projects and participate in opportunities designed to generate returns."],
                        ["Products", "/discover/products", "Back products seeking funding or participation and earn where the opportunity provides returns."],
                        ["Innovation", "/discover/innovation", "Bring ideas and solutions to real challenges and discover opportunities to earn from your contribution."],
                        ["Marketing", "/discover/marketing", "Promote companies and opportunities and earn through eligible marketing and referral opportunities."],
                        ["Business", "/discover/business", "Participate in businesses, ventures and commercial opportunities that can create revenue and income."],
                        ["Collaboration", "/discover/collaboration", "Bring skills, resources or partnerships to opportunities where participants can create and earn value."],
                        ["Experts", "/discover/experts", "Put your expertise to work for businesses and earn from eligible professional opportunities."],
                        ["Careers & Jobs", "/discover/careers", "Find paid jobs and career opportunities with companies across the ACEPA ecosystem."],
                      ].map(([title, href, description]) => (
                        <a key={href} href={href} className="rounded-xl px-4 py-3 transition hover:bg-purple-50">
                          <div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-slate-950 hover:text-purple-600">{title}</span><span className="text-xs text-slate-400">→</span></div>
                          <p className="mt-1 text-[11px] leading-5 text-slate-500">{description}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <a href="/companies" className="text-sm font-medium text-slate-900 transition hover:text-purple-600">For Companies</a>
            <a href="/how-it-works" className="text-sm font-medium text-slate-900 transition hover:text-purple-600">How It Works</a>
            <a href="/about" className="text-sm font-medium text-slate-900 transition hover:text-purple-600">About Us</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/search" aria-label="Search" className="hidden cursor-pointer rounded-xl p-2.5 text-slate-900 transition hover:bg-slate-100 hover:text-purple-600 sm:flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
            </Link>
            <Link href="/sign-in" className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:text-purple-500 sm:block">Sign in</Link>
            <a href="#get-started" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-200">Get started</a>
          </div>
        </div>
      </header>

      <section id="home" className="relative min-h-[680px] overflow-hidden bg-white">
        <img src={heroImages[heroIndex]} alt="Modern city skyline and waterfront" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white 0%, from-white 7%, via-white/88 18%, via-white/60 28%, via-white/32 38%, via-white/12 50%, via-white/3 62%, to-transparent 72%" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 pt-32 pb-16 lg:px-10 lg:pt-24 lg:pb-20">
          <div className="max-w-2xl">
            <div className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-purple-700">INVESTMENT &amp; BUSINESS DEVELOPMENT PLATFORM</div>
            <h1 className="mt-6 text-4xl font-bold leading-[0.96] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-6xl">Connecting People.<br />Creating Opportunities.<br /><span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 bg-clip-text text-transparent">Building Progress.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">ACEPA connects investors, innovators, companies, experts, and marketers to turn ideas into businesses, opportunities, and sustainable growth.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#opportunities" className="rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700">Explore opportunities →</a>
              <a href="#" className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-purple-300 hover:text-purple-600">Join ACEPA</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-slate-500"><span>Invest</span><span>Innovate</span><span>Collaborate</span><span>Develop</span><span>Grow</span></div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold tracking-[0.22em] text-purple-600">ONE ECOSYSTEM</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">One Platform. <span className="bg-gradient-to-r from-violet-500 via-purple-600 to-indigo-700 bg-clip-text text-transparent">Multiple Paths to Progress.</span></h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">Whether you bring capital, ideas, expertise, business, influence, or strategic relationships, ACEPA gives you a place to participate, create value, and earn from eligible opportunities.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Investors", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85", icon: "📊", text: "Put capital into eligible businesses, projects, and products with opportunities to earn investment returns." },
              { title: "Innovators", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85", icon: "💡", text: "Bring ideas and solutions to real opportunities, create value, and earn from eligible innovation arrangements." },
              { title: "Companies", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85", icon: "🏢", text: "Access capital, talent, ideas, partnerships, customers, and growth opportunities for your business." },
              { title: "Marketers", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85", icon: "📣", text: "Promote companies and opportunities and earn through eligible marketing, referral, and performance-based arrangements." },
              { title: "Experts", image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1200&q=85", icon: "🎓", text: "Put your professional knowledge and skills to work for businesses and earn from eligible expert engagements." },
              { title: "Partners", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85", icon: "🤝", text: "Build strategic relationships, collaborate on opportunities, and create shared value and long-term growth." },
            ].map((role) => (
              <article key={role.title} className="group relative min-h-[370px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <img src={role.image} alt={role.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/10" />
                <div className="relative flex h-full flex-col justify-end p-8 text-white">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-2xl backdrop-blur-md">{role.icon}</div>
                  <h3 className="mt-6 text-2xl font-bold">{role.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-200">{role.text}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-purple-200 transition group-hover:text-white">Explore your path <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="opportunities" className="pt-6 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="text-xs font-bold tracking-[0.2em] text-purple-600">FEATURED OPPORTUNITIES</p><h2 className="mt-3 text-4xl font-bold tracking-tight">Discover what is possible.</h2></div>
            <a href="#" className="text-sm font-semibold text-purple-600">View all opportunities →</a>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {opportunities.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-52 overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold tracking-wide text-purple-700">{item.type}</span>
                  <p className="absolute bottom-4 left-5 right-5 text-lg font-bold text-white">{item.title}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div><p className="text-sm font-semibold text-slate-900">{item.company}</p><p className="mt-1 text-sm text-slate-500">{item.location}</p></div>
                    <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">ACEPA</span>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-slate-600">{item.detail}</p>
                  <div className="mt-5 flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
                    <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Opportunity value</p><p className="mt-1 text-xl font-bold text-slate-950">{item.amount}</p></div>
                    <a href="#" className="rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700">Discover →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="careers" className="bg-purple-50 pt-6 pb-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div><p className="text-xs font-bold tracking-[0.2em] text-purple-600">ACEPA CAREERS</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Build your future with ACEPA.</h2><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Join a growing ecosystem where talented people can contribute, learn, collaborate, and build meaningful careers.</p><a href="#" className="mt-8 inline-block rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-600">View open positions →</a></div>
          <div className="rounded-[28px] bg-slate-950 p-10 text-white"><p className="text-sm font-semibold text-purple-300">GROW · LEARN · IMPACT</p><h3 className="mt-5 text-3xl font-bold">Work across capital, innovation, technology and business.</h3><div className="mt-8 grid grid-cols-2 gap-3">{["Technology", "Finance", "Operations", "Growth"].map((item) => <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</div>)}</div></div>
        </div>
      </section>

      <section id="about" className="pt-6 pb-16">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] text-purple-600">PEOPLE · OPPORTUNITIES · PROGRESS</p>
          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">Be part of the ecosystem.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">Whether you have capital, an idea, expertise, a company, or a marketing opportunity, ACEPA is built to help connect the pieces.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4"><a href="#" className="rounded-xl bg-purple-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-200 hover:bg-purple-700">Get started →</a><a href="#" className="rounded-xl border border-slate-300 px-7 py-4 text-sm font-semibold text-slate-800 hover:border-purple-400 hover:text-purple-600">Explore ACEPA</a></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-12 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-slate-950 to-slate-950" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-bold tracking-[0.22em] text-purple-300">GLOBAL IMPACT, REAL RESULTS</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Building a borderless ecosystem that creates measurable progress.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Together, we are building a borderless ecosystem that empowers people, moves capital, advances innovation, and creates lasting change worldwide.</p>
            </div>
            <a href="#" className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-purple-300 hover:bg-purple-600">See our results →</a>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {impactMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:-translate-y-1 hover:bg-white/[0.07]">
                <div className="flex items-center justify-between"><span className="text-lg text-purple-300">{metric.icon}</span><span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Demo</span></div>
                <p className="mt-4 text-2xl font-bold tracking-tight">{metric.value}</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">{metric.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-4 text-slate-500">Demonstration figures for the website prototype. These will be replaced with verified ACEPA platform results when live data is available.</p>
        </div>
      </section>

      <footer className="border-t border-purple-100 bg-purple-50 text-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
          <div className="grid gap-9 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1.15fr]">
            <div className="max-w-md">
              <a href="#" className="inline-flex items-center">
                <img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA — People, Opportunities, Progress" className="h-20 w-auto object-contain brightness-0" />
              </a>
              <p className="mt-5 text-base leading-7 text-slate-600">A global investment and business development platform connecting people, capital, ideas, businesses, and opportunities to create meaningful progress.</p>
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Follow ACEPA</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { name: "X", icon: "𝕏" },
                    { name: "LinkedIn", icon: "in" },
                    { name: "Instagram", icon: "◎" },
                    { name: "YouTube", icon: "▶" },
                    { name: "TikTok", icon: "♪" },
                  ].map((item) => (
                    <a key={item.name} href="#" aria-label={item.name} className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-purple-100 bg-white px-3 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-purple-300 hover:bg-purple-600 hover:text-white">
                      {item.icon}
                    </a>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-slate-400">Official ACEPA social accounts</p>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-500">Connecting people to opportunity. Connecting capital to potential. Connecting ideas to progress.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.14em]">Explore</h3>
              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-600">
                <a href="#opportunities" className="transition hover:text-purple-600">Opportunities</a>
                <a href="/discover" className="transition hover:text-purple-600">Discover</a>
                <a href="#careers" className="transition hover:text-purple-600">Careers</a>
                <a href="#about" className="transition hover:text-purple-600">About ACEPA</a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.14em]">For business</h3>
              <div className="mt-5 flex flex-col gap-3 text-sm text-slate-600">
                <a href="/companies" className="transition hover:text-purple-600">For Companies</a>
                <a href="#" className="transition hover:text-purple-600">Investment</a>
                <a href="#" className="transition hover:text-purple-600">Innovation</a>
                <a href="#" className="transition hover:text-purple-600">Partnerships</a>
              </div>
            </div>
            <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-600">Stay connected</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">Stay informed about ACEPA.</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Get updates about new opportunities, platform news, insights, and important developments across the ACEPA ecosystem.</p>
              {isSubscribed ? (
                <div className="mt-5 rounded-2xl bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-700">Thanks — you’re on the ACEPA updates list.</div>
              ) : (
                <form
                  className="mt-5 space-y-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (email.trim()) setIsSubscribed(true);
                  }}
                >
                  <label htmlFor="acepa-email" className="sr-only">Email address</label>
                  <input
                    id="acepa-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                  />
                  <button type="submit" className="inline-flex w-full items-center justify-center rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700">Get ACEPA updates →</button>
                  <p className="text-[11px] leading-4 text-slate-400">By subscribing, you agree to receive ACEPA updates. You can unsubscribe at any time.</p>
                </form>
              )}
            </div>
          </div>
          <div id="subscribe" className="mt-6 border-t border-purple-200 pt-5">
            <div className="flex flex-col gap-5 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between">
              <p>© 2026 ACEPA Investment &amp; Business Development Platform. All rights reserved.</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <a href="#" className="transition hover:text-purple-600">Privacy</a>
                <a href="#" className="transition hover:text-purple-600">Terms</a>
                <a href="#" className="transition hover:text-purple-600">Help Center</a>
                <a href="#" className="transition hover:text-purple-600">Contact</a>
              </div>
            </div>
            <p className="mt-3 text-xs font-semibold tracking-[0.12em] text-purple-600">PEOPLE • OPPORTUNITIES • PROGRESS</p>
          </div>
        </div>
      </footer>   </main>
  );
}