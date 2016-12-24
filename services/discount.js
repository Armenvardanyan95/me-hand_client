(function(){
    angular.module('app.services')
        .factory('Discount', Discount);



    Discount.$inject = ['config', '$resource'];

    function Discount(config, $resource) {
        return $resource(config.host + '/discounts/:id/', {id: '@id'});
    }

})();
