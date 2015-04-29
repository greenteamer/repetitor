(function () {
    'use strict';

    angular
        .module('thinkster.routes')
        .config(config);

    config.$inject = ['$routeProvider'];

    /**
    * @name config
    * @desc Define valid application routes
    */
    function config($routeProvider) {
        $routeProvider.when('/register', {
          controller: 'RegisterController',
          controllerAs: 'vm',
          templateUrl: '/static/templates/authentication/register.html'
        }).otherwise('/');

        $routeProvider.when('/login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/login.html'
        }).otherwise('/');

        $routeProvider.when('/', {
            controller: 'IndexController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/layout/index.html'
        });

        $routeProvider.when('/+:username', {
            controller: 'ProfileController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/profiles/profile.html'
        });

        $routeProvider.when('/+:username/settings', {
            controller: 'ProfileSettingsController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/profiles/settings.html'
        })


    }
})();