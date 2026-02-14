type QuoteBlockProps = {
    title?: string;
    dateLabel: string;
};

export default function QuoteBlock({
    title = 'Hello, my favorite person!',
    dateLabel
}: QuoteBlockProps) {
    return (
        <div className="relative min-h-[600px] sm:min-h-[520px] px-6 py-8 sm:px-10 sm:py-10">
            {/* date */}
            <div className="font-mono text-md sm:text-xl text-ddInkBlue animate-slideDownFade">
                {dateLabel}
            </div>

            {/* title */}
            <h1
                className="
          mt-8 sm:mt-14
          text-center
          font-onest font-semibold leading-tight text-ddCocoa
          text-[30px] sm:text-[40px] lg:text-[44px]
          animate-slideDownFade [animation-delay:0.08s]
        "
            >
                {title}
            </h1>

            {/* subtitle */}
            <div
                className="
          mt-6 sm:mt-10
          text-center
          font-mono leading-relaxed text-ddInkBlue
          text-md sm:text-xl
          space-y-1
          animate-slideDownFade [animation-delay:0.18s]
        "
            >
                <p>Let me be a soft chapter in your story today</p>
                <p>I hope it makes you smile...</p>
            </div>
        </div>
    );
}
