var webpack = require('webpack');
var path = require('path');

const webpackConfig = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './exports'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': '"' + process.env.NODE_ENV + '"'}
    })
  ]
};

module.exports = webpackConfig;
