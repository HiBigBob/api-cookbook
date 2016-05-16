var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

module.exports = mongoose.model('Recipe', new Schema({
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
	done: Boolean,
	minute: Number,
	degree: Number,
	score: Number, 
	type: String,
	description: String,
	date: { type: Date, default: Date.now },
	bookmarked: { type: Boolean, default: false },
	element : [{ 
		_element: { type: Schema.Types.ObjectId, ref: 'Element' },
		_measure: { type: Schema.Types.ObjectId, ref: 'Measure' },
		quantity: Number
	}]
}));