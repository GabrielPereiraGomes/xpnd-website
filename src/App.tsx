import React, { useState } from 'react';
import Header from './components/Header';
import HeroStage from './components/HeroStage';
import StickyShowcaseSection from './components/StickyShowcaseSection';
import MethodBentoSection from './components/MethodBentoSection';
import SecuritySection from './components/SecuritySection';
import FormatsSection from './components/FormatsSection';
import FounderSection from './components/FounderSection';
import FaqSection from './components/FaqSection';
import FinalCtaSection from './components/FinalCtaSection';
import Footer from './components/Footer';
import { useLenisScroll } from './hooks/useLenisScroll';

export const App: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(true);

  useLenisScroll();

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1817] font-sans selection:bg-[#8B746B] selection:text-[#F9F8F6] overflow-x-clip">
      <Header visible={headerVisible} />

      <main className="w-full overflow-x-clip">
        {/* 1. Hero Unificada (Lockup + Promessa + Workspace ao vivo) */}
        <HeroStage onAnimationComplete={() => setHeaderVisible(true)} />

        {/* 2. Sistema & Gargalos (Sticky Showcase em Scroll + Tabs no Mobile) */}
        <StickyShowcaseSection />

        {/* 3. O Método XPND (Bento Grid + Curva de Adoção e Indicadores) */}
        <MethodBentoSection />

        {/* 4. Segurança, Sigilo & LGPD (Comparativo Interativo de Arquitetura) */}
        <SecuritySection />

        {/* 5. Formatos Modulares (Sprint IA vs Transformação Completa) */}
        <FormatsSection />

        {/* 6. Sobre o Fundador & Cenários por Setor */}
        <FounderSection />

        {/* 7. FAQ & Agendamento Direto (45:00 + Form Progressivo / WhatsApp) */}
        <FaqSection />
        <FinalCtaSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
