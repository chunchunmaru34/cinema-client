import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend('conf/webpack.base.config.js').merge({
  output: {
    filename: 'bundle.min.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.?global.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /^((?!\.?global).)*(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[local]__[hash:base64:5]',
              minimize: false,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    })],
});
