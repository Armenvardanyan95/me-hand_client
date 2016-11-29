(function () {
    'use strict';

    angular.module('app')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$scope', 'items'];

    function MenuController($scope, items) {
        $scope.items = items;
    }

})();