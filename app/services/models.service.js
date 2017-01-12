(function () {
    'use strict';

    angular
        .module('app.services')
        .service('models', Models);

    Models.$inject = ['config', '$resource'];

    /* @ngInject */
    function Models(config, $resource) {
        
        this.ItemType = $resource(config.host + '/itemtype/:id', {id: '@id'});
        this.Item = $resource(config.host + '/items/:id/', {id: '@id'}, {
            update: {method: 'PATCH'}
        });
        this.ItemClass = $resource(config.host + '/itemclass/:id', {id: '@id'});
        
    }

})();

