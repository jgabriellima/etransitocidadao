'use strict';

/**
 * @ngdoc overview
 * @name Etransitocidadao
 * @description
 * # Initializes main application and routing
 * Main module of the application.
 */
angular.module('Etransitocidadao', ['ionic', 'ngCordova', 'ngResource', 'ng-walkthrough', 'ngTweets'])
    .run(function($ionicPlatform,$cordovaGoogleAnalytics) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
                try{
                    $cordovaGoogleAnalytics.startTrackerWithId('UA-73500612-1');
                }catch(ee){console.log(ee)}
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
                        controller: 'ipvaresultController'
                    }
                }
            })
            .state('app.ipvahistory', {
                url: '/ipvahistory',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/ipva/history.html',
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
                        templateUrl: 'templates/views/meusveiculos/form.html',
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
            .state('app.news', {
                url: '/news',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/news.html',
                        controller: 'newsController'
                    }
                }
            })
            .state('app.about', {
                url: '/about',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/about.html',
                        controller: 'aboutController'
                    }
                }
            });
        $urlRouterProvider.otherwise('/app/ipva');
    });

angular.module('Etransitocidadao').value('config', {
    tweet_id_blitzbelem: '691450063558688768',
    tweet_id_belemtransito: '696392923919880198'
});



