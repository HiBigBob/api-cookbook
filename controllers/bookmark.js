var express       = require('express');
var router        = express.Router();
var Bookmark      = require('../models/bookmark');
var auth          = require('../middlewares/auth');
var required      = require('../middlewares/require');

router.param('id', function(req, res, next, value){
    Bookmark.findOne({_id: value}, function (err, bookmark) {
        if (err) res.status(404).json({error: 'Not found'});
        req.bookmark = bookmark;
        next();
    });
});

router.get('/', auth, required, function(req, res) {
  	Bookmark.find({_user: req.user._id})
    .populate('_recipe')
    .exec(function (err, bookmarks) {
      if (err) return handleError(err);
	  	res.json(bookmarks);
    });
});

router.post('/', auth, required, function(req, res){
  var book = new Bookmark({
    _user: req.user._id,
    _recipe: req.body._recipe.id
  });

  book.save(function(err) {
      if (err) console.log(err);
      console.log('Bookmark saved successfully');

      Bookmark.findOne({ _id: book.id}).populate('_recipe').exec(function (err, bookmark) {
        if (err) return next(new Error(err));
        console.log('Bookmark added successfully');
        res.json(bookmark);
      });
  });
});

router.put('/:id', function(req, res, next) {
    if (!req.body._recipe) return next(new Error('Param is missing.'));
    Bookmark.update({_id: req.bookmark._id}, {$set: {_recipe: req.body._recipe}}, function(err) {
        if (err) return next(new Error(err));

        Bookmark.findOne({ _id: value}, function(err, bookmark) {
            if (err) return next(new Error(err));
            console.log('Bookmark updated successfully');
            res.status(200).json(bookmark);
        });
    });
});

router.delete('/:id', function(req, res, next) {
    Bookmark.remove({_id: req.bookmark._id}, function(err) {
        if (err) return next(new Error(err));
        console.log('Bookmark removed successfully');
        res.status(204).send();
    });
});

module.exports = router;
