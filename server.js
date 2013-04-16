/**PIEMOTE 0.1
 copyright/left 2013 nickpelone
**/



var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    currentDir,
    sys = require('sys'),
    exec = require('child_process').exec,
    cdUp,
    pWD,
    oldDir;
    
    
function moveUpDir() {
  cdUp = exec("cd .. && pwd", function(error, stdout, stderr) {
    if(error) throw error;
    if(stderr){
      console.log(stderr);
    }
    //console.log(stdout);
    currentDir = stdout;
  });  
}
function getCurrentDir() {
    pWd = exec("pwd", function(err, stdout, stderr) {
    if(err) throw err;
    if(stderr) throw stderr;
    var returnable ="";
    returnable = returnable + stdout;
    console.log("trying to return something " + returnable);
    return stdout;
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
    //print out a directory(the current one)
    //get current directory
    currentDir = "/home/vagrant/app";
    fs.readdir(currentDir, function(err,res) {
      if(err) throw err;
      for(var i =0; i<res.length;i++) {
        console.log(res[i]);
      }
      console.log("trying to move up from app folder");
      moveUpDir();
      console.log("new value of currentDir: " + currentDir);
      console.log("old directory we were in: "+ oldDir);
      console.log("get current directory result: " + getCurrentDir());
    });
  });