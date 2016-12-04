(function () {
    'use strict';

    angular.module('app')
        .controller('CartController', CartController);

    CartController.$inject = ['$scope', '$localStorage', '$rootScope', '$mdDialog'];

    function CartController($scope, $localStorage, $rootScope, $mdDialog) {
        $scope.cart = $localStorage.cart;
        $scope.total = calculateTotal;
        $scope.showOrderDialog = showOrderDialog;
        
        function showOrderDialog() {
            $mdDialog.show({
                templateUrl: '../components/order/order.html',
                controller: 'OrderController',
                clickOutsideToClose: true
            });
        }
        
        function calculateTotal() {
            var total = 0;
            angular.forEach($scope.cart, function (value, key) {
                total += value[$rootScope.lang].price * parseInt(value.quantity);
            });
            
            return total;
        }
    }

})();