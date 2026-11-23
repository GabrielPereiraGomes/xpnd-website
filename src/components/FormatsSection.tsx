import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export const FormatsSection: React.FC = () => {
  return (
    <section id="formatos" className="w-full py-28 md:py-36 px-6 bg-[#F3EFEA]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-3">
            Formatos de Atendimento
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight mb-6">
            Assessoria estruturada em dois formatos modulares.
          </h2>
          <p className="text-base text-[#1A1817]/70 leading-relaxed">
            Sem pacotes genéricos. Escolha o nível de profundidade que seu momento empresarial exige.
          </p>
        </div>

        {/* 2 Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Sprint IA (4 Semanas) */}
          <div className="flex flex-col justify-between rounded-[28px] bg-[#F9F8F6] p-8 sm:p-12 border border-[#1A1817]/[0.08] transition-all duration-500 ease-apple hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center rounded-full bg-[#1A1817]/[0.06] px-3.5 py-1 text-xs font-semibold text-[#1A1817]">
                  Foco Operacional
                </span>
                <span className="font-mono text-xs text-[#8B746B] font-semibold">
                  4 Semanas
                </span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1817] mb-3">
                Sprint IA
              </h3>
              <p className="text-sm sm:text-base text-[#1A1817]/70 leading-relaxed mb-8">
                Ideal para empresas que já possuem marca consolidada e precisam destravar rapidamente a rotina operacional com inteligência artificial aplicada.
              </p>

              <div className="border-t border-[#1A1817]/[0.06] pt-8 mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#8B746B] font-semibold mb-5">
                  O que está incluído:
                </h4>
                <ul className="space-y-4 text-sm text-[#1A1817]/80">
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-[#8B746B] shrink-0 mt-0.5" />
                    <span>Diagnóstico completo de gargalos, processos e rotinas manuais</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-[#8B746B] shrink-0 mt-0.5" />
                    <span>Contextualização segura da sua empresa (políticas e tom de voz)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-[#8B746B] shrink-0 mt-0.5" />
                    <span>Implementação assistida de assistentes de rotina para atendimento e análise</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-[#8B746B] shrink-0 mt-0.5" />
                    <span>Treinamento prático semanal com sócios e equipe de colaboradores</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-[#8B746B] shrink-0 mt-0.5" />
                    <span>Manual operacional exclusivo e videoaulas de suporte gravadas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-[#8B746B] shrink-0 mt-0.5" />
                    <span>Configuração de isolamento de dados e backups locais (LGPD)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1A1817]/[0.06]">
              <a
                href="#contato"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#1A1817]/[0.15] bg-white font-semibold text-sm text-[#1A1817] transition-all duration-300 hover:bg-[#1A1817] hover:text-[#F9F8F6]"
              >
                Solicitar diagnóstico para Sprint
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Card 2: Transformação Completa XPND (8 a 12 Semanas — Destaque em Pale Oak) */}
          <div className="flex flex-col justify-between rounded-[28px] bg-[#D4C0AC]/35 p-8 sm:p-12 border border-[#8B746B]/30 relative transition-all duration-500 ease-apple hover:-translate-y-1 shadow-subtle">
            <div className="absolute top-6 right-8">
              <span className="inline-flex items-center rounded-full bg-[#1A1817] px-3.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-[#F9F8F6]">
                Mais Abrangente
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center rounded-full bg-[#8B746B]/15 px-3.5 py-1 text-xs font-semibold text-[#5E4B43]">
                  Operação + Presença Digital
                </span>
                <span className="font-mono text-xs text-[#8B746B] font-semibold pr-24">
                  8 a 12 Semanas
                </span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1817] mb-3">
                Transformação Completa XPND
              </h3>
              <p className="text-sm sm:text-base text-[#1A1817]/70 leading-relaxed mb-8">
                Para empresas que desejam uma reformulação completa: eficiência operacional máxima com IA e uma presença digital e visual de alto padrão executivo.
              </p>

              <div className="border-t border-[#8B746B]/20 pt-8 mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#5E4B43] font-semibold mb-5">
                  Tudo do Sprint IA, somado a:
                </h4>
                <ul className="space-y-4 text-sm text-[#1A1817]/85">
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-[#5E4B43] shrink-0 mt-0.5" />
                    <span><strong>Tudo incluído no Sprint IA</strong> (Diagnóstico + Infra + Treinamento)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-[#5E4B43] shrink-0 mt-0.5" />
                    <span>Criação do <strong>Brand Book Executivo</strong> da sua empresa (padrão anti-slop)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-[#5E4B43] shrink-0 mt-0.5" />
                    <span>Reestruturação completa de imagem e materiais institucionais</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-[#5E4B43] shrink-0 mt-0.5" />
                    <span>Desenvolvimento e publicação do <strong>novo site institucional</strong> de alto padrão</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="text-[#5E4B43] shrink-0 mt-0.5" />
                    <span>Acompanhamento direto e consultoria estratégica contínua com o fundador</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[#8B746B]/20">
              <a
                href="#contato"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1A1817] font-semibold text-sm text-[#F9F8F6] transition-all duration-300 hover:bg-[#8B746B]"
              >
                Candidatar minha empresa
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <p className="mt-12 text-center text-xs font-medium text-[#1A1817]/60">
          Nota: Aceitamos um número reduzido de empresas por ciclo trimestral para garantir entrega com excelência e overdelivery.
        </p>
      </div>
    </section>
  );
};

export default FormatsSection;
