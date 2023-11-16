// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const getWorkspaces = require('get-yarn-workspaces');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
const workspaces = getWorkspaces(projectRoot);

const config = getDefaultConfig(projectRoot);

// const appDependencyPackages = {};
// config.watchFolders = [projectRoot, ...Object.values(appDependencyPackages)];

// config.watchFolders = [workspaceRoot];
const watchFolders = [
	path.resolve(projectRoot, 'node_modules'),
	path.resolve(workspaceRoot, 'node_modules'),
	
    ...workspaces.filter(
      workspaceDir => !(workspaceDir === projectRoot),
    ),
  ];
// config.resolver.extraNodeModules = appDependencyPackages;

config.resolver.nodeModulesPaths = [
	// path.resolve(projectRoot, 'node_modules'),
	path.resolve(workspaceRoot, 'node_modules'),
];
config.resolver.blockList = [prependRegex(workspaceRoot, [/app/, /tools/])]; //exclusionList()
config.resolver.disableHierarchicalLookup = true;

module.exports = config;

function prependRegex(string, regexes) {
	return new RegExp(
	regexes
		.map((regex) => "(" + path.resolve(string, regex.source.replace(/\//g, path.sep)) + ")")
		.join("|")
	);
}