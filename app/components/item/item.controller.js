(function () {
    'use strict';

    angular.module('app')
        .controller('ItemController', ItemController);

    ItemController.$inject = ['item', 'models', 'moment', 'cart'];

    function ItemController(item, models, moment, cart) {

        var vm = this;

        vm.item = item;
        vm.numbers = sizeRange(1, 20, 1);
        vm.sizeRange = sizeRange;
        vm.daysLeft = daysLeft;
        vm.cart = cart;

        vm.similarItems = models.Item.query({item_type__id: vm.item.item_type_detail.id});
        vm.types = models.ItemType.query({item_class: vm.item.item_class_detail.id});
        vm.item.quantity = 1;
        vm.item.length = 0;

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
            for (var i = min; i <= max; i += step) {
                range.push(i);
            }
            return range;
        }

        function daysLeft(futureDate, lang) {
            var now  = moment();
            var then = moment(futureDate);

            var diff = moment.duration(then.diff(now));
            var hours = parseInt(diff.asHours());
            if (hours < 24 && hours > 0) {
                return hoursLang[lang].replace('{}', String(hours));
            } else if (hours >= 24) {
                var days = Math.floor(hours / 24);
                return daysLang[lang].replace('{}', String(days));
            }
            return '';
        }

    }

})();
