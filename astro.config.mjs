// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import preact from '@astrojs/preact';
import svelte from '@astrojs/svelte';


// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '~': '/src',
      },
    },
  },
  integrations: [starlight({
    title: 'My Docs',
    social: {
      github: 'https://github.com/withastro/starlight',
    },
    sidebar: [
      {
        label: 'XSS',
        slug: "xss"
        // you can also do something like this:
        // items: [
        //   // Each item here is one entry in the navigation menu.
        //   { label: 'Example Guide', slug: 'guides/example' },
        // ],
        // or like this.
        // autogenerate: { directory: 'reference' },
      },
      {
        label: 'SQL インジェクション',
        slug: "sql-injection"
      },
    ],
  }), preact({ compat: true }), svelte(),],
});
