/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                sky: '#D9E8FF',
                butter: '#F7E498',
                blush: '#F7BFCC',
                inkBlue: '#0D3B9F',
                cocoa: '#4F1D16'
            },
            fontFamily: {
                onest: ['var(--font-onest)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-mono)', 'ui-monospace', 'monospace']
            }
        }
    },
    plugins: []
};
