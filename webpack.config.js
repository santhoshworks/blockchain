const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({ template: 'index.html' });
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'development' || 'true'))
});

const stylesheetsLoaders = [
  { loader: 'style-loader' },
  { loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: '[path]-[local]-[hash:base64:3]',
      sourceMap: true
    }
  }
];

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index',
  output: {
    filename: '[hash].js',
  },
  devtool: 'source-map',
  plugins: [htmlWebpackPlugin, definePlugin],
  resolve: {
    modules: ['node_modules', path.join(__dirname, 'src')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      }, {
        test: /\.css$/,
        use: stylesheetsLoaders
      }, {
        test: /\.scss$/,
        use: [...stylesheetsLoaders, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      }, {
        test: /\.sass$/,
        use: [...stylesheetsLoaders, {
          loader: 'sass-loader',
          options: {
            indentedSyntax: 'sass',
            sourceMap: true
          }
        }]
      }, {
        test: /\.less$/,
        use: [...stylesheetsLoaders, {
          loader: 'less-loader',
          options: {
            sourceMap: true
          }
        }]
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api*': 'http://localhost:8181'
    }
  }
};
