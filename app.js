var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/***  日志 STARRT  ***/
var log4js = require('./log-config/log-config');
var logger = log4js.getLogger()
/***  日志 STARRT  ***/

/***  实现分发路由模块2 STARRT  ***/
var routes = require('./routes/index');
/***  实现分发路由模块2 STARRT  ***/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/***  日志 STARRT  ***/
log4js.useLogger(app,logger);
/***  日志 END  ***/

/***  实现分发路由模块2 STARRT  ***/
routes(app);
/***  实现分发路由模块2 END  ***/


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
