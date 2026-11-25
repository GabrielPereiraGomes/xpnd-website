import React, { useState, useEffect, useRef } from 'react';
import { Layers, Bot, GraduationCap, Gauge, CheckCircle2, AlertTriangle, ArrowUpRight, type LucideIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../hooks/useLenisScroll';

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseModule {
  id: string;
  tabLabel: string;
  num: string;
  eyebrow: string;
  title: string;
  problemSolved: string;
  highlights: string[];
  windowTitle: string;
  windowBadge: string;
  windowHeadline: string;
  windowSub: string;
  rows: { left: string; right: string; tone?: 'ok' | 'muted' | 'accent' }[];
  icon: LucideIcon;
}

const MODULES: ShowcaseModule[] = [
  {
    id: 'gargalos',
    tabLabel: '01 Gargalos',
    num: '01',
    eyebrow: 'Diagnóstico de Rotina',
    title: 'Do excesso de ferramentas ao fluxo único.',
    problemSolved:
      'Sua empresa para de acumular assinaturas soltas que ninguém usa e passa a operar assistentes desenhados exatamente para onde tempo e margem escapam.',
    highlights: [
      'Corte de softwares redundantes e custos ocultos',
      'Mapeamento direto de atendimento, propostas e backoffice',
      'Priorização por retorno operacional imediato',
    ],
    windowTitle: 'auditoria.fluxos',
    windowBadge: 'Ruído eliminado',
    windowHeadline: '5 ferramentas dispersas → 1 rotina centralizada',
    windowSub: 'Consolidação orientada ao dia a dia sem trocar o time.',
    rows: [
      { left: 'Assinaturas isoladas sem processo', right: 'Substituídas', tone: 'muted' },
      { left: 'Atendimento & pré-triagem repetitiva', right: 'Automatizado', tone: 'ok' },
      { left: 'Propostas comerciais & atas de reunião', right: 'Padronizado', tone: 'ok' },
    ],
    icon: Layers,
  },
  {
    id: 'assistentes',
    tabLabel: '02 Assistentes',
    num: '02',
    eyebrow: 'Infraestrutura Própria',
    title: 'Assistentes configurados com a voz do negócio.',
    problemSolved:
      'Em vez de prompts genéricos copiados da internet, configuramos assistentes com suas políticas, tabela comercial, documentos e memória isolada.',
    highlights: [
      'Tom de voz e critérios reais da sua empresa',
      'Memória organizacional sem vazar contexto para terceiros',
      'Interação simples em português natural',
    ],
    windowTitle: 'assistente.comercial',
    windowBadge: 'Contexto proprietário',
    windowHeadline: 'Políticas internas + base técnica integradas',
    windowSub: 'Respostas consistentes alinhadas ao padrão dos sócios.',
    rows: [
      { left: 'Manual de atendimento & objeções', right: 'Carregado', tone: 'accent' },
      { left: 'Base de contratos e especificações', right: 'Indexado', tone: 'ok' },
      { left: 'Treinamento em modelos públicos externos', right: 'Bloqueado', tone: 'ok' },
    ],
    icon: Bot,
  },
  {
    id: 'treinamento',
    tabLabel: '03 Equipe',
    num: '03',
    eyebrow: 'Adesão Real',
    title: 'Treinamento na tela, sem tecniquês.',
    problemSolved:
      'Tecnologia parada não gera caixa. Conduzimos encontros práticos semanais com sócios e colaboradores até que o uso faça parte automática da semana.',
    highlights: [
      'Encontros práticos com casos reais da própria equipe',
      'Manuais operacionais passo a passo e objetivos',
      'Videoaulas exclusivas de consulta gravadas para novos membros',
    ],
    windowTitle: 'capacitacao.equipe',
    windowBadge: 'Zero dependência técnica',
    windowHeadline: 'Trilha prática por função (3 a 30 colaboradores)',
    windowSub: 'Cada área domina os fluxos que usa todos os dias.',
    rows: [
      { left: 'Diretoria & Sócios', right: 'Visão & Controle', tone: 'accent' },
      { left: 'Time Comercial & Atendimento', right: 'Playbook ativo', tone: 'ok' },
      { left: 'Administrativo & Operações', right: 'SOPs + Vídeos', tone: 'ok' },
    ],
    icon: GraduationCap,
  },
  {
    id: 'autonomia',
    tabLabel: '04 Autonomia',
    num: '04',
    eyebrow: 'Evolução Contínua',
    title: 'Governança clara e evolução independente.',
    problemSolved:
      'Você não fica refém de consultor para cada ajuste. Entregamos estrutura documentada, backups locais e acompanhamento próximo dos ganhos de margem.',
    highlights: [
      'Backups locais programados sob posse exclusiva da empresa',
      'Arquitetura enxuta estilo bootstrap de baixíssimo custo fixo',
      'Indicadores claros de tempo devolvido ao time',
    ],
    windowTitle: 'pulso.autonomia',
    windowBadge: 'Operação independente',
    windowHeadline: 'Equipe operando com previsibilidade própria',
    windowSub: 'Crescimento operacional sem inflar folha ou licenças.',
    rows: [
      { left: 'Custo mensal de ferramentas extras', right: 'Mínimo / Enxuto', tone: 'ok' },
      { left: 'Rotina semanal de backup local', right: 'Ativa', tone: 'ok' },
      { left: 'Suporte consultivo & revisão de métricas', right: 'Contínuo', tone: 'accent' },
    ],
    icon: Gauge,
  },
];

export const StickyShowcaseSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      ScrollTrigger.create({
        trigger: track,
        start: 'top top+=90',
        end: 'bottom bottom-=90',
        scrub: true,
        onUpdate: (self) => {
          const next = Math.min(
            MODULES.length - 1,
            Math.max(0, Math.floor(self.progress * MODULES.length))
          );
          setActiveIdx(next);
        },
      });
    });

    return () => mm.revert();
  }, []);

  const handleSelectModule = (idx: number) => {
    setActiveIdx(idx);
    const track = trackRef.current;
    if (!track || window.innerWidth < 1024) return;

    const rect = track.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
    const targetScroll = trackTop + (idx / MODULES.length) * scrollable + 20;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 0.75 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const active = MODULES[activeIdx];
  const ActiveIcon = active.icon;

  return (
    <section id="sistema" className="w-full bg-[#F3EFEA] px-4 sm:px-6 py-20 lg:py-0">
      <div ref={trackRef} className="mx-auto max-w-6xl lg:min-h-[260vh] lg:py-24">
        <div className="lg:sticky lg:top-24">
          {/* Header + Gliding Segmented Pill Switch (Halcy Widgets inspiration) */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-2.5">
                O Problema &amp; A Arquitetura
              </span>
              <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight">
                O problema não é falta de tecnologia.{' '}
                <span className="text-[#8B746B]">É falta de sistema na rotina.</span>
              </h2>
            </div>

            {/* Interactive Module Selector Tabs */}
            <div
              role="tablist"
              aria-label="Módulos do sistema XPND"
              className="inline-flex flex-wrap items-center gap-1 rounded-2xl sm:rounded-full bg-[#F9F8F6] p-1.5 border border-[#1A1817]/[0.08] shadow-subtle"
            >
              {MODULES.map((mod, idx) => {
                const isSelected = idx === activeIdx;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectModule(idx)}
                    className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#1A1817] text-[#F9F8F6] shadow-sm'
                        : 'text-[#5C5A58] hover:text-[#1A1817]'
                    }`}
                  >
                    {mod.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Stage Card Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-[32px] bg-[#F9F8F6] p-6 sm:p-10 lg:p-12 border border-[#1A1817]/[0.08] shadow-elevated">
            {/* Narrative Pane */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F3EFEA] px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#5E4B43]">
                <ActiveIcon size={14} className="text-[#8B746B]" />
                <span>{active.eyebrow}</span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1817] leading-snug">
                {active.title}
              </h3>

              <p className="text-sm sm:text-base text-[#1A1817]/75 leading-relaxed">
                {active.problemSolved}
              </p>

              <ul className="space-y-2.5 pt-2 border-t border-[#1A1817]/[0.07]">
                {active.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#1A1817]/85">
                    <CheckCircle2 size={16} className="text-[#3F6A58] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live System Artifact Window */}
            <div className="lg:col-span-7">
              <div className="xpnd-window rounded-[24px] p-6 sm:p-8 text-[#F9F8F6] relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-5 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D4C0AC]" aria-hidden="true" />
                    <span className="font-mono text-xs text-white/75">{active.windowTitle}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4C0AC]/15 border border-[#D4C0AC]/25 px-3 py-0.5 font-mono text-[11px] font-semibold text-[#D4C0AC] whitespace-nowrap">
                    {activeIdx === 0 && <AlertTriangle size={11} />}
                    {active.windowBadge}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5">
                    {active.windowHeadline}
                  </div>
                  <p className="text-xs sm:text-sm text-white/65">
                    {active.windowSub}
                  </p>
                </div>

                <div className="space-y-3">
                  {active.rows.map((row) => (
                    <div
                      key={row.left}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.04] border border-white/[0.07] px-4 py-3.5"
                    >
                      <span className="text-xs sm:text-sm text-white/85">{row.left}</span>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 font-mono text-[11px] font-semibold ${
                          row.tone === 'ok'
                            ? 'bg-[#3F6A58]/25 text-[#9EE2C3] border border-[#3F6A58]/40'
                            : row.tone === 'accent'
                              ? 'bg-[#D4C0AC]/20 text-[#D4C0AC] border border-[#D4C0AC]/35'
                              : 'bg-white/10 text-white/70 border border-white/15'
                        }`}
                      >
                        {row.right}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/55">
                  <span>Etapa {active.num} de 04 no fluxo XPND</span>
                  <a
                    href="#contato"
                    className="inline-flex items-center gap-1 text-[#D4C0AC] hover:text-white transition-colors"
                  >
                    <span>Mapear meu cenário</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop subtle scroll progress track */}
          <div className="hidden lg:flex items-center justify-between gap-4 mt-5 px-2">
            <span className="text-[11px] font-mono text-[#5C5A58]">
              Role para avançar ou clique nos módulos acima
            </span>
            <div className="flex items-center gap-1.5">
              {MODULES.map((m, idx) => (
                <span
                  key={m.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIdx ? 'w-8 bg-[#1A1817]' : 'w-2.5 bg-[#1A1817]/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyShowcaseSection;
