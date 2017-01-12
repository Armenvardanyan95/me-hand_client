(function () {
    'use strict';

    angular.module('app')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['Order', 'cart',
        '$mdDialog', '$state', '$rootScope', '$scope', 'utils'];

    function OrderController(Order, cart, $mdDialog, $state, $rootScope, $scope, utils) {
        
        var vm = this;

        vm.order = new Order({
            name: '',
            phone: '',
            address: ''
        });
        vm.order.items = [];
        vm.promoCode = '';
        vm.order.promo_code = false;
        vm.order.lang = $rootScope.lang;
        vm.total = calculateTotal;
        vm.cart = cart;

        angular.forEach(vm.cart.items, function (value) {
            vm.order.items.push({
                item: value.id,
                quantity: value.quantity,
                length: value.length
            });
        });

        vm.postOrder = postOrder;

        $scope.$watch('vm.promoCode', function () {
            if (checkPromoCode(vm.promoCode)) {
                vm.order.promo_code = true;
            }
        });

        function postOrder() {
            vm.order.$save(success);
        }

        function calculateTotal(lang) {
            var total = 0;
            console.log('lang', lang);
            if (utils.checkPromoCode(vm.promoCode)) {
                angular.forEach(vm.cart.items, function (value) {
                    var price = value[lang].price;
                    total += price * value.quantity;
                });
                return parseInt(total - ((total / 100) * 15));
            }
            angular.forEach(vm.cart.items, function (value) {
                var price = value[lang].price;
                total += (price - ((price * value.discount) / 100)) * value.quantity;
            });

            return parseInt(total);

        }

        function success() {
            $mdDialog.hide();
            vm.order.items = vm.cart.items = [];
            $state.go('home');
            $mdDialog.show({
                templateUrl: '../components/includes/order-success.html',
                controller: 'ToastController',
                clickOutsideToClose: true
            })
        }
    }

})();
