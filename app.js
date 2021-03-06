var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var path = require('path');
var routes = require('./routes');
var socketio = require('socket.io');
// ...
var app = express();
var server = app.listen(3000);
var io = socketio.listen(server);

swig.setDefaults({cache: false});

app.use(morgan('dev'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


/*
app.listen(3000, function() {
	console.log('server listening');
})*/



app.use(express.static(__dirname + '/public'));

app.use( '/', routes(io) );
//app.use('/', routes);