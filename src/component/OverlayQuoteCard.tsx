'use client';

import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';

type OverlayQuoteCardProps = {
    isOpen: boolean;
    bgSrc: string;
    enLines: string[];
    thLines: string[];
    onClose: () => void;
};

function QuotedText({
    lines,
    className
}: {
    lines: string[];
    className: string;
}) {
    const hasMultiple = lines.length > 1;

    return (
        <p className={className}>
            "
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
            "
        </p>
    );
}

export default function OverlayQuoteCard({
    isOpen,
    bgSrc,
    enLines,
    thLines,
    onClose
}: OverlayQuoteCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isSharing, setIsSharing] = useState(false);

    async function handleShare() {
        if (!cardRef.current || isSharing) return;
        setIsSharing(true);
        try {
            const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });

            const res = await fetch(dataUrl);
            const blob = await res.blob();
            const file = new File([blob], 'quote.png', { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({ files: [file], title: 'A warm message for you' });
            } else {
                // Desktop fallback: download the image
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = 'quote.png';
                a.click();
            }
        } catch {
            // User cancelled share or capture failed — do nothing
        } finally {
            setIsSharing(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div
            className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-ddInkBlue
        p-3 sm:p-4
      "
            role="dialog"
            aria-modal="true"
            onMouseDown={onClose}
        >
            {/* grid overlay */}
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
                className="
          relative w-full
          max-w-[520px] sm:max-w-[650px]
          animate-overlayEnter
        "
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Buttons row */}
                <div className="absolute right-3 top-3 z-60 flex gap-2 pointer-events-auto">
                    {/* Share */}
                    <button
                        type="button"
                        onClick={handleShare}
                        disabled={isSharing}
                        className="
                            rounded-full border-2 border-ddInkBlue/70
                            bg-ddBlush px-3 py-2 sm:px-4
                            font-mono text-sm sm:text-md text-ddInkBlue
                            shadow
                            hover:bg-ddInkBlue hover:text-ddBlush hover:border-ddBlush
                            disabled:opacity-50
                        "
                    >
                        {isSharing ? 'Saving…' : 'Share ↗'}
                    </button>

                    {/* Close */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-full border-2 border-ddInkBlue/70
                            bg-ddBlush px-3 py-2 sm:px-4
                            font-mono text-sm sm:text-md text-ddInkBlue
                            shadow
                            hover:bg-ddInkBlue hover:text-ddBlush hover:border-ddBlush
                        "
                    >
                        Close ✕
                    </button>
                </div>

                {/* Card — captured as image */}
                <div
                    ref={cardRef}
                    className="
            relative w-full overflow-hidden
            aspect-4/5 sm:aspect-square
          "
                >
                    {/* background image — plain img so canvas capture works */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={bgSrc}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain"
                    />

                    {/* Content */}
                    <div
                        className="
              absolute inset-0
              flex items-center justify-center
              p-4 sm:p-8
            "
                    >
                        <div
                            className="
    relative w-full
    max-w-[min(86vw,320px)]
    sm:max-w-[420px]
    lg:max-w-[380px]
    overflow-auto
    rounded-xl lg:rounded-2xl
    px-2 sm:px-0
  "
                        >
                            <p className="font-mono text-ddInkBlue text-md sm:text-[22px]">
                                Dear, You!
                            </p>

                            {/* EN */}
                            <div className="mt-4 sm:mt-12 text-center">
                                <div className="mx-auto max-w-[26ch] sm:max-w-[32ch]">
                                    <QuotedText
                                        lines={enLines}
                                        className="
                      font-mono text-ddCocoa
                      text-[16px] sm:text-[22px]
                      leading-relaxed
                      text-balance
                    "
                                    />
                                </div>
                            </div>

                            {/* TH */}
                            <div className="mt-4 sm:mt-5 text-center">
                                <div className="mx-auto max-w-[24ch] sm:max-w-[30ch]">
                                    <QuotedText
                                        lines={thLines}
                                        className="
                      font-onest text-ddCocoa
                      text-[14px] sm:text-[18px]
                      leading-relaxed
                      text-balance
                    "
                                    />
                                </div>
                            </div>

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
