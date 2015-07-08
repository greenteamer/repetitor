var AppDispatcher = require('./AppDispatcher.js');

    var AppActions = {

        logout: function() {
            AppDispatcher.dispatch({
                actionType: "logout-action"
            });
        },
        login: function(user) {
            AppDispatcher.dispatch({
                actionType: "login-action",
                user: user
            });
        },
        getCurrentUser: function () {
            AppDispatcher.dispatch({
                actionType: "getCurrentUser-action"
            });
        },
        registration: function (data) {
            AppDispatcher.dispatch({
                actionType: "registration-action",
                data: data
            });
        },
        addPost: function (data) {
            AppDispatcher.dispatch({
                actionType: "add-post-action",
                data: data
            });
        },
        getAllPosts: function () {
            AppDispatcher.dispatch({
                actionType: "get-all-posts-action",                
            });
        }

    }


module.exports = AppActions;