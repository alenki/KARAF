import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function useLenis(isLoading = false) {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    lenis.current = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisInstance = lenis.current;

    // Start stopped during loading
    lenis.current.stop();

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

  useEffect(() => {
    if (!lenis.current) return;

    if (isLoading) {
      lenis.current.stop();
    } else {
      // Reset scroll position to top before enabling
      window.scrollTo(0, 0);
      lenis.current.scrollTo(0, { immediate: true });
      lenis.current.start();
    }
  }, [isLoading]);

  return lenis;
}
