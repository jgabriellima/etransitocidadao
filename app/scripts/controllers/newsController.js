'use strict';
/**
 * @ngdoc function
 * @name Etransitocidadao.controller:contatoController
 * @description
 * # contatoController
 */
angular.module('Etransitocidadao')
    .controller('newsController', function($scope, tweets, config, $localstorage) {
        $scope.feed = $localstorage.getObject("news", "[]");
        $scope.load = function() {
            tweets.get({
                widgetId: config.tweet_id
            }).success(function(data) {
                $scope.feed = data;
                console.log($scope.feed);
                $localstorage.setObject("news", $scope.feed);
                var result = _.chain($scope.feed)
                    .groupBy("time")
                    .pairs()
                    .map(function(currentItem) {
                        return _.object(_.zip(["time", "tweets"], currentItem));
                    })
                    .value();
                console.log(result);
            });
        };


    });
