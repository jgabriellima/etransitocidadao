'use strict';

/**
 * @ngdoc overview
 * @name Etransitocidadao
 * @description
 * # Initializes main application and routing
 * Main module of the application.
 */
angular.module('Etransitocidadao', ['ionic', 'ngCordova', 'ngResource'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.cordova) {
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
        // register $http interceptors, if any. e.g.
        // $httpProvider.interceptors.push('interceptor-name');
        // Application routing
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/main.html',
                controller: 'MainController'
            })
            .state('app.ipva', {
                url: '/ipva',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/ipva/form.html',
                        controller: 'ipvaController'
                    }
                }
            })
            .state('app.ipvaresult', {
                url: '/ipvaresult',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/ipva/result.html',
                        controller: 'ipvaController'
                    }
                }
            })
            .state('app.veiculo', {
                url: '/veiculo',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/veiculo/form.html',
                        controller: 'veiculoController'
                    }
                }
            })
            .state('app.meusveiculosform', {
                url: '/meusveiculosform',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/veiculo/form.html',
                        controller: 'meusveiculosController'
                    }
                }
            })
            .state('app.meusveiculos', {
                url: '/meusveiculos',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/meusveiculos/list.html',
                        controller: 'meusveiculosController'
                    }
                }
            })
            .state('app.contato', {
                url: '/contato',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/contato.html',
                        controller: 'contatoController'
                    }
                }
            })
            .state('app.noticias', {
                url: '/noticias',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/noticias.html',
                        controller: 'noticiasController'
                    }
                }
            });
        // redirects to default route for undefined routes
        $urlRouterProvider.otherwise('/app/ipva');
    });
