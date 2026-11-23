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

export const App: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(true);

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1817] font-sans selection:bg-[#8B746B] selection:text-[#F9F8F6]">
      {/* 0. Header Minimalista Sticky (~56px, blur translúcido) */}
      <Header visible={headerVisible} />

      <main className="w-full">
        {/* 1. Hero Stage (100svh) — Abertura 3D Micro-Plush Animada (XPND.[...] -> XPND.COMPANY) */}
        <HeroStage onAnimationComplete={() => setHeaderVisible(true)} />

        {/* 2. Seção 1 — Promessa & CTA (H1 bicolor Apple + Selo + CTAs) */}
        <PromiseSection />

        {/* 3. Seção 2 — O Diagnóstico (Bento Grid 3 cards: Ruído, Equipe travada, Insegurança LGPD) */}
        <DiagnosisGrid />

        {/* 4. Seção 3 — O Método (Sticky Scrollytelling 4 passos: Diagnóstico -> Construção -> Treinamento -> Autonomia) */}
        <MethodSection />

        {/* 5. Seção 4 — Formatos (2 cards: Sprint IA e Transformação Completa — Sem preço aberto) */}
        <FormatsSection />

        {/* 6. Seção 5 — Segurança, Sigilo e LGPD (Destaque editorial com isolamento e backups) */}
        <SecuritySection />

        {/* 7. Seção 6 — Sobre o Fundador (Gabriel Pereira Gomes: Vendas +25a, Imobiliária, Infoprodutos) */}
        <FounderSection />

        {/* 8. Seção 7 — FAQ Minimalista (Accordion suave 4 perguntas) */}
        <FaqSection />

        {/* 9. Seção 8 — CTA Final + Agendamento com Lisa + Rodapé */}
        <FinalCtaSection />
      </main>

      {/* 10. Rodapé Oficial XPND */}
      <Footer />
    </div>
  );
};

export default App;
