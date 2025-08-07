const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: './dist',
    },
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true,
    allowedHosts: 'all',
    host: '0.0.0.0',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});