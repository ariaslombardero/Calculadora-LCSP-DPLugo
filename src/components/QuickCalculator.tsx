import React, { useState } from 'react';
import { Calendar, Calculator, FileText, AlertTriangle, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useLCSPCalculator } from '../hooks/useLCSPCalculator';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export const QuickCalculator: React.FC = () => {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const [days, setDays] = useState<number>(15);
  const [dayType, setDayType] = useState<'naturales' | 'habiles'>('naturales');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Hook de cálculo
  const { result, calculateCustom } = useLCSPCalculator();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCustom(new Date(startDate), days, dayType);
    setHasCalculated(true);
  };

  const incrementDays = () => setDays(prev => prev + 1);
  const decrementDays = () => setDays(prev => Math.max(1, prev - 1));

  // Títulos traducidos según idioma
  const resultTitle = language === 'gl' ? 'Resultado do cálculo' : 'Resultado del cálculo';
  const diesAQuoTitle = language === 'gl' ? '1. Inicio (Dies a Quo)' : '1. Inicio (Dies a Quo)';
  const computationTitle = language === 'gl' ? '2. Cómputo' : '2. Cómputo';
  const termTitle = language === 'gl' ? '3. Vencemento' : '3. Vencimiento';
  const diesAQuoDesc = language === 'gl' 
    ? 'O prazo comeza o día seguinte á notificación.' 
    : 'El plazo comienza el día siguiente a la notificación.';
  const computationDesc = dayType === 'naturales'
    ? (language === 'gl' ? 'Cóntanse todos os días (incluídos fins de semana e festivos).' : 'Se cuentan todos los días (incluidos fines de semana y festivos).')
    : (language === 'gl' ? 'Exclúense sábados, domingos e festivos.' : 'Se excluyen sábados, domingos y festivos.');
  const naturalExtDesc = language === 'gl' 
    ? 'Se o último día é inhábil, prorrógase ao primeiro día hábil seguinte.'
    : 'Si el último día es inhábil, se prorroga al primer día hábil siguiente.';
  const effectiveTerm = language === 'gl' ? 'Vencemento efectivo' : 'Vencimiento efectivo';
  const daysIncluded = language === 'gl' ? 'Días totais transcorridos' : 'Días totales transcurridos';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-diputacio-light shadow-sm'}`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-diputacio-red/10 rounded-lg">
            <Calculator className="w-6 h-6 text-diputacio-red" />
          </div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-diputacio-dark'}`}>
            {t('quickCalcTitle')}
          </h2>
        </div>
        <p className={isDark ? 'text-gray-400' : 'text-diputacio-muted'}>
          {t('quickCalcDescription')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleCalculate} className={`p-6 border rounded-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${isDark ? 'text-gray-200' : 'text-diputacio-dark'}`}>
              <FileText className="w-5 h-5 text-diputacio-red" />
              {language === 'gl' ? 'Parámetros do  prazo' : 'Parámetros del plazo'}
            </h3>

            {/* Fecha inicio */}
            <div className="space-y-3 mb-6">
              <label className={`block text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-gray-300' : 'text-diputacio-dark'}`}>
                {t('quickCalcNotificationDate')}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-diputacio-red transition-all ${
                    isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
                  }`}
                  required
                />
                <Calendar className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            </div>

            {/* Número de días */}
            <div className="space-y-3 mb-6">
              <label className={`block text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-gray-300' : 'text-diputacio-dark'}`}>
                {t('quickCalcDays')}
              </label>
              <div className="flex">
                <button
                  type="button"
                  onClick={decrementDays}
                  className={`px-4 py-3 border rounded-l-lg transition-colors ${
                    isDark ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={days}
                  onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className={`w-full px-4 py-3 border-y text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-diputacio-red transition-all ${
                    isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={incrementDays}
                  className={`px-4 py-3 border rounded-r-lg transition-colors ${
                    isDark ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            {/* Tipo de días */}
            <div className="space-y-3 mb-8">
              <label className={`block text-sm font-semibold uppercase tracking-wide ${isDark ? 'text-gray-300' : 'text-diputacio-dark'}`}>
                {t('quickCalcType')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDayType('naturales')}
                  className={`py-3 px-4 border rounded-lg font-medium transition-all ${
                    dayType === 'naturales'
                      ? 'bg-diputacio-red text-white border-diputacio-red shadow-md'
                      : isDark ? 'bg-gray-900 border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t('naturalDays')}
                </button>
                <button
                  type="button"
                  onClick={() => setDayType('habiles')}
                  className={`py-3 px-4 border rounded-lg font-medium transition-all ${
                    dayType === 'habiles'
                      ? 'bg-diputacio-red text-white border-diputacio-red shadow-md'
                      : isDark ? 'bg-gray-900 border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t('businessDays')}
                </button>
              </div>
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {dayType === 'naturales' ? t('quickCalcTypeHelp.naturales') : t('quickCalcTypeHelp.habiles')}
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-diputacio-dark text-white rounded-lg font-bold uppercase tracking-wide hover:bg-diputacio-red transition-colors shadow-md"
            >
              <Calculator className="w-5 h-5" />
              {t('calculateBtn')}
            </button>
          </form>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-7">
          {hasCalculated && result ? (
            <div className="space-y-6 animate-slide-up">
              {/* Tarjeta principal de resultado */}
              <div className={`p-8 rounded-xl border-2 shadow-lg relative overflow-hidden ${
                isDark ? 'bg-gray-800 border-diputacio-red' : 'bg-white border-diputacio-red'
              }`}>
                {/* Elemento decorativo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-diputacio-red/5 rounded-bl-full -z-10" />
                
                <h3 className={`text-sm font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-red-400' : 'text-diputacio-red'}`}>
                  {resultTitle}
                </h3>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-4">
                  <div>
                    <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{effectiveTerm}</p>
                    <p className={`text-3xl md:text-4xl font-extrabold capitalize ${isDark ? 'text-white' : 'text-diputacio-dark'}`}>
                      {result.formattedEndDate}
                    </p>
                  </div>
                  
                  <div className={`px-4 py-2 rounded-lg inline-flex items-center gap-2 font-medium ${
                    isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    <Clock className="w-4 h-4" />
                    {days} {dayType === 'naturales' ? t('naturalDays') : t('businessDays')}
                  </div>
                </div>

                {/* Aviso de prórroga */}
                {result.wasProrrogado && (
                  <div className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${isDark ? 'bg-amber-900/20 border border-amber-800' : 'bg-amber-50 border border-amber-200'}`}>
                    <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? 'text-amber-500' : 'text-amber-600'}`} />
                    <p className={`text-sm ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                      {t('prorrogaNote')}
                    </p>
                  </div>
                )}
              </div>

              {/* Proceso de cálculo step by step */}
              <div className={`border rounded-lg p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <h4 className={`font-semibold mb-6 uppercase tracking-wide text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  {t('calculationDetails')}
                </h4>
                
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                  
                  {/* Step 1: Inicio */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${
                      isDark ? 'bg-gray-900 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-500'
                    }`}>
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
                      <h5 className="font-bold text-sm text-diputacio-dark dark:text-gray-200 mb-1">{diesAQuoTitle}</h5>
                      <p className="text-diputacio-red font-medium capitalize mb-2">{result.formattedStartDate}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{diesAQuoDesc}</p>
                    </div>
                  </div>
                  
                  {/* Step 2: Recorrido */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${
                      isDark ? 'bg-gray-900 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-500'
                    }`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
                      <h5 className="font-bold text-sm text-diputacio-dark dark:text-gray-200 mb-1">{computationTitle}</h5>
                      <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        +{days} {dayType === 'naturales' ? t('naturalDays') : t('businessDays')}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {computationDesc}
                      </p>
                      {dayType === 'naturales' && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                          {naturalExtDesc}
                        </p>
                      )}
                      
                      {/* Mostrar festivos si los hay y afectan o son info útil */}
                      {result.holidaysInPeriod.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                          <p className="text-xs font-semibold mb-2 flex items-center gap-1 dark:text-gray-300">
                            <AlertTriangle className="w-3 h-3 text-amber-500" />
                            {result.holidaysInPeriod.length} {language === 'gl' ? 'festivos no período' : 'festivos en el periodo'}
                          </p>
                          <div className="max-h-24 overflow-y-auto space-y-1">
                            {result.holidaysInPeriod.map(h => (
                              <div key={h.date} className="flex justify-between text-[11px]">
                                <span className="text-gray-600 dark:text-gray-400 truncate pr-2">{h.name}</span>
                                <span className="text-gray-400 dark:text-gray-500 flex-shrink-0">{h.date}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Step 3: Fin */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${
                      isDark ? 'bg-diputacio-red border-gray-800 text-white' : 'bg-diputacio-red border-white text-white'
                    }`}>
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border shadow-sm border-diputacio-red/30 bg-red-50/30 dark:bg-red-900/10 dark:border-red-900/50">
                      <h5 className="font-bold text-sm text-diputacio-dark dark:text-gray-200 mb-1">{termTitle}</h5>
                      <p className="text-diputacio-red font-bold capitalize mb-2">{result.formattedEndDate}</p>
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {daysIncluded}: <span className="font-bold">{result.totalDaysElapsed} días</span>
                      </p>
                    </div>
                  </div>
                  
                </div>
              </div>

            </div>
          ) : (
            // Estado vacío
            <div className={`h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-xl ${
              isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className={`p-4 rounded-full mb-4 ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                <Calculator className={`w-8 h-8 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'gl' ? 'Calculadora lista' : 'Calculadora lista'}
              </h3>
              <p className={`text-sm max-w-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {language === 'gl' 
                  ? 'Configura os parámetros á esquerda e preme calcular para ver o desglose completo do prazo.'
                  : 'Configura los parámetros a la izquierda y pulsa calcular para ver el desglose completo del plazo.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
