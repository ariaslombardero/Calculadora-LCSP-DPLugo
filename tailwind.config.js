/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Colores corporativos Diputació de Castelló (extraídos de dipcas.es)
                'diputacio': {
                    'red': '#BA0C2F',      // Rojo corporativo principal
                    'red-dark': '#8A0823', // Rojo oscuro para hover
                    'gray': '#F4F4F4',     // Gris claro para fondos de tarjetas
                    'dark': '#0F172A',     // Negro para texto principal
                    'muted': '#475569',    // Gris para texto secundario
                }
            },
            fontFamily: {
                'sans': ['Open Sans', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                'sm': '2px', // Bordes casi rectos como en dipcas.es
            }
        },
    },
    plugins: [],
}
