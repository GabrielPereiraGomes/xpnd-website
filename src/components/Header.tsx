import React, { useState, useEffect } from 'react';
import { siteConfig } from '../site.config';
import { Menu, X } from 'lucide-react';
import { getLenis } from '../hooks/useLenisScroll';

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

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const lenis = getLenis();
      const el = document.querySelector(href);
      if (lenis && el) {
        lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.15 });
      }
    }
  };

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
            onClick={(e) => {
              e.preventDefault();
              const lenis = getLenis();
              if (lenis) lenis.scrollTo(0, { duration: 1.15 });
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xl font-extrabold tracking-[-0.03em] text-[#1A1817] font-sans transition-colors hover:text-[#8B746B]"
            aria-label="XPND Home"
          >
            <span className="font-sans font-extrabold text-2xl tracking-[-0.03em] text-[#1A1817]">XPND</span>
          </a>

          {/* Desktop Nav Links (com Atlason animated underline) */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#1A1817]/75">
            {siteConfig.navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="editorial-link transition-colors hover:text-[#1A1817] py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Pill Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contato');
              }}
              className="editorial-btn-pill inline-flex h-9 items-center justify-center rounded-full bg-[#1A1817] px-4 text-xs font-semibold text-[#F9F8F6] shadow-sm hover:bg-[#8B746B]"
            >
              Agendar diagnóstico
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1817]/[0.05] text-[#1A1817]"
            aria-label="Alternar menu de navegação"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 rounded-[24px] bg-[#F9F8F6]/95 backdrop-blur-[20px] border border-[#1A1817]/[0.08] p-6 shadow-elevated animate-in fade-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col gap-4 text-sm font-medium text-[#1A1817]">
              {siteConfig.navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="py-1 transition-colors hover:text-[#8B746B]"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t border-[#1A1817]/[0.08]">
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contato');
                  }}
                  className="editorial-btn-pill flex h-11 w-full items-center justify-center rounded-full bg-[#1A1817] text-xs font-semibold text-[#F9F8F6]"
                >
                  Agendar diagnóstico
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
