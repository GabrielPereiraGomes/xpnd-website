import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../site.config';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../hooks/useLenisScroll';

gsap.registerPlugin(ScrollTrigger);

interface HeroStageProps {
  onAnimationComplete?: () => void;
}

export const HeroStage: React.FC<HeroStageProps> = ({ onAnimationComplete }) => {
  // Animation phases: 'enter' -> 'dot' -> 'spinning' -> 'locked'
  const [phase, setPhase] = useState<'enter' | 'dot' | 'spinning' | 'locked'>('enter');
  const [wordIndex, setWordIndex] = useState(0);
  const words = siteConfig.heroAnimation.rotatingWords;
  const finalSignature = siteConfig.heroAnimation.finalSignature;

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const stageContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Step 1: Slide-in entrance duration
    const enterTimer = setTimeout(() => {
      setPhase('dot');
    }, 700);

    // Step 2: Dot appearance
    const dotTimer = setTimeout(() => {
      setPhase('spinning');
    }, 1100);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(dotTimer);
    };
  }, []);

  // Step 3: Slot machine rotation through words
  useEffect(() => {
    if (phase !== 'spinning') return;

    if (wordIndex < words.length - 1) {
      const stepTimer = setTimeout(() => {
        setWordIndex((prev) => prev + 1);
      }, siteConfig.heroAnimation.spinDurationPerWordMs);
      return () => clearTimeout(stepTimer);
    } else {
      // Reached the last temporary word ('AUTONOMIA'), decelerate into 'COMPANY'
      const lockTimer = setTimeout(() => {
        setPhase('locked');
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, siteConfig.heroAnimation.pauseBeforeFinalMs);
      return () => clearTimeout(lockTimer);
    }
  }, [phase, wordIndex, words.length, onAnimationComplete]);

  // Atlason Scrub Transition on Scroll: scale: 1 -> 0.96, opacity: 1 -> 0.25, yPercent: 0 -> -8
  useEffect(() => {
    if (!heroSectionRef.current || !stageContentRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(stageContentRef.current, {
        scale: 0.96,
        opacity: 0.25,
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    const lenis = getLenis();
    const el = document.getElementById('promessa');
    if (lenis && el) {
      lenis.scrollTo(el, { offset: -60, duration: 1.15 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#F9F8F6] px-4 select-none"
    >
      {/* Background radial gradient subtle highlight */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 48%, rgba(212, 192, 172, 0.22) 0%, rgba(249, 248, 246, 0) 75%)',
        }}
      />

      {/* Main Lockup Stage (Pushed back via GSAP scrub on scroll) */}
      <div ref={stageContentRef} className="flex flex-col items-center justify-center gpu-layer">
        
        {/* Animated Horizontal Lockup: [XPND] + [.] + [Vertical Word Slot] (Strict single-line lockup) */}
        <div className="flex items-center justify-center flex-nowrap gap-x-1.5 sm:gap-x-3 md:gap-x-4 max-w-full px-2">
          
          {/* 1. XPND Canonical Pure Flat Wordmark (Carbon Ink #1A1817) */}
          <div
            className={`flex items-center shrink-0 transition-all duration-700 ease-apple ${
              phase === 'enter'
                ? 'opacity-0 -translate-x-6 scale-95'
                : 'opacity-100 translate-x-0 scale-100'
            }`}
          >
            <span className="font-sans font-extrabold text-[clamp(1.65rem,6.2vw,5.5rem)] tracking-[-0.03em] text-[#1A1817] leading-none">
              XPND
            </span>
          </div>

          {/* 2. Fixed Dot in Signature Deep Taupe (#8B746B) */}
          <div
            className={`shrink-0 transition-all duration-500 ease-apple text-[clamp(1.65rem,6.2vw,5.5rem)] font-extrabold leading-none text-[#8B746B] ${
              phase === 'enter' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
            }`}
          >
            .
          </div>

          {/* 3. Vertical Slot with Smooth Masked Overflow */}
          <div
            className={`relative flex items-center shrink-0 transition-all duration-700 ease-apple ${
              phase === 'locked' ? 'overflow-visible h-auto py-1' : 'overflow-hidden h-[1.35em]'
            } ${
              phase === 'enter' || phase === 'dot' ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
            }`}
            style={
              phase === 'locked'
                ? undefined
                : {
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                  }
            }
          >
            {phase === 'locked' ? (
              // Final Locked Signature Word: COMPANY in Carbon Ink (#1A1817)
              <span className="font-sans font-extrabold text-[clamp(1.65rem,6.2vw,5.5rem)] tracking-[-0.03em] text-[#1A1817] leading-none animate-in fade-in slide-in-from-top-4 duration-700 ease-apple">
                {finalSignature}
              </span>
            ) : (
              // Rotating Temporary Words: IA -> IMPLEMENTAÇÃO -> PROCESSOS -> AUTONOMIA
              <div
                key={wordIndex}
                className="font-sans font-extrabold text-[clamp(1.35rem,5.2vw,4.6rem)] tracking-[-0.03em] text-[#8B746B] leading-none animate-in fade-in slide-in-from-top-3 duration-300 ease-apple"
              >
                {words[wordIndex]}
              </div>
            )}
          </div>
        </div>

        {/* Subtitle / Micro-Description (fades in when locked) */}
        <p
          className={`mt-6 sm:mt-8 max-w-md text-center text-xs sm:text-sm font-medium tracking-tight text-[#1A1817]/65 transition-all duration-1000 ease-apple ${
            phase === 'locked' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          {siteConfig.brand.tagline}
        </p>
      </div>

      {/* 4. Bottom Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className={`absolute bottom-8 sm:bottom-10 flex flex-col items-center gap-1.5 text-xs font-semibold tracking-wider text-[#1A1817]/60 uppercase transition-all duration-1000 hover:text-[#1A1817] ${
          phase === 'locked' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Rolar para explorar o conteúdo"
      >
        <span className="text-[11px] font-sans tracking-[0.1em]">Role para explorar</span>
        <ChevronDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
};

export default HeroStage;
