import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import eslint from 'vite-plugin-eslint';
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({jsxRuntime: "classic"}),
    dts({
      insertTypesEntry: true,
      outputDir: "dist/types"
    }),
    eslint({
      include: [ "src/**/*.{js,ts,jsx,tsx}", "./*.js" ],
      exclude: [ "node_modules/**", "dist/**", ".turbo/**", "public/**" ],
      failOnWarning: false,
      failOnError: false,
      fix: true
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'shared-ui',
      formats: ['es', 'umd'],
      fileName: (format) => `shared-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        }
      }
    }
  },
})
