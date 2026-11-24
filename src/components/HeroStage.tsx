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
  const words = siteConfig.heroAnimation.words; // ['AI', 'Negócios', 'Automações', 'Agentes', 'Taste', 'Growth', 'Company']
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const stageContentRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // GSAP 7-Step Word Sequence (AI -> Negócios -> Automações -> Agentes -> Taste -> Growth -> Company)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setActiveWordIndex(words.length - 1);
      setIsLocked(true);
      if (onAnimationComplete) onAnimationComplete();
      return;
    }

    // Set initial word positions:
    // Word 0 ('AI') visible at yPercent: 0, opacity: 1
    // All other words positioned above at yPercent: -100, opacity: 0
    words.forEach((_, idx) => {
      const el = wordRefs.current[idx];
      if (el) {
        gsap.set(el, {
          yPercent: idx === 0 ? 0 : -100,
          opacity: idx === 0 ? 1 : 0,
        });
      }
    });

    // Master Timeline with slow, cinematic easing (0.85s duration + 0.8s reading pause)
    const tl = gsap.timeline({
      delay: 0.6, // Initial comfortable pause on 'AI'
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
      const nextIndex = i + 1;
      const stepLabel = `step-${i}`;

      // Reading pause (~0.8s) between words
      tl.to({}, { duration: 0.8 });

      // Outgoing word descends and fades (0 -> 100, opacity: 1 -> 0)
      tl.to(
        currentEl,
        {
          yPercent: 100,
          opacity: 0,
          duration: 0.85,
          ease: 'power4.out',
        },
        stepLabel
      );

      // Incoming word enters from top (-100 -> 0, opacity: 0 -> 1)
      tl.to(
        nextEl,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power4.out',
          onStart: () => {
            setActiveWordIndex(nextIndex);
          },
        },
        stepLabel
      );
    }

    return () => {
      tl.kill();
    };
  }, [words, onAnimationComplete]);

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
        
        {/* Animated Horizontal Lockup: [XPND Fluffy Pale Oak] + [.] + [Vertical Word Slot] */}
        <div className="flex items-center justify-center flex-nowrap max-w-full px-2">
          
          {/* 1. XPND Fluffy Lettermark with slow right-to-left wave (<picture> webp + gif fallback) */}
          <div className="flex items-center shrink-0">
            <picture className="inline-flex items-center select-none pointer-events-none">
              <source srcSet="/assets/xpnd_logo_fluffy_pale_oak_v2.webp" type="image/webp" />
              <img
                src="/assets/xpnd_logo_fluffy_pale_oak_v2.gif"
                alt="XPND"
                className="h-[clamp(2.1rem,6.8vw,5.6rem)] w-auto object-contain drop-shadow-[0_6px_16px_rgba(94,75,67,0.08)]"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>

          {/* 2. Fixed Dot in Signature Deep Taupe (#8B746B) */}
          <div className="shrink-0 font-sans font-extrabold text-[clamp(1.4rem,4.4vw,3.6rem)] tracking-[-0.02em] leading-none text-[#8B746B] select-none pl-1 sm:pl-2 pr-1 sm:pr-2">
            .
          </div>

          {/* 3. Vertical Slot with Smooth Masked Overflow (Atlason Curvature) */}
          <div
            className="relative inline-flex items-center overflow-hidden h-[1.35em] text-[clamp(1.4rem,4.4vw,3.6rem)] select-none transition-[width] duration-500 ease-apple"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
            }}
          >
            {words.map((word, idx) => (
              <span
                key={word}
                ref={(el) => (wordRefs.current[idx] = el)}
                className="absolute top-0 left-0 font-sans font-extrabold tracking-[-0.02em] text-[#1A1817] leading-none whitespace-nowrap will-change-transform"
              >
                {word}
              </span>
            ))}
            {/* Ghost sizer to dynamically reserve width without layout jump */}
            <span
              className="invisible opacity-0 font-sans font-extrabold tracking-[-0.02em] leading-none whitespace-nowrap select-none"
              aria-hidden="true"
            >
              {words[activeWordIndex]}
            </span>
          </div>

        </div>

        {/* Subtitle / Micro-Description (fades in smoothly upon settling on Company) */}
        <p
          className={`mt-6 sm:mt-8 max-w-md text-center text-xs sm:text-sm font-medium tracking-tight text-[#1A1817]/65 transition-all duration-1000 ease-apple ${
            isLocked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          {siteConfig.brand.tagline}
        </p>
      </div>

      {/* 4. Bottom Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className={`absolute bottom-8 sm:bottom-10 flex flex-col items-center gap-1.5 text-xs font-semibold tracking-wider text-[#1A1817]/60 uppercase transition-all duration-1000 hover:text-[#1A1817] ${
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
