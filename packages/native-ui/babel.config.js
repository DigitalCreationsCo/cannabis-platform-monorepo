module.exports = function (config) {
	config.cache(true);

	return {
		presets: ['babel-preset-expo', '@babel/preset-typescript'],
		plugins: ['nativewind/babel'],
	};
};
