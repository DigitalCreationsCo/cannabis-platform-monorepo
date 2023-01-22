// vite.config.ts
import { defineConfig } from "file:///Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/node_modules/vite/dist/node/index.js";
import react from "file:///Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "node:path";
var __vite_injected_original_dirname = "/Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/packages/shared-ui";
var vite_config_default = defineConfig({
  server: {
    watch: {
      ignored: ["!**/node_modules/@cd/shared-config/**"]
    }
  },
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
      name: "@cd/shared-ui",
      formats: ["es", "cjs"],
      fileName: (format) => `shared-ui.${format}.js`
    },
    rollupOptions: {
      plugins: [],
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ["@cd/shared-config"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYTk5OTk5OTk5OS9jb2RlL2Nhbm5hYmlzX2RlbGl2ZXJ5X3YxL2Rldi9XRUIvY2FubmFiaXMtcGxhdGZvcm0tbW9ub3JlcG8vcGFja2FnZXMvc2hhcmVkLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYTk5OTk5OTk5OS9jb2RlL2Nhbm5hYmlzX2RlbGl2ZXJ5X3YxL2Rldi9XRUIvY2FubmFiaXMtcGxhdGZvcm0tbW9ub3JlcG8vcGFja2FnZXMvc2hhcmVkLXVpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hOTk5OTk5OTk5L2NvZGUvY2FubmFiaXNfZGVsaXZlcnlfdjEvZGV2L1dFQi9jYW5uYWJpcy1wbGF0Zm9ybS1tb25vcmVwby9wYWNrYWdlcy9zaGFyZWQtdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHNlcnZlcjoge1xuICAgICAgICB3YXRjaDoge1xuICAgICAgICAgICAgaWdub3JlZDogWychKiovbm9kZV9tb2R1bGVzL0BjZC9zaGFyZWQtY29uZmlnLyoqJ11cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCh7IGpzeFJ1bnRpbWU6ICdjbGFzc2ljJyB9KSxcbiAgICAgICAgZHRzKHtcbiAgICAgICAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXG4gICAgICAgICAgICBvdXRwdXREaXI6ICdkaXN0JyxcbiAgICAgICAgfSksXG4gICAgXSxcbiAgICBidWlsZDoge1xuICAgICAgICBsaWI6IHtcbiAgICAgICAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICAgICAgICBuYW1lOiAnQGNkL3NoYXJlZC11aScsXG4gICAgICAgICAgICBmb3JtYXRzOiBbJ2VzJywgJ2NqcyddLFxuICAgICAgICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBzaGFyZWQtdWkuJHtmb3JtYXR9LmpzYCxcbiAgICAgICAgfSxcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgICAgIC8vIGluY3JlbWVudGFsKCksXG4gICAgICAgICAgICAgICAgLy8gaW5jcmVtZW50YWwuZml4U05FKCksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZXh0ZXJuYWw6IFsgJ3JlYWN0JywgJ3JlYWN0LWRvbScgXSxcbiAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVhY3Q6ICdSZWFjdCcsXG4gICAgICAgICAgICAgICAgICAgICdyZWFjdC1kb20nOiAnUmVhY3RET00nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy8gcHJlc2VydmVNb2R1bGVzOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgICBleGNsdWRlOiBbJ0BjZC9zaGFyZWQtY29uZmlnJ11cbiAgICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcWQsU0FBUyxvQkFBb0I7QUFDbGYsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsUUFBUTtBQUFBLElBQ0osT0FBTztBQUFBLE1BQ0gsU0FBUyxDQUFDLHVDQUF1QztBQUFBLElBQ3JEO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsTUFBTSxFQUFFLFlBQVksVUFBVSxDQUFDO0FBQUEsSUFDL0IsSUFBSTtBQUFBLE1BQ0Esa0JBQWtCO0FBQUEsTUFDbEIsV0FBVztBQUFBLElBQ2YsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILEtBQUs7QUFBQSxNQUNELE9BQU8sS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUM3QyxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDckIsVUFBVSxDQUFDLFdBQVcsYUFBYTtBQUFBLElBQ3ZDO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDWCxTQUFTLENBR1Q7QUFBQSxNQUNBLFVBQVUsQ0FBRSxTQUFTLFdBQVk7QUFBQSxNQUNqQyxRQUFRO0FBQUEsUUFDSixTQUFTO0FBQUEsVUFDTCxPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsUUFDakI7QUFBQSxNQUVKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNWLFNBQVMsQ0FBQyxtQkFBbUI7QUFBQSxFQUNqQztBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
