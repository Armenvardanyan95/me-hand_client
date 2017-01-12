(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('cart', cart);

    cart.$inject = ['$localStorage'];

    /* @ngInject */
    function cart($localStorage) {

        if (typeof $localStorage.cart == "undefined") {
            $localStorage.cart = [];
        }

        var cart = $localStorage.cart;

        return {
            items: cart,
            add: addToCart,
            remove: removeFromCart,
            contains: isInCart,
            total: calculateTotal
        };

        
        function isInCart(item) {
            var isIn = false;
            angular.forEach(cart, function (value) {
                if (value.id == item.id) isIn = true;
            });
            return isIn;
        }

        function addToCart(item) {
            if (isInCart(item)) return false;
            cart.push(item);
        }

        function removeFromCart(item) {
            var index = 0;
            angular.forEach(cart, function (value, key) {
                if (value.id == item.id) index = key;
            });

            cart.splice(index, 1);
        }

        function calculateTotal(lang) {
            var total = 0;
            angular.forEach(cart, function (value) {
                var price = value[lang].price;
                if(value.discount){
                    price = price - ((price * value.discount) / 100);
                }
                total += price * parseInt(value.quantity);
            });

            return parseInt(Math.floor(total));
        }
    }

})();

