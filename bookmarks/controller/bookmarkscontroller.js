var Bookmark = require('../models/bookmarkModel');


exports.createBookmark = function(req, res) {
	var entry = new Bookmark({
		title: req.body.title ,
		url: req.body.url,
		folder: req.body.folder || null
	});

	entry.save(function(err) {
		if(err){
			res.send(err)
		} 
		else	{
			var query = Bookmark.find();
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

exports.listBookmarks = function(req, res) {
	var query = Bookmark.find();
	query.sort({createdOn:'desc'})
		.exec(function(err, results){
			res.send(results);
		});
}

exports.assignBookmarkToFolder = function(req, res) {
	var bookmark = req.params.bookmark
	var folder = req.params.folder
	console.log(req.params)
	var query = Bookmark.findByIdAndUpdate(bookmark, {
		folder: folder
	});
	query.exec(function(err, result){
			console.log(err)
			console.log(result)
			res.send(result);
		});
}

exports.getBookmarkById = function(req, res) {
	var id = req.params.id
	var query = Bookmark.findById(id);
	query.exec(function(err, result){
			res.send(result);
		});
}

exports.deleteBookmarkById = function(req, res) {
	var id = req.params.id
	var query = Bookmark.findByIdAndRemove(id);
	query.exec(function(err, result){
			res.send(result);
		});
}