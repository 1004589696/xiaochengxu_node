var log4js = require('log4js');

log4js.configure({
    replaceConsole: true,
    appenders: {
        stdout: {//控制台输出
            type: 'stdout'
        },
        req: {//请求日志
            type: 'dateFile',
            filename: '../xiaochengxu_node_logs/reqlog/',
            pattern: 'req-yyyy-MM-dd.log',
            encoding: 'utf-8',
            alwaysIncludePattern: true
        },
        err: {//错误日志
            type: 'dateFile',
            filename: '../xiaochengxu_node_logs/errlog/',
            pattern: 'err-yyyy-MM-dd.log',
            encoding: 'utf-8',
            alwaysIncludePattern: true
        },
        oth: {//其他日志
            type: 'dateFile',
            filename: '../xiaochengxu_node_logs/othlog/',
            pattern: 'oth-yyyy-MM-dd.log',
            encoding: 'utf-8',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {appenders: ['stdout', 'req'], level: 'debug'},
        err: {appenders: ['stdout', 'err'], level: 'error'},
        oth: {appenders: ['stdout', 'oth'], level: 'info'}
    }
});

exports.getLogger = function (name) {
    return log4js.getLogger(name || 'default')
};

exports.useLogger = function (app, logger) {
    app.use(log4js.connectLogger(logger || log4js.getLogger('default'), {
        format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'
    }))
};