var fs = require('fs');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('TODO: list all id\'s');
});

router.post('/:id', function(req, res, next) {
  var filePath = './public/ids/' + req.params.id + '.json';
  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), function(error) {
    if (error) {
      console.log(error);
      res.status(500).send('Error writing to ' + filePath);
    } else {
      res.status(200).send('Success writing to ' + filePath);
    }
  });
});

module.exports = router;
