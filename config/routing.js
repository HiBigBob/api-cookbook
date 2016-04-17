var user 			= require('../controllers/user');
var setup 			= require('../controllers/setup');
var authenticate 	= require('../controllers/auth');

var auth 			= require('../middlewares/auth');
var requireAuth 	= require('../middlewares/require');

module.exports.set 	= function(app) {
	app.use('/authenticate', authenticate);
	app.use('/setup', setup);
  	app.use('/users', [auth, requireAuth], user);
}
