(function () {
    angular.module('app.services', ['ngResource']);

    angular.module('app.services').config(config);

    config.$injecy = ['$resourceProvider'];

    function config($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }
})();
