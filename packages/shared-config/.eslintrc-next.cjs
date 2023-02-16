module.exports = {
    extends: [
        "../../packages/shared-config/.eslintrc-react.cjs",
        'next',
        "next/core-web-vitals",
    ],
    settings: {
        next: {
            rootDir: "../../apps/*",
        },
    }
};
