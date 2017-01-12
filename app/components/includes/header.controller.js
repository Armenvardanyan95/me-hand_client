(function () {
    'use strict';

    angular.module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['models', 'cart', '$state', 'utils', '$stateParams'];

    function HeaderController(models, cart, $state, utils, $stateParams) {
        
        var vm = this;
        vm.query = $stateParams.query || '';
        vm.languages = [
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

        vm.currentClass = {url: false};
        vm.changeClass = changeClass;
        vm.cart = cart;

        vm.changeLanguage = utils.changeLanguage;
        vm.search = utils.search;

        vm.itemClasses = models.ItemClass.query();
        vm.itemTypes = models.ItemType.query();
        

        function changeClass(cls){
            vm.currentClass.url = cls.url;
        }
    }

})();