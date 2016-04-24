var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

module.exports = mongoose.model('Element', new Schema({
    name: String,
    measure : { type: Schema.Types.ObjectId, ref: 'Measure' }
}));
