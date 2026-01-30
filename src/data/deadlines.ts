/**
 * Plazos LCSP - Ley 9/2017, de Contratos del Sector Público
 * 
 * Fuente: BOE-A-2017-12902 + Guía Gobierto
 * Auditoría: Enero 2026
 * 
 * MODELO FLEXIBLE:
 * - daysType: 'fixed' | 'minimum' | 'maximum' | 'range'
 * - reductions: Reducciones aplicables por el usuario
 * 
 * IMPORTANTE: 
 * - Por defecto, todos los plazos son DÍAS NATURALES (DA 12 LCSP)
 * - Solo son DÍAS HÁBILES cuando la ley lo indica expresamente
 */

export type DayType = 'naturales' | 'habiles';
export type DaysType = 'fixed' | 'minimum' | 'maximum' | 'range';
export type DeadlineCategory = 'licitacion' | 'adjudicacion' | 'formalizacion' | 'ejecucion' | 'recursos';

export interface DeadlineReduction {
    id: string;
    label: string;
    days: number;           // Negativo para reducir, positivo para añadir
    article?: string;
    condition?: string;
}

export interface Deadline {
    id: string;
    name: string;
    category: DeadlineCategory;
    subcategory?: string;
    article: string;
    description: string;
    alert?: string;
    dayType: DayType;

    // Flexibilidad en plazos
    daysType: DaysType;
    days?: number;           // Para 'fixed'
    minDays?: number;        // Para 'minimum' o 'range'
    maxDays?: number;        // Para 'maximum' o 'range'
    defaultDays?: number;    // Valor por defecto en input

    // Reducciones aplicables
    reductions?: DeadlineReduction[];
}

// ============================================================
// PLAZOS DE LICITACIÓN
// ============================================================

