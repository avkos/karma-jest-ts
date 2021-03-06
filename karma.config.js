const path = require('path');

const outputPath = path.join(__dirname, '_karma_webpack_');

const webpackConfig = {
	mode: 'development',
	output: {
		path: outputPath,
	},
	stats: {
		modules: false,
		colors: true,
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: [/node_modules/],
			},
		],
	},
	externals: {
		fs: 'commonjs fs',
		path: 'commonjs path',
		net: 'commonjs net',
	},

	resolve: {
		extensions: ['.ts', '.js'],
		modules: [
			path.join(__dirname, 'node_modules'),
		],
	},
	watch: false,
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			minSize: 0,
			cacheGroups: {
				commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: 1,
				},
			},
		},
	},
};
module.exports = function (config) {
	config.set({
		frameworks: ['webpack', 'jasmine'],
		plugins: [
			'karma-webpack',
			'karma-jasmine',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
		],
		browsers: [
			'ChromeHeadless',
			'FirefoxHeadless',
		],
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		singleRun: true,
		port: 9876,
		concurrency: 10,
		files: [
			path.join('.','karma.setup.js'),
			path.join('test','*.test.ts')
		],
		preprocessors: {
			[path.join('.','karma.setup.js')]: ['webpack'],
			[path.join('test','*.test.ts')]: ['webpack'],
		},
		webpack: webpackConfig,
	});
};
