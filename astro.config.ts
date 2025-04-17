import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "ja",
    locales: ["ja"],
  },
  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: true,
  },
  integrations: [
    svelte(),
    starlight({
      title: {
        en: "Become a Hacker!",
        ja: "ハッカーになろう",
      },
      defaultLocale: "ja",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ut-code/security",
        },
      ],
      sidebar: [
        {
          label: "SQL インジェクション",
          slug: "sql-injection",
        },
        {
          label: "XSS",
          slug: "xss",
        },
        {
          label: "パスワード",
          slug: "password",
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
  ],
});
