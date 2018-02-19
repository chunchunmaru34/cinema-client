import Config from 'webpack-config';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

export default new Config().merge({
  entry: '/../src/index.js',
  output: {
    path: `${__dirname}/../public`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [precss, autoprefixer],
        context: __dirname,
      },
    }),
  ],
});
