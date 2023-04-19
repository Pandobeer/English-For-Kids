const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new ESLintPlugin({
      quiet: true,
      failOnError: false,
      failOnWarning: false,
      emitError: false,
      emitWarning: false
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(svg|eot|woff|ttf|woff2|png|mp3|wav)$/i,

        type: 'asset/resource',
      },

      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      {
        test: /\.html$/i,
        use: ['html-loader'],
      },

    ],
  },
};
