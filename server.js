/**PIEMOTE 0.1
 copyright/left 2013 nickpelone
**/



var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    currentDir = "/home/vagrant";
    
function moveUpDir() {
  var parentDir;
  
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
f});

//create our express http server here
http.createServer(app).listen(3000,function() {
    console.log("Express server is up on port 3000");
    //print out a directory(the current one)
    fs.readdir(currentDir, function(err,res) {
      if(err) throw err;
      for(var i =0; i<res.length;i++) {
        console.log(res[i]);
      }
    });
    
//end server
  });