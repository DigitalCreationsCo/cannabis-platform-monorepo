const path = require('path');
module.exports = function (api) {
	api.cache(true);
	const nodeEnv = process.env.NODE_ENV || 'development';
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			'expo-router/babel',
			[
				'module:react-native-dotenv',
				{
					envName: 'NODE_ENV',
					moduleName: '@env',
					blocklist: null,
					allowlist: null,
					safe: false,
					allowUndefined: true,
					verbose: false,
					path: path.resolve(__dirname, '../../.env.' + nodeEnv),
				},
			],
			[
				'module-resolver',
				{
					alias: {
						crypto: 'crypto-js',
						'@components': './components',
						'@views': './views',
						'@styles': './styles',
						'@constants': './constants',
					},
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			],
		],
	};
};