export const DEADLINES_LICITACION: Deadline[] = [
    // --- SARA (Regulación Armonizada) ---
    {
        id: 'abierto-sara-general',
        name: 'Abierto SARA (Obras/Servicios/Suministros)',
        daysType: 'fixed',
        days: 35,
        dayType: 'naturales',
        article: 'Art. 156.3 LCSP',
        description: 'Plazo presentación ofertas en procedimiento abierto armonizado',
        category: 'licitacion',
        subcategory: 'SARA',
        reductions: [
            {
                id: 'medios-electronicos',
                label: 'Tramitación electrónica',
                days: -5,
                article: 'Art. 156.3 LCSP',
                condition: 'Presentación de ofertas por medios electrónicos'
            },
            {
                id: 'anuncio-info-previa',
                label: 'Anuncio información previa publicado',
                days: -20,
                article: 'Art. 156.3.a LCSP',
                condition: 'Se publicó anuncio de información previa (mínimo resultante: 15 días)'
            }
        ]
    },
    {
        id: 'abierto-sara-concesiones',
        name: 'Abierto SARA (Concesiones)',
        daysType: 'fixed',
        days: 30,
        dayType: 'naturales',
        article: 'Art. 156.3 LCSP',
        description: 'Plazo presentación ofertas en concesiones armonizadas',
        category: 'licitacion',
        subcategory: 'SARA',
        reductions: [
            {
                id: 'medios-electronicos',
                label: 'Tramitación electrónica',
                days: -5,
                article: 'Art. 156.3 LCSP'
            }
        ]
    },
    {
        id: 'abierto-sara-urgencia',
        name: 'Abierto SARA (Urgencia)',
        daysType: 'fixed',
        days: 15,
        dayType: 'naturales',
        article: 'Art. 156.3.b LCSP',
        description: 'Plazo mínimo en caso de urgencia justificada',
        alert: '⚡ Solo con declaración de urgencia (Art. 119)',
        category: 'licitacion',
        subcategory: 'SARA'
    },
    {
        id: 'restringido-sara-solicitudes',
        name: 'Restringido SARA - Solicitudes participación',
        daysType: 'minimum',
        minDays: 30,
        defaultDays: 30,
        dayType: 'naturales',
        article: 'Art. 161.1 LCSP',
        description: 'Plazo solicitudes de participación (mínimo 30 días)',
        category: 'licitacion',
        subcategory: 'SARA'
    },
    {
        id: 'restringido-sara-ofertas',
        name: 'Restringido SARA - Ofertas',
        daysType: 'minimum',
        minDays: 30,
        defaultDays: 30,
        dayType: 'naturales',
        article: 'Art. 161.2 LCSP',
        description: 'Plazo presentación ofertas tras invitación (mínimo 30 días)',
        category: 'licitacion',
        subcategory: 'SARA'
    },

    // --- No SARA ---
    {
        id: 'abierto-no-sara-obras',
        name: 'Abierto No SARA (Obras/Concesiones)',
        daysType: 'minimum',
        minDays: 26,
        defaultDays: 26,
        dayType: 'naturales',
        article: 'Art. 156.6.a LCSP',
        description: 'Plazo presentación ofertas en obras < umbral SARA (mínimo 26 días)',
        category: 'licitacion',
        subcategory: 'No SARA'
    },
    {
        id: 'abierto-no-sara-servicios',
        name: 'Abierto No SARA (Servicios/Suministros)',
        daysType: 'minimum',
        minDays: 15,
        defaultDays: 15,
        dayType: 'naturales',
        article: 'Art. 156.6.b LCSP',
        description: 'Plazo presentación ofertas en servicios/suministros < umbral (mínimo 15 días)',
        category: 'licitacion',
        subcategory: 'No SARA'
    },
    {
        id: 'restringido-no-sara-solicitudes',
        name: 'Restringido No SARA - Solicitudes',
        daysType: 'minimum',
        minDays: 15,
        defaultDays: 15,
        dayType: 'naturales',
        article: 'Art. 161 LCSP',
        description: 'Plazo solicitudes de participación (mínimo 15 días)',
        category: 'licitacion',
        subcategory: 'No SARA'
    },
    {
        id: 'restringido-no-sara-ofertas',
        name: 'Restringido No SARA - Ofertas',
        daysType: 'minimum',
        minDays: 10,
        defaultDays: 10,
        dayType: 'naturales',
        article: 'Art. 161 LCSP',
        description: 'Plazo presentación ofertas (mínimo 10 días)',
        category: 'licitacion',
        subcategory: 'No SARA'
    },

    // --- Simplificado ---
    {
        id: 'simplificado-servicios',
        name: 'Simplificado (Servicios/Suministros)',
        daysType: 'minimum',
        minDays: 15,
        defaultDays: 15,
        dayType: 'naturales',
        article: 'Art. 159.3 LCSP',
        description: 'Procedimiento abierto simplificado (mínimo 15 días)',
        category: 'licitacion',
        subcategory: 'Simplificado'
    },
    {
        id: 'simplificado-obras',
        name: 'Simplificado (Obras)',
        daysType: 'minimum',
        minDays: 20,
        defaultDays: 20,
        dayType: 'naturales',
        article: 'Art. 159.3 LCSP',
        description: 'Procedimiento abierto simplificado para obras (mínimo 20 días)',
        category: 'licitacion',
        subcategory: 'Simplificado'
    },
    {
        id: 'super-simplificado',
        name: 'Súper-Simplificado',
        daysType: 'minimum',
        minDays: 10,
        defaultDays: 10,
        dayType: 'habiles',
        article: 'Art. 159.6 LCSP',
        description: 'Tramitación súper-simplificada (< 80k€ obras / < 60k€ otros)',
        alert: '🔥 Días HÁBILES (mínimo 10)',
        category: 'licitacion',
        subcategory: 'Simplificado'
    },
    {
        id: 'super-simplificado-corriente',
        name: 'Súper-Simplificado (Bienes corrientes)',
        daysType: 'minimum',
        minDays: 5,
        defaultDays: 5,
        dayType: 'habiles',
        article: 'Art. 159.6.a LCSP',
        description: 'Compras corrientes de bienes disponibles en el mercado',
        alert: '🔥 Plazo crítico - Días HÁBILES (mínimo 5)',
        category: 'licitacion',
        subcategory: 'Simplificado'
    },

    // --- Asociación para la Innovación ---
    {
        id: 'asociacion-innovacion-sara',
        name: 'Asociación Innovación SARA - Solicitudes',
        daysType: 'minimum',
        minDays: 30,
        defaultDays: 30,
        dayType: 'naturales',
        article: 'Art. 178 LCSP',
        description: 'Plazo recepción solicitudes de participación (mínimo 30 días)',
        category: 'licitacion',
        subcategory: 'Innovación'
    },
    {
        id: 'asociacion-innovacion-no-sara',
        name: 'Asociación Innovación No SARA - Solicitudes',
        daysType: 'minimum',
        minDays: 20,
        defaultDays: 20,
        dayType: 'naturales',
        article: 'Art. 178 LCSP',
        description: 'Plazo recepción solicitudes de participación no SARA (mínimo 20 días)',
        category: 'licitacion',
        subcategory: 'Innovación'
    },

    // --- Información y Apertura ---
    {
        id: 'solicitud-informacion',
        name: 'Solicitud información sobre licitación',
        daysType: 'fixed',
        days: 12,
        dayType: 'naturales',
        article: 'Art. 138.3 LCSP',
        description: 'Plazo mínimo antes del fin para solicitar información (12 días antes)',
        alert: '📋 Se cuenta hacia atrás desde fin de plazo',
        category: 'licitacion',
        subcategory: 'Información'
    },
    {
        id: 'respuesta-informacion',
        name: 'Respuesta información a interesados',
        daysType: 'fixed',
        days: 6,
        dayType: 'naturales',
        article: 'Art. 138.3 LCSP',
        description: 'Órgano debe responder como mínimo 6 días antes del fin de plazo',
        alert: '📋 Se cuenta hacia atrás desde fin de plazo',
        category: 'licitacion',
        subcategory: 'Información',
        reductions: [
            {
                id: 'urgencia-sara',
                label: 'Expediente urgente SARA',
                days: -4,
                article: 'Art. 138.3 LCSP',
                condition: 'En expedientes urgentes de contratos SARA (se reduce a 2 días antes)'
            }
        ]
    },
    {
        id: 'apertura-proposiciones',
        name: 'Apertura proposiciones mesa',
        daysType: 'maximum',
        maxDays: 20,
        defaultDays: 20,
        dayType: 'naturales',
        article: 'Art. 157.3 LCSP',
        description: 'Plazo máximo desde fin de presentación para abrir ofertas',
        category: 'licitacion',
        subcategory: 'Mesa contratación'
    },
];

