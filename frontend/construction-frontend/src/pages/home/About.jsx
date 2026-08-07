import { Link } from 'react-router-dom';
import {
  Target, Eye, Heart, Users, Award, TrendingUp, ArrowRight, HardHat, Building2,
} from 'lucide-react';
import Navigationbar from './Navigationbar';

const HERO_IMG = 'https://images.pexels.com/photos/8961130/pexels-photo-8961130.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const TEAM_IMG = 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const BUILDING_IMG = 'https://images.pexels.com/photos/9562581/pexels-photo-9562581.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const VALUES = [
  { icon: Heart, title: 'Field-First', desc: "Every feature starts with a real problem we saw on a real site. If it doesn't help the field, it doesn't ship." },
  { icon: Award, title: 'Relentless Quality', desc: 'Construction leaves no room for guesswork. We hold our software to the same standard as the buildings it helps deliver.' },
  { icon: Users, title: 'Built Together', desc: 'We design alongside the crews, engineers, and managers who use BuildTrack every day — not in isolation.' },
  { icon: TrendingUp, title: 'Always Improving', desc: 'Sites evolve, and so do we. We ship updates every week based on feedback from the field.' },
];

const TEAM = [
  { name: 'Marcus Reed', role: 'CEO & Co-Founder', initials: 'MR' },
  { name: 'Elena Frost', role: 'CTO & Co-Founder', initials: 'EF' },
  { name: 'Daniel Cho', role: 'Head of Product', initials: 'DC' },
  { name: 'Priya Nair', role: 'Head of Customer Success', initials: 'PN' },
];

const TIMELINE = [
  { year: '2019', title: 'The idea', desc: 'Two site engineers got tired of juggling spreadsheets, group chats, and paper checklists.' },
  { year: '2020', title: 'First pilot', desc: 'BuildTrack ran on three live construction sites, cutting reporting time by 40%.' },
  { year: '2022', title: 'Going global', desc: 'Teams across 12 countries adopted BuildTrack for their daily site operations.' },
  { year: '2024', title: 'Today', desc: 'Over 500 projects delivered with BuildTrack, and we are just getting started.' },
];

export default function About() {
  return (
    <div className="bg-ink-50">
      <Navigationbar />
    {/* Full Video Section */}
<section className="relative h-screen w-full overflow-hidden bg-black">

  <video
    autoPlay
    muted
    loop
    playsInline
    controls
    className="h-full w-full object-cover"
  >
    <source src="/Untitled-design.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

</section>

      {/* STORY */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl shadow-xl shadow-ink-900/10">
              <img src={BUILDING_IMG} alt="Building under construction" className="h-full w-full object-cover" />
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">Our Story</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                From the field, for the field
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-500">
                In 2019, our co-founders were running a mid-size construction project and drowning in
                disconnected tools. The plan lived in a spreadsheet, the crew schedule was a group chat,
                and progress photos were scattered across a dozen phones.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-500">
                They built the first version of BuildTrack for their own team. It worked so well that
                neighboring sites started asking for it. Today, BuildTrack powers construction teams
                across the globe — but the mission has never changed: give the field one clean tool
                that just works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-ink-200 bg-ink-50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">Our Mission</h3>
              <p className="mt-3 text-ink-500 leading-relaxed">
                To give every construction team a single source of truth for their projects — so they can
                build faster, communicate clearly, and deliver with confidence.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-200 bg-ink-50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">Our Vision</h3>
              <p className="mt-3 text-ink-500 leading-relaxed">
                A world where no construction project is delayed by bad information — where the office and
                the field are always perfectly in sync.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">Our Values</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              What we stand for
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="group rounded-2xl border border-ink-200 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">Our Journey</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              How we got here
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((t) => (
              <div key={t.year} className="relative pl-6">
                <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-brand-600 ring-4 ring-brand-100" />
                <p className="font-display text-sm font-bold text-brand-600">{t.year}</p>
                <h3 className="mt-2 text-lg font-semibold text-ink-900">{t.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">Our Team</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              The people behind BuildTrack
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <div key={m.name} className="rounded-2xl border border-ink-200 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/5">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-xl font-bold text-white">
                  {m.initials}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">{m.name}</h3>
                <p className="mt-1 text-sm text-ink-500">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-14 text-center shadow-2xl shadow-brand-600/20 sm:px-16">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="relative">
              <Building2 className="mx-auto h-10 w-10 text-black/90" />
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Want to join our mission?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-brand-50">
                We are always looking for builders who care. Get started with BuildTrack today.
              </p>
              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-brand-700 shadow-lg transition-all hover:bg-ink-50"
              >
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
