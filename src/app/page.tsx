'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { MESSAGES } from '@/data/messages';

/* ---------- helpers ---------- */
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

/* ---------- page ---------- */
export default function Home() {
    const todayIndex = useMemo(() => {
        const doy = dayOfYearUTC(new Date());
        return doy % MESSAGES.length;
    }, []);

    const [index, setIndex] = useState(todayIndex);
    const msg = MESSAGES[index];
    const dateLabel = useMemo(() => formatDate(new Date()), []);

    function handleClick() {
        setIndex((prev) => {
            if (MESSAGES.length <= 1) return prev;
            let next = prev;
            while (next === prev) {
                next = Math.floor(Math.random() * MESSAGES.length);
            }
            return next;
        });
    }

    return (
        <main className="min-h-screen flex flex-col bg-ddBlush font-onest text-ddCocoa">
            {/* ---------- TOP BAR ---------- */}
            <header className="mx-auto max-w-full px-6 pt-6">
                <div className="flex items-center justify-between rounded-t-2xl border-2 border-ddCocoa bg-ddCocoa px-6 py-4">
                    <div className="font-mono text-2xl tracking-[0.25em] text-white">
                        D-D-DAY
                    </div>
                    <button className="font-mono text-sm tracking-[0.2em] text-white/90 hover:text-white">
                        ABOUT
                    </button>
                </div>
            </header>

            {/* ---------- CARD ---------- */}
            <section className="mx-auto max-w-full px-6 pb-10">
                <div className="relative overflow-hidden rounded-b-2xl border-x-2 border-b-2 border-ddCocoa bg-gradient-to-b from-ddSky via-[#EAF2FF] to-ddButter">
                    {/* grid overlay (pink) */}
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

                    {/* ---------- DECOR IMAGES ---------- */}
                    <Image
                        src="/decor/rainbow.png"
                        alt=""
                        width={520}
                        height={520}
                        className="pointer-events-none absolute -left-24 top-10 opacity-40"
                        priority
                    />
                    <Image
                        src="/decor/sun.png"
                        alt=""
                        width={120}
                        height={120}
                        className="pointer-events-none absolute right-20 top-20 opacity-20"
                    />
                    <Image
                        src="/decor/heart.png"
                        alt=""
                        width={120}
                        height={120}
                        className="pointer-events-none absolute bottom-16 right-44 opacity-20"
                    />

                    {/* ---------- CONTENT ---------- */}
                    <div className="relative px-10 py-12">
                        {/* date */}
                        <div className="font-mono text-sm text-ddInkBlue">
                            {dateLabel}
                        </div>

                        {/* title */}
                        <h1 className="mt-10 text-center font-onest text-[40px] font-semibold leading-tight text-ddCocoa">
                            Hello, my favorite person!
                        </h1>

                        {/* messages */}
                        <div className="mt-6 text-center">
                            {/* EN */}
                            <div className="space-y-2 font-mono text-[16px] leading-relaxed text-ddInkBlue">
                                {msg.en.map((line, i) => (
                                    <p key={`en-${i}`}>{line}</p>
                                ))}
                            </div>

                            {/* TH */}
                            <div className="mt-4 space-y-1 font-onest text-[16px] leading-relaxed text-ddCocoa">
                                {msg.th.map((line, i) => (
                                    <p key={`th-${i}`}>{line}</p>
                                ))}
                            </div>
                        </div>

                        {/* button */}
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={handleClick}
                                className="
                  rounded-full border-2 border-ddCocoa bg-ddBlush px-10 py-4
                  font-mono text-[18px] text-ddInkBlue
                  shadow-[0_10px_0_rgba(79,29,22,0.18)]
                  transition
                  hover:-translate-y-[1px]
                  active:translate-y-[2px]
                  active:shadow-[0_6px_0_rgba(79,29,22,0.18)]
                "
                            >
                                Click here!
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="mt-auto bg-ddCocoa px-6 py-4">
                <div className="mx-auto max-w-full">
                    <p className="font-mono text-sm text-white/90">
                        Prakaikool
                    </p>
                </div>
            </footer>
        </main>
    );
}
