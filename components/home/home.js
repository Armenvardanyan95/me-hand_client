(function () {
   'use strict';

    angular.module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Item'];

    function HomeController($scope, Item) {
        
        $scope.popularItems = Item.query();
        
    }

})();