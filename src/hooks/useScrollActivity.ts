import { useState, useEffect, useRef } from 'react';

interface UseScrollActivityOptions {
  inactivityDelay?: number;
}

export function useScrollActivity({ inactivityDelay = 1500 }: UseScrollActivityOptions = {}) {
  const [isActive, setIsActive] = useState(true);
  const [scrollY, setScrollY] = useState(() => (typeof window !== 'undefined' ? window.scrollY : 0));
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      setIsActive(true);
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        setIsActive(false);
      }, inactivityDelay);
    };

    // Keep visible initially for 2.5s on load, then auto-hide if inactive
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setIsActive(false);
    }, 2500);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      resetTimer();
    };

    const handleUserInteraction = () => {
      resetTimer();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('pointerdown', handleUserInteraction, { passive: true });

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('pointerdown', handleUserInteraction);
    };
  }, [inactivityDelay]);

  return {
    isActive,
    scrollY,
  };
}
