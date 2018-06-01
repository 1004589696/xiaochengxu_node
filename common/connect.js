//插入
exports.insertOne = function (collectionName, res, data, callback) {
    var collectionNameObj = new collectionName(data);
    collectionNameObj.save(function (err, result) {
        if (err) {
            res.json({
                code: '500',
                msg: "Error:" + err
            });
        } else {
            callback(result);
        }
    })
};

//删除
exports.deleteOne = function (collectionName, res, conditions, callback) {
    collectionName.remove(conditions, function (err, result) {
        if (err) {
            res.json({
                code: '500',
                msg: "Error:" + err
            });
        } else {
            callback(result);
        }
    })
};

//改
exports.updateOne = function (collectionName, res, conditions, data, callback) {
    collectionName.update(conditions, data, function (err, result) {
        if (err) {
            res.json({
                code: '500',
                msg: "Error:" + err
            });
        } else {
            callback(result);
        }
    })
};

//查
exports.findOne = function (collectionName, res, conditions, callback) {
    conditions.nodelete = true;
    collectionName.findOne(conditions, function (err, result) {
        if (err) {
            res.json({
                code: '500',
                msg: "Error:" + err
            });
        } else {
            callback(result);
        }
    })
};

exports.find = function (collectionName, res, conditions, callback, page, size) {
    !size && (size = 100);
    !page && (page = 0);
    conditions.nodelete = true;
    var query = collectionName.find(conditions);
    query.limit(size);
    query.skip(page);
    query.sort({createTime: 1});
    query.exec(function (err, result) {
        if (err) {
            res.json({
                code: '500',
                msg: "Error:" + err
            });
        } else {
            callback(result);
        }
    });
};