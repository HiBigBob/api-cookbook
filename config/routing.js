var user 			= require('../controllers/user');
var setup 			= require('../controllers/setup');
var element 		= require('../controllers/element');
var measure 		= require('../controllers/measure');
var recipe 			= require('../controllers/recipe');
var authenticate 	= require('../controllers/auth');
var bookmark 		= require('../controllers/bookmark');

var auth 			= require('../middlewares/auth');
var requireAuth 	= require('../middlewares/require');

module.exports.set 	= function(app) {
	app.use('/authenticate', authenticate);
	app.use('/setup', setup);
	app.use('/elements', element);
	app.use('/measures', measure);
	app.use('/recipes', recipe);
	app.use('/bookmarks', bookmark);
  	app.use('/users', [auth, requireAuth], user);
}
