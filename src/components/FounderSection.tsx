import React from 'react';
import { Briefcase, Building2, TrendingUp, Sparkles } from 'lucide-react';

export const FounderSection: React.FC = () => {
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

  return (
    <section id="sobre" className="w-full py-28 md:py-36 px-6 bg-[#F3EFEA]">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm rounded-[32px] overflow-hidden bg-[#F9F8F6] border border-[#1A1817]/[0.08] p-8 shadow-subtle text-center">
              <div className="mx-auto mb-6 h-28 w-28 rounded-full overflow-hidden bg-[#E5D4C0]/40 border-2 border-[#D4C0AC] flex items-center justify-center">
                <img
                  src="/logos/xpnd_avatar_v1_ajustado.png"
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

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-3">
              Quem Conduz a Assessoria
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight mb-6">
              Experiência de quem já construiu e gerenciou empresas na prática.
            </h2>
            <p className="text-base sm:text-lg text-[#1A1817]/70 leading-relaxed mb-10">
              A XPND nasceu da constatação de que a maioria das soluções de IA no mercado é desenhada por quem nunca precisou gerenciar uma folha de pagamento, atender um cliente difícil ou entregar uma obra no prazo. Nós unimos pragmatismo comercial, bom gosto estético e tecnologia aplicada.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {credentials.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#8B746B] border border-[#1A1817]/[0.06]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-bold text-[#1A1817] mb-1">
                        {c.label}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#1A1817]/70 leading-relaxed">
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
