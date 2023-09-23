// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import("@docusaurus/types").Config} */
const config = {
  title: "あなたのためのプログラミング",
  tagline: "ut.code(); 第74回駒場祭企画",
  favicon: "img/favicon.ico",
  url: "https://kf74.utcode.net",
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
          sidebarPath: require.resolve("./security/sidebars.js"),
          path: "security",
          routeBasePath: "security",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
    ({
      navbar: {
        title: "あなたのためのプログラミング",
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
