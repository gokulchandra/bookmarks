var express = require('express');
var router = express.Router();
var foldersController = require('../controller/foldersController');

router.get('/', function(req, res, next) {
  return foldersController.listFolders(req, res);
});

router.get('/:id', function(req, res, next) {
  return foldersController.getFolderById(req, res);
});

router.delete('/:id', function(req, res, next) {
  return foldersController.deleteFolderById(req, res);
});

router.post('/', function(req, res, next) {
  return foldersController.createFolder(req, res);
});

module.exports = router;