/*global APP:true, _:true, jQuery:true, Backbone:true, JST:true, $:true*/
/*jslint browser: true, white: false, vars: true, devel: true, bitwise: true, debug: true, nomen: true, sloppy: false, indent: 2*/

(function () {
  "use strict";
  window.APP = window.APP || {Routers: {}, Collections: {}, Models: {}, Views: {}};
  APP.Views.NoteRowView = Backbone.View.extend({
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
      this.notes = options.notes;
    },

    // populate the html to the dom
    render: function () {
      this.$el.html(_.template($('#rowTemplate').html(), this.model.toJSON()));
      return this;
    },

    // delete the model
    destroy: function (event) {
      event.preventDefault();
      event.stopPropagation();
      // we would call 
      this.model.destroy();
      // which would make a DELETE call to the server with the id of the item
      this.notes.remove(this.model);
      this.$el.remove();
    }
  });
}());