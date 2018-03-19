var path = require("path");
var webpack = require("webpack");
var UglifyJsPlugin  = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/imgs",
              publicPath: "assets/imgs"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      THREE: "three",
      TweenMax: "gsap"
    }),
    //new UglifyJsPlugin(),    //production
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CleanWebpackPlugin(["dist"])
  ],
  watch: true
};
