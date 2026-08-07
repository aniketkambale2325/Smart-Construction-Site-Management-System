import { Link } from "react-router-dom";
import {
  ArrowRight,
  PlayCircle,
  Activity,
  ShieldCheck,
  Users,
  ClipboardList,
  Wallet,
  FileBarChart,
  TrendingDown,
  CheckCircle2,
  Building2,
  Factory,
  Home as HomeIcon,
  Landmark,
  Quote,
} from "lucide-react";
import Navigationbar from "./Navigationbar";

const STEPS = [
  {
    tag: "Data",
    title: "Know sooner.",
    text: "See exactly what's happening on every site — daily progress, attendance, and material use captured in real time, not weeks later.",
    img: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Insight",
    title: "Act faster.",
    text: "Spot delays, budget overruns, and safety risks the moment they appear, so your team can respond before they cost you.",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
  },
  {
    tag: "Action",
    title: "Deliver on time.",
    text: "Keep contractors, sites, and the office aligned on one platform — from ground-breaking to handover.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
  },
];

const FEATURES = [
  {
    icon: Activity,
    title: "Real-time Progress Tracking",
    text: "Track task and milestone completion across every site from a single live dashboard.",
  },
  {
    icon: Users,
    title: "Workforce & Attendance",
    text: "Digital attendance, shift logs, and labor cost tracking for every employee and contractor.",
  },
  {
    icon: ClipboardList,
    title: "Site Documentation",
    text: "Daily reports, photos, and inspection logs stored and searchable in one place.",
  },
  {
    icon: Wallet,
    title: "Budget & Expense Control",
    text: "Monitor material costs, vendor payments, and project budgets against actuals as you build.",
  },
  {
    icon: ShieldCheck,
    title: "Materials & Vendors",
    text: "Manage inventory, purchase orders, and vendor performance without leaving the platform.",
  },
  {
    icon: FileBarChart,
    title: "Automated Reports",
    text: "Generate client-ready progress and financial reports in a couple of clicks.",
  },
];

const PROJECT_TYPES = [
  { icon: Building2, label: "Commercial", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
  { icon: HomeIcon, label: "Residential", img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=600&q=80" },
  { icon: Factory, label: "Industrial", img: "https://images.unsplash.com/photo-1587582423116-ec07293f0395?auto=format&fit=crop&w=600&q=80" },
  { icon: Landmark, label: "Infrastructure", img: "https://media.istockphoto.com/id/154918211/photo/city-of-dubai-burj-khalifa.jpg?b=1&s=612x612&w=0&k=20&c=SxozYcmWTCLWyxF1Ttpc0pwAVLjNFP5f7G1bYhfjDys=" },
];

const TESTIMONIALS = [
  {
    quote:
      "We finally have one source of truth for every site. Daily reporting that used to take hours now takes minutes.",
    name: "Priya Nair",
    role: "Project Director, Horizon Builders",
  },
  {
    quote:
      "Delays used to catch us by surprise. Now we see them forming a week out and can act before they hit the schedule.",
    name: "Marcus Adeyemi",
    role: "Site Operations Lead, Cornerstone Group",
  },
  {
    quote:
      "Onboarding our foremen took a single afternoon. The whole crew was logging attendance and progress by day two.",
    name: "Elena Fischer",
    role: "VP Construction, Falkstone Developments",
  },
];

const LOGOS = ["APEX BUILD", "GRANITE & CO", "NORTHVALE", "URBANCORE", "STRATA WORKS", "IRONPEAK"];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navigationbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-16 lg:grid-cols-2 lg:px-10 lg:pb-24 lg:pt-24">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-600">
              KNOW · ACT · DELIVER
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900  sm:text-5xl lg:text-[3.4rem]">
              Construction Site Management, built for the way you build.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-500">
              BuildOps gives project teams a real-time view of progress, workforce,
              materials, and budgets — so every site stays on schedule and on
              spec, from foundation to final walkthrough.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-md"
              >
                Get a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-7 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                <PlayCircle className="h-4 w-4" />
                See How It Works
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Live in under a week
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-blue-50 blur-2xl" />
            <img
              src="https://images.pexels.com/photos/12453932/pexels-photo-12453932.jpeg"
              alt="Construction site with crane at sunset"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl shadow-gray-900/10 sm:aspect-[5/4]"
            />
            <div className="absolute -bottom-6 -left-6 hidden w-56 rounded-xl bg-white p-4 shadow-xl ring-1 ring-gray-100 sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                </span>
                <div>
                  <p className="text-lg font-bold leading-none text-gray-900">45%</p>
                  <p className="mt-1 text-xs text-gray-500">fewer schedule delays</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo strip */}
        <div className="border-t border-gray-100 bg-gray-50/60 py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
              Trusted by contractors and developers worldwide
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {LOGOS.map((name) => (
                <span key={name} className="text-sm font-bold tracking-wide text-gray-300">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Know / Act / Deliver steps */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28" id="features">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            One platform for the entire build.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            From the first site visit to the final punch list, SiteSync keeps
            your data connected and your teams aligned.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={step.img}
                  alt={step.title}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  {step.tag}
                </span>
                <h3 className="mt-2 text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid grid-cols-2 gap-10 text-center lg:grid-cols-4">
            {[
              { value: "45%", label: "Fewer schedule delays" },
              { value: "2,400+", label: "Sites managed" },
              { value: "98%", label: "On-time daily reporting" },
              { value: "30k+", label: "Field workers onboarded" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything your site team needs, in one system.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Replace scattered spreadsheets and paper logs with a single
            connected workflow.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-100 bg-white p-7 transition-all hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <f.icon className="h-6 w-6 text-blue-600" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project types */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Built for every project type.
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              From residential builds to large-scale infrastructure, SiteSync
              adapts to how your projects actually run.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECT_TYPES.map((p) => (
              <div
                key={p.label}
                className="group relative h-64 overflow-hidden rounded-2xl shadow-sm"
              >
                <img
                  src={p.img}
                  alt={p.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 flex items-center gap-2 p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                    <p.icon className="h-4.5 w-4.5 text-white" />
                  </span>
                  <span className="font-semibold text-white">{p.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Teams building with confidence.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
            >
              <Quote className="h-7 w-7 text-blue-200" />
              <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-gray-600">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/16495231/pexels-photo-16495231.jpeg"
          alt="Construction site aerial view"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to build without blind spots?
          </h2>
          <p className="mt-4 text-lg text-gray-200">
            See how SiteSync brings your sites, workforce, and budgets into
            one clear picture.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Get a Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  );
}