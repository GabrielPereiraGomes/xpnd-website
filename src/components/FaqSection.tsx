import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Nossa equipe não tem perfil técnico. Vamos conseguir operar os assistentes de IA?',
      a: 'Com certeza. Toda a infraestrutura é desenhada exatamente para quem não programa. Seu time não precisa aprender comandos complexos nem jargões técnicos: a interação acontece em português natural, diretamente nas interfaces que sua equipe já utiliza no dia a dia. Além disso, conduzimos treinamentos práticos semanais e fornecemos manuais passo a passo.',
    },
    {
      q: 'Qual será o custo mensal de ferramentas de IA após a implementação?',
      a: 'Nossa filosofia é bootstrap puro: priorizamos sempre ferramentas gratuitas, robustas e de código aberto, ou planos básicos de custo extremamente baixo (geralmente entre zero e poucas dezenas de reais ao mês por usuário). Nossa meta prioritária é reduzir seus custos mensais de softwares esquecidos e otimizar o retorno sobre cada centavo investido.',
    },
    {
      q: 'Qual é o perfil e porte ideal de empresa para a assessoria?',
      a: 'Nosso foco prioritário são pequenas e médias empresas (PMEs) com 3 a 30 colaboradores — especialmente escritórios de advocacia, imobiliárias, construtoras, consultorias e prestadores de serviços B2B que possuem fluxos repetitivos, atendimento diário a clientes e lidam com informações que exigem sigilo.',
    },
    {
      q: 'Como funciona o primeiro passo e o que acontece na sessão de diagnóstico?',
      a: 'O primeiro contato é feito de forma ágil pela Lisa (nossa assistente de IA), que colhe as informações básicas da sua empresa e agenda uma reunião de 45 minutos diretamente com o Gabriel Pereira Gomes. Nessa sessão individual, mapeamos seus principais gargalos e apresentamos uma proposta sob medida — sem pressão e com total transparência.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-28 md:py-36 px-6 bg-[#F9F8F6]">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-3">
            Perguntas Frequentes
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight">
            Tudo o que você precisa saber antes de dar o próximo passo.
          </h2>
        </div>

        <div className="divide-y divide-[#1A1817]/[0.08]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6 sm:py-8 transition-colors">
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-base sm:text-lg font-bold text-[#1A1817] group-hover:text-[#8B746B] transition-colors">
                    {faq.q}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3EFEA] text-[#1A1817] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#1A1817] text-[#F9F8F6]' : ''
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 pr-10 text-sm sm:text-base leading-relaxed text-[#1A1817]/70 animate-in fade-in duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
