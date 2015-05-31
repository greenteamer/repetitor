// Input (JSX):
define(['react', 'Navigation', 'AddPost', 'jquery', 'cookie', 'bootstrap'], function(React, Navigation, AddPost) {

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

    var App = React.createClass(function(){
        
    });

    return App;
});
