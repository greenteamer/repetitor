(function (window){

	'use strict';

	var PostApp = {
		Models: {},
		Collections: {},
		Views: {},
		Constants: {
			apiUrl: '/api/v1/posts/',
			apiKey: '4cLJd234l243ljradf3Iy43lOU23fsdlf3' // пока не понятно зачем это, но догадываюсь =) )
		}		
	};

	PostApp.Models.Post = Backbone.Model.extend({});

	PostApp.Collections.Post = Backbone.Collection.extend({
		model: PostApp.Models.Post,
		url: PostApp.Constants.apiUrl
	});

	window.PostApp = PostApp;

})(window);