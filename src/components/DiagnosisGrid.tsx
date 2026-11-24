import React, { useEffect, useRef } from 'react';
import { Layers, Clock, Lock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const DiagnosisGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const painPoints = [
    {
      num: '01',
      title: 'Excesso de ruído, zero processo',
      desc: 'Sua empresa assina ferramentas por impulso ou curiosidade, acumula mensalidades e ninguém na rotina sabe exatamente o que fazer com elas no dia a dia.',
      icon: Layers,
    },
    {
      num: '02',
      title: 'Equipe travada e sem tempo',
      desc: 'Colaboradores qualificados gastam horas preciosas com tarefas mecânicas, atendimento repetitivo e preenchimento de documentos que drenam a energia e a margem.',
      icon: Clock,
    },
    {
      num: '03',
      title: 'Insegurança com sigilo e LGPD',
      desc: 'O receio legítimo de colar dados financeiros, estratégicos ou informações confidenciais de clientes em ferramentas públicas sem governança ou controle seguro.',
      icon: Lock,
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

      // 2. Bento Grid Cards: GPU-only composite transition scale: 1.03 -> 1.0, opacity: 0 -> 1
      const cards = sectionRef.current?.querySelectorAll('.bento-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            scale: 1.03,
            y: 24,
          },
          {
            opacity: 1,
            scale: 1.0,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current?.querySelector('.bento-grid'),
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
    <section id="diagnostico" ref={sectionRef} className="w-full py-24 md:py-32 px-6 bg-[#F3EFEA]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-3">
            O Diagnóstico
          </span>
          <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight">
            <span className="line-mask block">
              <span className="line-inner block">
                O problema não é a falta de tecnologia.
              </span>
            </span>
            <span className="line-mask block mt-1">
              <span className="line-inner block text-[#8B746B]">
                É a falta de método.
              </span>
            </span>
          </h2>
        </div>

        {/* Bento Grid Editorial Cards */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {painPoints.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bento-card editorial-card-hover gpu-layer relative flex flex-col justify-between rounded-[26px] bg-[#F9F8F6] p-8 sm:p-10 border border-[#1A1817]/[0.08]"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-semibold text-[#8B746B]">
                      {item.num}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EFEA] text-[#1A1817]/80">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="font-sans text-xl font-bold tracking-tight text-[#1A1817] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#1A1817]/70">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1A1817]/[0.05] text-[11px] font-mono text-[#8B746B] uppercase tracking-wider">
                  Gargalo Identificado
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DiagnosisGrid;
