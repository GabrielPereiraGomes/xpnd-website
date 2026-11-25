import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../site.config';
import { Menu, X } from 'lucide-react';
import { getLenis } from '../hooks/useLenisScroll';

interface HeaderProps {
  visible?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ visible = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>('#sistema');
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // ScrollSpy via IntersectionObserver para pílula ativa deslizante
  useEffect(() => {
    const sections = siteConfig.navLinks
      .map((item) => ({ href: item.href, el: document.querySelector(item.href) }))
      .filter((item): item is { href: string; el: Element } => item.el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const id = visibleEntries[0].target.getAttribute('id');
          if (id) setActiveHref(`#${id}`);
        }
      },
      {
        rootMargin: '-28% 0px -52% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    sections.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Atualiza posição geométrica da pílula branca deslizante
  useEffect(() => {
    const updatePill = () => {
      const container = navContainerRef.current;
      const activeEl = linkRefs.current[activeHref];
      if (!container || !activeEl) return;

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      setPillStyle({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
        opacity: 1,
      });
    };

    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [activeHref]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setActiveHref(href);
    if (href.startsWith('#')) {
      const lenis = getLenis();
      const el = document.querySelector(href);
      if (lenis && el) {
        lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.05 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
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
        className={`mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-500 ease-apple ${
          scrolled ? 'pt-3 pb-2' : 'pt-4 pb-2'
        }`}
      >
        <div
          className={`flex h-14 items-center justify-between gap-4 rounded-full px-4 sm:px-5 transition-all duration-500 ease-apple border ${
            scrolled
              ? 'bg-[#F9F8F6]/88 backdrop-blur-[18px] border-[#1A1817]/[0.09] shadow-[0_6px_28px_-6px_rgba(26,24,23,0.08)]'
              : 'bg-[#F9F8F6]/65 backdrop-blur-[10px] border-[#1A1817]/[0.05]'
          }`}
        >
          {/* Logo XPND Fluffy Pale Oak Estática */}
          <div className="flex items-center shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const lenis = getLenis();
                if (lenis) lenis.scrollTo(0, { duration: 1.05 });
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center transition-opacity duration-300 hover:opacity-85"
              aria-label="XPND Home"
            >
              <picture className="inline-flex items-center select-none pointer-events-none">
                <source srcSet="/assets/xpnd_logo_fluffy_pale_oak_v2_static.webp" type="image/webp" />
                <img
                  src="/assets/xpnd_logo_fluffy_pale_oak_v2_static.png"
                  alt="XPND"
                  width={374}
                  height={134}
                  className="h-8 sm:h-9 w-auto object-contain select-none"
                  loading="eager"
                  decoding="sync"
                />
              </picture>
            </a>
          </div>

          {/* Segmented Pill Nav with Sliding Highlight */}
          <nav
            aria-label="Navegação principal"
            className="hidden lg:flex items-center justify-center"
          >
            <div
              ref={navContainerRef}
              className="relative inline-flex items-center rounded-full bg-[#F3EFEA] p-1 border border-[#1A1817]/[0.07]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-white shadow-[0_2px_8px_rgba(26,24,23,0.08)] transition-all duration-300 ease-apple"
                style={{
                  transform: `translate3d(${pillStyle.left}px, 0, 0)`,
                  width: `${pillStyle.width}px`,
                  opacity: pillStyle.opacity,
                }}
              />
              {siteConfig.navLinks.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <a
                    key={item.href}
                    ref={(el) => {
                      linkRefs.current[item.href] = el;
                    }}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`relative z-10 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                      isActive ? 'text-[#1A1817]' : 'text-[#5C5A58] hover:text-[#1A1817]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Right Action & Mobile Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contato');
              }}
              className="hidden sm:inline-flex editorial-btn-pill h-9 items-center justify-center gap-2 rounded-full bg-[#1A1817] px-4 sm:px-5 text-xs font-semibold text-[#F9F8F6] shadow-sm hover:bg-[#8B746B] whitespace-nowrap"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#3F6A58]" aria-hidden="true" />
              <span>Agendar diagnóstico</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full bg-[#F3EFEA] text-[#1A1817] border border-[#1A1817]/[0.08]"
              aria-label="Alternar menu de navegação"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-panel"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-panel"
            className="lg:hidden mt-2 rounded-[24px] bg-[#F9F8F6]/95 backdrop-blur-[20px] border border-[#1A1817]/[0.08] p-5 shadow-elevated animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <nav className="flex flex-col gap-1.5 text-sm font-medium text-[#1A1817]">
              {siteConfig.navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`rounded-xl px-3.5 py-2.5 transition-colors ${
                    activeHref === item.href
                      ? 'bg-[#F3EFEA] font-bold text-[#1A1817]'
                      : 'text-[#5C5A58] hover:bg-[#F3EFEA]/60 hover:text-[#1A1817]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-[#1A1817]/[0.08]">
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contato');
                  }}
                  className="flex w-full h-11 items-center justify-center gap-2 rounded-full bg-[#1A1817] font-semibold text-sm text-[#F9F8F6]"
                >
                  <span className="h-2 w-2 rounded-full bg-[#3F6A58]" aria-hidden="true" />
                  <span>Agendar sessão de diagnóstico</span>
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
