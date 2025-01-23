import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        'fp-green': '#6cc35b',
        'fp-beige': '#fbfcf9'
      }
    }
  },

  plugins: []
} satisfies Config;
