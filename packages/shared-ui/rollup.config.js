import packageJson from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: (format) => `shared-ui.${format}.js`,
            sourcemap: true,
            name: '@cd/shared-ui',
        },
        {
            file: packageJson.module,
            format: (format) => `shared-ui.${format}.js`,
            sourcemap: true,
        },
    ],
    plugins: [],
};
