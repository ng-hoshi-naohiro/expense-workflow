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
        primary: '#2456c4',
        'primary-dark': '#1a3f8f',
        success: '#2d7a4f',
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
        'card': '12px',
        'btn': '8px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(12, 24, 48, 0.06)',
        'modal': '0 24px 48px -16px rgba(12, 24, 48, 0.25)',
      },
    },
  },
  plugins: [],
}