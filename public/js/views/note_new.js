/*
    This view is shown when creating a new note.
    
    Note that it uses the same template as note_edit.
    However, it behaves differently, therefore it is a different view.
    It is interesting to run a diff between note_edit and note_new
    to see what is different between these two.
 */
define(["app"], function(app){
    app.Views.NoteNew = Backbone.View.extend({
    
        // functions to fire on events
        events: {
            "click button.save": "save"
        },

        // the constructor
        initialize: function (options) {
            this.note = options.note;
        },
        
        //When the user wants to save the new note
        save: function (event) {
            //Prevents default event behaviour
            event.stopPropagation();
            event.preventDefault();

            // update our model with values from the form
            this.note.set({
                title: this.$el.find('input[name=title]').val(),
                author: this.$el.find('input[name=author]').val(),
                description: this.$el.find('textarea[name=description]').val()
            });
            
            // add it to the collection
            app.collections.notes.add(this.note);

            //This sets note's id with the actual server id
            this.note.save({},{
                success: function(){
                        // redirect back to the index
                        window.location.hash = "notes/index";
                    }
                },
                error: function(){
                    //TODO
                });
        },

        // populate the html to the dom
        render: function () {
            this.$el.html(_.template($('#formTemplate').html(), this.note.toJSON()));
            this.$el.find('h2').text('Create New Note');
            return this;
        }
    });
});
