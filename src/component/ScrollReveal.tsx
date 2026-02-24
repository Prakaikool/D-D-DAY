'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

type ScrollRevealProps = {
    children: ReactNode;
    animationClass: string;
    delayClass?: string;
    durationClass?: string;
    once?: boolean;
    threshold?: number;
    rootMargin?: string;
    className?: string;
};

export default function ScrollReveal({
    children,
    animationClass,
    delayClass = '',
    durationClass = '',
    once = true,
    threshold = 0.15,
    rootMargin = '0px 0px -10% 0px',
    className = ''
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.unobserve(el);
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [once, threshold, rootMargin]);

    return (
        <div
            ref={ref}
            className={[
                className,
                isVisible
                    ? `${animationClass} ${delayClass} ${durationClass}`
                    : 'opacity-0'
            ].join(' ')}
        >
            {children}
        </div>
    );
}
