// vite.config.ts
import path from "node:path";
import react from "file:///Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/packages/shared-ui";
var vite_config_default = defineConfig({
  plugins: [
    react({ jsxRuntime: "classic" }),
    dts({
      insertTypesEntry: true,
      outputDir: "dist/types",
      copyDtsFiles: true
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYTk5OTk5OTk5OS9jb2RlL2Nhbm5hYmlzX2RlbGl2ZXJ5X3YxL2Rldi9XRUIvY2FubmFiaXMtcGxhdGZvcm0tbW9ub3JlcG8vcGFja2FnZXMvc2hhcmVkLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYTk5OTk5OTk5OS9jb2RlL2Nhbm5hYmlzX2RlbGl2ZXJ5X3YxL2Rldi9XRUIvY2FubmFiaXMtcGxhdGZvcm0tbW9ub3JlcG8vcGFja2FnZXMvc2hhcmVkLXVpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hOTk5OTk5OTk5L2NvZGUvY2FubmFiaXNfZGVsaXZlcnlfdjEvZGV2L1dFQi9jYW5uYWJpcy1wbGF0Zm9ybS1tb25vcmVwby9wYWNrYWdlcy9zaGFyZWQtdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCh7IGpzeFJ1bnRpbWU6ICdjbGFzc2ljJyB9KSxcbiAgICAgICAgZHRzKHtcbiAgICAgICAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXG4gICAgICAgICAgICBvdXRwdXREaXI6ICdkaXN0L3R5cGVzJyxcbiAgICAgICAgICAgIGNvcHlEdHNGaWxlczogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgXSxcbiAgICBidWlsZDoge1xuICAgICAgICBsaWI6IHtcbiAgICAgICAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICAgICAgICBuYW1lOiAnc2hhcmVkLXVpJyxcbiAgICAgICAgICAgIGZvcm1hdHM6IFsnZXMnLCAndW1kJ10sXG4gICAgICAgICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYHNoYXJlZC11aS4ke2Zvcm1hdH0uanNgLFxuICAgICAgICB9LFxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICBleHRlcm5hbDogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVhY3Q6ICdSZWFjdCcsXG4gICAgICAgICAgICAgICAgICAgICdyZWFjdC1kb20nOiAnUmVhY3RET00nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcWQsT0FBTyxVQUFVO0FBRXRlLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFKaEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsTUFBTSxFQUFFLFlBQVksVUFBVSxDQUFDO0FBQUEsSUFDL0IsSUFBSTtBQUFBLE1BQ0Esa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLE1BQ1gsY0FBYztBQUFBLElBQ2xCLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxLQUFLO0FBQUEsTUFDRCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDN0MsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVUsQ0FBQyxXQUFXLGFBQWE7QUFBQSxJQUN2QztBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ1gsVUFBVSxDQUFDLFNBQVMsV0FBVztBQUFBLE1BQy9CLFFBQVE7QUFBQSxRQUNKLFNBQVM7QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNqQjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
