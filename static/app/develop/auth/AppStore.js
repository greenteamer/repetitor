define(['AppDispatcher', 'microevent', 'cookie'], function (AppDispatcher, MicroEvent){

    var AppStore = {

        user: {},

    };

    MicroEvent.mixin(AppStore);

    AppDispatcher.register(function (payload) {

        switch (payload.actionType) {

            case 'logout-action':
                // диспетчер logout
                $.ajax({
                    url: 'api/v1/auth/logout/',
                    dataType: 'json',
                    cache: false,
                    success: (function (data) {
                        $.snackbar({timeout: 5000, content: data.message});
                        if (data.status === 'ok') {
                            AppStore['user'] = {
                                username: "Незарегистрированный"
                            };

                            AppStore.trigger( 'change' );
                        }
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.log('Что то не так с logout-action в store');
                    }).bind(this)
                });

                break;

            case 'login-action':
                // Диспетчер для авторизации пользователя
                var csrftoken = $.cookie('csrftoken');
                $.post(
                    "api/v1/auth/login/",
                    {
                        csrfmiddlewaretoken: csrftoken,
                        email: payload.user.email,
                        password: payload.user.pass
                    }
                ).success(
                    function (data) {
                        var text = "Добро пожаловать на наш сайт, Ваша почта " + data.email;
                        $.snackbar({timeout: 5000, content: data.message});
                        if (data.status === 'ok') {

                            AppStore['user'] = {
                                username: data.username
                            };

                            AppStore.trigger('change');
                        }
                    })
                .error(
                    function (data) {
                        var text = "Что-то пошло не так, попробуйте позже";
                        console.log("Ошибка post запроса в авторизации");
                        console.log(data);
                        $.snackbar({timeout: 100, content: text});
                    });

                break;

            case 'getCurrentUser-action':
                // получиаем current-user
                $.ajax({
                    url: 'api/v1/auth/current-user/',
                    cache: false,
                    success: (function (data) {

                        AppStore['user'] = data;

                        AppStore.trigger('change');

                    }).bind(this),
                    error: (function (data) {
                        console.log("не смог получить current_user");
                    }).bind(this)
                });

                break;

            case 'registration-action':
                var csrftoken = $.cookie('csrftoken');
                $.post(
                    "api/v1/accounts/",
                    {
                        csrfmiddlewaretoken: csrftoken,
                        email: payload.data.email,
                        username: payload.data.username,
                        first_name: payload.data.first_name,
                        last_name: payload.data.last_name,
                        tagline: payload.data.tagline,
                        password: payload.data.password,
                        confirm_password: payload.data.confirm_password,
                    }
                ).success(
                    function (data) {
                        var text = "Добро пожаловать на наш сайт, Ваша почта " + data.email;
                        $.snackbar({timeout: 5000, content: data.message});
                        if (data.status === 'ok') {

                            AppStore['user'] = {
                                username: data.username
                            };

                            AppStore.trigger('change');
                        }
                    })
                .error(
                    function (data) {
                        var text = "Что-то пошло не так, попробуйте позже";
                        console.log("Ошибка post запроса в авторизации");
                        console.log(data);
                        $.snackbar({timeout: 100, content: text});
                    });

                break;

            default:
        };

        return true;
    });

    return AppStore;
});
