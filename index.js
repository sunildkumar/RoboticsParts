const express = require('express');
const app = express();
const mongoose = require('mongoose');
const parser = require('body-parser');

const Part = require('./part.js');



mongoose.connect("mongodb://localhost:27017", function(err, db){
  if(!err){
    console.log("connected");
  }
});

//home page
app.get("/", function(req, res) {
  res.send("Welcome to the KDS Robotics Database");
});

app.use(parser.urlencoded({
  extended: false
}));
app.use(parser.json());
app.set('views', '.')
app.set('view engine', 'pug');


//all parts in database
app.get("/partslist", function (req,res) {
  Part.find({})
    .exec(function (err, parts) {
      if (err) throw err;
      res.render('partslist', {
        title: "All parts",
        parts: parts
      });
    })

  });

  app.post('/partslist', function(req, res) {
    Part.create({
      team: req.body.team
    }, function(err, user) {
      if (err) throw err;
      res.redirect('/partslist');
    })
  });







app.listen(27017);
