/*
    This view is the index of our note app. It displays the collection of notes 
    as a table of single note views.
 */
define(["app"], function(app){
    app.Views.NoteIndex = Backbone.View.extend({
    
        // the constructor
        initialize: function (options) {
            app.collections.notes.bind('reset', this.addAll, this);
        },

        // populate the html to the dom
        render: function () {
            this.$el.html($('#indexTemplate').html());
            this.addAll();
            return this;
        },
        
        //Adds every notes from the collection
        addAll: function () {
            // clear out the container each time you render index
            this.$el.find('tbody').children().remove();
            
            // see that we can use underscore's methods directly on a collection
            app.collections.notes.each($.proxy(this, 'addOne'));
        },
        
        //Adds one note from the collection
        addOne: function (note) {
            var view = new app.Views.NoteRow({notes: app.collections.notes, note: note});
            this.$el.find("tbody").append(view.render().el);
        }
    });
});
