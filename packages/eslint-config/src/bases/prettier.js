const { getPrettierConfig } = require('../helpers');
const { ...prettierConfig } = getPrettierConfig();

module.exports = {
	extends: ['prettier'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': ['warn', prettierConfig],
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off',
	},
};
