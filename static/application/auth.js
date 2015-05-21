//AUTH MODULE FOR REPETITOR


$(function(){
      //добавляем csrf_token в запросы
	Backbone._sync = Backbone.sync;
	Backbone.sync = function(method, model, options) {
	  //from django docs
	  function getCookie(name) {
	      var cookieValue = null;
	      if (document.cookie && document.cookie != '') {
	          var cookies = document.cookie.split(';');
	          for (var i = 0; i < cookies.length; i++) {
	              var cookie = jQuery.trim(cookies[i]);
	              // Does this cookie string begin with the name we want?
	              if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                  break;
	              }
	          }
	      }
	      return cookieValue;
	  }
	  /* only need a token for non-get requests */
	  if (method == 'create' || method == 'update' || method == 'delete') {
	      var csrfToken = getCookie('csrftoken');

	      options.beforeSend = function(xhr){
	          xhr.setRequestHeader('X-CSRFToken', csrfToken);
	      };
	  }
	  return Backbone._sync(method, model, options);
	};

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

	App.Models.Logout = Backbone.Model.extend({
    	url: '/api/v1/auth/logout/',
	});
	console.log();

	$("#logout_btn").click(function() {
		var logout = new App.Models.Logout();
		logout.save({
			success: function(){
				console.log('красава');
			}
		});
	});

});
