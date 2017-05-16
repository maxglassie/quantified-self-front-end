const $ = require('jquery');
const API = 'http://localhost:3000';

class Food {
  constructor (name, calories) {
    this.name = name;
    this.calories = calories;
  };
};

$(document).ready(function(){

 var getFoods = function() {
    return $.ajax({
      url: API + '/api/v1/foods',
      method: 'GET',
    }).done(function(data){
      for (var i = 0; i < data.length; i++) {
        $('#tb-foods').prepend(`<tr><td onClick="debugFunction(this);"> ${data[i].name}</td><td>${data[i].calories}</td></tr>`);
      }
    }).fail(function(error){
      console.error(error);
    });
  };

  var raiseErrors = function(name, calories) {
      if (name.length == 0) {
        $('.name-field').append('<div><p> Please enter a food name. </p> </div>');
      }
      if (calories.length == 0) {
        $('.calories-field').append('<div><p> Please enter a calorie amount.</p></div>');
      }
  }

  var saveFood = function(name, calories) {
    var newFood = new Food(name, calories)
    $.post('http://localhost:3000/api/v1/foods', newFood)
  }

  getFoods();
    $('#food-submit').on('click', function(){
        let foodName = $('#food-name').val();
        let foodCalories = $('#food-calories').val();
        if (foodName.length > 0 && foodCalories.length > 0) {
          saveFood(foodName, foodCalories);
        } else {
          raiseErrors(foodName, foodCalories);
        }
    });

});


