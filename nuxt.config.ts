import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2026-06-02',
  ssr: false,
  vite: {
    clearScreen: false,
    plugins: [tailwindcss()],
    envPrefix: ['VITE_', 'TAURI_'],
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'vue', 'vue-router'],
    },
    server: {
      strictPort: true,
    },
  },
  nitro: {
    preset: 'bun',
    typescript: {
      tsConfig: {
        compilerOptions: {
          types: ['bun'],
        },
      },
    },
  },
  typescript: {
    nodeTsConfig: {
      compilerOptions: {
        types: ['bun'],
      },
    },
    sharedTsConfig: {
      compilerOptions: {
        types: ['bun'],
      },
    },
    tsConfig: {
      compilerOptions: {
        types: ['bun'],
      },
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
  devtools: {
    enabled: true,
  },
  devServer: {
    host: '0',
    port: 65432,
  },
  ignore: ['**/src-tauri/**'],
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui', '@vueuse/nuxt', '@nuxt/hints', '@nuxt/test-utils'],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
});
