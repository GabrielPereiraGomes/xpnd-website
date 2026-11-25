import React, { useState } from 'react';
import { Briefcase, Building2, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { xpndAvatarFounderUrl } from '../assets/images';

const CREDENTIALS = [
  {
    metric: '+25 anos',
    label: 'Vendas & Negociação',
    desc: 'Atuação contínua em negociações consultivas, grandes contas, mídia e fechamentos de alto valor.',
    icon: Briefcase,
  },
  {
    metric: '10 anos',
    label: 'Gestão Empresarial Real',
    desc: 'Sócio-proprietário de imobiliária e construtora com 4 empreendimentos entregues em Gaspar/SC.',
    icon: Building2,
  },
  {
    metric: '4 anos',
    label: 'Operação Digital de Escala',
    desc: 'Liderança comercial e closer em uma das maiores operações digitais do país com metas superadas.',
    icon: TrendingUp,
  },
  {
    metric: '1-a-1',
    label: 'Visão Executiva & Taste',
    desc: 'Publicitário (FURB), unindo rigor operacional, estética limpa e condução direta em cada cliente.',
    icon: Sparkles,
  },
];

const SCENARIOS = [
  {
    id: 'advocacia',
    sector: 'Escritórios de Advocacia',
    tag: 'Sigilo Contratual',
    before: 'Sócios perdiam horas revisando triagem inicial e minutas repetitivas sem poder usar nuvem pública.',
    after: 'Base jurídica isolada acelera resumos de autos, triagem de clientes e minutas padrão com controle local.',
    bars: [38, 62, 48, 84, 70, 92, 65, 80, 55, 88],
  },
  {
    id: 'imobiliario',
    sector: 'Imobiliárias & Construtoras',
    tag: 'Velocidade Comercial',
    before: 'Atendimento de leads frio fora do horário e memória comercial espalhada entre corretores.',
    after: 'Pré-atendimento qualifica perfil de imóvel na hora e organiza histórico direto para fechamento.',
    bars: [45, 76, 58, 90, 66, 84, 72, 95, 62, 86],
  },
  {
    id: 'b2b',
    sector: 'Serviços & Consultorias B2B',
    tag: 'Margem Operacional',
    before: 'Demora de dias para transformar reunião de levantamento em proposta comercial estruturada.',
    after: 'Assistente treinado nas regras da empresa gera escopo preliminar em minutos mantendo o padrão dos sócios.',
    bars: [50, 68, 74, 88, 60, 82, 91, 76, 64, 90],
  },
];

export const FounderSection: React.FC = () => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const activeScenario = SCENARIOS[activeScenarioIdx];

  return (
    <section id="sobre" className="w-full py-24 md:py-32 px-4 sm:px-6 bg-[#F3EFEA]">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* Top Row: Founder Card + Credentials Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Founder Profile Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="editorial-card-hover relative w-full max-w-md rounded-[32px] overflow-hidden bg-[#F9F8F6] border border-[#1A1817]/[0.08] p-8 shadow-subtle text-center">
              <div className="mx-auto mb-5 h-28 w-28 rounded-full overflow-hidden bg-[#E5D4C0]/40 border-2 border-[#D4C0AC] flex items-center justify-center">
                <img
                  src={xpndAvatarFounderUrl}
                  alt="Gabriel Pereira Gomes — Fundador da XPND"
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="font-sans text-xl font-bold text-[#1A1817] mb-1">
                Gabriel Pereira Gomes
              </h3>
              <p className="text-xs font-mono font-medium text-[#8B746B] uppercase tracking-wider mb-4">
                Fundador da XPND
              </p>
              <p className="text-xs sm:text-sm text-[#1A1817]/75 leading-relaxed mb-6">
                Publicitário, empreendedor e consultor de negócios. Conduz pessoalmente cada diagnóstico e lidera a arquitetura de IA implementada nos clientes.
              </p>

              <div className="inline-flex items-center gap-2 rounded-full bg-[#F3EFEA] px-4 py-1.5 text-xs font-semibold text-[#1A1817]/80">
                <span className="h-2 w-2 rounded-full bg-[#3F6A58]" aria-hidden="true" />
                <span>Atendimento Direto 1-a-1</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative + Stat Cards Bento */}
          <div className="lg:col-span-7">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-2.5">
              Quem Conduz
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight mb-5">
              Liderada por quem conhece{' '}
              <span className="text-[#8B746B]">a realidade de um negócio.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#1A1817]/75 leading-relaxed mb-7">
              A XPND une décadas de gestão real em empresas tradicionais e domínio prático de IA aplicada. Falamos a língua dos sócios e construímos sistemas focados em margem, clareza e produtividade sem tecniquês.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CREDENTIALS.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.label}
                    className="rounded-[22px] bg-[#F9F8F6] border border-[#1A1817]/[0.08] p-5 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-sans text-xl font-extrabold tracking-tight text-[#1A1817]">
                        {c.metric}
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3EFEA] text-[#8B746B]">
                        <Icon size={15} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#8B746B] mb-1">
                        {c.label}
                      </h4>
                      <p className="text-xs text-[#5C5A58] leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Interactive Bento: Applied Sector Scenarios Player */}
        <div className="xpnd-window rounded-[28px] p-6 sm:p-8 text-[#F9F8F6]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 mb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4C0AC] block mb-1">
                Aplicação por Segmento
              </span>
              <h3 className="font-sans text-lg sm:text-xl font-bold text-white">
                Onde a estrutura XPND gera impacto imediato
              </h3>
            </div>

            <div
              role="tablist"
              aria-label="Cenários por setor"
              className="inline-flex flex-wrap gap-1.5 rounded-2xl sm:rounded-full bg-white/[0.06] p-1 border border-white/[0.08]"
            >
              {SCENARIOS.map((sc, idx) => {
                const active = idx === activeScenarioIdx;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveScenarioIdx(idx)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ${
                      active
                        ? 'bg-[#F9F8F6] text-[#1A1817] shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {sc.sector}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4 xpnd-window-panel rounded-2xl p-5 flex items-center justify-between gap-4">
              <div>
                <span className="inline-block rounded-full bg-[#3F6A58]/25 border border-[#3F6A58]/40 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#9EE2C3] mb-2">
                  {activeScenario.tag}
                </span>
                <div className="font-sans text-base font-bold text-white">
                  {activeScenario.sector}
                </div>
              </div>
              <div className="flex items-end gap-1 h-10 shrink-0" aria-hidden="true">
                {activeScenario.bars.map((height, i) => (
                  <span
                    key={`${activeScenario.id}-${i}`}
                    className="xpnd-eq-bar w-1 rounded-full bg-[#D4C0AC]"
                    style={{
                      height: `${height}%`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-4">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-white/50 mb-1.5">
                  Cenário Anterior
                </span>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  {activeScenario.before}
                </p>
              </div>
              <div className="rounded-2xl bg-[#D4C0AC]/10 border border-[#D4C0AC]/25 p-4">
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#D4C0AC] mb-1.5">
                  <span>Depois com a XPND</span>
                  <ArrowRight size={11} />
                </span>
                <p className="text-xs sm:text-sm text-white leading-relaxed">
                  {activeScenario.after}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
