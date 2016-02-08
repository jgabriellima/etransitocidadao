'use strict';
/**
 * @ngdoc function
 * @name Etransitocidadao.controller:ipvaController
 * @description
 * # ipvaController
 */
angular.module('Etransitocidadao')
    .controller('ipvaController', function($scope, $location, $localstorage, API, Alerts, $ionicLoading) {
        $scope.query = {}

        $scope.buscar = function() {

            var vf = vform("form#search");
            console.log(vf);
            if (vf.status) {
                $ionicLoading.show({
                    template: 'Processando... Aguarde!'
                });
                $scope.query.d = createDate();
                $scope.query.c = $scope.query.c.replace(/\D/g, "");
                console.log($scope.query);
                API.ipva($scope.query).then(function(res) {
                    $ionicLoading.hide();
                    // console.log(res);
                    try {
                        if (res.status !== 500) {
                            if (res.status === 204) {
                                Alerts.default($scope, "Ops!", res.results.msg, "Ok", function() {});
                            } else {
                                if (sefaVerification(res.results)) {
                                    $localstorage.setObject('ipvaresult', res.results);
                                    $location.path("app/ipvaresult");
                                } else {
                                    Alerts.default($scope, "Ops. Que chato!", "Desculpe-nos, mas os serviços da <a href='https://app.sefa.pa.gov.br/'>SEFA-PA</a> estão fora do ar. Não somos respnsáveis por isso. mas sentimos muito por você.", "Ok", function() {

                                    });
                                }
                            }
                        }
                    } catch (e) {}
                });
            } else {
                Alerts.default($scope, "Ops! Atenção", vf.template, "Ok", function() {});
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

        $scope.msg = "Após o preenchimento correto das informações, nossos sistemas irão consultar a SEFA-PA através do seu portal de serviços: https://app.sefa.pa.gov.br/servicosipva \n O tempo de resposta, assim como o conteúdo depende totalmente da disponibilidade do Portal de Serviços.";
        $scope.info_active = false;
        /**/
        $scope.showinfo = function() {
            $scope.info_active = true;
        };

        $scope.msghistory = "Os dados de histórico de busca são armazenados apenas localmente no seu dispositivo, sua limpeza não interfere em nada no serviço oferecido.";
        $scope.info_active_history = false;
        /**/
        $scope.showinfohistory = function() {
            $scope.info_active_history = true;
        };
    });
