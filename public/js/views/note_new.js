define(["app"], function(app){
	app.Views.NoteNew = Backbone.View.extend({
		// functions to fire on events
		events: {
			"click button.save": "save"
		},

		// the constructor
		initialize: function (options) {
			this.note  = options.note;
			this.notes = options.notes;
		},

		save: function (event) {
			event.stopPropagation();
			event.preventDefault();

			// update our model with values from the form
			this.note.set({
				title: this.$el.find('input[name=title]').val(),
				author: this.$el.find('input[name=author]').val(),
				description: this.$el.find('textarea[name=description]').val()
			});
			// add it to the collection
			this.notes.add(this.note);

			//This sets note's id with the actual server id
			this.note.save();

			// redirect back to the index
			window.location.hash = "notes/index";
		},

		// populate the html to the dom
		render: function () {
			this.$el.html(_.template($('#formTemplate').html(), this.note.toJSON()));
			this.$el.find('h2').text('Create New Note');
			return this;
		}
	});
});
