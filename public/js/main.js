/*
	main.js précharge toutes les dépendances 

*/


/*
 * Si on veut socket.io, il faut configurer la lib
 * 
 * requirejs.config({
 * 		paths: {
 * 			'socket.io': '../../socket.io/socket.io'
 * 		}
 * });
*/

require([
	"jquery",
	// "socket.io",
	"lib/underscore",
	"lib/backbone",
	"models/note_model",
	"views/note_index",
	"views/note_row",
	"views/note_new",
	"views/note_edit",
	"views/note_show",
	"note_router",
	"app"],
	function($) {
		//Toutes les dépendences ont été chargées
		$(function() {
			//Initialisation de l'application
			app.init();
		});
});