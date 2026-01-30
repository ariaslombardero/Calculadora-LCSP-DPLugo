# Calculadora LCSP - Diputació de Castelló

Calculadora web para el cómputo de plazos administrativos según la **Ley 9/2017, de 8 de noviembre, de Contratos del Sector Público (LCSP)**.

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite)

## 📋 Descripción

Herramienta de cálculo orientativa para determinar fechas de vencimiento de plazos en procedimientos de contratación pública. Incluye:

- Cómputo de **días naturales** y **días hábiles**
- Calendario de festivos de **Castellón** (nacionales, autonómicos y locales)
- Prórroga automática cuando el último día cae en inhábil
- Aplicación de la regla **Dies a Quo** (el cómputo comienza el día siguiente)

## ✨ Funcionalidades

### Calculadora de Plazos LCSP
- **5 fases del procedimiento**: Licitación, Adjudicación, Formalización, Ejecución, Recursos
- **+50 plazos legales** con referencias a artículos de la LCSP
- **Reducciones aplicables**: Urgencia, medios electrónicos, anuncio previo, etc.
- **Plazos flexibles**: Configuración de días mínimos, máximos o rangos

### Calculadora Rápida
- Cálculo manual introduciendo número de días
- Selección de tipo de cómputo (naturales/hábiles)
- Visualización de festivos durante el período

### Calendario de Festivos
- Festivos nacionales 2025-2026
- Festivos de la Comunidad Valenciana
- Festivos locales de Castellón de la Plana

### Internacionalización (i18n)
- **Castellano** (ES)
- **Valenciano** (VAL)

### Modo Oscuro
- Tema claro/oscuro con persistencia en localStorage
- Detección automática de preferencia del sistema

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/calculadora-lcsp-castellon.git

# Entrar al directorio
cd calculadora-lcsp-castellon

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la build de producción |
| `npm run preview` | Previsualiza la build de producción |

## 🏗️ Estructura del proyecto

```
src/
├── components/          # Componentes React
│   ├── Layout.tsx       # Layout principal con header/footer
│   ├── CalculatorForm.tsx   # Formulario de selección de plazos
│   ├── DeadlineCard.tsx     # Tarjeta de resultado
│   ├── DeadlineOptions.tsx  # Opciones dinámicas del plazo
│   ├── QuickCalculator.tsx  # Calculadora rápida manual
│   └── HolidayCalendar.tsx  # Calendario de festivos
├── context/             # Contextos React
│   ├── LanguageContext.tsx  # Gestión de idioma (ES/VAL)
│   └── ThemeContext.tsx     # Gestión de tema (claro/oscuro)
├── data/                # Datos estáticos
│   ├── deadlines.ts     # Plazos LCSP con artículos y reducciones
│   └── holidays.ts      # Calendario de festivos
├── hooks/               # Custom hooks
│   └── useLCSPCalculator.ts  # Lógica de cálculo de plazos
├── i18n/                # Traducciones
│   └── translations.ts  # Strings ES/VAL
├── App.tsx              # Componente raíz
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales
```

## 📜 Referencias legales

- [Ley 9/2017 LCSP (BOE)](https://www.boe.es/buscar/act.php?id=BOE-A-2017-12902)
- [Ley 39/2015 Procedimiento Administrativo](https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565)
- Disposición Adicional 12ª LCSP (cómputo de plazos)

## ⚠️ Aviso legal

**Esta herramienta tiene carácter orientativo.** Los cálculos no sustituyen el análisis jurídico profesional. Consulte siempre la normativa vigente y los servicios jurídicos competentes para determinar plazos oficiales.

## 🛠️ Tecnologías

- **React 18** + **TypeScript**
- **Vite** como bundler
- **TailwindCSS** para estilos
- **date-fns** para cálculos de fechas
- **Lucide React** para iconos

## 📄 Licencia

Uso interno - Diputació de Castelló

---

Desarrollado para la **Diputació de Castelló** | 2026
