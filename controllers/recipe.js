var express       = require('express');
var router        = express.Router();
var Recipe        = require('../models/recipe');
var auth          = require('../middlewares/auth');
var required      = require('../middlewares/require');

router.param('id', function(req, res, next, value){
    Recipe.findOne({_id: value}, function (err, recipe) {
        if (err) res.status(404).json({error: 'Not found'});
        req.recipe = recipe;
        next();
    });
});

router.get('/', auth, required, function(req, res) {
    Recipe
      .find({_user: req.user._id})
      .populate('element._element')
      .populate('element._measure')
      .exec(function (err, recipes) {
        if (err) return handleError(err);
        res.json(recipes);
      });
});

router.get('/:id', auth, required, function(req, res) {
    Recipe
      .findOne({_id: req.recipe._id})
      .populate('element._element')
      .populate('element._measure')
      .exec(function (err, recipe) {
        if (err) return handleError(err);
        res.json(recipe);
      });
});

router.post('/', auth, required, function(req, res){
  var listElement = [];
  req.body.element.forEach(function(elem) {
    listElement.push({
      _element: elem.id,
      _measure: elem.measure.id,
      quantity: elem.quantity
    });
  });

  var recipe = new Recipe({
    _user: req.user._id,
    name: req.body.name,
    done: req.body.done,
    minute: req.body.minute,
    baking: req.body.baking,
    degree: req.body.degree,
    score: req.body.score,
    type: req.body.type,
    description: req.body.description,
    element: listElement,
  });

  recipe.save(function(err) {
      if (err) console.log(err);
      console.log('Recipe saved successfully');
  });

  res.status(201).json({ status: 'success' });
});


router.put('/:id', function(req, res, next) {
    var listElement = [];
    req.body.element.forEach(function(elem) {
      listElement.push({
        _element: elem._element._id,
        _measure: elem._measure._id,
        quantity: elem.quantity
      });
    });

    Recipe.update({_id: req.recipe._id}, {$set: {
      name: req.body.name,
      done: req.body.done,
      minute: req.body.minute,
      baking: req.body.baking,
      degree: req.body.degree,
      score: req.body.score,
      type: req.body.type,
      bookmarked: String(req.body.bookmarked) == "true",
      description: req.body.description,
      element: listElement,
    }}, function(err) {
        if (err) return next(new Error(err));

        Recipe
          .findOne({_id: req.recipe._id})
          .populate('element._element')
          .populate('element._measure')
          .exec(function (err, recipe) {
            if (err) return handleError(err);
            console.log('Recipe updated successfully');
            res.status(200).json(recipe);
        });
    });
});

module.exports = router;
