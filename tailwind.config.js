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
                ddSky: '#D9E8FF',
                ddButter: '#F7E498',
                ddBlush: '#F7BFCC',
                ddInkBlue: '#0D3B9F',
                ddCocoa: '#4F1D16'
            },

            fontFamily: {
                onest: ['var(--font-onest)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-mono)', 'ui-monospace', 'monospace']
            }
        }
    },
    plugins: []
};
