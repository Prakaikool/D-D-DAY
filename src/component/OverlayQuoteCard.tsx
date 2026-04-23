'use client';

import { useRef, useState } from 'react';
import { useLang } from '@/context/LanguageContext';

type OverlayQuoteCardProps = {
    isOpen: boolean;
    bgSrc: string;
    enLines: string[];
    thLines: string[];
    onClose: () => void;
};

function QuotedText({ lines, className }: { lines: string[]; className: string }) {
    const hasMultiple = lines.length > 1;
    return (
        <p className={className}>
            {'“'}
            {hasMultiple ? (
                lines.map((line, i) => (
                    <span key={i}>
                        {line}
                        {i < lines.length - 1 && <br />}
                    </span>
                ))
            ) : (
                <span>{lines[0] ?? ''}</span>
            )}
            {'”'}
        </p>
    );
}

function fitFontSize(
    ctx: CanvasRenderingContext2D,
    lines: string[],
    fontFn: (sz: number) => string,
    startSize: number,
    minSize: number,
    maxWidth: number
): number {
    let sz = startSize;
    while (sz > minSize) {
        ctx.font = fontFn(sz);
        const widest = Math.max(...lines.map(l => ctx.measureText(l).width));
        if (widest <= maxWidth) break;
        sz -= 2;
    }
    return sz;
}

async function buildShareImage(
    bgSrc: string,
    enLines: string[],
    thLines: string[],
    lang: 'en' | 'th',
    dearLabel: string
): Promise<Blob> {
    const W = 1080, H = 1350;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    const bg = new window.Image();
    bg.src = bgSrc;
    await new Promise<void>((res, rej) => {
        bg.onload = () => res();
        bg.onerror = rej;
    });
    ctx.drawImage(bg, 0, 0, W, H);

    await document.fonts.ready;

    const cs = getComputedStyle(document.body);
    const monoFamily = cs.getPropertyValue('--font-mono').trim() || 'monospace';
    const onestFamily = cs.getPropertyValue('--font-onest').trim() || 'sans-serif';

    const COCOA = '#4f1d16';
    const INK = '#0d3b9f';
    const PADDING = 100;
    const MAX_TEXT_W = W - PADDING * 2;
    const SZ_HEADER = 50;
    const GAP_AFTER_HEADER = 90;
    const GAP_BEFORE_SIG = 90;

    const isEN = lang === 'en';
    const lines = isEN ? enLines : thLines;
    const fontFamily = isEN ? monoFamily : onestFamily;
    const startSz = isEN ? 52 : 44;
    const minSz = isEN ? 24 : 20;
    const lineGap = isEN ? 16 : 14;

    const quoteLines = lines.map(
        (l, i) => (i === 0 ? '“' : '') + l + (i === lines.length - 1 ? '”' : '')
    );
    const sz = fitFontSize(ctx, quoteLines, s => `500 ${s}px ${fontFamily}`, startSz, minSz, MAX_TEXT_W);
    const lineH = sz + lineGap;
    const blockH = quoteLines.length * lineH;
    const totalH = SZ_HEADER + GAP_AFTER_HEADER + blockH + GAP_BEFORE_SIG + SZ_HEADER;
    let y = Math.round((H - totalH) / 2) + SZ_HEADER;

    ctx.font = `500 ${SZ_HEADER}px ${fontFamily}`;
    ctx.fillStyle = INK;
    ctx.textAlign = 'left';
    ctx.fillText(dearLabel, PADDING, y);
    y += GAP_AFTER_HEADER;

    ctx.font = `500 ${sz}px ${fontFamily}`;
    ctx.fillStyle = COCOA;
    ctx.textAlign = 'center';
    quoteLines.forEach((line, i) => ctx.fillText(line, W / 2, y + i * lineH));
    y += blockH + GAP_BEFORE_SIG;

    ctx.font = `500 ${SZ_HEADER}px ${fontFamily}`;
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.fillText('Nadia :)', W - PADDING, y);

    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob) resolve(blob);
            else reject(new Error('canvas.toBlob returned null'));
        }, 'image/png');
    });
}

