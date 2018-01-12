

const express = require('express');
const app = express();
var bodyParser = require('body-parser')
var path    = require("path");

// app.use('/', express.static('build'))
app.use(bodyParser.json())

// app.get('/',function(req,res){
//     res.sendFile(path.join(__dirname+'/index.html'));
//     //__dirname : It will resolve to your project folder.
// });

app.get("/get", function(req, res){
    res.send("Hello");
    console.log("recieved get request!");
})
app.post('/signin', function (req, res) {
    var user_name=req.body.login;
    var password=req.body.pass;

    if(user_name=='admin' && password=='admin'){
        res.send('success');
        console.log("sending success");
    }
    else{
      res.send('Failure');
      console.log("sending failure");
    }
})

app.listen(9000)