// ============================================================
// PLAZOS DE ADJUDICACIÓN
// ============================================================

export const DEADLINES_ADJUDICACION: Deadline[] = [
    {
        id: 'aportacion-documentacion',
        name: 'Aportación documentación adjudicatario',
        daysType: 'fixed',
        days: 10,
        dayType: 'habiles',
        article: 'Art. 150.2 LCSP',
        description: 'Plazo para aportar documentación y garantía tras propuesta de adjudicación',
        category: 'adjudicacion'
    },
    {
        id: 'aportacion-documentacion-simplificado',
        name: 'Documentación (Simplificado)',
        daysType: 'fixed',
        days: 7,
        dayType: 'habiles',
        article: 'Art. 159.4 LCSP',
        description: 'Plazo documentación en procedimiento simplificado',
        category: 'adjudicacion',
        subcategory: 'Simplificado'
    },
    {
        id: 'resolucion-adjudicacion',
        name: 'Resolución de adjudicación',
        daysType: 'maximum',
        maxDays: 5,
        defaultDays: 5,
        dayType: 'habiles',
        article: 'Art. 150.3 LCSP',
        description: 'Plazo máximo para adjudicar tras recibir documentación',
        category: 'adjudicacion'
    },
    {
        id: 'adjudicacion-simplificado',
        name: 'Adjudicación tras garantía (Simplificado)',
        daysType: 'maximum',
        maxDays: 5,
        defaultDays: 5,
        dayType: 'naturales',
        article: 'Art. 159.4 LCSP',
        description: 'Plazo máximo para adjudicar tras constituir garantía en simplificado',
        category: 'adjudicacion',
        subcategory: 'Simplificado'
    },
    {
        id: 'adjudicacion-criterio-precio',
        name: 'Adjudicación (solo criterio precio)',
        daysType: 'maximum',
        maxDays: 15,
        defaultDays: 15,
        dayType: 'naturales',
        article: 'Art. 158 LCSP',
        description: 'Plazo máximo adjudicación cuando solo hay criterio precio',
        category: 'adjudicacion'
    },
    {
        id: 'adjudicacion-varios-criterios',
        name: 'Adjudicación (varios criterios)',
        daysType: 'maximum',
        maxDays: 60,
        defaultDays: 60,
        dayType: 'naturales',
        article: 'Art. 158 LCSP',
        description: 'Plazo máximo adjudicación con varios criterios (2 meses)',
        alert: '⏳ Se amplía 15 días hábiles si hay ofertas anormales',
        category: 'adjudicacion'
    },
    {
        id: 'notificacion-adjudicacion',
        name: 'Notificación y publicación adjudicación',
        daysType: 'maximum',
        maxDays: 15,
        defaultDays: 15,
        dayType: 'naturales',
        article: 'Art. 151.1 LCSP',
        description: 'Plazo máximo para notificar a licitadores tras resolución',
        category: 'adjudicacion'
    },
    {
        id: 'subsanacion-documentacion',
        name: 'Subsanación documentación',
        daysType: 'fixed',
        days: 3,
        dayType: 'habiles',
        article: 'Art. 141.3 LCSP',
        description: 'Plazo para subsanar defectos en documentación',
        alert: '🔥 Plazo crítico',
        category: 'adjudicacion'
    },
    {
        id: 'alegaciones-simplificado',
        name: 'Alegaciones abierto simplificado',
        daysType: 'fixed',
        days: 5,
        dayType: 'habiles',
        article: 'Art. 159.4 LCSP',
        description: 'Plazo para alegaciones en procedimiento simplificado',
        alert: '🔥 Plazo crítico',
        category: 'adjudicacion',
        subcategory: 'Simplificado'
    },
    {
        id: 'audiencia-exclusion',
        name: 'Audiencia exclusión licitador',
        daysType: 'fixed',
        days: 3,
        dayType: 'habiles',
        article: 'Art. 151.2 LCSP',
        description: 'Plazo para alegaciones antes de exclusión',
        alert: '🔥 Plazo crítico',
        category: 'adjudicacion'
    },
    {
        id: 'valoracion-simplificado',
        name: 'Valoración proposiciones (Simplificado)',
        daysType: 'maximum',
        maxDays: 7,
        defaultDays: 7,
        dayType: 'naturales',
        article: 'Art. 159.4 LCSP',
        description: 'Plazo máximo para valorar ofertas con juicio de valor',
        category: 'adjudicacion',
        subcategory: 'Simplificado'
    },
    {
        id: 'justificacion-oferta-anormal-simplificado',
        name: 'Justificación oferta anormal (Simplificado)',
        daysType: 'maximum',
        maxDays: 5,
        defaultDays: 5,
        dayType: 'habiles',
        article: 'Art. 159.4 LCSP',
        description: 'Plazo máximo para justificar oferta presumiblemente anormal',
        category: 'adjudicacion',
        subcategory: 'Simplificado'
    },

    // --- Prácticas colusorias ---
    {
        id: 'informe-cnmc',
        name: 'Informe CNMC (indicios colusión)',
        daysType: 'maximum',
        maxDays: 20,
        defaultDays: 20,
        dayType: 'habiles',
        article: 'Art. 150.1 LCSP',
        description: 'Plazo CNMC para emitir informe sobre indicios de colusión',
        category: 'adjudicacion',
        subcategory: 'Colusión'
    },
    {
        id: 'alegaciones-colusion',
        name: 'Alegaciones indicios colusión',
        daysType: 'fixed',
        days: 10,
        dayType: 'habiles',
        article: 'Art. 150.1 LCSP',
        description: 'Plazo para alegaciones tras informe confirmatorio CNMC',
        category: 'adjudicacion',
        subcategory: 'Colusión'
    },
    {
        id: 'resolucion-colusion',
        name: 'Resolución sobre colusión',
        daysType: 'maximum',
        maxDays: 10,
        defaultDays: 10,
        dayType: 'habiles',
        article: 'Art. 150.1 LCSP',
        description: 'Plazo órgano contratación para resolver tras alegaciones',
        category: 'adjudicacion',
        subcategory: 'Colusión'
    },
];

