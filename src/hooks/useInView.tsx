import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

type UseInViewReturn = [RefObject<HTMLElement>, boolean];

export const useInView = (options: UseInViewOptions = {}): UseInViewReturn => {
  const { threshold = 0.1, rootMargin = '0px', once = false } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when element is in view
        setIsIntersecting(entry.isIntersecting);
        
        // If "once" is true and the element is in view, unobserve it
        if (entry.isIntersecting && once) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, once]);

  return [ref, isIntersecting];
};