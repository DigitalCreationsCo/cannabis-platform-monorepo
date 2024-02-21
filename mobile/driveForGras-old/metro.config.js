const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const __projectRoot = __dirname;
const __workspaceRoot = path.resolve(__projectRoot, '../..');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__projectRoot);

config.watchFolders = [__workspaceRoot];

config.resolver.nodeModulesPaths = [
	path.resolve(__workspaceRoot, 'node_modules'),
];

config.resolver.blockList = [prependRegex(__workspaceRoot, [/app/, /tools/])];

module.exports = config;

function prependRegex(string, regexes) {
	return new RegExp(
		regexes
			.map(
				(regex) =>
					'(' +
					path.resolve(string, regex.source.replace(/\//g, path.sep)) +
					')',
			)
			.join('|'),
	);
}
