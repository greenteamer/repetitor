// РЕНДЕРИМ ГЛАВНУЮ СТРАНИЦУ


(function (window){

    // работаем с данными
    var PostApp = window.PostApp;
    var collection = new PostApp.Collections.Post();



    PostApp.Views.Post = React.createClass({
        // mixins: [Backbone.React.Component.mixin],  
        getInitialState: function () {
          return {collection: collection}
        },
        actionChangeContent: function(e){  
            e.preventDefault();
            var new_text = React.findDOMNode(this.refs.content).innerHTML;
            console.log(new_text);
        },         
        render: function () {
            return (
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="well" onClick={this.actionChangeContent}>
                        <h3>{this.props.model.author.username}</h3>
                        <p ref="content">{this.props.children}</p>      
                    </div>
                </div>
            )
        }
    });

    PostApp.Views.PostList = React.createClass({
        render: function (){
            var items = this.props.collection.map(function(model){
                return (
                    <PostApp.Views.Post model={model}>
                        {model.content}
                    </PostApp.Views.Post>
                )
            });
            return (                
                <div className="row">
                    {items}
                </div>
            )
        }
    });

   


    PostApp.Views.App = React.createClass({
        getInitialState: function() {
            // Задаем начальное состояние 
            // для коллекции и для пользователя
            return ({collection: [], user: {}});
        },
        componentDidMount: function() {
            // Меняем состояние на актульное с сервера
            // когда компонент замаунтился
            // 1 запрос получает текущего пользователя 
            // 2 запрос получиает все посты 
            // при каждом запросе мы устанавливаем новое состояние , при этом
            // компонент перерендеривается
            $.ajax({
                url: 'api/v1/auth/current-user/',
                cache: false,
                success: function(data) {                    
                    this.setState({ user: data });
                    console.log(this.state.user);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });        
            $.ajax({
                url: '/api/v1/posts/',
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({ collection: data });
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        pushData: function(data) {
            // Запушиваем новый пост в нашу коллецию и 
            // и устанавливем новое состоние
            this.state.collection.push({
                content: data.content,
                author: {
                    username: this.state.user.username,
                }
            });            
            this.setState({collection: this.state.collection});
        },
        addPost: function() {            
            // POST запрос на созадние нового поста в базе данных и 
            // и вызов метода pushData при успешном запросе
            // переменную new_text мы берем из формы модального окна
            var csrftoken = $.cookie('csrftoken');
            var new_text = this.refs.input.getDOMNode().value;
            $.ajax({
                url: '/api/v1/posts/',
                method: 'POST',
                headers: { "X-CSRFToken": csrftoken },
                csrfmiddlewaretoken: csrftoken,
                data: { content : new_text },
                success: function(data) {
                    this.pushData(data);
                    console.log('success');
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                }.bind(this)
            });            
        },        
        render: function(){            
            return (
                <div className="posts_box">
                    // вызываем компонент PostApp.Views.PostList и 
                    // передаем в него нашу коллецию в текущем состоянии
                    <PostApp.Views.PostList collection={this.state.collection} /> 

                    <div id="complete-dialog" className="modal fade" tabindex="-1">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 className="modal-title">Dialog</h4>
                          </div>
                          <div className="modal-body">
                            <input ref="input" id="input_content" type="text" className="form-control" placeholder="label" />
                          </div>
                          <div className="modal-footer">
                            <button className="btn btn-primary" data-dismiss="modal" >Dismiss</button>
                            <button className="btn btn-primary" onClick={this.addPost} data-dismiss="modal">Save</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button id="test_btn" className="btn btn-primary btn-fab btn-raised mdi-content-add btn-add-new-post" href="" data-toggle="modal" data-target="#complete-dialog"></button>                                                    
                </div>                
            )
        }
    });
    
    
    React.render(<PostApp.Views.App />, document.getElementById('posts'));    

    window.PostApp = PostApp;

 })(window);
    



    
