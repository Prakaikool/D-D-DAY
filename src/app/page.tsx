'use client';

import { useEffect, useState } from 'react';
import Content, { type OverlayPayload } from '@/component/Content';
import OverlayQuoteCard from '@/component/OverlayQuoteCard';
import About from '@/component/About';
import Footer from '@/component/Footer';

const SPARKLES = [
    { id: 0,  left: '6%',  top: '14%', size: '10px', color: 'rgba(240,188,74,0.70)', dur: '3.8s', del: '0.0s' },
    { id: 1,  left: '17%', top: '62%', size: '8px',  color: 'rgba(194,98,96,0.55)',  dur: '4.5s', del: '0.9s' },
    { id: 2,  left: '31%', top: '25%', size: '9px',  color: 'rgba(240,188,74,0.60)', dur: '3.3s', del: '1.7s' },
    { id: 3,  left: '44%', top: '80%', size: '7px',  color: 'rgba(194,98,96,0.45)',  dur: '5.1s', del: '0.4s' },
    { id: 4,  left: '57%', top: '17%', size: '10px', color: 'rgba(240,188,74,0.65)', dur: '4.0s', del: '2.2s' },
    { id: 5,  left: '71%', top: '50%', size: '8px',  color: 'rgba(194,98,96,0.50)',  dur: '3.6s', del: '1.1s' },
    { id: 6,  left: '84%', top: '33%', size: '9px',  color: 'rgba(240,188,74,0.60)', dur: '4.7s', del: '0.6s' },
    { id: 7,  left: '92%', top: '72%', size: '7px',  color: 'rgba(194,98,96,0.50)',  dur: '3.4s', del: '1.9s' },
    { id: 8,  left: '13%', top: '87%', size: '8px',  color: 'rgba(79,29,22,0.35)',   dur: '4.3s', del: '2.6s' },
    { id: 9,  left: '26%', top: '43%', size: '10px', color: 'rgba(240,188,74,0.50)', dur: '3.7s', del: '0.8s' },
    { id: 10, left: '63%', top: '90%', size: '8px',  color: 'rgba(194,98,96,0.45)',  dur: '4.6s', del: '1.4s' },
    { id: 11, left: '79%', top: '7%',  size: '9px',  color: 'rgba(240,188,74,0.60)', dur: '3.9s', del: '2.1s' },
    { id: 12, left: '50%', top: '57%', size: '7px',  color: 'rgba(194,98,96,0.40)',  dur: '4.2s', del: '0.5s' },
    { id: 13, left: '88%', top: '94%', size: '9px',  color: 'rgba(240,188,74,0.55)', dur: '3.5s', del: '1.6s' },
    { id: 14, left: '3%',  top: '42%', size: '7px',  color: 'rgba(79,29,22,0.30)',   dur: '4.4s', del: '2.3s' },
    { id: 15, left: '39%', top: '10%', size: '10px', color: 'rgba(194,98,96,0.50)',  dur: '3.2s', del: '1.0s' },
];

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [overlayData, setOverlayData] = useState<OverlayPayload>({
        bgSrc: '/background/card-pink.png',
        enLines: [],
        thLines: []
    });

    function closeOverlay() {
        setIsOpen(false);
    }

    function handleOpenOverlay(payload: OverlayPayload) {
        setOverlayData(payload);
        setIsOpen(true);
    }

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') closeOverlay();
        }

        if (isOpen) window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    return (
        <main className="min-h-screen bg-ddBlush animate-warmDrift font-onest text-ddCocoa">
            {/* Ambient sparkles */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
                {SPARKLES.map((s) => (
                    <span
                        key={s.id}
                        className="absolute animate-sparklePop select-none"
                        style={{
                            left: s.left,
                            top: s.top,
                            fontSize: s.size,
                            color: s.color,
                            animationDuration: s.dur,
                            animationDelay: s.del,
                        }}
                    >
                        ✦
                    </span>
                ))}
            </div>

            <Content onOpenOverlay={handleOpenOverlay} />

            <OverlayQuoteCard
                isOpen={isOpen}
                bgSrc={overlayData.bgSrc}
                enLines={overlayData.enLines}
                thLines={overlayData.thLines}
                onClose={closeOverlay}
            />

            <About />
            <Footer />
        </main>
    );
}
