import React from 'react';
import { siteConfig } from '../site.config';
import { Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F9F8F6] border-t border-[#1A1817]/[0.06] py-16 px-6 text-[#1A1817]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#1A1817]/[0.06]">
          
          {/* Brand & Mission */}
          <div className="max-w-sm">
            <span className="font-sans font-extrabold text-2xl tracking-[-0.03em] text-[#1A1817] block mb-2">
              XPND
            </span>
            <p className="text-xs text-[#1A1817]/65 leading-relaxed">
              Assessoria privada de Inteligência Artificial para empresas de 3 a 30 colaboradores. Infraestrutura real, dados protegidos e estética executiva.
            </p>
          </div>

          {/* Contact Emails & Socials */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8B746B] block mb-3">
                Canais de Contato
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href={`mailto:${siteConfig.contacts.emailGeneral}`} className="hover:text-[#8B746B] transition-colors">
                    {siteConfig.contacts.emailGeneral}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.contacts.emailFounder}`} className="hover:text-[#8B746B] transition-colors">
                    {siteConfig.contacts.emailFounder}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.contacts.emailLisa}`} className="hover:text-[#8B746B] transition-colors">
                    {siteConfig.contacts.emailLisa} (Assistente IA)
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#1A1817]/50">
          <div>
            XPND © 2026. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacidade & LGPD</span>
            <span>•</span>
            <span>{siteConfig.brand.signatureDomain}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
