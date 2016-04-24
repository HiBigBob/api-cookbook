var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

module.exports = mongoose.model('Measure', new Schema({
    name: String,
    short_name: String
}));
