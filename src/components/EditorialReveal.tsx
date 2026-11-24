import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EditorialRevealProps {
  lines?: string[];
  children?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
  className?: string;
  lineClassName?: string;
  delay?: number;
  startTrigger?: string;
}

export const EditorialReveal: React.FC<EditorialRevealProps> = ({
  lines,
  children,
  as: Component = 'div',
  className = '',
  lineClassName = '',
  delay = 0,
  startTrigger = 'top 86%',
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = containerRef.current.querySelectorAll('.line-inner');

    if (prefersReducedMotion) {
      gsap.set(targets, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          yPercent: 110,
          opacity: 0.001,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.08,
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: startTrigger,
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, startTrigger]);

  if (lines && lines.length > 0) {
    return (
      // @ts-expect-error dynamic component type
      <Component ref={containerRef} className={className}>
        {lines.map((line, idx) => (
          <span key={idx} className="line-mask block">
            <span className={`line-inner block ${lineClassName}`}>{line}</span>
          </span>
        ))}
      </Component>
    );
  }

  return (
    // @ts-expect-error dynamic component type
    <Component ref={containerRef} className={className}>
      <span className="line-mask block">
        <span className={`line-inner block ${lineClassName}`}>{children}</span>
      </span>
    </Component>
  );
};

export default EditorialReveal;
