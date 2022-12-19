// vite.config.ts
import { defineConfig } from "file:///Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/node_modules/vite/dist/node/index.js";
import react from "file:///Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "node:path";
import incremental from "file:///Users/a999999999/code/cannabis_delivery_v1/dev/WEB/cannabis-platform-monorepo/node_modules/@mprt/rollup-plugin-incremental/src/index.js";
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
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: false,
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "@cd/shared-ui",
      formats: ["es", "cjs"],
      fileName: (format) => `shared-ui.${format}.js`
    },
    rollupOptions: {
      plugins: [
        incremental(),
        incremental.fixSNE()
      ],
      treeshake: false,
      external: ["react", "react-dom"],
      input: path.resolve(__vite_injected_original_dirname, "src"),
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        },
        dir: "dist",
        format: "esm",
        preserveModules: true,
        preserveModulesRoot: "src",
        minifyInternalExports: false,
        inlineDynamicImports: false
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYTk5OTk5OTk5OS9jb2RlL2Nhbm5hYmlzX2RlbGl2ZXJ5X3YxL2Rldi9XRUIvY2FubmFiaXMtcGxhdGZvcm0tbW9ub3JlcG8vcGFja2FnZXMvc2hhcmVkLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYTk5OTk5OTk5OS9jb2RlL2Nhbm5hYmlzX2RlbGl2ZXJ5X3YxL2Rldi9XRUIvY2FubmFiaXMtcGxhdGZvcm0tbW9ub3JlcG8vcGFja2FnZXMvc2hhcmVkLXVpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hOTk5OTk5OTk5L2NvZGUvY2FubmFiaXNfZGVsaXZlcnlfdjEvZGV2L1dFQi9jYW5uYWJpcy1wbGF0Zm9ybS1tb25vcmVwby9wYWNrYWdlcy9zaGFyZWQtdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IGluY3JlbWVudGFsIGZyb20gXCJAbXBydC9yb2xsdXAtcGx1Z2luLWluY3JlbWVudGFsXCJcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHJlYWN0KHsganN4UnVudGltZTogJ2NsYXNzaWMnIH0pLFxuICAgICAgICBkdHMoe1xuICAgICAgICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcbiAgICAgICAgICAgIG91dHB1dERpcjogJ2Rpc3QnLFxuICAgICAgICB9KSxcbiAgICBdLFxuICAgIGJ1aWxkOiB7XG4gICAgICAgIG91dERpcjogJ2Rpc3QnLFxuICAgICAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICAgICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgICAgICBtaW5pZnk6IGZhbHNlLFxuICAgICAgICBsaWI6IHtcbiAgICAgICAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICAgICAgICBuYW1lOiAnQGNkL3NoYXJlZC11aScsXG4gICAgICAgICAgICBmb3JtYXRzOiBbJ2VzJywgJ2NqcyddLFxuICAgICAgICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBzaGFyZWQtdWkuJHtmb3JtYXR9LmpzYCxcbiAgICAgICAgfSxcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgICAgIGluY3JlbWVudGFsKCksXG4gICAgICAgICAgICAgICAgaW5jcmVtZW50YWwuZml4U05FKCksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgdHJlZXNoYWtlOiBmYWxzZSxcbiAgICAgICAgICAgIGV4dGVybmFsOiBbICdyZWFjdCcsICdyZWFjdC1kb20nIF0sXG4gICAgICAgICAgICBpbnB1dDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksXG4gICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxuICAgICAgICAgICAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGRpcjogJ2Rpc3QnLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogJ2VzbScsXG4gICAgICAgICAgICAgICAgLy9BVFRFTlRJT046IHByZXNlcnZlTW9kdWxlcyBtdXN0IGJlIGVuYWJsZWQhXG4gICAgICAgICAgICAgICAgcHJlc2VydmVNb2R1bGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHByZXNlcnZlTW9kdWxlc1Jvb3Q6ICdzcmMnLFxuICAgICAgICAgICAgICAgIC8vQVRURU5USU9OOiBtaW5pZnlJbnRlcm5hbEV4cG9ydHMgbXVzdCBiZSBkaXNhYmxlZCFcbiAgICAgICAgICAgICAgICBtaW5pZnlJbnRlcm5hbEV4cG9ydHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGlubGluZUR5bmFtaWNJbXBvcnRzOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxZCxTQUFTLG9CQUFvQjtBQUNsZixPQUFPLFdBQVc7QUFDbEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGlCQUFpQjtBQUp4QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxNQUFNLEVBQUUsWUFBWSxVQUFVLENBQUM7QUFBQSxJQUMvQixJQUFJO0FBQUEsTUFDQSxrQkFBa0I7QUFBQSxNQUNsQixXQUFXO0FBQUEsSUFDZixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2IsY0FBYztBQUFBLElBQ2QsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLE1BQ0QsT0FBTyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQzdDLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUNyQixVQUFVLENBQUMsV0FBVyxhQUFhO0FBQUEsSUFDdkM7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNYLFNBQVM7QUFBQSxRQUNMLFlBQVk7QUFBQSxRQUNaLFlBQVksT0FBTztBQUFBLE1BQ3ZCO0FBQUEsTUFDQSxXQUFXO0FBQUEsTUFDWCxVQUFVLENBQUUsU0FBUyxXQUFZO0FBQUEsTUFDakMsT0FBTyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ3BDLFFBQVE7QUFBQSxRQUNKLFNBQVM7QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNqQjtBQUFBLFFBQ0EsS0FBSztBQUFBLFFBQ0wsUUFBUTtBQUFBLFFBRVIsaUJBQWlCO0FBQUEsUUFDakIscUJBQXFCO0FBQUEsUUFFckIsdUJBQXVCO0FBQUEsUUFDdkIsc0JBQXNCO0FBQUEsTUFDMUI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
