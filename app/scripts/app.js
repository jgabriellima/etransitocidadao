'use strict';

/**
 * @ngdoc overview
 * @name Etransitocidadao
 * @description
 * # Initializes main application and routing
 * Main module of the application.
 */
angular.module('Etransitocidadao', ['ionic', 'ngCordova', 'ngResource', 'ng-walkthrough', 'ngTweets'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
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

function vform(id) {
    var obj = {
        status: true,
        validation: {}
    };
    $(id + " input").each(function(value, index) {
        var c = $(index);
        if (c.attr("id")) {
            if (c.attr("data-req") === 'true' && isEmpty(c.val())) {
                obj.validation[c.attr("title")] = "<b>" + c.attr("title") + "</b>" + ": não pode ser vazio";
            } else {
                if (c.attr("data-req")) {
                    if (c.attr("data-validation") === 'date') {
                        var dataval = c.val();
                        try {
                            var v = c.val().split("-");
                            var dataval = v[2] + "/" + v[1] + "/" + v[0];
                        } catch (e) {}
                        if (!validaDat(dataval)) {
                            obj.validation[c.attr("title")] = " Insira uma data válida; ";
                        } else {
                            var data_1 = new Date(c.val());
                            var data_2 = new Date();
                            if (data_1 > data_2) {
                                obj.validation[c.attr("title")] = " A data não pode ser maior que a atual.";
                            }
                        }
                    }
                    if (c.attr("data-validation") === 'email') {
                        if (!validateEmail(c.val())) {
                            obj.validation[c.attr("title")] = " Insira um e-mail válido.";
                        }
                    }
                    if (c.attr("data-validation") === 'cpf') {
                        if (!validarCPF(c.val())) {
                            obj.validation[c.attr("title")] = " Insira um CPF válido.";
                        }
                    }
                    if (c.attr("data-eq-value") !== null) {
                        if (c.val() !== $("#" + c.attr("data-eq-value")).val()) {
                            obj.validation[c.attr("title")] = "Os campos <b>" + $("#" + c.attr("data-eq-value")).attr("title") + "</b> e <b>" + c.attr("title") + "</b> não correspondem";
                        }
                    }
                }
            }
        }
    });
    if (!isEmpty(obj.validation)) {
        obj.status = false;
        obj.template = "<div style='text-align:center'>";
        for (var b in obj.validation) {
            obj.template += obj.validation[b] + "<br/>";
        }
        obj.template += "</div>";
    }
    return obj;
}

if (!String.linkify) {
    String.prototype.linkify = function() {

        // http://, https://, ftp://
        var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

        // www. sans http:// or https://
        var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

        // Email addresses
        var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

        return this
            .replace(urlPattern, '<a href="$&" title="link" target="_blank" onclick="window.open(\'$&\', \'_blank\', \'location=yes\');return false">$&</a>')
            .replace(pseudoUrlPattern, '$1<a href="http://$2" title="link" target="_blank" onclick="window.open(\'http://$2\', \'_blank\', \'location=yes\');return false;">$2</a>')
            .replace(emailAddressPattern, '<a href="mailto:$&" title="link" target="_blank" onclick="window.open(\'mailto:$&\', \'_blank\', \'location=yes\');return false;">$&</a>');
    };
}
