/**PIEMOTE 0.1
 copyright/left 2013 nickpelone
**/

/** Basic ideas of functions and responses:
    a file browsing or navigation operation should always return the current dir in a callback
    ex. moveUpDir( function (currentDirectory) {
        console.log(currentDirectory);
        });
    
    This should be done by defining functions with callbacks:
    ex.
    function moveUpDir(callback) {
      //the next line is a function prototype
      callback(local, function, variables, here);
    }
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
    cdUp,
    pWD,
    oldDir;
    
    
function moveUpDir(callback) {
  cdUp = exec("cd .. && pwd", function(error, stdout, stderr) {
    if(error) throw error;
    if(stderr){
      console.log(stderr);
    }
    currentDir = stdout;
    callback(currentDir);
  });  
}

function debugTests(){
  getCurrentDir(function (response){ 
    console.log("1. Current working directory: " + response);
      moveUpDir(function (response) {
        console.log("2. We tried to move up: " + response);
        getCurrentDir(function (response) {
          console.log("3. This should be the same as before: " + response);
        });
    });
  });
}
function getCurrentDir(callback) {
  pWd = exec("pwd", function(error, stdout, stderr) {
    if (error) throw error;
    if (stderr) console.log("stderr!! " + stderr);
    currentDir = stdout;
    currentDir = currentDir.substring(0,currentDir.length - 1);
    callback(currentDir);
  });
}

function listCurrentDir(){
  getCurrentDir(function (currentDirectory){
    fs.readdir(currentDirectory, function(err, res){
      for(var i = 0; i<res.length;i++){
        console.log(res[i]);
      }
    });
  });
}
  
// This is our basic configuration                                                                                                                     
app.configure(function () {
    // Define our static file directory, it will be 'public'                                                                                           
    app.use(express.static(path.join(__dirname, 'public')));
});
app.get("/remote", function(req,res) {
    res.send("A remote will be here, one day.");
});

app.get("/currentDir.json", function(req,res) {
    var jsonObject = {};
        jsonObject["hello"] = "howdy";
    res.json(jsonObject);
  });

//create our express http server here
http.createServer(app).listen(3000,function() {
    console.log("Express server is up on port 3000");
    //
    getCurrentDir( function (response){ 
      console.log("first working directory:" + response);
      listCurrentDir();
    });
    //
  });