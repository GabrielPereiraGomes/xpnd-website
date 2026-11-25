import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { getLenis } from '../hooks/useLenisScroll';

interface DepthRingProps {
  percent: number;
  label: string;
  dark?: boolean;
}

const DepthRing: React.FC<DepthRingProps> = ({ percent, label, dark = false }) => {
  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative h-11 w-11 shrink-0 flex items-center justify-center">
        <svg className="h-11 w-11 -rotate-90" viewBox="0 0 46 46" aria-hidden="true">
          <circle
            cx="23"
            cy="23"
            r={radius}
            fill="none"
            stroke={dark ? 'rgba(255,255,255,0.14)' : 'rgba(26,24,23,0.1)'}
            strokeWidth="3.5"
          />
          <circle
            cx="23"
            cy="23"
            r={radius}
            fill="none"
            stroke={dark ? '#D4C0AC' : '#8B746B'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <span
          className={`absolute font-mono text-[10px] font-bold ${
            dark ? 'text-white' : 'text-[#1A1817]'
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export const FormatsSection: React.FC = () => {
  const scrollToContato = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const lenis = getLenis();
    const el = document.querySelector('#contato');
    if (lenis && el) {
      lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.05 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="formatos" className="w-full py-24 md:py-32 px-4 sm:px-6 bg-[#F9F8F6]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-2.5">
              Formatos de Atendimento
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight">
              Assessoria estruturada{' '}
              <span className="text-[#8B746B]">em dois formatos modulares.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#5C5A58] max-w-sm leading-relaxed">
            Sem pacotes genéricos. Escolha a profundidade certa para destravar sua operação ou reposicionar empresa e marca juntos.
          </p>
        </div>

        {/* 2 Format Cards with Focus-style Rings & Status Chips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Sprint IA */}
          <div className="editorial-card-hover flex flex-col justify-between rounded-[28px] bg-[#F3EFEA] p-7 sm:p-10 border border-[#1A1817]/[0.08]">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
                <div className="flex items-center gap-3">
                  <DepthRing percent={55} label="4s" />
                  <div>
                    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1A1817] border border-[#1A1817]/[0.08]">
                      Foco Operacional
                    </span>
                    <span className="block font-mono text-[11px] text-[#5C5A58] mt-1">
                      Ciclo direto • 4 Semanas
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3F6A58]/15 border border-[#3F6A58]/25 px-3 py-1 font-mono text-[11px] font-semibold text-[#3F6A58]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3F6A58]" aria-hidden="true" />
                  Pronto para operar
                </span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1817] mb-2.5">
                Sprint IA
              </h3>
              <p className="text-sm sm:text-base text-[#1A1817]/75 leading-relaxed mb-7">
                Para empresas com marca consolidada que precisam destravar atendimento, propostas e backoffice com IA privada em tempo recorde.
              </p>

              <div className="border-t border-[#1A1817]/[0.08] pt-6 mb-7">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#5C5A58] font-semibold mb-4">
                  Escopo incluído
                </h4>
                <ul className="space-y-3 text-sm text-[#1A1817]/85">
                  <li className="flex items-start gap-2.5">
                    <Check size={17} className="text-[#8B746B] shrink-0 mt-0.5" />
                    <span>Diagnóstico completo de gargalos e corte de excesso de ferramentas</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={17} className="text-[#8B746B] shrink-0 mt-0.5" />
                    <span>Assistentes privados configurados com políticas e tom de voz próprios</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={17} className="text-[#8B746B] shrink-0 mt-0.5" />
                    <span>Treinamento prático semanal com sócios e equipe + manual e videoaulas</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={17} className="text-[#8B746B] shrink-0 mt-0.5" />
                    <span>Isolamento de memória, backups locais e governança LGPD</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-5 border-t border-[#1A1817]/[0.08]">
              <a
                href="#contato"
                onClick={scrollToContato}
                className="editorial-btn-pill flex h-[52px] w-full items-center justify-center gap-2 rounded-full border border-[#1A1817]/[0.15] bg-white font-semibold text-sm text-[#1A1817] shadow-sm hover:bg-[#1A1817] hover:text-[#F9F8F6]"
              >
                <span>Solicitar diagnóstico para Sprint</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Card 2: Transformação Completa */}
          <div className="xpnd-window editorial-card-hover flex flex-col justify-between rounded-[28px] p-7 sm:p-10 text-[#F9F8F6]">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
                <div className="flex items-center gap-3">
                  <DepthRing percent={100} label="12s" dark />
                  <div>
                    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#D4C0AC] border border-white/10">
                      Operação + Presença Digital
                    </span>
                    <span className="block font-mono text-[11px] text-white/60 mt-1">
                      Ciclo completo • 8 a 12 Semanas
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4C0AC] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#1A1817]">
                  Mais Abrangente
                </span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2.5">
                Transformação Completa
              </h3>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-7">
                Para empresas que querem modernizar a operação interna e reposicionar marca, site e motor de conteúdo com padrão executivo.
              </p>

              <div className="border-t border-white/10 pt-6 mb-7">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#D4C0AC] font-semibold mb-4">
                  Tudo do Sprint IA mais
                </h4>
                <ul className="space-y-3 text-sm text-white/85">
                  <li className="flex items-start gap-2.5">
                    <Check size={17} className="text-[#D4C0AC] shrink-0 mt-0.5" />
                    <span>Redesenho e elevação estética da marca (Brand Book Mineral)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={17} className="text-[#D4C0AC] shrink-0 mt-0.5" />
                    <span>Construção ou modernização de site institucional de alta conversão</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={17} className="text-[#D4C0AC] shrink-0 mt-0.5" />
                    <span>Motor orgânico e esteira editorial proprietária de alta qualidade</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={17} className="text-[#D4C0AC] shrink-0 mt-0.5" />
                    <span>Acompanhamento consultivo direto por até 90 dias + auditorias mensais</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-5 border-t border-white/10">
              <a
                href="#contato"
                onClick={scrollToContato}
                className="editorial-btn-pill flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#F9F8F6] font-semibold text-sm text-[#1A1817] shadow-sm hover:bg-[#D4C0AC]"
              >
                <span>Solicitar diagnóstico para Transformação</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormatsSection;
