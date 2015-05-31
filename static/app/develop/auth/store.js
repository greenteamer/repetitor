define(['AppDispatcher', 'microevent', 'coockie'], function (AppDispatcher){

    var AppStore = {

        user: {},

    };


    AppDispatcher.register(function (payload) {
        switch (payload.actionType) {
            case 'logout-action':

                break;
            default:

        }
    });

    return AppStore;
});
