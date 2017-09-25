/**
 * Created by Administrator on 2017/7/31.
 */

var mongoose = require('mongoose'),
    DB_URL = 'mongodb://127.0.0.1:27017/node';

var db = {};
/**
 * 连接
 */
db.node = mongoose.createConnection(DB_URL,{ useMongoClient: true });


/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

exports = module.exports = db;