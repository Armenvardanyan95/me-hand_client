(function () {
    'use strict';

    angular.module('app')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['$scope', 'Order', '$localStorage', '$mdDialog', '$state'];

    function OrderController($scope, Order, $localStorage, $mdDialog, $state) {

        $scope.order = new Order({
            name: '',
            phone: '',
            address: '',
        });
        $scope.order.items = [];

        angular.forEach($localStorage.cart, function (value, key) {
            $scope.order.items.push({
                item: value.id,
                quantity: value.quantity,
                length: value.length
            });
        });
        
        $scope.postOrder = postOrder;
        
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
    }

})();