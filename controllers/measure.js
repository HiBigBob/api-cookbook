var express       = require('express');
var router        = express.Router();
var Measure       = require('../models/measure');

router.get('/', function(req, res) {
  	Measure.find({}, function (err, measures) {
      if (err) return handleError(err);
	  	res.json(measures);
    });
});

router.get('/:name', function(req, res){
  Measure.findOne({ name: req.body.name }, function(err, measure) {
    if (err) {
      res.send('Measure not found error', 403)
    }
    res.json(measure);
  });
});

module.exports = router;
