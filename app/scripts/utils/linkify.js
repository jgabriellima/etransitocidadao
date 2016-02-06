angular.module('Etransitocidadao').filter('linkify', function() {
    return function(input) {
        return ("" + input).linkify();
    };
});