export default function OverlayQuoteCard({
    isOpen,
    bgSrc,
    enLines,
    thLines,
    onClose
}: OverlayQuoteCardProps) {
    const { lang, t } = useLang();
    const cardRef = useRef<HTMLDivElement>(null);
    const [btnState, setBtnState] = useState<'idle' | 'working' | 'copied'>('idle');

    async function handleShare() {
        if (btnState !== 'idle') return;
        setBtnState('working');
        let objectUrl: string | null = null;
        try {
            const blob = await buildShareImage(bgSrc, enLines, thLines, lang, t("overlay_dear"));
            const file = new File([blob], 'quote.png', { type: 'image/png' });

            if (navigator.canShare?.({ files: [file] })) {
                await navigator.share({ files: [file], title: 'A warm message for you' });
                setBtnState('idle');
            } else if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                setBtnState('copied');
                setTimeout(() => setBtnState('idle'), 2500);
            } else {
                objectUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = objectUrl;
                a.download = 'quote.png';
                a.click();
                setBtnState('idle');
            }
        } catch (err) {
            const e = err as Error;
            if (e?.name !== 'AbortError') {
                console.error('Share failed:', e);
            }
            setBtnState('idle');
        } finally {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        }
    }

    const btnLabel =
        btnState === 'working' ? t("overlay_saving") :
        btnState === 'copied'  ? t("overlay_copied") :
        t("overlay_share");

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ddInkBlue p-3 sm:p-4"
            role="dialog"
            aria-modal="true"
            onMouseDown={onClose}
        >
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `
                linear-gradient(to right, rgba(247,191,204,0.35) 2px, transparent 2px),
                linear-gradient(to bottom, rgba(247,191,204,0.35) 2px, transparent 2px)
              `,
                    backgroundSize: '56px 56px',
                    opacity: 0.25
                }}
            />

            <div
                className="relative w-full max-w-130 sm:max-w-162.5 animate-overlayEnter"
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Buttons row */}
                <div className="absolute right-3 top-3 z-60 flex gap-2 pointer-events-auto">
                    <button
                        type="button"
                        onClick={handleShare}
                        disabled={btnState !== 'idle'}
                        className="rounded-full border-2 border-ddInkBlue/70 bg-ddBlush px-3 py-2 sm:px-4 font-mono text-sm sm:text-md text-ddInkBlue shadow hover:bg-ddInkBlue hover:text-ddBlush hover:border-ddBlush disabled:opacity-50"
                    >
                        {btnLabel}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border-2 border-ddInkBlue/70 bg-ddBlush px-3 py-2 sm:px-4 font-mono text-sm sm:text-md text-ddInkBlue shadow hover:bg-ddInkBlue hover:text-ddBlush hover:border-ddBlush"
                    >
                        {t("overlay_close")}
                    </button>
                </div>

                {/* Card */}
                <div
                    ref={cardRef}
                    className="relative w-full overflow-hidden aspect-4/5 sm:aspect-square"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={bgSrc}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain"
                    />

                    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                        <div className="relative w-full max-w-[min(86vw,320px)] sm:max-w-105 lg:max-w-95 overflow-auto rounded-xl lg:rounded-2xl px-2 sm:px-0">
                            <p className="font-mono text-ddInkBlue text-md sm:text-[22px]">
                                {t("overlay_dear")}
                            </p>

                            {lang === 'en' ? (
                                <div className="mt-4 sm:mt-12 text-center">
                                    <div className="mx-auto max-w-[26ch] sm:max-w-[32ch]">
                                        <QuotedText
                                            lines={enLines}
                                            className="font-mono text-ddCocoa text-[16px] sm:text-[22px] leading-relaxed text-balance"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-4 sm:mt-12 text-center">
                                    <div className="mx-auto max-w-[24ch] sm:max-w-[30ch]">
                                        <QuotedText
                                            lines={thLines}
                                            className="font-onest text-ddCocoa text-[16px] sm:text-[22px] leading-relaxed text-balance"
                                        />
                                    </div>
                                </div>
                            )}

                            <p className="mt-4 sm:mt-12 text-right font-mono text-ddInkBlue text-md sm:text-[22px]">
                                Nadia :)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