// ============================================================
// PLAZOS DE FORMALIZACIÓN
// ============================================================

export const DEADLINES_FORMALIZACION: Deadline[] = [
    {
        id: 'standstill',
        name: 'Formalización (susceptible de REMC)',
        daysType: 'fixed',
        days: 15,
        dayType: 'habiles',
        article: 'Art. 153.3 LCSP',
        description: 'Plazo de espera antes de formalizar (contratos susceptibles de REMC)',
        alert: '⏸️ Suspende la formalización',
        category: 'formalizacion'
    },
    {
        id: 'requerimiento-formalizacion',
        name: 'Requerimiento para formalizar',
        daysType: 'maximum',
        maxDays: 5,
        defaultDays: 5,
        dayType: 'naturales',
        article: 'Art. 153.3 LCSP',
        description: 'Plazo máximo para requerir formalización tras standstill',
        category: 'formalizacion'
    },
    {
        id: 'formalizacion-sin-recurso',
        name: 'Formalización (no susceptible REMC)',
        daysType: 'maximum',
        maxDays: 15,
        defaultDays: 15,
        dayType: 'habiles',
        article: 'Art. 153.3 LCSP',
        description: 'Plazo máximo para formalizar contratos no susceptibles de REMC',
        category: 'formalizacion'
    },
    {
        id: 'publicacion-formalizacion-perfil',
        name: 'Publicación formalización (Perfil)',
        daysType: 'maximum',
        maxDays: 15,
        defaultDays: 15,
        dayType: 'naturales',
        article: 'Art. 154.1 LCSP',
        description: 'Plazo máximo publicación en perfil del contratante',
        category: 'formalizacion'
    },
    {
        id: 'publicacion-formalizacion-doue',
        name: 'Publicación formalización (DOUE)',
        daysType: 'maximum',
        maxDays: 10,
        defaultDays: 10,
        dayType: 'naturales',
        article: 'Art. 154.3 LCSP',
        description: 'Plazo máximo envío al DOUE para contratos SARA',
        category: 'formalizacion',
        subcategory: 'SARA'
    },
    {
        id: 'garantia-definitiva',
        name: 'Constitución garantía definitiva',
        daysType: 'fixed',
        days: 10,
        dayType: 'habiles',
        article: 'Art. 150.2 LCSP',
        description: 'Plazo para constituir garantía (incluido en documentación)',
        category: 'formalizacion'
    },
    {
        id: 'garantia-definitiva-simplificado',
        name: 'Garantía definitiva (Simplificado)',
        daysType: 'fixed',
        days: 7,
        dayType: 'habiles',
        article: 'Art. 159.4.f LCSP',
        description: 'Plazo para constituir garantía en simplificado',
        category: 'formalizacion',
        subcategory: 'Simplificado'
    },
];

