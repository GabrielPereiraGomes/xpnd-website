import React, { useState } from 'react';
import { Shield, KeyRound, HardDrive, FileCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';

type SecurityMode = 'xpnd' | 'public';

const COMPARISON: Record<
  SecurityMode,
  {
    label: string;
    badge: string;
    summary: string;
    rows: { area: string; status: string; detail: string }[];
  }
> = {
  xpnd: {
    label: 'Arquitetura Privada XPND',
    badge: 'Governança Ativa',
    summary:
      'Seus contratos, estratégias comerciais e base de clientes permanecem isolados em ambiente privado, com controle de acesso e cópias locais.',
    rows: [
      {
        area: 'Treino de modelos externos',
        status: 'Bloqueado (0%)',
        detail: 'Seus prompts e documentos nunca alimentam modelos públicos.',
      },
      {
        area: 'Histórico & Memória',
        status: 'Isolado + Backup',
        detail: 'Snapshots locais mantidos sob custódia da sua empresa.',
      },
      {
        area: 'Acesso da Equipe',
        status: 'Segmentado LGPD',
        detail: 'Sócios e colaboradores acessam apenas o necessário por função.',
      },
    ],
  },
  public: {
    label: 'Uso Comum Sem Método',
    badge: 'Risco Operacional',
    summary:
      'Contas pessoais dispersas onde colaboradores colam contratos e planilhas financeiras sem políticas de retenção ou controle corporativo.',
    rows: [
      {
        area: 'Treino de modelos externos',
        status: 'Exposto por padrão',
        detail: 'Dados estratégicos podem entrar em ciclos de retenção de terceiros.',
      },
      {
        area: 'Histórico & Memória',
        status: 'Fragmentado',
        detail: 'Informação se perde em contas individuais quando alguém sai.',
      },
      {
        area: 'Acesso da Equipe',
        status: 'Sem governança',
        detail: 'Nenhum registro claro do que foi enviado ou quem acessou.',
      },
    ],
  },
};

const PILLARS = [
  {
    title: 'Memória Própria e Isolada',
    desc: 'Dados do negócio, contratos e clientes nunca são usados para treinar modelos abertos de terceiros.',
    icon: KeyRound,
  },
  {
    title: 'Backups Locais e LGPD',
    desc: 'Rotinas estruturadas para manter históricos sob controle exclusivo da empresa em conformidade legal.',
    icon: HardDrive,
  },
  {
    title: 'Validado para Setores Sensíveis',
    desc: 'Estrutura pensada para Advocacia, Imobiliárias, Construtoras e Prestadores B2B que exigem sigilo.',
    icon: FileCheck,
  },
];

export const SecuritySection: React.FC = () => {
  const [mode, setMode] = useState<SecurityMode>('xpnd');
  const active = COMPARISON[mode];

  return (
    <section id="seguranca" className="w-full py-24 md:py-32 px-4 sm:px-6 bg-[#F3EFEA]">
      <div className="mx-auto max-w-6xl">
        <div className="xpnd-window rounded-[32px] text-[#F9F8F6] p-6 sm:p-12 md:p-14 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-15 blur-3xl"
            style={{ background: '#D4C0AC' }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-12">
            {/* Left Copy */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-mono font-semibold text-[#D4C0AC] uppercase tracking-wider mb-5">
                <Shield size={13} className="text-[#D4C0AC]" />
                <span>Segurança, Sigilo &amp; LGPD</span>
              </div>

              <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] leading-tight text-white mb-4">
                Seus dados estratégicos sob{' '}
                <span className="text-[#D4C0AC]">controle absoluto.</span>
              </h2>

              <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-7">
                Empresas consolidadas não podem arriscar segredos comerciais ou prontuários de clientes. Compare como a estrutura privada XPND protege sua operação frente ao uso improvisado de IA:
              </p>

              {/* Architecture Mode Switch */}
              <div
                role="tablist"
                aria-label="Comparativo de arquitetura de segurança"
                className="inline-flex flex-wrap rounded-2xl sm:rounded-full bg-white/[0.06] p-1 border border-white/10"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'xpnd'}
                  onClick={() => setMode('xpnd')}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                    mode === 'xpnd'
                      ? 'bg-[#F9F8F6] text-[#1A1817] shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Arquitetura XPND
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'public'}
                  onClick={() => setMode('public')}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                    mode === 'public'
                      ? 'bg-[#D4C0AC] text-[#1A1817] shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  IA Pública Comum
                </button>
              </div>
            </div>

            {/* Right Interactive Audit Card */}
            <div className="lg:col-span-6 xpnd-window-panel rounded-[24px] p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.08]">
                <span className="font-sans text-base font-bold text-white">
                  {active.label}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold ${
                    mode === 'xpnd'
                      ? 'bg-[#3F6A58]/30 text-[#9EE2C3] border border-[#3F6A58]/40'
                      : 'bg-[#D4C0AC]/15 text-[#D4C0AC] border border-[#D4C0AC]/30'
                  }`}
                >
                  {mode === 'xpnd' ? <CheckCircle2 size={12} /> : <ShieldAlert size={12} />}
                  <span>{active.badge}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-5">
                {active.summary}
              </p>

              <div className="space-y-2.5">
                {active.rows.map((row) => (
                  <div
                    key={row.area}
                    className="rounded-2xl bg-black/25 border border-white/[0.07] p-3.5"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-white">
                        {row.area}
                      </span>
                      <span
                        className={`font-mono text-[11px] font-semibold ${
                          mode === 'xpnd' ? 'text-[#9EE2C3]' : 'text-[#D4C0AC]'
                        }`}
                      >
                        {row.status}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 leading-snug">{row.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3 Compact Pillars Footer */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[#D4C0AC]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-sans text-sm sm:text-base font-bold text-white mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
