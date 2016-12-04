(function () {
    'use strict';

    angular.module('app')
        .controller('ItemController', ItemController);

    ItemController.$inject = ['$scope', 'item', 'Item', 'ItemType', '$timeout', 'Increment'];

    function ItemController($scope, item, Item, ItemType, $timeout, Increment) {

        $scope.item = item;

        $timeout(function () {
            $scope.sizeRange = sizeRange(item.item_class_detail.min_size, item.item_class_detail.max_size,
                item.item_class_detail.step);
            $scope.similarItems = Item.query({item_type__id: item.item_type_detail.id}, function () {
                var index;
                angular.forEach($scope.similarItems, function (value, key) {
                    if(value.id == item.id){
                        index = key;
                        $scope.similarItems.splice(index, 1);
                        return;
                    }
                })
            });
            $scope.types = ItemType.query({item_class: $scope.item.item_class_detail.id});
            Increment.get({id: item.id});
            $scope.item.quantity = 1;
            $scope.item.length = $scope.item.item_class_detail.min_size;

        }, 400);

        $scope.numbers = sizeRange(1, 20, 1);

        function sizeRange(min, max, step) {
            min = parseInt(min);
            max = parseInt(max);
            var range = [];
            for(var i = min; i <= max; i += step){
                range.push(i);
            }
            return range;
        }

    }

})();