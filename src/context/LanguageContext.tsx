'use client';

import { createContext, useContext, useState } from 'react';
import { translations, type Lang, type TranslationKey } from '@/data/translations';

type LanguageContextValue = {
    lang: Lang;
    t: (key: TranslationKey) => string;
    toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue>({
    lang: 'en',
    t: (key) => translations.en[key],
    toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>('en');

    function toggleLang() {
        setLang((l) => (l === 'en' ? 'th' : 'en'));
    }

    function t(key: TranslationKey): string {
        return translations[lang][key];
    }

    return (
        <LanguageContext.Provider value={{ lang, t, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    return useContext(LanguageContext);
}
