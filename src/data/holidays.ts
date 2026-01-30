/**
 * Festivos de Castellón de la Plana (Comunidad Valenciana) + Nacionales
 * Años: 2025-2026
 * 
 * Fuentes:
 * - Festivos nacionales: BOE
 * - Festivos autonómicos: DOGV (Generalitat Valenciana)
 * - Festivos locales: BOP Castellón
 */

export interface Holiday {
    date: string; // formato YYYY-MM-DD
    name: string;
    type: 'nacional' | 'autonomico' | 'local';
}

export const HOLIDAYS_CASTELLON: Holiday[] = [
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

    // Autonómicos Comunidad Valenciana
    { date: '2025-03-19', name: 'San José (Fallas)', type: 'autonomico' },
    { date: '2025-04-21', name: 'Lunes de Pascua', type: 'autonomico' },
    { date: '2025-10-09', name: 'Día de la Comunidad Valenciana', type: 'autonomico' },

    // Locales Castellón de la Plana
    { date: '2025-03-24', name: 'Lunes de Magdalena', type: 'local' },
    { date: '2025-03-28', name: 'Viernes de Magdalena', type: 'local' },

    // ========== 2026 ==========
    // Nacionales
    { date: '2026-01-01', name: 'Año Nuevo', type: 'nacional' },
    { date: '2026-01-06', name: 'Epifanía del Señor (Reyes)', type: 'nacional' },
    { date: '2026-04-03', name: 'Viernes Santo', type: 'nacional' },
    { date: '2026-05-01', name: 'Fiesta del Trabajo', type: 'nacional' },
    { date: '2026-08-15', name: 'Asunción de la Virgen', type: 'nacional' },
    { date: '2026-10-12', name: 'Fiesta Nacional de España', type: 'nacional' },
    { date: '2026-11-01', name: 'Todos los Santos', type: 'nacional' },
    { date: '2026-12-06', name: 'Día de la Constitución', type: 'nacional' },
    { date: '2026-12-08', name: 'Inmaculada Concepción', type: 'nacional' },
    { date: '2026-12-25', name: 'Navidad', type: 'nacional' },

    // Autonómicos Comunidad Valenciana
    { date: '2026-03-19', name: 'San José (Fallas)', type: 'autonomico' },
    { date: '2026-04-06', name: 'Lunes de Pascua', type: 'autonomico' },
    { date: '2026-10-09', name: 'Día de la Comunidad Valenciana', type: 'autonomico' },

    // Locales Castellón de la Plana
    { date: '2026-03-09', name: 'Fiestas de la Magdalena', type: 'local' },
    { date: '2026-06-29', name: 'San Pedro (Grao)', type: 'local' },
];

/**
 * Comprueba si una fecha es festivo en Castellón
 */
export function isHoliday(date: Date): boolean {
    const dateStr = formatDateToISO(date);
    return HOLIDAYS_CASTELLON.some(h => h.date === dateStr);
}

/**
 * Obtiene el nombre del festivo para una fecha
 */
export function getHolidayName(date: Date): string | null {
    const dateStr = formatDateToISO(date);
    const holiday = HOLIDAYS_CASTELLON.find(h => h.date === dateStr);
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

    return HOLIDAYS_CASTELLON.filter(h => h.date >= startStr && h.date <= endStr);
}
