(function(){
    angular.module('app.services')
        .factory('Increment', Increment);



    Increment.$inject = ['config', '$resource'];

    function Increment(config, $resource) {
        return $resource(config.host + '/increment/:id/', {id: '@id'});
    }

})();
