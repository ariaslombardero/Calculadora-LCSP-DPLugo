/**
 * Traducciones de la aplicación - Castellano y Valenciano
 * 
 * Estructura: { es: { ... }, va: { ... } }
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
        ruleHolidays: 'Nacionales, Comunidad Valenciana y locales de Castellón',

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
            urgent: 'URGENTE: Plazo crítico',
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
        quickCalcDescription: 'Introduce manualmente el número de días y el tipo de cómputo. El sistema tendrá en cuenta el calendario de festivos de Castellón (nacionales, autonómicos y locales).',
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
        regionalHolidays: 'Festivos Comunidad Valenciana',
        localHolidays: 'Festivos Locales Castellón',
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

    va: {
        // Header
        appTitle: 'Calculadora LCSP',
        appSubtitle: 'Llei de Contractes del Sector Públic',
        holidays: 'Festius',

        // Tabs
        tabLCSP: 'Terminis LCSP',
        tabQuick: 'Calculadora Ràpida',

        // Calculator Form
        calculatorTitle: 'Calculadora de Terminis',
        calculatorSubtitle: 'Llei 9/2017, de 8 de novembre, de Contractes del Sector Públic',

        // Rules info
        rulesTitle: 'Regles de còmput aplicades:',
        ruleDiesAQuo: 'El termini comença el dia següent a la publicació/notificació',
        ruleNaturales: 'Per defecte, llevat d\'indicació expressa de dies hàbils (DA 12 LCSP)',
        ruleInhabil: 'Últim dia inhàbil: Es prorroga al primer dia hàbil següent',
        ruleHolidays: 'Nacionals, Comunitat Valenciana i locals de Castelló',

        // Form labels
        phaseLabel: '1. Fase del procediment',
        phasePlaceholder: 'Seleccionar fase...',
        deadlineLabel: '2. Tipus de termini',
        deadlinePlaceholder: 'Seleccionar termini...',
        dateLabel: '3. Data de publicació / notificació',
        dateHelp: 'El còmput del termini començarà el dia següent a aquesta data (Dies a Quo)',

        // Options
        effectiveDays: 'Termini efectiu:',
        reductionsTitle: 'Reduccions/Excepcions aplicables',
        customDaysLabel: 'Nombre de dies:',

        // Buttons
        calculateBtn: 'Calcular data de venciment',
        resetBtn: 'Nou càlcul',

        // Results
        resultTitle: 'Data de venciment',
        daysRemaining: 'dies restants',
        daysType: {
            naturales: 'dies naturals',
            habiles: 'dies hàbils'
        },
        urgencyStatus: {
            expired: 'VENÇUT',
            urgent: 'URGENT: Termini crític',
            warning: 'Atenció: Termini pròxim',
            safe: 'Termini en curs'
        },
        prorrogaNote: 'El termini original acabava en dia inhàbil i s\'ha prorrogat al següent dia hàbil',
        reductionsApplied: 'Reduccions aplicades',
        calculationDetails: 'Detall del còmput',
        startDate: 'Data inicial',
        diesAQuoDate: 'Data d\'inici (Dies a Quo)',
        totalDays: 'Dies totals',
        daysCount: 'Dies comptabilitzats',
        holidaysInPeriod: 'Festius durant el període de còmput',
        noHolidays: 'No hi ha festius durant aquest període de còmput',

        // Quick Calculator
        quickTitle: 'Calculadora Ràpida',
        quickSubtitle: 'Calcular terminis personalitzats (dies naturals o hàbils)',
        quickCalcTitle: 'Calculadora Ràpida',
        quickCalcDescription: 'Introdueix manualment el nombre de dies i el tipus de còmput. El sistema tindrà en compte el calendari de festius de Castelló (nacionals, autonòmics i locals).',
        quickCalcDays: 'Nombre de dies',
        quickCalcType: 'Tipus de còmput',
        quickCalcTypeHelp: {
            habiles: 'S\'exclouen dissabtes, diumenges i festius del còmput',
            naturales: 'Si l\'últim dia és inhàbil, es prorroga al següent hàbil'
        },
        quickCalcStartDate: 'Data d\'inici',
        quickCalcNotificationDate: 'Data de publicació/notificació',
        daysInputLabel: 'Nombre de dies',
        dayTypeLabel: 'Tipus de dies',
        naturalDays: 'Dies naturals',
        businessDays: 'Dies hàbils',
        quickDateLabel: 'Data d\'inici',
        quickDateHelp: 'El còmput començarà des d\'aquesta data',

        // Holiday Calendar
        holidaysTitle: 'Calendari de Festius',
        nationalHolidays: 'Festius Nacionals',
        regionalHolidays: 'Festius Comunitat Valenciana',
        localHolidays: 'Festius Locals Castelló',
        holidaysNote: 'Aquests dies són considerats inhàbils per al còmput de terminis',

        // Categories
        categories: {
            licitacion: 'Licitació',
            adjudicacion: 'Adjudicació',
            formalizacion: 'Formalització',
            ejecucion: 'Execució',
            recursos: 'Recursos',
            especiales: 'Procediments Especials'
        },

        // Footer
        footerNote: 'Aquesta eina té caràcter orientatiu. Consulteu sempre la normativa vigent i els serveis jurídics competents.',

        // Theme
        darkMode: 'Mode fosc',
        lightMode: 'Mode clar',

        // Language
        language: 'Idioma'
    }
} as const;

export type Language = 'es' | 'va';
export type TranslationKey = keyof typeof translations.es;
