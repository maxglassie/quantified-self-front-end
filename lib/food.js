const $ = require('jquery');
const API = 'http://localhost:3000';


function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

Food.prototype.toHTML = function() {
  return `<tr class="food-row">
     <td class="food-name"> ${this.food.name} </td>
     </tr>`
}

Food.listFoods = function() {
  //$('#food-list tbody').html('');
  $.ajax({
    method: "GET",
    url: "api/v1/foods.json"
  }).then(function(foods){
    foods.forEach(function(food){
     var foodHTML =  `<tr class="food-row">
     <td class="food-name"> ${food.name} </td>
     </tr>`;
     $('#food-list tbody').append(foodHTML)
    })
  })
};

Food.prototype.initialSave = function() {
  var foodData = { name: this.name, calories: this.calories }
  $.ajax({
    method: 'POST',
    url: 'http://localhost.3000/api/v1/foods.json',
    data: foodData
  }).then(function(foodData){
    //now we have data, do something with the response
    var food = new Food(foodData.name, foodData.calories)
    food.appendToFoodTable()
  })
}

// var newFood = new Food("cheeseburger", 2)
$("#add-food").on('click', function(){
  //he has input nested in label
  var foodName = $('#name-field input').val();
  var foodCalories = $('#calories-field input').val();
  var newFood = new Food(foodName, foodCalories);
  newFood.initialSave();
});


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

    var createFoods = $(function() {
      let form = $('#food-create');
      let formMessages = $('#form-messages')
      console.log(form)
      $(form).submit(function(event) {
        event.preventDefault();
      });

      var formData = $(form).serialize();

      return $.ajax({
        method: 'POST',
        url: $(form).attr('action'),
        data: formData
      }).done(function(response) {
          $(formMessages).removeClass('error');
          $(formMessages).addClass('success');

          $(formMessages).text(response);

          $('#name').val('');
          $('#calories').val('');
      }).fail(function(data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');

        // Set the message text.
        if (data.responseText !== '') {
            $(formMessages).text(data.responseText);
        } else {
            $(formMessages).text('Oops! An error occured and your message could not be sent.');
        }
      });
    });

  getFoods();
});

module.exports = Food;
