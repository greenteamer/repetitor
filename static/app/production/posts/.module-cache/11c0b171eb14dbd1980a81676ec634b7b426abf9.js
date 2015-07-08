// Input (JSX):
define(['react', 'Navigation', 'AddPost', 'cookie', 'bootstrap', 'snackbars'], function(React, Navigation, AddPost) {

    collection = [];
    current_user = {};
    console.log('start App');


    var Post = React.createClass({displayName: "Post",
        render: function(){
            return (
                React.createElement("div", {className: "col-xs-12 col-sm-6 col-md-4 col-lg-3"}, 
                    React.createElement("div", {className: "well"}, 
                        React.createElement("h3", null, this.props.model.author.username), 
                        React.createElement("p", {ref: "content"}, this.props.children)
                    )
                )
            )
        }
    });


    var PostList = React.createClass({displayName: "PostList",
        render: function () {
            items = this.props.collection.map(function (model, index) {
                return (
                    React.createElement(Post, {model: model}, 
                        model.content
                    )
                )
            });
            return (
                React.createElement("div", {className: "row"}, 
                    items
                )
            )
        }
    });


    var App = React.createClass({displayName: "App",
        getInitialState: function () {
            return {
                collection: [],
                user: {
                    username: "Незарегистрированный"
                },
                selectedIndex: 0
            }
        },
        componentDidMount: function () {
            $.ajax({
                url: 'api/v1/auth/current-user/',
                cache: false,
                success: (function (data) {
                    this.setState({
                        user: data
                    });
                    current_user = this.state.user;
                }).bind(this),
                error: (function (data) {
                    console.log(data);
                    console.log(this.state.user);
                }).bind(this)
            });
            $.ajax({
                url: '/api/v1/posts/',
                dataType: 'json',
                cache: false,
                success: (function (data) {
                    this.setState({
                        collection: data
                    });
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log('error fetchin collection');
                }).bind(this)
            });
        },
        pushData: function (data) {
            this.state.collection.push({
                content: data.content,
                author: {
                    username: this.state.user.username
                }
            });
            this.setState({
                collection: this.state.collection
            });
        },
        addPost: function (content) {
            var csrftoken = $.cookie('csrftoken');
            var new_text = content;
            $.ajax({
                url: '/api/v1/posts/',
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken
                },
                csrfmiddlewaretoken: csrftoken,
                data: {
                    content: new_text
                },
                success: (function (data) {
                    this.pushData(data);
                }).bind(this),
                error: (function () {
                    console.log('error by adding post');
                }).bind(this)
            });
        },
        loginUser: function (new_user) {
            console.log("функция loginUser в app.App получены данные с формы: ");
            var csrftoken = $.cookie('csrftoken');
            $.post(
                "api/v1/auth/login/",
                {
                    csrfmiddlewaretoken: csrftoken,
                    email: new_user.email,
                    password: new_user.pass
                },
                onAjaxSuccess
            );
            function onAjaxSuccess(data) {
                var text = "Добро пожаловать на наш сайт, Ваша почта " + data.email;
                $.snackbar({content: text});
            }
        },
        render: function () {
            return (
                React.createElement("div", {className: "app_container"}, 
                    React.createElement(Navigation, {user: this.state.user, getNewUser: this.loginUser}), 
                    React.createElement("div", {className: "container-fluid test-class"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-12, col-md-3"}
                            ), 
                            React.createElement("div", {className: "col-xs-12 col-md-9"}, 
                                React.createElement(PostList, {collection: this.state.collection})
                            )
                        )
                    ), 
                    React.createElement(AddPost, {addPost: this.addPost})
                )
            )
        }
    });


    React.render(React.createElement(App, null), document.getElementById('app'));


    return App;
});
