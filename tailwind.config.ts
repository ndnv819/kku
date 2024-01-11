import type { Config } from 'tailwindcss';

/*
function 'var(cssVar: string): string {
  // @ts-ignore
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${cssVar})', ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${cssVar})', var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${cssVar}))`;
  };
}
*/

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/presentation/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          100: 'var(--c-primary-100)',
          200: 'var(--c-primary-200)',
          300: 'var(--c-primary-300)',
          400: 'var(--c-primary-400)',
          500: 'var(--c-primary-500)',
          600: 'var(--c-primary-600)',
          700: 'var(--c-primary-700)',
          800: 'var(--c-primary-800)',
          900: 'var(--c-primary-900)',
        },
        basic: {
          100: 'var(--c-basic-100)',
          200: 'var(--c-basic-200)',
          300: 'var(--c-basic-300)',
          400: 'var(--c-basic-400)',
          500: 'var(--c-basic-500)',
          600: 'var(--c-basic-600)',
          700: 'var(--c-basic-700)',
          800: 'var(--c-basic-800)',
          900: 'var(--c-basic-900)',
        },
        success: {
          100: 'var(--c-success-100)',
          200: 'var(--c-success-200)',
          300: 'var(--c-success-300)',
          400: 'var(--c-success-400)',
          500: 'var(--c-success-500)',
          600: 'var(--c-success-600)',
          700: 'var(--c-success-700)',
          800: 'var(--c-success-800)',
          900: 'var(--c-success-900)',
        },
        info: {
          100: 'var(--c-info-100)',
          200: 'var(--c-info-200)',
          300: 'var(--c-info-300)',
          400: 'var(--c-info-400)',
          500: 'var(--c-info-500)',
          600: 'var(--c-info-600)',
          700: 'var(--c-info-700)',
          800: 'var(--c-info-800)',
          900: 'var(--c-info-900)',
        },
        warning: {
          100: 'var(--c-warning-100)',
          200: 'var(--c-warning-200)',
          300: 'var(--c-warning-300)',
          400: 'var(--c-warning-400)',
          500: 'var(--c-warning-500)',
          600: 'var(--c-warning-600)',
          700: 'var(--c-warning-700)',
          800: 'var(--c-warning-800)',
          900: 'var(--c-warning-900)',
        },
        danger: {
          100: 'var(--c-danger-100)',
          200: 'var(--c-danger-200)',
          300: 'var(--c-danger-300)',
          400: 'var(--c-danger-400)',
          500: 'var(--c-danger-500)',
          600: 'var(--c-danger-600)',
          700: 'var(--c-danger-700)',
          800: 'var(--c-danger-800)',
          900: 'var(--c-danger-900)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
