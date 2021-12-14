const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const SDK_VERSION = '0.1.0';

const devConfig = {
	devtool: 'inline-source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		compress: true,
		port: 4000,
	},
};

const prodConfig = {
	output: {
		filename: `racing-sdk_${SDK_VERSION}.js`,
		path: path.resolve(__dirname, 'dist'),
	},
};

module.exports = (env, args) => {
	const mode = args.mode || 'development';

	const isDevelopment = mode === 'development';

	const configByEnv = isDevelopment ? devConfig : prodConfig;

	const config = {
		mode,

		entry: path.resolve(__dirname, 'src'),

		output: {
			filename: 'sdk.js',
			path: path.resolve(__dirname, 'dist'),
		},

		resolve: {
			extensions: ['.ts', '.js', '.json'],
		},

		module: {
			rules: [{ test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/ }],
		},

		plugins: [new ForkTsCheckerWebpackPlugin()],
	};

	return Object.assign(config, configByEnv);
};
