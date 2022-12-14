const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require("./package.json");

module.exports = {
	entry: "./src/index.ts",
	devtool: "eval-source-map",
	resolve: {
		extensions: ['.js', '.ts', '.tsx']
	},
	devServer: {
		port: 8084
	},
	mode: 'development',
	module: {
		rules: [{
			test: /\.tsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.(scss)$/,
			use: [{
				loader: 'style-loader', // inject CSS to page
			}, {
				loader: 'css-loader', // translates CSS into CommonJS modules
			}, {
				loader: 'postcss-loader', // Run post css actions
				options: {
					postcssOptions: {
						plugins: function () { // post css plugins, can be exported to postcss.config.js
							return [
								require('autoprefixer')
							];
						}
					}
				}
			}, {
				loader: 'sass-loader' // compiles Sass to CSS
			}]
		}, {
			test: /\.svg$/i,
			type: 'asset',
			resourceQuery: /url/, // *.svg?url
		}, {
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
			use: ['@svgr/webpack'],
		},]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new ModuleFederationPlugin({
			name: 'cart',
			filename: 'remoteEntry.js',
			exposes: {
				'./CartPage': './src/App'
			},
			shared: {
				...dependencies,
				react: { singleton: true, eager: true, requiredVersion: dependencies.react },
				"react-dom": {
					singleton: true,
					eager: true,
					requiredVersion: dependencies["react-dom"],
				},
				"react-router-dom": {
					singleton: true,
					eager: true,
					requiredVersion: dependencies["react-router-dom"],
				},
			}
		})
	]
}