const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports ={
  entry: './src/code.ts',
  // devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [ autoprefixer({ browsers: ['ie >= 8', 'last 4 version'] }) ]
          }
        },
        { loader: 'sass-loader' }
      ]
    }]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.tsx' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};