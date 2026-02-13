'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { MESSAGES } from '@/data/messages';
import Footer from './component/Footer';
import QuoteBlock from '@/app/component/QuoteBlock';
import OverlayQuoteCard from '@/app/component/OverlayQuoteCard';

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

    // overlay
    const [isOpen, setIsOpen] = useState(false);
    const [bgSrc, setBgSrc] = useState<(typeof CARD_BACKGROUNDS)[number]>(
        CARD_BACKGROUNDS[0]
    );

    function closeOverlay() {
        setIsOpen(false);
    }

    function onClickRandom() {
        // random message (avoid same)
        setIndex((prev) => {
            if (MESSAGES.length <= 1) return prev;
            let next = prev;
            while (next === prev)
                next = Math.floor(Math.random() * MESSAGES.length);
            return next;
        });

        // random overlay background
        const nextBg =
            CARD_BACKGROUNDS[
                Math.floor(Math.random() * CARD_BACKGROUNDS.length)
            ];
        setBgSrc(nextBg);

        // open overlay
        setIsOpen(true);
    }

    // ESC close
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
            <div className="mx-auto max-w-[1400px] px-6 pt-12 pb-12">
                {/* TOP BAR */}
                <div className="flex items-center justify-between border-2 border-ddCocoa bg-ddCocoa px-6 py-4">
                    <div className="font-mono text-2xl tracking-[0.25em] text-ddSky">
                        D-D-DAY
                    </div>
                    <button className="font-mono text-xl tracking-[0.2em] text-ddSky hover:text-white">
                        ABOUT
                    </button>
                </div>

                {/* MAIN CARD */}
                <div className="relative overflow-hidden rounded-b-3xl border-x-4 border-b-4 border-ddCocoa">
                    {/* background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-ddSky via-[#EAF2FF] to-ddButter" />

                    {/* pink grid */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            backgroundImage: `
                linear-gradient(to right, rgba(247,191,204,0.55) 2.5px, transparent 2px),
                linear-gradient(to bottom, rgba(247,191,204,0.55) 2.5px, transparent 2px)
              `,
                            backgroundSize: '72px 72px',
                            opacity: 0.55
                        }}
                    />

                    {/* DECOR */}
                    <Image
                        src="/decor/rainbow.png"
                        alt=""
                        width={350}
                        height={350}
                        className="pointer-events-none absolute -left-2 top-2 opacity-50"
                        priority
                    />
                    <Image
                        src="/decor/sun.png"
                        alt=""
                        width={120}
                        height={120}
                        className="pointer-events-none absolute right-35 top-16 opacity-60"
                    />
                    <Image
                        src="/decor/heart.png"
                        alt=""
                        width={120}
                        height={120}
                        className="pointer-events-none absolute bottom-16 right-65 opacity-60"
                    />
                    <Image
                        src="/decor/star.png"
                        alt=""
                        width={140}
                        height={140}
                        className="pointer-events-none absolute bottom-14 left-90 opacity-70 rotate-12"
                    />

                    {/* CONTENT (fixed subtitle, no random quote here) */}
                    <QuoteBlock dateLabel={dateLabel} />

                    {/* button */}
                    <div className="relative -mt-28 pb-16 flex justify-center">
                        <button
                            onClick={onClickRandom}
                            className="
                relative
                rounded-full border-2 border-ddCocoa bg-ddBlush
                px-10 py-3
                font-mono text-[22px] text-ddInkBlue
                shadow-[0_8px_0_rgba(79,29,22,0.25)]
                transition
                hover:-translate-y-[1px]
                hover:bg-ddInkBlue
                hover:text-ddBlush
                active:translate-y-[3px]
                active:shadow-[0_5px_0_rgba(79,29,22,0.25)]
              "
                        >
                            Click here!
                        </button>
                    </div>
                    <div className="absolute bottom-3 right-4 h-6 w-6 rounded-full border-3 border-ddCocoa bg-ddBlush">
                        <div className="absolute inset-1 rounded-full bg-white/30" />
                    </div>
                </div>
            </div>

            {/* OVERLAY CARD (random quote appears here) */}
            <OverlayQuoteCard
                isOpen={isOpen}
                bgSrc={bgSrc}
                enLines={msg.en}
                thLines={msg.th}
                onClose={closeOverlay}
            />

            <Footer />
        </main>
    );
}
