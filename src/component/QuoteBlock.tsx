import ScrollReveal from './ScrollReveal';

type QuoteBlockProps = {
    title?: string;
    dateLabel: string;
};

export default function QuoteBlock({
    title = 'Hello, my favorite person!',
    dateLabel
}: QuoteBlockProps) {
    return (
        <div className="relative px-6 pt-8 pb-6 sm:px-10 sm:pt-10 sm:pb-8">
            {/* date */}
            <ScrollReveal
                animationClass="animate-slideInLeft"
                delayClass="anim-delay-200"
            >
                <div className="font-mono text-md sm:text-xl text-ddInkBlue animate-slideDownFade">
                    {dateLabel}
                </div>
            </ScrollReveal>

            {/* title */}
            <ScrollReveal
                animationClass="animate-slideInDown"
                delayClass="anim-delay-600"
            >
                <h1
                    className="
          mt-10 sm:mt-14
          text-center
          font-onest font-semibold leading-tight text-ddCocoa
          text-[34px] sm:text-[46px] lg:text-[58px]
          animate-slideDownFade [animation-delay:0.08s]
        "
                >
                    {title}
                </h1>
            </ScrollReveal>

            {/* subtitle */}
            <ScrollReveal
                animationClass="animate-slideInUp"
                delayClass="anim-delay-600"
            >
                <div
                    className="
          mt-5 sm:mt-10
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
            </ScrollReveal>
        </div>
    );
}
