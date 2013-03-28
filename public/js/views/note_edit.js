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
            
            /* We show that the data is being processed with a loader and avoir 
            double click by setting disabled attr on the save button. */
            this.error.hide();
            this.saveButton.attr('disabled', 'disabled');
            this.loader.show();
            
            // We store this locally for use in the callback
            var _this = this;
            
            // Saves the note to the server
            this.note.save({},{
                success: function(){
                    // redirect back to the index
                    window.location.hash = "notes/index";
                },
                error: function(){
                    _this.loader.hide();
                    _this.error.show();
                    _this.saveButton.removeAttr('disabled', '');
                }
            });
        },

        // populate the html to the dom
        render: function () {
            this.$el.html(_.template($('#formTemplate').html(), this.note.toJSON()));
            this.$el.find('h2').text('Edit Note');
            
            // We retreive interesting elements from the rendered content
            this.loader = this.$el.find('.loader');
            this.error = this.$el.find('.error');
            this.saveButton = this.$el.find('.save');
            return this;
        }
    });
});
