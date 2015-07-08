define(['AppDispatcher'], function (AppDispatcher) {


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

    }

    return AppActions;
});
