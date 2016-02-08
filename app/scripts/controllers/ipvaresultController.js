'use strict';
/**
 * @ngdoc function
 * @name Etransitocidadao.controller:ipvaresultController
 * @description
 * # ipvaresultController
 */
angular.module('Etransitocidadao')
    .controller('ipvaresultController', function($scope, $location, $localstorage, Alerts, $ionicLoading) {
        // $scope.result = {};
        $scope.q = {};
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

        $scope.share = function() {
            $ionicLoading.show({
                template: 'Compartilhando..!'
            });
            $cordovaSocialSharing
                .share(message, subject, file, link) // Share via native share sheet
                .then(function(result) {
                    $ionicLoading.hide();
                    Alerts.default($scope, "Sucesso!", "Compartilhamento realizado com sucesso.", "Ok", function() {});
                }, function(err) {
                    $ionicLoading.hide();
                    Alerts.default($scope, "Ops!", "Compartilhamento não realizado.", "Ok", function() {});
                });

        };
        $scope.novaconsulta = function() {
            alert(JSON.stringify($scope.q));
        }
    });
