/*
    This view is shown when editing an existing note.
    
    Note that it uses the same template as note_new. 
    However, it behaves differently, therefore it is a different view.
    It is interesting to run a diff between note_edit and note_new
    to see what is different between these two.
 */
define(["app"], function(app){
    app.Views.NoteEdit = Backbone.View.extend({
        
        // functions to fire on events
        events: {
            "click button.save": "save"
        },

        // the constructor
        initialize: function (options) {
            this.note = options.note;
        },
        
        //When the user wants to save the note
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
            
            // we save to the server here with 
            this.note.save();
            
            // redirect back to the index
            window.location.hash = "notes/index";
        },

        // populate the html to the dom
        render: function () {
            this.$el.html(_.template($('#formTemplate').html(), this.note.toJSON()));
            this.$el.find('h2').text('Edit Note');
            return this;
        }
    });
});
