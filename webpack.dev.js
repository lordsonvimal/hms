const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

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
    contentBase: "./public/assets/bundles",
    inline: true,
    compress: true,
    overlay: true,
    hot: true,
    host: "0.0.0.0",
    port: 8080,
    writeToDisk: true,
    proxy: {
      '/api': {
          target: 'http://localhost:3001'
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
};
