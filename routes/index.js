var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })




router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true} );
});

router.get('/users/:name/:id', function(req, res) {
	var id = req.params.id;
	var name = req.params.name
	console.log(id);
	var unique = tweetBank.find( {id: id} );
	res.render( 'index', {title: 'Posted by'+name, tweets: unique} );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm: true, namePage: true} );
});

router.post('/submit', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body);
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = router;