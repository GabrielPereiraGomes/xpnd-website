import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PromiseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Masked lines reveal
      const lines = sectionRef.current?.querySelectorAll('.line-inner');
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { yPercent: 110, opacity: 0.01 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      // Micro elements fade in (badge, subtitle, ctas)
      const fadeElements = sectionRef.current?.querySelectorAll('.fade-editorial');
      if (fadeElements && fadeElements.length > 0) {
        gsap.fromTo(
          fadeElements,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 86%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="promessa"
      ref={sectionRef}
      className="relative w-full pt-28 pb-24 md:pt-36 md:pb-32 px-6 flex flex-col items-center justify-center text-center bg-[#F9F8F6]"
    >
      <div className="mx-auto max-w-4xl">
        {/* Editorial Eyebrow Badge */}
        <div className="fade-editorial inline-flex items-center gap-2 rounded-full border border-[#1A1817]/[0.08] bg-[#F3EFEA] px-4 py-1.5 mb-8 text-[11px] font-semibold tracking-wider uppercase text-[#8B746B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8B746B]" />
          Assessoria Privada de Inteligência Artificial para Empresas
        </div>

        {/* H1 Bicolor Apple com Masked Line Reveal (Estilo Atlason) */}
        <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1.12] mb-8 text-balance">
          <span className="line-mask block">
            <span className="line-inner text-[#1A1817]">
              Sua empresa não precisa de mais ferramentas.
            </span>
          </span>
          <span className="line-mask block mt-1 sm:mt-2">
            <span className="line-inner text-[#8B746B]">
              Precisa de Inteligência Artificial funcionando na rotina.
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <div className="fade-editorial mx-auto max-w-2xl text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#1A1817]/70 mb-12">
          Ajudamos pequenas e médias empresas de <strong>3 a 30 colaboradores</strong> a saírem do zero ou do uso amador até terem infraestrutura própria de IA operando no dia a dia. Com total sigilo de dados, sem jargões e com uma marca à altura do seu valor.
        </div>

        {/* CTAs com classes táteis editoriais */}
        <div className="fade-editorial flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#contato"
            className="editorial-btn-pill group flex w-full sm:w-auto h-13 items-center justify-center gap-2 rounded-full bg-[#1A1817] px-8 text-sm sm:text-base font-semibold text-[#F9F8F6] shadow-sm hover:bg-[#8B746B] hover:shadow-subtle"
          >
            Agendar sessão de diagnóstico
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#metodo"
            className="editorial-btn-pill flex w-full sm:w-auto h-13 items-center justify-center gap-2 rounded-full border border-[#1A1817]/[0.12] bg-white/60 px-7 text-sm sm:text-base font-medium text-[#1A1817] hover:bg-[#F3EFEA]"
          >
            Entender como funciona
            <ArrowDown size={15} />
          </a>
        </div>

        {/* Micro-proof Points */}
        <div className="fade-editorial flex items-center justify-center flex-wrap gap-4 text-xs font-medium text-[#1A1817]/60">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-[#8B746B]" />
            <span>Atendimento privado e personalizado</span>
          </div>
          <span className="hidden sm:inline text-[#1A1817]/25">•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#8B746B]" />
            <span>Vagas estritamente limitadas por ciclo</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
