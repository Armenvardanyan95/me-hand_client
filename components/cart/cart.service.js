(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('cart', cart);

    cart.$inject = ['$localStorage'];

    /* @ngInject */
    function cart($localStorage) {
        return $localStorage.cart;
    }

})();

