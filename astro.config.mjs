import starlight from "@astrojs/starlight";
// @ts-check
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";
import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {},
  },
  i18n: {
    defaultLocale: "ja",
    locales: ["ja"],
  },
  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: true,
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: {
        en: "Become a Hacker!",
        ja: "ハッカーになろう",
      },
      defaultLocale: "ja",
      social: {
        github: "https://github.com/ut-code/security",
      },
      sidebar: [
        {
          label: "Webサイト編",
          items: [
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
          ],
        },
        {
          label: "暗号編",
          items: [
            {
              label: "基礎知識",
              slug: "crypto-basics",
            },
            {
              label: "RSA暗号",
              slug: "rsa",
            },
          ],
        },

        // you can also do something like this:
        // items: [
        //   // Each item here is one entry in the navigation menu.
        //   { label: 'Example Guide', slug: 'guides/example' },
        // ],
        // or like this.
        // autogenerate: { directory: 'reference' },
      ],
      customCss: ["./src/tailwind.css"],
    }),
    preact(),
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
