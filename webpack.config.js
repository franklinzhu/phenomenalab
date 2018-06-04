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
	//devtool: 'inline-source-map', //dev
	module: {
		rules: [
			// {
			//   test: /\.css$/,
			//   use: ['style-loader', 'css-loader']
			// },
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader']
				})
			},
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
				test: /\.obj$/,
<<<<<<< HEAD
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'static/models',
							publicPath: 'static/models'
						}
					}
				]
			},
			{
				test: /\.mp3$/,
=======
>>>>>>> a6ab4421a55484c5149b44201d646024f2110086
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
<<<<<<< HEAD
=======
							outputPath: 'static/models',
							publicPath: 'static/models'
						}
					}
				]
			},
			{
				test: /\.mp3$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
>>>>>>> a6ab4421a55484c5149b44201d646024f2110086
							outputPath: 'static/audio',
							publicPath: 'static/audio'
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
			),
			'three/DeviceOrientationControls': path.join(
				__dirname,
				'node_modules/three/examples/js/controls/DeviceOrientationControls.js'
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
		new ExtractTextPlugin({
			filename: 'main.css'
		}),
		new UglifyJsPlugin(), //production
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new CleanWebpackPlugin(['dist'])
	],
	watch: true
};
