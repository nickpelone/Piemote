Object.size = function(obj) {
  //Thank you Stack Overflow!
  //Taken from: http://stackoverflow.com/questions/5223/length-of-javascript-object-ie-associative-array
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var files = new Array();
var main = function() {
    console.log("Hello!");
    $.getJSON("/currentdir.json", function (response){
      responseSize = Object.size(response);
      for(var i = 1; i < responseSize; i++){
        console.log(response[i]);
      }
    });
}

$(document).ready(main);