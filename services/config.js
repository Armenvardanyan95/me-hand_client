(function() {
    angular.module('app.services')
        .factory('config', config);


    function config() {

        var conf = {
            host: 'http://127.0.0.1\\:8000'
        };

        return conf;
    }

})();
