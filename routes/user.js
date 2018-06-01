var express = require('express');
var router = express.Router();
var User = require("../mongoose/schema/user");
var CONNECT = require('../common/connect');
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
var secretOrPrivateKey = "dingcunkuan The NO.1";

/**
 * 实现用户注册 /api/user/register
 */
router.post('/register', function (req, res, next) {
    var reqData = req.body;
    CONNECT.insertOne(User, res, reqData, function (result) {
        res.json({
            code: '0',
            result: result
        });
    });
});


/**
 * 实现用户登录 /api/user/login
 */
router.post('/login', function (req, res, next) {
    var phone = req.body.phone;
    var password = req.body.password;
    if (!phone || !password) {
        return res.json({
            code: '10010',
            msg: "Error: 用户名或密码不能为空！"
        });
    }
    CONNECT.findOne(User, res, {phone: phone}, function (result) {
        if (result) {
            bcrypt.compare(password, result.password, function (err, checkData) {
                if (err) {
                    return res.json({
                        code: '500',
                        msg: "Error: " + err
                    });
                } else {
                    if (checkData) {
                        var jwtdata = {
                            phone:phone,
                            password:password
                        };
                        var refresh_token = jwt.sign(jwtdata, secretOrPrivateKey, {
                            expiresIn: 60 * 60 * 24 * 30  // 30*24小时过期
                        });
                        var access_token = jwt.sign(jwtdata, secretOrPrivateKey, {
                            expiresIn: 60 * 60 * 24 * 7  // 7*24小时过期
                        });
                        return res.json({
                            code: '10000',
                            data: {
                                access_token: access_token,
                                refresh_token: refresh_token,
                                loginId: result._id
                            }
                        });
                    } else {
                        return res.json({
                            code: '10040',
                            msg: "登录失败"
                        });
                    }
                }
            });
        } else {
            return res.json({
                code: '10020',
                msg: "Error: 用户名不存在"
            });
        }
    });
});

module.exports = router;