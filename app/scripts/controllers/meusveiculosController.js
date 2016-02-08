'use strict';
/**
 * @ngdoc function
 * @name Etransitocidadao.controller:meusveiculosController
 * @description
 * # meusveiculosController
 */
angular.module('Etransitocidadao')
    .controller('meusveiculosController', function($scope) {
        $scope.msg = "Clique em (+) para adicionar um novo veículo.\n Você será direcinado para o formulário de cadastro. Preencha-o corretamente para que suas consultas sejam efetuadas com sucesso.";
        $scope.info_active = false;
        /**/
        $scope.showinfo = function() {
            $scope.info_active = true;
        };
    });
