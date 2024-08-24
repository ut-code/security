// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

// const { themes } = require("prism-react-renderer");
import { themes } from "prism-react-renderer";
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/** @type {import("@docusaurus/types").Config} */
const config = {
  title: "ハッカーになろう",
  tagline: "ut.code(); 駒場祭/五月祭企画",
  favicon: "/img/favicon.ico",
  url: "https://todo.utcode.net", // TODO: change this
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  i18n: {
    defaultLocale: "ja",
    locales: ["ja"],
  },
  presets: [
    [
      "classic",
      /** @type {import("@docusaurus/preset-classic").Options} */
      ({
        docs: {
          sidebarPath: "./security/sidebars.js",
          path: "./security",
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
  themeConfig:
    /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
    ({
      navbar: {
        title: "ハッカーになろう by ut.code();",
        logo: {
          alt: "ut.code();",
          src: "img/logo.svg",
        },
        items: [
          {
            href: "https://utcode.net/",
            label: "ut.code();",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "ut.code(); について",
            items: [
              {
                label: "公式ウェブサイト",
                href: "https://utcode.net/",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/utokyo_code",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/utokyo_code",
              },
              {
                label: "GitHub",
                href: "https://github.com/ut-code",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ut.code();. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
