'use strict';
/**
 * @ngdoc function
 * @name Etransitocidadao.controller:ipvaController
 * @description
 * # ipvaController
 */
angular.module('Etransitocidadao')
    .controller('ipvaController', function($scope, $location, $localstorage,API, Alerts, $ionicLoading) {
        $scope.query = {}

        $scope.buscar = function() {
            $ionicLoading.show({
                template: 'Processando... Aguarde!'
            });
            if ($scope.query.r && $scope.query.p && $scope.query.c) {
                $scope.query.d = createDate();
                // console.log($scope.query);
                API.ipva($scope.query).then(function(res) {
                    $ionicLoading.hide();
                    // console.log(res);
                    try {
                        if (res.status !== 500) {
                            if (sefaVerification(res.results)) {
                                $localstorage.setObject('ipvaresult', res.results);
                                $location.path("app/ipvaresult");
                            } else {
                                Alerts.default($scope, "Ops. Que chato!", "Desculpe-nos, mas os serviços da <a href='https://app.sefa.pa.gov.br/'>SEFA-PA</a> estão fora do ar. Não somos respnsáveis por isso. mas sentimos muito por você.", "Ok", function() {

                                });
                            }
                        }
                    } catch (e) {}
                });
            }

            function sefaVerification(res) {
                if (res.Proprietario.indexOf('#D4D4D4') !== -1) {
                    return false;
                }
                return true;
            }

            function createDate() {
                var d = new Date();
                var dia = d.getDate();
                var mes = d.getMonth() + 1;

                if (d.getDay() === 6) {
                    dia += 2;
                } else if (d.getDay() === 0) {
                    dia += 2;
                }
                if (dia.toString().length === 1) {
                    dia = "0" + dia;
                }
                if (mes.toString().length === 1) {
                    mes = "0" + mes;
                }
                return dia + '-' + mes + '-' + d.getFullYear()
            };

            // 
        };
    });
