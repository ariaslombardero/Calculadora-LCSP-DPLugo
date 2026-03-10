/**
 * Festivos de Lugo (Galicia) + Nacionales
 * Años: 2025-2026
 * 
 * Fuentes:
 * - Festivos nacionales: BOE
 * - Festivos autonómicos: DOGA (Xunta de Galicia)
 * - Festivos locales: BOP Lugo
 */

export interface Holiday {
    date: string; // formato YYYY-MM-DD
    name: string;
    type: 'nacional' | 'autonomico' | 'local';
}

export const HOLIDAYS_LUGO: Holiday[] = [
    // ========== 2025 ==========
    // Nacionales
    { date: '2025-01-01', name: 'Año Nuevo', type: 'nacional' },
    { date: '2025-01-06', name: 'Epifanía del Señor (Reyes)', type: 'nacional' },
    { date: '2025-04-18', name: 'Viernes Santo', type: 'nacional' },
    { date: '2025-05-01', name: 'Fiesta del Trabajo', type: 'nacional' },
    { date: '2025-08-15', name: 'Asunción de la Virgen', type: 'nacional' },
    { date: '2025-10-12', name: 'Fiesta Nacional de España', type: 'nacional' },
    { date: '2025-11-01', name: 'Todos los Santos', type: 'nacional' },
    { date: '2025-12-06', name: 'Día de la Constitución', type: 'nacional' },
    { date: '2025-12-08', name: 'Inmaculada Concepción', type: 'nacional' },
    { date: '2025-12-25', name: 'Navidad', type: 'nacional' },

    // Autonómicos Galicia
    { date: '2025-04-17', name: 'Jueves Santo', type: 'autonomico' },
    { date: '2025-05-17', name: 'Día de las Letras Gallegas', type: 'autonomico' },
    { date: '2025-07-25', name: 'Día Nacional de Galicia (Santiago Apóstol)', type: 'autonomico' },

    // Locales Lugo
    { date: '2025-03-04', name: 'Martes de Carnaval', type: 'local' },
    { date: '2025-10-06', name: 'Lunes posterior a San Froilán', type: 'local' },

    // ========== 2026 ==========
    // Nacionales
    { date: '2026-01-01', name: 'Año Nuevo', type: 'nacional' },
    { date: '2026-01-06', name: 'Epifanía del Señor (Reyes)', type: 'nacional' },
    { date: '2026-04-03', name: 'Viernes Santo', type: 'nacional' },
    { date: '2026-05-01', name: 'Fiesta del Trabajo', type: 'nacional' },
    { date: '2026-08-15', name: 'Asunción de la Virgen', type: 'nacional' },
    { date: '2026-10-12', name: 'Fiesta Nacional de España', type: 'nacional' },
    { date: '2026-12-08', name: 'Inmaculada Concepción', type: 'nacional' },
    { date: '2026-12-25', name: 'Navidad', type: 'nacional' },

    // Autonómicos Galicia
    { date: '2026-03-19', name: 'San José', type: 'autonomico' },
    { date: '2026-04-02', name: 'Jueves Santo', type: 'autonomico' },
    { date: '2026-06-24', name: 'San Juan', type: 'autonomico' },
    { date: '2026-07-25', name: 'Día Nacional de Galicia', type: 'autonomico' },

    // Locales Lugo
    { date: '2026-02-17', name: 'Martes de Carnaval', type: 'local' },
    { date: '2026-10-05', name: 'San Froilán', type: 'local' },
];

/**
 * Comprueba si una fecha es festivo en Lugo
 */
export function isHoliday(date: Date): boolean {
    const dateStr = formatDateToISO(date);
    return HOLIDAYS_LUGO.some(h => h.date === dateStr);
}

/**
 * Obtiene el nombre del festivo para una fecha
 */
export function getHolidayName(date: Date): string | null {
    const dateStr = formatDateToISO(date);
    const holiday = HOLIDAYS_LUGO.find(h => h.date === dateStr);
    return holiday ? holiday.name : null;
}

/**
 * Formatea una fecha a YYYY-MM-DD
 */
function formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Obtiene los festivos en un rango de fechas
 */
export function getHolidaysInRange(startDate: Date, endDate: Date): Holiday[] {
    const startStr = formatDateToISO(startDate);
    const endStr = formatDateToISO(endDate);

    return HOLIDAYS_LUGO.filter(h => h.date >= startStr && h.date <= endStr);
}
