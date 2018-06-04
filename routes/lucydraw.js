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
router.post('/add', function (req, res, next) {
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
router.put('/edit/:id', function (req, res, next) {
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
 * 抽奖上下架
 */
router.put('/effect/:id', function (req, res, next) {
    var id = req.params.id;
    var effect = req.body.effect;
    CONNECT.updateOne(LucyDraw, res, {_id: id}, {effect: effect}, function (result) {
        res.json({
            code: '0',
            result: result
        });
    });
});


/**
 * 实现抽奖删除
 */
router.delete('/deleteone/:id', function (req, res, next) {
    var id = req.params.id;
    CONNECT.deleteOne(LucyDraw, res, {_id: id}, function (result) {
        res.json({
            code: '0',
            result: result
        });
    });
});


/**
 * 实现抽奖项目查找
 */
router.get('/findone/:id', function (req, res, next) {
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
router.get('/list', function (req, res, next) {
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
 * 实现点击抽奖
 */
router.post('/getdraw/:id', passport.authenticate('bearer', {session: false}), function (req, res, next) {
    var id = req.params.id;
    var userId = req.user._id;
    CONNECT.findOne(LucyDraw, res, {_id: id, effect: true}, function (result) {
        if (result) {
            if (new Date() < result.startTime) {
                res.json({
                    code: '10020',
                    msg: "活动未开始"
                });
            } else if (new Date() > result.endTime) {
                res.json({
                    code: '10030',
                    msg: "活动已结束"
                });
            } else {
                getDrawQualified(id, userId, result.countType, result.count, function (bol) {
                    if (bol) {
                        var draw = getDraw(result.drawList);
                        if (draw) {
                            drawReduce(userId, lucydrawId, draw, function (bol) {
                                if (bol) {
                                    res.json({
                                        code: '0',
                                        data: draw
                                    });
                                } else {
                                    res.json({
                                        code: '10060',
                                        msg: "抽奖记录未保存"
                                    });
                                }
                            })
                        } else {
                            res.json({
                                code: '10050',
                                msg: "没有抽到奖品"
                            });
                        }
                    } else {
                        res.json({
                            code: '10040',
                            msg: "没有抽奖资格"
                        });
                    }
                })

            }
        } else {
            res.json({
                code: '10010',
                msg: "没有此活动"
            });
        }
    });
});

/**
 * 抽奖资格
 */
function getDrawQualified(lucydrawId, userId, countType, count, callback) {
    if (countType == '2') {
        var timeStamp = new Date(new Date().setHours(0, 0, 0, 0));
        var startTime = new Date(timeStamp);
        var endTime = new Date(timeStamp);
        endTime = new Date(endTime.setDate(endTime.getDate() + 1));
        var conditions = {};
        conditions.createTime = {
            $gte: startTime,
            $lte: endTime
        };
        conditions.lucydrawId = lucydrawId;
        conditions.userId = userId;
        CONNECT.find(LucyDraw, res, conditions, function (result) {
            if (result.length < count) {
                callback(true);
            } else {
                callback(false);
            }
        }, page, size);
    } else {
        var conditions = {};
        conditions.lucydrawId = lucydrawId;
        conditions.userId = userId;
        CONNECT.find(LucyDraw, res, conditions, function (result) {
            if (result.length < count) {
                callback(true);
            } else {
                callback(false);
            }
        }, page, size);
    }
}

/**
 * 抽奖算法
 */
function getDraw(drawList) {
    var num = 0;
    var arr = [];
    for (var i = 0; i < drawList.length; i++) {
        num += drawList[i].drawProbability;
        arr.push(num);
    }
    var curNum = Math.floor(Math.random() * arr[arr.length - 1] + 1);
    for (var j = 0; j < arr.length; j++) {
        if (curNum < arr[j]) {
            if (drawList[j].drawCount > 0) {
                return drawList[j];//抽到奖品
            } else {
                return false;//为抽到奖品
            }
        }
    }
    return false;//为抽到奖品
}

/**
 * 抽奖记录 更新奖品
 */
function drawReduce(userId, lucydrawId, draw, callback) {
    var data = {};
    data.userId = userId;
    data.lucydrawId = lucydrawId;
    data.draw = draw;
    CONNECT.insertOne(LucyDrawRecord, res, data, function (result) {
        CONNECT.updateOne(LucyDraw, res, {
            _id: lucydrawId,
            'drawList._id': draw._id
        }, {
            $inc: {
                "drawList.$.drawCount": -1
            }
        }, function (result) {
            if (result.ok == '1') {
                callback(true);
            } else {
                callback(false);
            }
        });
    });
}


module.exports = router;