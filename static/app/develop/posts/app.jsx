// Input (JSX):
define(['react', 'Navigation', 'AddPost', 'AppActions', 'AppStore', 'cookie', 'bootstrap', 'snackbars'], function(React, Navigation, AddPost, AppActions, AppStore) {

    var collection = [];
    var current_user = {};


    var Post = React.createClass({
        render: function(){
            return (
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="well">
                        <h3>{this.props.model.author.username}</h3>
                        <p ref="content">{this.props.children}</p>
                    </div>
                </div>
            )
        }
    });


    var PostList = React.createClass({
        render: function () {
            items = this.props.collection.map(function (model, index) {
                return (
                    <Post model={model}>
                        {model.content}
                    </Post>
                )
            });
            return (
                <div className="row">
                    {items}
                </div>
            )
        }
    });


    var App = React.createClass({
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

            AppActions.getCurrentUser();

            AppStore.bind( 'change', this.userChanged );

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
        componentWillUnmount: function () {
            AppStore.unbind( 'change', this.userChanged );
        },
        userChanged: function () {
            this.setState({
                user: AppStore.user
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
        render: function () {
            return (
                <div className="app_container">
                    <Navigation user={this.state.user} />
                    <div className="container-fluid test-class">
                        <div className="row">
                            <div className="col-xs-12, col-md-3">
                            </div>
                            <div className="col-xs-12 col-md-9">
                                <PostList collection={this.state.collection} />
                            </div>
                        </div>
                    </div>
                    <AddPost addPost={this.addPost} />
                </div>
            )
        }
    });


    React.render(<App/>, document.getElementById('app'));


    return App;
});
