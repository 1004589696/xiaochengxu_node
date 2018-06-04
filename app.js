var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/***  权限  ***/
var passport = require('passport');
require('./common/auth');
/***  权限  ***/

/***  过滤器  ***/
var filter = require("./common/filter");
/***  过滤器  ***/

/***  日志  ***/
var log4js = require('./log-config/log-config');
var logger = log4js.getLogger();
/***  日志  ***/

/***  分发路由  ***/
var routes = require('./routes/index');
/***  分发路由  ***/

var app = express();

/*** 跨域 ***/
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, platform_type, x-total-count");
    res.header('Access-Control-Expose-Headers', 'x-total-count');
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    next();
});
/*** 跨域 ***/

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

/***  初始化passport模块 STARRT  ***/
app.use(passport.initialize());
/***  初始化passport模块 END  ***/

/***  日志 STARRT  ***/
log4js.useLogger(app, logger);
/***  日志 END  ***/

/***  实现分发路由模块2 STARRT  ***/
app.use(filter);
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
