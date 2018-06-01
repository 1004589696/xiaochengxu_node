var express = require('express');
var router = express.Router();
var LucyDrawItem = require("../mongoose/schema/lucydraw");
var LucyDraw = LucyDrawItem.LucyDraw;
var LucyDrawRecord = LucyDrawItem.LucyDrawRecord;
var CONNECT = require('../common/connect');
var passport = require('passport');


/**
 * 实现新建抽奖
 */
router.post('/add', passport.authenticate('bearer', {session: false}), function (req, res, next) {
    var reqData = req.body;
    CONNECT.insertOne(LucyDraw, res, reqData, function (result) {
        res.json({
            code: '0',
            result: result
        });
    });
});


/**
 * 抽奖编辑
 */
router.put('/lucydraw/:id', passport.authenticate('bearer', {session: false}), function (req, res, next) {
    var id = req.params.id;
    var reqData = req.body;
    CONNECT.updateOne(LucyDraw, res, {_id: id}, reqData, function (result) {
        res.json({
            code: '0',
            result: result
        });
    });
});


/**
 * 实现抽奖删除
 */
router.delete('/deleteone/:id', passport.authenticate('bearer', {session: false}), function (req, res, next) {
    var id = req.params.id;
    CONNECT.deleteOne(LucyDraw, res, {_id: id}, function (result) {
        res.json({
            code: '0',
            result: result
        });
    });
});


/**
 * 实现问题查找  /api/interlocution/findone/${interlocutionId}
 */
router.get('/findone/:id', passport.authenticate('bearer', {session: false}), function (req, res, next) {
    var id = req.params.id;
    CONNECT.findOne(LucyDraw, res, {_id: id}, function (result) {
        res.json({
            code: '0',
            result: result
        });
    });
});


/**
 * 实现抽奖列表
 */
router.get('/list', passport.authenticate('bearer', {session: false}), function (req, res, next) {
    var page = req.query.page || 0;
    var size = req.query.size || 100;
    CONNECT.find(LucyDraw, res, {}, function (result) {
        res.json({
            code: '0',
            result: result
        });
    }, page, size);
});


/**
 * 抽奖上下架
 */
router.put('/effect/:id', passport.authenticate('bearer', {session: false}), function (req, res, next) {
    var id = req.params.id;
    CONNECT.updateOne(LucyDraw, res, {_id: id}, reqData, function (result) {
        res.json({
            code: '0',
            result: result
        });
    });
});
