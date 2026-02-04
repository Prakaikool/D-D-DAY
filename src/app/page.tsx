'use client';

import { useMemo, useState } from 'react';
import { MESSAGES } from '@/data/messages';

function dayOfYearUTC(d: Date) {
    const start = Date.UTC(d.getUTCFullYear(), 0, 1);
    const now = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    return Math.floor((now - start) / 86400000); // 0..365
}

function formatDateYYMMDD(d: Date) {
    const yy = String(d.getFullYear()).slice(2);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${dd}/${mm}-${yy}`; // ใกล้ ๆ แบบในรูป 04/02-26
}

export default function Home() {
    const todayIndex = useMemo(() => {
        const doy = dayOfYearUTC(new Date());
        return doy % MESSAGES.length;
    }, []);

    const [index, setIndex] = useState(todayIndex);

    const msg = MESSAGES[index];
    const dateLabel = useMemo(() => formatDateYYMMDD(new Date()), []);

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
        <main className="min-h-screen bg-[#F7BFCC]">
            {/* top bar */}
            <div className="bg-[#F7BFCC] py-4" />
            <header className="bg-[#5a1f1f] px-6 py-4">
                <h1 className="font-mono text-2xl tracking-widest text-white">
                    D-D-DAY
                </h1>
            </header>

            {/* page wrapper */}
            <section className="mx-auto max-w-[1500] px-4 py-8">
                {/* paper card */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-[#5a1f1f] bg-gradient-to-b from-sky-100 via-amber-50 to-amber-200 shadow-[0_10px_0_rgba(90,31,31,0.25)]">
                    {/* subtle grid */}
                    <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.15)_1px,transparent_1px)] [background-size:52px_52px]" />

                    {/* little rings (top right) */}
                    <div className="absolute right-6 top-3 flex gap-1">
                        <span className="h-10 w-10 rounded-full border-2 border-[#5a1f1f] bg-[#F7BFCC]" />
                        <span className="h-10 w-10 rounded-full border-2 border-[#5a1f1f] bg-[#F7BFCC]" />
                        <span className="h-10 w-10 rounded-full border-2 border-[#5a1f1f] bg-[#F7BFCC]" />
                    </div>

                    {/* content */}
                    <div className="relative px-6 pb-25 pt-25 text-center text-[#5a1f1f] font-mono">
                        <p className="absolute left-6 top-4 font-mono text-[20px] opacity-80">
                            {dateLabel}
                        </p>

                        <div>
                            <h1 className="font-mono text-[36px] font-bold ">
                                Hello, My favourite person!
                            </h1>
                            <p className="text-[24px] mt-6">
                                Let me be a soft charpter in your story today.{' '}
                                <br /> I hope it makes you smile...
                            </p>
                        </div>

                        <div className="mt-20 space-y-2 text-[24px] opacity-90">
                            {msg.lines.map((line, i) => (
                                <p key={`${i}-${line}`}>{line}</p>
                            ))}
                        </div>

                        <div className="mt-20 flex justify-center">
                            <button
                                onClick={handleClick}
                                className="rounded-full border-2 border-[#5a1f1f] bg-[#F7BFCC] px-20 py-4 text-[24px] shadow-[0_6px_0_rgba(90,31,31,0.25)] transition active:translate-y-[2px] active:shadow-[0_4px_0_rgba(90,31,31,0.25)]"
                            >
                                Click here!
                            </button>
                        </div>

                        <p className="mt-6 text-[11px] opacity-70">
                            A small warm message for you today.
                        </p>
                    </div>
                </div>
            </section>

            {/* footer */}
            <footer className="bg-[#5a1f1f] px-6 py-3">
                <p className="text-sm text-white opacity-90">Prakaikool</p>
            </footer>
        </main>
    );
}
