(function () {
    'use strict';

    angular.module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', 'items', 'ItemClass'];

    function SearchController($scope, items) {
        $scope.items = items;
    }

})();