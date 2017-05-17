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
        prependFood(data[i])
      }
    }).fail(function(error){
      console.error(error);
    });
  };

  var raiseErrors = function(name, calories) {
      if (name.length == 0) {
        $('.name-field').append('<div class="validation-error"><p> Please enter a food name. </p> </div>');
      }
      if (calories.length == 0) {
        $('.calories-field').append('<div class="validation-error"><p> Please enter a calorie amount.</p></div>');
      }
  }

  var prependFood = function(data) {
    $('#tb-foods').prepend(`<tr class='food-row' data-id=${data.id}>
                            <td>${data.name}</td>
                            <td>${data.calories}</td>
                            <td class='food-delete'><button>-</button></td>
                            </tr>`);
  }

  var saveFood = function(name, calories) {
    var newFood = new Food(name, calories)
    $.post('http://localhost:3000/api/v1/foods', newFood)
    .then(function(data){
      prependFood(data.rows[0])
    });
  }

  var clearErrors = function(){
    $('.validation-error').empty();
  }
  var clearInput = function(){
    $('#food-name').val("");
    $('#food-calories').val("");
  }

  getFoods();
    $('#food-submit').on('click', function(e){
      e.preventDefault()
        let foodName = $('#food-name').val();
        let foodCalories = $('#food-calories').val();
        if (foodName.length > 0 && foodCalories.length > 0) {
          saveFood(foodName, foodCalories);
          clearInput()
          clearErrors()

        } else {
          raiseErrors(foodName, foodCalories);
        }
    });

    function removeFood(id){
      $.ajax({
        url: 'http://localhost:3000/api/v1/foods/' + id,
        type: 'DELETE'
      });
    }
    $('#tb-foods').on('click', '.food-delete', function(){

      var id = $(this).parents('tr').data('id');
      $(this).parents('tr').remove();
      removeFood(id);
    })
});
