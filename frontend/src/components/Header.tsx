import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Navigation items with explicit ids matching sections in the page
  const navItems = [
    { id: 'home', label: 'Bosh sahifa' },
    { id: 'about-masjid', label: 'Masjid haqida' },
    { id: 'prayer-times', label: 'Namoz vaqtlari' },
    { id: 'news', label: 'Yangiliklar' },
    { id: 'donation', label: 'Ehson' },
    { id: 'gallery', label: 'Galereya' },
    { id: 'contact', label: 'Aloqa' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  useEffect(() => {
    // IntersectionObserver to detect active section for nav highlight
    const sections = navItems
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-emerald-900/95 backdrop-blur-md shadow-lg' : 'bg-emerald-900/80 backdrop-blur-sm'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md">
              {/* Detailed mosque SVG icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="white" aria-hidden>
                {/* Main dome */}
                <path d="M12 3c-2.5 0-4.5 1.5-4.5 3.5v1h9v-1C16.5 4.5 14.5 3 12 3z" />
                {/* Crescent moon on top */}
                <path d="M11.5 1.5c0 0.8 0.4 1.5 1 1.5s1-0.7 1-1.5S12.8 0.5 12 0.5 11.5 0.7 11.5 1.5z" />
                <circle cx="12.5" cy="1.5" r="0.3" fill="none" stroke="white" strokeWidth="0.5" />
                {/* Main building */}
                <rect x="8" y="7.5" width="8" height="8" rx="0.5" />
                {/* Entrance arch */}
                <path d="M10.5 15.5v-3c0-0.8 0.7-1.5 1.5-1.5s1.5 0.7 1.5 1.5v3" fill="#047857" />
                {/* Left minaret */}
                <rect x="5" y="5" width="1.5" height="10.5" rx="0.2" />
                <circle cx="5.75" cy="4.5" r="0.8" />
                <path d="M5.4 3.8c0 0.4 0.2 0.7 0.35 0.7s0.35-0.3 0.35-0.7" fill="none" stroke="white" strokeWidth="0.3" />
                {/* Right minaret */}
                <rect x="17.5" y="5" width="1.5" height="10.5" rx="0.2" />
                <circle cx="18.25" cy="4.5" r="0.8" />
                <path d="M17.9 3.8c0 0.4 0.2 0.7 0.35 0.7s0.35-0.3 0.35-0.7" fill="none" stroke="white" strokeWidth="0.3" />
                {/* Windows */}
                <circle cx="10" cy="10" r="0.5" fill="#047857" />
                <circle cx="14" cy="10" r="0.5" fill="#047857" />
                {/* Base */}
                <rect x="7" y="15.5" width="10" height="1" rx="0.2" />
              </svg>
            </div>

            <div>
              <h1 className="text-white text-lg font-bold leading-tight">Chimir ota Jome Masjidi</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={`relative text-white hover:text-emerald-200 transition-colors duration-200 font-medium py-1 focus:outline-none focus:ring-2 focus:ring-emerald-300 rounded-sm ${
                  activeSection === item.id
                    ? 'text-emerald-100'
                    : ''
                }`}
              >
                <span className="capitalize">{item.label}</span>
                {/* underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-emerald-300 transition-all duration-200 ${
                    activeSection === item.id ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="text-white hover:text-emerald-200 transition-colors p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <div className={`md:hidden overflow-visible transition-[max-height,opacity] duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col gap-1 mt-4 pb-4 border-t border-emerald-700/50" aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-white px-4 py-3 text-left rounded-lg hover:bg-emerald-800/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-sm font-medium border border-transparent hover:border-emerald-600/30 ${
                  activeSection === item.id ? 'bg-emerald-800/50 text-emerald-100 border-emerald-600/50' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="flex items-center justify-between">
                  {item.label}
                  {activeSection === item.id && (
                    <span className="w-2 h-2 bg-emerald-300 rounded-full"></span>
                  )}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;