// ============================================================
// PLAZOS DE EJECUCIÓN
// ============================================================

export const DEADLINES_EJECUCION: Deadline[] = [
    {
        id: 'pago-administracion',
        name: 'Pago Administración',
        daysType: 'maximum',
        maxDays: 30,
        defaultDays: 30,
        dayType: 'naturales',
        article: 'Art. 198.4 LCSP',
        description: 'Plazo máximo para abonar tras recepción',
        category: 'ejecucion'
    },
    {
        id: 'presentacion-factura',
        name: 'Presentación factura',
        daysType: 'maximum',
        maxDays: 30,
        defaultDays: 30,
        dayType: 'naturales',
        article: 'Art. 198 LCSP',
        description: 'Plazo máximo para presentar factura desde la entrega',
        category: 'ejecucion'
    },
    {
        id: 'recepcion-contrato',
        name: 'Recepción formal del contrato',
        daysType: 'maximum',
        maxDays: 30,
        defaultDays: 30,
        dayType: 'naturales',
        article: 'Art. 210 LCSP',
        description: 'Plazo máximo para acto formal de recepción (1 mes)',
        category: 'ejecucion'
    },
    {
        id: 'suspension-impago',
        name: 'Suspensión por impago',
        daysType: 'fixed',
        days: 120,
        dayType: 'naturales',
        article: 'Art. 198 LCSP',
        description: 'Demora a partir de la cual el contratista puede suspender (4 meses)',
        alert: '⚠️ Comunicar con 1 mes antelación',
        category: 'ejecucion'
    },
    {
        id: 'resolucion-impago',
        name: 'Resolución por impago',
        daysType: 'fixed',
        days: 180,
        dayType: 'naturales',
        article: 'Art. 198 LCSP',
        description: 'Demora a partir de la cual el contratista puede resolver (6 meses)',
        alert: '⚠️ Derecho a indemnización',
        category: 'ejecucion'
    },
    {
        id: 'reajuste-garantia',
        name: 'Reajuste garantía (penalidades/modificación)',
        daysType: 'fixed',
        days: 15,
        dayType: 'naturales',
        article: 'Art. 109 LCSP',
        description: 'Plazo para reajustar garantía tras penalidades o modificación',
        category: 'ejecucion'
    },
    {
        id: 'garantia-obras',
        name: 'Periodo garantía (Obras)',
        daysType: 'minimum',
        minDays: 365,
        defaultDays: 365,
        dayType: 'naturales',
        article: 'Art. 243.1 LCSP',
        description: 'Periodo mínimo de garantía para obras (mínimo 1 año)',
        alert: '📋 Se fija en PCAP según complejidad',
        category: 'ejecucion'
    },
    {
        id: 'certificacion-final-obras',
        name: 'Certificación final obras',
        daysType: 'maximum',
        maxDays: 90,
        defaultDays: 90,
        dayType: 'naturales',
        article: 'Art. 243 LCSP',
        description: 'Plazo máximo para aprobar certificación final (3 meses desde recepción)',
        category: 'ejecucion',
        subcategory: 'Obras'
    },
    {
        id: 'informe-fin-garantia-obras',
        name: 'Informe fin garantía obras',
        daysType: 'fixed',
        days: 15,
        dayType: 'naturales',
        article: 'Art. 243 LCSP',
        description: 'El director de obra debe informar 15 días antes del fin de garantía',
        alert: '📋 Se cuenta hacia atrás desde fin de garantía',
        category: 'ejecucion',
        subcategory: 'Obras'
    },
    {
        id: 'devolucion-garantia',
        name: 'Devolución garantía definitiva',
        daysType: 'maximum',
        maxDays: 60,
        defaultDays: 60,
        dayType: 'naturales',
        article: 'Art. 111.1 LCSP',
        description: 'Plazo para aprobar y notificar devolución (2 meses desde fin contrato)',
        category: 'ejecucion'
    },
    {
        id: 'devolucion-garantia-automatica',
        name: 'Devolución garantía automática',
        daysType: 'fixed',
        days: 365,
        dayType: 'naturales',
        article: 'Art. 111 LCSP',
        description: 'Si pasa 1 año sin recepción/liquidación por causas no imputables, devolución inmediata',
        alert: '📋 6 meses si VEC < 100k€ o PYME',
        category: 'ejecucion'
    },
    {
        id: 'responsabilidad-vicios-ocultos',
        name: 'Responsabilidad vicios ocultos',
        daysType: 'fixed',
        days: 5475,
        dayType: 'naturales',
        article: 'Art. 244 LCSP',
        description: 'Responsabilidad del contratista por vicios ocultos (15 años)',
        category: 'ejecucion',
        subcategory: 'Obras'
    },
    {
        id: 'prescripcion-vicios',
        name: 'Prescripción acciones vicios',
        daysType: 'fixed',
        days: 730,
        dayType: 'naturales',
        article: 'Art. 244 LCSP',
        description: 'Las acciones prescriben a los 2 años desde que se manifiesten',
        category: 'ejecucion',
        subcategory: 'Obras'
    },
];

