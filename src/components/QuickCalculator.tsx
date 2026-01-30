/**
 * QuickCalculator - Calculadora rápida/manual
 * Permite al usuario introducir directamente el número de días
 */

import { useState } from 'react';
import { Calendar, Calculator, Info, CalendarDays, AlertCircle } from 'lucide-react';
import { addDays, isWeekend, format, differenceInCalendarDays } from 'date-fns';
import { es, ca } from 'date-fns/locale';
import { isHoliday, getHolidaysInRange, Holiday } from '../data/holidays';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

type DayType = 'naturales' | 'habiles';

interface QuickResult {
    startDate: Date;
    endDate: Date;
    days: number;
    dayType: DayType;
    holidaysInPeriod: Holiday[];
    daysRemaining: number;
    isOverdue: boolean;
}

/**
 * Comprueba si un día es inhábil (fin de semana o festivo)
 */
function isNonWorkingDay(date: Date): boolean {
    return isWeekend(date) || isHoliday(date);
}

/**
 * Calcula fecha con días naturales
 */
function calculateNaturalDays(startDate: Date, days: number): Date {
    const computeStart = addDays(startDate, 1);
    let endDate = addDays(computeStart, days - 1);

    while (isNonWorkingDay(endDate)) {
        endDate = addDays(endDate, 1);
    }

    return endDate;
}

/**
 * Calcula fecha con días hábiles
 */
function calculateWorkingDays(startDate: Date, days: number): Date {
    let currentDate = addDays(startDate, 1);
    let daysCount = 0;

    while (daysCount < days) {
        if (!isNonWorkingDay(currentDate)) {
            daysCount++;
        }
        if (daysCount < days) {
            currentDate = addDays(currentDate, 1);
        }
    }

    return currentDate;
}

