var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(io){
	router.get('/', function (req, res) {
	  var tweets = tweetBank.list();
	  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true} );
	});

	router.get('/users/:name/:id', function(req, res) {
		var id = req.params.id;
		var name = req.params.name
		var unique = tweetBank.find( {id: id} );
		res.render( 'index', {title: 'Posted by'+name, tweets: unique} );
	});

	router.get('/users/:name', function(req, res) {
	  var name = req.params.name;
	  var list = tweetBank.find( {name: name} );
	  console.log(name);
	  
	  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm: true, namePage: true} );
	});

	router.post('/submit', urlencodedParser, function(req, res) {
	  var name = req.body.name;
	  var text = req.body.text;
	  
	  console.log(tweetBank.list());
	  io.sockets.emit('new_tweet', tweetBank[tweetBank.length-1]);

	  //tweetBank.add(name, text);
	  //res.redirect('/');
	});

	return router;
};