(function () {
    'use strict';

    angular.module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$rootScope', '$translate', 'ItemClass', 'ItemType', '$localStorage', '$state'];

    function HeaderController($scope, $rootScope, $translate, ItemClass, ItemType, $localStorage, $state) {

        $scope.languages = [
            {
                id: 'hy',
                label: 'Հայերեն',
                flag: 'img/armenian.png'
            },
            {
                id: 'ru',
                label: 'Русский',
                flag: 'img/russian.png'
            },
            {
                id: 'en',
                label: 'English',
                flag: 'img/english.png'
            },
            {
                id: 'ge',
                label: 'Georgian',
                flag: 'img/georgian.png'
            }
        ];

        $scope.cartLength = cartLength;
        $scope.currentClass = {url: false};
        $scope.changeClass = changeClass;

        $scope.getCurrentLanguage = getCurrentLanguage;
        $scope.changeLanguage = changeLanguage;
        $scope.search = search;

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
            $localStorage.lang = lang;
            $rootScope.lang = $localStorage.lang;
            
        }

        function changeClass(cls){
            $scope.currentClass.url = cls.url;
        }

        function cartLength() {
            return $localStorage.cart.length;
        }
        
        function search(query) {
            console.log('i am here')
            $state.go('search', {query: query});
        }
    }

})();