export function QuickCalculator() {
    const { t, language } = useLanguage();
    const { isDark } = useTheme();

    const [days, setDays] = useState<number>(15);
    const [dayType, setDayType] = useState<DayType>('naturales');
    const [startDate, setStartDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );
    const [result, setResult] = useState<QuickResult | null>(null);

    const dateLocale = language === 'va' ? ca : es;
    const dateFormat = language === 'va'
        ? "EEEE, d MMMM yyyy"
        : "EEEE, d 'de' MMMM 'de' yyyy";

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();

        const start = new Date(startDate);
        let endDate: Date;

        if (dayType === 'habiles') {
            endDate = calculateWorkingDays(start, days);
        } else {
            endDate = calculateNaturalDays(start, days);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const daysRemaining = differenceInCalendarDays(endDate, today);
        const holidaysInPeriod = getHolidaysInRange(start, endDate);

        setResult({
            startDate: start,
            endDate,
            days,
            dayType,
            holidaysInPeriod,
            daysRemaining,
            isOverdue: daysRemaining < 0,
        });
    };

    const handleReset = () => {
        setResult(null);
    };

    const getDaysTypeText = (type: string) => {
        return type === 'habiles' ? t('daysType.habiles') : t('daysType.naturales');
    };

    const getHolidayTypeLabel = (type: string) => {
        if (language === 'va') {
            return type === 'nacional' ? 'Nacional' :
                type === 'autonomico' ? 'Autonòmic' : 'Local';
        }
        return type === 'nacional' ? 'Nacional' :
            type === 'autonomico' ? 'Autonómico' : 'Local';
    };

    return (
        <div className="space-y-6">
            {/* Título e info */}
            <div className={`flex items-start gap-3 border-l-4 p-4 rounded-sm ${isDark
                    ? 'bg-amber-900/30 border-amber-500'
                    : 'bg-amber-50 border-amber-500'
                }`}>
                <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                <div className={`text-sm ${isDark ? 'text-amber-200' : 'text-amber-800'}`}>
                    <p className="font-semibold mb-1">{t('quickCalcTitle')}</p>
                    <p>
                        {t('quickCalcDescription')}
                    </p>
                </div>
            </div>

            {!result ? (
                <form onSubmit={handleCalculate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Número de días */}
                        <div className="space-y-2">
                            <label
                                htmlFor="quickDays"
                                className={`block text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-gray-200' : 'text-diputacio-dark'
                                    }`}
                            >
                                {t('quickCalcDays')}
                            </label>
                            <input
                                type="number"
                                id="quickDays"
                                min="1"
                                max="365"
                                value={days}
                                onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                                className={`w-full px-4 py-3 border rounded-sm
                           focus:outline-none focus:ring-2 focus:ring-diputacio-red focus:border-transparent
                           transition-all duration-200 ${isDark
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-diputacio-dark'
                                    }`}
                                required
                            />
                        </div>

                        {/* Tipo de días */}
                        <div className="space-y-2">
                            <label className={`block text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-gray-200' : 'text-diputacio-dark'
                                }`}>
                                {t('quickCalcType')}
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="dayType"
                                        value="naturales"
                                        checked={dayType === 'naturales'}
                                        onChange={() => setDayType('naturales')}
                                        className="w-4 h-4 text-diputacio-red focus:ring-diputacio-red"
                                    />
                                    <span className={`text-sm ${isDark ? 'text-gray-200' : 'text-diputacio-dark'}`}>
                                        {t('daysType.naturales')}
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="dayType"
                                        value="habiles"
                                        checked={dayType === 'habiles'}
                                        onChange={() => setDayType('habiles')}
                                        className="w-4 h-4 text-diputacio-red focus:ring-diputacio-red"
                                    />
                                    <span className={`text-sm ${isDark ? 'text-gray-200' : 'text-diputacio-dark'}`}>
                                        {t('daysType.habiles')}
                                    </span>
                                </label>
                            </div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                {dayType === 'habiles'
                                    ? t('quickCalcTypeHelp.habiles')
                                    : t('quickCalcTypeHelp.naturales')
                                }
                            </p>
                        </div>

                        {/* Fecha de inicio */}
                        <div className="space-y-2">
                            <label
                                htmlFor="quickStartDate"
                                className={`block text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-gray-200' : 'text-diputacio-dark'
                                    }`}
                            >
                                {t('quickCalcStartDate')}
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    id="quickStartDate"
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
                    </div>

                    {/* Botón calcular */}
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-diputacio-red text-white font-semibold uppercase tracking-wide
                       rounded-sm cursor-pointer
                       hover:bg-diputacio-red-dark transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-diputacio-red focus:ring-offset-2"
                    >
                        <Calculator className="w-5 h-5" />
                        {language === 'va' ? 'Calcular' : 'Calcular'}
                    </button>
                </form>
            ) : (
                <div className="space-y-6">
                    {/* Resultado principal */}
                    <div className={`p-6 rounded-sm border-l-4 ${result.isOverdue
                        ? isDark ? 'bg-red-900/30 border-red-600' : 'bg-red-50 border-red-600'
                        : result.daysRemaining <= 3
                            ? isDark ? 'bg-yellow-900/30 border-yellow-500' : 'bg-yellow-50 border-yellow-500'
                            : isDark ? 'bg-green-900/30 border-green-500' : 'bg-green-50 border-green-500'
                        }`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <p className={`text-sm uppercase tracking-wide font-semibold mb-2 ${isDark ? 'text-gray-400' : 'text-diputacio-muted'
                                    }`}>
                                    {t('resultTitle')}
                                </p>
                                <p className={`text-2xl font-bold capitalize ${isDark ? 'text-white' : 'text-diputacio-dark'
                                    }`}>
                                    {format(result.endDate, dateFormat, { locale: dateLocale })}
                                </p>
                                <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                    {result.isOverdue
                                        ? language === 'va'
                                            ? `Va vèncer fa ${Math.abs(result.daysRemaining)} dies`
                                            : `Venció hace ${Math.abs(result.daysRemaining)} días`
                                        : result.daysRemaining === 0
                                            ? language === 'va' ? 'Venç AVUI' : 'Vence HOY'
                                            : language === 'va'
                                                ? `Queden ${result.daysRemaining} dies`
                                                : `Quedan ${result.daysRemaining} días`
                                    }
                                </p>
                            </div>
                            <div className="text-right">
                                <div className={`inline-block px-4 py-2 rounded-sm border ${isDark
                                        ? 'bg-gray-800 border-gray-700'
                                        : 'bg-white border-gray-200'
                                    }`}>
                                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-diputacio-dark'}`}>
                                        {result.days} {getDaysTypeText(result.dayType)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detalle del cómputo */}
                    <div className={`p-6 rounded-sm ${isDark ? 'bg-gray-700' : 'bg-diputacio-gray'}`}>
                        <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${isDark ? 'text-white' : 'text-diputacio-dark'
                            }`}>
                            {t('calculationDetails')}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-3">
                                <CalendarDays className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`} />
                                <div>
                                    <p className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                        {t('quickCalcNotificationDate')}
                                    </p>
                                    <p className={`text-sm font-medium capitalize ${isDark ? 'text-white' : 'text-diputacio-dark'
                                        }`}>
                                        {format(result.startDate, dateFormat, { locale: dateLocale })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`} />
                                <div>
                                    <p className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                        {t('resultTitle')}
                                    </p>
                                    <p className={`text-sm font-medium capitalize ${isDark ? 'text-white' : 'text-diputacio-dark'
                                        }`}>
                                        {format(result.endDate, dateFormat, { locale: dateLocale })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Festivos en el período */}
                        <div className={`pt-4 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                            <p className={`text-xs uppercase mb-3 font-semibold flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-diputacio-muted'
                                }`}>
                                🎌 {t('holidaysInPeriod')}
                            </p>

                            {result.holidaysInPeriod.length > 0 ? (
                                <div className="space-y-2">
                                    {result.holidaysInPeriod.map((holiday) => (
                                        <div
                                            key={holiday.date}
                                            className={`flex items-center justify-between px-3 py-2 rounded-sm border ${isDark
                                                    ? 'bg-gray-800 border-gray-600'
                                                    : 'bg-white border-gray-200'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${holiday.type === 'nacional' ? 'bg-red-500' :
                                                    holiday.type === 'autonomico' ? 'bg-orange-500' :
                                                        'bg-blue-500'
                                                    }`} />
                                                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-diputacio-dark'
                                                    }`}>
                                                    {holiday.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                                    {format(new Date(holiday.date), language === 'va' ? "d MMMM" : "d 'de' MMMM", { locale: dateLocale })}
                                                </span>
                                                <span className={`text-xs px-2 py-0.5 rounded ${holiday.type === 'nacional'
                                                    ? isDark ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-700'
                                                    : holiday.type === 'autonomico'
                                                        ? isDark ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-700'
                                                        : isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {getHolidayTypeLabel(holiday.type)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                    {result.dayType === 'habiles' && (
                                        <p className={`text-xs mt-2 italic ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                            <AlertCircle className="w-3 h-3 inline mr-1" />
                                            {language === 'va'
                                                ? "Aquests festius han sigut exclosos del còmput de dies hàbils"
                                                : 'Estos festivos han sido excluidos del cómputo de días hábiles'
                                            }
                                        </p>
                                    )}
                                    {result.dayType === 'naturales' && (
                                        <p className={`text-xs mt-2 italic ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                            <AlertCircle className="w-3 h-3 inline mr-1" />
                                            {language === 'va'
                                                ? "En dies naturals, els festius compten. Només es prorroga si l'últim dia és inhàbil."
                                                : 'En días naturales, los festivos cuentan. Solo se prorroga si el último día es inhábil.'
                                            }
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className={`px-4 py-3 rounded-sm border text-center ${isDark
                                        ? 'bg-gray-800 border-gray-600'
                                        : 'bg-white border-gray-200'
                                    }`}>
                                    <p className={`text-sm ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                                        ✓ {t('noHolidays')}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Leyenda */}
                        <div className={`mt-4 pt-4 border-t flex flex-wrap gap-4 text-xs ${isDark ? 'border-gray-600 text-gray-400' : 'border-gray-200 text-diputacio-muted'
                            }`}>
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-red-500" /> Nacional
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-orange-500" /> {language === 'va' ? 'Com. Valenciana' : 'Com. Valenciana'}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-blue-500" /> {language === 'va' ? 'Castelló (local)' : 'Castellón (local)'}
                            </span>
                        </div>
                    </div>

                    {/* Nota legal */}
                    <p className={`text-xs italic ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                        {language === 'va'
                            ? "Nota: El còmput comença el dia següent a la data de publicació/notificació (Dies a Quo, Llei 39/2015)."
                            : "Nota: El cómputo comienza el día siguiente a la fecha de publicación/notificación (Dies a Quo, Ley 39/2015)."
                        }
                    </p>

                    {/* Botón nuevo cálculo */}
                    <button
                        onClick={handleReset}
                        className={`inline-flex items-center gap-2 px-4 py-2 border font-semibold uppercase text-sm
                       rounded-sm cursor-pointer transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-diputacio-red focus:ring-offset-2 ${isDark
                                ? 'border-gray-600 text-gray-200 hover:bg-gray-700'
                                : 'border-gray-300 text-diputacio-dark hover:bg-diputacio-gray'
                            }`}
                    >
                        {t('resetBtn')}
                    </button>
                </div>
            )}
        </div>
    );
}
