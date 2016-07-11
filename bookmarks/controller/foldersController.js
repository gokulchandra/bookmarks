var Folder = require('../models/folderModel');
var Bookmark = require('../models/bookmarkModel');

exports.createFolder = function(req, res) {
	var entry = new Folder({
		name: req.body.name 
	});

	entry.save(function(err) {
		if(err){
			res.send(err)
		} 
		else	{
			var query = Folder.find();
			query.sort({createdOn:'desc'})
				.limit(1)
				.exec(function(err, results){
					if(err) {
						res.send(err)
					}				
					res.send(results)
			})			
		}
	});
}

exports.listFolders = function(req, res) {
	var query = Folder.find();
	query.sort({createdOn:'desc'})
		.exec(function(err, results){
			res.send(results);
		});
}

exports.getFolderById = function(req, res) {
	var id = req.params.id
	var query = Folder.findById(id);
	query.exec(function(err, result){
			res.send(result);
		});
}

exports.deleteFolderById = function(req, res) {
	var id = req.params.id
	var cascade = Boolean(Number(req.query.cascade))
	console.log(cascade)
	if(cascade){
		Bookmark.remove({folder: id }, function(err, results){
			if(err) res.send(err)
		})
	}
	else {
		Bookmark.update({folder: id }, {folder: null}, { multi:true }, function(err, results){
			if(err) res.send(err)
		});
	}
	var query = Folder.findByIdAndRemove(id);
	query.exec(function(err, result){
			res.send(result);
		});
}
