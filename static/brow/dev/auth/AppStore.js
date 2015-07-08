var AppDispatcher = require('./AppDispatcher');
var MicroEvent = require('microevent');
var Notification = require('react-notification');
var merge = require('merge');
var $ = require('jquery');
var Cookies = require('js-cookie');
var snackbar = require('../../snackbar.js');


// - Хранилище которое содержит наше текущее состояние 
// - Когда выполняется какой то метод в Диспетчере, мы меняем это 
// состояние на актуальное
// - Так же из Диспетчера, при изменении данных, вызывается соотвтествующая
// функция AppStora, на которую подписан Умный компонтент, который в итоге
// меняет state
var AppStore = merge(MicroEvent.prototype, {

    user: {},
    collection: [],

    userChange: function() {
        this.trigger('change');
    },
    collectionChange: function () {
        this.trigger('change');
    }

});


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
                            username: "Незарегистрированный",
                            message: "Вы успешно вышли"
                        };

                        AppStore.userChange();
                    }
                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log('Что то не так с logout-action в store');
                }).bind(this)
            });

            break;


        case 'login-action':
            // Диспетчер для авторизации пользователя
            var csrftoken = Cookies.get('csrftoken');
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
                            username: data.username,
                            message: "Вы успешно вошли"
                        };

                        AppStore.userChange();
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
            var csrftoken = Cookies.get('csrftoken');
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


        case 'add-post-action':
            var csrftoken = Cookies.get('csrftoken');
            $.post(
                "api/v1/posts/",
                {
                    csrfmiddlewaretoken: csrftoken,
                    content: payload.data,
                }
            ).success(
                function (data) {
                    var text = "Вы добавили пост";
                    $.snackbar({timeout: 5000, content: text});

                    AppStore.collection.push({
                        content: data.content,
                        author: {
                            username: AppStore.user.username
                        }
                    });

                    AppStore.collectionChange();                
                })
            .error(
                function (data) {
                    var text = "Что-то пошло не так, попробуйте позже";
                    console.log("Ошибка post запроса в авторизации");
                    console.log(data);
                    $.snackbar({timeout: 100, content: text});
                });

            break;

        case 'get-all-posts-action':
            $.ajax({
                url: '/api/v1/posts/',
                dataType: 'json',
                cache: false,
                success: (function (data) {

                    AppStore.collection = data;
                    AppStore.collectionChange();

                }).bind(this),
                error: (function (xhr, status, err) {
                    console.log('error fetchin collection');
                }).bind(this)
            });

        default:
    };

    return true;
});

module.exports = AppStore;

