'use strict';
/**
 * @ngdoc function
 * @name Etransitocidadao.controller:ipvaController
 * @description
 * # ipvaController
 */
angular.module('Etransitocidadao')
    .controller('ipvaController', function($scope,$location) {

    	$scope.buscar = function(){
    		$location.path("app/ipvaresult")
    	};
    });
