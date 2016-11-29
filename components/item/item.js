(function () {
    'use strict';

    angular.module('app')
        .controller('ItemController', ItemController);

    ItemController.$inject = ['$scope', 'item', 'Item', '$timeout'];

    function ItemController($scope, item, Item, $timeout) {

        $scope.item = item;
        $timeout(function () {
            $scope.similarItems = Item.query({item_type: item.item_type_detail.id});
        });

        $scope.numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    }

})();