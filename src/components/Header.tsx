import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Navigation items with explicit ids matching sections in the page
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about-masjid', label: 'About Masjid' },
    { id: 'prayer-times', label: 'Prayer Times' },
    { id: 'news', label: 'News' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
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
              {/* Inline mosque SVG icon for reliable rendering */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
                {/* Dome */}
                <path d="M12 5c-3 0-5 2-5 5h10c0-3-2-5-5-5z" fill="white" />
                {/* Base and entrance */}
                <path d="M6 12v5h2v-4h8v4h2v-5c0-1.1-0.9-2-2-2H8c-1.1 0-2 .9-2 2z" fill="white" />
                {/* Minarets */}
                <rect x="3.5" y="8" width="1" height="6" rx="0.2" fill="white" />
                <rect x="19.5" y="8" width="1" height="6" rx="0.2" fill="white" />
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
        <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col gap-3 mt-4 pb-4 border-t border-emerald-700/50" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-white px-2 py-2 text-left rounded-md hover:bg-emerald-800/30 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                  activeSection === item.id ? 'bg-emerald-800/40' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;