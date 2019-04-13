/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',

  output: {
    filename: '[name].[hash].js',
    publicPath: '/',
    path: __dirname + '/dist',
  },

  plugins: [
    new HtmlPlugin({
      template: './public/index.html',
      BASE_URL: '/',
    }),
    new CopyPlugin([
      {
        from: __dirname + '/node_modules/animate.css/animate.min.css',
        to: __dirname + '/dist/animate.min.css',
        toType: 'file',
      },
      {
        from: __dirname + '/public',
        to: __dirname + '/dist',
        toType: 'dir',
        ignore: ['.DS_Store'],
      },
    ]),
  ],

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    hot: true,
    open: true,
    proxy: {
      '/sso/callback': {
        target: 'http://127.0.0.1:5555',
      },
      '/meta/api/web': {
        target: 'http://127.0.0.1:5555',
      },
    },
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64:5]',
              camelCase: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'primary-color': '#037AFF',
                'link-color': '#037AFF',
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
    ],
  },
}
