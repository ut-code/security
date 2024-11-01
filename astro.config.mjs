// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import preact from "@astrojs/preact";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "~": "/src",
      },
    },
  },
  i18n: {
    defaultLocale: "ja",
    locales: ["ja"],
  },
  integrations: [
    starlight({
      title: "ハッカーになろう",
      defaultLocale: "ja",
      social: {
        github: "https://github.com/ut-code/security",
      },
      sidebar: [
        {
          label: "SQL インジェクション",
          slug: "sql-injection",
        },
        {
          label: "XSS",
          slug: "xss",
        },
        // you can also do something like this:
        // items: [
        //   // Each item here is one entry in the navigation menu.
        //   { label: 'Example Guide', slug: 'guides/example' },
        // ],
        // or like this.
        // autogenerate: { directory: 'reference' },
      ],
    }),
    preact(),
    svelte(),
  ],
});
