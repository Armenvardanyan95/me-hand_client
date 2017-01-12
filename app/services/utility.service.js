(function () {
    'use strict';

    angular
        .module('app.services')
        .service('utils', utils);

    utils.$inject = ['$translate', '$localStorage', '$rootScope', '$state'];

    /* @ngInject */
    function utils($translate, $localStorage, $rootScope, $state) {
        this.changeLanguage = changeLanguage;
        this.search = search;
        this.checkPromoCode = checkPromoCode;


        function changeLanguage(lang) {
            $translate.use(lang);
            $localStorage.lang = lang;
            $rootScope.lang = $localStorage.lang;
        }

        function search(query) {
            $state.go('search', {query: query});
        }

        function checkPromoCode(pc) {
            return pc && (pc == 'M7E17' || pc == 'M7e17' || pc == 'm7e17' || pc == 'm7E17');
        }
    }

})();

