/**
 * Traducciones de la aplicación - Castellano y Gallego
 * 
 * Estructura: { es: { ... }, gl: { ... } }
 */

export const translations = {
    es: {
        // Header
        appTitle: 'Calculadora LCSP',
        appSubtitle: 'Ley de Contratos del Sector Público',
        holidays: 'Festivos',

        // Tabs
        tabLCSP: 'Plazos LCSP',
        tabQuick: 'Calculadora Rápida',

        // Calculator Form
        calculatorTitle: 'Calculadora de Plazos',
        calculatorSubtitle: 'Ley 9/2017, de 8 de noviembre, de Contratos del Sector Público',

        // Rules info
        rulesTitle: 'Reglas de cómputo aplicadas:',
        ruleDiesAQuo: 'El plazo comienza el día siguiente a la publicación/notificación',
        ruleNaturales: 'Por defecto, salvo indicación expresa de días hábiles (DA 12 LCSP)',
        ruleInhabil: 'Último día inhábil: Se prorroga al primer día hábil siguiente',
        ruleHolidays: 'Nacionales, Galicia y locales de Lugo',

        // Form labels
        phaseLabel: '1. Fase del procedimiento',
        phasePlaceholder: 'Seleccionar fase...',
        deadlineLabel: '2. Tipo de plazo',
        deadlinePlaceholder: 'Seleccionar plazo...',
        dateLabel: '3. Fecha de publicación / notificación',
        dateHelp: 'El cómputo del plazo comenzará el día siguiente a esta fecha (Dies a Quo)',

        // Options
        effectiveDays: 'Plazo efectivo:',
        reductionsTitle: 'Reducciones/Excepciones aplicables',
        customDaysLabel: 'Número de días:',

        // Buttons
        calculateBtn: 'Calcular fecha de vencimiento',
        resetBtn: 'Nuevo cálculo',

        // Results
        resultTitle: 'Fecha de vencimiento',
        daysRemaining: 'días restantes',
        daysType: {
            naturales: 'días naturales',
            habiles: 'días hábiles'
        },
        urgencyStatus: {
            expired: 'VENCIDO',
            urgent: 'URGENT: Plazo crítico',
            warning: 'Atención: Plazo próximo',
            safe: 'Plazo en curso'
        },
        prorrogaNote: 'El plazo original terminaba en día inhábil y se ha prorrogado al siguiente día hábil',
        reductionsApplied: 'Reducciones aplicadas',
        calculationDetails: 'Detalle del cómputo',
        startDate: 'Fecha inicial',
        diesAQuoDate: 'Fecha de inicio (Dies a Quo)',
        totalDays: 'Días totales',
        daysCount: 'Días contabilizados',
        holidaysInPeriod: 'Festivos durante el período de cómputo',
        noHolidays: 'No hay festivos durante este período de cómputo',

        // Quick Calculator
        quickTitle: 'Calculadora Rápida',
        quickSubtitle: 'Calcular plazos personalizados (días naturales o hábiles)',
        quickCalcTitle: 'Calculadora Rápida',
        quickCalcDescription: 'Introduce manualmente el número de días y el tipo de cómputo. El sistema tendrá en cuenta el calendario de festivos de Lugo (nacionales, autonómicos y locales).',
        quickCalcDays: 'Número de días',
        quickCalcType: 'Tipo de cómputo',
        quickCalcTypeHelp: {
            habiles: 'Se excluyen sábados, domingos y festivos del cómputo',
            naturales: 'Si el último día es inhábil, se prorroga al siguiente hábil'
        },
        quickCalcStartDate: 'Fecha de inicio',
        quickCalcNotificationDate: 'Fecha de publicación/notificación',
        daysInputLabel: 'Número de días',
        dayTypeLabel: 'Tipo de días',
        naturalDays: 'Días naturales',
        businessDays: 'Días hábiles',
        quickDateLabel: 'Fecha de inicio',
        quickDateHelp: 'El cómputo comenzará desde esta fecha',

        // Holiday Calendar
        holidaysTitle: 'Calendario de Festivos',
        nationalHolidays: 'Festivos Nacionales',
        regionalHolidays: 'Festivos Galicia',
        localHolidays: 'Festivos Locales Lugo',
        holidaysNote: 'Estos días son considerados inhábiles para el cómputo de plazos',

        // Categories
        categories: {
            licitacion: 'Licitación',
            adjudicacion: 'Adjudicación',
            formalizacion: 'Formalización',
            ejecucion: 'Ejecución',
            recursos: 'Recursos',
            especiales: 'Procedimientos Especiales'
        },

        // Footer
        footerNote: 'Esta herramienta tiene carácter orientativo. Consulte siempre la normativa vigente y los servicios jurídicos competentes.',

        // Theme
        darkMode: 'Modo oscuro',
        lightMode: 'Modo claro',

        // Language
        language: 'Idioma'
    },

    gl: {
        // Header
        appTitle: 'Calculadora LCSP',
        appSubtitle: 'Lei de Contratos do Sector Público',
        holidays: 'Festivos',

        // Tabs
        tabLCSP: 'Prazos LCSP',
        tabQuick: 'Calculadora Rápida',

        // Calculator Form
        calculatorTitle: 'Calculadora de Prazos',
        calculatorSubtitle: 'Lei 9/2017, do 8 de novembro, de Contratos do Sector Público',

        // Rules info
        rulesTitle: 'Regras de cómputo aplicadas:',
        ruleDiesAQuo: 'O prazo comeza o día seguinte á publicación/notificación',
        ruleNaturales: 'Por defecto, salvo indicación expresa de días hábiles (DA 12 LCSP)',
        ruleInhabil: 'Último día inhábil: Prorrógase ao primeiro día hábil seguinte',
        ruleHolidays: 'Nacionais, Galicia e locais de Lugo',

        // Form labels
        phaseLabel: '1. Fase do procedemento',
        phasePlaceholder: 'Seleccionar fase...',
        deadlineLabel: '2. Tipo de prazo',
        deadlinePlaceholder: 'Seleccionar prazo...',
        dateLabel: '3. Data de publicación / notificación',
        dateHelp: 'O cómputo do prazo comezará o día seguinte a esta data (Dies a Quo)',

        // Options
        effectiveDays: 'Prazo efectivo:',
        reductionsTitle: 'Reducións/Excepcións aplicables',
        customDaysLabel: 'Número de días:',

        // Buttons
        calculateBtn: 'Calcular data de vencemento',
        resetBtn: 'Novo cálculo',

        // Results
        resultTitle: 'Data de vencemento',
        daysRemaining: 'días restantes',
        daysType: {
            naturales: 'días naturais',
            habiles: 'días hábiles'
        },
        urgencyStatus: {
            expired: 'VENCIDO',
            urgent: 'URXENTE: Prazo crítico',
            warning: 'Atención: Prazo próximo',
            safe: 'Prazo en curso'
        },
        prorrogaNote: 'O prazo orixinal remataba en día inhábil e prorrogouse ao seguinte día hábil',
        reductionsApplied: 'Reducións aplicadas',
        calculationDetails: 'Detalle do cómputo',
        startDate: 'Data inicial',
        diesAQuoDate: 'Data de inicio (Dies a Quo)',
        totalDays: 'Días totais',
        daysCount: 'Días contabilizados',
        holidaysInPeriod: 'Festivos durante o período de cómputo',
        noHolidays: 'Non hai festivos durante este período de cómputo',

        // Quick Calculator
        quickTitle: 'Calculadora Rápida',
        quickSubtitle: 'Calcular prazos personalizados (días naturais ou hábiles)',
        quickCalcTitle: 'Calculadora Rápida',
        quickCalcDescription: 'Introduce manualmente o número de días o tipo de cómputo. O sistema terán en conta o calendario de festivos de Lugo (nacionais, autonómicos e locais).',
        quickCalcDays: 'Número de días',
        quickCalcType: 'Tipo de cómputo',
        quickCalcTypeHelp: {
            habiles: 'Exclúense sábados, domingos e festivos do cómputo',
            naturales: 'Se o último día é inhábil, prorrógase ao seguinte hábil'
        },
        quickCalcStartDate: 'Data de inicio',
        quickCalcNotificationDate: 'Data de publicación/notificación',
        daysInputLabel: 'Número de días',
        dayTypeLabel: 'Tipo de días',
        naturalDays: 'Días naturais',
        businessDays: 'Días hábiles',
        quickDateLabel: 'Data de inicio',
        quickDateHelp: 'O cómputo comezará desde esta data',

        // Holiday Calendar
        holidaysTitle: 'Calendario de Festivos',
        nationalHolidays: 'Festivos Nacionais',
        regionalHolidays: 'Festivos Galicia',
        localHolidays: 'Festivos Locais Lugo',
        holidaysNote: 'Estes días son considerados inhábiles para o cómputo de prazos',

        // Categories
        categories: {
            licitacion: 'Licitación',
            adjudicacion: 'Adxudicación',
            formalizacion: 'Formalización',
            ejecucion: 'Execución',
            recursos: 'Recursos',
            especiales: 'Procedementos Especiais'
        },

        // Footer
        footerNote: 'Esta ferramenta ten un carácter orientativo. Consulte sempre a normativa vixente e os servizos xurídicos competentes.',

        // Theme
        darkMode: 'Modo escuro',
        lightMode: 'Modo claro',

        // Language
        language: 'Idioma'
    }
} as const;

export type Language = 'es' | 'gl' | 'va';
export type TranslationKey = keyof typeof translations.es;

// Mapa de idiomas: 'va' redirige a 'es' (legado de versión anterior)
export const translationsMap = {
    ...translations,
    va: translations.es
};
