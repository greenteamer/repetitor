// Input (JSX)

var React = require('react');
var $ = require('jquery');
var Cookies = require('js-cookie');
var Notification = require('react-notification');
// var RaisedButton = require('material-ui/lib/raised-button');
// var AppBar = require('material-ui/lib/app-bar');
// var ThemeManager = require('material-ui/lib/styles/theme-manager')();
// var Colors = require('material-ui/lib/styles/colors');
// var injectTapEventPlugin = require("react-tap-event-plugin");

var Navigation = require('../navigation/NavigationView.jsx');
var AddPost = require('./AddPostView.jsx');
var AppActions = require('../auth/AppActions.js');
var AppStore = require('../auth/AppStore.js');


var App = React.createClass({
    myFunc: function () {
        var csrftoken = Cookies.get('csrftoken');
        $('.test').html(csrftoken);
    },
    render: function () {
        return (
            <div className="test" onClick={this.myFunc}>Test</div>
        )
    }
});


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
            selectedIndex: 0,            
        }
    },
    componentDidMount: function () {

        AppActions.getCurrentUser();
        AppActions.getAllPosts();  

        AppStore.bind( 'change', this.userChanged );
        AppStore.bind( 'change', this.collectionChanged );
              
    },
    componentWillUnmount: function () {
        AppStore.unbind( 'change', this.userChanged );
    },
    userChanged: function () {
        this.setState({
            user: AppStore.user
        });        
    },
    collectionChanged: function () {
        this.setState({
            collection: AppStore.collection
        });  
    },
    addPost: function (data) {        
        AppActions.addPost(data);
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


module.exports = App;
