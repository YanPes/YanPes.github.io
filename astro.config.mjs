// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://yanpes.github.io',
  markdown: {
    shikiConfig: {
      theme: 'tokyo-night',
      transformers: [{
        name: 'readable-tokyo-night-comments',
        tokens(lines) {
          // Lift the theme's subdued comment colors for long-form reading.
          const subdued = ['#51597d', '#5a638c', '#646e9c'];
          for (const line of lines) {
            for (const token of line) {
              if (token.color && subdued.includes(token.color.toLowerCase())) {
                token.color = '#9aa5ce';
              }
            }
          }
        },
      }],
    },
  },
});
