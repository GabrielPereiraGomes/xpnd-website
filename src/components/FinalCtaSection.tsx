import React, { useState } from 'react';
import { siteConfig } from '../site.config';
import { MessageSquare, Send, CheckCircle2, Calendar, Mail } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    segment: '',
    employees: '3 a 10 colaboradores',
    bottleneck: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prepara mensagem para envio direto para Lisa via mailto ou fallback
    const subject = encodeURIComponent(`Diagnóstico XPND — ${formData.company || formData.name}`);
    const body = encodeURIComponent(
      `Nome: ${formData.name}\nE-mail: ${formData.email}\nTelefone: ${formData.phone}\nEmpresa: ${formData.company}\nSegmento: ${formData.segment}\nColaboradores: ${formData.employees}\nPrincipal Gargalo: ${formData.bottleneck}\n`
    );
    window.location.href = `mailto:${siteConfig.contacts.emailLisa}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contato" className="w-full py-28 md:py-36 px-6 bg-[#F3EFEA]">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[36px] bg-[#F9F8F6] p-8 sm:p-14 md:p-16 border border-[#1A1817]/[0.08] shadow-elevated">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Lisa Introduction & Direct Channels */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1A1817] px-3.5 py-1 text-xs font-semibold text-[#F9F8F6] uppercase tracking-wider mb-6">
                <span className="h-2 w-2 rounded-full bg-[#3F6A58] animate-pulse" />
                Agendamento com Lisa
              </div>

              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight mb-4">
                Pronto para ver a IA funcionando na sua rotina?
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
                  className="flex items-center gap-3 rounded-full bg-[#1A1817] px-6 py-3.5 text-sm font-semibold text-[#F9F8F6] transition-all duration-300 hover:bg-[#8B746B] shadow-sm"
                >
                  <MessageSquare size={18} className="text-[#D4C0AC]" />
                  <span>Conversar com a Lisa no WhatsApp</span>
                </a>

                <a
                  href={siteConfig.lisa.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-full border border-[#1A1817]/[0.15] bg-white px-6 py-3.5 text-sm font-semibold text-[#1A1817] transition-all duration-300 hover:bg-[#F3EFEA]"
                >
                  <Calendar size={18} className="text-[#8B746B]" />
                  <span>Ver horários livres na agenda</span>
                </a>

                <a
                  href={`mailto:${siteConfig.contacts.emailLisa}`}
                  className="flex items-center gap-3 px-6 py-2 text-xs font-mono font-medium text-[#8B746B] hover:text-[#1A1817] transition-colors"
                >
                  <Mail size={14} />
                  <span>{siteConfig.contacts.emailLisa}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Pre-Diagnostic Form */}
            <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-8 border border-[#1A1817]/[0.06]">
              <h3 className="font-sans text-lg font-bold text-[#1A1817] mb-2">
                Formulário de Pré-Diagnóstico
              </h3>
              <p className="text-xs text-[#1A1817]/60 mb-6">
                Leva 1 minuto. Suas informações são confidenciais e protegidas por sigilo.
              </p>

              {submitted ? (
                <div className="rounded-[20px] bg-[#F3EFEA] p-8 text-center animate-in fade-in duration-500">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#3F6A58]/20 text-[#3F6A58]">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-sans text-lg font-bold text-[#1A1817] mb-2">
                    Pré-diagnóstico enviado!
                  </h4>
                  <p className="text-sm text-[#1A1817]/70 leading-relaxed mb-6">
                    A Lisa já recebeu seus dados e retornará por e-mail ou WhatsApp nas próximas horas para confirmar o horário da sua sessão com o Gabriel.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-[#8B746B] hover:underline"
                  >
                    Enviar outro contato
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1A1817]/80 mb-1.5">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ex.: Gabriel Silva"
                        className="w-full rounded-[14px] border border-[#1A1817]/[0.12] bg-[#F9F8F6] px-4 py-2.5 text-sm text-[#1A1817] focus:border-[#1A1817] focus:outline-none focus:ring-1 focus:ring-[#1A1817]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1A1817]/80 mb-1.5">
                        E-mail Corporativo *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nome@suaempresa.com.br"
                        className="w-full rounded-[14px] border border-[#1A1817]/[0.12] bg-[#F9F8F6] px-4 py-2.5 text-sm text-[#1A1817] focus:border-[#1A1817] focus:outline-none focus:ring-1 focus:ring-[#1A1817]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1A1817]/80 mb-1.5">
                        WhatsApp com DDD *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(47) 99999-9999"
                        className="w-full rounded-[14px] border border-[#1A1817]/[0.12] bg-[#F9F8F6] px-4 py-2.5 text-sm text-[#1A1817] focus:border-[#1A1817] focus:outline-none focus:ring-1 focus:ring-[#1A1817]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1A1817]/80 mb-1.5">
                        Nome da Empresa
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Sua Empresa"
                        className="w-full rounded-[14px] border border-[#1A1817]/[0.12] bg-[#F9F8F6] px-4 py-2.5 text-sm text-[#1A1817] focus:border-[#1A1817] focus:outline-none focus:ring-1 focus:ring-[#1A1817]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1A1817]/80 mb-1.5">
                        Segmento de Atuação
                      </label>
                      <input
                        type="text"
                        name="segment"
                        value={formData.segment}
                        onChange={handleChange}
                        placeholder="Ex.: Advocacia, Construtora..."
                        className="w-full rounded-[14px] border border-[#1A1817]/[0.12] bg-[#F9F8F6] px-4 py-2.5 text-sm text-[#1A1817] focus:border-[#1A1817] focus:outline-none focus:ring-1 focus:ring-[#1A1817]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1A1817]/80 mb-1.5">
                        Tamanho da Equipe
                      </label>
                      <select
                        name="employees"
                        value={formData.employees}
                        onChange={handleChange}
                        className="w-full rounded-[14px] border border-[#1A1817]/[0.12] bg-[#F9F8F6] px-4 py-2.5 text-sm text-[#1A1817] focus:border-[#1A1817] focus:outline-none focus:ring-1 focus:ring-[#1A1817]"
                      >
                        <option>3 a 10 colaboradores</option>
                        <option>11 a 20 colaboradores</option>
                        <option>21 a 30 colaboradores</option>
                        <option>Mais de 30 colaboradores</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1A1817]/80 mb-1.5">
                      Qual é o principal gargalo de tempo na sua rotina hoje?
                    </label>
                    <textarea
                      name="bottleneck"
                      rows={3}
                      value={formData.bottleneck}
                      onChange={handleChange}
                      placeholder="Ex.: Demora no atendimento de clientes, tarefas repetitivas de análise de documentos ou ferramentas que a equipe não usa..."
                      className="w-full rounded-[14px] border border-[#1A1817]/[0.12] bg-[#F9F8F6] px-4 py-2 text-sm text-[#1A1817] focus:border-[#1A1817] focus:outline-none focus:ring-1 focus:ring-[#1A1817] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full h-12 items-center justify-center gap-2 rounded-full bg-[#1A1817] font-semibold text-sm text-[#F9F8F6] transition-all duration-300 hover:bg-[#8B746B] shadow-sm"
                  >
                    <span>Enviar para a Lisa agendar com Gabriel</span>
                    <Send size={15} />
                  </button>
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
