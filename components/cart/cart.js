(function () {
    'use strict';

    angular.module('app')
        .controller('CartController', CartController);

    CartController.$inject = ['cart', '$rootScope', '$mdDialog'];

    function CartController(cart, $rootScope, $mdDialog) {
        this.cart = cart;
        this.total = calculateTotal;
        this.showOrderDialog = showOrderDialog;
        
        function showOrderDialog() {
            $mdDialog.show({
                templateUrl: '../components/order/order.html',
                controller: 'OrderController',
                clickOutsideToClose: true
            });
        }
        
        function calculateTotal() {
            var total = 0;
            angular.forEach(this.cart, function (value) {
                var price = value[$rootScope.lang].price;
                if(value.discount){
                    price = price - Math.floor((price * value.discount) / 100);
                }
                total += price * parseInt(value.quantity);
            });
            
            return parseInt(Math.floor(total));
        }
    }

})();