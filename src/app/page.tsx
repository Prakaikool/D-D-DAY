'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { MESSAGES } from '@/data/messages';
import Footer from './component/Footer';

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

/** เปลี่ยนชื่อไฟล์ให้ตรงกับของเธอ */
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
            {/* OUTER FRAME (เหมือนรูป) */}
            <div className="mx-auto max-w-[980px] px-6 pt-6 pb-10">
                {/* TOP BAR */}
                <div className="flex items-center justify-between border-2 border-ddCocoa bg-ddCocoa px-6 py-4">
                    <div className="font-mono text-2xl tracking-[0.25em] text-white">
                        D-D-DAY
                    </div>
                    <button className="font-mono text-sm tracking-[0.2em] text-white/90 hover:text-white">
                        ABOUT
                    </button>
                </div>

                {/* MAIN CARD */}
                <div className="relative overflow-hidden rounded-b-2xl border-x-2 border-b-2 border-ddCocoa">
                    {/* background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-ddSky via-[#EAF2FF] to-ddButter" />

                    {/* pink grid */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            backgroundImage: `
                linear-gradient(to right, rgba(247,191,204,0.55) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(247,191,204,0.55) 1px, transparent 1px)
              `,
                            backgroundSize: '72px 72px',
                            opacity: 0.55
                        }}
                    />

                    {/* DECOR */}
                    <Image
                        src="/decor/rainbow.png"
                        alt=""
                        width={520}
                        height={520}
                        className="pointer-events-none absolute -left-28 top-12 opacity-35"
                        priority
                    />
                    <Image
                        src="/decor/sun.png"
                        alt=""
                        width={120}
                        height={120}
                        className="pointer-events-none absolute right-16 top-16 opacity-20"
                    />
                    <Image
                        src="/decor/heart.png"
                        alt=""
                        width={120}
                        height={120}
                        className="pointer-events-none absolute bottom-14 right-44 opacity-18"
                    />
                    {/* ⭐ เพิ่มดาวน่ารักซ้ายล่าง */}
                    <Image
                        src="/decor/star.png"
                        alt=""
                        width={140}
                        height={140}
                        className="pointer-events-none absolute bottom-14 left-24 opacity-95 drop-shadow-[0_10px_18px_rgba(0,0,0,0.15)]"
                    />

                    {/* CONTENT */}
                    <div className="relative min-h-[520px] px-10 py-10">
                        {/* date */}
                        <div className="font-mono text-sm text-ddInkBlue">
                            {dateLabel}
                        </div>

                        {/* title */}
                        <h1 className="mt-14 text-center font-onest text-[40px] font-semibold leading-tight text-ddCocoa">
                            Hello, my favorite person!
                        </h1>

                        {/* message (อังกฤษเท่านั้นตรงกลางตามรูป) */}
                        <div className="mt-8 text-center font-mono text-[18px] leading-relaxed text-ddInkBlue">
                            {msg.en.map((line, i) => (
                                <p key={`en-${i}`}>{line}</p>
                            ))}
                        </div>

                        {/* button (มีชั้นเหมือนรูป) */}
                        <div className="mt-16 flex justify-center">
                            <button
                                onClick={onClickRandom}
                                className="
                  relative
                  rounded-full border-2 border-ddCocoa bg-ddBlush
                  px-10 py-3
                  font-mono text-[18px] text-ddInkBlue
                  shadow-[0_8px_0_rgba(79,29,22,0.25)]
                  transition
                  hover:-translate-y-[1px]
                  active:translate-y-[3px]
                  active:shadow-[0_5px_0_rgba(79,29,22,0.25)]
                "
                            >
                                Click here!
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* OVERLAY CARD */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4"
                    role="dialog"
                    aria-modal="true"
                    onMouseDown={closeOverlay}
                >
                    <div
                        className="relative w-full max-w-[560px]"
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeOverlay}
                            className="absolute -top-12 right-0 rounded-full border-2 border-white/70 bg-white/90 px-4 py-2 font-mono text-sm text-ddCocoa shadow hover:bg-white"
                        >
                            Close ✕
                        </button>

                        <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                            <Image
                                src={bgSrc}
                                alt=""
                                fill
                                className="object-contain"
                            />

                            <div className="absolute inset-0 grid place-items-center p-8 text-center">
                                <div className="w-full max-w-[420px]">
                                    <p className="font-mono text-ddInkBlue text-[18px]">
                                        Dear, You
                                    </p>

                                    <div className="mt-6 space-y-2">
                                        {msg.en.map((line, i) => (
                                            <p
                                                key={`overlay-en-${i}`}
                                                className="font-mono text-ddCocoa text-[22px] leading-snug"
                                            >
                                                “{line}”
                                            </p>
                                        ))}
                                    </div>

                                    <div className="mt-5 space-y-1">
                                        {msg.th.map((line, i) => (
                                            <p
                                                key={`overlay-th-${i}`}
                                                className="font-onest text-ddCocoa text-[18px] leading-snug"
                                            >
                                                “{line}”
                                            </p>
                                        ))}
                                    </div>

                                    <p className="mt-8 text-right font-mono text-ddInkBlue text-[18px]">
                                        Nadia :)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="mt-4 text-center font-mono text-xs text-white/80">
                            Tip: Press{' '}
                            <span className="font-semibold">ESC</span> to close
                        </p>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
