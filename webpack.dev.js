const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env.development',
    }),
  ],
  devServer: {
    compress: false,
    contentBase: "./public/assets/bundles",
    historyApiFallback: true,
    inline: true,
    hot: true,
    host: "0.0.0.0",
    writeToDisk: true,
    overlay: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3001'
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  watch: true
};
