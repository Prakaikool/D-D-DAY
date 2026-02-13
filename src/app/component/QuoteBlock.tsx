type QuoteBlockProps = {
    title?: string;
    dateLabel: string;
};

export default function QuoteBlock({
    title = 'Hello, my favorite person!',
    dateLabel
}: QuoteBlockProps) {
    return (
        <div className="relative min-h-[520px] px-10 py-10">
            {/* date */}
            <div className="font-mono text-xl text-ddInkBlue">{dateLabel}</div>

            {/* title */}
            <h1 className="mt-14 text-center font-onest text-[40px] font-semibold leading-tight text-ddCocoa">
                {title}
            </h1>

            {/* ✨ subtitle (fixed, not random quote) */}
            <div className="mt-10 text-center font-mono text-xl leading-relaxed text-ddInkBlue space-y-1">
                <p>Let me be a soft chapter in your story today</p>
                <p>I hope it makes you smile...</p>
            </div>
        </div>
    );
}
