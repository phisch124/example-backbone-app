define(["app"], function(app){
	app.Models.Note = Backbone.Model.extend({
		// the root of the post params
		paramRoot: "note",
		// the default fields
		defaults: {
			title: "Untitled",
			description: "",
			author: "Annonymus"
		},
		// the constructor
		initialize: function (options) {
		}
	});
	
	//Creation of Note's collection
	app.Collections.Notes = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Models.Note,

		url: '/notes/'
	});
});
