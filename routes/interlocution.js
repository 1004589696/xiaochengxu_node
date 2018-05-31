var express = require('express');
var router = express.Router();
var Interlocution = require("../mongoose/schema/interlocution");

/**
 * 实现问题添加
 */
router.post('/add', function (req, res, next) {
    var reqData = req.body;
    var InterlocutionObj = new Interlocution(reqData);
    InterlocutionObj.save(function (err, result) {
        if (err) {
            res.json({
                code: '500',
                msg: "Error:" + err
            });
        } else {
            res.json({
                code: '0',
                result: result
            });
        }
    })
});

/**
 * 实现问题编辑
 */
router.post('/edit', function (req, res, next) {
    var interlocutionId = req.query.interlocutionId;
    var reqData = req.body;
    Interlocution.update({_id: interlocutionId}, reqData, function (err, result) {
        if (err) {
            res.json({
                code: '500',
                msg: "Error:" + err
            });
        } else {
            res.json({
                code: '0',
                result: result
            });
        }
    });
});


module.exports = router;
