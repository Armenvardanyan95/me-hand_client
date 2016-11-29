(function(){
    angular.module('app.services')
        .factory('ItemClass', itemClass);



    itemClass.$inject = ['config', '$resource'];
    
    function itemClass(config, $resource) {
        return $resource(config.host + '/itemclass/:id', {id: '@id'});
    }

})();