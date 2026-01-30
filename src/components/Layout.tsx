/**
 * Layout - Componente de estructura corporativa
 * Con controles de idioma (ES/VA) y modo oscuro
 */

import { Moon, Sun } from 'lucide-react';
import { HolidayCalendar } from './HolidayCalendar';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const { language, setLanguage, t } = useLanguage();
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'
            }`}>
            {/* Top bar con idioma - estilo dipcas.es */}
            <div className={`text-xs border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
                }`}>
                <div className="max-w-6xl mx-auto px-4 py-1 flex justify-end items-center gap-4">
                    {/* Selector de idioma tipo dipcas.es */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setLanguage('es')}
                            className={`px-2 py-0.5 rounded-sm transition-colors ${language === 'es'
                                    ? 'bg-diputacio-red text-white'
                                    : isDark
                                        ? 'text-gray-400 hover:text-white'
                                        : 'text-gray-600 hover:text-diputacio-red'
                                }`}
                        >
                            ES
                        </button>
                        <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>|</span>
                        <button
                            onClick={() => setLanguage('va')}
                            className={`px-2 py-0.5 rounded-sm transition-colors ${language === 'va'
                                    ? 'bg-diputacio-red text-white'
                                    : isDark
                                        ? 'text-gray-400 hover:text-white'
                                        : 'text-gray-600 hover:text-diputacio-red'
                                }`}
                        >
                            VAL
                        </button>
                    </div>

                    {/* Botón modo oscuro */}
                    <button
                        onClick={toggleTheme}
                        className={`p-1 rounded-sm transition-colors ${isDark
                                ? 'text-yellow-400 hover:bg-gray-700'
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        title={isDark ? t('lightMode') : t('darkMode')}
                    >
                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Header */}
            <header className={`sticky top-0 z-50 border-b ${isDark
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}>
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo Diputació de Castelló */}
                        <div className="flex items-center gap-4">
                            <a href="https://www.dipcas.es" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/logo-diputacio.png"
                                    alt="Diputació de Castelló"
                                    className={`h-12 md:h-14 w-auto ${isDark ? 'brightness-110' : ''}`}
                                />
                            </a>
                            <div className={`hidden sm:block border-l pl-4 ${isDark ? 'border-gray-600' : 'border-gray-200'
                                }`}>
                                <h1 className={`text-lg md:text-xl font-bold uppercase tracking-wide ${isDark ? 'text-white' : 'text-diputacio-dark'
                                    }`}>
                                    {t('appTitle')}
                                </h1>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                    {t('appSubtitle')}
                                </p>
                            </div>
                        </div>

                        {/* Acciones del header: Calendario festivos */}
                        <div className="flex items-center gap-4">
                            <HolidayCalendar year={2026} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className={`border-t ${isDark
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-diputacio-gray border-gray-200'
                }`}>
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className={`flex flex-col md:flex-row items-center justify-between gap-4 text-sm ${isDark ? 'text-gray-400' : 'text-diputacio-muted'
                        }`}>
                        <div>
                            © {new Date().getFullYear()} Diputació de Castelló · {t('footerNote')}
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`transition-colors duration-200 ${isDark ? 'hover:text-white' : 'hover:text-diputacio-red'
                                    }`}
                            >
                                Ley 9/2017 (BOE)
                            </a>
                            <span>·</span>
                            <a
                                href="https://www.dipcas.es"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`transition-colors duration-200 ${isDark ? 'hover:text-white' : 'hover:text-diputacio-red'
                                    }`}
                            >
                                dipcas.es
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
