import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
    plugins: [
    nextui({
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {} // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {} // dark theme colors
        },
        modern: {
          extend: 'dark', // <- inherit default values from dark theme
          colors: {
            background: '#0D001A',
            foreground: '#ffffff',
            primary: {
              50: '#3B096C',
              100: '#520F83',
              200: '#7318A2',
              300: '#9823C2',
              400: '#c031e2',
              500: '#DD62ED',
              600: '#F182F6',
              700: '#FCADF9',
              800: '#FDD5F9',
              900: '#FEECFE',
              DEFAULT: '#DD62ED',
              foreground: '#ffffff'
            },
            focus: '#F182F6'
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '1px',
              medium: '2px',
              large: '4px'
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px'
            }
          }
        }
      }
    })
  ],
  darkMode: "class",
  plugins: [nextui()],
}
