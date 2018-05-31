/**
 * 实现分发路由模块
 */
module.exports = function (app) {
    var interlocution = require('./interlocution');

    app.use('/api/interlocution', interlocution);
};
