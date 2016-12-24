(function () {
    'use strict';

    angular.module('app')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$scope', 'items', '$stateParams', 'ItemType'];

    function MenuController($scope, items, $stateParams, ItemType) {
        $scope.items = items;
        $scope.type = ItemType.get({id: $stateParams.typeId}, function () {
            $scope.types = ItemType.query({item_class: $scope.type.item_class_detail.id});
        });


    }

})();