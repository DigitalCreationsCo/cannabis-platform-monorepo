// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(workspaceRoot);

// const appDependencyPackages = {};
// config.watchFolders = [projectRoot, ...Object.values(appDependencyPackages)];

config.watchFolders = [workspaceRoot];

// config.resolver.extraNodeModules = appDependencyPackages;

config.resolver.nodeModulesPaths = [
	path.resolve(projectRoot, 'node_modules'),
	path.resolve(workspaceRoot, 'node_modules'),
];

config.resolver.disableHierarchicalLookup = true;

// module.exports = config;
