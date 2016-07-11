var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookmarkSchema = new Schema({
	title: { type: String, required:true	},
	url: { type: String, required:true	},
	folder: { type: String, default: null },
	createdOn : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);