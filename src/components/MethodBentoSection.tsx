import React, { useState, useEffect, useRef } from 'react';
import { Compass, Cpu, GraduationCap, CheckCircle2, FileCode2, ShieldCheck, Layers3 } from 'lucide-react';

const METHOD_STEPS = [
  {
    num: '01',
    title: 'Diagnóstico',
    fullTitle: 'Diagnóstico e Direção Cirúrgica',
    phase: 'Semana 1',
    desc: 'Mapeamos gargalos operacionais reais para identificar exatamente onde tempo e margem estão escapando — definindo fluxos prioritários e enxugando ferramentas redundantes.',
    output: 'Mapa de Gargalos + Plano de ROI',
    icon: Compass,
  },
  {
    num: '02',
    title: 'Construção',
    fullTitle: 'Construção Assistida e Isolamento',
    phase: 'Semanas 2–3',
    desc: 'Configuramos assistentes privados com o contexto, políticas e linguagem da empresa, já estruturados com memória isolada e rotina de backup local.',
    output: 'Assistentes + Cofre LGPD Ativos',
    icon: Cpu,
  },
  {
    num: '03',
    title: 'Treinamento',
    fullTitle: 'Capacitação Prática na Tela',
    phase: 'Semana 4',
    desc: 'Treinamento prático direto com sócios e equipe em casos reais do dia a dia, acompanhado de manuais passo a passo e videoaulas exclusivas gravadas.',
    output: 'Time Treinado + Manuais & Aulas',
    icon: GraduationCap,
  },
  {
    num: '04',
    title: 'Autonomia',
    fullTitle: 'Consolidação e Acompanhamento',
    phase: 'Pós-entrega',
    desc: 'A operação segue independente com previsibilidade e suporte próximo para acompanhar ganhos de produtividade e evoluir conforme a empresa cresce.',
    output: 'Operação Sustentável e Própria',
    icon: CheckCircle2,
  },
];

const IMPACT_BARS = [
  { label: 'Sem 1', heightPct: 34, highlight: false, caption: 'Mapa' },
  { label: 'Sem 2', heightPct: 58, highlight: false, caption: 'Base' },
  { label: 'Sem 3', heightPct: 78, highlight: false, caption: 'Fluxos' },
  { label: 'Sem 4', heightPct: 100, highlight: true, caption: 'Rotina' },
];

