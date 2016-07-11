var express = require('express');
var router = express.Router();
var bookmarksController = require('../controller/bookmarksController');

router.get('/', function(req, res, next) {
  return bookmarksController.listBookmarks(req, res);
});

router.get('/:id', function(req, res, next) {
  return bookmarksController.getBookmarkById(req, res);
});

router.delete('/:id', function(req, res, next) {
  return bookmarksController.deleteBookmarkById(req, res);
});

router.post('/', function(req, res, next) {
  return bookmarksController.createBookmark(req, res);
});

router.put('/:bookmark/folders/:folder', function(req, res, next) {
  return bookmarksController.assignBookmarkToFolder(req, res);
});

module.exports = router;
