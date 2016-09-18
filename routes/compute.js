var express = require('express');
var router = express.Router();

var firebase = require('firebase');
firebase.initializeApp({
  serviceAccount: process.env.COMPUTED_STYLES_DIFF_SERVICE_ACCOUNT,
  databaseURL: process.env.COMPUTED_STYLES_DIFF_DATABASE_URL
});

router.get('/', function(req, res, next) {
  firebase.database().ref('/elements/').once('value')
  .then(function(snapshot) {
    res.render('compute-index', { title: 'Express', elements: Object.keys(snapshot.val()) });
  });
});

router.get('/:tagname', function(req, res, next) {
  res.render('compute', { title: 'Express' });
});

router.post('/:tagname', function (req, res) {
  firebase.database().ref('elements/' + req.params.tagname).set(JSON.stringify(req.body))
  .then(function(val) {
    res.status(200).send('Success');
  })
  .catch(function() {
    console.log(error);
    res.status(500).send('Error:', error);
  });
});

module.exports = router;
