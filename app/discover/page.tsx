"use client";

import Link from "next/link";

const categories = [
  {
    title: "Investment",
    description: "Explore opportunities where capital can participate in projects and products seeking investment.",
    items: [
      ["Projects", "Investment opportunities connected to real projects and businesses.", "/discover/projects"],
      ["Products", "Products and commercial opportunities seeking funding or participation.", "/discover/products"],
    ],
  },
  {
    title: "Innovation",
    description: "Help solve real problems, contribute ideas, and participate in innovation opportunities.",
    items: [["Explore Innovation", "Discover challenges, ideas, and innovation opportunities.", "/discover/innovation"]],
  },
  {
    title: "Marketing",
    description: "Help companies and opportunities reach the right audiences through marketing opportunities.",
    items: [["Explore Marketing", "Discover marketing and promotional opportunities.", "/discover/marketing"]],
  },
  {
    title: "Business",
    description: "Find business opportunities, ventures, services, and growth opportunities.",
    items: [["Explore Business", "Discover businesses and commercial opportunities.", "/discover/business"]],
  },
  {
    title: "Collaboration",
    description: "Connect around projects, skills, services, partnerships, and shared opportunities.",
    items: [["Explore Collaboration", "Find opportunities to work with companies and other participants.", "/discover/collaboration"]],
  },
  {
    title: "Experts",
    description: "Put your professional knowledge and experience to work where it is needed.",
    items: [["Explore Experts", "Discover expert and professional opportunities.", "/discover/experts"]],
  },
  {
    title: "Careers & Jobs",
    description: "Find employment and career opportunities from companies on ACEPA.",
    items: [["Explore Careers", "Discover open jobs and career opportunities.", "/discover/careers"]],
  },
];

export default function DiscoverPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="text-2xl font-black tracking-[-0.06em]">
            ACEPA
          </Link>
          <Link
            href="/"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to home
          </Link>
        </div>
      </header>

      <section className="bg-slate-950 px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.22em] text-purple-300">
            DISCOVER ACEPA
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-[-0.04em] sm:text-6xl">
            Explore opportunities. Create value. Earn.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Discover ways to invest, solve problems, provide services,
            collaborate, build your career, and participate in opportunities
            across the ACEPA ecosystem.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold">{category.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {category.description}
              </p>

              <div className="mt-6 space-y-3">
                {category.items.map(([title, description, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="block rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-purple-200 hover:bg-purple-50"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold">{title}</h3>
                      <span className="text-purple-600">→</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {description}
                    </p>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-purple-50 px-6 py-20 text-center lg:px-8">
        <p className="text-xs font-bold tracking-[0.2em] text-purple-600">
          PEOPLE · OPPORTUNITIES · PROGRESS
        </p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight">
          Discover what you can contribute.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Whether you have capital, an idea, expertise, a business, or a skill,
          ACEPA helps connect you with opportunities where you can participate
          and create value.
        </p>
      </section>
    </main>
  );
}
