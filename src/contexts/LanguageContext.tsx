import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const LOCALE_STORAGE_KEY = 'cv-locale';

export type Locale = 'vi' | 'en';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function loadStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'vi';
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === 'vi' || stored === 'en') return stored;
  return 'vi';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(loadStoredLocale);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const value: LanguageContextValue = { locale, setLocale };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
