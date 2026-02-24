'use client';

import { useEffect, useState } from 'react';
import Content, { type OverlayPayload } from '@/component/Content';
import OverlayQuoteCard from '@/component/OverlayQuoteCard';
import About from '@/component/About';
import Footer from '@/component/Footer';

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
        <main className="min-h-screen bg-ddBlush font-onest text-ddCocoa">
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
