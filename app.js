var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var path = require('path');
swig.setDefaults({cache: false});

var app = express();
app.use(morgan('dev'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));





var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

app.listen(3000, function() {
	console.log('server listening');
})

app.get('/', function(req, res) {
	res.render( 'index', {title: 'Hall of Fame', people: people} );
})

app.get('/newse', function(req, res) {
	res.send('Bill Gates has adopted a puppy');
})

