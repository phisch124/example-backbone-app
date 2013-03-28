/*
 * This is the only app router. It handles navigation and shows the proper views accordingly.
 */
define(["app"], function(app){
    app.Routers.Main = Backbone.Router.extend({

        //Defines mapping between routes and methods
        routes: {
            "note/new": "create",
            "notes/index": "index",
            "note/:id/edit": "edit",
            "note/:id/view": "show"
        },

        //Called when the router is instanciated. 
        initialize: function () {
        },
        
        
        /* --- Routing methods --- */

        create: function () {
            this.currentView = new app.Views.NoteNew({note: new app.Models.Note()});
            $('#primary-content').html(this.currentView.render().el);
        },

        edit: function (id) {
            var note = app.collections.notes.get(id);
            this.currentView = new app.Views.NoteEdit({note: note});
            $('#primary-content').html(this.currentView.render().el);
        },

        show: function (id) {
            var note = app.collections.notes.get(id);
            if(typeof(note) !== 'undefined'){
                this.currentView = new app.Views.NoteShow({note: note});
                $('#primary-content').html(this.currentView.render().el);
            } else {
                window.location.hash = '/';
            }
        },

        index: function () {
            var currentView = this.currentView;
            
            //TODO : move this piece of code
            app.collections.notes.fetch({
                success: function(coll){
                    //TODO : reusable views ?
                    currentView = new app.Views.NoteIndex();
                    $('#primary-content').html(currentView.render().el);
                },
                error: function(){
                    console.log("error");
                }
            });
        }
    });
});
