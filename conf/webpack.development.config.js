import Config from 'webpack-config';
import webpack from 'webpack';

export default new Config().extend('conf/webpack.base.config.js').merge({
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    `${__dirname}/../src/index.js`,
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.(scss|css?)$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
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
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
