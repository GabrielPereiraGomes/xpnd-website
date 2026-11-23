import React from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, Users } from 'lucide-react';

export const PromiseSection: React.FC = () => {
  return (
    <section
      id="promessa"
      className="relative w-full pt-28 pb-24 md:pt-36 md:pb-32 px-6 flex flex-col items-center justify-center text-center bg-[#F9F8F6]"
    >
      <div className="mx-auto max-w-4xl">
        {/* Editorial Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1A1817]/[0.08] bg-[#F3EFEA] px-4 py-1.5 mb-8 text-[11px] font-semibold tracking-wider uppercase text-[#8B746B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8B746B]"/>
          Assessoria Privada de Inteligência Artificial para Empresas
        </div>

        {/* H1 Bicolor Apple */}
        <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] leading-[1.12] mb-8 text-balance">
          <span className="text-[#1A1817] block sm:inline">Sua empresa não precisa de mais ferramentas.</span>{' '}
          <span className="text-[#8B746B] block sm:inline">Precisa de Inteligência Artificial funcionando na rotina.</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#1A1817]/70 mb-12">
          Ajudamos pequenas e médias empresas de <strong>3 a 30 colaboradores</strong> a saírem do zero ou do uso amador até terem infraestrutura própria de IA operando no dia a dia. Com total sigilo de dados, sem jargões e com uma marca à altura do seu valor.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#contato"
            className="group flex w-full sm:w-auto h-13 items-center justify-center gap-2 rounded-full bg-[#1A1817] px-8 text-sm sm:text-base font-semibold text-[#F9F8F6] transition-all duration-300 hover:bg-[#8B746B] hover:shadow-subtle"
          >
            Agendar sessão de diagnóstico
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#metodo"
            className="flex w-full sm:w-auto h-13 items-center justify-center gap-2 rounded-full border border-[#1A1817]/[0.12] bg-white/60 px-7 text-sm sm:text-base font-medium text-[#1A1817] transition-all duration-300 hover:bg-[#F3EFEA]"
          >
            Entender como funciona
            <ArrowDown size={15} />
          </a>
        </div>

        {/* Micro-proof Points */}
        <div className="flex items-center justify-center flex-wrap gap-4 text-xs font-medium text-[#1A1817]/60">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-[#8B746B]" />
            <span>Atendimento privado e personalizado</span>
          </div>
          <span className="hidden sm:inline text-[#1A1817]/25">•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#8B746B]" />
            <span>Vagas estritamente limitadas por ciclo</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
