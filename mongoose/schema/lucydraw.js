/**
 * 奖品信息
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./mongoose/db');

//奖品
var drawList = new Schema({
    drawName: {type: String},//名称
    drawGrade: {type: Number},//奖品等级
    drawCount: {type: Number},//奖品数量
    drawProbability: {type: Number},//奖品概率
});

//活动
var LucyDraw = new Schema({
    name: {type: String},
    startTime: {type: Date},
    endTime: {type: Date},
    desc:{type: String},
    countType:{type: String},
    count:{type: Number},
    effect:{type: Boolean},
    drawList: [drawList],
    createTime: {type: Date, default: Date.now},
    updateTime: {type: Date, default: Date.now},
    valid: {type: Boolean, default: true}
}, {
    versionKey: false,
    timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
});

var LucyDrawRecord = new Schema({
    userId: {type: String},
    lucydrawId: {type: String},
    draw: {type: Object},
    createTime: {type: Date, default: Date.now},
});

exports.LucyDrawRecord = db.XIAOCHENGXU_NODE.model('LucyDrawRecord', LucyDrawRecord);
exports.LucyDraw = db.XIAOCHENGXU_NODE.model('LucyDraw', LucyDraw);