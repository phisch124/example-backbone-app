/*global APP:true, _:true, jQuery:true, Backbone:true, JST:true, $:true*/
/*jslint browser: true, white: false, vars: true, devel: true, bitwise: true, debug: true, nomen: true, sloppy: false, indent: 2*/

(function () {
  "use strict";

  window.APP = APP || {Routers: {}, Collections: {}, Models: {}, Views: {}};
  APP.Models.NoteModel = Backbone.Model.extend({
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
  
  // define the collection in the same file
  window.APP.Collections = window.APP.Collections || {};
  
  //Creation of Note's collection
  window.APP.Collections.NoteCollection = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: APP.Models.NoteModel,
	
	url: '/notes/'
  });
  
}());
