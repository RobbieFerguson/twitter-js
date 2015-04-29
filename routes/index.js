var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
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
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list } );
});


module.exports = router;