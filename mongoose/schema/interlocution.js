/**
 *  interlocution 信息
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../db');


var Interlocution = new Schema({
    questionType: {type: String},
    questionLevel: {type: String},
    questionName: {type: String},
    answerList: [{
        answerContent: {type: String, require: true},
        is_answer: {type: Boolean, require: true},
        status: {type: Number, default: 0},
        createTime: {type: Date, default: Date.now},
    }],
    createTime: {type: Date, default: Date.now},
    updateTime: {type: Date, default: Date.now},
    nodelete: {type: Date, default: true}
}, {
    versionKey: false,
    timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
});


// 编译模型
module.exports = db.XIAOCHENGXU_NODE.model('Interlocution', Interlocution);