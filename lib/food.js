const $ = require('jquery');
const API = 'http://localhost:3000';

$(document).ready(function(){

  var getFoods = function() {
    return $.ajax({
      url: API + '/api/v1/foods',
      method: 'GET',
    }).done(function(data){
      for (var i = 0; i < data.length; i++) {
        $('#tb-foods').append(`<tr><td onClick="debugFunction(this);"> ${data[i].name}</td><td>${data[i].calories}</td></tr>`);
      }
    }).fail(function(error){
      console.error(error);
    });
  };

  var createFood = function() {
    let foodName = $('#food-name').val();
    let foodCalories = $('#food-calories').val();

    $('food-submit').on('click', function(){
      $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/foods',
        data: {name: foodName, calories: foodCalories }
      })
    });
  };


  getFoods();
});

module.exports = Food;
