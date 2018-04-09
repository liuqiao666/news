const MongoClient = require('mongodb').MongoClient;
const ObjID = require('mongodb').ObjectID;
const DB_CONN_STR = 'mongodb://127.0.0.1:27017/ce_news';

var selectData = function(db, id, callback) {  
  //连接到表  
  var collection = db.collection('content');
  //查询数据
  var whereStr = {"_id": ObjID.createFromHexString(id)};
  collection.find(whereStr).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}

var getData = function(db, cate, page, callback) {  
  //连接到表  
  var collection = db.collection('content');
  //查询数据
  var whereStr = {"cate": cate};
  collection.find(whereStr).limit(10).skip(10*(page-1)).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    callback(result);
  });
}

var data = function(cate, page) {
    return new Promise(function(resolve) {   
        MongoClient.connect(DB_CONN_STR, function(err, db) { 
            if (cate == 'det') {
                selectData(db, page, function(result) {
                    resolve(result);
                    db.close();
                });
            }
            else {
                getData(db, cate, page, function(result) {
                    resolve(result);
                    db.close();
                });
            }
        });
    });
}

module.exports.getNewsList = async (detail, page=null)=>{
    if (detail === '') {
        if (page == null) {
            page = 1
        }
        return await data('news', page);
    }
    else {
        return await data('det', detail);
    }
};
module.exports.getActivityList = async (detail, page=null)=>{
    if (detail === '') {
        if (page == null) {
            page = 1
        }
        return await data('event', page);
    }
    else {
        return await data('det', detail);
    }
};
module.exports.getTechList = async (detail, page=null)=>{
    if (detail === '') {
        if (page == null) {
            page = 1
        }
        return await data('tech', page);
    }
    else {
        return await data('det', detail);
    }
};
module.exports.getStoryList = async (detail, page=null)=>{
    if (detail === '') {
        if (page == null) {
            page = 1
        }
        return await data('article', page);
    }
    else {
        return await data('det', detail);
    }
};