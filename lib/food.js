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


      $('#food-submit').on('click', function(){
          let foodName = $('#food-name').val();
          let foodCalories = $('#food-calories').val();
            $.post('http://localhost:3000/api/v1/foods', {name: foodName, calories: foodCalories})
      });

  var caloriesField = function(foodCalories){
      debugger;
      // let foodCalories = $('#food-calories').val();
      if (typeof foodCalories != 'number') {
        alert('Not valid calories');
      }
      // if foodcals is not an int,
      //   send an alert, and do not allow submit to be active
    };

  getFoods();
});


