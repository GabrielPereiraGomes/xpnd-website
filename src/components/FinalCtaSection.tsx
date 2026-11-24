import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../site.config';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FinalCtaSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    segment: '',
    employees: '3 a 10 colaboradores',
    bottleneck: '',
  });

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Masked title reveal
      const lines = sectionRef.current?.querySelectorAll('.line-inner');
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { yPercent: 110, opacity: 0.01 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 86%',
              once: true,
            },
          }
        );
      }

      // Container GPU reveal
      const container = sectionRef.current?.querySelector('.cta-container');
      if (container) {
        gsap.fromTo(
          container,
          { opacity: 0, scale: 1.02, y: 24 },
          {
            opacity: 1,
            scale: 1.0,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Diagnóstico XPND — ${formData.company || formData.name}`);
    const body = encodeURIComponent(
      `Nome: ${formData.name}\nE-mail: ${formData.email}\nTelefone: ${formData.phone}\nEmpresa: ${formData.company}\nSegmento: ${formData.segment}\nColaboradores: ${formData.employees}\nPrincipal Gargalo: ${formData.bottleneck}\n`
    );
    window.location.href = `mailto:${siteConfig.contacts.emailLisa}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contato" ref={sectionRef} className="w-full py-28 md:py-36 px-6 bg-[#F3EFEA]">
      <div className="mx-auto max-w-5xl">
        <div className="cta-container gpu-layer rounded-[36px] bg-[#F9F8F6] p-8 sm:p-14 md:p-16 border border-[#1A1817]/[0.08] shadow-elevated">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Lisa Introduction & Direct Channels */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1A1817] px-3.5 py-1 text-xs font-semibold text-[#F9F8F6] uppercase tracking-wider mb-6">
                <span className="h-2 w-2 rounded-full bg-[#3F6A58] animate-pulse" />
                Agendamento com Lisa
              </div>

              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight mb-4">
                <span className="line-mask block">
                  <span className="line-inner block">
                    Pronto para ver a IA
                  </span>
                </span>
                <span className="line-mask block mt-1">
                  <span className="line-inner block text-[#8B746B]">
                    funcionando na sua rotina?
                  </span>
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#1A1817]/70 leading-relaxed mb-8">
                Fale diretamente com a <strong>Lisa</strong>, nossa assistente de Inteligência Artificial. Ela realizará uma triagem rápida das suas necessidades e agendará a sessão de diagnóstico com o Gabriel.
              </p>

              {/* Direct Quick Action Buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href={siteConfig.lisa.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-btn-pill flex items-center gap-3 rounded-full bg-[#1A1817] px-6 py-3.5 text-sm font-semibold text-[#F9F8F6] shadow-sm hover:bg-[#8B746B]"
                >
                  <MessageSquare size={17} />
                  <span>Conversar com a Lisa no WhatsApp</span>
                </a>

                <p className="text-[11px] text-[#1A1817]/50 text-center mt-2 font-mono">
                  Resposta instantânea • Atendimento sigiloso
                </p>
              </div>
            </div>

            {/* Right Column: Diagnostic Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="rounded-[24px] bg-[#F3EFEA] p-8 text-center animate-in fade-in duration-500">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#3F6A58] text-white">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-[#1A1817] mb-2">
                    Solicitação enviada com sucesso
                  </h3>
                  <p className="text-sm text-[#1A1817]/70 leading-relaxed">
                    A Lisa entrará em contato em breve no seu e-mail e WhatsApp para alinhar os detalhes da sessão de diagnóstico.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-[#1A1817]/70 uppercase tracking-wider mb-1.5">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ex: Carlos Silva"
                        className="w-full rounded-2xl border border-[#1A1817]/[0.1] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-[#1A1817]/70 uppercase tracking-wider mb-1.5">
                        E-mail Corporativo *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="carlos@suaempresa.com.br"
                        className="w-full rounded-2xl border border-[#1A1817]/[0.1] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-[#1A1817]/70 uppercase tracking-wider mb-1.5">
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(11) 99999-9999"
                        className="w-full rounded-2xl border border-[#1A1817]/[0.1] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-[#1A1817]/70 uppercase tracking-wider mb-1.5">
                        Nome da Empresa *
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nome da sua empresa"
                        className="w-full rounded-2xl border border-[#1A1817]/[0.1] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-[#1A1817]/70 uppercase tracking-wider mb-1.5">
                        Segmento de Atuação
                      </label>
                      <input
                        type="text"
                        name="segment"
                        value={formData.segment}
                        onChange={handleChange}
                        placeholder="Ex: Advocacia, Imobiliária, B2B"
                        className="w-full rounded-2xl border border-[#1A1817]/[0.1] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-[#1A1817]/70 uppercase tracking-wider mb-1.5">
                        Porte da Equipe
                      </label>
                      <select
                        name="employees"
                        value={formData.employees}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-[#1A1817]/[0.1] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817]"
                      >
                        <option value="3 a 10 colaboradores">3 a 10 colaboradores</option>
                        <option value="11 a 30 colaboradores">11 a 30 colaboradores</option>
                        <option value="Mais de 30 colaboradores">Mais de 30 colaboradores</option>
                        <option value="Abaixo de 3 colaboradores">Abaixo de 3 colaboradores</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-[#1A1817]/70 uppercase tracking-wider mb-1.5">
                      Qual é o principal gargalo operacional hoje?
                    </label>
                    <textarea
                      name="bottleneck"
                      rows={3}
                      value={formData.bottleneck}
                      onChange={handleChange}
                      placeholder="Ex: Atendimento repetitivo, demora na elaboração de propostas, dados desorganizados..."
                      className="w-full rounded-2xl border border-[#1A1817]/[0.1] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="editorial-btn-pill flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#1A1817] font-semibold text-sm sm:text-base text-[#F9F8F6] shadow-sm hover:bg-[#8B746B] pt-1"
                  >
                    <span>Solicitar Sessão de Diagnóstico</span>
                    <Send size={16} />
                  </button>

                  <p className="text-[11px] text-[#1A1817]/50 text-center font-mono">
                    Seus dados nunca serão compartilhados. Sigilo corporativo absoluto.
                  </p>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
