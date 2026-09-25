"use client";

import { useEffect, useState } from "react";

const heroImages = [
  "/acepa-hero.jpg",
  "/acepa-hero-1.jpg",
  "/acepa-hero-2.jpg",
  "/acepa-hero-3.jpg",
  "/acepa-hero-4.jpg",
  "/acepa-hero-5.jpg",
];

const roles = [
  {
    title: "Investors",
    text: "Discover and support high-potential businesses and projects while earning returns from your investments.",
    icon: "▥",
  },
  {
    title: "Innovators",
    text: "Turn ideas and solutions into real-world opportunities with the right resources, support, and potential to earn.",
    icon: "✦",
  },
  {
    title: "Companies",
    text: "Find capital, talent, ideas, partnerships, and growth opportunities.",
    icon: "▦",
  },
  {
    title: "Experts",
    text: "Share your knowledge, skills, and experience with businesses that need them.",
    icon: "◎",
  },
  {
    title: "Careers",
    text: "Explore career opportunities within ACEPA and ecosystem companies.",
    icon: "▣",
  },
  {
    title: "Marketers",
    text: "Connect businesses and opportunities with the right audiences.",
    icon: "◇",
  },
];

const opportunities = [
  {
    type: "INVESTMENT",
    title: "Solar Energy Expansion",
    location: "Lagos, Nigeria",
    amount: "$5,000,000",
  },
  {
    type: "PARTNERSHIP",
    title: "Agro Processing & Distribution",
    location: "Kano, Nigeria",
    amount: "$2,000,000",
  },
  {
    type: "FUNDING",
    title: "Affordable Housing Development",
    location: "Abuja, Nigeria",
    amount: "$3,500,000",
  },
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
const [isScrolled, setIsScrolled] = useState(false);
const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 40);
    setIsDiscoverOpen(false);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* NAVIGATION */}
      <header
  className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
    isScrolled
      ? "bg-white/95 shadow-lg backdrop-blur-md"
      : "bg-white/95"
  }`}
>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#" className="-ml-2 flex flex-col leading-none">
           
           <img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA — People, Opportunities, Progress" className="h-20 w-auto object-contain brightness-0" />
          </a>

         <nav className="hidden items-center gap-8 lg:flex">
  {/* Home */}
  <a
    href="#home"
    className="text-sm font-medium text-purple-600"
  >
    Home
  </a>

{/* Discover Mega Menu */}
<div
  className="group relative"
  onMouseEnter={() => setIsDiscoverOpen(true)}
  onMouseLeave={() => setIsDiscoverOpen(false)}
>
  <button
    type="button"
    className="flex cursor-pointer items-center gap-1 text-sm font-medium text-slate-900 transition hover:text-purple-600"
  >
    Discover

    <svg
      className={`h-4 w-4 transition-transform duration-200 ${
        isDiscoverOpen ? "rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 9 6 6 6-6"
      />
    </svg>
  </button>

  {isDiscoverOpen && (
    <div className="absolute left-1/2 top-full z-[100] w-[860px] -translate-x-1/2 pt-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

        <div className="border-b border-purple-100 bg-gradient-to-r from-purple-50 via-white to-slate-50 px-7 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-600">
            Discover ACEPA
          </p>

          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            Explore opportunities. Create value. Earn.
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Discover ways to invest, solve problems, provide services,
            collaborate, build your career, and earn through opportunities
            on ACEPA.
          </p>
        </div>

        <div className="p-6">

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-purple-600 shadow-sm">
                ◈
              </span>

              <div>
                <h4 className="text-sm font-semibold text-slate-950">
                  Investment
                </h4>

                <p className="mt-0.5 text-xs text-slate-500">
                  Participate with capital and pursue potential returns.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="/discover/projects"
                className="group/item rounded-xl border border-slate-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-purple-100 hover:bg-purple-50"
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-semibold text-slate-950 group-hover/item:text-purple-600">
                    Projects
                  </h5>

                  <span className="text-slate-400 group-hover/item:translate-x-1 group-hover/item:text-purple-600">
                    →
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Discover projects seeking investment and opportunities to
                  participate and potentially earn returns.
                </p>
              </a>

              <a
                href="/discover/products"
                className="group/item rounded-xl border border-slate-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-purple-100 hover:bg-purple-50"
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-semibold text-slate-950 group-hover/item:text-purple-600">
                    Products
                  </h5>

                  <span className="text-slate-400 group-hover/item:translate-x-1 group-hover/item:text-purple-600">
                    →
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Discover products seeking funding and participation with
                  potential earning opportunities.
                </p>
              </a>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">

            <a
              href="/discover/innovation"
              className="rounded-xl p-4 transition-all hover:bg-purple-50"
            >
              <h4 className="text-sm font-semibold text-slate-950">
                Innovation
              </h4>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Solve real company challenges and earn rewards when your ideas
                or solutions are selected.
              </p>

              <span className="mt-3 block text-xs font-semibold text-purple-600">
                Explore →
              </span>
            </a>

            <a
              href="/discover/marketing"
              className="rounded-xl p-4 transition-all hover:bg-purple-50"
            >
              <h4 className="text-sm font-semibold text-slate-950">
                Marketing
              </h4>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Help companies reach the right audiences and earn from
                marketing opportunities.
              </p>

              <span className="mt-3 block text-xs font-semibold text-purple-600">
                Explore →
              </span>
            </a>

            <a
              href="/discover/collaboration"
              className="rounded-xl p-4 transition-all hover:bg-purple-50"
            >
              <h4 className="text-sm font-semibold text-slate-950">
                Collaboration
              </h4>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Find companies and people to work with, create value, and
                discover earning opportunities.
              </p>

              <span className="mt-3 block text-xs font-semibold text-purple-600">
                Explore →
              </span>
            </a>

            <a
              href="/discover/experts"
              className="rounded-xl p-4 transition-all hover:bg-purple-50"
            >
              <h4 className="text-sm font-semibold text-slate-950">
                Experts
              </h4>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Offer your professional expertise to businesses and earn from
                opportunities that need your skills.
              </p>

              <span className="mt-3 block text-xs font-semibold text-purple-600">
                Explore →
              </span>
            </a>

            <a
              href="/discover/careers"
              className="rounded-xl p-4 transition-all hover:bg-purple-50"
            >
              <h4 className="text-sm font-semibold text-slate-950">
                Careers &amp; Jobs
              </h4>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Discover employment and career opportunities from companies
                looking for talented people.
              </p>

              <span className="mt-3 block text-xs font-semibold text-purple-600">
                Explore →
              </span>
            </a>

          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
            <p className="text-xs text-slate-400">
              Discover opportunities available across the ACEPA ecosystem.
            </p>

            <a
              href="/discover"
              className="text-sm font-semibold text-purple-600 transition hover:text-purple-700"
            >
              Explore all →
            </a>
          </div>

        </div>
      </div>
    </div>
  )}
</div>

  {/* For Companies */}
  <a
    href="#companies"
    className="text-sm font-medium text-slate-900 transition hover:text-purple-600"
  >
    For Companies
  </a>

  {/* How It Works */}
  <a
    href="#how-it-works"
    className="text-sm font-medium text-slate-900 transition hover:text-purple-600"
  >
    How It Works
  </a>

  {/* About Us */}
  <a
    href="#about"
    className="text-sm font-medium text-slate-900 transition hover:text-purple-600"
  >
    About Us
  </a>
</nav>

{/* Right Side Actions */}
<div className="flex items-center gap-3">

  {/* Search */}
  <button
    type="button"
    aria-label="Search"
    className="hidden cursor-pointer rounded-xl p-2.5 text-slate-900 transition hover:bg-slate-100 hover:text-purple-600 sm:flex"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      />
    </svg>
  </button>

  {/* Sign In */}
  <a
    href="#signin"
    className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:text-purple-500 sm:block"
  >
    Sign in
  </a>

    {/* Get Started */}
  <a
    href="#get-started"
    className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-200"
  >
    Get started
  </a>

</div>

        </div>
      </header>

      {/* HERO */}
    
```tsx
```tsx
<section
  id="home"
  className="relative min-h-[680px] overflow-hidden bg-slate-950"
>
  <img
    src={heroImages[heroIndex]}
    alt="Modern city skyline and waterfront"
    className="absolute inset-0 h-full w-full object-cover object-center"
  />

  {/* Darker left side, clearer right side */}
  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-slate-950/5" />

  {/* Bottom cinematic fade */}
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

  {/* Slight softness on the text side */}
  <div className="absolute inset-y-0 left-0 w-[52%] backdrop-blur-[2px]" />

  <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 pt-36 pb-20 lg:px-8">
    <div className="max-w-3xl text-white">

      <div className="mb-2 inline-flex rounded-full border border-purple-300/40 bg-gradient-to-r from-purple-600/50 via-violet-500/40 to-blue-500/30 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-purple-100 backdrop-blur-md">
        INVESTMENT &amp; BUSINESS DEVELOPMENT PLATFORM
      </div>

      <h1 className="max-w-3xl text-4xl font-bold leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-6xl">
        Connecting People.
        <br />
        Creating Opportunities.
        <br />
        <span className="bg-gradient-to-r from-purple-300 via-violet-400 to-purple-700 bg-clip-text text-transparent">
          Building Progress.
        </span>
      </h1>

      <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-200 sm:text-sm">
        ACEPA connects investors, innovators, companies, experts, and marketers
        <br />
        to turn ideas into businesses, opportunities, and sustainable growth.
      </p>

      <div className="mt-7 flex flex-wrap gap-4">
        <a
          href="#opportunities"
          className="rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:bg-purple-500"
        >
          Explore opportunities →
        </a>

        <a
          href="#"
          className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
        >
          Join ACEPA
        </a>
      </div>

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75">
        <span>Invest</span>
        <span>Innovate</span>
        <span>Collaborate</span>
        <span>Develop</span>
        <span>Grow</span>
      </div>

    </div>
  </div>
</section>
      {/* ECOSYSTEM */}
<section className="border-y border-slate-200 bg-white py-11">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">

    {/* Section heading */}
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-xs font-bold tracking-[0.22em] text-purple-600">
        THE ACEPA ECOSYSTEM
      </p>

      <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-slate-950 sm:text-5xl">
        One Platform.{" "}
        <span className="bg-gradient-to-r from-violet-500 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
          Multiple Paths to Progress.
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        ACEPA brings together the people, businesses, capital, ideas,
        expertise, and opportunities needed to turn potential into progress.
      </p>
    </div>

    {/* Ecosystem cards */}
    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      {/* Investors */}
      <div className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85"
          alt="Investors"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent" />

        <div className="relative flex h-full flex-col justify-between p-8">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-purple-700 shadow-sm">
              📊
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-950">
              Investors
            </h3>

            <p className="mt-3 max-w-[260px] text-base leading-6 text-slate-750">
              Discover and support high-potential businesses and projects while earning returns from your investments.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-700 transition group-hover:bg-purple-600 group-hover:text-white">
            →
          </div>
        </div>
      </div>

      {/* Innovators */}
      <div className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
          alt="Innovators"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
       <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent" />

        <div className="relative flex h-full flex-col justify-between p-8">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-purple-700 shadow-sm">
              💡
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-950">
              Innovators
            </h3>

            <p className="mt-3 max-w-[260px] text-base leading-6 text-slate-750">
              Turn ideas and solutions into real-world opportunities with the right resources, support, and potential to earn.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-700 transition group-hover:bg-purple-600 group-hover:text-white">
            →
          </div>
        </div>
      </div>

      {/* Companies */}
      <div className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85"
          alt="Companies"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent" />

        <div className="relative flex h-full flex-col justify-between p-8">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-purple-700 shadow-sm">
              🏢
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-950">
              Companies
            </h3>

            <p className="mt-3 max-w-[260px] text-base leading-6 text-slate-750">
              Build, fund, promote, and grow businesses with access to capital,
              markets, and strategic support.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-700 transition group-hover:bg-purple-600 group-hover:text-white">
            →
          </div>
        </div>
      </div>

      {/* Marketers */}
      <div className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85"
          alt="Marketers"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent" />

        <div className="relative flex h-full flex-col justify-between p-8">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-purple-700 shadow-sm">
              📣
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-950">
              Marketers
            </h3>

            <p className="mt-3 max-w-[260px] text-base leading-6 text-slate-750">
              Promote opportunities and earn performance-based commissions
              through your network and influence.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-700 transition group-hover:bg-purple-600 group-hover:text-white">
            →
          </div>
        </div>
      </div>

      {/* Experts */}
      <div className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1200&q=85"
          alt="Experts"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent" />

        <div className="relative flex h-full flex-col justify-between p-8">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-purple-700 shadow-sm">
              🎓
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-950">
              Experts
            </h3>

            <p className="mt-3 max-w-[260px] text-base leading-6 text-slate-750">
              Provide professional knowledge, skills, and services to help businesses and individuals succeed while earning from your expertise.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-700 transition group-hover:bg-purple-600 group-hover:text-white">
            →
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85"
          alt="Partners"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent" />

        <div className="relative flex h-full flex-col justify-between p-8">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-purple-700 shadow-sm">
              🤝
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-950">
              Partners
            </h3>

            <p className="mt-3 max-w-[260px] text-base leading-6 text-slate-750">
              Build strategic relationships and collaborate on opportunities that create greater value, shared growth, and long-term impact.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-700 transition group-hover:bg-purple-600 group-hover:text-white">
            →
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* STATS */}
      <section className="bg-slate-950 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
          <div>
            <p className="text-3xl font-bold text-purple-400">10K+</p>
            <p className="mt-1 text-sm text-slate-400">Active users</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-purple-400">2.5K+</p>
            <p className="mt-1 text-sm text-slate-400">Companies</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-purple-400">1.2K+</p>
            <p className="mt-1 text-sm text-slate-400">Opportunities</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-purple-400">$500M+</p>
            <p className="mt-1 text-sm text-slate-400">Capital facilitated</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-purple-400">Global</p>
            <p className="mt-1 text-sm text-slate-400">
              People, ideas & growth
            </p>
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section id="opportunities" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-purple-600">
                FEATURED OPPORTUNITIES
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight">
                Discover what is possible.
              </h2>
            </div>

            <a
              href="#"
              className="text-sm font-semibold text-purple-600"
            >
              View all opportunities →
            </a>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {opportunities.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-48 bg-gradient-to-br from-slate-950 via-purple-950 to-purple-500 p-6">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                    {item.type}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {item.location}
                  </p>

                  <p className="mt-7 text-2xl font-bold">{item.amount}</p>

                  <a
                    href="#"
                    className="mt-6 block rounded-xl bg-purple-50 px-4 py-3 text-center text-sm font-semibold text-purple-700 transition hover:bg-purple-600 hover:text-white"
                  >
                    View opportunity →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section id="careers" className="bg-purple-50 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-purple-600">
              ACEPA CAREERS
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Build your future with ACEPA.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Join a growing ecosystem where talented people can contribute,
              learn, collaborate, and build meaningful careers.
            </p>

            <a
              href="#"
              className="mt-8 inline-block rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-600"
            >
              View open positions →
            </a>
          </div>

          <div className="rounded-[28px] bg-slate-950 p-10 text-white">
            <p className="text-sm font-semibold text-purple-300">
              GROW · LEARN · IMPACT
            </p>

            <h3 className="mt-5 text-3xl font-bold">
              Work across capital, innovation, technology and business.
            </h3>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {["Technology", "Finance", "Operations", "Growth"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="about" className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] text-purple-600">
            PEOPLE · OPPORTUNITIES · PROGRESS
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
            Be part of the ecosystem.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Whether you have capital, an idea, expertise, a company, or a
            marketing opportunity, ACEPA is built to help connect the pieces.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="rounded-xl bg-purple-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-200 hover:bg-purple-700"
            >
               Get started →
            </a>

            <a
              href="#"
              className="rounded-xl border border-slate-300 px-7 py-4 text-sm font-semibold text-slate-800 hover:border-purple-400 hover:text-purple-600"
            >
              Explore ACEPA
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-3xl font-black tracking-[-0.08em]">
                ACEPA
              </div>

              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
                A global investment and business development platform
                connecting people, capital, ideas, and opportunities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Platform</h3>
              <div className="mt-5 space-y-3 text-sm text-slate-400">
                <a href="#">Opportunities</a>
                <a href="#">Invest</a>
                <a href="#">Companies</a>
                <a href="#">Experts</a>
                <a href="#">Careers</a>
                <a href="#">Marketers</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Company</h3>
              <div className="mt-5 space-y-3 text-sm text-slate-400">
                <a href="#">About</a>
                <a href="#">Innovation</a>
                <a href="#">Collaborations</a>
                <a href="#">Contact</a>
                <a href="#">Help Center</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Stay connected</h3>
              <p className="mt-5 text-sm leading-6 text-slate-400">
                Receive updates about opportunities, insights and ACEPA news.
              </p>

              <div className="mt-5 flex overflow-hidden rounded-xl border border-white/10">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500"
                />
                <button className="bg-purple-600 px-5 text-sm font-semibold">
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-7 text-sm text-slate-500">
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <p>© 2026 ACEPA. All rights reserved.</p>
              <p>People. Opportunities. Progress.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}