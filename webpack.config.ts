import path from 'path';

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'server.ts'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		fallback: {
			path: require.resolve('path-browserify'),
			os: require.resolve('os-browserify/browser'),
			crypto: require.resolve('crypto-browserify'),
			http: require.resolve('stream-http'),
			url: require.resolve('url/'),
			buffer: require.resolve('buffer/'),
			stream: require.resolve('stream-browserify'),
			util: require.resolve('util/')
		}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	}
};
