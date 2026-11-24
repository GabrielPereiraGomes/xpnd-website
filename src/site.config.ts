/**
 * XPND — Configuração Centralizada de Links, Contatos e Integrações
 * Todos os links externos, contatos da Lisa e webhooks devem ser editados aqui.
 */

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
    emailFounder: 'gabriel@xpnd.company',
    emailLisa: 'lisa@xpnd.company',
  },

  // Assistente Lisa (Triagem, WhatsApp e Agenda)
  lisa: {
    name: 'Lisa',
    title: 'Assistente de IA do Gabriel na XPND',
    description: 'Atua na triagem inicial, qualificação do seu perfil e agendamento direto com o Gabriel.',
    email: 'lisa@xpnd.company',
    // Link direto para WhatsApp com mensagem pré-formatada de diagnóstico
    whatsappUrl: 'https://wa.me/5547999999999?text=Ol%C3%A1%2C%20Lisa!%20Gostaria%20de%20entender%20como%20a%20XPND%20pode%20implantar%20Intelig%C3%AAncia%20Artificial%20na%20rotina%20da%20minha%20empresa.',
    // Link de agendamento de call (Cal.com / Google Calendar)
    bookingUrl: 'https://cal.com/xpnd/diagnostico',
  },

  // Redes Sociais Ativas (Dia 1: Apenas Instagram e YouTube)
  social: {
    instagram: 'https://instagram.com/xpnd.company',
    youtube: 'https://youtube.com/@xpndcompany',
  },

  // Integração Comercial com RD Station CRM (Webhook / Endpoint)
  rdStation: {
    conversionIdentifier: 'diagnostico-xpnd-site',
    webhookUrl: '', // Preencha com o Webhook do RD Station quando ativo
    fallbackMailto: 'lisa@xpnd.company',
  },

  // Sequência de Palavras da Rotação da Abertura (v3 — 7 Etapas)
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
    durationPerWord: 0.85,
    pauseBetweenWords: 0.8,
  },

  // Navegação Principal do Header
  navLinks: [
    { label: 'O Método', href: '#metodo' },
    { label: 'Formatos', href: '#formatos' },
    { label: 'Segurança', href: '#seguranca' },
    { label: 'Sobre', href: '#sobre' },
  ],
};

export default siteConfig;
