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
          scrolled ? 'pt-3 pb-3' : 'pt-4 pb-2'
        }`}
      >
        <div
          className={`flex h-14 items-center justify-between md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] rounded-full px-6 transition-all duration-500 ease-apple border ${
            scrolled
              ? 'bg-[#F9F8F6]/85 backdrop-blur-[18px] border-[#1A1817]/[0.08] shadow-[0_4px_24px_-4px_rgba(26,24,23,0.05)]'
              : 'bg-transparent border-transparent'
          }`}
        >
          {/* Logo XPND Oficial Vetorial Flat */}
          <div className="flex items-center md:justify-self-start">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const lenis = getLenis();
                if (lenis) lenis.scrollTo(0, { duration: 1.15 });
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center transition-opacity duration-300 hover:opacity-75"
              aria-label="XPND Home"
            >
              <img
                src="/assets/xpnd_flat_carbon.svg"
                alt="XPND"
                width={3112}
                height={1360}
                className="h-8 sm:h-9 w-auto translate-y-[2px] -ml-[5px] select-none"
                loading="eager"
              />
            </a>
          </div>

          {/* Desktop Nav Links (Estritamente centralizados no eixo da página + Atlason underline) */}
          <nav className="hidden md:flex md:justify-self-center items-center gap-8 text-[13px] font-medium text-[#1A1817]/75">
            {siteConfig.navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="editorial-link transition-colors hover:text-[#1A1817] py-1 whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Column: Desktop CTA Pill Button & Mobile Menu Trigger */}
          <div className="flex items-center justify-end md:justify-self-end">
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contato');
              }}
              className="hidden md:inline-flex editorial-btn-pill h-9 items-center justify-center rounded-full bg-[#1A1817] px-5 text-xs font-semibold text-[#F9F8F6] shadow-sm hover:bg-[#8B746B] whitespace-nowrap"
            >
              Agendar diagnóstico
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1817]/[0.05] text-[#1A1817]"
              aria-label="Alternar menu de navegação"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
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
