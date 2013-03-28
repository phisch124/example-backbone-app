/* app.js defines the app object containing every constructors and 
 * every main models, collections and views.
 */

//It does not require any thing
define(function(){

    return window.app = {    
        // Classes
        Collections: {},
        Models: {},
        Views: {},
        Routers: {},
        
        // Instances
        collections: {},
        models: {},
        views: {},
        
        init: function () {
            // Initialize the application here
            
            //We would start a socket.io connection here
            //this.socket = io.connect('//'+window.location.host);
            
            //Every main collection should be created here.
            this.collections.notes = new this.Collections.Notes();
            
            /* If your app has some models that does not belong to any 
            collection, you should instanciate them here too. */
            
            //We create the routers
            var router = new this.Routers.Main();
            
            /* When starting the history, if a route has been found for current hash, 
                start() returns true. Otherwise, we redirect user to the index. */
            if(!Backbone.history.start()){
                window.location.hash = '/notes/index';
            }
        }
    };
});