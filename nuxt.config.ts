import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2026-06-02',
  devtools: {
    enabled: true,
  },
  devServer: {
    host: '0',
    port: 65432,
  },
  vite: {
    clearScreen: false,
    plugins: [tailwindcss()],
    envPrefix: ['VITE_', 'TAURI_'],
    optimizeDeps: {
      include: ['vue', 'vue-router', '@vue/devtools-core', '@vue/devtools-kit'],
    },
    server: {
      strictPort: true,
    },
  },
  ignore: ['**/src-tauri/**'],
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/': {
      prerender: true,
    },
  },
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ],
      link: [
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Tauri Starter',
    },
  },
  ssr: false,
  modules: ['@nuxt/ui', '@vueuse/nuxt', '@nuxt/hints', '@nuxt/test-utils'],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
});
