const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: './client/src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: `css-loader`,
              options: {
                sourceMap: true
              }
           },
          {
            loader: `postcss-loader`,
              options: {
                options: {},
                plugins: () => [autoprefixer()],
                sourceMap: true
              }
           },
           {
            loader: `sass-loader`,
              options: {
                sourceMap: true
              }
           },
           "import-glob-loader"
        ],
      }
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "client", "src")
    },
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'hms',
      template: './client/src/index.html',
    }),
    new StylelintPlugin({
      emitError: true
      // failOnError: true
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: path.resolve(__dirname, 'dist'),
    filename: 'bundle_[hash].js',
  },
};
