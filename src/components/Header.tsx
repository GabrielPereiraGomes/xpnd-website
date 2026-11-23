import React, { useState, useEffect } from 'react';
import { siteConfig } from '../site.config';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  visible?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ visible = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-apple ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-6 transition-all duration-500 ease-apple ${
          scrolled ? 'pt-3 pb-3' : 'pt-5 pb-5'
        }`}
      >
        <div
          className={`flex h-14 items-center justify-between rounded-full px-6 transition-all duration-500 ease-apple border ${
            scrolled
              ? 'bg-[#F9F8F6]/85 backdrop-blur-[18px] border-[#1A1817]/[0.08] shadow-[0_4px_24px_-4px_rgba(26,24,23,0.05)]'
              : 'bg-[#F9F8F6]/60 backdrop-blur-[10px] border-transparent'
          }`}
        >
          {/* Logo XPND */}
          <a
            href="#"
            className="flex items-center gap-2 text-xl font-extrabold tracking-[-0.03em] text-xpnd-carbon transition-colors hover:text-xpnd-taupe font-sans"
            aria-label="XPND Home"
          >
            <span className="font-sans font-extrabold text-2xl tracking-[-0.03em] text-[#1A1817]">XPND</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#1A1817]/75">
            {siteConfig.navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#1A1817] hover:font-semibold"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Pill */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contato"
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#1A1817] px-5 text-[13px] font-semibold tracking-tight text-[#F9F8F6] transition-all duration-300 hover:bg-[#8B746B] hover:shadow-sm"
            >
              Agendar diagnóstico
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-[#F3EFEA] text-[#1A1817] transition-colors"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-6 mt-2 rounded-[24px] bg-[#F9F8F6]/95 backdrop-blur-[24px] border border-[#1A1817]/[0.08] p-6 shadow-elevated animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4 text-sm font-medium text-[#1A1817]">
            {siteConfig.navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#1A1817]/[0.05] transition-colors hover:text-xpnd-taupe"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex h-11 items-center justify-center rounded-full bg-[#1A1817] px-5 text-sm font-semibold text-[#F9F8F6] transition-colors hover:bg-xpnd-taupe"
            >
              Agendar diagnóstico
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
