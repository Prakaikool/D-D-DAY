'use client';

import Image from 'next/image';

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
            “
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
            ”
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
        "
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Close (always clickable) */}
                <button
                    type="button"
                    onClick={onClose}
                    className="
            absolute right-3 top-3 z-[60]
            pointer-events-auto
            rounded-full border-2 border-ddInkBlue/70
            bg-ddBlush px-3 py-2 sm:px-4
            font-mono text-sm sm:text-md text-ddInkBlue
            shadow
            hover:bg-ddInkBlue hover:text-ddBlush hover:border-ddBlush
          "
                >
                    Close ✕
                </button>

                {/* Card */}
                <div
                    className="
            relative w-full overflow-hidden
            aspect-[4/5] sm:aspect-square
          "
                >
                    {/* background image */}
                    <Image src={bgSrc} alt="" fill className="object-contain" />

                    {/* Content */}
                    <div
                        className="
              absolute inset-0
              flex items-center justify-center
              p-4 sm:p-8
            "
                    >
                        {/* ✅ ANDROID/FLIP FIX: clamp width + safe padding */}
                        <div
                            className="
                relative w-full
                max-w-[min(86vw,320px)]      /* mobile (Flip/Android) ไม่ล้น */
                sm:max-w-[420px]
                lg:max-w-[380px]             /* desktop ไม่ใหญ่เกิน */
                overflow-auto
                rounded-xl lg:rounded-2xl
                px-3 max-[380px]:px-2 sm:px-0 /* กันชนขอบจอเล็กมาก */
              "
                        >
                            {/* ✅ push left a bit on mobile */}
                            <p className="font-mono text-ddInkBlue text-[16px] sm:text-[22px] pl-1 sm:pl-0">
                                Dear, You!
                            </p>

                            {/* EN */}
                            <div className="mt-4 sm:mt-12 text-center">
                                {/* ✅ narrower on very small screens (Android/Flip) */}
                                <div className="mx-auto max-w-[22ch] max-[380px]:max-w-[20ch] sm:max-w-[32ch]">
                                    <QuotedText
                                        lines={enLines}
                                        className="
                      font-mono text-ddCocoa
                      text-[16px] sm:text-[22px]
                      leading-relaxed
                      break-words
                      [overflow-wrap:anywhere]
                    "
                                    />
                                </div>
                            </div>

                            {/* TH */}
                            <div className="mt-4 sm:mt-5 text-center">
                                <div className="mx-auto max-w-[22ch] max-[380px]:max-w-[20ch] sm:max-w-[30ch]">
                                    <QuotedText
                                        lines={thLines}
                                        className="
                      font-onest text-ddCocoa
                      text-[14px] sm:text-[18px]
                      leading-relaxed
                      break-words
                      [overflow-wrap:anywhere]
                    "
                                    />
                                </div>
                            </div>

                            {/* ✅ push right a bit on mobile */}
                            <p className="mt-4 sm:mt-12 text-right font-mono text-ddInkBlue text-[16px] sm:text-[22px] pr-1 sm:pr-0">
                                Nadia :)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
