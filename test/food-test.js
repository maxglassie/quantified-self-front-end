var chai = require('chai');
var assert = chai.assert;

var Food = require('../lib/food');

describe('Food', function() {
  context('can get all the foods', function() {
    let returnedFoods = Food.find(1)
    assert.equal(returnedFoods[0].name, 'Sweet Baby Ray\'s BBQ')
  });
});