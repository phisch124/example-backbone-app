define(["app"], function(app){
	app.Router = Backbone.Router.extend({

		//Defines mapping between routes and methods
		routes: {
			"note/new": "create",
			"notes/index": "index",
			"note/:id/edit": "edit",
			"note/:id/view": "show"
		},

		initialize: function (options) {
			this.notes = options.notes;
			this.index();
		},

		/* Routing methods */

		create: function () {
			this.currentView = new app.Views.NoteNew({notes: this.notes, note: new app.Models.Note()});
			$('#primary-content').html(this.currentView.render().el);
		},

		edit: function (id) {
			var note = this.notes.get(id);
			this.currentView = new app.Views.NoteEdit({note: note});
			$('#primary-content').html(this.currentView.render().el);
		},

		show: function (id) {
			var note = this.notes.get(id);
			this.currentView = new app.Views.NoteShow({note: note});
			$('#primary-content').html(this.currentView.render().el);
		},

		index: function () {
			var currentView = this.currentView;
			
			//TODO : déplacer ce bout de code
			this.notes.fetch({
				success: function(coll){
					currentView = new app.Views.NoteIndex({notes: coll});
					$('#primary-content').html(currentView.render().el);
				},
				error: function(){
					console.log("error");
				}
			});
		}
	});
});
