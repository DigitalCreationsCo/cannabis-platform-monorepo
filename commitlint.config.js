module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'scope-enum': [
			2,
			'always',
			[
				'terraform',
				'cluster',
				'dashboard',
				'shop',
				'help',
				'blog',
				'widget',
				'drive',
				'ui',
				'native-ui',
				'core',
				'db',
				'main',
				'location',
				'dispatch',
				'image',
				'payments',
			],
		],
	},
};
