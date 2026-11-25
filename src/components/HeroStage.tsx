import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../site.config';
import {
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Users,
  CheckCircle2,
  Lock,
  Sparkles,
  FileText,
  MessageSquare,
} from 'lucide-react';
import gsap from 'gsap';
import { getLenis } from '../hooks/useLenisScroll';

interface HeroStageProps {
  onAnimationComplete?: () => void;
}

type DemoTabKey = 'triagem' | 'propostas' | 'cofre';

const DEMO_TABS: {
  key: DemoTabKey;
  label: string;
  title: string;
  status: string;
  metricValue: string;
  metricLabel: string;
  summary: string;
  items: { tag: string; text: string; state: string }[];
  cursorPos: { x: string; y: string };
}[] = [
  {
    key: 'triagem',
    label: 'Triagem',
    title: 'Assistente Comercial Privado',
    status: 'Operando na rotina',
    metricValue: '14h',
    metricLabel: 'recuperadas / semana',
    summary: 'Qualifica leads recebidos pelo WhatsApp com os critérios e tom de voz da empresa.',
    items: [
      { tag: 'Lead #42', text: 'Empresa B2B • 18 colaboradores • Faturamento validado', state: 'Qualificado' },
      { tag: 'Contexto', text: 'Histórico organizado em CRM e encaminhado ao sócio responsável', state: 'Pronto' },
    ],
    cursorPos: { x: '22%', y: '18%' },
  },
  {
    key: 'propostas',
    label: 'Propostas',
    title: 'Gerador de Escopo & Propostas',
    status: 'Modelo interno validado',
    metricValue: '45s',
    metricLabel: 'do áudio de reunião à minuta',
    summary: 'Transforma notas de diagnóstico em proposta comercial padronizada sem inventar valores.',
    items: [
      { tag: 'Escopo', text: 'Premissas, cronograma em 4 etapas e entregáveis preenchidos', state: 'Revisado' },
      { tag: 'Padrão', text: 'Identidade visual e linguagem executiva aplicada na saída', state: 'Aprovado' },
    ],
    cursorPos: { x: '50%', y: '18%' },
  },
  {
    key: 'cofre',
    label: 'Memória LGPD',
    title: 'Cofre Isolado Corporativo',
    status: 'Zero treino público',
    metricValue: '100%',
    metricLabel: 'controle e backup local',
    summary: 'Contratos, políticas e dados de clientes ficam retidos no ambiente privado do negócio.',
    items: [
      { tag: 'Política', text: 'Permissões segmentadas entre sócios, jurídico e equipe comercial', state: 'Ativo' },
      { tag: 'Backup', text: 'Snapshot diário versionado sob governança direta da empresa', state: 'Seguro' },
    ],
    cursorPos: { x: '80%', y: '18%' },
  },
];

