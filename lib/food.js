const $ = require('jquery');
const API = 'https://quantified-self-be.herokuapp.com';

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
    $('#tb-foods').prepend(`<tr class='food-row' contenteditable="true" data-id=${data.id}>
                            <td id='food-name'>${data.name}</td>
                            <td id='food-calories'>${data.calories}</td>
                            <td class='food-delete'><button>-</button></td>
                            </tr>`);
  }

  var saveFood = function(name, calories) {
    var newFood = new Food(name, calories)
    $.post('https://quantified-self-be.herokuapp.com/api/v1/foods', newFood)
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
        url: 'https://quantified-self-be.herokuapp.com/api/v1/foods/' + id,
        type: 'DELETE'
      });
    }
    $('#tb-foods').on('click', '.food-delete', function(){

      var id = $(this).parents('tr').data('id');
      $(this).parents('tr').remove();
      removeFood(id);
    })

    function editFood(name, cals, id){
      $.ajax({
        url: 'https://quantified-self-be.herokuapp.com/api/v1/foods/' + id,
        data: {name: name, calories: cals},
        type: 'PUT',
        success: function(){
          alert("updated")
        }
      });
    }

    $('#tb-foods').on('click', '.food-name', function(){

      var id = $(this).parents('tr').data('id');
      $(this).parents('tr')
      editFood(id);
    })

    $('.food-row').on('click', '#food-name', function(event){
        var name = $(event.target).text();
        $(event.target).html('');
        $('<input></input>')
            .attr({
                'type': 'text',
                'name': 'fname',
                'id': 'txt_fullname',
                'value': name
            })
            .appendTo('#fullname');
        $('#txt_fullname').focus();
    });

    $(document).on('blur','.food-row', function(){
        var name = $(this).find(">:first-child").text();
        var id = $(this).data().id;
        var cals = $(this).find(">:nth-child(2)").text();
        editFood(name, cals, id)
        $('#fullname').text(name);
    });

});
