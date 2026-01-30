/**
 * HolidayCalendar - Componente de referencia de días festivos
 * Muestra los festivos organizados por tipo: nacionales, autonómicos, locales
 */

import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, X } from 'lucide-react';
import { HOLIDAYS_CASTELLON, Holiday } from '../data/holidays';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HolidayCalendarProps {
    year?: number;
}

export function HolidayCalendar({ year = new Date().getFullYear() }: HolidayCalendarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();
    const { isDark } = useTheme();

    // Filtrar festivos por año
    const holidaysForYear = HOLIDAYS_CASTELLON.filter(h => h.date.startsWith(String(year)));

    // Agrupar por tipo
    const nationalHolidays = holidaysForYear.filter(h => h.type === 'nacional');
    const regionalHolidays = holidaysForYear.filter(h => h.type === 'autonomico');
    const localHolidays = holidaysForYear.filter(h => h.type === 'local');

    const formatDate = (dateStr: string): string => {
        const [, month, day] = dateStr.split('-');
        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        return `${parseInt(day)} de ${months[parseInt(month) - 1]}`;
    };

    const HolidayList = ({ holidays, type }: { holidays: Holiday[], type: string }) => {
        const config = {
            nacional: {
                bg: isDark ? 'bg-red-900/30' : 'bg-red-50',
                border: isDark ? 'border-red-800' : 'border-red-200',
                dot: 'bg-red-500',
                text: isDark ? 'text-red-300' : 'text-red-700'
            },
            autonomico: {
                bg: isDark ? 'bg-orange-900/30' : 'bg-orange-50',
                border: isDark ? 'border-orange-800' : 'border-orange-200',
                dot: 'bg-orange-500',
                text: isDark ? 'text-orange-300' : 'text-orange-700'
            },
            local: {
                bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50',
                border: isDark ? 'border-blue-800' : 'border-blue-200',
                dot: 'bg-blue-500',
                text: isDark ? 'text-blue-300' : 'text-blue-700'
            }
        }[type] || {
            bg: isDark ? 'bg-gray-800' : 'bg-gray-50',
            border: isDark ? 'border-gray-700' : 'border-gray-200',
            dot: 'bg-gray-500',
            text: isDark ? 'text-gray-300' : 'text-gray-700'
        };

        return (
            <ul className="space-y-1">
                {holidays.map(h => (
                    <li key={h.date} className={`flex items-center gap-2 px-3 py-1.5 ${config.bg} rounded-sm`}>
                        <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                        <span className={`text-sm flex-1 ${isDark ? 'text-gray-200' : 'text-diputacio-dark'}`}>
                            {h.name}
                        </span>
                        <span className={`text-xs ${config.text} font-medium`}>{formatDate(h.date)}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="relative">
            {/* Botón para abrir */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-sm transition-colors duration-200 ${isDark
                        ? 'text-gray-300 border-gray-600 hover:text-white hover:border-gray-500'
                        : 'text-diputacio-muted border-gray-200 hover:text-diputacio-red hover:border-diputacio-red'
                    }`}
                aria-expanded={isOpen}
                aria-label="Ver calendario de festivos"
            >
                <Calendar className="w-4 h-4" />
                <span>{t('holidays')} {year}</span>
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Panel desplegable */}
            {isOpen && (
                <div className={`absolute right-0 top-12 z-50 w-96 max-w-[calc(100vw-2rem)] border rounded-sm shadow-lg ${isDark
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                    }`}>
                    {/* Header */}
                    <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark
                            ? 'bg-gray-900 border-gray-700'
                            : 'bg-diputacio-gray border-gray-200'
                        }`}>
                        <h3 className={`text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-white' : 'text-diputacio-dark'
                            }`}>
                            📅 {t('holidaysTitle')} {year}
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className={`p-1 rounded-sm transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                                }`}
                            aria-label="Cerrar"
                        >
                            <X className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`} />
                        </button>
                    </div>

                    {/* Contenido */}
                    <div className="max-h-96 overflow-y-auto p-4 space-y-4">
                        {/* Nacionales */}
                        <div>
                            <h4 className={`text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2 ${isDark ? 'text-red-400' : 'text-red-700'
                                }`}>
                                <span className="w-3 h-3 rounded-full bg-red-500" />
                                {t('nationalHolidays')} ({nationalHolidays.length})
                            </h4>
                            <HolidayList holidays={nationalHolidays} type="nacional" />
                        </div>

                        {/* Autonómicos */}
                        <div>
                            <h4 className={`text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2 ${isDark ? 'text-orange-400' : 'text-orange-700'
                                }`}>
                                <span className="w-3 h-3 rounded-full bg-orange-500" />
                                {t('regionalHolidays')} ({regionalHolidays.length})
                            </h4>
                            <HolidayList holidays={regionalHolidays} type="autonomico" />
                        </div>

                        {/* Locales */}
                        <div>
                            <h4 className={`text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-700'
                                }`}>
                                <span className="w-3 h-3 rounded-full bg-blue-500" />
                                {t('localHolidays')} ({localHolidays.length})
                            </h4>
                            <HolidayList holidays={localHolidays} type="local" />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`px-4 py-3 border-t ${isDark
                            ? 'bg-gray-900 border-gray-700'
                            : 'bg-diputacio-gray border-gray-200'
                        }`}>
                        <p className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                            {t('holidaysNote')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
