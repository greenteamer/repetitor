// РЕНДЕРИМ ГЛАВНУЮ СТРАНИЦУ


$(function (){

    var MyApp = Marionette.Application.extend({
      initialize: function(options) {
        console.log('инициализация');
      }
    });

    var myApp = new MyApp({container: '#app'});

    myApp.on("before:start", function(options){
        this.options.moreData = "Опции до старта!"
    });


    //var RouterController = {
        //doFoo: function(){
            //console.log('ok controller router');
        //},
        //doBar: function(){
            //console.log('ok ok c r');
        //}
    //};




    // РАБОТА С РОУТЕРОМ
    //EventAggregator
    //myApp.MyVent = new Marionette.EventAggregator();
    //
    //
    //myApp.MyVent.on('index', function(){
    //  console.log('home received by MyVent!');
    //  //startHome();
    //  console.log('after starthome on myvent');
    //});
    //myApp.MyVent.on('routing:started', function(){
    //  console.log('routing:started recieved at MyVent!');
    //  if( ! Backbone.History.started) Backbone.history.start();
    //  console.log('Backbone.history sucessfully started!');
    //});
    //
    //
    ////Controller
    //myApp.MyController = {
    //  homeMethods:function(){
    //    console.log('home receieved at mycontroller');
    //    myApp.MyVent.trigger('index')
    //  }
    //};
    //
    //
    ////Router
    //myApp.MyRouter = Marionette.AppRouter.extend({
    //  controller: myApp.MyController,
    //  routes: {
    //    '' : 'homeMethods'
    //  }
    //});




    myApp.on("start", function(options){
      if (!Backbone.history){
        this.options.something = options.something;
        this.options.another = options.another;

        //пытаемся подключить роутер к приложению
        //var MyRouter = new Marionette.AppRouter({
          //controller: RouterController,
          //appRoutes: {
            //"foo": "doFoo",
            //"bar/:id": "doBar"
          //}
        //});


        //router.appRoute("/foo", "fooThat");
        window.router = new myApp.UserRouter();
        Backbone.history.start();
        //console.log('backbone history');
      } else {
        window.router = new myApp.UserRouter();
        console.log('backbone history');    
        this.options.something = options.something;
        this.options.another = options.another;
      }
    });

    myApp.UserRouter = Backbone.Router.extend({
        routes: {
            "users": "listUsers"
        },
        listUsers : function(){
            console.log("this is router");
        }
    });


    var options = {
      something: "some value",
      another: "#some-selector"
    };

    myApp.start(options);
    
    var RootView = Marionette.LayoutView.extend({
        el: 'body'
    });

    myApp.rootView = new RootView();

    myApp.addRegions({
        contentRegion: "#content",
        topMenuRegion: "#top-menu",
        sidebarRegion: "#sidebar"
    });

    var r_content = myApp.getRegion("contentRegion");
    //var r_content_again = myApp.r_content;



    // RENDER КОЛЛЕКЦИИ ПОСТОВ 
    // работаем с данными

    myApp.post = Backbone.Model.extend({});

    myApp.collection = Backbone.Collection.extend({
        model: myApp.post,
        url: "/api/v1/posts/"
    });

    var my_template_html = _.template("<div class='well'>Содержание: <%= content %> </div>");
    var PostDetail = Backbone.View.extend({
        tagName: 'div',
        className: 'col-xs-12 col-sm-6 col-md-4 col-lg-3',
        template:  my_template_html,
        initialize: function(){
            this.render();
        },
        render: function(){
            this.$el.html( this.template(this.model.toJSON()));         
        }
    });
    var collection = new myApp.collection();
    collection.fetch({
        success: function () {
            console.log('fetchin done');
        },
        error: function () {
            console.log('fetchin failed');
        }
    });
    var CollectionView = Marionette.CollectionView.extend({
        collection: collection,
        childView: PostDetail
    });

    // создаем и показываем наш регион с отрендеренной коллекцией
    r_content.show(new CollectionView());

 });
    



    
