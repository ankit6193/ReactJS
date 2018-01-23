var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/';

module.exports = {
    getPost: function(callback){

            MongoClient.connect(url, function(err, db){

                var dbo = db.db("blog");
                dbo.collection('post', function (err, collection) {
                   collection.find().toArray(function (err, list) {
                       callback(list);
                   });
                });
            })

    },
    getPostWithId: function(id, callback){
        
        MongoClient.connect(url, function(err, db){
            dbo = db.db("blog") 
            dbo.collection('post').findOne({
                _id: new mongodb.ObjectID(id)
             },
             function(err, result){
                assert.equal(err, null);
                if(err == null){
                    callback(result)
                }
                else{
                    callback(false)
                }
            });
        })
    }
    
    
}