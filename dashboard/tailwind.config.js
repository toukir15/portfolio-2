import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            h1: {
              color: '#E5E7EB',
              marginTop: '8px',
              marginBottom: '8px',
              padding: '0px',
            },
            h2: {
              color: '#fff',
              marginTop: '8px',
              marginBottom: '8px',
              padding: '0px',
            },
            h3: {
              color: '#fff',
              marginTop: '4px',
              marginBottom: '4px',
              padding: '0px',
            },
            p: {
              color: '#E5E7EB',
              marginTop: '8px',
              marginBottom: '8px',
            },
            ol: {
              color: '#E5E7EB',
              marginBottom: '0px',
              marginTop: '0px',
            },
            strong: {
              color: '#fff',
            },
            li: {
              color: '#E5E7EB',
              marginBottom: '0px',
              marginTop: '0px',
            },
            ul: {
              color: '#E5E7EB',
              marginBottom: '8px',
              marginTop: '8px',
            },
            a: {
              color: '#E5E7EB',
            },
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
