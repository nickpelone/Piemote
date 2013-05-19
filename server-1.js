/**
    Piemote
    a node.js application for the raspberry pi
    created by nick pelone <npelone@unca.edu>
    2013
    
**/





var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    currentDir,
    startDir,
    sys = require('sys'),
    exec = require('child_process').exec,
    fork = require('child_process').fork,
    spawn = require('child_process').spawn;
    
app.configure(function () {
    // Define our static file directory, it will be 'public'                                                                                           
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser());
});

//create our http server here
http.createServer(app).listen(3000,function() {
    console.log("Express server is up on port 3000");
    //
});