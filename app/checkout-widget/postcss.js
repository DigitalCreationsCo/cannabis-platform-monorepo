// dependencies
var fs = require('fs');
var postcss = require('postcss');
var imports = require('postcss-import');
var namespace = require('postcss-namespace');
var tailwindcss = require('tailwindcss');
var autoprefixer = require('autoprefixer');
var pluginNamespace = require('postcss-plugin-namespace');

// css to be processed
var css = fs.readFileSync('./src/styles/globals.css', 'utf8');

// process css
var output = postcss([
	pluginNamespace('#gras-widget-root'),
	imports(),
	namespace({ token: ' .' }),
	tailwindcss(),
	autoprefixer(),
])
	.process(css, { from: './src/styles/globals.css', to: './dist/index.css' })
	.then((result) => {
		fs.writeFile('dist/index.css', result.css, () => true);
		if (result.map) {
			fs.writeFile(
				'dist/index.css.map',
				result.map.toString(),
				() => true
			);
		}
	});
