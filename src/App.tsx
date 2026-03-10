/**
 * App - Componente principal de la Calculadora LCSP
 * Concello de Lugo
 */

import { useState } from 'react';
import { Layout } from './components/Layout';
import { CalculatorForm } from './components/CalculatorForm';
import { DeadlineCard } from './components/DeadlineCard';
import { QuickCalculator } from './components/QuickCalculator';
import { useLCSPCalculator } from './hooks/useLCSPCalculator';
import { Deadline } from './data/deadlines';
import { AlertCircle, Info, Calculator, Zap } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';

type TabType = 'lcsp' | 'quick';

function App() {
    const [activeTab, setActiveTab] = useState<TabType>('lcsp');
    const { result, error, calculate, reset } = useLCSPCalculator();
    const { t } = useLanguage();
    const { isDark } = useTheme();

    const handleCalculate = (deadline: Deadline, startDate: Date, effectiveDays: number, appliedReductions: string[]) => {
        calculate(deadline, startDate, effectiveDays, appliedReductions);
    };

    return (
        <Layout>
            {/* Título de página */}
            <div className="mb-6">
                <h2 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-diputacio-dark'}`}>
                    {t('calculatorTitle')}
                </h2>
                <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-diputacio-muted'}`}>
                    {t('calculatorSubtitle')}
                </p>
            </div>

            {/* Tabs de navegación */}
            <div className={`flex border-b mb-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                    onClick={() => { setActiveTab('lcsp'); reset(); }}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors duration-200
                     border-b-2 -mb-px
                     ${activeTab === 'lcsp'
                            ? 'border-diputacio-red text-diputacio-red'
                            : isDark
                                ? 'border-transparent text-gray-400 hover:text-white'
                                : 'border-transparent text-diputacio-muted hover:text-diputacio-dark'
                        }`}
                >
                    <Calculator className="w-4 h-4" />
                    {t('tabLCSP')}
                </button>
                <button
                    onClick={() => setActiveTab('quick')}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors duration-200
                     border-b-2 -mb-px
                     ${activeTab === 'quick'
                            ? 'border-diputacio-red text-diputacio-red'
                            : isDark
                                ? 'border-transparent text-gray-400 hover:text-white'
                                : 'border-transparent text-diputacio-muted hover:text-diputacio-dark'
                        }`}
                >
                    <Zap className="w-4 h-4" />
                    {t('tabQuick')}
                </button>
            </div>

            {/* Contenido según tab activo */}
            {activeTab === 'lcsp' ? (
                <>
                    {/* Información legal */}
                    <div className={`border-l-4 p-4 mb-6 rounded-sm ${isDark
                            ? 'bg-blue-900/30 border-blue-500'
                            : 'bg-blue-50 border-blue-500'
                        }`}>
                        <div className="flex items-start gap-3">
                            <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                            <div className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
                                <p className="font-semibold mb-1">{t('rulesTitle')}</p>
                                <ul className={`list-disc list-inside space-y-1 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                                    <li><strong>Dies a Quo:</strong> {t('ruleDiesAQuo')}</li>
                                    <li><strong>{t('daysType.naturales')}:</strong> {t('ruleNaturales')}</li>
                                    <li><strong>{t('ruleInhabil').split(':')[0]}:</strong> {t('ruleInhabil')}</li>
                                    <li><strong>{t('holidays')}:</strong> {t('ruleHolidays')}</li>
                                    <li><strong>{t('daysType.habiles')}:</strong> {t('ruleHabiles')}</li>
                                    <li><strong>{t('ruleFechaAFechaTitle')}:</strong> {t('ruleFechaAFecha')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Mostrar error si existe */}
                    {error && (
                        <div className={`border-l-4 p-4 mb-6 rounded-sm ${isDark
                                ? 'bg-red-900/30 border-red-500'
                                : 'bg-red-50 border-red-500'
                            }`}>
                            <div className="flex items-center gap-3">
                                <AlertCircle className={`w-5 h-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                <p className={isDark ? 'text-red-300' : 'text-red-700'}>{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Contenido principal LCSP */}
                    <div className={`border rounded-sm p-6 md:p-8 ${isDark
                            ? 'bg-gray-800 border-gray-700'
                            : 'bg-white border-gray-200'
                        }`}>
                        {!result ? (
                            <CalculatorForm onCalculate={handleCalculate} />
                        ) : (
                            <DeadlineCard result={result} onReset={reset} />
                        )}
                    </div>
                </>
            ) : (
                /* Calculadora Rápida */
                <div className={`border rounded-sm p-6 md:p-8 ${isDark
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                    }`}>
                    <QuickCalculator />
                </div>
            )}

            {/* Disclaimer */}
            <div className={`mt-8 text-center text-xs ${isDark ? 'text-gray-500' : 'text-diputacio-muted'}`}>
                <p>
                    {t('footerNote')}
                </p>
            </div>
        </Layout>
    );
}

export default App;
