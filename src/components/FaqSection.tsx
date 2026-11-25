import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  const faqs = [
    {
      q: 'Nossa equipe não tem perfil técnico. Vamos conseguir operar os assistentes de IA?',
      a: 'Com certeza. Toda a infraestrutura é desenhada exatamente para quem não programa. Seu time não precisa aprender comandos complexos nem jargões técnicos: a interação acontece em português natural, diretamente nas interfaces que sua equipe já utiliza no dia a dia. Além disso, conduzimos treinamentos práticos semanais e fornecemos manuais passo a passo.',
    },
    {
      q: 'Qual será o custo mensal de ferramentas de IA após a implementação?',
      a: 'Nossa filosofia é bootstrap puro: priorizamos sempre ferramentas gratuitas, robustas e de código aberto, ou planos básicos de custo extremamente baixo (geralmente entre zero e poucas dezenas de reais ao mês por usuário). Nossa meta prioritária é reduzir seus custos mensais de softwares esquecidos e otimizar o retorno sobre cada centavo investido.',
    },
    {
      q: 'Qual é o perfil e porte ideal de empresa para a assessoria?',
      a: 'Nosso foco prioritário são pequenas e médias empresas (PMEs) com 3 a 30 colaboradores — especialmente escritórios de advocacia, imobiliárias, construtoras, consultorias e prestadores de serviços B2B que possuem fluxos repetitivos, atendimento diário a clientes e lidam com informações que exigem sigilo.',
    },
    {
      q: 'Como funciona o primeiro passo e o que acontece na sessão de diagnóstico?',
      a: 'O primeiro contato é rápido e direto pelo WhatsApp ou pelo formulário aqui no site. Alinhamos as informações iniciais da sua empresa e agendamos uma reunião de 45 minutos diretamente com o Gabriel Pereira Gomes. Nessa sessão individual, mapeamos seus principais gargalos e apresentamos uma proposta sob medida — sem pressão e com total transparência.',
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" ref={sectionRef} className="w-full py-20 md:py-28 px-4 sm:px-6 bg-[#F9F8F6]">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-3">
            Perguntas Frequentes
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight">
            <span className="line-mask block">
              <span className="line-inner block">
                Tudo o que você precisa saber
              </span>
            </span>
            <span className="line-mask block mt-1">
              <span className="line-inner block text-[#8B746B]">
                antes de dar o próximo passo.
              </span>
            </span>
          </h2>
        </div>

        <div className="divide-y divide-[#1A1817]/[0.08]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const triggerId = `faq-trigger-${idx}`;
            const panelId = `faq-panel-${idx}`;
            return (
              <div key={idx} className="py-6 sm:py-8 transition-colors">
                <button
                  id={triggerId}
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-6 text-left group"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="font-sans text-base sm:text-lg font-bold text-[#1A1817] group-hover:text-[#8B746B] transition-colors">
                    {faq.q}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3EFEA] text-[#1A1817] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#1A1817] text-[#F9F8F6]' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="mt-4 pr-12 text-sm sm:text-base leading-relaxed text-[#1A1817]/80 animate-in fade-in slide-in-from-top-2 duration-300"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
