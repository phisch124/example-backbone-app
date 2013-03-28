/*
    This view is the simplest since it does not modify the model.
    It just renders the contents of a note with a template.
 */
define(["app"], function(app){
    app.Views.NoteShow = Backbone.View.extend({
        // the constructor
        initialize: function (options) {
            this.note = options.note;
        },

        // populate the html to the dom
        render: function () {
            this.$el.html(_.template($('#showTemplate').html(), this.note.toJSON()));
            return this;
        }
    });
});
