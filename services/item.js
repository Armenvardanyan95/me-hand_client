(function(){
    angular.module('app.services')
        .factory('Item', item);



    item.$inject = ['config', '$resource'];

    function item(config, $resource) {
        return $resource(config.host + '/items/:id', {id: '@id'});
    }

})();