const {resolve} = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ApplySay = require('./plugins/ApplySay');
const FileListPlugin = require('./plugins/FileListPlugin');
module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js'
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'] 
        }
      },
    }]
  },
  plugins: [new CleanWebpackPlugin(), new ApplySay(), 
    new FileListPlugin(
    {filename: 'new-file-list.md'}
    )
  ]
}