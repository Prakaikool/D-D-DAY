type FooterProps = {
    text?: string;
    className?: string;
};

export default function Footer({
    text = 'Prakaikool © 2026',
    className = ''
}: FooterProps) {
    return (
        <footer className={['w-full', className].join(' ')}>
            <div className="mx-auto max-w-full">
                <div
                    className="
            bg-ddSky
            px-6 py-4
            sm:px-8
            lg:px-12
            flex flex-col gap-2
            sm:flex-row sm:items-center sm:justify-between
          "
                >
                    {/* LEFT */}
                    <p className="font-mono text-base text-ddCocoa sm:text-lg lg:text-xl">
                        {text}
                    </p>

                    {/* RIGHT */}
                    <a
                        href="https://www.prakaikool-teepraken.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              inline-block
              font-mono font-bold tracking-[0.2em]
              text-base text-ddCocoa
              transition-all duration-300
              hover:text-ddInkBlue hover:scale-110
              sm:text-lg lg:text-xl
              self-start sm:self-auto
            "
                    >
                        PORTFOLIO
                    </a>
                </div>
            </div>
        </footer>
    );
}
