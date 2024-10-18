import sitemap from "@astrojs/sitemap";
// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
	site: "https://example.com",
	integrations: [mdx(), sitemap(), preact(), svelte()],
});
