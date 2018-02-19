import express from 'express';
const app = express();
import { PORT, isDev } from './conf/server-config';
const PUBLIC_PATH = __dirname + '/public';

if (isDev) {
    const webpack = require('webpack');
    const config = require('./webpack.config.babel').default;
    const compiler = webpack(config);
    const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
        hot: true,
        stats: {
            colors: true
        }
    });
    const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddleware)
}

else {
    app.use(express.static(PUBLIC_PATH));
}

app.all("*", (req, res) => {
    res.sendFile(PUBLIC_PATH + "/index.html")
});

app.listen(PORT, () => {
    console.log("Starting app on port " + PORT);
});