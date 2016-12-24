(function() {
    angular.module('app.services')
        .factory('config', config);


    function config() {

        var conf = {
            host: 'http://www.me-time.am'
        };

        return conf;
    }

})();
