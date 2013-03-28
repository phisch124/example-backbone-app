/*
 * main.js is the only file explicitly loaded by require (see index.html)
 * It will load every main classes needed by app to initialize.
 * One doesn't need to specify here sub-dependencies.
*/


/*
 * requirejs.config() allows you to configure some stuff. See the doc for further details.
 * the value paths allows you to define aliases for some js files.
 * For example, here socket.io has a complex path and using this config
 * allows us to just require "socket.io" instead of "/socket.io/socket.io"
 */
 
//we would uncomment next line if we wanted to use socket.io
/*
requirejs.config({
    paths: {
        'socket.io': '/socket.io/socket.io'
    }
});
//*/

require([
    "jquery",
    // "socket.io",        //socket.io is not used in this example
    "lib/underscore",
    "lib/backbone",
    "models/note_model",
    "views/note_index",
    "views/note_row",
    "views/note_new",
    "views/note_edit",
    "views/note_show",
    "note_router",
    "app"],
    
    /*
        The arguments of the callback function are the required objects 
        in the same order as in the list above. Therefore, we retreive jquery
        first, then the app object.
    */
    function($) {
    
        /* We can still use jquery to make sure the dom is completely loaded even though
            it's very unlikely it isn't already loaded. */
        $(function() {
            //Initializing app
            app.init();
        });
});