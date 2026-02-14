'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
    const ref = useRef<HTMLElement | null>(null);
    const [show, setShow] = useState(false);

    // reveal on scroll
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

    return (
        <section
            id="about"
            ref={ref as any}
            className="mx-auto max-w-[1400px] px-6 pb-14"
        >
            {/* OUTER CARD */}
            <div
                className={[
                    'rounded-4xl bg-ddCocoa p-6 shadow-[0_14px_0_rgba(79,29,22,0.25)]',
                    // hover lift
                    'transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_18px_0_rgba(79,29,22,0.28)]',
                    // reveal
                    show ? 'animate-riseFade' : 'opacity-0 translate-y-4'
                ].join(' ')}
            >
                {/* INNER CARD */}
                <div
                    className="
            relative
            rounded-2xl
            bg-[#9B8632]
            px-10 py-20
            shadow-[0_14px_0_rgba(79,29,22,0.35)]
            overflow-hidden
          "
                >
                    {/* subtle highlight blob */}
                    <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

                    {/* 🔴 DOTS (4 corners) — animated, not synced */}
                    <div className="pointer-events-none absolute top-3 left-3 h-6 w-6 rounded-full border-2 border-ddCocoa bg-ddBlush animate-dotSoft [animation-delay:0.1s]">
                        <div className="absolute inset-1 rounded-full bg-white/30" />
                    </div>

                    <div className="pointer-events-none absolute top-3 right-3 h-6 w-6 rounded-full border-2 border-ddCocoa bg-ddBlush animate-dotTiny [animation-delay:0.6s]">
                        <div className="absolute inset-1 rounded-full bg-white/30" />
                    </div>

                    <div className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 rounded-full border-2 border-ddCocoa bg-ddBlush animate-dotWiggle [animation-delay:0.3s]">
                        <div className="absolute inset-1 rounded-full bg-white/30" />
                    </div>

                    <div className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 rounded-full border-2 border-ddCocoa bg-ddBlush animate-dotSoft [animation-delay:1s]">
                        <div className="absolute inset-1 rounded-full bg-white/30" />
                    </div>

                    <h2 className="font-onest text-[58px] tracking-[0.18em] text-ddBlush text-center">
                        ABOUT
                    </h2>

                    <p className="mt-12 px-10 font-mono text-xl text-ddSky">
                        If you are someone who received the link to this page,
                        <br />I want you to know that... You are one of the
                        people Nadia holds close and dear.
                    </p>

                    <p className="mt-8 px-10 font-mono text-xl text-ddSky">
                        This little page was inspired by fortune cookies. Nadia
                        created it to share small messages and gentle words of
                        encouragement, so that anyone can open it each day and
                        receive something warm like a soft little fortune meant
                        just for that moment.
                    </p>

                    <p className="mt-8 px-10 pb-6 font-mono text-xl text-ddSky">
                        Whether you arrive here on a bright day or a heavy one,
                        I hope these tiny messages can bring you a sense of
                        comfort and make your day feel just a little softer.
                    </p>
                </div>
            </div>
        </section>
    );
}
