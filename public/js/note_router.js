/*global APP:true, _:true, jQuery:true, Backbone:true, JST:true, $:true*/
/*jslint browser: true, white: false, vars: true, devel: true, bitwise: true, debug: true, nomen: true, sloppy: false, indent: 2*/

(function () {
  "use strict";
  window.APP = window.APP || {Routers: {}, Collections: {}, Models: {}, Views: {}};
  APP.Routers.NoteRouter = Backbone.Router.extend({
    
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
      this.currentView = new APP.Views.NoteNewView({notes: this.notes, note: new APP.Models.NoteModel()});
      $('#primary-content').html(this.currentView.render().el);
    },

    edit: function (id) {
      var note = this.notes.get(id);
      this.currentView = new APP.Views.NoteEditView({note: note});
      $('#primary-content').html(this.currentView.render().el);
    },

    show: function (id) {
      var note = this.notes.get(id);
      this.currentView = new APP.Views.NoteShowView({note: note});
      $('#primary-content').html(this.currentView.render().el);
    },

    index: function () {
		var currentView = this.currentView;


		this.notes.fetch({
			success: function(coll){
				currentView = new APP.Views.NoteIndexView({notes: coll});
				$('#primary-content').html(currentView.render().el);
			},
			error: function(){
				console.log("error");
			}
		});
		// to pull down the index json response to populate our collection initially
    }
  });
}());
