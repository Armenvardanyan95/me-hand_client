(function () {
    'use strict';

    angular.module('app')
        .controller('DiscountsController', DiscountsController);

    DiscountsController.$inject = ['$scope', 'items', '$stateParams', 'ItemType'];

    function DiscountsController($scope, items, $stateParams, ItemType) {
        $scope.items = items;
        $scope.type = ItemType.get({id: $stateParams.typeId}, function () {
            $scope.types = ItemType.query({item_class: $scope.type.item_class_detail.id});
        });


    }

})();