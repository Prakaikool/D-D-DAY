'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MESSAGES } from '@/data/messages';
import QuoteBlock from '@/component/QuoteBlock';
import ScrollReveal from './ScrollReveal';
import { useLang } from '@/context/LanguageContext';

function dayOfYearUTC(d: Date) {
    const start = Date.UTC(d.getUTCFullYear(), 0, 1);
    const now = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    return Math.floor((now - start) / 86400000);
}

function formatDate(d: Date) {
    const yy = String(d.getFullYear()).slice(2);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${dd}/${mm}-${yy}`;
}

function getTodayKey() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

const STORAGE_KEY = 'ddday_daily_random_v1';

const CARD_BACKGROUNDS = [
    '/background/card-pink.png',
    '/background/card-blue.png',
    '/background/card-yellow.png'
] as const;

export type OverlayPayload = {
    bgSrc: (typeof CARD_BACKGROUNDS)[number];
    enLines: string[];
    thLines: string[];
};

type ContentProps = {
    onOpenOverlay: (payload: OverlayPayload) => void;
};

export default function Content({ onOpenOverlay }: ContentProps) {
    const { lang, t, toggleLang } = useLang();
    const todayIndex = useMemo(() => {
        const doy = dayOfYearUTC(new Date());
        return doy % MESSAGES.length;
    }, []);

    const dateLabel = useMemo(() => formatDate(new Date()), []);

    const rainbowRef = useRef<HTMLDivElement>(null);
    const sunRef = useRef<HTMLDivElement>(null);
    const heartRef = useRef<HTMLDivElement>(null);
    const starRef = useRef<HTMLDivElement>(null);
    const cardWrapRef = useRef<HTMLDivElement>(null);
    const cardTiltRef = useRef<HTMLDivElement>(null);
    const [shaking, setShaking] = useState(false);

    useEffect(() => {
        const target = { x: 0, y: 0 };
        const current = { x: 0, y: 0 };
        let raf: number;

        function lerp(a: number, b: number, t: number) {
            return a + (b - a) * t;
        }

        function tick() {
            current.x = lerp(current.x, target.x, 0.07);
            current.y = lerp(current.y, target.y, 0.07);
            if (rainbowRef.current)
                rainbowRef.current.style.transform = `translate(${current.x * 16}px,${current.y * 10}px)`;
            if (sunRef.current)
                sunRef.current.style.transform = `translate(${current.x * 28}px,${current.y * 18}px)`;
            if (heartRef.current)
                heartRef.current.style.transform = `translate(${current.x * -20}px,${current.y * -13}px)`;
            if (starRef.current)
                starRef.current.style.transform = `translate(${current.x * -24}px,${current.y * -15}px)`;
            raf = requestAnimationFrame(tick);
        }

        function onMove(e: MouseEvent) {
            target.x = (e.clientX / window.innerWidth - 0.5) * 2;
            target.y = (e.clientY / window.innerHeight - 0.5) * 2;
        }

        window.addEventListener('mousemove', onMove, { passive: true });
        raf = requestAnimationFrame(tick);
        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    function onCardMouseMove(e: React.MouseEvent) {
        const rect = cardWrapRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        if (cardTiltRef.current) {
            cardTiltRef.current.style.transform = `rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
            cardTiltRef.current.style.transition = 'transform 0.12s ease-out';
        }
    }

    function onCardMouseLeave() {
        if (cardTiltRef.current) {
            cardTiltRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
            cardTiltRef.current.style.transition = 'transform 0.5s ease-out';
        }
    }

    function readDailyState(): { dateKey: string; used: number[] } {
        const todayKey = getTodayKey();
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return { dateKey: todayKey, used: [] };

            const parsed = JSON.parse(raw) as {
                dateKey?: string;
                used?: number[];
            };

            const dateKey =
                typeof parsed.dateKey === 'string' ? parsed.dateKey : todayKey;

            const used = Array.isArray(parsed.used)
                ? parsed.used.filter(
                      (n): n is number =>
                          typeof n === 'number' && Number.isFinite(n)
                  )
                : [];

            if (dateKey !== todayKey) return { dateKey: todayKey, used: [] };

            return { dateKey, used };
        } catch {
            return { dateKey: todayKey, used: [] };
        }
    }

    function writeDailyState(state: { dateKey: string; used: number[] }) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
            // ignore
        }
    }

    function pickNextIndexNoRepeatToday(prevIndex: number) {
        const total = MESSAGES.length;
        if (total <= 1) return prevIndex;

        const state = readDailyState();
        const usedSet = new Set(state.used.filter((n) => n >= 0 && n < total));

        usedSet.add(prevIndex);

        let candidates: number[] = [];
        for (let i = 0; i < total; i++) {
            if (!usedSet.has(i)) candidates.push(i);
        }

        if (candidates.length === 0) {
            const resetUsed = [prevIndex];
            candidates = [];
            for (let i = 0; i < total; i++) {
                if (!resetUsed.includes(i)) candidates.push(i);
            }

            const next =
                candidates[Math.floor(Math.random() * candidates.length)];

            writeDailyState({
                dateKey: state.dateKey,
                used: [prevIndex, next]
            });

            return next;
        }

        const next = candidates[Math.floor(Math.random() * candidates.length)];

        writeDailyState({
            dateKey: state.dateKey,
            used: [...Array.from(usedSet), next]
        });

        return next;
    }

    function onClickRandom() {
        const state = readDailyState();

        const prevIndex =
            state.used.length > 0
                ? state.used[state.used.length - 1]
                : todayIndex;

        const nextIndex = pickNextIndexNoRepeatToday(prevIndex);
        const msg = MESSAGES[nextIndex];

        const nextBg =
            CARD_BACKGROUNDS[
                Math.floor(Math.random() * CARD_BACKGROUNDS.length)
            ];

        setShaking(true);
        setTimeout(() => {
            onOpenOverlay({
                bgSrc: nextBg,
                enLines: msg.en,
                thLines: msg.th
            });
        }, 420);
    }

    return (
        <main>
            {/* OUTER FRAME */}
            <div className="mx-auto max-w-[1400px] px-6 sm:px-6 pt-6 sm:pt-8 pb-8 sm:pb-12">
                <div
                    ref={cardWrapRef}
                    onMouseMove={onCardMouseMove}
                    onMouseLeave={onCardMouseLeave}
                    style={{ perspective: '1200px' }}
                >
                    <div ref={cardTiltRef} style={{ willChange: 'transform' }}>
                        {/* TOP BAR */}
                        <div className="flex items-center justify-between border-2 border-ddCocoa bg-ddCocoa px-4 sm:px-6 py-3 sm:py-4">
                            <ScrollReveal
                                animationClass="animate-slideInDown"
                                delayClass="anim-delay-200"
                            >
                                <div className="font-mono text-lg sm:text-2xl tracking-[0.25em] text-ddSky">
                                    D-D-DAY
                                </div>
                            </ScrollReveal>

                            <ScrollReveal
                                animationClass="animate-slideInDown"
                                delayClass="anim-delay-200"
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    {/* Language toggle */}
                                    <button
                                        onClick={toggleLang}
                                        className="
                                            font-mono text-sm sm:text-base tracking-[0.15em]
                                            rounded-full border-2 border-ddSky/60
                                            px-3 py-1
                                            text-ddSky
                                            transition-all duration-300
                                            hover:border-white hover:text-white hover:scale-105
                                        "
                                        aria-label="Toggle language"
                                    >
                                        <span className={lang === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
                                        <span className="opacity-40 mx-1">|</span>
                                        <span className={lang === 'th' ? 'opacity-100' : 'opacity-40'}>TH</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            document
                                                .getElementById('about')
                                                ?.scrollIntoView({
                                                    behavior: 'smooth'
                                                });
                                        }}
                                        className="
                                            font-mono text-base sm:text-xl tracking-[0.2em] text-ddSky
                                            transition-all duration-300 ease-out
                                            hover:text-white hover:scale-110
                                        "
                                    >
                                        {t('nav_about')}
                                    </button>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* MAIN CARD */}
                        <div className="relative overflow-hidden rounded-b-3xl border-x-4 border-b-4 border-ddCocoa shadow-[0_14px_0_rgba(79,29,22,0.25)]">
                            <div className="absolute inset-0 bg-gradient-to-b from-ddSky via-[#fbe8d4] to-ddButter" />

                            <div
                                className="pointer-events-none absolute inset-0"
                                style={{
                                    backgroundImage: `
                linear-gradient(to right, rgba(247,191,204,0.55) 2px, transparent 1px),
                linear-gradient(to bottom, rgba(247,191,204,0.55) 2px, transparent 1px)
              `,
                                    backgroundSize: '56px 56px',
                                    opacity: 0.4
                                }}
                            />

                            {/* DECOR */}
                            <div
                                ref={rainbowRef}
                                className="pointer-events-none absolute -left-10 sm:-left-2 top-2"
                            >
                                <Image
                                    src="/decor/rainbow.png"
                                    alt=""
                                    width={350}
                                    height={350}
                                    className="opacity-40 sm:opacity-50 animate-float w-55 sm:w-87.5 h-auto"
                                    priority
                                />
                            </div>
                            <div
                                ref={sunRef}
                                className="pointer-events-none absolute right-6 sm:right-20 top-10 sm:top-16"
                            >
                                <Image
                                    src="/decor/sun.png"
                                    alt=""
                                    width={120}
                                    height={120}
                                    className="opacity-50 sm:opacity-60 animate-float [animation-delay:0.6s] w-20 sm:w-30 h-auto"
                                />
                            </div>
                            <div
                                ref={heartRef}
                                className="pointer-events-none absolute bottom-16 sm:bottom-16 right-10 sm:right-44"
                            >
                                <Image
                                    src="/decor/heart.png"
                                    alt=""
                                    width={120}
                                    height={120}
                                    className="opacity-50 sm:opacity-60 animate-float [animation-delay:1.2s] w-20 sm:w-30 h-auto"
                                />
                            </div>
                            <div
                                ref={starRef}
                                className="pointer-events-none absolute bottom-12 sm:bottom-14 left-8 sm:left-24"
                            >
                                <Image
                                    src="/decor/star.png"
                                    alt=""
                                    width={140}
                                    height={140}
                                    className="opacity-60 sm:opacity-70 rotate-12 animate-float [animation-delay:0.3s] w-22.5 sm:w-35 h-auto"
                                />
                            </div>

                            {/* CONTENT */}
                            <QuoteBlock dateLabel={dateLabel} />

                            {/* Candies — shake like a fortune cookie on click */}
                            <ScrollReveal
                                animationClass="animate-fadeInUp"
                                delayClass="anim-delay-700"
                            >
                                <div className="flex justify-center -mt-12 -mb-4 sm:-mt-26 sm:-mb-16 pointer-events-none">
                                    <Image
                                        src="/decor/letter.png"
                                        alt=""
                                        width={400}
                                        height={300}
                                        className={`w-55 sm:w-80 h-auto transition-none ${shaking ? 'animate-candyShake' : ''}`}
                                        onAnimationEnd={() => setShaking(false)}
                                        style={{
                                            filter: 'contrast(1) brightness(1)',
                                            mixBlendMode: 'screen'
                                        }}
                                    />
                                </div>
                            </ScrollReveal>

                            {/* button */}
                            <ScrollReveal
                                animationClass="animate-slideInUp"
                                delayClass="anim-delay-600"
                            >
                                <div className="relative pb-8 sm:pb-14 flex justify-center px-4">
                                    <button
                                        onClick={onClickRandom}
                                        className="
                group relative overflow-hidden
                rounded-full border-2 border-ddInkBlue bg-ddBlush
                px-8 sm:px-10 py-3
                font-mono text-[18px] sm:text-[22px] text-ddInkBlue
                shadow-[0_8px_0_rgba(79,29,22,0.25)]
                transition-all duration-300
                hover:-translate-y-[2px]
                hover:bg-ddInkBlue hover:text-ddBlush
                active:translate-y-[3px]
                active:shadow-[0_5px_0_rgba(79,29,22,0.25)]
              "
                                    >
                                        <span
                                            className="
                  pointer-events-none absolute inset-0
                  -translate-x-full
                  bg-gradient-to-r from-transparent via-white/30 to-transparent
                  opacity-0
                  group-hover:opacity-100 group-hover:translate-x-full
                  transition duration-700
                "
                                        />
                                        <span className="relative z-10">
                                            {t('cta_button')}
                                        </span>
                                        <span className="pointer-events-none absolute inset-0 rounded-full animate-ctaRingPulse transition-opacity duration-200 group-hover:opacity-0" />
                                        <span
                                            className="
                  pointer-events-none absolute inset-0 rounded-full
                  ring-0 ring-ddInkBlue/30
                  transition-all duration-300
                  group-hover:ring-4
                "
                                        />
                                    </button>
                                </div>
                            </ScrollReveal>

                            {/* corner dot */}
                            <div className="absolute bottom-3 right-4 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-ddCocoa bg-ddBlush">
                                <div className="absolute inset-1 rounded-full bg-white/30" />
                            </div>
                        </div>
                    </div>
                    {/* cardTiltRef */}
                </div>
                {/* cardWrapRef */}
            </div>
        </main>
    );
}
