import express from 'express';

const app = express();


const PORT = 3000;
const PUBLIC_PATH = `${__dirname}/public`;

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  const webpack = require('webpack');
  const config = require('./webpack.config.babel').default;
  const compiler = webpack(config);
  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    hot: true,
    stats: {
      colors: true,
    },
  });
  const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);
} else {
  app.use(express.static(PUBLIC_PATH));
}

app.all('*', (req, res) => {
  res.sendFile(`${PUBLIC_PATH}/index.html`);
});

app.listen(PORT, () => {
  console.log(`Starting app on port ${PORT}`);
});
