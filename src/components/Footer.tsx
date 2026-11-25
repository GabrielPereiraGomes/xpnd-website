import React, { useState } from 'react';
import { siteConfig } from '../site.config';
import { Instagram, Youtube } from 'lucide-react';
import { PrivacyModal } from './PrivacyModal';

export const Footer: React.FC = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer className="w-full bg-[#F9F8F6] border-t border-[#1A1817]/[0.06] py-16 px-6 text-[#1A1817]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#1A1817]/[0.06]">
          
          {/* Brand & Mission */}
          <div className="max-w-sm">
            <img
              src="/assets/xpnd_flat_carbon.svg"
              alt="XPND"
              width={3112}
              height={1360}
              className="h-9 w-auto -ml-[6px] mb-1 select-none"
            />
            <p className="text-xs text-[#1A1817]/65 leading-relaxed">
              Assessoria privada de Inteligência Artificial para empresas de 3 a 30 colaboradores. Infraestrutura real, dados protegidos e estética executiva.
            </p>
          </div>

          {/* Contact Channels & Socials */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-3">
                Canais de Contato
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href={`mailto:${siteConfig.contacts.emailGeneral}`}
                    className="hover:text-[#8B746B] transition-colors"
                  >
                    {siteConfig.contacts.emailGeneral}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-3">
                Conteúdo & Redes
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3EFEA] text-[#1A1817] transition-all hover:bg-[#1A1817] hover:text-[#F9F8F6]"
                  aria-label="Instagram da XPND"
                >
                  <Instagram size={17} />
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3EFEA] text-[#1A1817] transition-all hover:bg-[#1A1817] hover:text-[#F9F8F6]"
                  aria-label="Canal do YouTube da XPND"
                >
                  <Youtube size={17} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#5C5A58]">
          <div>
            XPND © 2026. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-[#1A1817] underline underline-offset-4 transition-colors"
            >
              Privacidade &amp; LGPD
            </button>
            <span aria-hidden="true">•</span>
            <span>{siteConfig.brand.signatureDomain}</span>
          </div>
        </div>
        <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />

      </div>
    </footer>
  );
};

export default Footer;
