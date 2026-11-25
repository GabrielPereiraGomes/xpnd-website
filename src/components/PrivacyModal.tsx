import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../site.config';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1817]/60 backdrop-blur-sm p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[28px] bg-[#F9F8F6] border border-[#1A1817]/10 p-6 sm:p-8 shadow-elevated text-[#1A1817]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3EFEA] text-[#3F6A58]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#8B746B] block">
                LGPD &amp; Confidencialidade
              </span>
              <h2 id="privacy-modal-title" className="font-sans text-xl sm:text-2xl font-extrabold tracking-tight text-[#1A1817]">
                Política de Privacidade e Sigilo
              </h2>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar política de privacidade"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3EFEA] text-[#1A1817] transition-colors hover:bg-[#1A1817] hover:text-[#F9F8F6]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-[#1A1817]/80">
          <p>
            A <strong>XPND</strong> trata todas as informações enviadas por este site em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD) e sob compromisso estrito de confidencialidade corporativa.
          </p>

          <div>
            <h3 className="font-sans font-bold text-[#1A1817] mb-1">1. Dados coletados no diagnóstico</h3>
            <p>
              Quando você preenche o formulário de diagnóstico ou inicia uma conversa pelo WhatsApp, coletamos apenas as informações que você opta por compartilhar: nome, e-mail corporativo, telefone/WhatsApp, nome da empresa, segmento, porte aproximado da equipe e descrição do gargalo operacional.
            </p>
          </div>

          <div>
            <h3 className="font-sans font-bold text-[#1A1817] mb-1">2. Finalidade exclusiva</h3>
            <p>
              Esses dados são utilizados unicamente para analisar o contexto da sua operação, entrar em contato e conduzir a sessão de diagnóstico e eventual proposta de assessoria. Não vendemos, alugamos ou compartilhamos seus dados ou o contexto do seu negócio com terceiros, concorrentes ou plataformas públicas de IA.
            </p>
          </div>

          <div>
            <h3 className="font-sans font-bold text-[#1A1817] mb-1">3. Retenção, correção e exclusão</h3>
            <p>
              Você pode solicitar acesso, atualização ou exclusão definitiva dos seus dados a qualquer momento enviando um e-mail para{' '}
              <a
                href={`mailto:${siteConfig.contacts.emailGeneral}`}
                className="font-semibold text-[#1A1817] underline underline-offset-4 hover:text-[#8B746B]"
              >
                {siteConfig.contacts.emailGeneral}
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="editorial-btn-pill rounded-full bg-[#1A1817] px-6 py-2.5 text-sm font-semibold text-[#F9F8F6] hover:bg-[#8B746B]"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
