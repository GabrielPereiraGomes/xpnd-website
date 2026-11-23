import React, { useState } from 'react';
import { Compass, Cpu, GraduationCap, CheckCircle2 } from 'lucide-react';

export const MethodSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Diagnóstico e Direção',
      subtitle: 'Mapeamento cirúrgico de gargalos e oportunidades',
      desc: 'Analisamos a rotina operacional da sua empresa para identificar onde o tempo e a margem estão escapando. Definimos quais áreas prioritárias receberão IA e selecionamos soluções enxutas, sem custos ocultos ou ferramentas desnecessárias.',
      tag: 'Fase 1 • Alinhamento',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Construção Assistida',
      subtitle: 'Estruturação da infraestrutura e assistentes próprios',
      desc: 'Implementamos assistentes virtuais de rotina configurados com o contexto, políticas e linguagem do seu negócio. As soluções contam com memória própria e rotinas de backup locais, garantindo sigilo corporativo absoluto.',
      tag: 'Fase 2 • Infraestrutura',
      icon: Cpu,
    },
    {
      num: '03',
      title: 'Treinamento Prático da Equipe',
      subtitle: 'Capacitação na tela, sem tecniquês e sem atrito',
      desc: 'Ensinamos seus sócios e colaboradores a operarem as novas ferramentas na rotina real de trabalho através de encontros práticos semanais, manuais operacionais passo a passo e videoaulas exclusivas de suporte gravadas para sua equipe.',
      tag: 'Fase 3 • Capacitação',
      icon: GraduationCap,
    },
    {
      num: '04',
      title: 'Autonomia e Acompanhamento',
      subtitle: 'Operação sustentável e suporte contínuo',
      desc: 'Sua empresa passa a operar com previsibilidade e independência. Realizamos o acompanhamento próximo dos indicadores de produtividade, tiramos dúvidas e garantimos que o sistema evolua com o crescimento do seu negócio.',
      tag: 'Fase 4 • Consolidação',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="metodo" className="w-full py-28 md:py-36 px-6 bg-[#F9F8F6]">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Title & Navigation on Desktop */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-3">
              O Método XPND
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight mb-6">
              Como tiramos sua empresa do zero à operação real.
            </h2>
            <p className="text-base text-[#1A1817]/70 leading-relaxed mb-8">
              Um processo estruturado em 4 etapas lineares para implementar inteligência artificial com segurança de dados, clareza operacional e adesão genuína da sua equipe.
            </p>

            {/* Step Indicators Desktop */}
            <div className="hidden lg:flex flex-col gap-3 border-l border-[#1A1817]/[0.1] pl-6">
              {steps.map((s, idx) => (
                <button
                  key={s.num}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left transition-all duration-300 py-1.5 flex items-center gap-3 ${
                    activeStep === idx
                      ? 'text-[#1A1817] font-bold translate-x-1'
                      : 'text-[#1A1817]/40 hover:text-[#1A1817]/80'
                  }`}
                >
                  <span className="font-mono text-xs">{s.num}</span>
                  <span className="text-sm">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Cards Stream */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`rounded-[28px] border p-8 sm:p-10 transition-all duration-500 ease-apple ${
                    activeStep === idx
                      ? 'bg-[#F3EFEA] border-[#1A1817]/[0.16] shadow-subtle'
                      : 'bg-white/80 border-[#1A1817]/[0.06] hover:border-[#1A1817]/[0.12]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex items-center rounded-full bg-[#1A1817] px-3 py-1 font-mono text-xs font-semibold text-[#F9F8F6]">
                      {step.num}
                    </span>
                    <span className="text-xs font-mono font-medium text-[#8B746B]">
                      {step.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E5D4C0]/40 text-[#8B746B]">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#1A1817]">
                      {step.title}
                    </h3>
                  </div>

                  <h4 className="text-sm font-semibold text-[#8B746B] mb-4">
                    {step.subtitle}
                  </h4>

                  <p className="text-sm sm:text-base leading-relaxed text-[#1A1817]/75">
                    {step.desc}
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

export default MethodSection;