// ============================================================
// PLAZOS DE RECURSOS (REMC - Recurso Especial)
// Fuente: Gobierto + Arts. 49-56 LCSP
// ============================================================

export const DEADLINES_RECURSOS: Deadline[] = [
    // --- MEDIDAS CAUTELARES (Art. 49 LCSP) ---
    {
        id: 'remc-cautelares-decision',
        name: 'Decisión medidas cautelares',
        daysType: 'fixed',
        days: 5,
        dayType: 'habiles',
        article: 'Art. 49 LCSP',
        description: 'Plazo para que el órgano resolutorio decida sobre la adopción de medidas cautelares',
        category: 'recursos',
        subcategory: 'Medidas cautelares'
    },
    {
        id: 'remc-cautelares-alegaciones-oc',
        name: 'Alegaciones órgano contratación (cautelares)',
        daysType: 'fixed',
        days: 2,
        dayType: 'habiles',
        article: 'Art. 49 LCSP',
        description: 'Plazo del órgano de contratación para presentar alegaciones a la solicitud de medidas cautelares',
        category: 'recursos',
        subcategory: 'Medidas cautelares'
    },

    // --- ACCESO AL EXPEDIENTE (Art. 52 LCSP) ---
    {
        id: 'remc-acceso-expediente',
        name: 'Acceso al expediente de contratación',
        daysType: 'fixed',
        days: 5,
        dayType: 'habiles',
        article: 'Art. 52 LCSP',
        description: 'Plazo para facilitar acceso al expediente desde la recepción de la solicitud',
        alert: '📋 La solicitud debe hacerse dentro del plazo de interposición del REMC',
        category: 'recursos',
        subcategory: 'Pre-interposición'
    },

    // --- INTERPOSICIÓN DEL REMC (Art. 50 LCSP) ---
    {
        id: 'remc-interposicion-general',
        name: 'Interposición REMC (general)',
        daysType: 'fixed',
        days: 15,
        dayType: 'habiles',
        article: 'Art. 50.1 LCSP',
        description: 'Plazo para interponer recurso especial desde publicación/notificación del acto',
        alert: '⏸️ Suspensión automática si se recurre la adjudicación',
        category: 'recursos',
        subcategory: 'Interposición'
    },
    {
        id: 'remc-interposicion-nulidad',
        name: 'Interposición REMC por nulidad (Art. 39.2)',
        daysType: 'fixed',
        days: 30,
        dayType: 'naturales',
        article: 'Art. 50.3 LCSP',
        description: 'Plazo para recurrir por causas de nulidad del Art. 39.2.c/d/e/f (falta publicación, standstill, etc.)',
        alert: '⚠️ Desde publicación formalización o notificación exclusión',
        category: 'recursos',
        subcategory: 'Interposición'
    },
    {
        id: 'remc-interposicion-nulidad-otros',
        name: 'Interposición REMC por otras nulidades',
        daysType: 'maximum',
        maxDays: 180,
        defaultDays: 180,
        dayType: 'naturales',
        article: 'Art. 50.4 LCSP',
        description: 'Plazo máximo para recurrir por resto de supuestos de nulidad del Art. 39 (6 meses desde formalización)',
        category: 'recursos',
        subcategory: 'Interposición'
    },

    // --- SUBSANACIÓN (Art. 51 LCSP) ---
    {
        id: 'remc-subsanacion',
        name: 'Subsanación de defectos del REMC',
        daysType: 'fixed',
        days: 3,
        dayType: 'habiles',
        article: 'Art. 51 LCSP',
        description: 'Plazo para subsanar defectos del escrito de recurso. Si no se subsana, se da por desistido.',
        alert: '⚠️ Suspende la tramitación del expediente',
        category: 'recursos',
        subcategory: 'Tramitación'
    },

    // --- EFECTOS DE LA INTERPOSICIÓN (Art. 53 LCSP) ---
    {
        id: 'remc-remision-expediente',
        name: 'Remisión expediente al órgano resolutorio',
        daysType: 'fixed',
        days: 2,
        dayType: 'habiles',
        article: 'Art. 53 LCSP',
        description: 'Plazo del órgano de contratación para remitir el expediente al tribunal',
        category: 'recursos',
        subcategory: 'Tramitación'
    },
    {
        id: 'remc-traslado-interesados',
        name: 'Traslado a interesados',
        daysType: 'fixed',
        days: 5,
        dayType: 'habiles',
        article: 'Art. 53 LCSP',
        description: 'Plazo para dar traslado del REMC a los interesados tras la interposición',
        category: 'recursos',
        subcategory: 'Tramitación'
    },
    {
        id: 'remc-alegaciones-interesados',
        name: 'Alegaciones de interesados',
        daysType: 'fixed',
        days: 5,
        dayType: 'habiles',
        article: 'Art. 53 LCSP',
        description: 'Plazo para que los interesados formulen alegaciones al REMC',
        category: 'recursos',
        subcategory: 'Tramitación'
    },

    // --- RESOLUCIÓN (Art. 57 LCSP) ---
    {
        id: 'remc-resolucion',
        name: 'Resolución del REMC',
        daysType: 'fixed',
        days: 5,
        dayType: 'habiles',
        article: 'Art. 57 LCSP',
        description: 'Plazo para resolver el recurso tras recibir alegaciones y prueba',
        alert: '📋 Si no se resuelve en plazo, silencio negativo',
        category: 'recursos',
        subcategory: 'Resolución'
    },

    // --- RECURSO CONTENCIOSO (LJCA) ---
    {
        id: 'contencioso-administrativo',
        name: 'Recurso contencioso-administrativo',
        daysType: 'fixed',
        days: 60,
        dayType: 'naturales',
        article: 'Art. 46.1 LJCA',
        description: 'Plazo para interponer recurso contencioso contra la resolución del REMC (2 meses)',
        category: 'recursos',
        subcategory: 'Vía judicial'
    },

    // --- RECURSO DE REPOSICIÓN (Ley 39/2015) ---
    {
        id: 'recurso-reposicion',
        name: 'Recurso potestativo de reposición',
        daysType: 'fixed',
        days: 30,
        dayType: 'naturales',
        article: 'Art. 124 Ley 39/2015',
        description: 'Plazo para interponer recurso de reposición (actos no susceptibles de REMC)',
        category: 'recursos',
        subcategory: 'Otros recursos'
    },
];

