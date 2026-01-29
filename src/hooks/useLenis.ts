import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function useLenis() {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    lenis.current = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisInstance = lenis.current;

    lenis.current.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.current?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.current?.destroy();
      lenisInstance = null;
    };
  }, []);

  return lenis;
}
