var express = require('express');
var router = express.Router();
var Interlocution = require("../mongoose/schema/interlocution");
var CONNECT = require('../common/connect');
var passport = require('passport');


/**
 * 实现问题添加 /api/interlocution/add
 */
router.post('/add', passport.authenticate('bearer', {session: false}), function (req, res, next) {
    var reqData = req.body;
    CONNECT.insertOne(Interlocution, res, reqData, function (result) {
        res.json({
            code: '0',
            result: result
        });
    });
});


/**
 * 实现问题编辑 /api/interlocution/edit?interlocutionId=${interlocutionId}
 */
router.post('/edit', function (req, res, next) {
    var interlocutionId = req.query.interlocutionId;
    var reqData = req.body;
    CONNECT.updateOne(Interlocution, res, {_id: interlocutionId}, reqData, function (result) {
        res.json({
            code: '0',
            result: result
        });
    });
});


/**
 * 实现问题删除  /api/interlocution/deleteone/${interlocutionId}
 */
router.delete('/deleteone/:interlocutionId', function (req, res, next) {
    var interlocutionId = req.params.interlocutionId;
    CONNECT.deleteOne(Interlocution, res, {_id: interlocutionId}, function (result) {
        res.json({
            code: '0',
            result: result
        });
    });
});


/**
 * 实现问题查找  /api/interlocution/findone/${interlocutionId}
 */
router.get('/findone/:interlocutionId', function (req, res, next) {
    var interlocutionId = req.params.interlocutionId;
    CONNECT.findOne(Interlocution, res, {_id: interlocutionId}, function (result) {
        res.json({
            code: '0',
            result: result
        });
    });
});


/**
 * 实现问题列表查找  /api/interlocution/findone/${interlocutionId}
 */
router.get('/findlist', function (req, res, next) {
    var interlocutionId = req.query.interlocutionId;
    var questionName = req.query.questionName;
    var questionLevel = req.query.questionLevel;
    var questionType = req.query.questionType;
    var page = req.query.page || 0;
    var size = req.query.size || 100;
    var conditions = {};
    interlocutionId && (conditions._id = interlocutionId);
    questionName && (conditions.questionName = questionName);
    questionLevel && (conditions.questionLevel = questionLevel);
    questionType && (conditions.questionType = questionType);

    CONNECT.find(Interlocution, res, conditions, function (result) {
        res.json({
            code: '0',
            result: result
        });
    }, page, size);
});

module.exports = router;