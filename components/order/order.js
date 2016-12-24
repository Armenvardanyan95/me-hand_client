(function () {
    'use strict';

    angular.module('app')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['$scope', 'Order', '$localStorage', '$mdDialog', '$state', '$rootScope'];

    function OrderController($scope, Order, $localStorage, $mdDialog, $state, $rootScope) {

        $scope.order = new Order({
            name: '',
            phone: '',
            address: '',
        });
        $scope.order.items = [];
        $scope.order.lang = $rootScope.lang;
        $scope.total = calculateTotal;

        angular.forEach($localStorage.cart, function (value, key) {
            $scope.order.items.push({
                item: value.id,
                quantity: value.quantity,
                length: value.length
            });
        });
        
        $scope.postOrder = postOrder;

        $scope.$watch('promoCode', function () {
            if($scope.promoCode && ($scope.promoCode == 'M7E17' || $scope.promoCode == 'M7e17'
                || $scope.promoCode == 'm7e17' || $scope.promoCode == 'm7E17')) {
                $scope.order.promo_code = true;
            }
        });
        
        function postOrder() {
            $scope.order.$save(function () {
                $mdDialog.hide();
                $scope.order.items = $localStorage.cart = [];
                $state.go('home');
                $mdDialog.show({
                    templateUrl: '../components/includes/order-success.html',
                    controller: 'ToastController',
                    clickOutsideToClose: true
                })
            });
        }

        function calculateTotal() {
            var total = 0;
            var cart = $localStorage.cart;
            if($scope.promoCode && ($scope.promoCode == 'M7E17' || $scope.promoCode == 'M7e17'
                || $scope.promoCode == 'm7e17' || $scope.promoCode == 'm7E17')) {
                angular.forEach(cart, function (value, key) {
                    var price = value[$rootScope.lang].price;
                    total += price;
                });
                return parseInt(total - ((total / 100) * 15));
            }
            angular.forEach(cart, function (value, key) {
                var price = value[$rootScope.lang].price;
                total += (price - ((price * value.discount) / 100));
            });

            return parseInt(total);

        }
    }

})();