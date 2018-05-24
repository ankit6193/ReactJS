const express = require('express')
const app = express()
var path = require("path");

const port = process.env.PORT || 7001;

app.use("/", express.static(__dirname + '/build'));

app.listen(port,function(){
    console.log("Server listening on port " + port)
})

