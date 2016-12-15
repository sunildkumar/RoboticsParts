const express = require('express');
const app = express();
const mongoose = require('mongoose');
const parser = require('body-parser');

const Part = require('./part.js');



mongoose.connect("mongodb://localhost", function(err, db){
  if(!err){
    console.log("connected");
  }
});

app.use(parser.urlencoded({
  extended: false
}));
app.use(parser.json());
app.set('views', '.')
app.set('view engine', 'pug');

///////////////////////////////////////////////////////////////////////////FUNCTIONS////////////////////////////////////////////////////////////////////////////////////////////////////


function sumAT(){
  var allPartsArray = Part.find({}).toArray();
  var sum = 0;
  for(var i =0; i <allPartsArray.length; i++){
    sum= sum + allPartsArray[i].price;
  }
  return sum;

}
///////////////////////////////////////////////////////////////////////////////HOMEPAGE////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", function(req, res) {
  res.send("Welcome to the KDS Robotics Database");
});


///////////////////////////////////////////////////////////////////PARTLIST///////////////////////////////////////////////////////////////////////////////////////////////////

//all parts in database
app.get("/partslist", function (req,res) {
  Part.find({}).sort({"partName": 1})
    .exec(function (err, parts) {
      if (err) throw err;
      res.render('partslist', {
        title: "All parts",
        parts: parts
      });
    })
  });
//add parts to our inventory
app.post('/partslist', function(req, res) {

    Part.create({
      partType: req.body.partType,
      partName: req.body.partName,
      productNumber: req.body.productNumber,
      location: req.body.location,
      quantity: req.body.quantity,
      needOrdered: req.body.needOrdered,
      price: req.body.price
    }, function(err, user) {
      if (err) throw err;
      res.redirect('/partslist');
    })
  });
//////////////////////////////////////////////////////////////////////MODIFY/////////////////////////////////////////////////////////////////////////////////////////////////

//modify past entries
app.get("/modify", function (req,res) {
  Part.find({}).sort({"partName": 1})
    .exec(function (err, parts) {
      if (err) throw err;
      res.render('modify', {
        title: "Modify",
        parts: parts
      });
    })
  });

app.post("/modify", function (req,res) {
    Part.update({partName:req.body.oldPartName,location:req.body.oldLocation },
      {
        $set: {
    partType: req.body.partType,
    partName: req.body.partName,
    productNumber: req.body.productNumber,
    quantity: req.body.quantity,
    location: req.body.location,
    needOrdered: req.body.needOrdered,
    price: req.body.price
  }}, function(err, user) {
      if (err) throw err;
      res.redirect('/modify');
})})



/////////////////////////////////////////////////////////////////////ORDER////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/order", function (req,res) {
  Part.find({}).sort({"partName": 1})
    .exec(function (err, parts) {
      if (err) throw err;
      res.render('order', {
        title: "Requested Parts",
        parts: parts
      });

    })
  });
app.post("/order", function (req,res) {
    Part.update({needOrdered:true},{needOrdered:false},{multi:true}, function(err, user) {
      if (err) throw err;
      res.redirect('/order');
})})

/////////////////////////////////////////////////////////////////////LISTEN/////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(8000);
