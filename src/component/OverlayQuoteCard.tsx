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
    // ✅ If lines are provided (1-2 lines), we keep them.
    // But we still make wrapping look nicer with text-balance and a max width.
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
                {/* Close */}
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
                    <Image
                        src={bgSrc}
                        alt=""
                        fill
                        className="object-contain"
                        // optional: helps avoid heavy caching while dev
                        // unoptimized
                    />

                    {/* Content */}
                    <div
                        className="
              absolute inset-0
              flex items-center justify-center
              p-4 sm:p-8
            "
                    >
                        <div className="relative w-full max-w-[280px] sm:max-w-[420px] lg:max-w-[380px] overflow-auto rounded-xl lg:rounded-2xl">
                            <p className="font-mono text-ddInkBlue text-md sm:text-[22px]">
                                Dear, You!
                            </p>

                            {/* EN */}
                            <div className="mt-12 text-center">
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

                            <p className="mt-6 sm:mt-12 text-right font-mono text-ddInkBlue text-md sm:text-[22px]">
                                Nadia :)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
