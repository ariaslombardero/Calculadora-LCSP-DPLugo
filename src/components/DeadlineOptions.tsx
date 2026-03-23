/**
 * DeadlineOptions - Controles dinámicos según tipo de plazo
 * 
 * Muestra:
 * - Checkboxes para reducciones aplicables
 * - Input numérico para plazos con mínimo/máximo
 * - Información sobre límites legales
 */

import { useState, useEffect } from 'react';
import { AlertCircle, Info, Minus, Plus } from 'lucide-react';
import { Deadline, DeadlineReduction, calculateEffectiveDays, validateDays } from '../data/deadlines';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface DeadlineOptionsProps {
    deadline: Deadline;
    onDaysChange: (days: number) => void;
    onReductionsChange: (appliedReductions: string[]) => void;
}

export function DeadlineOptions({ deadline, onDaysChange, onReductionsChange }: DeadlineOptionsProps) {
    const { t, language } = useLanguage();
    const { isDark } = useTheme();

    const [customDays, setCustomDays] = useState<number>(
        deadline.days ?? deadline.defaultDays ?? deadline.minDays ?? 0
    );
    const [appliedReductions, setAppliedReductions] = useState<string[]>([]);
    const [validationError, setValidationError] = useState<string | null>(null);

    const getDaysTypeText = (type: string) => {
        return type === 'habiles' ? t('daysType.habiles') : t('daysType.naturales');
    };

    // Actualizar cuando cambia el deadline
    useEffect(() => {
        const defaultValue = deadline.days ?? deadline.defaultDays ?? deadline.minDays ?? 0;
        setCustomDays(defaultValue);
        setAppliedReductions([]);
        setValidationError(null);
    }, [deadline.id]);

    // Notificar al padre cuando cambian los días o reducciones
    useEffect(() => {
        if (deadline.daysType === 'fixed' && deadline.reductions) {
            const effectiveDays = calculateEffectiveDays(deadline, appliedReductions);
            onDaysChange(effectiveDays);
        } else {
            onDaysChange(customDays);
        }
        onReductionsChange(appliedReductions);
    }, [customDays, appliedReductions, deadline.id, deadline.daysType]);

    const handleReductionToggle = (reduction: DeadlineReduction) => {
        setAppliedReductions(prev => {
            const newReductions = prev.includes(reduction.id)
                ? prev.filter(id => id !== reduction.id)
                : [...prev, reduction.id];
            return newReductions;
        });
    };

    const handleCustomDaysChange = (value: number) => {
        setCustomDays(value);

        const validation = validateDays(deadline, value);
        if (!validation.valid) {
            setValidationError(validation.message ?? null);
        } else {
            setValidationError(null);
        }
    };

    const increment = () => {
        const newValue = customDays + 1;
        if (deadline.maxDays === undefined || newValue <= deadline.maxDays) {
            handleCustomDaysChange(newValue);
        }
    };

    const decrement = () => {
        const minValue = deadline.minDays ?? 1;
        const newValue = customDays - 1;
        if (newValue >= minValue) {
            handleCustomDaysChange(newValue);
        }
    };

    // Textos traducidos
    const minLabel = language === 'gl' ? 'mínimo' : 'mínimo';
    const maxLabel = language === 'gl' ? 'máximo' : 'máximo';
    const deadlineToApply = language === 'gl' ? 'Prazo a aplicar:' : 'Plazo a aplicar:';
    const betweenText = language === 'gl' ? 'Prazo entre' : 'Plazo entre';
    const andText = language === 'gl' ? 'e' : 'y';

    // Render según tipo de plazo
    const renderDaysTypeInfo = () => {
        switch (deadline.daysType) {
            case 'fixed':
                return (
                    <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-white' : 'text-diputacio-dark'}`}>
                        <span className="font-bold text-lg">{calculateEffectiveDays(deadline, appliedReductions)}</span>
                        <span>{getDaysTypeText(deadline.dayType)}</span>
                    </div>
                );

            case 'minimum':
                return (
                    <div className="space-y-2">
                        <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-sm ${isDark ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-50 text-amber-700'
                            }`}>
                            <Info className="w-4 h-4" />
                            <span>{language === 'gl' ? 'Prazo' : 'Plazo'} <strong>{minLabel}</strong>: {deadline.minDays} {getDaysTypeText(deadline.dayType)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-diputacio-dark'}`}>
                                {deadlineToApply}
                            </label>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={decrement}
                                    disabled={customDays <= (deadline.minDays ?? 1)}
                                    className={`p-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-sm border ${isDark
                                            ? 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                                        }`}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <input
                                    type="number"
                                    value={customDays}
                                    onChange={(e) => handleCustomDaysChange(parseInt(e.target.value) || 0)}
                                    min={deadline.minDays}
                                    className={`w-20 px-3 py-2 text-center border-y focus:outline-none focus:ring-2 focus:ring-diputacio-red ${isDark
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-diputacio-dark'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={increment}
                                    className={`p-2 rounded-r-sm border ${isDark
                                            ? 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                                        }`}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                {getDaysTypeText(deadline.dayType)}
                            </span>
                        </div>
                    </div>
                );

            case 'maximum':
                return (
                    <div className="space-y-2">
                        <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-sm ${isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'
                            }`}>
                            <Info className="w-4 h-4" />
                            <span>{language === 'gl' ? 'Prazo' : 'Plazo'} <strong>{maxLabel}</strong>: {deadline.maxDays} {getDaysTypeText(deadline.dayType)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-diputacio-dark'}`}>
                                {deadlineToApply}
                            </label>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={decrement}
                                    disabled={customDays <= 1}
                                    className={`p-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-sm border ${isDark
                                            ? 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                                        }`}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <input
                                    type="number"
                                    value={customDays}
                                    onChange={(e) => handleCustomDaysChange(parseInt(e.target.value) || 0)}
                                    max={deadline.maxDays}
                                    min={1}
                                    className={`w-20 px-3 py-2 text-center border-y focus:outline-none focus:ring-2 focus:ring-diputacio-red ${isDark
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-diputacio-dark'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={increment}
                                    disabled={customDays >= (deadline.maxDays ?? Infinity)}
                                    className={`p-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-sm border ${isDark
                                            ? 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                                        }`}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                {getDaysTypeText(deadline.dayType)}
                            </span>
                        </div>
                    </div>
                );

            case 'range':
                return (
                    <div className="space-y-2">
                        <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-sm ${isDark ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-50 text-purple-700'
                            }`}>
                            <Info className="w-4 h-4" />
                            <span>
                                {betweenText} <strong>{deadline.minDays}</strong> {andText} <strong>{deadline.maxDays}</strong> {getDaysTypeText(deadline.dayType)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-diputacio-dark'}`}>
                                {deadlineToApply}
                            </label>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={decrement}
                                    disabled={customDays <= (deadline.minDays ?? 1)}
                                    className={`p-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-sm border ${isDark
                                            ? 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                                        }`}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <input
                                    type="number"
                                    value={customDays}
                                    onChange={(e) => handleCustomDaysChange(parseInt(e.target.value) || 0)}
                                    min={deadline.minDays}
                                    max={deadline.maxDays}
                                    className={`w-20 px-3 py-2 text-center border-y focus:outline-none focus:ring-2 focus:ring-diputacio-red ${isDark
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-diputacio-dark'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={increment}
                                    disabled={customDays >= (deadline.maxDays ?? Infinity)}
                                    className={`p-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-sm border ${isDark
                                            ? 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                                        }`}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                {getDaysTypeText(deadline.dayType)}
                            </span>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            {/* Información del plazo */}
            <div className={`border-l-4 border-diputacio-red p-4 rounded-sm ${isDark ? 'bg-gray-700' : 'bg-diputacio-gray'
                }`}>
                <div className="flex justify-between items-start">
                    <div>
                        <p className={`text-xs uppercase tracking-wide font-semibold ${isDark ? 'text-gray-400' : 'text-diputacio-muted'
                            }`}>
                            {deadline.article}
                        </p>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-200' : 'text-diputacio-dark'}`}>
                            {deadline.description}
                        </p>
                    </div>
                    {renderDaysTypeInfo()}
                </div>

                {deadline.alert && (
                    <p className={`text-sm mt-2 flex items-center gap-1 ${isDark ? 'text-amber-400' : 'text-amber-700'
                        }`}>
                        <AlertCircle className="w-4 h-4" />
                        {deadline.alert}
                    </p>
                )}
            </div>

            {/* Reducciones aplicables */}
            {deadline.reductions && deadline.reductions.length > 0 && (
                <div className={`border rounded-sm p-4 ${isDark
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                    }`}>
                    <p className={`text-sm font-semibold uppercase tracking-wide mb-3 ${isDark ? 'text-gray-200' : 'text-diputacio-dark'
                        }`}>
                        {t('reductionsTitle')}
                    </p>
                    <div className="space-y-3">
                        {deadline.reductions.map((reduction) => (
                            <label
                                key={reduction.id}
                                className={`flex items-start gap-3 cursor-pointer p-2 rounded-sm transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={appliedReductions.includes(reduction.id)}
                                    onChange={() => handleReductionToggle(reduction)}
                                    className="mt-1 w-4 h-4 text-diputacio-red focus:ring-diputacio-red rounded"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-diputacio-dark'
                                            }`}>
                                            {reduction.label}
                                        </span>
                                        <span className={`text-xs font-bold ${reduction.days < 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {reduction.days > 0 ? '+' : ''}{reduction.days} {language === 'gl' ? 'días' : 'días'}
                                        </span>
                                    </div>
                                    {reduction.condition && (
                                        <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                            {reduction.condition}
                                        </p>
                                    )}
                                    {reduction.article && (
                                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                            {reduction.article}
                                        </p>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>

                    {appliedReductions.length > 0 && (
                        <div className={`mt-4 pt-3 border-t flex items-center justify-between ${isDark ? 'border-gray-700' : 'border-gray-200'
                            }`}>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                {t('effectiveDays')}
                            </span>
                            <span className="text-lg font-bold text-diputacio-red">
                                {calculateEffectiveDays(deadline, appliedReductions)} {getDaysTypeText(deadline.dayType)}
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Error de validación */}
            {validationError && (
                <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-sm ${isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-600'
                    }`}>
                    <AlertCircle className="w-4 h-4" />
                    {validationError}
                </div>
            )}
        </div>
    );
}
