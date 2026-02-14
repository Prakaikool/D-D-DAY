type FooterProps = {
    text?: string;
    className?: string;
};

export default function Footer({ text = 'Prakaikool © 2026', className = '' }: FooterProps) {
    return (
        <footer className={['w-full', className].join(' ')}>
            <div className="mx-auto max-w-full">
                <div className=" bg-ddSky px-12 py-4">
                    <p className="font-mono text-xl text-ddCocoa">{text}</p>

                </div>
                
            </div>
        </footer>
    );
}
