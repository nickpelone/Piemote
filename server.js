/**PIEMOTE 0.1
 copyright/left 2013 nickpelone
**/



var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    currentDir = "/media/float/store";
    
// This is our basic configuration                                                                                                                     
app.configure(function () {
    // Define our static file directory, it will be 'public'                                                                                           
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get("/remote", function(req,res) {
    res.send("A remote will be here, one day.");
});

//create our express http server here
http.createServer(app).listen(3000,function() {
    console.log("Express server is up on port 3000");
})