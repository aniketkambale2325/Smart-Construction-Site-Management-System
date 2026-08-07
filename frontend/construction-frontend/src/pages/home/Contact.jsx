import { useState } from 'react';
import {
  Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle, Building2, Clock,
} from 'lucide-react';
import Navigationbar from './Navigationbar';

const HERO_IMG = 'https://images.pexels.com/photos/11960186/pexels-photo-11960186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and message.');
      return;
    }
    setLoading(true);
    // Simulated submission — no backend required for this static form
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setSuccess(false), 4000);
    }, 900);
  };

  const CONTACT_INFO = [
    { icon: Mail, label: 'Email', value: 'hello@buildtrack.com', href: 'mailto:hello@buildtrack.com' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 014-2837', href: 'tel:+15550142837' },
    { icon: MapPin, label: 'Office', value: '1200 Builder Ave, Suite 400, Austin, TX' },
    { icon: Clock, label: 'Hours', value: 'Mon – Fri, 8:00 AM – 6:00 PM CST' },
  ];

  return (
    <div className="bg-ink-50">
      <Navigationbar />
      {/* HERO */}
      {/* <section className="relative overflow-hidden bg-ink-900">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Construction site" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 to-ink-900/60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-400">Contact Us</span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Let's build something together
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-200">
              Questions about BuildTrack, a demo request, or a partnership idea? We'd love to hear from you.
              Our team typically replies within one business day.
            </p>
          </div>
        </div>
      </section> */}

      {/* CONTACT GRID */}
      <section className="py-15 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Info column */}
            <div className="lg:col-span-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">Get in touch</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-900">
                We're here to help
              </h2>
              <p className="mt-4 text-ink-500 leading-relaxed">
                Reach out through any of the channels below, or fill out the form and we'll get back to you fast.
              </p>

              <div className="mt-8 space-y-4">
                {CONTACT_INFO.map((c) => {
                  const content = (
                    <div className="flex items-start gap-4 rounded-xl border border-ink-200 bg-white p-5 transition-all hover:border-brand-200 hover:shadow-md hover:shadow-ink-900/5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                        <c.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{c.label}</p>
                        <p className="mt-1 text-sm font-medium text-ink-800">{c.value}</p>
                      </div>
                    </div>
                  );
                  return c.href ? (
                    <a key={c.label} href={c.href} className="block">{content}</a>
                  ) : (
                    <div key={c.label}>{content}</div>
                  );
                })}
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-ink-200 bg-white p-8 shadow-sm sm:p-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink-900">Send us a message</h3>
                    <p className="text-sm text-ink-500">We'll reply within one business day.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {error && (
                    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                  {success && (
                    <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>Thanks! Your message has been sent. We'll be in touch soon.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink-700">Full Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className="w-full rounded-lg border border-ink-300 bg-white py-2.5 px-3 text-sm text-ink-900 placeholder-ink-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-ink-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className="w-full rounded-lg border border-ink-300 bg-white py-2.5 px-3 text-sm text-ink-900 placeholder-ink-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Company <span className="text-ink-400">(optional)</span></label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      className="w-full rounded-lg border border-ink-300 bg-white py-2.5 px-3 text-sm text-ink-900 placeholder-ink-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-700">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-y rounded-lg border border-ink-300 bg-white py-2.5 px-3 text-sm text-ink-900 placeholder-ink-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center bg-blue-500 gap-2 rounded-lg py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:from-brand-500 hover:to-brand-600 hover:shadow-xl hover:shadow-brand-500/30 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <button className="h-4 w-4 text-black-500 transition-transform group-hover:translate-x-0.5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
