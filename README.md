# 📅 Calculadora LCSP 

Herramienta web para el cálculo automatizado de plazos administrativos establecidos en la **Ley 9/2017, de 8 de noviembre, de Contratos del Sector Público (LCSP)**, adaptada al calendario festivo de **Lugo y la Comunidad Autónoma de Galicia**.

> ⚠️ **Aviso**: Esta herramienta tiene carácter orientativo. Consulte siempre la normativa vigente y los servicios jurídicos competentes.

---

## 📋 Índice

1. [Descripción general](#descripción-general)
2. [Características principales](#características-principales)
3. [Tecnologías utilizadas](#tecnologías-utilizadas)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Instalación y puesta en marcha](#instalación-y-puesta-en-marcha)
6. [Cómo usar la aplicación](#cómo-usar-la-aplicación)
7. [Reglas de cómputo aplicadas](#reglas-de-cómputo-aplicadas)
8. [Festivos incluidos](#festivos-incluidos)
9. [Internacionalización (ES / GAL)](#internacionalización-es--gal)
10. [Modo oscuro](#modo-oscuro)
11. [Despliegue en producción](#despliegue-en-producción)
12. [Fuentes legales y normativas](#fuentes-legales-y-normativas)

---

## Descripción general

Esta aplicación permite a empleados públicos de la **Diputación Provincial de Lugo** calcular de forma rápida y precisa las fechas de vencimiento de los diferentes plazos administrativos que marca la LCSP, teniendo en cuenta:

- El modo de cómputo establecido por la ley (días naturales o hábiles).
- El punto de inicio del plazo (**Dies a Quo**: día siguiente a la notificación o publicación).
- La prórroga automática cuando el último día cae en día inhábil.
- El calendario completo de festivos: nacionales, de la Comunidad Autónoma de Galicia y locales de Lugo.

La aplicación dispone de dos modos de cálculo:

1. **Plazos LCSP**: Selección guiada por fase del procedimiento y tipo de plazo, con los días aplicables precargados según la normativa.
2. **Calculadora Rápida**: Introducción libre de días (naturales o hábiles) para cualquier otro supuesto.

---

## Características principales

- ✅ Cálculo preciso de plazos según la LCSP (Ley 9/2017)
- ✅ Computo en **días naturales** (por defecto) o **días hábiles**
- ✅ Aplicación automática de la regla **Dies a Quo** (inicio al día siguiente)
- ✅ Prórroga automática al primer día hábil si el vencimiento cae en inhábil
- ✅ Soporte completo de festivos: nacionales, autonómicos de Galicia y locales de Lugo (2025–2026)
- ✅ Indicador visual de urgencia del plazo (en curso / próximo / urgente / vencido)
- ✅ Desglose detallado del cómputo con lista de festivos del periodo
- ✅ Interfaz bilingüe **Castellano / Gallego (Galego)**
- ✅ **Modo oscuro** integrado
- ✅ Totalmente **responsive** para escritorio y móvil
- ✅ Calendario de festivos consultable en cualquier momento desde el encabezado

---

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| [React](https://react.dev/) | 18.x | Framework de UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipado estático |
| [Vite](https://vitejs.dev/) | 6.x | Bundler y servidor de desarrollo |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Estilos y diseño responsive |
| [Lucide React](https://lucide.dev/) | latest | Iconografía SVG |

---

## Estructura del proyecto

```
calculadora-lcsp-lugo-react/
│
├── public/                        # Archivos estáticos
│
├── src/
│   ├── components/                # Componentes React reutilizables
│   │   ├── CalculatorForm.tsx     # Formulario de cálculo (Plazos LCSP)
│   │   ├── DeadlineCard.tsx       # Tarjeta de resultado de plazo
│   │   ├── DeadlineOptions.tsx    # Opciones y reducciones de plazo
│   │   ├── HolidayCalendar.tsx    # Panel de festivos desplegable
│   │   ├── Layout.tsx             # Estructura general: header, footer, nav de idioma
│   │   └── QuickCalculator.tsx    # Calculadora rápida de días libres
│   │
│   ├── context/
│   │   ├── LanguageContext.tsx    # Contexto React para el idioma activo
│   │   └── ThemeContext.tsx       # Contexto React para el modo claro/oscuro
│   │
│   ├── data/
│   │   ├── deadlines.ts           # Definición de fases y plazos LCSP
│   │   └── holidays.ts            # Festivos de Lugo + Galicia + Nacionales (2025-2026)
│   │
│   ├── hooks/
│   │   └── useLCSPCalculator.ts   # Hook con la lógica central de cálculo de plazos
│   │
│   ├── i18n/
│   │   └── translations.ts        # Traducciones en Castellano (es) y Gallego (gl)
│   │
│   ├── App.tsx                    # Componente raíz de la aplicación
│   ├── main.tsx                   # Punto de entrada de React
│   └── index.css                  # Estilos globales y tokens de diseño
│
├── index.html                     # Plantilla HTML base
├── package.json                   # Dependencias y scripts npm
├── tailwind.config.js             # Configuración de Tailwind CSS
├── tsconfig.json                  # Configuración de TypeScript
└── vite.config.ts                 # Configuración de Vite
```

---

## Instalación y puesta en marcha

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior

### Pasos

1. **Clonar el repositorio:**

```bash
git clone https://github.com/[tu-usuario]/Calculadora-LCSP-DPLugo.git
cd Calculadora-LCSP-DPLugo
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Iniciar el servidor de desarrollo:**

```bash
npm run dev
```

4. Abrir el navegador en [http://localhost:5173](http://localhost:5173)

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Genera el bundle de producción en `/dist` |
| `npm run preview` | Previsualiza el build de producción localmente |

---

## Cómo usar la aplicación

### Pestaña "Plazos LCSP"

Esta es la funcionalidad principal. Permite calcular automáticamente el vencimiento de los plazos regulados por la LCSP.

**Paso 1 – Seleccionar la fase del procedimiento:**

Haga clic en el desplegable "1. FASE DEL PROCEDIMIENTO" y elija la etapa en la que se encuentra el expediente. Las fases disponibles son:

- **Licitación**: Plazos relacionados con la publicación y preparación de ofertas.
- **Adjudicación**: Desde la propuesta de adjudicación hasta la resolución.
- **Formalización**: Plazos para la firma del contrato.
- **Ejecución**: Hitos durante la vigencia del contrato.
- **Recursos**: Plazos para la interposición y resolución de recursos.
- **Procedimientos Especiales**: Supuestos específicos como emergencias o contratos menores.

**Paso 2 – Seleccionar el tipo de plazo:**

Una vez elegida la fase, el segundo desplegable se activa automáticamente mostrando únicamente los plazos aplicables a esa fase, con el tipo de cómputo (natural o hábil) y los días preconfigurados según la normativa.

**Paso 3 – Introducir la fecha de publicación o notificación:**

Seleccione la fecha en que se publicó el anuncio o se notificó el acto administrativo de inicio. Este es el **Dies a Quo** inverso: la aplicación automáticamente iniciará el cómputo a partir del **día siguiente** a esta fecha.

**Paso 4 – Calcular:**

Pulse el botón **"CALCULAR FECHA DE VENCIMIENTO"**.

La aplicación mostrará:
- 📆 **Fecha de vencimiento** calculada.
- ⏱️ Días restantes hasta el vencimiento.
- 🔴/🟡/🟢 Indicador visual de urgencia.
- 📝 Detalle del cómputo:
  - Fecha de inicio (Dies a Quo).
  - Número de días contabilizados.
  - Lista de festivos que caen dentro del período (si el cómputo es en días hábiles).
  - Nota de prórroga si el vencimiento natural caía en día inhábil.

**Para hacer un nuevo cálculo**, pulse el botón "NUEVO CÁLCULO".

---

### Pestaña "Calculadora Rápida"

Permite calcular plazos que no están incluidos en la tabla de plazos LCSP, o para comprobaciones rápidas.

**Pasos:**

1. Introduce el **número de días** deseado.
2. Selecciona el **tipo de cómputo**:
   - **Días naturales**: Se cuentan todos los días del calendario. Si el último día es inhábil, el vencimiento se prorroga al siguiente hábil.
   - **Días hábiles**: Se excluyen del cómputo los sábados, domingos y todos los festivos (nacionales, autonómicos de Galicia y locales de Lugo).
3. Selecciona la **fecha de inicio** del cómputo (en este caso, comienza desde el mismo día seleccionado, no al día siguiente).
4. Pulsa **"CALCULAR FECHA DE VENCIMIENTO"**.

---

### Panel "Festivos"

En la esquina superior derecha del encabezado encontrará el botón **"Festivos [año]"**. Al pulsarlo, se despliega un panel con el listado completo de festivos del año en curso, organizados en tres categorías:

- 🔴 **Festivos Nacionales** (en rojo)
- 🟠 **Festivos de Galicia** (en naranja)
- 🔵 **Festivos Locales de Lugo** (en azul)

---

## Reglas de cómputo aplicadas

La aplicación implementa las siguientes reglas legales:

| Regla | Descripción | Base legal |
|---|---|---|
| **Dies a Quo** | El cómputo comienza el día siguiente al de la publicación/notificación | Art. 30 Ley 39/2015 |
| **Días naturales** | Por defecto en la LCSP, salvo indicación expresa de días hábiles | DA 12ª LCSP |
| **Prórroga automática** | Si el último día es inhábil (fin de semana o festivo), el plazo se prorroga al primer día hábil siguiente | Art. 30.5 Ley 39/2015 |
| **Festivos** | Se consideran inhábiles los festivos nacionales, autonómicos de Galicia y locales de Lugo | BOE, DOGA y BOP Lugo |

---

## Festivos incluidos

### Fuentes oficiales consultadas

- **Festivos Nacionales**: [BOE – Real Decreto de fiestas nacionales](https://www.boe.es/)
- **Festivos autonómicos de Galicia**: [DOGA – Xunta de Galicia](https://www.xunta.gal/diario-oficial-galicia)
- **Festivos locales de Lugo**: [BOP Lugo – Boletín Oficial Provincial](https://www.deputacionlugo.gal/)

### Festivos 2025

| Fecha | Nombre | Tipo |
|---|---|---|
| 01/01/2025 | Año Nuevo | Nacional |
| 06/01/2025 | Epifanía del Señor (Reyes) | Nacional |
| 18/04/2025 | Viernes Santo | Nacional |
| 17/04/2025 | Jueves Santo | Galicia |
| 01/05/2025 | Fiesta del Trabajo | Nacional |
| 17/05/2025 | Día de las Letras Gallegas | Galicia |
| 25/07/2025 | Día Nacional de Galicia (Santiago Apóstol) | Galicia |
| 15/08/2025 | Asunción de la Virgen | Nacional |
| 12/10/2025 | Fiesta Nacional de España | Nacional |
| 01/11/2025 | Todos los Santos | Nacional |
| 06/12/2025 | Día de la Constitución | Nacional |
| 08/12/2025 | Inmaculada Concepción | Nacional |
| 25/12/2025 | Navidad | Nacional |
| 04/03/2025 | Martes de Carnaval | Local (Lugo) |
| 06/10/2025 | Lunes posterior a San Froilán | Local (Lugo) |

### Festivos 2026

| Fecha | Nombre | Tipo |
|---|---|---|
| 01/01/2026 | Año Nuevo | Nacional |
| 06/01/2026 | Epifanía del Señor (Reyes) | Nacional |
| 03/04/2026 | Viernes Santo | Nacional |
| 02/04/2026 | Jueves Santo | Galicia |
| 01/05/2026 | Fiesta del Trabajo | Nacional |
| 15/08/2026 | Asunción de la Virgen | Nacional |
| 12/10/2026 | Fiesta Nacional de España | Nacional |
| 08/12/2026 | Inmaculada Concepción | Nacional |
| 25/12/2026 | Navidad | Nacional |
| 19/03/2026 | San José | Galicia |
| 24/06/2026 | San Juan | Galicia |
| 25/07/2026 | Día Nacional de Galicia | Galicia |
| 17/02/2026 | Martes de Carnaval | Local (Lugo) |
| 05/10/2026 | San Froilán | Local (Lugo) |

---

## Internacionalización (ES / GAL)

La aplicación soporta dos idiomas, seleccionables desde la barra superior derecha:

- **ES** – Castellano
- **GAL** – Galego (Gallego)

El idioma seleccionado se recuerda automáticamente gracias al **localStorage** del navegador, de modo que al recargar la página se mantiene la preferencia del usuario.

La lógica de internacionalización se gestiona mediante el contexto `LanguageContext`, que expone:
- `language`: código del idioma activo (`'es'` o `'gl'`).
- `setLanguage(lang)`: función para cambiar el idioma.
- `t(key)`: función de traducción que acepta claves anidadas con notación de punto (ej: `t('daysType.naturales')`).

Las traducciones están centralizadas en el archivo `src/i18n/translations.ts`.

---

## Modo oscuro

La aplicación incluye un interruptor de modo oscuro en la barra superior derecha (icono de luna/sol). El tema seleccionado también se persiste en localStorage.

El modo oscuro se gestiona a través del `ThemeContext`, que aplica dinámicamente las clases de Tailwind CSS (`bg-gray-900`, `bg-gray-800`, etc.) al árbol de componentes.

---

## Despliegue en producción

### Build local

```bash
npm run build
```

El resultado se genera en la carpeta `/dist`, lista para desplegarse en cualquier servidor web estático.

### Despliegue en Vercel

1. Conecte el repositorio de GitHub a [Vercel](https://vercel.com/).
2. Vercel detectará automáticamente la configuración de Vite.
3. Los ajustes recomendados:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
4. Pulse **Deploy**.

---

## Fuentes legales y normativas

- [Ley 9/2017, de 8 de noviembre, de Contratos del Sector Público (BOE)](https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902)
- [Disposición Adicional 12ª LCSP – Cómputo de plazos](https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902)
- [Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común – Art. 30 (plazos)](https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565)
- [DOGA – Calendario laboral Galicia](https://www.xunta.gal/diario-oficial-galicia)
- [BOP Lugo – Festivos locales](https://www.deputacionlugo.gal/)

---

*Desarrollado para empleados públicos de la Diputación de Lugo como campo de pruebas. Puede contener errores.*
