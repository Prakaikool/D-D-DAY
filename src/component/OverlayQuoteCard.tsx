import Image from 'next/image';

type OverlayQuoteCardProps = {
    isOpen: boolean;
    bgSrc: string;
    enLines: string[];
    thLines: string[];
    onClose: () => void;
};

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
        bg-ddInkBlue/25
        p-3 sm:p-4
      "
            role="dialog"
            aria-modal="true"
            onMouseDown={onClose}
        >
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
            rounded-2xl sm:rounded-3xl
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            aspect-[4/5] sm:aspect-square
          "
                >
                    <Image src={bgSrc} alt="" fill className="object-contain" />

                    {/* Content wrapper: scroll if needed on small screens */}
                    <div
                        className="
              absolute inset-0
              flex items-center justify-center
              p-4 sm:p-8
            "
                    >
                        <div
                            className="
                w-full max-w-[420px]
                max-h-[78vh] sm:max-h-none
                overflow-auto
                rounded-xl
              "
                        >
                            <p className="text-center font-mono text-ddInkBlue text-sm sm:text-[18px]">
                                Dear, You!
                            </p>

                            <div className="mt-4 sm:mt-6 space-y-2 text-center">
                                {enLines.map((line, i) => (
                                    <p
                                        key={`overlay-en-${i}`}
                                        className="
                      font-mono text-ddCocoa
                      text-[16px] sm:text-[22px]
                      leading-snug
                    "
                                    >
                                        “{line}”
                                    </p>
                                ))}
                            </div>

                            <div className="mt-3 sm:mt-5 space-y-1 text-center">
                                {thLines.map((line, i) => (
                                    <p
                                        key={`overlay-th-${i}`}
                                        className="
                      font-onest text-ddCocoa
                      text-[14px] sm:text-[18px]
                      leading-snug
                    "
                                    >
                                        “{line}”
                                    </p>
                                ))}
                            </div>

                            <p className="mt-5 sm:mt-8 text-right font-mono text-ddInkBlue text-sm sm:text-[18px]">
                                Nadia :)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Hint (responsive) */}
                <p className="mt-3 text-center font-mono text-[10px] sm:text-xs text-white/80">
                    Tip: Press <span className="font-semibold">ESC</span> to
                    close
                </p>
            </div>
        </div>
    );
}
