var express = require('express');
var router  = express.Router();
var User    = require('../models/user');
var getSlug = require('../utils/slug');

router.get('/', function(req, res, next) {
  // create the first user
  var john = new User({
    username: 'John',
    password: 'password'
  });

  // save the first user
  john.save(function(err) {
    if (err) console.log(err);
    console.log('User saved successfully');
    res.json({ success: true });
  });
});

module.exports = router;
