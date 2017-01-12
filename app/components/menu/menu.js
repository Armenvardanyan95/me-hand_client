(function () {
    'use strict';

    angular.module('app')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['items', '$stateParams', 'models'];

    function MenuController(items, $stateParams, models) {
        
        var vm = this;
        vm.items = items;
        if ($stateParams.typeId) {
            vm.type = models.ItemType.get({id: $stateParams.typeId}, function () {
                vm.types = models.ItemType.query({item_class: vm.type.item_class_detail.id});
            });
        }
    }

})();