export const HeroStage: React.FC<HeroStageProps> = ({ onAnimationComplete }) => {
  const {
    words,
    initialDelay = 0.15,
    durationPerWord = 0.28,
    pauseBetweenWords = 0.16,
  } = siteConfig.heroAnimation;

  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Rotação compacta da palavra-chave no lockup XPND.[...] -> XPND.Company
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      words.forEach((_, idx) => {
        const el = wordRefs.current[idx];
        if (el) {
          gsap.set(el, {
            yPercent: idx === words.length - 1 ? 0 : 100,
            opacity: idx === words.length - 1 ? 1 : 0,
          });
        }
      });
      if (onAnimationComplete) onAnimationComplete();
      return;
    }

    words.forEach((_, idx) => {
      const el = wordRefs.current[idx];
      if (el) {
        gsap.set(el, {
          yPercent: idx === 0 ? 0 : -100,
          opacity: idx === 0 ? 1 : 0,
        });
      }
    });

    const tl = gsap.timeline({
      delay: initialDelay,
      onComplete: () => {
        if (onAnimationComplete) onAnimationComplete();
      },
    });

    for (let i = 0; i < words.length - 1; i++) {
      const currentEl = wordRefs.current[i];
      const nextEl = wordRefs.current[i + 1];
      const stepLabel = `hero-word-${i}`;

      tl.to({}, { duration: pauseBetweenWords });
      tl.to(currentEl, { yPercent: 100, opacity: 0, duration: durationPerWord, ease: 'power3.out' }, stepLabel);
      tl.to(nextEl, { yPercent: 0, opacity: 1, duration: durationPerWord, ease: 'power3.out' }, stepLabel);
    }

    return () => {
      tl.kill();
    };
  }, [words, initialDelay, durationPerWord, pauseBetweenWords, onAnimationComplete]);

  // Pausa auto-play quando fora da viewport
  useEffect(() => {
    const el = heroSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Ciclo ao vivo das abas da janela demonstrativa (estilo Halcy hero demo)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || userInteracted || !isHeroInView) return;

    const timer = window.setInterval(() => {
      setActiveTabIdx((prev) => (prev + 1) % DEMO_TABS.length);
    }, 3400);

    return () => window.clearInterval(timer);
  }, [userInteracted, isHeroInView]);

  const scrollTo = (selector: string) => {
    const lenis = getLenis();
    const el = document.querySelector(selector);
    if (lenis && el) {
      lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.05 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeDemo = DEMO_TABS[activeTabIdx];

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative w-full pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 px-4 sm:px-6 overflow-hidden bg-[#F9F8F6]"
    >
      {/* Warm Editorial Ambient Radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 72% 38%, rgba(212, 192, 172, 0.28) 0%, rgba(249, 248, 246, 0) 70%), radial-gradient(ellipse 55% 50% at 15% 85%, rgba(229, 212, 192, 0.22) 0%, rgba(249, 248, 246, 0) 70%)',
        }}
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Kinetic Mark + Headline + CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Compact XPND.Company Kinetic Lockup */}
            <div className="inline-flex items-center gap-3 rounded-full border border-[#1A1817]/[0.08] bg-[#F3EFEA] px-3.5 py-1.5 mb-6">
              <picture className="inline-flex items-center select-none pointer-events-none">
                <source srcSet="/assets/xpnd_logo_fluffy_pale_oak_v2.webp" type="image/webp" />
                <img
                  src="/assets/xpnd_logo_fluffy_pale_oak_v2_static.png"
                  alt="XPND"
                  width={120}
                  height={44}
                  className="h-5 w-auto object-contain"
                  loading="eager"
                  decoding="sync"
                />
              </picture>
              <span className="h-1 w-1 rounded-full bg-[#8B746B]" aria-hidden="true" />
              <div className="relative h-5 w-[108px] overflow-hidden font-sans text-xs font-bold text-[#1A1817]">
                {words.map((word, index) => (
                  <span
                    key={word}
                    ref={(el) => {
                      wordRefs.current[index] = el;
                    }}
                    className="absolute inset-0 flex items-center whitespace-nowrap opacity-0"
                    style={{ opacity: index === 0 ? 1 : 0 }}
                  >
                    {word}
                  </span>
                ))}
              </div>
              <span className="hidden sm:inline text-[11px] font-mono text-[#5C5A58] border-l border-[#1A1817]/15 pl-2.5">
                PMEs 3–30 pessoas
              </span>
            </div>

            <h1 className="font-sans text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-[-0.035em] leading-[1.06] text-[#1A1817] mb-5 text-balance">
              Sua empresa não precisa de mais ferramentas.{' '}
              <span className="text-[#8B746B]">
                Precisa de IA funcionando na rotina.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#1A1817]/75 leading-relaxed mb-8 max-w-xl">
              Tiramos operações consolidadas do uso amador até uma infraestrutura própria de Inteligência Artificial — com sigilo LGPD, treinamento prático e sem tecniquês.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3 mb-7">
              <a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contato');
                }}
                className="editorial-btn-pill group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#1A1817] px-6 text-sm font-semibold text-[#F9F8F6] shadow-sm hover:bg-[#8B746B] whitespace-nowrap"
              >
                <span>Agendar diagnóstico</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
              </a>
              <a
                href="#sistema"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#sistema');
                }}
                className="editorial-btn-pill inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-[#1A1817]/[0.14] bg-white/80 px-5 text-sm font-semibold text-[#1A1817] hover:bg-[#F3EFEA] whitespace-nowrap"
              >
                <span>Ver o sistema</span>
                <ArrowDown size={15} className="shrink-0" />
              </a>
            </div>

            {/* Compact Proof Bar */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#5C5A58]">
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-[#8B746B]" />
                <span>Implementação conduzida 1-a-1</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#3F6A58]" />
                <span>Dados isolados e backups locais</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Looping Workspace Window */}
          <div className="lg:col-span-6">
            <div className="xpnd-window relative rounded-[28px] p-5 sm:p-7 text-[#F9F8F6] overflow-hidden">
              {/* Warm corner glow inside window */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
                style={{ background: '#D4C0AC' }}
              />

              {/* Window Chrome + Segmented Switch */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3F6A58]" aria-hidden="true" />
                  <span className="font-mono text-[11px] tracking-wider uppercase text-[#D4C0AC]">
                    xpnd.workspace
                  </span>
                </div>

                {/* Frosted Pill Control (interactive + auto-cycling) */}
                <div
                  role="tablist"
                  aria-label="Módulos do ambiente privado XPND"
                  className="inline-flex items-center rounded-full bg-white/[0.06] p-1 border border-white/[0.08]"
                >
                  {DEMO_TABS.map((tab, idx) => {
                    const isActive = idx === activeTabIdx;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => {
                          setUserInteracted(true);
                          setActiveTabIdx(idx);
                        }}
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-300 ${
                          isActive
                            ? 'bg-[#F9F8F6] text-[#1A1817] shadow-sm'
                            : 'text-white/65 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Module Body */}
              <div className="relative z-10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 xpnd-window-panel rounded-[20px] p-5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#D4C0AC] mb-2">
                      {activeDemo.key === 'triagem' && <MessageSquare size={13} />}
                      {activeDemo.key === 'propostas' && <FileText size={13} />}
                      {activeDemo.key === 'cofre' && <Lock size={13} />}
                      <span>{activeDemo.status}</span>
                    </div>
                    <h2 className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight">
                      {activeDemo.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/70 mt-1.5 max-w-sm leading-relaxed">
                      {activeDemo.summary}
                    </p>
                  </div>

                  <div className="shrink-0 sm:text-right border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-5">
                    <div className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-[#D4C0AC] tabular-nums">
                      {activeDemo.metricValue}
                    </div>
                    <div className="font-mono text-[11px] text-white/65 whitespace-nowrap">
                      {activeDemo.metricLabel}
                    </div>
                  </div>
                </div>

                {/* Live Activity Rows */}
                <div className="grid grid-cols-1 gap-2.5">
                  {activeDemo.items.map((item) => (
                    <div
                      key={item.tag}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] border border-white/[0.07] px-4 py-3"
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0">
                        <span className="shrink-0 rounded-md bg-[#D4C0AC]/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#D4C0AC]">
                          {item.tag}
                        </span>
                        <span className="text-xs text-white/85 leading-snug">
                          {item.text}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 shrink-0 rounded-full bg-[#3F6A58]/25 border border-[#3F6A58]/40 px-2.5 py-0.5 text-[11px] font-medium text-[#9EE2C3]">
                        <CheckCircle2 size={11} />
                        {item.state}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Window Footer Bar */}
                <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-white/55">
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#D4C0AC]" />
                    <span>Sem dependência de código pela sua equipe</span>
                  </span>
                  <span>
                    {userInteracted ? 'Modo manual' : 'Ciclo ao vivo'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroStage;
