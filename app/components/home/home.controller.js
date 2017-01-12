(function () {
   'use strict';

    angular.module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['popularItems', 'promotedItems'];

    function HomeController(popularItems, promotedItems) {
        var vm = this;

        vm.popularItems = popularItems;
        vm.promotedItems = promotedItems;
        
    }

})();