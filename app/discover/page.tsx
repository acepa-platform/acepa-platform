"use client";

import Link from "next/link";

const categories = [
  {
    title: "Investment",
    label: "CAPITAL",
    description: "Explore opportunities where capital can participate in projects and products seeking investment.",
    items: [
      ["Projects", "Investment opportunities connected to real projects and businesses.", "/discover/projects"],
      ["Products", "Products and commercial opportunities seeking funding or participation.", "/discover/products"],
    ],
  },
  {
    title: "Innovation",
    label: "IDEAS",
    description: "Help solve real problems, contribute ideas, and participate in innovation opportunities.",
    items: [["Explore Innovation", "Discover challenges, ideas, and innovation opportunities.", "/discover/innovation"]],
  },
  {
    title: "Marketing",
    label: "GROWTH",
    description: "Help companies and opportunities reach the right audiences through marketing opportunities.",
    items: [["Explore Marketing", "Discover marketing and promotional opportunities.", "/discover/marketing"]],
  },
  {
    title: "Business",
    label: "VENTURES",
    description: "Find businesses, ventures, services, and commercial growth opportunities.",
    items: [["Explore Business", "Discover businesses and commercial opportunities.", "/discover/business"]],
  },
  {
    title: "Collaboration",
    label: "PARTNERSHIPS",
    description: "Connect around projects, skills, services, partnerships, and shared opportunities.",
    items: [["Explore Collaboration", "Find opportunities to work with companies and other participants.", "/discover/collaboration"]],
  },
  {
    title: "Experts",
    label: "EXPERTISE",
    description: "Put your professional knowledge and experience to work where it is needed.",
    items: [["Explore Experts", "Discover expert and professional opportunities.", "/discover/experts"]],
  },
  {
    title: "Careers & Jobs",
    label: "CAREERS",
    description: "Find employment and career opportunities from companies on ACEPA.",
    items: [["Explore Careers", "Discover open jobs and career opportunities.", "/discover/careers"]],
  },
];

const icons = ["◈", "✦", "◇", "▦", "↗", "◎", "▣"];

export default function DiscoverPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <img src="/acepa-logo-white-transparent-tagline-brighter.png" alt="ACEPA — People, Opportunities, Progress" className="h-14 w-auto object-contain brightness-0" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden text-sm font-medium text-slate-600 transition hover:text-purple-600 sm:block">
              Home
            </Link>
            <Link href="/" className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-600">
              Back to home
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white lg:px-8 lg:py-28">
        <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-bold tracking-[0.24em] text-purple-300">DISCOVER ACEPA</p>
            <h1 className="mt-5 text-5xl font-bold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Find where you can <span className="bg-gradient-to-r from-purple-300 to-violet-500 bg-clip-text text-transparent">create value.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Explore opportunities to invest, innovate, market, build, collaborate, contribute your expertise, or grow your career through ACEPA.
            </p>
          </div>

          <div className="mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {["Invest", "Innovate", "Build", "Collaborate"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-purple-600">EXPLORE BY OPPORTUNITY</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Choose a path.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">
            Each area connects you to a different way of participating in the ACEPA ecosystem.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <article
              key={category.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-purple-50 blur-2xl transition group-hover:bg-purple-100" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-lg text-white shadow-sm transition group-hover:bg-purple-600">
                    {icons[index]}
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.18em] text-slate-400">{category.label}</span>
                </div>

                <h2 className="mt-7 text-2xl font-bold tracking-tight">{category.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>

                <div className="mt-7 space-y-2">
                  {category.items.map(([title, description, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 transition hover:border-purple-100 hover:bg-purple-50"
                    >
                      <div>
                        <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
                        <p className="mt-1 text-[11px] leading-5 text-slate-500">{description}</p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-purple-600">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 rounded-3xl bg-slate-950 px-8 py-10 text-white sm:px-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] text-purple-300">PEOPLE · OPPORTUNITIES · PROGRESS</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Your next opportunity can start here.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">Whether you bring capital, an idea, expertise, a business, or a skill, ACEPA is built to connect the right people with the right opportunities.</p>
          </div>
          <Link href="/" className="shrink-0 rounded-xl bg-purple-600 px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-purple-500">
            Explore ACEPA →
          </Link>
        </div>
      </section>
    </main>
  );
}
