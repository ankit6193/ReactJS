//import { request } from "http";

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session")
var post = require('./post_server')

var app = express();
app.use(express.static(path.join(__dirname,"/src")));
var user = require('./user_server')
app.use(bodyParser.json());


app.use(session({secret:'my-secret'}));

var sessions;

// app.get('/',function(req,res){
//   res.sendFile(__dirname + '/html/home.html');
// })


app.get('/home',function(req,res){
  if(sessions && sessions.username){
    res.sendFile(__dirname + '/html/home.html');
  }else{
    res.send('Unauthorised Access');
  }
})


app.post('/signin', function (req, res) {
  console.log("Inside signin server")
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

app.post('/signup', function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  
  if(name && email && password == 0){
    res.send('Failure in signup')
    
  }else{
    user.signup(name,email,password)
    
  }
})

app.post('/addPost', function (req, res) {
  var title = req.body.title;
  var subject = req.body.subject;
  var id  = req.body.id;

  if(id == '' || id == undefined){
    console.log('add');
    post.addPost(title, subject ,function(result){
      res.send(result);
    }); 
  }else{
    console.log('update',title,subject);
    post.updatePost(id, title, subject ,function(result){
      res.send(result);
    }); 
  }
})

app.post('/deletePost',function(req,res){
  var id = req.body.id;
  post.deletePost(id,function(result){
    res.send(result);
  });
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

app.listen(7777,function(){
    console.log("Started listening on port", 7777);
})
