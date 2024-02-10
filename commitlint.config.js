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
				'drive',
				'help',
				'blog',
				'widget',
				'driver-native',
				'ui',
				'native-ui',
				'core',
				'db',
				'main',
				'sms',
				'dispatch',
				'image',
				'payments',
			],
		],
	},
};
