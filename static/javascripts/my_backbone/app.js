

$(function(){

	var App = {
		Models: {},
		Collections: {},
		Views: {}
	}

	// декларируем классы
    App.Models.Post = Backbone.Model.extend({});
    App.Views.Post = Backbone.View.extend({
        render: function () {
            return this;
        }
    });
    App.Collections.Post = Backbone.Collection.extend({
        model: App.Models.Post,
        url: '/api/v1/posts/'
    });

	
	//создаем вьюхи
	// PostDetail вызывается каждую итерацию в цыкле render Views.PostList
    App.Views.PostDetail = Backbone.View.extend({
    	tagName: 'div',
    	className: 'col-xs-12 col-sm-6 col-md-4 col-lg-3',
    	template:  _.template("<div class='well'>Содержание: <%= content %> </div>"),
    	initialize: function(){
    		this.render();
    	},
    	render: function(){
    		this.$el.html( this.template(this.model.toJSON()));    		
    	}
    });
    App.Views.PostList = Backbone.View.extend({
    	tagName: 'div',
    	className: 'row',
    	initialize: function(){
    		this.render();
    	},  	
		render: function(){
			posts.each(function(post){  //цыкл по коллекции
				var tmp_detail_view = new App.Views.PostDetail({model: post});
				this.$el.append(tmp_detail_view.el); // adding all the post objects.
			}, this);
		}
    });

    // Вся движуха начинается здесь после срабатывания success, то есть когда данные с сервера получены
    var posts = new App.Collections.Post();
    posts.fetch({
    	success: function () {
    		var list_view = new App.Views.PostList();  //при инициализации PostList вызывается его метод render
    		$('.backbone').html(list_view.el);  // результат рендера вьюхи PostList кладем в див '.backbone'
    	},
    	error: function(){
    		console.log('fetch collection error');
    	}
    });


    

    

});
    