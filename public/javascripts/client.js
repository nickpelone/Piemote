Object.size = function(obj) {
  //Thank you Stack Overflow!
  //Taken from: http://stackoverflow.com/questions/5223/length-of-javascript-object-ie-associative-array
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
var sendMoveUp = function () {
  var postObject = {};
  postObject.command = "moveUpDir";
  $.post("/command",postObject , function (response) {
    console.log(response);
    location.reload(true);
  })
}


var files = new Array();
var main = function() {
    console.log("Hello!");
    
    $.getJSON("/currentdir.json", function (response){
      responseSize = Object.size(response);
      for(var i = 1; i < responseSize; i++){
        //list files on page
        //console.log(response[i]);
        $("#fileList").append("<li>" + response[i] + "</li>");
      }
      $.get("/currentDir", function(data){
        $("#currentDir").append("Current directory is: " + data);
      });
    });
    $("#moveUpButton").click(function () {
      sendMoveUp();
    });
}
//only execute the javascript after everything is loaded up - important for slow systems like the rasperry pi 
$(document).ready(main);