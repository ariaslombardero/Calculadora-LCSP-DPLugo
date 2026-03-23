/**
 * CalculatorForm - Formulario de selección de plazos LCSP
 * Integra DeadlineOptions para controles dinámicos
 */

import { useState, useMemo, useEffect } from 'react';
import { Calendar, ChevronDown, Calculator } from 'lucide-react';
import {
    Deadline,
    ALL_DEADLINES,
    DEADLINE_CATEGORIES,
    DeadlineCategory
} from '../data/deadlines';
import { DeadlineOptions } from './DeadlineOptions';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface CalculatorFormProps {
    onCalculate: (deadline: Deadline, startDate: Date, effectiveDays: number, appliedReductions: string[]) => void;
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
    const { t, language } = useLanguage();
    const { isDark } = useTheme();

    const [selectedCategory, setSelectedCategory] = useState<DeadlineCategory | ''>('');
    const [selectedDeadlineId, setSelectedDeadlineId] = useState<string>('');
    const [startDate, setStartDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );
    const [effectiveDays, setEffectiveDays] = useState<number>(0);
    const [appliedReductions, setAppliedReductions] = useState<string[]>([]);

    // Filtrar plazos por categoría
    const filteredDeadlines = useMemo(() => {
        if (!selectedCategory) return [];
        return ALL_DEADLINES.filter(d => d.category === selectedCategory);
    }, [selectedCategory]);

    // Obtener plazo seleccionado
    const selectedDeadline = useMemo(() => {
        return ALL_DEADLINES.find(d => d.id === selectedDeadlineId);
    }, [selectedDeadlineId]);

    // Agrupar por subcategoría
    const groupedDeadlines = useMemo(() => {
        const groups: Record<string, Deadline[]> = {};
        filteredDeadlines.forEach(deadline => {
            const key = deadline.subcategory || 'General';
            if (!groups[key]) groups[key] = [];
            groups[key].push(deadline);
        });
        return groups;
    }, [filteredDeadlines]);

    // Reset deadline when category changes
    useEffect(() => {
        setSelectedDeadlineId('');
        setEffectiveDays(0);
        setAppliedReductions([]);
    }, [selectedCategory]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDeadline || !startDate) return;

        const start = new Date(startDate);
        onCalculate(selectedDeadline, start, effectiveDays, appliedReductions);
    };

    const handleDaysChange = (days: number) => {
        setEffectiveDays(days);
    };

    const handleReductionsChange = (reductions: string[]) => {
        setAppliedReductions(reductions);
    };

    const categoryEntries = Object.entries(DEADLINE_CATEGORIES) as [DeadlineCategory, typeof DEADLINE_CATEGORIES[DeadlineCategory]][];

    // Traducciones de días
    const getDaysTypeText = (type: string) => {
        return type === 'habiles' ? t('daysType.habiles') : t('daysType.naturales');
    };

    // Texto para categorías traducido
    const getCategoryName = (key: DeadlineCategory) => {
        return t(`categories.${key}`);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Selector de Categoría */}
                <div className="space-y-2">
                    <label
                        htmlFor="category"
                        className={`block text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-gray-200' : 'text-diputacio-dark'
                            }`}
                    >
                        {t('phaseLabel')}
                    </label>
                    <div className="relative">
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value as DeadlineCategory | '')}
                            className={`w-full px-4 py-3 border rounded-sm appearance-none cursor-pointer
                                     focus:outline-none focus:ring-2 focus:ring-diputacio-red focus:border-transparent
                                     transition-all duration-200 ${isDark
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-diputacio-dark'
                                }`}
                            required
                        >
                            <option value="">{t('phasePlaceholder')}</option>
                            {categoryEntries.map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value.icon} {getCategoryName(key)}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-gray-400' : 'text-diputacio-muted'
                            }`} />
                    </div>
                </div>

                {/* Selector de Plazo */}
                <div className="space-y-2">
                    <label
                        htmlFor="deadline"
                        className={`block text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-gray-200' : 'text-diputacio-dark'
                            }`}
                    >
                        {t('deadlineLabel')}
                    </label>
                    <div className="relative">
                        <select
                            id="deadline"
                            value={selectedDeadlineId}
                            onChange={(e) => setSelectedDeadlineId(e.target.value)}
                            disabled={!selectedCategory}
                            className={`w-full px-4 py-3 border rounded-sm appearance-none cursor-pointer 
                                     disabled:cursor-not-allowed
                                     focus:outline-none focus:ring-2 focus:ring-diputacio-red focus:border-transparent
                                     transition-all duration-200 ${isDark
                                    ? 'bg-gray-700 border-gray-600 text-white disabled:bg-gray-800'
                                    : 'bg-white border-gray-300 text-diputacio-dark disabled:bg-gray-100'
                                }`}
                            required
                        >
                            <option value="">{t('deadlinePlaceholder')}</option>
                            {Object.entries(groupedDeadlines).map(([subcategory, deadlines]) => (
                                <optgroup key={subcategory} label={subcategory}>
                                    {deadlines.map((deadline) => {
                                        // Mostrar info según tipo
                                        let daysInfo = '';
                                        const daysText = getDaysTypeText(deadline.dayType);
                                        if (deadline.daysType === 'fixed' && deadline.days) {
                                            daysInfo = `(${deadline.days} ${daysText})`;
                                        } else if (deadline.daysType === 'minimum' && deadline.minDays) {
                                            daysInfo = language === 'gl'
                                                ? `(mín. ${deadline.minDays} ${daysText})`
                                                : `(mín. ${deadline.minDays} ${daysText})`;
                                        } else if (deadline.daysType === 'maximum' && deadline.maxDays) {
                                            daysInfo = language === 'gl'
                                                ? `(màx. ${deadline.maxDays} ${daysText})`
                                                : `(máx. ${deadline.maxDays} ${daysText})`;
                                        } else if (deadline.daysType === 'range') {
                                            daysInfo = `(${deadline.minDays}-${deadline.maxDays} ${daysText})`;
                                        }

                                        return (
                                            <option key={deadline.id} value={deadline.id}>
                                                {deadline.name} {daysInfo}
                                            </option>
                                        );
                                    })}
                                </optgroup>
                            ))}
                        </select>
                        <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-gray-400' : 'text-diputacio-muted'
                            }`} />
                    </div>
                </div>
            </div>

            {/* Opciones del plazo seleccionado */}
            {selectedDeadline && (
                <DeadlineOptions
                    deadline={selectedDeadline}
                    onDaysChange={handleDaysChange}
                    onReductionsChange={handleReductionsChange}
                />
            )}

            {/* Selector de fecha */}
            <div className="space-y-2">
                <label
                    htmlFor="startDate"
                    className={`block text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-gray-200' : 'text-diputacio-dark'
                        }`}
                >
                    {t('dateLabel')}
                </label>
                <div className="relative max-w-xs">
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-sm
                                 focus:outline-none focus:ring-2 focus:ring-diputacio-red focus:border-transparent
                                 transition-all duration-200 ${isDark
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-diputacio-dark'
                            }`}
                        required
                    />
                    <Calendar className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-gray-400' : 'text-diputacio-muted'
                        }`} />
                </div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                    {t('dateHelp')}
                </p>
            </div>

            {/* Resumen antes de calcular */}
            {selectedDeadline && effectiveDays > 0 && (
                <div className={`border rounded-sm p-4 ${isDark
                        ? 'bg-blue-900/30 border-blue-800'
                        : 'bg-blue-50 border-blue-200'
                    }`}>
                    <p className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
                        <strong>{language === 'gl' ? 'Resum:' : 'Resumen:'}</strong> {language === 'gl' ? 'Calcular' : 'Calcular'} <strong>{effectiveDays} {getDaysTypeText(selectedDeadline.dayType)}</strong> {language === 'gl' ? 'des de' : 'desde'} {new Date(startDate).toLocaleDateString(language === 'gl' ? 'gl-ES' : 'es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        {appliedReductions.length > 0 && (
                            <span className={isDark ? 'text-blue-300' : 'text-blue-600'}> ({appliedReductions.length} {language === 'gl' ? 'reducció(ns) aplicada(es)' : 'reducción(es) aplicada(s)'})</span>
                        )}
                    </p>
                </div>
            )}

            {/* Botón de cálculo */}
            <button
                type="submit"
                disabled={!selectedDeadline || effectiveDays <= 0}
                className="inline-flex items-center gap-2 px-6 py-3 bg-diputacio-red text-white font-semibold uppercase tracking-wide
                         rounded-sm cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed
                         hover:bg-diputacio-red-dark transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-diputacio-red focus:ring-offset-2"
            >
                <Calculator className="w-5 h-5" />
                {t('calculateBtn')}
            </button>
        </form>
    );
}