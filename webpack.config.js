const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
                postcssOptions: {
                  plugins: ["autoprefixer"],
                },
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
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        loader: 'file-loader',
        options: {
          include:  path.resolve(__dirname, "client", "src"),
          name: "[name].[ext]"
        }
      },
    ],
  },
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, "tmp", "cache", "webpack"),
    buildDependencies: {
        config: [ __filename ] // you may omit this when your CLI automatically adds it
    }
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
        },
      },
      chunks: 'all',
      name: false
    },
    usedExports: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "client", "src")
    },
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new FlowWebpackPlugin({
    //   failOnError: false,
    //   failOnErrorWatch: false,
    //   reportingSeverity: 'error',
    //   printFlowOutput: true,
    //   flowPath: require.main.require('flow-bin'),
    //   flowArgs: ['--color=always'],
    //   verbose: false,
    // }),
    new HtmlWebpackPlugin({
      favicon: "./client/src/images/favicon.ico",
      filename: "index.html",
      template: path.resolve(__dirname, 'client', 'src', 'index.html'),
      title: 'hms'
    }),
    new StylelintPlugin({ emitError: true })
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'bundles'),
    pathinfo: false,
    // publicPath: "/public/assets/bundles",
    // publicPath: "/",
    filename: '[name].[contenthash].js',
    pathinfo: false
    // umdNamedDefine: true
  },
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
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
  }
};
