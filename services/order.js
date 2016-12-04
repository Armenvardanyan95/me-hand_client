(function(){
    angular.module('app.services')
        .factory('Order', order);



    order.$inject = ['config', '$resource'];

    function order(config, $resource) {
        return $resource(config.host + '/orders/:id', {id: '@id'});
    }

})();
