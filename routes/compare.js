var fs = require('fs');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('TODO: ?');
});

router.get('/:ids', function(req, res, next) {
  var id1 = req.params.ids.split('...')[0];
  var id2 = req.params.ids.split('...')[1];
  var file1Path = './public/ids/' + id1 + '.json';
  var file2Path = './public/ids/' + id2 + '.json';
  var file1Done = false;
  var file2Done = false;
  var file1;
  var file2;
  console.log(id1, id2);
  fs.readFile(file1Path, 'utf8', function(error, data) {
    if (error) {
      console.log(error);
      res.status(500).send('Error getting ' + file1Path);
    } else {
      file1 = data;
      file1Done = true;
      checkIfDone();
    }
  });
  fs.readFile(file2Path, 'utf8', function(error, data) {
    if (error) {
      console.log(error);
      res.status(500).send('Error getting ' + file2Path);
    } else {
      file2 = data;
      file2Done = true;
      checkIfDone();
    }
  });
  function checkIfDone() {
    if (file1Done && file2Done) {
      res.render('compare', { title: 'Express', file1: file1, file2: file2 });
    }
  }
});

module.exports = router;
