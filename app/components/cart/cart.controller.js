(function () {
    'use strict';

    angular.module('app')
        .controller('CartController', CartController);

    CartController.$inject = ['cart', '$mdDialog'];

    function CartController(cart, $mdDialog) {
        
        var vm = this;
        vm.cart = cart;
        vm.total = cart.total;
        vm.showOrderDialog = showOrderDialog;
        
        function showOrderDialog() {
            $mdDialog.show({
                templateUrl: '../components/order/order.html',
                controller: 'OrderController as vm',
                clickOutsideToClose: true
            });
        }
        
        
    }

})();





