const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const port = process.env.PORT || 3000;
const dist = 'public';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(dist, 'index.html'),
      favicon: 'public/icons/favicon.ico'
    }),
    new WebpackPwaManifest({
      name: 'Marvelikes App',
      short_name: 'Marvelikes',
      description: 'This is a side project done while taking the Google Udacity Challenge',
      background_color: '#ffffff'/*,
      icons: [
        {
          src: path.resolve('./public/icons/apple-touch-icon.png'),
          sizes: [60, 76, 120, 152, 180]
        }
      ]*/
    })
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  }
};