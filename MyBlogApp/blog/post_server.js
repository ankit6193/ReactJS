var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/';

module.exports = {
    addPost: function(title, subject, callback){
        MongoClient.connect(url, function(err, db) {

            if (err) throw err;

            var dbo = db.db("blog")

            dbo.collection('post').insertOne({
                "title" : title,
                "subject" : subject,
            },function(err,result){
                assert.equal(err,null);
                console.log("Saved Blog Details");
                
                if(err == null){
                    callback(true)
                }else{
                    callback(false)
                }
            });
        });
    },
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
    },
    updatePost: function(id,title,subject,callback){
        MongoClient.connect(url, function(err, db){

            var dbo = db.db("blog");
            dbo.collection('post').updateOne(
                {"_id" : new mongodb.ObjectID(id)},
                { $set : 
                    {
                        'title' :title,
                        'subject': subject
                    },function(err,result) {
                        assert.equal(err, null);
                        if(err == null){
                            callback(result)
                        }
                        else{
                            callback(false)
                        }
                    }

                }
            )
            
        })
    },
    deletePost: function(id,callback){
        MongoClient.connect(url, function(err, db){

            var dbo = db.db("blog");
            dbo.collection('post').deleteOne(
                {"_id" : new mongodb.ObjectID(id)},
                function(err,result) {
                        assert.equal(err, null);
                        console.log('Deleted current post')
                        if(err == null){
                            callback(result)
                        }
                        else{
                            callback(false)
                        }
                    }
            )
            
        })
    }
}