var namespace = require('postcss-selector-namespace');
var imports = require('postcss-import');
var tailwindcss = require('tailwindcss');
var autoprefixer = require('autoprefixer');

module.exports = {
	plugins: [
		namespace({
			namespace: '#gras-delivery-widget',
			selfSelector: /(html|:root)/,
		}),
		imports(),
		tailwindcss(),
		autoprefixer(),
	],
};
