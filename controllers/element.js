var express       = require('express');
var router        = express.Router();
var Element       = require('../models/element');

router.get('/', function(req, res) {
  	Element.find({})
	.populate('measure')
	.exec(function (err, elements) {
	 	if (err) return handleError(err);
	  	res.json(elements);
	});
});

router.get('/:name', function(req, res){
  Element.findOne({ name: req.body.name }, function(err, element) {
    if (err) {
      res.send('Element not found error', 403)
    }
    res.json(element);
  });
});

module.exports = router;
