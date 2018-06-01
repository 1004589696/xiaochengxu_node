/**
 * 实现分发路由模块
 */
module.exports = function (app) {
    var user = require('./user');
    var interlocution = require('./interlocution');

    app.use('/api/user', user);
    app.use('/api/interlocution', interlocution);
};
