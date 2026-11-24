import React, { useEffect, useRef } from 'react';
import { Briefcase, Building2, TrendingUp, Sparkles } from 'lucide-react';
import { xpndAvatarFounderUrl } from '../assets/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FounderSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const credentials = [
    {
      label: '+25 anos em Vendas',
      desc: 'Atuação contínua em negociações consultivas, grandes contas, mídia e fechamentos de alto valor.',
      icon: Briefcase,
    },
    {
      label: '10 anos de Gestão Real',
      desc: 'Sócio-proprietário de imobiliária e construtora com 4 empreendimentos entregues em Gaspar/SC.',
      icon: Building2,
    },
    {
      label: '4 anos no Mercado Digital',
      desc: 'Liderança comercial e closer em uma das maiores operações digitais do país com metas superadas.',
      icon: TrendingUp,
    },
    {
      label: 'Visão Executiva & Taste',
      desc: 'Graduado em Publicidade (FURB), unindo rigor operacional, estética limpa e foco implacável em margem.',
      icon: Sparkles,
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Masked title reveal
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

      // 2. Founder card & credentials GPU entrance
      const founderCard = sectionRef.current?.querySelector('.founder-card');
      const credItems = sectionRef.current?.querySelectorAll('.cred-item');

      if (founderCard) {
        gsap.fromTo(
          founderCard,
          { opacity: 0, scale: 1.03, y: 24 },
          {
            opacity: 1,
            scale: 1.0,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: founderCard,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      if (credItems && credItems.length > 0) {
        gsap.fromTo(
          credItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current?.querySelector('.credentials-grid'),
              start: 'top 88%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className="w-full py-28 md:py-36 px-6 bg-[#F3EFEA]">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="founder-card gpu-layer editorial-card-hover relative w-full max-w-sm rounded-[32px] overflow-hidden bg-[#F9F8F6] border border-[#1A1817]/[0.08] p-8 shadow-subtle text-center">
              <div className="mx-auto mb-6 h-28 w-28 rounded-full overflow-hidden bg-[#E5D4C0]/40 border-2 border-[#D4C0AC] flex items-center justify-center">
                <img
                  src={xpndAvatarFounderUrl}
                  alt="Gabriel Pereira Gomes — XPND"
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="font-sans text-xl font-bold text-[#1A1817] mb-1">
                Gabriel Pereira Gomes
              </h3>
              <p className="text-xs font-mono font-medium text-[#8B746B] uppercase tracking-wider mb-4">
                Fundador da XPND
              </p>
              <p className="text-xs text-[#1A1817]/70 leading-relaxed mb-6">
                Publicitário, empreendedor e consultor de negócios. Conduz pessoalmente cada diagnóstico e lidera a arquitetura de IA implementada nos clientes.
              </p>

              <div className="inline-flex items-center gap-2 rounded-full bg-[#F3EFEA] px-4 py-1.5 text-[11px] font-semibold text-[#1A1817]/75">
                <span className="h-2 w-2 rounded-full bg-[#3F6A58]" />
                Atendimento Direto 1-a-1
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Credentials */}
          <div className="lg:col-span-7">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-3">
              Sobre o Fundador
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight mb-6">
              <span className="line-mask block">
                <span className="line-inner block">
                  Liderada por quem conhece
                </span>
              </span>
              <span className="line-mask block mt-1">
                <span className="line-inner block text-[#8B746B]">
                  a realidade de um negócio.
                </span>
              </span>
            </h2>

            <p className="text-base text-[#1A1817]/75 leading-relaxed mb-6">
              A XPND nasceu da união entre décadas de vivência prática em gestão de empresas tradicionais e o domínio avançado de inteligência artificial aplicada. Não somos técnicos que nunca emitiram uma nota fiscal ou gerenciaram uma folha de pagamento.
            </p>

            <p className="text-base text-[#1A1817]/75 leading-relaxed mb-10">
              Falamos a língua dos sócios, entendemos a pressão de caixa e construímos assistentes que resolvem gargalos de rotina reais — com segurança absoluta de dados e foco obsessivo em produtividade.
            </p>

            {/* Credentials Grid */}
            <div className="credentials-grid grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-[#1A1817]/[0.08]">
              {credentials.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="cred-item gpu-layer flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F9F8F6] border border-[#1A1817]/[0.08] text-[#8B746B]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-bold text-[#1A1817] mb-1">
                        {c.label}
                      </h4>
                      <p className="text-xs text-[#1A1817]/65 leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderSection;
