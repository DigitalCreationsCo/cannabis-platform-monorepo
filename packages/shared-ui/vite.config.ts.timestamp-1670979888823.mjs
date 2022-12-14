// vite.config.ts
import { defineConfig } from "file:///Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/node_modules/vite/dist/node/index.js";
import react from "file:///Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "node:path";
var __vite_injected_original_dirname = "/Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/packages/shared-ui";
var vite_config_default = defineConfig({
  plugins: [
    react({ jsxRuntime: "classic" }),
    dts({
      insertTypesEntry: true,
      outputDir: "dist"
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "shared-ui",
      formats: ["es", "umd"],
      fileName: (format) => `shared-ui.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYTk5OTk5OTk5OS9jb2RlL2Nhbm5hYmlzX2RlbGl2ZXJ5X3YxL2Rldi9XRUIvY2FubmFiaXMtcGxhdGZvcm0tbW9ub3JlcG8vcGFja2FnZXMvc2hhcmVkLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYTk5OTk5OTk5OS9jb2RlL2Nhbm5hYmlzX2RlbGl2ZXJ5X3YxL2Rldi9XRUIvY2FubmFiaXMtcGxhdGZvcm0tbW9ub3JlcG8vcGFja2FnZXMvc2hhcmVkLXVpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hOTk5OTk5OTk5L2NvZGUvY2FubmFiaXNfZGVsaXZlcnlfdjEvZGV2L1dFQi9jYW5uYWJpcy1wbGF0Zm9ybS1tb25vcmVwby9wYWNrYWdlcy9zaGFyZWQtdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcmVhY3QoeyBqc3hSdW50aW1lOiAnY2xhc3NpYycgfSksXG4gICAgICAgIGR0cyh7XG4gICAgICAgICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLFxuICAgICAgICAgICAgb3V0cHV0RGlyOiAnZGlzdCcsXG4gICAgICAgIH0pLFxuICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgbGliOiB7XG4gICAgICAgICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgICAgICAgbmFtZTogJ3NoYXJlZC11aScsXG4gICAgICAgICAgICBmb3JtYXRzOiBbJ2VzJywgJ3VtZCddLFxuICAgICAgICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBzaGFyZWQtdWkuJHtmb3JtYXR9LmpzYCxcbiAgICAgICAgfSxcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxuICAgICAgICAgICAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFkLFNBQVMsb0JBQW9CO0FBQ2xmLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE1BQU0sRUFBRSxZQUFZLFVBQVUsQ0FBQztBQUFBLElBQy9CLElBQUk7QUFBQSxNQUNBLGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxJQUNmLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxLQUFLO0FBQUEsTUFDRCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDN0MsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVUsQ0FBQyxXQUFXLGFBQWE7QUFBQSxJQUN2QztBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ1gsVUFBVSxDQUFDLFNBQVMsV0FBVztBQUFBLE1BQy9CLFFBQVE7QUFBQSxRQUNKLFNBQVM7QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNqQjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
