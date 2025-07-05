/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',
        dark: {
          bg: '#121212',         // 主背景色
          card: '#1E1E1E',       // 卡片背景
          card2: '#252525',      // 次级卡片背景
          card3: '#2D2D2D',      // 三级卡片背景
          hover: '#333333',      // 悬停背景
          border: '#333333',     // 边框颜色
          divider: '#2A2A2A',    // 分割线颜色
          text: '#E0E0E0',       // 主文本颜色
          textSecondary: '#A0A0A0', // 次级文本颜色
          textMuted: '#6C6C6C',  // 弱文本颜色
          accent: '#3B82F6'      // 强调色
        }
      },
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        'dark': '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.5)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.6)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.7)',
        'dark-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
        'soft-sm': '0 2px 5px 0 rgba(0,0,0,0.03), 0 0 2px 0 rgba(0,0,0,0.05)',
        'soft': '0 2px 10px 0 rgba(0,0,0,0.05), 0 0 4px 0 rgba(0,0,0,0.07)',
        'soft-md': '0 4px 12px -1px rgba(0,0,0,0.07), 0 2px 6px -1px rgba(0,0,0,0.05)',
        'soft-lg': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.05)',
        'soft-xl': '0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.04)',
        'soft-2xl': '0 25px 50px -12px rgba(0,0,0,0.1)',
        'colored-sm': '0 2px 5px 0 rgba(14,165,233,0.2)',
        'colored': '0 4px 12px 0 rgba(14,165,233,0.15)',
        'colored-lg': '0 8px 20px 0 rgba(14,165,233,0.2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 