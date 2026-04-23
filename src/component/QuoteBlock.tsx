import ScrollReveal from './ScrollReveal';
import { useLang } from '@/context/LanguageContext';

type QuoteBlockProps = {
    dateLabel: string;
};

export default function QuoteBlock({ dateLabel }: QuoteBlockProps) {
    const { t } = useLang();

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
                    {t('quote_greeting')}
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
                    <p>{t('quote_subtitle_1')}</p>
                    <p>{t('quote_subtitle_2')}</p>
                </div>
            </ScrollReveal>
        </div>
    );
}
