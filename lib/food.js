const $ = require('jquery');
const API = 'http://localhost:3000';


$(document).ready(function(){
  var getFoods = function() {
    return $.ajax({
      url: API + '/api/v1/foods',
      method: 'GET',
    }).done(function(data){
      for (var i = 0; i < data.length; i++) {
        $('#tr-foods').append('<td id="food_item">' + data[i].name + '</td>');
        $('#tr-foods').append('<td id="food_item">' + data[i].calories + '</td>');
      }
    }).fail(function(error){
      console.error(error);
    });
  };

  getFoods();
});




module.exports = Food;
