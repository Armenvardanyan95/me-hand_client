(function () {
    'use strict';

    angular.module('app')
        .controller('CartController', CartController);

    CartController.$inject = ['$scope', '$localStorage', '$rootScope'];

    function CartController($scope, $localStorage, $rootScope) {
        $scope.cart = $localStorage.cart;
        $scope.total = calculateTotal;
        
        function calculateTotal() {
            var total = 0;
            angular.forEach($scope.cart, function (value, key) {
                total += value[$rootScope.lang].price * parseInt(value.quantity);
            });
            
            return total;
        }
    }

})();