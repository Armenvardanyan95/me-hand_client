(function () {
    'use strict';

    angular.module('app')
        .controller('ItemController', ItemController);

    ItemController.$inject = ['$scope', 'item', 'Item', 'ItemType', '$timeout', 'Increment', 'moment', '$rootScope'];

    function ItemController($scope, item, Item, ItemType, $timeout, Increment, moment, $rootScope) {

        $scope.item = item;
        $scope.numbers = sizeRange(1, 20, 1);
        $scope.sizeRange = sizeRange;
        $scope.daysLeft = daysLeft;

        $timeout(function () {
            $scope.similarItems = Item.query({item_type__id: item.item_type_detail.id}, function () {
                var index;
                angular.forEach($scope.similarItems, function (value, key) {
                    if(value.id == item.id){
                        index = key;
                        $scope.similarItems.splice(index, 1);
                        return;
                    }
                });
            });
            $scope.types = ItemType.query({item_class: $scope.item.item_class_detail.id});
            Increment.get({id: item.id});
            $scope.item.quantity = 1;
            $scope.item.length = $scope.item.item_class_detail.min_size;
        }, 700);


        var hoursLang = {
            en: '{} hours left',
            ru: 'Осталось {} часов',
            hy: 'Մնացել է {} ժամ',
            ge: 'Осталось {} часов'
        };

        var daysLang = {
            en: '{} days left',
            ru: 'Осталось {} дней',
            hy: 'Մնացել է {} օր',
            ge: 'Осталось {} дней'
        };

        function sizeRange(min, max, step) {
            min = parseInt(min);
            max = parseInt(max);
            var range = [];
            for(var i = min; i <= max; i += step){
                range.push(i);
            }
            return range;
        }
        
        function daysLeft(futureDate){
            var now  = moment();
            var then = moment(futureDate);


            var diff = moment.duration(then.diff(now));
            var hours = parseInt(diff.asHours());
            console.log(hours, 'time');
            if(hours < 24 && hours > 0){
                return hoursLang[$rootScope.lang].replace('{}', String(hours));
            } else if(hours >= 24){
                var days = Math.floor(hours / 24);
                return daysLang[$rootScope.lang].replace('{}', String(days));
            }
            return '';
        }

    }

})();