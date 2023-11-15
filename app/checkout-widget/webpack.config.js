const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const CopyPlugin = require('copy-webpack-plugin');
const { expand } = require('dotenv-expand');
const JavaScriptObfuscator = require('webpack-obfuscator');

const publicDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, '/deploy/dist');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = process.env.NODE_ENV === 'production';
expand(dotenv.config({ path: `../../.env.${nodeEnv}` }));

const defaultConfig = {
	mode: process.env.NODE_ENV || 'development',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(process.env),
		}),
		new CopyPlugin({
			patterns: [
				{
					from: 'public',
					to: '.',
				},
			],
		}),
		// isProd ? new JavaScriptObfuscator() : null,
	].filter((i) => i),
	devServer: {
		static: publicDir,
		port: 9001,
		headers: {
			'Access-Control-Allow-Origin': '*',
			// for testing only, in production add the host server
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: ['ts-loader'],
			},
			{
				test: /\.(scss|css)$/,
				use: [
					// devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'style-loader',
					'css-loader',
					// 'cssimportant-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								ident: 'postcss',
								plugins: [['postcss-preset-env']],
								// sourceMap: nodeEnv === 'development',
							},
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
		plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
	},
};

module.exports = {
	...defaultConfig,
	entry: {
		widget: './src/outputs/gras-delivery-widget.ts',
		bookmarklet: './src/outputs/bookmarklet.ts',
	},
	output: {
		path: distDir,
		filename: '[name].js',
		assetModuleFilename: 'img/[chunkhash][ext][query]',
		library: 'GrasDeliveryWidget',
		libraryExport: 'default',
		libraryTarget: 'window',
		publicPath: 'http://localhost:9001/',
	},
	devtool: 'source-map',
};
