import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    rules: {
      // Enforce consistent imports
      'no-duplicate-imports': 'error',
    },
  },
];
