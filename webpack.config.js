const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var paths = {
  src: "./views/src",
  output: "./views/public"
}

module.exports = {
    //页面入口文件配置
  context: path.resolve(__dirname, paths.src),
  entry: {
    app : './js/app.js'
  },
  //入口文件输出配置
  output: {
    path: path.resolve(__dirname, paths.output),
    filename: './dist/js/[name].js'
  },
  module: {
    //加载器配置
    loaders: [
      { test:/\.css$/, 
        loader: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      { test: /\.vue$/, loader: 'vue-loader'},
      { test: /\.js$/, 
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }], 
      },
      { test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  plugins: [
    new ExtractTextPlugin("./dist/css/app.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: './dist/js/vendor.js',
      minChunks: 2,
    }),
    new HtmlWebpackPlugin(
      {
        template: path.resolve(__dirname, './views/src/index.html')
      }
    )
  ]
};