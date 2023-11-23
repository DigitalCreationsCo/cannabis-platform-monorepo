const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

console.log('workspace root ', workspaceRoot);

console.log('workspace modules ', path.resolve(workspaceRoot, 'node_modules'));
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
console.info('prependRegex ', prependRegex(workspaceRoot, [/app/, /tools/]));
