const mongoose = require('mongoose');

var partSchema = mongoose.Schema({
  team: String,
  partType: String,
  partName: String,
  productNumber: String,
  quantity: Number
});

var Part = mongoose.model('Part', partSchema);

module.exports = Part;
