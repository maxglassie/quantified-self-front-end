const $ = require('jquery');
const API = 'http://localhost:3000';


$(document).ready(function(){
  var getFoods = function() {
    return $.ajax({
      url: API + '/api/v1/foods',
      method: 'GET',
    }).done(function(data){
      for (var i = 0; i < data.length; i++) {
        $('#tb-foods').append(`<tr><td> ${data[i].name}</td><td>${data[i].calories}</td></tr>`);
      }
    }).fail(function(error){
      console.error(error);
    });
  };

  getFoods();
});




module.exports = Food;
