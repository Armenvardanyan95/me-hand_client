(function(){
    angular.module('app.services')
        .factory('ItemType', itemType);



    itemType.$inject = ['config', '$resource'];

    function itemType(config, $resource) {
        return $resource(config.host + '/itemtype/:id', {id: '@id'});
    }

})();
