import React from 'react';
import { Shield, KeyRound, HardDrive, FileCheck } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityPillars = [
    {
      title: 'Memória Própria e Isolada',
      desc: 'Os dados do seu negócio, estratégias, contratos e dados de clientes nunca são utilizados para treinar modelos abertos ou públicos de terceiros.',
      icon: KeyRound,
    },
    {
      title: 'Backups Locais e Governança',
      desc: 'Rotinas estruturadas para manter cópias e históricos no controle exclusivo da sua empresa, garantindo conformidade com a LGPD e governança corporativa.',
      icon: HardDrive,
    },
    {
      title: 'Adequado a Setores Sensíveis',
      desc: 'Arquitetura validada para Escritórios de Advocacia, Imobiliárias, Construtoras e Prestadores B2B que lidam diariamente com informações confidenciais.',
      icon: FileCheck,
    },
  ];

  return (
    <section id="seguranca" className="w-full py-28 md:py-36 px-6 bg-[#F9F8F6]">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] bg-[#1A1817] text-[#F9F8F6] p-8 sm:p-14 md:p-16 relative overflow-hidden">
          {/* Subtle warm glow background inside dark container */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full opacity-15 blur-3xl"
            style={{ background: '#D4C0AC' }}
          />

          <div className="relative z-10 max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-[#D4C0AC] uppercase tracking-wider mb-6">
              <Shield size={14} className="text-[#D4C0AC]" />
              Segurança, Sigilo & LGPD
            </div>
            <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-tight text-white mb-6">
              Seus dados estratégicos sob seu controle absoluto.
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Sabemos que empresas consolidadas não podem arriscar segredos de negócio ou informações confidenciais de clientes. Por isso, toda a infraestrutura implementada pela XPND prioriza privacidade, sigilo contratual e conformidade legal.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
            {securityPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="flex flex-col">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#D4C0AC] mb-5">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-white mb-2 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {p.desc}
                  </p>
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