export const MethodBentoSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [barsVisible, setBarsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setBarsVisible(true);
      return;
    }

    const metricsEl = el.querySelector('.method-bento-metrics');
    if (!metricsEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(metricsEl);

    return () => observer.disconnect();
  }, []);

  const current = METHOD_STEPS[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section id="metodo" ref={sectionRef} className="w-full py-24 md:py-32 px-4 sm:px-6 bg-[#F9F8F6]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-2.5">
            O Método XPND
          </span>
          <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight mb-4">
            Do zero à operação real{' '}
            <span className="text-[#8B746B]">em 4 etapas lineares.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#1A1817]/75 leading-relaxed">
            Processo desenhado para equipes sem perfil técnico adotarem inteligência artificial com clareza operacional e dados sob posse própria.
          </p>
        </div>

        {/* Top Row Bento: Interactive Step Window (Left) + Rising Bars & Metrics (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left Bento Window: Focus Menu Bottom Selector Style */}
          <div className="lg:col-span-7 xpnd-window rounded-[28px] p-6 sm:p-9 text-[#F9F8F6] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] border border-white/10 px-3 py-1 font-mono text-[11px] text-[#D4C0AC]">
                  <CurrentIcon size={13} />
                  <span>{current.phase}</span>
                </div>
                <span className="font-mono text-xs text-white/60">
                  Etapa {current.num} / 04
                </span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                {current.fullTitle}
              </h3>

              <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-6">
                {current.desc}
              </p>

              <div className="xpnd-window-panel rounded-2xl px-4 py-3.5 flex items-center justify-between gap-3 mb-8">
                <span className="text-xs font-mono uppercase tracking-wider text-white/55">
                  Entregável-chave
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#D4C0AC]">
                  {current.output}
                </span>
              </div>
            </div>

            {/* Bottom Step Menu Bar (Focus-menu selector inspiration) */}
            <div
              role="tablist"
              aria-label="Etapas do método XPND"
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-white/[0.08]"
            >
              {METHOD_STEPS.map((step, idx) => {
                const isActive = idx === activeStep;
                return (
                  <button
                    key={step.num}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveStep(idx)}
                    className={`rounded-2xl px-3 py-2.5 text-left transition-all duration-300 border ${
                      isActive
                        ? 'bg-[#F9F8F6] text-[#1A1817] border-[#F9F8F6] shadow-sm'
                        : 'bg-white/[0.03] text-white/70 border-white/[0.06] hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    <span
                      className={`block font-mono text-[10px] mb-0.5 ${
                        isActive ? 'text-[#8B746B]' : 'text-white/45'
                      }`}
                    >
                      {step.num}
                    </span>
                    <span className="block text-xs font-bold truncate">{step.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Bento Card: Rising Bars & Operational Benchmarks */}
          <div className="method-bento-metrics lg:col-span-5 rounded-[28px] bg-[#F3EFEA] border border-[#1A1817]/[0.08] p-6 sm:p-9 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-2">
                Curva de Adoção
              </span>
              <div className="flex items-baseline gap-2.5 mb-1">
                <span className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1A1817] tabular-nums">
                  4 sem
                </span>
                <span className="text-xs font-mono text-[#3F6A58] font-semibold">
                  até a rotina ativa
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5A58] leading-relaxed mb-8">
                Implementação enxuta do diagnóstico inicial à equipe operando os fluxos no dia a dia.
              </p>
            </div>

            {/* Rising Bar Chart Visual */}
            <div className="rounded-2xl bg-[#F9F8F6] border border-[#1A1817]/[0.07] p-5 mb-5">
              <div className="flex items-end justify-between gap-3 h-32 pt-4">
                {IMPACT_BARS.map((bar, idx) => (
                  <div key={bar.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="font-mono text-[10px] text-[#5C5A58]">
                      {bar.caption}
                    </span>
                    <div className="w-full max-w-[44px] h-20 rounded-xl bg-[#F3EFEA] flex items-end overflow-hidden p-0.5">
                      <div
                        className={`w-full rounded-[9px] transition-all duration-700 ease-apple ${
                          bar.highlight ? 'bg-[#8B746B]' : 'bg-[#1A1817]/80'
                        }`}
                        style={{
                          height: barsVisible ? `${bar.heightPct}%` : '12%',
                          transitionDelay: `${idx * 90}ms`,
                        }}
                      />
                    </div>
                    <span className="font-mono text-[10px] font-semibold text-[#1A1817]">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compact Odometer Pair */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#F9F8F6] border border-[#1A1817]/[0.07] p-4">
                <div className="font-sans text-2xl font-extrabold text-[#1A1817] tabular-nums">
                  0 código
                </div>
                <div className="text-[11px] font-mono text-[#5C5A58] mt-0.5">
                  exigido do seu time
                </div>
              </div>
              <div className="rounded-2xl bg-[#F9F8F6] border border-[#1A1817]/[0.07] p-4">
                <div className="font-sans text-2xl font-extrabold text-[#1A1817] tabular-nums">
                  100%
                </div>
                <div className="text-[11px] font-mono text-[#5C5A58] mt-0.5">
                  dados sob sua posse
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bento Row: 3 Scannable Principle Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-[24px] bg-[#F3EFEA] border border-[#1A1817]/[0.07] p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F9F8F6] text-[#8B746B] mb-4">
              <FileCode2 size={17} />
            </div>
            <h4 className="font-sans text-base font-bold text-[#1A1817] mb-1.5">
              Filosofia Bootstrap Enxuta
            </h4>
            <p className="text-xs sm:text-sm text-[#5C5A58] leading-relaxed">
              Priorizamos ferramentas abertas ou planos mínimos, reduzindo gastos com softwares ociosos em vez de inflar mensalidades.
            </p>
          </div>

          <div className="rounded-[24px] bg-[#F3EFEA] border border-[#1A1817]/[0.07] p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F9F8F6] text-[#8B746B] mb-4">
              <Layers3 size={17} />
            </div>
            <h4 className="font-sans text-base font-bold text-[#1A1817] mb-1.5">
              Sob Medida para 3–30 Pessoas
            </h4>
            <p className="text-xs sm:text-sm text-[#5C5A58] leading-relaxed">
              Fluxos desenhados para a realidade enxuta de PMEs consolidadas — sem burocracia de consultoria enterprise.
            </p>
          </div>

          <div className="rounded-[24px] bg-[#F3EFEA] border border-[#1A1817]/[0.07] p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F9F8F6] text-[#3F6A58] mb-4">
              <ShieldCheck size={17} />
            </div>
            <h4 className="font-sans text-base font-bold text-[#1A1817] mb-1.5">
              Manuais &amp; Videoaulas Próprias
            </h4>
            <p className="text-xs sm:text-sm text-[#5C5A58] leading-relaxed">
              Tudo fica documentado em guias passo a passo e vídeos curtos exclusivos para integração rápida de novos colaboradores.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodBentoSection;
