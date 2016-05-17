var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

module.exports = mongoose.model('Bookmark', new Schema({
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	date: { type: Date, default: Date.now },
	_recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' }
}));