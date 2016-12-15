const mongoose = require('mongoose');

var partSchema = mongoose.Schema({
  partType: String,
  partName: String,
  productNumber: String,
  quantity: Number,
  location: String,
  needOrdered: Boolean,
  price: Number

});

var Part = mongoose.model('Part', partSchema);

module.exports = Part;
