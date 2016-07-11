var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var folderSchema = new Schema({
	name: { type: String, required: true	},
	createdOn : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Folder', folderSchema);