/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0c1830',
        'ink-soft': '#2a3a5a',
        paper: '#f6f3ec',
        'paper-warm': '#ede8db',
        accent: '#c8472b',
        'accent-soft': '#e8835c',
        line: '#d5cdb8',
        primary: '#24BD7E',
        'primary-dark': '#1a9560',
        success: '#1a4480',
        warning: '#b85c00',
        error: '#c8472b',
        screen: '#ffffff',
        'screen-soft': '#f4f5f8',
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', 'serif'],
        sans: ['"Noto Sans JP"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'btn': '12px',
        'card': '16px',
      },
      boxShadow: {
        'card': '0 6px 16px rgba(12, 24, 48, 0.10)',
        'input': '0 1px 3px rgba(12, 24, 48, 0.05)',
        'modal': '0 24px 48px -16px rgba(12, 24, 48, 0.25)',
      },
    },
  },
  plugins: [],
}