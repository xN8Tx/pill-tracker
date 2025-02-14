import { defineConfig, mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(
    config,
    defineConfig({
      resolve: {
        alias: {
          "@": "/src",
        },
      },
      server: {
        fs: {
          allow: [
            "/opt/node_modules", // this is the abs path OUTSIDE the project root causing the Vite error
            "/opt/app",
          ],
        },
      },
    }),
  );
};
