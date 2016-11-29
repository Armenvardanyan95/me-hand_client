(function () {
    'use strict';

    angular.module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$rootScope', '$translate', 'ItemClass', 'ItemType', '$localStorage'];

    function HeaderController($scope, $rootScope, $translate, ItemClass, ItemType, $localStorage) {

        $scope.languages = [
            {
                id: 'hy',
                label: 'Հայերեն'
            },
            {
                id: 'ru',
                label: 'Русский'
            },
            {
                id: 'en',
                label: 'English'
            },
            {
                id: 'ge',
                label: 'Georgian'
            }
        ];

        $scope.cart = $localStorage.cart;
        $scope.currentClass = {url: false};
        $scope.changeClass = changeClass;

        $scope.getCurrentLanguage = getCurrentLanguage;
        $scope.changeLanguage = changeLanguage;

        $scope.itemClasses = ItemClass.query();
        $scope.itemTypes = ItemType.query();


        function getCurrentLanguage() {
            var lang = '';
            angular.forEach($scope.languages, function (value, key) {
                if(value.id == $rootScope.lang) {
                    lang =  value.label
                }
            });
            return lang;
        }
        
        function changeLanguage(lang) {
            $translate.use(lang);
            $rootScope.lang = lang;
        }

        function changeClass(cls){
            $scope.currentClass.url = cls.url;
        }
    }

})();