import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { type ManifestOptions, VitePWA } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> = {
  theme_color: "#000000",
  background_color: "#ffffff",
  icons: [
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "icon512_maskable.png",
      type: "image/png",
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "icon512_rounded.png",
      type: "image/png",
    },
  ],
  orientation: "portrait",
  display: "standalone",
  lang: "ru-RU",
  name: "Pill Tracker",
  short_name: "Pill Tracker",
  start_url: "https://pill.shteyn-web.ru",
  scope: "https://pill.shteyn-web.ru",
  description:
    "Отслеживай количество таблеток в упаковке, а также количество дней на курсе",
};

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: manifest,
      workbox: {
        globPatterns: ["**/*.{js,css,html,json,ico,png,jpg,svg}"],
        navigateFallback: "/index.html",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
