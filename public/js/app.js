define(function(){

	return window.app = {	
		// Classes
		Collections: {},
		Models: {},
		Views: {},
		
		// Instances
		collections: {},
		models: {},
		views: {},
		
		init: function () {
			// Initialisation de l'application ici
			console.log('app init');
			
			//Démarrage de la connection par socket.io
			//this.socket = io.connect(window.location.protocol+'//'+window.location.host);
			
			//Instanciation des collections
			this.collections.notes = new this.Collections.Notes();
			
			var router = new this.Router({notes: this.collections.notes});
			
			Backbone.history.start();
			
			//TODO : données par défaut côté serveur
			
			this.collections.notes.fetch();
			// we manually pass in the initial data, but this would be called with a collection.fetch() normally
			/*
			notes.reset([
                  {
                    "title": "Example Note 1",
                    "id": "45",
                    "author": "David Morrow",
                    "description": "Pinterest biodiesel excepteur, ad etsy gluten-free semiotics ennui before they sold out irony ut deserunt jean shorts. Dreamcatcher synth echo park assumenda aute. Street art +1 lomo raw denim, DIY fanny pack wayfarers butcher typewriter banh mi in pitchfork mumblecore eiusmod. Pop-up single-origin coffee cosby sweater flexitarian. Fugiat sustainable irony thundercats flexitarian aliquip. Butcher assumenda fugiat aute bespoke ea, magna consectetur duis est viral salvia excepteur. Ea four loko ad brooklyn mumblecore.\n\nPBR small batch direct trade ea. Cosby sweater reprehenderit high life put a bird on it banksy sunt. Shoreditch minim deserunt accusamus, portland four loko bushwick nulla. +1 nulla do pariatur post-ironic nostrud food truck sustainable. Adipisicing direct trade tofu etsy williamsburg, eiusmod cupidatat ut. Jean shorts fixie mlkshk brunch. Ad yr sapiente laborum."
                  },
                  {
                    "title": "Example Note 2",
                    "id": "48",
                    "author": "David Morrow",
                    "description": "Fixie synth quinoa umami single-origin coffee master cleanse sartorial typewriter bushwick ennui readymade, lomo trust fund. Shoreditch direct trade fap cray high life swag, viral cred lo-fi locavore fingerstache wayfarers freegan. Post-ironic gentrify swag, vegan raw denim beard letterpress lomo portland vice gastropub echo park brunch kogi ethnic. Cray truffaut freegan fingerstache craft beer readymade. Sartorial small batch VHS lomo, freegan mcsweeney's butcher williamsburg etsy leggings sustainable tofu. Four loko terry richardson narwhal, fixie beard fanny pack fap ennui umami sustainable readymade iphone. Bushwick keffiyeh street art, next level small batch skateboard you probably haven't heard of them occupy cray cosby sweater.\n\nFap ethnic before they sold out, 3 wolf moon narwhal iphone whatever messenger bag irony master cleanse gastropub umami godard next level high life. Fingerstache narwhal sustainable, yr freegan vegan pitchfork art party small batch raw denim helvetica scenester cred. Occupy carles fap, vegan high life pitchfork readymade tattooed wayfarers VHS bushwick. Gastropub sriracha occupy, semiotics direct trade terry richardson cardigan raw denim wes anderson. Etsy ennui mcsweeney's, put a bird on it blog terry richardson fanny pack messenger bag mustache you probably haven't heard of them bushwick sartorial iphone kogi fap. Aesthetic letterpress artisan selvage, williamsburg tumblr banksy typewriter vice salvia blog. Typewriter mixtape cray trust fund, truffaut retro polaroid forage."
                  },
                  {
                    "title": "Example Note 3",
                    "id": "52",
                    "author": "David Morrow",
                    "description": "You probably haven't heard of them keffiyeh lo-fi, yr bespoke selvage cray polaroid beard. Tofu messenger bag sustainable gastropub, gentrify lomo godard PBR echo park fap yr. Small batch truffaut swag forage tofu shoreditch street art helvetica. Hella helvetica fixie godard forage art party lo-fi. Street art gluten-free keffiyeh, chillwave whatever synth gastropub fap williamsburg locavore organic godard. Mlkshk authentic raw denim aesthetic, keytar trust fund hella godard scenester DIY skateboard whatever pork belly Austin. Keffiyeh forage wes anderson, viral farm-to-table iphone wayfarers messenger bag marfa bushwick bicycle rights banh mi fixie selvage."
                  }
                ]
			);
			*/
		}
	};
});