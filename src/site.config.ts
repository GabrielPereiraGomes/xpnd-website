/**
 * XPND — Configuração Centralizada de Links, Contatos e Integrações
 */

const WHATSAPP_NUMBER = '5547991247390';
const WHATSAPP_DEFAULT_MESSAGE =
  'Fala time da XPND, quero mais informações sobre a consultoria em IA';

export const buildWhatsAppUrl = (customMessage?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    customMessage || WHATSAPP_DEFAULT_MESSAGE
  )}`;

export const siteConfig = {
  brand: {
    name: 'XPND',
    fullName: 'XPND',
    legalName: 'XPND',
    signatureDomain: 'XPND.COMPANY',
    domain: 'xpnd.company',
    tagline: 'Assessoria Privada de Inteligência Artificial para Empresas',
  },

  // Contatos Oficiais
  contacts: {
    emailGeneral: 'contato@xpnd.company',
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappDisplay: '(47) 99124-7390',
    whatsappDefaultMessage: WHATSAPP_DEFAULT_MESSAGE,
    whatsappUrl: buildWhatsAppUrl(),
  },

  // Redes Sociais Ativas
  social: {
    instagram: 'https://instagram.com/xpnd.company',
    youtube: 'https://youtube.com/@xpndcompany',
  },

  // Integração Comercial (Webhook / Endpoint opcional)
  rdStation: {
    conversionIdentifier: 'diagnostico-xpnd-site',
    webhookUrl: '',
    fallbackMailto: 'contato@xpnd.company',
  },

  // Sequência de Palavras da Rotação da Abertura
  heroAnimation: {
    words: [
      'AI',
      'Negócios',
      'Automações',
      'Agentes',
      'Taste',
      'Growth',
      'Company',
    ],
    finalSignature: 'Company',
    initialDelay: 0.15,
    durationPerWord: 0.28,
    pauseBetweenWords: 0.16,
  },

  // Navegação Principal do Header (ordem narrativa da página)
  navLinks: [
    { label: 'Sistema', href: '#sistema' },
    { label: 'Método', href: '#metodo' },
    { label: 'Segurança', href: '#seguranca' },
    { label: 'Formatos', href: '#formatos' },
    { label: 'Sobre', href: '#sobre' },
  ],
};

export default siteConfig;
