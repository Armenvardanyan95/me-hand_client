(function () {
   'use strict';

    angular.module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'popularItems', 'promotedItems'];

    function HomeController($scope, popularItems, promotedItems) {
        
        $scope.popularItems = popularItems;
        $scope.promotedItems = promotedItems;
        
    }

})();