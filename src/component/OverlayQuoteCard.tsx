'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { MESSAGES } from '@/data/messages';
import QuoteBlock from '@/component/QuoteBlock';
import OverlayQuoteCard from '@/component/OverlayQuoteCard';
import About from '@/component/About';
import Footer from '../component/Footer';

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

// ✅ key สำหรับ “วันนี้” (local time)
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

export default function Home() {
    const todayIndex = useMemo(() => {
        const doy = dayOfYearUTC(new Date());
        return doy % MESSAGES.length;
    }, []);

    const [index, setIndex] = useState(todayIndex);
    const msg = MESSAGES[index];

    const dateLabel = useMemo(() => formatDate(new Date()), []);

    const [isOpen, setIsOpen] = useState(false);
    const [bgSrc, setBgSrc] = useState<(typeof CARD_BACKGROUNDS)[number]>(
        CARD_BACKGROUNDS[0]
    );

    function closeOverlay() {
        setIsOpen(false);
    }

    // ✅ อ่าน/เขียน localStorage แบบปลอดภัย
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
                ? parsed.used.filter(Number.isFinite)
                : [];

            // ถ้าวันเปลี่ยน → รีเซ็ต
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

    // ✅ สุ่มแบบไม่ซ้ำ “ภายในวันเดียวกัน”
    function pickNextIndexNoRepeatToday(prevIndex: number) {
        const total = MESSAGES.length;
        if (total <= 1) return prevIndex;

        const state = readDailyState();

        // กันกรณี index หลุดช่วง
        const usedSet = new Set(state.used.filter((n) => n >= 0 && n < total));

        // อยากกันไม่ให้ซ้ำกับอันเดิมทันทีด้วย
        usedSet.add(prevIndex);

        // หา candidates ที่ยังไม่เคยใช้ในวันนี้
        let candidates: number[] = [];
        for (let i = 0; i < total; i++) {
            if (!usedSet.has(i)) candidates.push(i);
        }

        // ถ้าใช้ครบแล้ว → รีเซ็ตของวันนี้ (เริ่มใหม่)
        if (candidates.length === 0) {
            // รีเซ็ต แล้วให้สุ่มได้ทุกอัน (แต่ยังกัน prevIndex)
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
        // ✅ random message แบบไม่ซ้ำในวันเดียวกัน
        setIndex((prev) => pickNextIndexNoRepeatToday(prev));

        // random overlay background
        const nextBg =
            CARD_BACKGROUNDS[
                Math.floor(Math.random() * CARD_BACKGROUNDS.length)
            ];
        setBgSrc(nextBg);

        // open overlay
        setIsOpen(true);
    }

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') closeOverlay();
        }
        if (isOpen) window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    return (
        <main className="min-h-screen bg-ddBlush font-onest text-ddCocoa">
            {/* OUTER FRAME */}
            <div className="mx-auto max-w-[1400px] px-6 sm:px-6 pt-6 sm:pt-12 pb-8 sm:pb-12">
                {/* TOP BAR */}
                <div className="flex items-center justify-between border-2 border-ddCocoa bg-ddCocoa px-4 sm:px-6 py-3 sm:py-4">
                    <div className="font-mono text-lg sm:text-2xl tracking-[0.25em] text-ddSky">
                        D-D-DAY
                    </div>

                    <button
                        onClick={() => {
                            document.getElementById('about')?.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }}
                        className="
              font-mono text-base sm:text-xl tracking-[0.2em] text-ddSky
              transition-all duration-300 ease-out
              hover:text-white hover:scale-110
            "
                    >
                        ABOUT
                    </button>
                </div>

                {/* MAIN CARD */}
                <div className="relative overflow-hidden rounded-b-3xl border-x-4 border-b-4 border-ddCocoa shadow-[0_14px_0_rgba(79,29,22,0.25)]">
                    {/* background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-ddSky via-[#EAF2FF] to-ddButter" />

                    {/* pink grid */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            backgroundImage: `
                linear-gradient(to right, rgba(247,191,204,0.55) 2px, transparent 2px),
                linear-gradient(to bottom, rgba(247,191,204,0.55) 2px, transparent 2px)
              `,
                            backgroundSize: '56px 56px',
                            opacity: 0.55
                        }}
                    />

                    {/* DECOR */}
                    <Image
                        src="/decor/rainbow.png"
                        alt=""
                        width={350}
                        height={350}
                        className="pointer-events-none absolute -left-10 sm:-left-2 top-2 opacity-40 sm:opacity-50 animate-float w-[220px] sm:w-[350px] h-auto"
                        priority
                    />
                    <Image
                        src="/decor/sun.png"
                        alt=""
                        width={120}
                        height={120}
                        className="pointer-events-none absolute right-6 sm:right-20 top-10 sm:top-16 opacity-50 sm:opacity-60 animate-float [animation-delay:0.6s] w-[80px] sm:w-[120px] h-auto"
                    />
                    <Image
                        src="/decor/heart.png"
                        alt=""
                        width={120}
                        height={120}
                        className="pointer-events-none absolute bottom-24 sm:bottom-16 right-10 sm:right-44 opacity-50 sm:opacity-60 animate-float [animation-delay:1.2s] w-[80px] sm:w-[120px] h-auto"
                    />
                    <Image
                        src="/decor/star.png"
                        alt=""
                        width={140}
                        height={140}
                        className="pointer-events-none absolute bottom-20 sm:bottom-14 left-8 sm:left-24 opacity-60 sm:opacity-70 rotate-12 animate-float [animation-delay:0.3s] w-[90px] sm:w-[140px] h-auto"
                    />

                    {/* CONTENT */}
                    <QuoteBlock dateLabel={dateLabel} />

                    {/* button */}
                    <div className="relative -mt-22 sm:-mt-28 pb-10 sm:pb-16 flex justify-center px-4">
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
                            <span className="relative z-10">Click here!</span>
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

                    {/* corner dot */}
                    <div className="absolute bottom-3 right-4 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-ddCocoa bg-ddBlush">
                        <div className="absolute inset-1 rounded-full bg-white/30" />
                    </div>
                </div>
            </div>

            {/* OVERLAY CARD */}
            <OverlayQuoteCard
                isOpen={isOpen}
                bgSrc={bgSrc}
                enLines={msg.en}
                thLines={msg.th}
                onClose={closeOverlay}
            />

            <About />
            <Footer />
        </main>
    );
}
