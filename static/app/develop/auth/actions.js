define(['AppDispatcher'], function (AppDispatcher) {


    var AppActions = {

        logout: function() {
            AppDispatcher.dispatch({
                actionType: "logout-action"
            });
        },

    }

    return AppActions;
});
