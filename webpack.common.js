const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require("autoprefixer");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FlowWebpackPlugin = require('flow-webpack-plugin');

module.exports = {
  entry: './client/src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
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
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
     splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all',
         }
       }
     }
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "client", "src")
    },
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FlowWebpackPlugin({
      failOnError: false,
      failOnErrorWatch: false,
      reportingSeverity: 'error',
      printFlowOutput: true,
      flowPath: require.main.require('flow-bin'),
      flowArgs: ['--color=always'],
      verbose: false,
    }),
    new HtmlWebpackPlugin({
      title: 'hms',
      template:  path.resolve(__dirname, 'client', 'src', 'index.html'),
    }),
    new StylelintPlugin({
      emitError: true
    }),
    new CaseSensitivePathsPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'bundles'),
    publicPath: "/public/assets/bundles",
    filename: '[name].[hash].bundle.js',
    umdNamedDefine: true
  }
};
