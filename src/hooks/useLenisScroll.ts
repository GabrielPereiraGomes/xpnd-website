import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const useLenisScroll = () => {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Desktop & Mobile Lenis Configuration
    // Desktop: silky 0.085 lerp, 0.95 wheel multiplier
    // Mobile: syncTouch: false (strictly preserves native iOS/Android momentum and touch physics)
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.085,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.95,
      syncTouch: false, // Critical: respect native touch physics, zero lag on finger touch
      touchMultiplier: 1.0,
      autoResize: true,
    });

    lenisInstance = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis through GSAP's central ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Initial ScrollTrigger calculation refresh
    ScrollTrigger.refresh();

    // Global smooth anchor click handler
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -72,
            duration: prefersReducedMotion ? 0 : 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like exponential ease
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
};

export default useLenisScroll;
