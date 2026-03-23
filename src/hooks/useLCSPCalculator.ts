/**
 * useLCSPCalculator - Hook para calcular plazos legales LCSP
 * 
 * Aplica las reglas de cómputo:
 * - Dies a Quo: El plazo comienza el día siguiente a la publicación/notificación
 * - Días hábiles: Excluye sábados, domingos y festivos
 * - Días naturales: Si el último día es inhábil, se prorroga al siguiente hábil
 * - Festivos: Nacionales, Comunidad Valenciana y Castellón (locales)
 */

import { useState } from 'react';
import { addDays, isWeekend, differenceInCalendarDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Deadline, DayType } from '../data/deadlines';
import { isHoliday, getHolidaysInRange, Holiday } from '../data/holidays';

export interface CalculationResult {
    deadline: Deadline;
    startDate: Date;
    endDate: Date;
    formattedStartDate: string;
    formattedEndDate: string;
    daysApplied: number;
    dayType: DayType;
    holidaysInPeriod: Holiday[];
    daysRemaining: number;
    isOverdue: boolean;
    appliedReductions: string[];
}

export type UrgencyStatus = 'normal' | 'warning' | 'critical' | 'overdue';

/**
 * Determina el estado de urgencia según los días restantes
 */
export function getUrgencyStatus(daysRemaining: number): UrgencyStatus {
    if (daysRemaining < 0) return 'overdue';
    if (daysRemaining <= 3) return 'critical';
    if (daysRemaining <= 7) return 'warning';
    return 'normal';
}

/**
 * Comprueba si un día es inhábil (fin de semana o festivo)
 */
function isNonWorkingDay(date: Date): boolean {
    return isWeekend(date) || isHoliday(date);
}

/**
 * Calcula la fecha de vencimiento con días naturales
 * Si el último día es inhábil, se prorroga al siguiente hábil
 */
function calculateNaturalDays(startDate: Date, days: number): Date {
    // Dies a Quo: empezamos el día siguiente
    const computeStart = addDays(startDate, 1);

    // Añadimos los días naturales
    let endDate = addDays(computeStart, days - 1);

    // Si el último día es inhábil, prorrogamos al siguiente hábil
    while (isNonWorkingDay(endDate)) {
        endDate = addDays(endDate, 1);
    }

    return endDate;
}

/**
 * Calcula la fecha de vencimiento con días hábiles
 * Solo cuenta días laborables (excluye fines de semana y festivos)
 */
function calculateWorkingDays(startDate: Date, days: number): Date {
    // Dies a Quo: empezamos el día siguiente
    let currentDate = addDays(startDate, 1);
    let workingDaysCount = 0;

    while (workingDaysCount < days) {
        if (!isNonWorkingDay(currentDate)) {
            workingDaysCount++;
        }
        if (workingDaysCount < days) {
            currentDate = addDays(currentDate, 1);
        }
    }

    return currentDate;
}

/**
 * Hook principal para calcular plazos LCSP
 */
export function useLCSPCalculator() {
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const calculate = (
        deadline: Deadline,
        startDate: Date,
        effectiveDays: number,
        appliedReductions: string[] = []
    ) => {
        try {
            setError(null);

            if (effectiveDays <= 0) {
                setError('El número de días debe ser mayor que 0');
                return;
            }

            let endDate: Date;

            if (deadline.dayType === 'habiles') {
                endDate = calculateWorkingDays(startDate, effectiveDays);
            } else {
                endDate = calculateNaturalDays(startDate, effectiveDays);
            }

            // Calcular días restantes hasta hoy
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const daysRemaining = differenceInCalendarDays(endDate, today);

            // Obtener festivos en el período
            const holidaysInPeriod = getHolidaysInRange(startDate, endDate);

            // Formatear fechas
            const formattedStartDate = format(startDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
            const formattedEndDate = format(endDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });

            setResult({
                deadline,
                startDate,
                endDate,
                formattedStartDate,
                formattedEndDate,
                daysApplied: effectiveDays,
                dayType: deadline.dayType,
                holidaysInPeriod,
                daysRemaining,
                isOverdue: daysRemaining < 0,
                appliedReductions,
            });

        } catch (err) {
            setError('Error al calcular la fecha de vencimiento');
            console.error(err);
        }
    };

    const reset = () => {
        setResult(null);
        setError(null);
    };

    return {
        result,
        error,
        calculate,
        reset,
    };
}
