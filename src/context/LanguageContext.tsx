/**
 * LanguageContext - Contexto para gestionar el idioma de la aplicación
 * Soporta: Castellano (es) y Gallego (gl)
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { translations, Language } from '../i18n/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        // Intentar recuperar del localStorage
        const saved = localStorage.getItem('lcsp-language');
        return (saved === 'es' || saved === 'gl') ? saved : 'es';
    });

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('lcsp-language', lang);
    }, []);

    const t = useCallback((key: string): string => {
        const keys = key.split('.');
        let value: unknown = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                // Fallback a español si no existe la traducción
                value = translations['es'];
                for (const fallbackKey of keys) {
                    if (value && typeof value === 'object' && fallbackKey in value) {
                        value = (value as Record<string, unknown>)[fallbackKey];
                    } else {
                        return key; // Devolver la clave si no existe
                    }
                }
                break;
            }
        }

        return typeof value === 'string' ? value : key;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
