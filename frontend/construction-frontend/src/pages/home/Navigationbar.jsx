import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HardHat,Building2, Menu, X, ChevronDown } from 'lucide-react';

const FEATURES = [
  { label: 'Project Management', to: '/#features' },
  { label: 'Crew Scheduling', to: '/#features' },
  { label: 'Site Monitoring', to: '/#features' },
  { label: 'Reports & Analytics', to: '/#features' },
];


export default function Navigationbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLink = (to, label) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`relative text-sm font-medium transition-colors hover:text-brand-700 ${
          active ? 'text-brand-700' : 'text-ink-600'
        }`}
      >
        {label}
        {active && <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand-600" />}
      </Link>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink-200 bg-white/90 backdrop-blur-lg shadow-sm'
          : 'bg-white/70 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black-700 shadow-md shadow-brand-600/20">
            <Building2 className="mx-auto h-10 w-10 text-black/90" />
            
          </div>
          <span className="font-display bg-blue text-2xl pt-2 font-bold tracking-tight text-ink-900">
            Build<span className="text-brand-600">Ops</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLink('/', 'Home')}

          {/* Features dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-ink-600 transition-colors hover:text-brand-700">
              Features
              <ChevronDown className={`h-4 w-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
            </button>
            {featuresOpen && (
              <div className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-2">
                <div className="rounded-xl border border-ink-200 bg-white p-2 shadow-xl shadow-ink-900/5 animate-fade-in">
                  {FEATURES.map((f) => (
                    <Link
                      key={f.label}
                      to={f.to}
                      className="block rounded-lg px-3 py-2 text-sm text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                    >
                      {f.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLink('/about', 'About Us')}
          {navLink('/contact', 'Contact Us')}
        </div>

        {/* Auth buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="text-sm font-semibold text-ink-700 transition-colors hover:text-brand-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-brand-600 bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-all hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/30"
          >
            Register
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-ink-200 bg-white animate-fade-in">
          <div className="space-y-1 px-4 py-4">
            <Link to="/" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50">Home</Link>
            <Link to="/#features" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50">Features</Link>
            <Link to="/about" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50">About Us</Link>
            <Link to="/contact" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50">Contact Us</Link>
            <div className="pt-3 flex gap-3">
              <Link to="/login" className="flex-1 rounded-lg border border-ink-300 px-4 py-2.5 text-center text-sm font-semibold text-ink-700 hover:bg-ink-50">Login</Link>
              <Link to="/register" className="flex-1 rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-700">Register</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
