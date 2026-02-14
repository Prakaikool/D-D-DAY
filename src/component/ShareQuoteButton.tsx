'use client';

import { useState } from 'react';

type ShareQuoteButtonProps = {
    enLines: string[];
    thLines: string[];
    className?: string;
    getUrl?: () => string; // เผื่ออยากส่งลิงก์แบบ custom
};

export default function ShareQuoteButton({
    enLines,
    thLines,
    className = '',
    getUrl
}: ShareQuoteButtonProps) {
    const [copied, setCopied] = useState(false);

    async function onShare() {
        const url =
            typeof getUrl === 'function' ? getUrl() : window.location.href;

        const text = [
            ...enLines.map((l) => `“${l}”`),
            ...thLines.map((l) => `“${l}”`),
            '',
            '— Nadia :)'
        ].join('\n');

        const shareData = { title: 'D-D-DAY', text, url };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                return;
            }

            // fallback: copy
            await navigator.clipboard.writeText(`${text}\n\n${url}`);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
        } catch {
            // เงียบไว้ ไม่ทำให้ error โผล่
        }
    }

    return (
        <button
            type="button"
            onClick={onShare}
            className={[
                `
        rounded-full border-2 border-ddInkBlue/70
        bg-ddBlush px-3 py-2 sm:px-4
        font-mono text-sm sm:text-md text-ddInkBlue
        shadow
        hover:bg-ddInkBlue hover:text-ddBlush hover:border-ddBlush
        `,
                className
            ].join(' ')}
        >
            {copied ? 'Copied ✓' : 'Share ↗'}
        </button>
    );
}
