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
    spawn = require('child_process').spawn,
    pWd;
    
    //begin function declarations
var getUserHome = function (){
    return process.env.HOME;
}   
var getContents = function (response) {
    var returnable;
    fs.readdir(currentDir, function (err, res) {
        returnable = res;
        if(err) throw err;
        response(returnable);
    });
}
var init = function (callback) {
    currentDir = getUserHome();
    callback();
}
var determinatorDebug = function (input) {
    //determines if an input from fs.readdir is a file or folder, and prints the result to console.
    for(var i = 0; i < input.length; i++) {
        (function (){
            var _input = input, _i = i;
            fs.stat(currentDir + "/" + _input[_i], function (err, stat_response) {
                if(stat_response.isDirectory() === true){
                    console.log(_input[_i] + "/" + " is a directory");
                }else if(stat_response.isFile() === true){
                    console.log(_input[_i] + " is a file");
                }
            });
        })();
    }
}
var determinator_json_debug = function (input,callback){
    //input-output model compliant function for determining if input is file or folder.
    //construct array of JSON objects that represents the current directory
    //!TODO! - insert work here
    // INPUT is a result from Piemote.getContents();
    var err = null;
    var response = "ok";
    var jsonObject = {};
    for(var i = 0; i < input.length; i++) {
        (function (){
            var _input = input, _i = i;
            fs.stat(currentDir + "/" + _input[_i], function (_err, stat_response) {
                if(stat_response.isFile() === true) {
                    console.log("we have a file");
                    }
     });
     })();
     }
     

                
    
    /* callback prototype
        where err is an error in computation
        and response is a JSON object */
        
    callback(err, jsonObject);
}
app.configure(function () {
    // Define our static file directory, it will be 'public'                                                                                           
    app.use(express.static(path.join(__dirname, 'public')));
    //allows for parsing JSON received by a post
    app.use(express.bodyParser());
});
//create our http server here
http.createServer(app).listen(3000,function() {
    console.log("Express is up: running on port 3000");
    init(function (){
        getContents(function (content_response){
           determinator_json_debug(content_response, function(err, det_res) {
               if (err) throw err;
               console.log(det_res);
           }); 
        });
    });
});    