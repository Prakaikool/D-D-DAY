'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { MESSAGES } from '@/data/messages';

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
            while (next === prev)
                next = Math.floor(Math.random() * MESSAGES.length);
            return next;
        });
    }

    return (
        <main className="min-h-screen bg-blush font-onest text-cocoa">
            {/* Top bar */}
            <header className="mx-auto max-w-[980px] px-6 pt-6">
                <div className="flex items-center justify-between rounded-t-2xl border-2 border-cocoa bg-cocoa px-6 py-4">
                    <div className="font-mono text-2xl tracking-[0.25em] text-white">
                        D-D-DAY
                    </div>
                    <button className="font-mono text-sm tracking-[0.2em] text-white/90 hover:text-white">
                        ABOUT
                    </button>
                </div>
            </header>

            {/* Card */}
            <section className="mx-auto max-w-[980px] px-6 pb-10">
                <div className="relative overflow-hidden rounded-b-2xl border-x-2 border-b-2 border-cocoa bg-gradient-to-b from-sky via-[#EAF2FF] to-butter">
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

                    {/* Decorative PNGs */}
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

                    {/* Content */}
                    <div className="space-y-2 text-center">
                        {msg.en.map((line, i) => (
                            <p
                                key={`en-${i}`}
                                className="font-mono text-inkBlue"
                            >
                                {line}
                            </p>
                        ))}

                        <div className="pt-2">
                            {msg.th.map((line, i) => (
                                <p
                                    key={`th-${i}`}
                                    className="font-onest text-cocoa"
                                >
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer strip */}
                <div className="rounded-b-2xl bg-cocoa px-6 py-4">
                    <p className="font-mono text-sm text-white/90">
                        Prakaikool
                    </p>
                </div>
            </section>
        </main>
    );
}
