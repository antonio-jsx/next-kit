/** @type {import('prettier').Config} */

const prettierConfig = {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  arrowParens: 'always',
  endOfLine: 'lf',

  tailwindStylesheet: './app/globals.css',

  plugins: ['prettier-plugin-tailwindcss'],
};

export default prettierConfig;
