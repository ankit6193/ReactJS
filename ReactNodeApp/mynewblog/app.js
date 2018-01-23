var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session")
var post = require('./post')

var app = express();
app.use(express.static(path.join(__dirname,"/src")));
var user = require('./user')
app.use(bodyParser.json());


app.use(session({secret:'my-secret'}));

var sessions;

app.get('/login',function(req,res){
    res.sendFile(__dirname + '/public/login.html');
})

app.post('/getPost' ,  function(req,res){
    post.getPost(function(result){
      res.send(result);
    });
  })
  


app.post('/getPostWithId', function(req,res){
    var id = req.body.id;
    console.log("Here inside getpostwithid")
    post.getPostWithId(id, function(result){
      res.send(result)
    })
})

app.post('/signin', function (req, res) {
    var user_name=req.body.email;
    var password=req.body.password;
    sessions = req.session;
  
    user.validateSignIn(user_name,password,function(result){
      if(result){
        sessions.username = user_name
        res.send('success');
      }else{
        res.send('wrong credentials');
      }
    })
})


app.listen(7777,function(){
    console.log("Started listening on port", 7777);
})
