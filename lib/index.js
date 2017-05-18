const $ = require('jquery');
var Food = require('./food');
const API = 'https://quantified-self-be.herokuapp.com';

class Diary {
  constructor (day) {
    this.day = day;
  };
};

$(document).ready(function(){
const day = '05/16/17'
const breakfast = 'breakfast'
const lunch = 'lunch'
const dinner = 'dinner'
const snack = 'snack'

 var getFoodsDay = function(day,meal) {
    return $.ajax({
      url: API + `/api/v1/meals?day=${day}&meal=${meal}`,
      method: 'GET',
    }).done(function(data){
      var total = 0
      for (var i = 0; i < data.length; i++) {
        total += data[i].calories
        prependFood(data[i], meal)
      }
      prependTotal(total, meal)
    }).fail(function(error){
      console.error(error);
    })
  };

  var prependTotal = function(total, meal) {
    var calories = 0
    if (meal == 'breakfast') {
      calories += 400
    } else if (meal == 'lunch') {
      calories += 600
    } else if (meal == 'dinner') {
      calories += 800
    } else {
      calories += 200
    }
    $(`#tb-diary-${meal}`).append(`<tr>
                            <td id='${meal}-total'>Total Calories: ${total}</td>
                            <td> Remaining Calories: ${calories - total} </td>
                            </tr>`);
  }

  var prependFood = function(data, meal) {
    $(`#tb-diary-${meal}`).prepend(`<tr class='food-row' contenteditable="true" data-id=${data.id}>
                            <td id='food-name'>${data.name}</td>
                            <td id='food-calories'>${data.calories}</td>
                            <td class='food-delete'><button>-</button></td>
                            </tr>`);
  }
  getFoodsDay(day,breakfast);
  getFoodsDay(day,lunch);
  getFoodsDay(day,dinner);
  getFoodsDay(day,snack);
}); // close
