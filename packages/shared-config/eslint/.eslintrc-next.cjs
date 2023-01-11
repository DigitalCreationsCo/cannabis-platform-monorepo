module.exports = {
    settings: { 
    next: {
      rootDir: "../**/apps/*",
    },
  },
    extends: [
        "../../packages/shared-config/eslint/.eslintrc-react.cjs",
        'eslint-config-next',
    ],
};
