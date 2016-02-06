'use strict';
/**
 * @ngdoc function
 * @name Etransitocidadao.controller:ipvaresultController
 * @description
 * # ipvaresultController
 */
angular.module('Etransitocidadao')
    .controller('ipvaresultController', function($scope, $location,$localstorage, Alerts, $ionicLoading) {
        // $scope.result = {};
        $scope.init = function() {
            $scope.result = $localstorage.getObject('ipvaresult');
            $scope.debitos = true;
            try {
                if ($scope.result.debitos.length === 0) {
                    $scope.debitos = false;
                }
            } catch (e) {
                $scope.debitos = false;
            }
            console.log($scope.result);
        };

    });
