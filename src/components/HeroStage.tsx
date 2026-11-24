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
  const {
    words,
    initialDelay = 0.25,
    durationPerWord = 0.38,
    pauseBetweenWords = 0.26,
  } = siteConfig.heroAnimation;

  const [isLocked, setIsLocked] = useState(false);

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const stageContentRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // GSAP 7-Step Word Sequence (AI -> Negócios -> Automações -> Agentes -> Taste -> Growth -> Company)
  // Fast, crisp cadence (~4.1s total) settling permanently on 'Company' (repeat: 0).
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      words.forEach((_, idx) => {
        const el = wordRefs.current[idx];
        if (el) {
          gsap.set(el, {
            yPercent: idx === words.length - 1 ? 0 : 100,
            opacity: idx === words.length - 1 ? 1 : 0,
          });
        }
      });
      setIsLocked(true);
      if (onAnimationComplete) onAnimationComplete();
      return;
    }

    // Set initial word positions:
    // Word 0 ('AI') visible at yPercent: 0, opacity: 1
    // All other words queued above at yPercent: -100, opacity: 0
    words.forEach((_, idx) => {
      const el = wordRefs.current[idx];
      if (el) {
        gsap.set(el, {
          yPercent: idx === 0 ? 0 : -100,
          opacity: idx === 0 ? 1 : 0,
        });
      }
    });

    const tl = gsap.timeline({
      delay: initialDelay,
      onComplete: () => {
        setIsLocked(true);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      },
    });

    for (let i = 0; i < words.length - 1; i++) {
      const currentEl = wordRefs.current[i];
      const nextEl = wordRefs.current[i + 1];
      const stepLabel = `step-${i}`;

      // Brisk, readable beat on each word
      tl.to({}, { duration: pauseBetweenWords });

      // Outgoing word drops out cleanly (0 -> 100, opacity 1 -> 0)
      tl.to(
        currentEl,
        {
          yPercent: 100,
          opacity: 0,
          duration: durationPerWord,
          ease: 'power3.out',
        },
        stepLabel
      );

      // Incoming word drops in cleanly (-100 -> 0, opacity 0 -> 1)
      tl.to(
        nextEl,
        {
          yPercent: 0,
          opacity: 1,
          duration: durationPerWord,
          ease: 'power3.out',
        },
        stepLabel
      );
    }

    return () => {
      tl.kill();
    };
  }, [words, initialDelay, durationPerWord, pauseBetweenWords, onAnimationComplete]);

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
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-[#F9F8F6] px-3 sm:px-6 select-none"
    >
      {/* Background radial gradient subtle highlight */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 48%, rgba(212, 192, 172, 0.22) 0%, rgba(249, 248, 246, 0) 75%)',
        }}
      />

      {/* Main Lockup Stage (Pushed back via GSAP scrub on scroll) */}
      <div
        ref={stageContentRef}
        className="w-full flex flex-col items-center justify-center gpu-layer"
      >
        {/*
          Symmetric 3-column Grid [minmax(0,1fr) auto minmax(0,1fr)]:
          - Locks the center dot (.) rigidly at 50vw horizontal screen center.
          - Locks XPND rigidly to the left of the center dot (zero horizontal shift during word swaps).
          - Words rotate smoothly in Column 3 to the right of the center dot.
          - Shared 1.85em row height + calculated baseline alignment keeps XPND, '.', and Word on ONE optical baseline.
        */}
        <div className="w-full grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center text-[clamp(1.2rem,5.4vw,3.75rem)] leading-[1.85em]">
          
          {/* 1. XPND Fluffy Pale Oak (Fixed position on left of dot; animated fur inside) */}
          <div className="flex justify-end items-end h-[1.85em] min-w-0">
            <picture className="inline-flex items-center shrink-0 select-none pointer-events-none mb-[0.295em] mr-[-0.08em]">
              <source srcSet="/assets/xpnd_logo_fluffy_pale_oak_v2.webp" type="image/webp" />
              <img
                src="/assets/xpnd_logo_fluffy_pale_oak_v2.gif"
                alt="XPND"
                width={374}
                height={134}
                className="h-[1.5em] w-auto max-w-none object-contain drop-shadow-[0_6px_16px_rgba(94,75,67,0.08)]"
                loading="eager"
                decoding="sync"
              />
            </picture>
          </div>

          {/* 2. Fixed Dot (.) strictly anchored at horizontal center of the viewport */}
          <div className="h-[1.85em] flex items-center justify-center shrink-0 font-sans font-extrabold tracking-[-0.02em] leading-[1.85em] text-[#8B746B] select-none px-[0.06em]">
            .
          </div>

          {/* 3. Vertical Slot with Masked Overflow immediately to the right of dot */}
          <div
            className="relative h-[1.85em] w-full overflow-hidden select-none min-w-0"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
            }}
          >
            {words.map((word, idx) => (
              <span
                key={word}
                ref={(el) => (wordRefs.current[idx] = el)}
                className="absolute top-0 left-[0.12em] font-sans font-extrabold tracking-[-0.02em] text-[#1A1817] leading-[1.85em] whitespace-nowrap will-change-transform"
              >
                {word}
              </span>
            ))}
          </div>

        </div>

        {/* Subtitle / Micro-Description (fades in smoothly upon settling on Company) */}
        <p
          className={`mt-2 sm:mt-4 max-w-md text-center text-xs sm:text-sm font-medium tracking-tight text-[#1A1817]/65 transition-all duration-700 ease-apple ${
            isLocked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          {siteConfig.brand.tagline}
        </p>
      </div>

      {/* 4. Bottom Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className={`absolute bottom-8 sm:bottom-10 flex flex-col items-center gap-1.5 text-xs font-semibold tracking-wider text-[#1A1817]/60 uppercase transition-all duration-700 hover:text-[#1A1817] ${
          isLocked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
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
