'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
    const ref = useRef<HTMLElement | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                    io.disconnect(); // trigger once
                }
            },
            { threshold: 0.15 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    const baseHidden = 'opacity-0 -translate-y-4';
    const anim = (delay: string) =>
        show ? `animate-slideDownFade [animation-delay:${delay}]` : baseHidden;

    return (
        <section
            id="about"
            ref={ref as any}
            className="mx-auto max-w-[1400px] px-6 pb-14"
        >
            {/* OUTER CARD */}
            <div
                className={[
                    'rounded-4xl bg-ddCocoa p-4 sm:p-6 shadow-[0_14px_0_rgba(79,29,22,0.25)]',
                    'transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_18px_0_rgba(79,29,22,0.28)]'
                ].join(' ')}
            >
                {/* INNER CARD */}
                <div
                    className="
            relative
            rounded-2xl
           bg-gradient-to-b from-ddSky via-[#fbe8d4] to-ddButter
            px-5 py-10
            sm:px-10 sm:py-16
            lg:px-12 lg:py-20
            shadow-[0_14px_0_rgba(79,29,22,0.35)]
            overflow-hidden
          "
                >
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            backgroundImage: `
                linear-gradient(to right, rgba(247,191,204,0.55) 2px, transparent 2px),
                linear-gradient(to bottom, rgba(247,191,204,0.55) 2px, transparent 2px)
              `,
                            backgroundSize: '56px 56px',
                            opacity: 0.4
                        }}
                    />
                    {/* subtle highlight blob */}
                    <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-white/10 blur-2xl" />

                    {/* DOTS */}
                    <div className="pointer-events-none absolute top-3 left-3 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-ddCocoa bg-ddBlush">
                        <div className="absolute inset-1 rounded-full bg-white/30" />
                    </div>
                    <div className="pointer-events-none absolute top-3 right-3 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-ddCocoa bg-ddBlush">
                        <div className="absolute inset-1 rounded-full bg-white/30" />
                    </div>
                    <div className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-ddCocoa bg-ddBlush">
                        <div className="absolute inset-1 rounded-full bg-white/30" />
                    </div>
                    <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-ddCocoa bg-ddBlush">
                        <div className="absolute inset-1 rounded-full bg-white/30" />
                    </div>

                    {/* stagger content */}
                    <ScrollReveal
                        animationClass="animate-slideInDown"
                        delayClass="anim-delay-200"
                    >
                        <h2
                            className={[
                                'font-onest tracking-[0.18em] text-ddInkBlue text-center font-extrabold',
                                'text-[34px] sm:text-[46px] lg:text-[58px]',
                                anim('0.25s')
                            ].join(' ')}
                        >
                            ABOUT
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal
                        animationClass="animate-slideInDown"
                        delayClass="anim-delay-200"
                    >
                        <p
                            className={[
                                'mt-6 sm:mt-10',
                                'px-0 sm:px-10',
                                'font-mono text-ddCocoa',
                                'text-md sm:text-lg lg:text-xl',
                                'transition-[opacity,transform] duration-500',
                                anim('0.40s')
                            ].join(' ')}
                        >
                            If you are someone who received the link to this
                            page,
                            <br className="hidden sm:block" />I want you to know
                            that... You are one of the people Nadia holds close
                            and dear.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal
                        animationClass="animate-slideInDown"
                        delayClass="anim-delay-400"
                    >
                        <p
                            className={[
                                'mt-5 sm:mt-8',
                                'px-0 sm:px-10',
                                'font-mono text-ddCocoa',
                                'text-md sm:text-lg lg:text-xl',
                                'transition-[opacity,transform] duration-500',
                                anim('0.55s')
                            ].join(' ')}
                        >
                            This little page was inspired by fortune cookies.
                            Nadia created it to share small messages and gentle
                            words of encouragement, so that anyone can open it
                            each day and receive something warm like a soft
                            little fortune meant just for that moment.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal
                        animationClass="animate-slideInDown"
                        delayClass="anim-delay-600"
                    >
                        <p
                            className={[
                                'mt-5 sm:mt-8',
                                'px-0 sm:px-10',
                                'font-mono text-ddCocoa',
                                'text-md sm:text-lg lg:text-xl',
                                'transition-[opacity,transform] duration-500',
                                anim('0.70s')
                            ].join(' ')}
                        >
                            Whether you arrive here on a bright day or a heavy
                            one, I hope these tiny messages can bring you a
                            sense of comfort and make your day feel just a
                            little softer.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal
                        animationClass="animate-slideInDown"
                        delayClass="anim-delay-900"
                    >
                        <p
                            className={[
                                'mt-5 sm:mt-8',
                                'mb-4 sm:mt-4',
                                'px-0 sm:px-10',
                                'font-mono text-ddCocoa',
                                'text-md sm:text-lg lg:text-xl',
                                'transition-[opacity,transform] duration-500',
                                anim('0.85s')
                            ].join(' ')}
                        >
                            If you’d like to see more of Nadia’s work → Visit{' '}
                            <a
                                href="https://www.prakaikool-teepraken.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                inline-block
                font-mono font-bold tracking-[0.2em]
                text-ddInkBlue
                text-md sm:text-lg lg:text-xl
                underline underline-offset-4 decoration-ddInkBlue/40
                transition-all duration-300
                hover:text-ddCocoa hover:decoration-ddCocoa hover:scale-110
              "
                            >
                                PORTFOLIO
                            </a>
                        </p>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
