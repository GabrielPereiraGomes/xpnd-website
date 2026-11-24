import React, { useState } from 'react';
import Header from './components/Header';
import HeroStage from './components/HeroStage';
import PromiseSection from './components/PromiseSection';
import DiagnosisGrid from './components/DiagnosisGrid';
import MethodSection from './components/MethodSection';
import FormatsSection from './components/FormatsSection';
import SecuritySection from './components/SecuritySection';
import FounderSection from './components/FounderSection';
import FaqSection from './components/FaqSection';
import FinalCtaSection from './components/FinalCtaSection';
import Footer from './components/Footer';
import { useLenisScroll } from './hooks/useLenisScroll';

export const App: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(true);

  // Engine de Scroll Fluido Lenis integrado ao GSAP Ticker
  // Desktop: 0.085 lerp, smoothWheel: true
  // Mobile: syncTouch: false (respeita física nativa de toque no iOS/Android)
  useLenisScroll();

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1817] font-sans selection:bg-[#8B746B] selection:text-[#F9F8F6] overflow-x-hidden">
      {/* 0. Header Minimalista Sticky (~56px, blur translúcido + links com animated underline) */}
      <Header visible={headerVisible} />

      <main className="w-full overflow-x-hidden">
        {/* 1. Hero Stage (100svh) — Abertura Animada (XPND.[...] -> XPND.COMPANY) com Scrub Transition */}
        <HeroStage onAnimationComplete={() => setHeaderVisible(true)} />

        {/* 2. Seção 1 — Promessa & CTA (H1 bicolor Apple com Masked Line Reveal Atlason + CTAs) */}
        <PromiseSection />

        {/* 3. Seção 2 — O Diagnóstico (Bento Grid 3 cards com escala GPU e micro-paralaxe) */}
        <DiagnosisGrid />

        {/* 4. Seção 3 — O Método (Desktop: Sticky Scrollytelling com foco progressivo | Mobile: MatchMedia empilhamento vertical) */}
        <MethodSection />

        {/* 5. Seção 4 — Formatos (2 cards modulares com reveal GPU) */}
        <FormatsSection />

        {/* 6. Seção 5 — Segurança, Sigilo e LGPD (Destaque editorial escuro com isolamento e backups) */}
        <SecuritySection />

        {/* 7. Seção 6 — Sobre o Fundador (Gabriel Pereira Gomes: Vendas +25a, Imobiliária, Infoprodutos) */}
        <FounderSection />

        {/* 8. Seção 7 — FAQ Minimalista (Accordion suave 4 perguntas) */}
        <FaqSection />

        {/* 9. Seção 8 — CTA Final + Agendamento com Lisa */}
        <FinalCtaSection />
      </main>

      {/* 10. Rodapé Oficial XPND */}
      <Footer />
    </div>
  );
};

export default App;
