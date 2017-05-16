var chai = require('chai');
var assert = chai.assert;
const $ = require('jquery');

var Food = require('../lib/food');

describe('Food', function() {
  context('can get all the foods', function() {
    let returnedFoods = getFoods()
    assert.equal(returnedFoods[0].name, 'Sweet Baby Ray\'s BBQ')
  });
});