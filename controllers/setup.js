var express = require('express');
var router  = express.Router();
var User    = require('../models/user');
var Element = require('../models/element');
var Measure = require('../models/measure');
var getSlug = require('../utils/slug');

router.get('/', function(req, res, next) {

  var gr = new Measure({
    name: 'Gramme',
    short_name: 'g'    
  });

  var ml = new Measure({
    name: 'Millilitre',
    short_name: 'ml'    
  });

  var sachet = new Measure({
    name: 'Sachet',
    short_name: 'sachet'    
  });

  var cuillere_cafe = new Measure({
    name: 'Cuillère à café',
    short_name: 'cuillère à café'    
  });

  var cuillere_soupe = new Measure({
    name: 'Cuillère à soupe',
    short_name: 'cuillère à soupe'    
  });

  var blank = new Measure({
    name: '',
    short_name: ''    
  });

  var pince = new Measure({
    name: 'Pincée',
    short_name: 'pincée'    
  });

  var tranche = new Measure({
    name: 'Tranche',
    short_name: 'tr'    
  });

  measures = [gr._id, blank._id, sachet._id, pince._id, gr._id, sachet._id, sachet._id, blank._id, blank._id, blank._id, tranche._id, blank._id, ml._id, tranche._id, blank._id];
  elements = ['farine', 'oeuf', 'levure chimique', 'sel', 'sucre', 'sucre vahiné', 'levure de boulanger', 'pain à hamburger', 'fromage carré', 'steack haché', 'jambon', 'ketchup', 'lait', 'pain de mie', 'herbe de provence'];
  for (var i = 0; i < elements.length; i++) {
    var elem = new Element({
      name: elements[i],
      measure: measures[i]
    });

    elem.save(function(err) {
      if (err) console.log(err);
      console.log('Element saved successfully');
    });
  };

  var john = new User({
    username: 'John',
    password: 'password'
  });

  gr.save(function(err) {
    if (err) console.log(err);
    console.log('Gramme saved successfully');
  });

  ml.save(function(err) {
    if (err) console.log(err);
    console.log('Millilitre saved successfully');
  });

  sachet.save(function(err) {
    if (err) console.log(err);
    console.log('Sachet saved successfully');
  });

  cuillere_cafe.save(function(err) {
    if (err) console.log(err);
    console.log('Cuillère à café saved successfully');
  });

  cuillere_soupe.save(function(err) {
    if (err) console.log(err);
    console.log('Cuillère à soupe saved successfully');
  });

  blank.save(function(err) {
    if (err) console.log(err);
    console.log('Blank saved successfully');
  });

  pince.save(function(err) {
    if (err) console.log(err);
    console.log('Pince saved successfully');
  });

  tranche.save(function(err) {
    if (err) console.log(err);
    console.log('Tranche saved successfully');
  });

  // save the first user
  john.save(function(err) {
    if (err) console.log(err);
    console.log('User saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;
