/*
    This view represents a note as a table row. It is directly used by note_index
    to display the collection of notes.
 */
define(["app"], function(app){
    app.Views.NoteRow = Backbone.View.extend({
        // the wrapper defaults to div, so only need to set this if you want something else
        // like in this case we are in a table so a tr
        tagName: "tr",
        // functions to fire on events
        events: {
            "click a.delete": "destroy"
        },

        // the constructor
        initialize: function (options) {
            // model is passed through
            this.model = options.note;
        },

        // populate the html to the dom
        render: function () {
            this.$el.html(_.template($('#rowTemplate').html(), this.model.toJSON()));
            return this;
        },

        // delete the model
        destroy: function (event) {
            //Prevents default event behaviour
            event.preventDefault();
            event.stopPropagation();
            
            // we would call 
            this.model.destroy();
            
            // makes a DELETE call to the server with the id of the item
            app.models.notes.remove(this.model);
            
            // then remove the object from the DOM
            this.$el.remove();
        }
    });
});
