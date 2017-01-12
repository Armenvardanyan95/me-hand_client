(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('item', item);

    item.$inject = [];

    /* @ngInject */
    function item() {
        var directive = {
            template: '<div class="p-one simpleCart_shelfItem">' +
                        '<a ui-sref="item({itemId: item.id})">' +
                            '<img src="{{ item.thumbnail }}" alt="" />' +
                            '<div class="mask mask1">' + 
                                '<span>{{ \'HOME.QUICK_VIEW\' | translate }}</span>' +
                            '</div>' + 
                        '</a>' +
                        '<h4>{{ item[lang].title | characters:30 }}</h4>' +
                        '<p>' +
                            '<a class="item_add" href="#"><i></i>' +
                                '<span class="item_price">' + 
                                '{{ \'CURRENCY\' | translate }}' +
                                '{{ item[lang].price }}' +
                                '</span>' +
                            '</a>' +
                        '</p>' +
                      '</div>',
            replace: true,
            link: link,
            restrict: 'E',
            scope: '='
        };
        return directive;

        function link(scope, element, attrs) {
            
        }
    }

})();

