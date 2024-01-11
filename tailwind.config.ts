import type { Config } from 'tailwindcss';

function customColors(cssVar: string): string {
  // @ts-ignore
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${cssVar}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${cssVar}))`;
  };
}

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
          100: customColors('--c-primary-100'),
          200: customColors('--c-primary-200'),
          300: customColors('--c-primary-300'),
          400: customColors('--c-primary-400'),
          500: customColors('--c-primary-500'),
          600: customColors('--c-primary-600'),
          700: customColors('--c-primary-700'),
          800: customColors('--c-primary-800'),
          900: customColors('--c-primary-900'),
        },
        basic: {
          100: customColors('--c-basic-100'),
          200: customColors('--c-basic-200'),
          300: customColors('--c-basic-300'),
          400: customColors('--c-basic-400'),
          500: customColors('--c-basic-500'),
          600: customColors('--c-basic-600'),
          700: customColors('--c-basic-700'),
          800: customColors('--c-basic-800'),
          900: customColors('--c-basic-900'),
        },
        success: {
          100: customColors('--c-success-100'),
          200: customColors('--c-success-200'),
          300: customColors('--c-success-300'),
          400: customColors('--c-success-400'),
          500: customColors('--c-success-500'),
          600: customColors('--c-success-600'),
          700: customColors('--c-success-700'),
          800: customColors('--c-success-800'),
          900: customColors('--c-success-900'),
        },
        info: {
          100: customColors('--c-info-100'),
          200: customColors('--c-info-200'),
          300: customColors('--c-info-300'),
          400: customColors('--c-info-400'),
          500: customColors('--c-info-500'),
          600: customColors('--c-info-600'),
          700: customColors('--c-info-700'),
          800: customColors('--c-info-800'),
          900: customColors('--c-info-900'),
        },
        warning: {
          100: customColors('--c-warning-100'),
          200: customColors('--c-warning-200'),
          300: customColors('--c-warning-300'),
          400: customColors('--c-warning-400'),
          500: customColors('--c-warning-500'),
          600: customColors('--c-warning-600'),
          700: customColors('--c-warning-700'),
          800: customColors('--c-warning-800'),
          900: customColors('--c-warning-900'),
        },
        danger: {
          100: customColors('--c-danger-100'),
          200: customColors('--c-danger-200'),
          300: customColors('--c-danger-300'),
          400: customColors('--c-danger-400'),
          500: customColors('--c-danger-500'),
          600: customColors('--c-danger-600'),
          700: customColors('--c-danger-700'),
          800: customColors('--c-danger-800'),
          900: customColors('--c-danger-900'),
        },
      },
    },
  },
  plugins: [],
};
export default config;
