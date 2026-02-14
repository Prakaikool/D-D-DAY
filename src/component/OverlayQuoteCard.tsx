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
            className="fixed inset-0 z-50 flex items-center justify-center bg-ddInkBlue/25 px-4"
            role="dialog"
            aria-modal="true"
            onMouseDown={onClose}
        >
            <div
                className="relative w-full max-w-[650px]"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="
    absolute right-4 top-4 z-[60]
    pointer-events-auto
    rounded-full border-2 border-ddInkBlue/70
    bg-ddBlush px-4 py-2
    font-mono text-md text-ddInkBlue
    shadow
    hover:bg-ddInkBlue hover:text-ddBlush hover:border-ddBlush
  "
                >
                    Close ✕
                </button>

                <div className="relative aspect-square w-full overflow-hidden">
                    <Image src={bgSrc} alt="" fill className="object-contain" />

                    <div className="absolute inset-0 grid place-items-center p-8">
                        <div className="w-full max-w-[420px]">
                            <p className="font-mono text-ddInkBlue text-[18px]">
                                Dear, You!
                            </p>

                            <div className="mt-6 space-y-2 text-center">
                                {enLines.map((line, i) => (
                                    <p
                                        key={`overlay-en-${i}`}
                                        className="font-mono text-ddCocoa text-[22px] leading-snug"
                                    >
                                        “{line}”
                                    </p>
                                ))}
                            </div>

                            <div className="mt-5 space-y-1 text-center">
                                {thLines.map((line, i) => (
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
            </div>
        </div>
    );
}
