(function(){
    angular.module('app.services')
        .factory('Promoted', Promoted);



    Promoted.$inject = ['config', '$resource'];

    function Promoted(config, $resource) {
        return $resource(config.host + '/promoted/:id', {id: '@id'});
    }

})();