// ============================================================
// PLAZOS PROCEDIMIENTOS ESPECIALES
// ============================================================

export const DEADLINES_ESPECIALES: Deadline[] = [
    {
        id: 'urgencia-informes',
        name: 'Informes expediente urgente',
        daysType: 'range',
        minDays: 5,
        maxDays: 10,
        defaultDays: 5,
        dayType: 'naturales',
        article: 'Art. 119 LCSP',
        description: 'Plazo órganos para emitir informes (5 días, o 10 si complejo)',
        alert: '⚡ Los plazos generales se reducen a la mitad',
        category: 'licitacion',
        subcategory: 'Urgencia'
    },
    {
        id: 'urgencia-inicio-ejecucion',
        name: 'Inicio ejecución (Urgencia)',
        daysType: 'maximum',
        maxDays: 30,
        defaultDays: 30,
        dayType: 'naturales',
        article: 'Art. 119 LCSP',
        description: 'Plazo máximo para iniciar ejecución tras formalizar (1 mes)',
        category: 'ejecucion',
        subcategory: 'Urgencia'
    },
    {
        id: 'emergencia-comunicacion-consejo',
        name: 'Comunicación Consejo Ministros (Emergencia)',
        daysType: 'maximum',
        maxDays: 30,
        defaultDays: 30,
        dayType: 'naturales',
        article: 'Art. 120 LCSP',
        description: 'Plazo para comunicar al Consejo de Ministros (AGE)',
        category: 'formalizacion',
        subcategory: 'Emergencia'
    },
    {
        id: 'emergencia-inicio-ejecucion',
        name: 'Inicio ejecución (Emergencia)',
        daysType: 'maximum',
        maxDays: 30,
        defaultDays: 30,
        dayType: 'naturales',
        article: 'Art. 120 LCSP',
        description: 'Plazo máximo para iniciar ejecución (1 mes). Si no, procedimiento ordinario.',
        alert: '⚠️ Si no inicia en plazo, debe usar procedimiento ordinario',
        category: 'ejecucion',
        subcategory: 'Emergencia'
    },
];

