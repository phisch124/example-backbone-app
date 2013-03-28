var express = require('express');
var app = express()
	, http = require('http')
	, server = http.createServer(app)
	, io = require('socket.io').listen(server)
	, Store = require('./store.js');
	
var store = new Store();

var port =  process.env.PORT || 5000;

app.configure(function(){
    app.set('port', port);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
	app.use(express.cookieParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
	
});


//Définition des routes
app.get('/notes/', function(req, res){
	store.get('note', function(notes){
		console.log(notes);
		res.send(notes);
	});
});

app.del('/notes/:id', function(req, res){
	store.destroy('note', req.params.id, function(){
		res.end();
	});
});

app.post('/notes/', function(req, res){
	var note = req.body;
	store.put('note', note, function(id){
		note.id = id;
		res.send(note);
	});
});

app.put('/notes/:id', function(req, res){
	var note = req.body;
	var id = note.id;
	store.set('note', id, note);
});

server.listen(app.get('port'), function() {
	console.log("server running and listening on port "+port);
});






