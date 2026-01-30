/**
 * DeadlineCard - Tarjeta de resultado del cálculo
 * Muestra la fecha de vencimiento y alertas de urgencia
 */

import { CalendarCheck, Clock, AlertTriangle, CheckCircle, XCircle, CalendarDays } from 'lucide-react';
import { CalculationResult, getUrgencyStatus } from '../hooks/useLCSPCalculator';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface DeadlineCardProps {
    result: CalculationResult;
    onReset: () => void;
}

export function DeadlineCard({ result, onReset }: DeadlineCardProps) {
    const { t, language } = useLanguage();
    const { isDark } = useTheme();
    const urgencyStatus = getUrgencyStatus(result.daysRemaining);

    const urgencyConfig = {
        normal: {
            bg: isDark ? 'bg-green-900/30' : 'bg-green-50',
            border: 'border-green-500',
            text: isDark ? 'text-green-400' : 'text-green-700',
            icon: CheckCircle,
            label: t('urgencyStatus.safe'),
        },
        warning: {
            bg: isDark ? 'bg-yellow-900/30' : 'bg-yellow-50',
            border: 'border-yellow-500',
            text: isDark ? 'text-yellow-400' : 'text-yellow-700',
            icon: AlertTriangle,
            label: t('urgencyStatus.warning'),
        },
        critical: {
            bg: isDark ? 'bg-red-900/30' : 'bg-red-50',
            border: 'border-red-600',
            text: isDark ? 'text-red-400' : 'text-red-700',
            icon: AlertTriangle,
            label: t('urgencyStatus.urgent'),
        },
        overdue: {
            bg: isDark ? 'bg-red-900/50' : 'bg-red-100',
            border: 'border-red-700',
            text: isDark ? 'text-red-300' : 'text-red-800',
            icon: XCircle,
            label: t('urgencyStatus.expired'),
        },
    };

    const config = urgencyConfig[urgencyStatus];
    const StatusIcon = config.icon;

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
            {/* Resultado principal */}
            <div className={`${config.bg} border-l-4 ${config.border} p-6 rounded-sm`}>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        {/* Badge de estado */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-sm ${config.text} text-sm font-semibold uppercase mb-4`}>
                            <StatusIcon className="w-4 h-4" />
                            {config.label}
                        </div>

                        {/* Fecha de vencimiento */}
                        <div className="space-y-2">
                            <p className={`text-sm uppercase tracking-wide font-semibold ${isDark ? 'text-gray-400' : 'text-diputacio-muted'
                                }`}>
                                {t('resultTitle')}
                            </p>
                            <p className={`text-2xl font-bold capitalize ${isDark ? 'text-white' : 'text-diputacio-dark'
                                }`}>
                                {result.formattedEndDate}
                            </p>
                        </div>

                        {/* Días restantes */}
                        <div className="mt-4 flex items-center gap-2">
                            <Clock className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`} />
                            {result.isOverdue ? (
                                <span className={isDark ? 'text-red-400 font-semibold' : 'text-red-700 font-semibold'}>
                                    {language === 'va'
                                        ? `Va vèncer fa ${Math.abs(result.daysRemaining)} dies`
                                        : `Venció hace ${Math.abs(result.daysRemaining)} días`
                                    }
                                </span>
                            ) : result.daysRemaining === 0 ? (
                                <span className={isDark ? 'text-red-400 font-semibold' : 'text-red-700 font-semibold'}>
                                    {language === 'va' ? 'El termini venç AVUI' : 'El plazo vence HOY'}
                                </span>
                            ) : (
                                <span className={config.text}>
                                    {language === 'va'
                                        ? <>Queden <strong>{result.daysRemaining} dies</strong> per al venciment</>
                                        : <>Quedan <strong>{result.daysRemaining} días</strong> para el vencimiento</>
                                    }
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Info del plazo */}
                    <div className="hidden md:block text-right">
                        <div className={`inline-block px-4 py-2 rounded-sm border ${isDark
                                ? 'bg-gray-800 border-gray-700'
                                : 'bg-white border-gray-200'
                            }`}>
                            <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-diputacio-dark'}`}>
                                {result.deadline.name}
                            </p>
                            <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                {result.daysApplied} {getDaysTypeText(result.dayType)}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                {result.deadline.article}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reducciones aplicadas */}
            {result.appliedReductions && result.appliedReductions.length > 0 && (
                <div className={`border p-4 rounded-sm ${isDark
                        ? 'bg-green-900/30 border-green-800'
                        : 'bg-green-50 border-green-200'
                    }`}>
                    <p className={`text-sm font-semibold uppercase tracking-wide mb-2 ${isDark ? 'text-green-400' : 'text-green-800'
                        }`}>
                        ✓ {t('reductionsApplied')}
                    </p>
                    <ul className="space-y-1">
                        {result.appliedReductions.map((reductionId) => {
                            const reduction = result.deadline.reductions?.find(r => r.id === reductionId);
                            return reduction ? (
                                <li key={reductionId} className={`text-sm flex items-center gap-2 ${isDark ? 'text-green-300' : 'text-green-700'
                                    }`}>
                                    <span className="font-medium">{reduction.label}</span>
                                    <span className={isDark ? 'text-green-400' : 'text-green-600'}>
                                        ({reduction.days > 0 ? '+' : ''}{reduction.days} {language === 'va' ? 'dies' : 'días'})
                                    </span>
                                </li>
                            ) : null;
                        })}
                    </ul>
                </div>
            )}

            {/* Detalles del cálculo */}
            <div className={`p-6 rounded-sm ${isDark ? 'bg-gray-700' : 'bg-diputacio-gray'}`}>
                <h3 className={`text-sm font-semibold uppercase tracking-wide mb-4 ${isDark ? 'text-white' : 'text-diputacio-dark'
                    }`}>
                    {t('calculationDetails')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                        <CalendarDays className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`} />
                        <div>
                            <p className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                {t('diesAQuoDate')}
                            </p>
                            <p className={`text-sm font-medium capitalize ${isDark ? 'text-white' : 'text-diputacio-dark'
                                }`}>
                                {result.formattedStartDate}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <CalendarCheck className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`} />
                        <div>
                            <p className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                {t('resultTitle')}
                            </p>
                            <p className={`text-sm font-medium capitalize ${isDark ? 'text-white' : 'text-diputacio-dark'
                                }`}>
                                {result.formattedEndDate}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Festivos en el período */}
                <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                    <p className={`text-xs uppercase mb-3 font-semibold ${isDark ? 'text-gray-400' : 'text-diputacio-muted'
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
                                            {holiday.date}
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

                            <p className={`text-xs mt-2 italic ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                                {result.dayType === 'habiles'
                                    ? (language === 'va'
                                        ? "Aquests festius han sigut exclosos del còmput de dies hàbils"
                                        : 'Estos festivos han sido excluidos del cómputo de días hábiles')
                                    : (language === 'va'
                                        ? "En dies naturals, els festius compten. Només es prorroga si l'últim dia és inhàbil."
                                        : 'En días naturales, los festivos cuentan. Solo se prorroga si el último día es inhábil.')
                                }
                            </p>
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

                {/* Nota legal */}
                <p className={`text-xs mt-4 italic ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                    {language === 'va'
                        ? "Nota: El còmput comença el dia següent a la data de publicació/notificació."
                        : "Nota: El cómputo comienza el día siguiente a la fecha de publicación/notificación."
                    }
                    {result.dayType === 'habiles'
                        ? (language === 'va' ? " S'exclouen dissabtes, diumenges i festius." : ' Se excluyen sábados, domingos y festivos.')
                        : (language === 'va' ? " Si l'últim dia és inhàbil, es prorroga al següent dia hàbil." : ' Si el último día es inhábil, se prorroga al siguiente día hábil.')
                    }
                </p>
            </div>

            {/* Botón nuevo cálculo */}
            <button
                onClick={onReset}
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
    );
}
