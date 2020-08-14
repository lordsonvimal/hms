const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
var path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env.development',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    overlay: true,
    hot: true,
    port: 3000,
    writeToDisk: true
  },
};
