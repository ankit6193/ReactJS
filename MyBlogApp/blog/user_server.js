var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/';

module.exports = {
    signup: function(name, email, password){
        MongoClient.connect(url, function(err, db) {

            if (err) throw err;

            var dbo = db.db("blog")

            dbo.collection('user').insertOne({
                "name" : name,
                "email" : email,
                "password" : password
            },function(err,result){
                assert.equal(err,null);
                console.log("Saved SignUp Details");
            });
        });
    },

    validateSignIn: function(username,password,callback){
        MongoClient.connect(url, function(err, db) {

            if (err) throw err;
            console.log('here');
            var dbo = db.db("blog")

            dbo.collection('user').findOne( { email : username ,password: password 
            },function(err, result){
                if(result==null){
                    callback(false)
                }
                else{
                    callback(true)
                }
            });
        });
    }
}

