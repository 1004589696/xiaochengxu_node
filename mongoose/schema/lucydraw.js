/**
 * 奖品信息
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../db');

//奖品
var drawList = new Schema({
    drawName: {type: String, required: true, maxlength: 32},//名称
    drawGrade: {type: Number, required: true, min: 0},//奖品等级
    drawCount: {type: Number, required: true, min: 0},//奖品数量
    drawProbability: {type: Number, required: true},//奖品概率
});

//活动
var LucyDraw = new Schema({
    name: {type: String, required: true, maxlength: 32},//活动名称
    startTime: {type: Date, required: true},//活动开始时间
    endTime: {type: Date, required: true},//活动结束
    desc: {type: String, required: true, maxlength: 320},//活动描述
    countType: {type: String, required: true},//活动次数类型
    count: {type: Number, required: true, min: 0},//活动抽奖次数
    effect: {type: Boolean, required: true},//活动是否上架
    drawList: [drawList],//活动奖品
    createTime: {type: Date, default: Date.now},//活动创建时间
    updateTime: {type: Date, default: Date.now},//活动更新时间
    valid: {type: Boolean, default: true}
}, {
    versionKey: false,
    timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
});

var LucyDrawRecord = new Schema({
    userId: {type: String, required: true},
    lucydrawId: {type: String, required: true},
    draw: {type: Object, required: true},
    createTime: {type: Date, default: Date.now},
});

exports.LucyDrawRecord = db.XIAOCHENGXU_NODE.model('LucyDrawRecord', LucyDrawRecord);
exports.LucyDraw = db.XIAOCHENGXU_NODE.model('LucyDraw', LucyDraw);