// ============================================================
// EXPORTACIÓN COMBINADA
// ============================================================

export const ALL_DEADLINES: Deadline[] = [
    ...DEADLINES_LICITACION,
    ...DEADLINES_ADJUDICACION,
    ...DEADLINES_FORMALIZACION,
    ...DEADLINES_EJECUCION,
    ...DEADLINES_RECURSOS,
    ...DEADLINES_ESPECIALES,
];

export const DEADLINE_CATEGORIES = {
    licitacion: { name: 'Licitación', icon: '📋', color: 'blue' },
    adjudicacion: { name: 'Adjudicación', icon: '⚖️', color: 'purple' },
    formalizacion: { name: 'Formalización', icon: '📝', color: 'green' },
    ejecucion: { name: 'Ejecución', icon: '🔄', color: 'orange' },
    recursos: { name: 'Recursos', icon: '⚠️', color: 'red' },
} as const;

/**
 * Calcula los días efectivos aplicando reducciones
 */
export function calculateEffectiveDays(
    deadline: Deadline,
    appliedReductions: string[] = []
): number {
    let baseDays = deadline.days ?? deadline.defaultDays ?? deadline.minDays ?? 0;

    if (deadline.reductions) {
        for (const reduction of deadline.reductions) {
            if (appliedReductions.includes(reduction.id)) {
                baseDays += reduction.days; // days es negativo para reducciones
            }
        }
    }

    // Aplicar mínimos si existen
    if (deadline.minDays !== undefined && baseDays < deadline.minDays) {
        baseDays = deadline.minDays;
    }

    // Aplicar máximos si existen
    if (deadline.maxDays !== undefined && baseDays > deadline.maxDays) {
        baseDays = deadline.maxDays;
    }

    return Math.max(1, baseDays);
}

/**
 * Valida si un número de días es válido para el deadline
 */
export function validateDays(deadline: Deadline, days: number): { valid: boolean; message?: string } {
    if (deadline.minDays !== undefined && days < deadline.minDays) {
        return {
            valid: false,
            message: `El plazo debe ser al menos ${deadline.minDays} días (${deadline.article})`
        };
    }
    if (deadline.maxDays !== undefined && days > deadline.maxDays) {
        return {
            valid: false,
            message: `El plazo no puede superar ${deadline.maxDays} días (${deadline.article})`
        };
    }
    return { valid: true };
}
