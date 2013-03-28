/*
    This node server serves the static files and provides a CRUD interface
    used by backbone to store and retreive data.
    
    The store used here is non persistent so all the data will be lost when
    the server shuts down. However, if you wanted to store data into a database,
    you would just have to modify the store and this part of the code would remain intact.
 */


// We require every dependencies
var express = require('express');
var app = express()
    , http = require('http')
    , server = http.createServer(app)
    // , io = require('socket.io').listen(server) //Is what we would to to use socket.io
    , Store = require('./store.js');
   
// We get the app port through configuration variables or use the default 5000
var port =  process.env.PORT || 5000;

// The store will hold every notes in memory
var store = new Store();

//Some express configuration
app.configure(function(){
    app.set('port', port);              // Using the port defined above
    app.use(express.logger('dev'));     // Setting log output level to 'dev' (chatty)
    
    // This middleware parses the body of a post request (see "creating a new note" below)
    app.use(express.bodyParser());
    
    // We do not use cookies in this app but don't forget to use this middleware if you do !
    // app.use(express.cookieParser());
    
    // This will route requests to our CRUD interface defined below
    app.use(app.router);
    
    //Finally, we serve static files
    app.use(express.static(__dirname + '/public'));
    
});


/*** Routes definition (CRUD interface) ***/

// Returns the whole collection of notes
app.get('/notes/', function(req, res){
    store.get('note', function(notes){
        res.send(notes);
    });
});

// Deletes the note with the specified id
app.del('/notes/:id', function(req, res){
    store.destroy('note', req.params.id, function(){
        res.end();
    });
});

/* Creates a new note with contents from the request's body
    and returns the new note's id so that backbone will know
    how to make subsequent requests regarding this note.
 */
app.post('/notes/', function(req, res){
    var note = req.body;
    store.put('note', note, function(id){
        //We set the id field of the note now that we know it
        note.id = id;
        //And send it to the client
        res.send({id : id});
    });
});

// Sets the contents of an existing note
app.put('/notes/:id', function(req, res){
    var note = req.body;
    var id = note.id;
    
    //We do not specify a callback since we don't care wether saving was successful
    //TODO : care about the saving
    store.set('note', id, note);
    
    // Don't forget to terminate a request or it will stay "pending" for a long time
    res.end();
});


//We can now start listening for incomming connections
server.listen(app.get('port'), function() {
    console.log("server running and listening on port "+port);
});


/* Finally, we fill the store with example data. I put it at the end of the file 
    because you wouldn't normally have such a piece of code in your project
 */
(function(){
    var notes = [
        {
            "title": "Example Note 1",
            "author": "David Morrow",
            "description": "Pinterest biodiesel excepteur, ad etsy gluten-free semiotics ennui before they sold out irony ut deserunt jean shorts. Dreamcatcher synth echo park assumenda aute. Street art +1 lomo raw denim, DIY fanny pack wayfarers butcher typewriter banh mi in pitchfork mumblecore eiusmod. Pop-up single-origin coffee cosby sweater flexitarian. Fugiat sustainable irony thundercats flexitarian aliquip. Butcher assumenda fugiat aute bespoke ea, magna consectetur duis est viral salvia excepteur. Ea four loko ad brooklyn mumblecore.\n\nPBR small batch direct trade ea. Cosby sweater reprehenderit high life put a bird on it banksy sunt. Shoreditch minim deserunt accusamus, portland four loko bushwick nulla. +1 nulla do pariatur post-ironic nostrud food truck sustainable. Adipisicing direct trade tofu etsy williamsburg, eiusmod cupidatat ut. Jean shorts fixie mlkshk brunch. Ad yr sapiente laborum."
        },
        {
            "title": "Example Note 2",
            "author": "David Morrow",
            "description": "Fixie synth quinoa umami single-origin coffee master cleanse sartorial typewriter bushwick ennui readymade, lomo trust fund. Shoreditch direct trade fap cray high life swag, viral cred lo-fi locavore fingerstache wayfarers freegan. Post-ironic gentrify swag, vegan raw denim beard letterpress lomo portland vice gastropub echo park brunch kogi ethnic. Cray truffaut freegan fingerstache craft beer readymade. Sartorial small batch VHS lomo, freegan mcsweeney's butcher williamsburg etsy leggings sustainable tofu. Four loko terry richardson narwhal, fixie beard fanny pack fap ennui umami sustainable readymade iphone. Bushwick keffiyeh street art, next level small batch skateboard you probably haven't heard of them occupy cray cosby sweater.\n\nFap ethnic before they sold out, 3 wolf moon narwhal iphone whatever messenger bag irony master cleanse gastropub umami godard next level high life. Fingerstache narwhal sustainable, yr freegan vegan pitchfork art party small batch raw denim helvetica scenester cred. Occupy carles fap, vegan high life pitchfork readymade tattooed wayfarers VHS bushwick. Gastropub sriracha occupy, semiotics direct trade terry richardson cardigan raw denim wes anderson. Etsy ennui mcsweeney's, put a bird on it blog terry richardson fanny pack messenger bag mustache you probably haven't heard of them bushwick sartorial iphone kogi fap. Aesthetic letterpress artisan selvage, williamsburg tumblr banksy typewriter vice salvia blog. Typewriter mixtape cray trust fund, truffaut retro polaroid forage."
        },
        {
            "title": "Example Note 3",
            "author": "David Morrow",
            "description": "You probably haven't heard of them keffiyeh lo-fi, yr bespoke selvage cray polaroid beard. Tofu messenger bag sustainable gastropub, gentrify lomo godard PBR echo park fap yr. Small batch truffaut swag forage tofu shoreditch street art helvetica. Hella helvetica fixie godard forage art party lo-fi. Street art gluten-free keffiyeh, chillwave whatever synth gastropub fap williamsburg locavore organic godard. Mlkshk authentic raw denim aesthetic, keytar trust fund hella godard scenester DIY skateboard whatever pork belly Austin. Keffiyeh forage wes anderson, viral farm-to-table iphone wayfarers messenger bag marfa bushwick bicycle rights banh mi fixie selvage."
        }
    ];
    
    for(var i in notes){
        store.put('note', notes[i], (function(i){
            return function(id){
                notes[i].id = id;
            };
        }(i)));
    }
}());


