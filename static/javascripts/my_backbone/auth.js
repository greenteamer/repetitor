

$(function(){

	var App = {
		Models: {},
		Collections: {},
		Views: {},
		Routers: {}
	}

    App.Models.Auth = Backbone.Model.extend({
    	url: '/api/v1/auth/login/',
	    schema: {
	        email:      { validators: ['required', 'email'] },
	        password: { validators: [
		        { type: 'match', field: 'passwordConfirm', message: 'Passwords must match!' }
		    ] }
	    }
	});

	App.Routers.Auth = Backbone.Router.extend({
	    routes: {
	        'first-route': 'first',
	        'second-route': 'second'
	    },
	    first: function() {
	    	alert('logged');
	    }
	    // ...
	});

	var user = new App.Models.Auth();



	var form = new Backbone.Form({
	    model: user
	    // template: _.template($('#template').html())	    
	}).render();

	 form.on('email:change', function(form, emailEditor, extra) {
	      console.log('Email changed to "' + emailEditor.getValue() + '".');
	      user.set("email", emailEditor.getValue());
	  });

	 form.on('password:change', function(form, passwordEditor, extra) {
	      console.log('Password changed to "' + passwordEditor.getValue() + '".');
	      user.set('password', passwordEditor.getValue());	
	  });

	$('.modal-body').append(form.el);
	$('input').addClass('form-control');
	$('input').attr('id', 'focusedInput');


	$('#login-btn').click(function(){
		// console.log('btn work');
		user.save({
			success: function(){
				window.location.hash = 'first';
			}
		});
	});

	$("#login_btn").click(function() {
		$("#login-dialog").modal();
	});

});