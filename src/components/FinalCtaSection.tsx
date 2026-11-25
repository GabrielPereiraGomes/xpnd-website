import React, { useState } from 'react';
import { siteConfig, buildWhatsAppUrl } from '../site.config';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Mail,
  Clock,
  ChevronDown,
} from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    segment: '',
    employees: '3 a 10 colaboradores',
    bottleneck: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildSummaryText = () =>
    [
      siteConfig.contacts.whatsappDefaultMessage,
      '',
      `Nome: ${formData.name}`,
      `WhatsApp: ${formData.phone}`,
      `Empresa: ${formData.company}`,
      `E-mail: ${formData.email || 'Não informado'}`,
      `Segmento: ${formData.segment || 'Não informado'}`,
      `Porte da equipe: ${formData.employees}`,
      `Principal gargalo: ${formData.bottleneck || 'Não informado'}`,
    ].join('\n');

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`Diagnóstico XPND — ${formData.company || formData.name}`);
    const body = encodeURIComponent(buildSummaryText());
    return `mailto:${siteConfig.contacts.emailGeneral}?subject=${subject}&body=${body}`;
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummaryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      if (siteConfig.rdStation.webhookUrl) {
        const res = await fetch(siteConfig.rdStation.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversion_identifier: siteConfig.rdStation.conversionIdentifier,
            ...formData,
          }),
        });
        if (!res.ok) {
          throw new Error('Webhook request failed');
        }
      } else {
        window.location.href = getMailtoUrl();
      }
      setSubmitted(true);
    } catch {
      setSubmitError(
        'Não foi possível enviar automaticamente. Finalize em 1 clique pelo WhatsApp ou pelo rascunho de e-mail abaixo.'
      );
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="w-full py-24 md:py-32 px-4 sm:px-6 bg-[#F3EFEA]">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[36px] bg-[#F9F8F6] p-6 sm:p-10 md:p-14 border border-[#1A1817]/[0.08] shadow-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: 45:00 Live Session Artifact (Halcy-inspired closer) + Direct Channels */}
            <div className="lg:col-span-5 xpnd-window rounded-[28px] p-6 sm:p-8 text-[#F9F8F6] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.08]">
                  <span className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#D4C0AC]">
                    <span className="h-2 w-2 rounded-full bg-[#3F6A58]" aria-hidden="true" />
                    Sessão de Diagnóstico
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 py-1 font-mono text-[11px] text-white/80">
                    <Clock size={12} className="text-[#D4C0AC]" />
                    <span>1-a-1</span>
                  </span>
                </div>

                {/* Big Focus-style 45:00 Session Clock */}
                <div className="mb-5">
                  <div className="font-sans text-5xl sm:text-6xl font-extrabold tracking-[-0.04em] text-white tabular-nums leading-none mb-2">
                    45:00
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Reunião executiva individual diretamente com o Gabriel para mapear gargalos, validar arquitetura privada e definir o melhor formato.
                  </p>
                </div>

                {/* Structured 3-Part Agenda */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] border border-white/[0.07] px-3.5 py-2.5 text-xs">
                    <span className="text-white/85">01. Mapeamento da rotina e custos</span>
                    <span className="font-mono text-[11px] text-[#D4C0AC] shrink-0 whitespace-nowrap">15 min</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] border border-white/[0.07] px-3.5 py-2.5 text-xs">
                    <span className="text-white/85">02. Desenho da arquitetura LGPD</span>
                    <span className="font-mono text-[11px] text-[#D4C0AC] shrink-0 whitespace-nowrap">15 min</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] border border-white/[0.07] px-3.5 py-2.5 text-xs">
                    <span className="text-white/85">03. Plano prático &amp; proposta sob medida</span>
                    <span className="font-mono text-[11px] text-[#D4C0AC] shrink-0 whitespace-nowrap">15 min</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <a
                  href={siteConfig.contacts.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-btn-pill flex h-[50px] items-center justify-center gap-2.5 rounded-full bg-[#F9F8F6] px-6 text-sm font-semibold text-[#1A1817] hover:bg-[#D4C0AC]"
                >
                  <MessageSquare size={17} />
                  <span>Conversar no WhatsApp</span>
                </a>

                <a
                  href={`mailto:${siteConfig.contacts.emailGeneral}`}
                  className="editorial-btn-pill flex h-[44px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 text-xs font-semibold text-white hover:bg-white/[0.12]"
                >
                  <Mail size={15} />
                  <span>{siteConfig.contacts.emailGeneral}</span>
                </a>

                <p className="text-[11px] text-white/55 text-center mt-1 font-mono">
                  Resposta rápida • Sigilo corporativo absoluto
                </p>
              </div>
            </div>

            {/* Right Column: Low-Friction Progressive Diagnostic Form */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {submitted ? (
                <div className="rounded-[24px] bg-[#F3EFEA] p-8 text-center animate-in fade-in duration-500 border border-[#1A1817]/[0.08]">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#3F6A58] text-white">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-[#1A1817] mb-2">
                    {siteConfig.rdStation.webhookUrl && !submitError
                      ? 'Solicitação enviada com sucesso'
                      : 'Resumo do diagnóstico pronto para envio'}
                  </h3>
                  <p className="text-sm text-[#1A1817]/75 leading-relaxed mb-6">
                    {submitError
                      ? submitError
                      : siteConfig.rdStation.webhookUrl
                        ? 'Recebemos seus dados e entraremos em contato em breve para agendar sua sessão de diagnóstico.'
                        : 'Caso seu aplicativo de e-mail não tenha aberto automaticamente, finalize agora em 1 clique pelo WhatsApp com suas respostas já preenchidas.'}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                    <a
                      href={buildWhatsAppUrl(buildSummaryText())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-btn-pill inline-flex items-center justify-center gap-2 rounded-full bg-[#1A1817] px-6 py-3 text-sm font-semibold text-[#F9F8F6] hover:bg-[#8B746B]"
                    >
                      <MessageSquare size={16} />
                      <span>Enviar pelo WhatsApp</span>
                    </a>

                    <a
                      href={getMailtoUrl()}
                      className="editorial-btn-pill inline-flex items-center justify-center gap-2 rounded-full border border-[#1A1817]/15 bg-white px-5 py-3 text-sm font-semibold text-[#1A1817] hover:bg-[#F9F8F6]"
                    >
                      <Mail size={16} />
                      <span>Abrir e-mail</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-xs font-mono text-[#5C5A58]">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-1.5 hover:text-[#1A1817] transition-colors"
                    >
                      {copied ? <Check size={14} className="text-[#3F6A58]" /> : <Copy size={14} />}
                      <span>{copied ? 'Resumo copiado!' : 'Copiar resumo'}</span>
                    </button>
                    <span aria-hidden="true">•</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setSubmitError(null);
                      }}
                      className="underline underline-offset-4 hover:text-[#1A1817] transition-colors"
                    >
                      Editar respostas
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-2">
                      Agendamento Rápido
                    </span>
                    <h2 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#1A1817] leading-tight mb-2">
                      Pronto para ver a IA{' '}
                      <span className="text-[#8B746B]">funcionando na sua rotina?</span>
                    </h2>
                    <p className="text-sm text-[#5C5A58]">
                      Preencha o essencial abaixo ou chame direto pelo WhatsApp ao lado.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="diag-name"
                          className="block text-xs font-mono font-medium text-[#5C5A58] uppercase tracking-wider mb-1.5"
                        >
                          Seu Nome *
                        </label>
                        <input
                          id="diag-name"
                          type="text"
                          name="name"
                          required
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ex: Carlos Silva"
                          className="w-full rounded-2xl border border-[#1A1817]/[0.12] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="diag-phone"
                          className="block text-xs font-mono font-medium text-[#5C5A58] uppercase tracking-wider mb-1.5"
                        >
                          WhatsApp *
                        </label>
                        <input
                          id="diag-phone"
                          type="tel"
                          name="phone"
                          required
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(47) 99999-9999"
                          className="w-full rounded-2xl border border-[#1A1817]/[0.12] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="diag-company"
                        className="block text-xs font-mono font-medium text-[#5C5A58] uppercase tracking-wider mb-1.5"
                      >
                        Nome da Empresa *
                      </label>
                      <input
                        id="diag-company"
                        type="text"
                        name="company"
                        required
                        autoComplete="organization"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nome da sua empresa"
                        className="w-full rounded-2xl border border-[#1A1817]/[0.12] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817]"
                      />
                    </div>

                    {/* Progressive Disclosure Toggle */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setShowDetails((prev) => !prev)}
                        aria-expanded={showDetails}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#8B746B] hover:text-[#1A1817] transition-colors py-1"
                      >
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`}
                        />
                        <span>
                          {showDetails
                            ? 'Ocultar contexto adicional'
                            : 'Adicionar e-mail, porte e principal gargalo (opcional)'}
                        </span>
                      </button>
                    </div>

                    {showDetails && (
                      <div className="space-y-4 pt-1 border-t border-[#1A1817]/[0.07]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                          <div>
                            <label
                              htmlFor="diag-email"
                              className="block text-xs font-mono font-medium text-[#5C5A58] uppercase tracking-wider mb-1.5"
                            >
                              E-mail Corporativo
                            </label>
                            <input
                              id="diag-email"
                              type="email"
                              name="email"
                              autoComplete="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="carlos@suaempresa.com.br"
                              className="w-full rounded-2xl border border-[#1A1817]/[0.12] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817]"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="diag-employees"
                              className="block text-xs font-mono font-medium text-[#5C5A58] uppercase tracking-wider mb-1.5"
                            >
                              Porte da Equipe
                            </label>
                            <select
                              id="diag-employees"
                              name="employees"
                              value={formData.employees}
                              onChange={handleChange}
                              className="w-full rounded-2xl border border-[#1A1817]/[0.12] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817]"
                            >
                              <option value="3 a 10 colaboradores">3 a 10 colaboradores</option>
                              <option value="11 a 30 colaboradores">11 a 30 colaboradores</option>
                              <option value="Mais de 30 colaboradores">Mais de 30 colaboradores</option>
                              <option value="Abaixo de 3 colaboradores">Abaixo de 3 colaboradores</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="diag-segment"
                            className="block text-xs font-mono font-medium text-[#5C5A58] uppercase tracking-wider mb-1.5"
                          >
                            Segmento de Atuação
                          </label>
                          <input
                            id="diag-segment"
                            type="text"
                            name="segment"
                            value={formData.segment}
                            onChange={handleChange}
                            placeholder="Ex: Advocacia, Imobiliária, B2B"
                            className="w-full rounded-2xl border border-[#1A1817]/[0.12] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817]"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="diag-bottleneck"
                            className="block text-xs font-mono font-medium text-[#5C5A58] uppercase tracking-wider mb-1.5"
                          >
                            Principal gargalo operacional hoje
                          </label>
                          <textarea
                            id="diag-bottleneck"
                            name="bottleneck"
                            rows={2}
                            value={formData.bottleneck}
                            onChange={handleChange}
                            placeholder="Ex: Atendimento repetitivo, propostas lentas, dados dispersos..."
                            className="w-full rounded-2xl border border-[#1A1817]/[0.12] bg-white px-4 py-3 text-sm text-[#1A1817] outline-none transition-colors focus:border-[#1A1817] resize-none"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="editorial-btn-pill flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#1A1817] font-semibold text-sm sm:text-base text-[#F9F8F6] shadow-sm hover:bg-[#8B746B] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? 'Preparando envio...' : 'Solicitar Sessão de Diagnóstico'}</span>
                      <Send size={16} />
                    </button>

                    <p className="text-[11px] text-[#5C5A58] text-center font-mono">
                      Seus dados nunca serão compartilhados. Atendimento confidencial sob LGPD.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
