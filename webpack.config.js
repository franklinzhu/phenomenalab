var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// var extractPlugin = new ExtractTextPlugin({
//   filename: 'dist/main.css'
// });

module.exports = {
	mode: 'development',
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devtool: 'inline-source-map', //dev
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			// {
			//   test: /\.css$/,
			//   use: extractPlugin.extract({
			//     use: ["style-loader"]
			//   })
			// },
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'static/imgs',
							publicPath: 'static/imgs'
						}
					}
				]
			},
			{
				test: /\.(wav|mp3)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'static/sounds',
							publicPath: 'static/sounds'
						}
					}
				]
			}
		]
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src'),
			'three/OrbitControls': path.join(
				__dirname,
				'node_modules/three/examples/js/controls/OrbitControls.js'
			)
		}
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			THREE: 'three',
			TweenMax: 'gsap'
		}),
		//extractPlugin,
		//new UglifyJsPlugin(), //production
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new CleanWebpackPlugin(['dist'])
	],
	watch: true
};
