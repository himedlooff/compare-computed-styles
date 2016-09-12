var fs = require('fs');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('TODO: list all files in public/json');
});

router.get('/:tagname', function(req, res, next) {
  var filePath = './public/json/' + req.params.tagname + '.json';
  fs.readFile(filePath, 'utf8', function(error, data) {
    if (error) {
      console.log(error);
      res.status(500).send('Error writing to ' + filePath);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    }
  });
});

module.exports = router;
