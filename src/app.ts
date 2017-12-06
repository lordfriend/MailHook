import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as errorHandler from 'errorhandler';
import * as path from 'path';
import * as Raven from 'raven';

import webHookRoute from './routes/web-hook';
import subscribeRoute from './routes/subscribe';
import { configManager } from './utils/config-manager';

Raven.config(configManager.getConfig('sentry_dsn')).install();

const app = express();

app.set('port', process.env.PORT || 9800);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../templates'));

// consider enable this in production
app.disable('etag');

app.use(Raven.requestHandler());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/static', express.static('static'));

app.use('/web-hook', webHookRoute);
app.use('/', subscribeRoute);

app.use(Raven.errorHandler());

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found') as any;
    err.status = 404;
    next(err);
});

app.use(errorHandler());

app.listen(app.get('port'), () => {
    console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});

module.exports = app;